// server/utils/backupUtils.js
import { createRequire } from 'module';
import { Readable } from 'stream';

const require = createRequire(import.meta.url);
const archiver = require('archiver');
const AdmZip = require('adm-zip');

export const extractZipBackup = async (zipBuffer) => {
  try {
    const zip = new AdmZip(zipBuffer);
    const zipEntries = zip.getEntries();
    
    let backupData = null;
    
    for (const entry of zipEntries) {
      if (entry.entryName === 'backup.json') {
        const content = entry.getData().toString('utf8');
        backupData = JSON.parse(content);
        break;
      }
    }
    
    if (!backupData) {
      throw new Error('backup.json not found in ZIP file');
    }
    
    return backupData;
  } catch (error) {
    console.error('Error extracting ZIP backup:', error);
    throw error;
  }
};