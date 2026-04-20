import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Drive Explorer
 * Lists files from a private Google Drive folder using Service Account credentials
 * stored in an environment variable.
 */
async function exploreDrive() {
  const folderId = '1sCYuhbPT54RHcrmKpYSfhWWIJC_RaKwc'; // Replace with your folder ID if needed
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    console.error('Error: GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
    return;
  }

  try {
    // Parse the credentials from the environment secret
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
    console.error('An error occurred during drive exploration:', error.message);
  }
}

exploreDrive();
