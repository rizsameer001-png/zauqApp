// // server/routes/backup.routes.js
// import express from 'express';
// import multer from 'multer';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   createFullBackup,
//   createCompressedBackup,
//   createSelectiveBackup,
//   restoreFullBackup,
//   restoreCollection,
//   getBackupInfo,
//   createScheduledBackup,
//   listBackups,
//   downloadBackup,
//   deleteBackup
// } from '../controllers/backup.controller.js';

// const router = express.Router();

// // Configure multer for file upload (restore)
// const upload = multer({ 
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
// });

// // ============================================
// // BACKUP ROUTES (Admin only)
// // ============================================

// // Get backup info (available collections and counts)
// router.get('/info', protect, adminOnly, getBackupInfo);

// // Create full backup (downloads JSON)
// router.get('/full', protect, adminOnly, createFullBackup);

// // Create compressed backup (ZIP)
// router.get('/compressed', protect, adminOnly, createCompressedBackup);

// // Create selective backup (specific collections)
// router.get('/selective', protect, adminOnly, createSelectiveBackup);

// // Create scheduled backup (saves to server)
// router.post('/scheduled', protect, adminOnly, createScheduledBackup);

// // List available scheduled backups
// router.get('/list', protect, adminOnly, listBackups);

// // Download scheduled backup
// router.get('/download/:filename', protect, adminOnly, downloadBackup);

// // Delete scheduled backup
// router.delete('/delete/:filename', protect, adminOnly, deleteBackup);

// // Restore full database from backup
// router.post('/restore', protect, adminOnly, upload.single('backupFile'), restoreFullBackup);

// // Restore single collection
// router.post('/restore/:collectionName', protect, adminOnly, upload.single('backupFile'), restoreCollection);


// export default router;












// server/routes/backup.routes.js
import express from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  createFullBackup,
  createCompressedBackup,
  createSelectiveBackup,
  createSelectiveCompressedBackup,
  getBackupInfo,
  createScheduledBackup,
  listBackups,
  downloadBackup,
  deleteBackup,
  restoreFullBackup,
  restoreCollection
} from '../controllers/backup.controller.js';

const router = express.Router();

// Configure multer for file upload (restore)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// ============================================
// BACKUP ROUTES (Admin only)
// ============================================

// Get backup info (available collections and counts)
router.get('/info', protect, adminOnly, getBackupInfo);

// Create full backup (downloads JSON)
router.get('/full', protect, adminOnly, createFullBackup);

// Create compressed backup (ZIP)
router.get('/compressed', protect, adminOnly, createCompressedBackup);

// Create selective backup (specific collections - JSON)
router.get('/selective', protect, adminOnly, createSelectiveBackup);

// Create selective compressed backup (specific collections - ZIP)
router.get('/selective-compressed', protect, adminOnly, createSelectiveCompressedBackup);

// Create scheduled backup (saves to server)
router.post('/scheduled', protect, adminOnly, createScheduledBackup);

// List available scheduled backups
router.get('/list', protect, adminOnly, listBackups);

// Download scheduled backup
router.get('/download/:filename', protect, adminOnly, downloadBackup);

// Delete scheduled backup
router.delete('/delete/:filename', protect, adminOnly, deleteBackup);

// Restore full database from backup
router.post('/restore', protect, adminOnly, upload.single('backupFile'), restoreFullBackup);

// Restore single collection
router.post('/restore/:collectionName', protect, adminOnly, upload.single('backupFile'), restoreCollection);

export default router;