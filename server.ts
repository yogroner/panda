import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";
import dotenv from "dotenv";
import NodeCache from "node-cache";
import sharp from "sharp";
import stream from "stream";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize NodeCache for metadata and image binary caching
// Metadata stays for 1 hour, Images stay for 10 minutes (to avoid memory bloat)
const metadataCache = new NodeCache({ stdTTL: 3600 });
const imageBinaryCache = new NodeCache({ stdTTL: 600, maxKeys: 50 });

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Google Drive Auth setup using Service Account
  const getDriveClient = () => {
    const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
    if (!serviceAccountJson) {
      throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is missing.");
    }
    
    const credentials = JSON.parse(serviceAccountJson);
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });
    
    return google.drive({ version: "v3", auth });
  };

  const FOLDER_ID = "1sCYuhbPT54RHcrmKpYSfhWWIJC_RaKwc";

  /**
   * Optimized Image Proxy with WebP Conversion and Caching
   * Converts high-res Drive images to optimized WebP formats on the fly.
   */
  app.get("/api/image/:fileId", async (req, res) => {
    const { fileId } = req.params;
    const width = parseInt(req.query.w as string) || 800; // Default width 800px

    try {
      // Check for cached binary
      const cacheKey = `img_${fileId}_${width}`;
      const cached = imageBinaryCache.get(cacheKey) as { buffer: Buffer, contentType: string };
      if (cached) {
        res.setHeader("Content-Type", cached.contentType);
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        return res.send(cached.buffer);
      }

      const drive = getDriveClient();
      
      // Get file stream from Google Drive
      const response = await drive.files.get(
        { fileId, alt: "media" },
        { responseType: "stream" }
      );

      const passThrough = new stream.PassThrough();
      response.data.pipe(passThrough);

      const inputBuffer = await streamToBuffer(passThrough);
      
      // Detect metadata to see if it's an animation
      // We MUST pass { animated: true } to Sharp constructor to get correct page counts for WebP/GIF
      const metadata = await sharp(inputBuffer, { animated: true }).metadata();
      const isAnimated = (metadata.pages && metadata.pages > 1);
      const format = metadata.format; // e.g., 'webp', 'gif', 'png'

      console.log(`Processing ${fileId}: format=${format}, pages=${metadata.pages}, isAnimated=${isAnimated}`);

      let buffer: Buffer;
      let contentType = `image/${format}`;
      
      if (isAnimated) {
        // For animations, we serve the original buffer to ensure total frame integrity
        buffer = inputBuffer;
        console.log(`Serving original animation for ${fileId} (Format: ${format})`);
      } else {
        // For static images, we perform the WebP optimization and resizing
        buffer = await sharp(inputBuffer)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();
        contentType = "image/webp";
      }

      // Store in memory cache
      imageBinaryCache.set(cacheKey, { buffer, contentType });

      res.setHeader("Content-Type", contentType);
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      res.send(buffer);
    } catch (error: any) {
      console.error(`Error proxying image ${fileId}:`, error.message);
      res.status(404).send("Image not found");
    }
  });

  // Helper to convert stream to buffer for Sharp
  async function streamToBuffer(s: stream.Readable): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: any[] = [];
      s.on("data", (chunk) => chunks.push(chunk));
      s.on("error", (err) => reject(err));
      s.on("end", () => resolve(Buffer.concat(chunks)));
    });
  }

  // API Route for Gallery with Metadata Caching
  app.get("/api/gallery", async (req, res) => {
    try {
      const cachedData = metadataCache.get("gallery_files");
      if (cachedData) return res.json(cachedData);

      const drive = getDriveClient();

      // Batch fetch all metadata in a single call
      const response = await drive.files.list({
        q: `'${FOLDER_ID}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id, name, mimeType, size)",
        pageSize: 50,
      });

      const files = response.data.files || [];
      
      const images = files.map(file => ({
        id: file.id,
        name: file.name,
        // Pointing to our local optimized proxy with a cache buster for the transition
        url: `/api/image/${file.id}?w=1200&v=${Date.now()}`,
        thumbnail: `/api/image/${file.id}?w=400&v=${Date.now()}`
      }));

      metadataCache.set("gallery_files", images);
      res.json(images);
    } catch (error: any) {
      console.error("Error fetching gallery:", error.message);
      res.status(500).json({ error: "Failed to fetch gallery" });
    }
  });

  // API Route for Blog Posts (Google Docs)
  app.get("/api/blog", async (req, res) => {
    try {
      const drive = getDriveClient();

      // List Google Docs in the folder
      const response = await drive.files.list({
        q: `'${FOLDER_ID}' in parents and mimeType = 'application/vnd.google-apps.document' and trashed = false`,
        fields: "files(id, name, createdTime)",
        pageSize: 10,
      });

      const files = response.data.files || [];
      
      // For each doc, we'll fetch its plain text content
      const posts = await Promise.all(files.map(async (file) => {
        try {
          const docContent = await drive.files.export({
            fileId: file.id!,
            mimeType: 'text/plain',
          });
          
          const content = docContent.data as string;
          const lines = content.split('\n').filter(line => line.trim().length > 0);
          
          return {
            id: file.id,
            title: file.name,
            date: file.createdTime,
            excerpt: lines.slice(0, 2).join(' ').substring(0, 150) + '...',
            content: content
          };
        } catch (err) {
          console.error(`Error exporting doc ${file.id}:`, err);
          return {
            id: file.id,
            title: file.name,
            date: file.createdTime,
            excerpt: "Could not load content.",
            content: ""
          };
        }
      }));

      res.json(posts);
    } catch (error: any) {
      console.error("Error fetching blog posts:", error.message);
      res.status(500).json({ error: "Failed to fetch blog posts", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
