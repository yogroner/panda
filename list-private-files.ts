import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

export function getDriveClient() {
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
  }

  try {
    // Surgical Clean: Remove the leading/trailing backslashes and quotes
    let rawJson = serviceAccountJson.trim()
      .replace(/^\\+/, '')
      .replace(/\\+$/, '')
      .replace(/^"+|"+$/g, '');

    // Fix the bad escape characters by normalizing backslashes
    const cleanedJson = rawJson.replace(/\\n/g, "\\\\n"); 

    const credentials = JSON.parse(cleanedJson);
    
    // Final repair of newlines for the RSA key
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    return google.drive({ version: 'v3', auth });
  } catch (error: any) {
    console.error('GOOGLE_SERVICE_ACCOUNT_JSON parsing failed. Error:', error.message);
    console.error('Raw prefix:', serviceAccountJson.substring(0, 15));
    throw error;
  }
}

async function listFiles() {
  const folderId = '1sCYuhbPT54RHcrmKpYSfhWWIJC_RaKwc';
  
  try {
    const drive = getDriveClient();

    console.log(`Listing files in folder: ${folderId}...`);

    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'nextPageToken, files(id, name, mimeType, createdTime)',
    });

    const files = res.data.files;
    if (files?.length) {
      console.log('Files found:');
      files.forEach((file) => {
        console.log(`${file.name} (${file.id}) - ${file.mimeType} [Created: ${file.createdTime}]`);
      });
    } else {
      console.log('No files found in this folder.');
    }
  } catch (error: any) {
    console.error('An error occurred:', error.message);
  }
}

// Only run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  listFiles();
}
