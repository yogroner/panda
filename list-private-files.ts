import { google } from 'googleapis';
import dotenv from 'dotenv';

dotenv.config();

async function listFiles() {
  const folderId = '1sCYuhbPT54RHcrmKpYSfhWWIJC_RaKwc';
  const serviceAccountJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    console.error('Error: GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set.');
    return;
  }

  try {
    const credentials = JSON.parse(serviceAccountJson);
    
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    });

    const drive = google.drive({ version: 'v3', auth });

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
    if (error.message.includes('Unexpected token')) {
      console.error('Tip: Make sure GOOGLE_SERVICE_ACCOUNT_JSON is a valid JSON string.');
    }
  }
}

listFiles();
