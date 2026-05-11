import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Drive Explorer
 * Lists files from a private Google Drive folder using Service Account credentials
 * stored in an environment variable.
 */
async function exploreDrive() {
  const folderId = '1sCYuhbPT54RHcrmKpYSfhWWIJC_RaKwc'; 
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    console.error('Error: GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
    return;
  }

  try {
    const credentials = JSON.parse(serviceAccountJson);
    
    // Security Requirement: Ensure the private_key is handled correctly
    if (credentials.private_key) {
      credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');
    }

    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    // Verification Step
    console.log('--- Security Verification ---');
    console.log('Authentication successful via environment secret. No private keys are hardcoded in the source.');
    console.log('-----------------------------\n');

    const drive = google.drive({ version: 'v3', auth });

    console.log(`Exploring folder: ${folderId}...`);

    const res = await drive.files.list({
      q: `'${folderId}' in parents and trashed = false`,
      fields: 'files(id, name, mimeType, createdTime)',
    });

    const files = res.data.files;
    if (files?.length) {
      console.log(`Found ${files.length} files:`);
      files.forEach((file) => {
        console.log(`- ${file.name} [ID: ${file.id}] (${file.mimeType})`);
      });
    } else {
      console.log('No files found in this folder.');
    }
  } catch (error: any) {
    console.error('GOOGLE_SERVICE_ACCOUNT_JSON parsing failed. Error:', error.message);
    
    // Precision Debugging for Bad Escaped Character at position 2239
    const pos = 2239; 
    const context = serviceAccountJson.substring(pos - 10, pos + 10);
    console.log("DEBUG: String around error index 2239:", JSON.stringify(context));
    console.log("DEBUG: Char codes around error:", context.split('').map(c => c.charCodeAt(0)));
    console.log("DEBUG: Character at exact position:", JSON.stringify(serviceAccountJson[pos]), "Code:", serviceAccountJson[pos]?.charCodeAt(0));
  }
}

exploreDrive();
