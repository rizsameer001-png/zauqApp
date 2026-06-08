// // server/controllers/backup.controller.js
// import mongoose from 'mongoose';
// import fs from 'fs';
// import path from 'path';
// import archiver from 'archiver';
// import { successResponse, errorResponse } from '../utils/response.js';

// // Import all models
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Poem from '../models/Poem.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import User from '../models/User.js';
// import Category from '../models/Category.js';
// import Setting from '../models/Setting.js';
// import Notification from '../models/Notification.js';
// import HomepageBanner from '../models/HomepageBanner.js';

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// const getAllModels = () => {
//   return {
//     authors: Author,
//     books: Book,
//     poems: Poem,
//     audio: Audio,
//     videos: Video,
//     users: User,
//     categories: Category,
//     settings: Setting,
//     notifications: Notification,
//     homepageBanners: HomepageBanner
//   };
// };

// const getModelName = (model) => {
//   const models = getAllModels();
//   for (const [key, value] of Object.entries(models)) {
//     if (value === model) return key;
//   }
//   return 'unknown';
// };

// // ============================================
// // CREATE FULL DATABASE BACKUP
// // ============================================

// export const createFullBackup = async (req, res, next) => {
//   try {
//     console.log('📦 Creating full database backup...');
    
//     const models = getAllModels();
//     const backupData = {
//       backupInfo: {
//         version: '1.0',
//         createdAt: new Date().toISOString(),
//         createdBy: req.user?.email || 'system',
//         database: mongoose.connection.name,
//         host: mongoose.connection.host
//       },
//       collections: {}
//     };
    
//     // Fetch data from each collection
//     for (const [collectionName, model] of Object.entries(models)) {
//       console.log(`📥 Fetching ${collectionName}...`);
//       const data = await model.find({}).lean();
//       backupData.collections[collectionName] = {
//         count: data.length,
//         data: data
//       };
//       console.log(`   ✅ Fetched ${data.length} ${collectionName}`);
//     }
    
//     // Create backup file
//     const backupJson = JSON.stringify(backupData, null, 2);
//     const filename = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
//     res.setHeader('Content-Type', 'application/json; charset=utf-8');
//     res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
//     res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    
//     console.log(`✅ Backup created successfully: ${filename}`);
//     return res.status(200).send(backupJson);
    
//   } catch (error) {
//     console.error('Error in createFullBackup:', error);
//     next(error);
//   }
// };

// // ============================================
// // CREATE COMPRESSED BACKUP (ZIP)
// // ============================================

// export const createCompressedBackup = async (req, res, next) => {
//   try {
//     console.log('📦 Creating compressed full database backup...');
    
//     const models = getAllModels();
//     const backupData = {
//       backupInfo: {
//         version: '1.0',
//         createdAt: new Date().toISOString(),
//         createdBy: req.user?.email || 'system',
//         database: mongoose.connection.name,
//         host: mongoose.connection.host
//       },
//       collections: {}
//     };
    
//     // Fetch data from each collection
//     for (const [collectionName, model] of Object.entries(models)) {
//       console.log(`📥 Fetching ${collectionName}...`);
//       const data = await model.find({}).lean();
//       backupData.collections[collectionName] = {
//         count: data.length,
//         data: data
//       };
//     }
    
//     // Create zip archive
//     const filename = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`;
//     res.setHeader('Content-Type', 'application/zip');
//     res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
//     const archive = archiver('zip', { zlib: { level: 9 } });
//     archive.pipe(res);
    
//     // Add backup.json to archive
//     archive.append(JSON.stringify(backupData, null, 2), { name: 'backup.json' });
    
//     // Add metadata file
//     const metadata = {
//       exportedAt: new Date().toISOString(),
//       exportedBy: req.user?.email,
//       collections: Object.keys(backupData.collections).map(key => ({
//         name: key,
//         count: backupData.collections[key].count
//       })),
//       totalRecords: Object.values(backupData.collections).reduce((sum, col) => sum + col.count, 0)
//     };
//     archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });
    
//     await archive.finalize();
//     console.log(`✅ Compressed backup created successfully: ${filename}`);
    
//   } catch (error) {
//     console.error('Error in createCompressedBackup:', error);
//     next(error);
//   }
// };

// // ============================================
// // CREATE SELECTIVE BACKUP (Specific collections)
// // ============================================

// export const createSelectiveBackup = async (req, res, next) => {
//   try {
//     const { collections } = req.query;
//     const selectedCollections = collections ? collections.split(',') : [];
    
//     console.log(`📦 Creating selective backup for: ${selectedCollections.join(', ')}`);
    
//     const allModels = getAllModels();
//     const models = {};
    
//     for (const collection of selectedCollections) {
//       if (allModels[collection]) {
//         models[collection] = allModels[collection];
//       }
//     }
    
//     if (Object.keys(models).length === 0) {
//       return errorResponse(res, 'No valid collections selected', 400);
//     }
    
//     const backupData = {
//       backupInfo: {
//         version: '1.0',
//         createdAt: new Date().toISOString(),
//         createdBy: req.user?.email || 'system',
//         database: mongoose.connection.name,
//         type: 'selective'
//       },
//       collections: {}
//     };
    
//     for (const [collectionName, model] of Object.entries(models)) {
//       console.log(`📥 Fetching ${collectionName}...`);
//       const data = await model.find({}).lean();
//       backupData.collections[collectionName] = {
//         count: data.length,
//         data: data
//       };
//     }
    
//     const filename = `selective_backup_${selectedCollections.join('_')}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
//     res.setHeader('Content-Type', 'application/json; charset=utf-8');
//     res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
//     return res.status(200).send(JSON.stringify(backupData, null, 2));
    
//   } catch (error) {
//     console.error('Error in createSelectiveBackup:', error);
//     next(error);
//   }
// };

// // ============================================
// // RESTORE FULL DATABASE FROM BACKUP
// // ============================================

// export const restoreFullBackup = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'Please upload a backup file', 400);
//     }
    
//     console.log('🔄 Starting full database restore...');
    
//     const fileContent = req.file.buffer.toString('utf8');
//     let backupData;
    
//     try {
//       backupData = JSON.parse(fileContent);
//     } catch (error) {
//       return errorResponse(res, 'Invalid backup file format', 400);
//     }
    
//     // Validate backup structure
//     if (!backupData.backupInfo || !backupData.collections) {
//       return errorResponse(res, 'Invalid backup file structure', 400);
//     }
    
//     const results = {
//       restored: [],
//       failed: [],
//       skipped: []
//     };
    
//     const models = getAllModels();
    
//     // Restore each collection
//     for (const [collectionName, collectionData] of Object.entries(backupData.collections)) {
//       if (!models[collectionName]) {
//         results.skipped.push({ collection: collectionName, reason: 'Model not found' });
//         continue;
//       }
      
//       try {
//         console.log(`🔄 Restoring ${collectionName} (${collectionData.count} records)...`);
        
//         // Clear existing data (optional - can be configurable)
//         if (req.query.clearExisting === 'true') {
//           await models[collectionName].deleteMany({});
//           console.log(`   🗑️ Cleared existing ${collectionName}`);
//         }
        
//         // Restore data
//         let restoredCount = 0;
//         for (const item of collectionData.data) {
//           try {
//             // Remove _id to let MongoDB generate new ones (or keep for consistency)
//             if (req.query.keepIds !== 'true') {
//               delete item._id;
//             }
//             await models[collectionName].create(item);
//             restoredCount++;
//           } catch (itemError) {
//             console.error(`   ❌ Failed to restore item:`, itemError.message);
//           }
//         }
        
//         results.restored.push({ 
//           collection: collectionName, 
//           count: restoredCount,
//           total: collectionData.count 
//         });
//         console.log(`   ✅ Restored ${restoredCount}/${collectionData.count} ${collectionName}`);
        
//       } catch (error) {
//         results.failed.push({ collection: collectionName, error: error.message });
//         console.error(`   ❌ Failed to restore ${collectionName}:`, error.message);
//       }
//     }
    
//     successResponse(res, results, 'Database restore completed');
    
//   } catch (error) {
//     console.error('Error in restoreFullBackup:', error);
//     next(error);
//   }
// };

// // ============================================
// // RESTORE SINGLE COLLECTION
// // ============================================

// export const restoreCollection = async (req, res, next) => {
//   try {
//     const { collectionName } = req.params;
    
//     if (!req.file) {
//       return errorResponse(res, 'Please upload a backup file', 400);
//     }
    
//     console.log(`🔄 Restoring ${collectionName} collection...`);
    
//     const fileContent = req.file.buffer.toString('utf8');
//     let backupData;
    
//     try {
//       backupData = JSON.parse(fileContent);
//     } catch (error) {
//       return errorResponse(res, 'Invalid backup file format', 400);
//     }
    
//     const models = getAllModels();
    
//     if (!models[collectionName]) {
//       return errorResponse(res, `Collection '${collectionName}' not found`, 404);
//     }
    
//     if (!backupData.collections || !backupData.collections[collectionName]) {
//       return errorResponse(res, `No data found for collection '${collectionName}' in backup`, 404);
//     }
    
//     const collectionData = backupData.collections[collectionName];
    
//     // Clear existing data
//     if (req.query.clearExisting === 'true') {
//       await models[collectionName].deleteMany({});
//       console.log(`   🗑️ Cleared existing ${collectionName}`);
//     }
    
//     // Restore data
//     let restoredCount = 0;
//     for (const item of collectionData.data) {
//       try {
//         if (req.query.keepIds !== 'true') {
//           delete item._id;
//         }
//         await models[collectionName].create(item);
//         restoredCount++;
//       } catch (itemError) {
//         console.error(`   ❌ Failed to restore item:`, itemError.message);
//       }
//     }
    
//     successResponse(res, {
//       collection: collectionName,
//       restored: restoredCount,
//       total: collectionData.count
//     }, `${collectionName} restored successfully`);
    
//   } catch (error) {
//     console.error('Error in restoreCollection:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET BACKUP INFO (Available collections and counts)
// // ============================================

// export const getBackupInfo = async (req, res, next) => {
//   try {
//     const models = getAllModels();
//     const info = {};
    
//     for (const [collectionName, model] of Object.entries(models)) {
//       const count = await model.countDocuments();
//       info[collectionName] = {
//         count,
//         model: collectionName,
//         fields: Object.keys(model.schema.paths).slice(0, 10) // Show first 10 fields
//       };
//     }
    
//     successResponse(res, {
//       database: mongoose.connection.name,
//       host: mongoose.connection.host,
//       collections: info,
//       totalRecords: Object.values(info).reduce((sum, col) => sum + col.count, 0),
//       backupAvailable: true
//     });
    
//   } catch (error) {
//     console.error('Error in getBackupInfo:', error);
//     next(error);
//   }
// };

// // ============================================
// // SCHEDULED BACKUP (Create backup file on server)
// // ============================================

// export const createScheduledBackup = async (req, res, next) => {
//   try {
//     console.log('📦 Creating scheduled backup...');
    
//     const models = getAllModels();
//     const backupDir = path.join(process.cwd(), 'backups');
    
//     if (!fs.existsSync(backupDir)) {
//       fs.mkdirSync(backupDir, { recursive: true });
//     }
    
//     const backupData = {
//       backupInfo: {
//         version: '1.0',
//         createdAt: new Date().toISOString(),
//         type: 'scheduled',
//         database: mongoose.connection.name
//       },
//       collections: {}
//     };
    
//     for (const [collectionName, model] of Object.entries(models)) {
//       const data = await model.find({}).lean();
//       backupData.collections[collectionName] = {
//         count: data.length,
//         data: data
//       };
//     }
    
//     const filename = `scheduled_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
//     const filepath = path.join(backupDir, filename);
    
//     fs.writeFileSync(filepath, JSON.stringify(backupData, null, 2));
    
//     // Keep only last 10 backups
//     const files = fs.readdirSync(backupDir)
//       .filter(f => f.startsWith('scheduled_backup_'))
//       .sort()
//       .reverse();
    
//     for (let i = 10; i < files.length; i++) {
//       fs.unlinkSync(path.join(backupDir, files[i]));
//       console.log(`🗑️ Deleted old backup: ${files[i]}`);
//     }
    
//     successResponse(res, {
//       filename,
//       filepath,
//       size: fs.statSync(filepath).size,
//       createdAt: backupData.backupInfo.createdAt
//     }, 'Scheduled backup created successfully');
    
//   } catch (error) {
//     console.error('Error in createScheduledBackup:', error);
//     next(error);
//   }
// };

// // ============================================
// // LIST AVAILABLE BACKUPS
// // ============================================

// export const listBackups = async (req, res, next) => {
//   try {
//     const backupDir = path.join(process.cwd(), 'backups');
    
//     if (!fs.existsSync(backupDir)) {
//       return successResponse(res, { backups: [], message: 'No backups found' });
//     }
    
//     const files = fs.readdirSync(backupDir)
//       .filter(f => f.endsWith('.json'))
//       .map(filename => {
//         const filepath = path.join(backupDir, filename);
//         const stats = fs.statSync(filepath);
//         return {
//           filename,
//           size: stats.size,
//           sizeFormatted: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
//           createdAt: stats.birthtime,
//           modifiedAt: stats.mtime
//         };
//       })
//       .sort((a, b) => b.createdAt - a.createdAt);
    
//     successResponse(res, {
//       backups: files,
//       totalBackups: files.length,
//       backupDirectory: backupDir
//     });
    
//   } catch (error) {
//     console.error('Error in listBackups:', error);
//     next(error);
//   }
// };

// // ============================================
// // DOWNLOAD SCHEDULED BACKUP
// // ============================================

// export const downloadBackup = async (req, res, next) => {
//   try {
//     const { filename } = req.params;
//     const backupDir = path.join(process.cwd(), 'backups');
//     const filepath = path.join(backupDir, filename);
    
//     if (!fs.existsSync(filepath)) {
//       return errorResponse(res, 'Backup file not found', 404);
//     }
    
//     res.setHeader('Content-Type', 'application/json');
//     res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
//     res.sendFile(filepath);
    
//   } catch (error) {
//     console.error('Error in downloadBackup:', error);
//     next(error);
//   }
// };

// // ============================================
// // DELETE BACKUP FILE
// // ============================================

// export const deleteBackup = async (req, res, next) => {
//   try {
//     const { filename } = req.params;
//     const backupDir = path.join(process.cwd(), 'backups');
//     const filepath = path.join(backupDir, filename);
    
//     if (!fs.existsSync(filepath)) {
//       return errorResponse(res, 'Backup file not found', 404);
//     }
    
//     fs.unlinkSync(filepath);
    
//     successResponse(res, { filename }, 'Backup deleted successfully');
    
//   } catch (error) {
//     console.error('Error in deleteBackup:', error);
//     next(error);
//   }
// };
















// server/controllers/backup.controller.js
import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
import { successResponse, errorResponse } from '../utils/response.js';

// Use require for CommonJS modules
const require = createRequire(import.meta.url);
const archiver = require('archiver');

// Import existing models
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Poem from '../models/Poem.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Settings from '../models/Settings.js';

// Optional models - wrap in try-catch
let Notification, HomepageBanner;

try {
  Notification = (await import('../models/Notification.js')).default;
} catch (e) {
  console.log('⚠️ Notification model not found, skipping...');
}

try {
  HomepageBanner = (await import('../models/HomepageBanner.js')).default;
} catch (e) {
  console.log('⚠️ HomepageBanner model not found, skipping...');
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const getAllModels = () => {
  const models = {
    authors: Author,
    books: Book,
    poems: Poem,
    audio: Audio,
    videos: Video,
    users: User,
    categories: Category,
    settings: Settings
  };
  
  if (Notification) models.notifications = Notification;
  if (HomepageBanner) models.homepageBanners = HomepageBanner;
  
  return models;
};

// ============================================
// CREATE FULL DATABASE BACKUP (JSON)
// ============================================

export const createFullBackup = async (req, res, next) => {
  try {
    console.log('📦 Creating full database backup...');
    
    const models = getAllModels();
    const backupData = {
      backupInfo: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        createdBy: req.user?.email || 'system',
        database: mongoose.connection.name,
        host: mongoose.connection.host
      },
      collections: {}
    };
    
    for (const [collectionName, model] of Object.entries(models)) {
      console.log(`📥 Fetching ${collectionName}...`);
      try {
        const data = await model.find({}).lean();
        backupData.collections[collectionName] = {
          count: data.length,
          data: data
        };
        console.log(`   ✅ Fetched ${data.length} ${collectionName}`);
      } catch (err) {
        console.log(`   ⚠️ Could not fetch ${collectionName}: ${err.message}`);
        backupData.collections[collectionName] = {
          count: 0,
          data: [],
          error: err.message
        };
      }
    }
    
    const backupJson = JSON.stringify(backupData, null, 2);
    const filename = `full_backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    
    console.log(`✅ JSON backup created successfully: ${filename}`);
    return res.status(200).send(backupJson);
    
  } catch (error) {
    console.error('Error in createFullBackup:', error);
    next(error);
  }
};

// ============================================
// CREATE COMPRESSED BACKUP (ZIP)
// ============================================

export const createCompressedBackup = async (req, res, next) => {
  try {
    console.log('📦 Creating compressed ZIP database backup...');
    
    const models = getAllModels();
    const backupData = {
      backupInfo: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        createdBy: req.user?.email || 'system',
        database: mongoose.connection.name,
        host: mongoose.connection.host
      },
      collections: {}
    };
    
    // Fetch data from all collections
    for (const [collectionName, model] of Object.entries(models)) {
      console.log(`📥 Fetching ${collectionName}...`);
      try {
        const data = await model.find({}).lean();
        backupData.collections[collectionName] = {
          count: data.length,
          data: data
        };
        console.log(`   ✅ Fetched ${data.length} ${collectionName}`);
      } catch (err) {
        console.log(`   ⚠️ Could not fetch ${collectionName}: ${err.message}`);
        backupData.collections[collectionName] = {
          count: 0,
          data: [],
          error: err.message
        };
      }
    }
    
    // Create zip archive
    const filename = `backup_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`;
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Access-Control-Expose-Headers', 'Content-Disposition');
    
    const archive = archiver('zip', { 
      zlib: { level: 9 } // Maximum compression
    });
    
    // Handle archive warnings
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Archive warning:', err);
      } else {
        throw err;
      }
    });
    
    // Handle archive errors
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });
    
    // Pipe archive data to response
    archive.pipe(res);
    
    // Add backup.json to archive
    archive.append(JSON.stringify(backupData, null, 2), { name: 'backup.json' });
    
    // Add metadata file
    const metadata = {
      exportedAt: new Date().toISOString(),
      exportedBy: req.user?.email,
      collections: Object.keys(backupData.collections).map(key => ({
        name: key,
        count: backupData.collections[key].count
      })),
      totalRecords: Object.values(backupData.collections).reduce((sum, col) => sum + col.count, 0),
      databaseInfo: {
        name: mongoose.connection.name,
        host: mongoose.connection.host,
        version: mongoose.version
      }
    };
    archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });
    
    // Add a README file
    const readme = `Database Backup
================
Created: ${new Date().toISOString()}
Database: ${mongoose.connection.name}
Host: ${mongoose.connection.host}
Total Records: ${metadata.totalRecords}
Collections: ${metadata.collections.length}

Files included:
- backup.json: Complete database backup in JSON format
- metadata.json: Information about this backup

Restore Instructions:
1. Go to Admin Panel > Backup Management
2. Click "Restore Database"
3. Upload this ZIP file or the backup.json file
4. Confirm restore operation

For support: ${req.user?.email || 'admin@zauqapp.com'}
`;
    archive.append(readme, { name: 'README.txt' });
    
    // Finalize archive
    await archive.finalize();
    
    console.log(`✅ ZIP backup created successfully: ${filename}`);
    
  } catch (error) {
    console.error('Error in createCompressedBackup:', error);
    next(error);
  }
};

// ============================================
// CREATE SELECTIVE BACKUP (Specific collections)
// ============================================

export const createSelectiveBackup = async (req, res, next) => {
  try {
    const { collections } = req.query;
    const selectedCollections = collections ? collections.split(',') : [];
    
    console.log(`📦 Creating selective backup for: ${selectedCollections.join(', ')}`);
    
    const allModels = getAllModels();
    const models = {};
    
    for (const collection of selectedCollections) {
      if (allModels[collection]) {
        models[collection] = allModels[collection];
      }
    }
    
    if (Object.keys(models).length === 0) {
      return errorResponse(res, 'No valid collections selected', 400);
    }
    
    const backupData = {
      backupInfo: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        createdBy: req.user?.email || 'system',
        database: mongoose.connection.name,
        type: 'selective',
        selectedCollections: selectedCollections
      },
      collections: {}
    };
    
    for (const [collectionName, model] of Object.entries(models)) {
      console.log(`📥 Fetching ${collectionName}...`);
      const data = await model.find({}).lean();
      backupData.collections[collectionName] = {
        count: data.length,
        data: data
      };
    }
    
    const filename = `selective_backup_${selectedCollections.join('_')}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.json`;
    
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
    return res.status(200).send(JSON.stringify(backupData, null, 2));
    
  } catch (error) {
    console.error('Error in createSelectiveBackup:', error);
    next(error);
  }
};

// ============================================
// CREATE SELECTIVE COMPRESSED BACKUP (ZIP)
// ============================================

export const createSelectiveCompressedBackup = async (req, res, next) => {
  try {
    const { collections } = req.query;
    const selectedCollections = collections ? collections.split(',') : [];
    
    console.log(`📦 Creating selective ZIP backup for: ${selectedCollections.join(', ')}`);
    
    const allModels = getAllModels();
    const models = {};
    
    for (const collection of selectedCollections) {
      if (allModels[collection]) {
        models[collection] = allModels[collection];
      }
    }
    
    if (Object.keys(models).length === 0) {
      return errorResponse(res, 'No valid collections selected', 400);
    }
    
    const backupData = {
      backupInfo: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        createdBy: req.user?.email || 'system',
        database: mongoose.connection.name,
        type: 'selective',
        selectedCollections: selectedCollections
      },
      collections: {}
    };
    
    for (const [collectionName, model] of Object.entries(models)) {
      console.log(`📥 Fetching ${collectionName}...`);
      const data = await model.find({}).lean();
      backupData.collections[collectionName] = {
        count: data.length,
        data: data
      };
    }
    
    const filename = `selective_backup_${selectedCollections.join('_')}_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.zip`;
    
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    archive.on('error', (err) => {
      console.error('Archive error:', err);
      throw err;
    });
    
    archive.pipe(res);
    
    // Add backup.json to archive
    archive.append(JSON.stringify(backupData, null, 2), { name: 'backup.json' });
    
    // Add metadata file
    const metadata = {
      exportedAt: new Date().toISOString(),
      exportedBy: req.user?.email,
      collections: Object.keys(backupData.collections).map(key => ({
        name: key,
        count: backupData.collections[key].count
      })),
      totalRecords: Object.values(backupData.collections).reduce((sum, col) => sum + col.count, 0)
    };
    archive.append(JSON.stringify(metadata, null, 2), { name: 'metadata.json' });
    
    await archive.finalize();
    
    console.log(`✅ Selective ZIP backup created successfully: ${filename}`);
    
  } catch (error) {
    console.error('Error in createSelectiveCompressedBackup:', error);
    next(error);
  }
};

// ============================================
// GET BACKUP INFO (Available collections and counts)
// ============================================

export const getBackupInfo = async (req, res, next) => {
  try {
    const models = getAllModels();
    const info = {};
    
    for (const [collectionName, model] of Object.entries(models)) {
      try {
        const count = await model.countDocuments();
        info[collectionName] = {
          count,
          model: collectionName,
          fields: Object.keys(model.schema.paths).slice(0, 10)
        };
      } catch (err) {
        info[collectionName] = {
          count: 0,
          model: collectionName,
          error: err.message
        };
      }
    }
    
    successResponse(res, {
      database: mongoose.connection.name,
      host: mongoose.connection.host,
      collections: info,
      totalRecords: Object.values(info).reduce((sum, col) => sum + col.count, 0),
      backupAvailable: true,
      serverTime: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error in getBackupInfo:', error);
    next(error);
  }
};

// ============================================
// CREATE SCHEDULED BACKUP (Save to server)
// ============================================

export const createScheduledBackup = async (req, res, next) => {
  try {
    console.log('📦 Creating scheduled backup...');
    
    const models = getAllModels();
    const backupDir = path.join(process.cwd(), 'backups');
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupData = {
      backupInfo: {
        version: '1.0',
        createdAt: new Date().toISOString(),
        type: 'scheduled',
        database: mongoose.connection.name,
        createdBy: req.user?.email || 'system'
      },
      collections: {}
    };
    
    for (const [collectionName, model] of Object.entries(models)) {
      try {
        const data = await model.find({}).lean();
        backupData.collections[collectionName] = {
          count: data.length,
          data: data
        };
      } catch (err) {
        backupData.collections[collectionName] = {
          count: 0,
          data: [],
          error: err.message
        };
      }
    }
    
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
    const filename = `scheduled_backup_${timestamp}.json`;
    const filepath = path.join(backupDir, filename);
    
    fs.writeFileSync(filepath, JSON.stringify(backupData, null, 2));
    
    // Also create a ZIP version
    const zipFilename = `scheduled_backup_${timestamp}.zip`;
    const zipFilepath = path.join(backupDir, zipFilename);
    
    const output = fs.createWriteStream(zipFilepath);
    const archive = archiver('zip', { zlib: { level: 9 } });
    
    await new Promise((resolve, reject) => {
      output.on('close', resolve);
      archive.on('error', reject);
      archive.pipe(output);
      archive.append(JSON.stringify(backupData, null, 2), { name: 'backup.json' });
      archive.finalize();
    });
    
    // Keep only last 10 backups
    const files = fs.readdirSync(backupDir)
      .filter(f => f.startsWith('scheduled_backup_'))
      .sort()
      .reverse();
    
    for (let i = 10; i < files.length; i++) {
      fs.unlinkSync(path.join(backupDir, files[i]));
      console.log(`🗑️ Deleted old backup: ${files[i]}`);
    }
    
    successResponse(res, {
      filename,
      zipFilename,
      filepath,
      zipFilepath,
      size: fs.statSync(filepath).size,
      zipSize: fs.statSync(zipFilepath).size,
      createdAt: backupData.backupInfo.createdAt
    }, 'Scheduled backup created successfully');
    
  } catch (error) {
    console.error('Error in createScheduledBackup:', error);
    next(error);
  }
};

// ============================================
// LIST AVAILABLE BACKUPS
// ============================================

export const listBackups = async (req, res, next) => {
  try {
    const backupDir = path.join(process.cwd(), 'backups');
    
    if (!fs.existsSync(backupDir)) {
      return successResponse(res, { backups: [], message: 'No backups found' });
    }
    
    const files = fs.readdirSync(backupDir)
      .filter(f => f.endsWith('.json') || f.endsWith('.zip'))
      .map(filename => {
        const filepath = path.join(backupDir, filename);
        const stats = fs.statSync(filepath);
        return {
          filename,
          size: stats.size,
          sizeFormatted: `${(stats.size / 1024 / 1024).toFixed(2)} MB`,
          type: filename.endsWith('.zip') ? 'zip' : 'json',
          createdAt: stats.birthtime,
          modifiedAt: stats.mtime
        };
      })
      .sort((a, b) => b.createdAt - a.createdAt);
    
    successResponse(res, {
      backups: files,
      totalBackups: files.length,
      backupDirectory: backupDir,
      totalSize: files.reduce((sum, f) => sum + f.size, 0)
    });
    
  } catch (error) {
    console.error('Error in listBackups:', error);
    next(error);
  }
};

// ============================================
// DOWNLOAD SCHEDULED BACKUP
// ============================================

export const downloadBackup = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const backupDir = path.join(process.cwd(), 'backups');
    const filepath = path.join(backupDir, filename);
    
    // Security: Prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return errorResponse(res, 'Invalid filename', 400);
    }
    
    if (!fs.existsSync(filepath)) {
      return errorResponse(res, 'Backup file not found', 404);
    }
    
    const contentType = filename.endsWith('.zip') ? 'application/zip' : 'application/json';
    
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.sendFile(filepath);
    
  } catch (error) {
    console.error('Error in downloadBackup:', error);
    next(error);
  }
};

// ============================================
// DELETE BACKUP FILE
// ============================================

export const deleteBackup = async (req, res, next) => {
  try {
    const { filename } = req.params;
    const backupDir = path.join(process.cwd(), 'backups');
    const filepath = path.join(backupDir, filename);
    
    // Security: Prevent directory traversal
    if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return errorResponse(res, 'Invalid filename', 400);
    }
    
    if (!fs.existsSync(filepath)) {
      return errorResponse(res, 'Backup file not found', 404);
    }
    
    fs.unlinkSync(filepath);
    
    successResponse(res, { filename }, 'Backup deleted successfully');
    
  } catch (error) {
    console.error('Error in deleteBackup:', error);
    next(error);
  }
};

// ============================================
// RESTORE FULL DATABASE FROM BACKUP
// ============================================

export const restoreFullBackup = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'Please upload a backup file', 400);
    }
    
    console.log('🔄 Starting full database restore...');
    
    let backupData;
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    const originalName = req.file.originalname;
    
    try {
      // Handle ZIP file
      if (fileType === 'application/zip' || originalName.endsWith('.zip')) {
        console.log('📦 Detected ZIP file, extracting...');
        const { extractZipBackup } = await import('../utils/backupUtils.js');
        backupData = await extractZipBackup(fileBuffer);
      } else {
        // Handle JSON file
        const fileContent = fileBuffer.toString('utf8');
        backupData = JSON.parse(fileContent);
      }
    } catch (error) {
      console.error('Parse error:', error);
      return errorResponse(res, 'Invalid backup file format or corrupted file', 400);
    }
    
    // Validate backup structure
    if (!backupData.backupInfo || !backupData.collections) {
      return errorResponse(res, 'Invalid backup file structure', 400);
    }
    
    const results = {
      restored: [],
      failed: [],
      skipped: [],
      backupInfo: backupData.backupInfo
    };
    
    const models = getAllModels();
    
    for (const [collectionName, collectionData] of Object.entries(backupData.collections)) {
      if (!models[collectionName]) {
        results.skipped.push({ collection: collectionName, reason: 'Model not found' });
        continue;
      }
      
      try {
        console.log(`🔄 Restoring ${collectionName} (${collectionData.count} records)...`);
        
        if (req.query.clearExisting === 'true') {
          await models[collectionName].deleteMany({});
          console.log(`   🗑️ Cleared existing ${collectionName}`);
        }
        
        let restoredCount = 0;
        for (const item of collectionData.data) {
          try {
            if (req.query.keepIds !== 'true') {
              delete item._id;
            }
            await models[collectionName].create(item);
            restoredCount++;
          } catch (itemError) {
            console.error(`   ❌ Failed to restore item:`, itemError.message);
          }
        }
        
        results.restored.push({ 
          collection: collectionName, 
          count: restoredCount,
          total: collectionData.count 
        });
        console.log(`   ✅ Restored ${restoredCount}/${collectionData.count} ${collectionName}`);
        
      } catch (error) {
        results.failed.push({ collection: collectionName, error: error.message });
        console.error(`   ❌ Failed to restore ${collectionName}:`, error.message);
      }
    }
    
    successResponse(res, results, 'Database restore completed');
    
  } catch (error) {
    console.error('Error in restoreFullBackup:', error);
    next(error);
  }
};

// ============================================
// RESTORE SINGLE COLLECTION
// ============================================

export const restoreCollection = async (req, res, next) => {
  try {
    const { collectionName } = req.params;
    
    if (!req.file) {
      return errorResponse(res, 'Please upload a backup file', 400);
    }
    
    console.log(`🔄 Restoring ${collectionName} collection...`);
    
    let backupData;
    const fileBuffer = req.file.buffer;
    const fileType = req.file.mimetype;
    const originalName = req.file.originalname;
    
    try {
      if (fileType === 'application/zip' || originalName.endsWith('.zip')) {
        const { extractZipBackup } = await import('../utils/backupUtils.js');
        backupData = await extractZipBackup(fileBuffer);
      } else {
        const fileContent = fileBuffer.toString('utf8');
        backupData = JSON.parse(fileContent);
      }
    } catch (error) {
      return errorResponse(res, 'Invalid backup file format', 400);
    }
    
    const models = getAllModels();
    
    if (!models[collectionName]) {
      return errorResponse(res, `Collection '${collectionName}' not found`, 404);
    }
    
    if (!backupData.collections || !backupData.collections[collectionName]) {
      return errorResponse(res, `No data found for collection '${collectionName}' in backup`, 404);
    }
    
    const collectionData = backupData.collections[collectionName];
    
    if (req.query.clearExisting === 'true') {
      await models[collectionName].deleteMany({});
      console.log(`   🗑️ Cleared existing ${collectionName}`);
    }
    
    let restoredCount = 0;
    for (const item of collectionData.data) {
      try {
        if (req.query.keepIds !== 'true') {
          delete item._id;
        }
        await models[collectionName].create(item);
        restoredCount++;
      } catch (itemError) {
        console.error(`   ❌ Failed to restore item:`, itemError.message);
      }
    }
    
    successResponse(res, {
      collection: collectionName,
      restored: restoredCount,
      total: collectionData.count
    }, `${collectionName} restored successfully`);
    
  } catch (error) {
    console.error('Error in restoreCollection:', error);
    next(error);
  }
};