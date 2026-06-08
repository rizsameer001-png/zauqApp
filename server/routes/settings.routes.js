// // server/routes/settings.routes.js
// import express from 'express';
// import multer from 'multer';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getSettings,
//   updateSettings,
//   resetSettings,
//   getMaintenanceStatus,
//   updateMaintenanceMode,
//   uploadLogo,
//   uploadBanner,
//   generateApiKey,
//   deleteApiKey
// } from '../controllers/settings.controller.js';

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG, WebP are allowed.'));
//     }
//   }
// });

// // All settings routes require admin authentication
// router.use(protect, adminOnly);

// // Settings CRUD
// router.get('/', getSettings);
// router.put('/', updateSettings);
// router.post('/reset', resetSettings);

// // Maintenance
// router.get('/maintenance', getMaintenanceStatus);
// router.put('/maintenance', updateMaintenanceMode);

// // File uploads
// router.post('/logo/:type', upload.single('logo'), uploadLogo);
// router.post('/banner', upload.single('banner'), uploadBanner);

// // API Keys
// router.post('/api-keys', generateApiKey);
// router.delete('/api-keys/:keyId', deleteApiKey);

// export default router;












// // server/routes/settings.routes.js
// import express from 'express';
// import multer from 'multer';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getSettings,
//   updateSettings,
//   resetSettings,
//   getMaintenanceStatus,
//   updateMaintenanceMode,
//   uploadLogo,
//   uploadBanner,
//   generateApiKey,
//   deleteApiKey,
//   getPublicSettings,
//   getThemeSettings,
//   getPublicMaintenanceStatus
// } from '../controllers/settings.controller.js';

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG, WebP are allowed.'));
//     }
//   }
// });

// // ============================================
// // PUBLIC ROUTES (No authentication required)
// // ============================================

// // Get public settings for frontend (site name, logo, favicon, theme colors)
// router.get('/public', getPublicSettings);

// // Get theme settings only
// router.get('/theme', getThemeSettings);

// // Get public maintenance status (for maintenance page)
// router.get('/maintenance/public', getPublicMaintenanceStatus);

// // ============================================
// // ADMIN ROUTES (Authentication + Admin role required)
// // ============================================

// // All routes below this middleware require admin authentication
// router.use(protect, adminOnly);

// // Settings CRUD
// router.get('/', getSettings);
// router.put('/', updateSettings);
// router.post('/reset', resetSettings);

// // Maintenance
// router.get('/maintenance', getMaintenanceStatus);
// router.put('/maintenance', updateMaintenanceMode);

// // File uploads
// router.post('/logo/:type', upload.single('logo'), uploadLogo);
// router.post('/banner', upload.single('banner'), uploadBanner);

// // API Keys
// router.post('/api-keys', generateApiKey);
// router.delete('/api-keys/:keyId', deleteApiKey);

// export default router;









// // server/routes/settings.routes.js
// import express from 'express';
// import multer from 'multer';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getSettings,
//   updateSettings,
//   resetSettings,
//   getMaintenanceStatus,
//   updateMaintenanceMode,
//   uploadLogo,
//   uploadBanner,
//   generateApiKey,
//   deleteApiKey,
//   // Public route functions are handled in publicSettings.routes.js
//   // These are only for admin routes
// } from '../controllers/settings.controller.js';

// const router = express.Router();

// // Configure multer for file uploads (temporary storage - will be moved to cloudinary)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const extension = file.mimetype.split('/')[1];
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
//     }
//   }
// });

// // ============================================
// // IMPORTANT: This router handles ONLY admin routes
// // Public routes are in publicSettings.routes.js
// // ============================================

// // ============================================
// // ADMIN ROUTES (Authentication + Admin role required)
// // ============================================

// // All routes below this middleware require admin authentication
// router.use(protect, adminOnly);

// // ===== Settings CRUD Operations =====

// // Get all settings (full access for admin)
// // GET /api/admin/settings
// router.get('/', getSettings);

// // Update settings (all settings)
// // PUT /api/admin/settings
// router.put('/', updateSettings);

// // Reset settings to factory defaults
// // POST /api/admin/settings/reset
// router.post('/reset', resetSettings);

// // ===== Maintenance Mode Management =====

// // Get maintenance mode status and message
// // GET /api/admin/settings/maintenance
// router.get('/maintenance', getMaintenanceStatus);

// // Enable/disable maintenance mode
// // PUT /api/admin/settings/maintenance
// // Body: { enabled: true/false, message: "Custom message" }
// router.put('/maintenance', updateMaintenanceMode);

// // ===== File Upload Management =====

// // Upload site logo or favicon
// // POST /api/admin/settings/logo/:type
// // type: 'logo' or 'favicon'
// // Form-data: 'logo' file
// router.post('/logo/:type', upload.single('logo'), uploadLogo);

// // Upload banner image (for homepage or promotional banners)
// // POST /api/admin/settings/banner
// // Form-data: 'banner' file
// router.post('/banner', upload.single('banner'), uploadBanner);

// // ===== API Key Management =====

// // Generate a new API key
// // POST /api/admin/settings/api-keys
// // Body: { name: "Key Name" }
// router.post('/api-keys', generateApiKey);

// // Delete an API key
// // DELETE /api/admin/settings/api-keys/:keyId
// router.delete('/api-keys/:keyId', deleteApiKey);

// // ===== Email Settings (Optional - add if needed) =====
// // router.post('/test-email', testEmailConfig);

// // ===== Payment Gateway Settings (Optional - add if needed) =====
// // router.post('/test-payment', testPaymentGateway);

// // ===== Cache Management (Optional - add if needed) =====
// // router.post('/clear-cache', clearCache);

// // ===== Backup & Restore (Optional - add if needed) =====
// // router.post('/backup', backupSettings);
// // router.post('/restore', restoreSettings);

// // ===== System Health Check (Admin only) =====
// // router.get('/health', getSystemHealth);

// export default router;

















// // server/routes/settings.routes.js
// import express from 'express';
// import multer from 'multer';
// import fs from 'fs';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getSettings,
//   updateSettings,
//   resetSettings,
//   getMaintenanceStatus,
//   updateMaintenanceMode,
//   uploadLogo,
//   uploadBanner,
//   generateApiKey,
//   deleteApiKey,
// } from '../controllers/settings.controller.js';

// const router = express.Router();

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = 'uploads/';
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const extension = file.mimetype.split('/')[1];
//     cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
//   }
// });

// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
//     }
//   }
// });

// // ============================================
// // ADMIN ROUTES (Authentication + Admin role required)
// // ============================================

// // All routes below this middleware require admin authentication
// router.use(protect, adminOnly);

// // ===== Settings CRUD Operations =====
// router.get('/', getSettings);
// router.put('/', updateSettings);
// router.post('/reset', resetSettings);

// // ===== Maintenance Mode Management =====
// router.get('/maintenance', getMaintenanceStatus);
// router.put('/maintenance', updateMaintenanceMode);

// // ===== File Upload Management =====
// router.post('/logo/:type', upload.single('logo'), uploadLogo);
// router.post('/banner', upload.single('banner'), uploadBanner);

// // ===== API Key Management =====
// router.post('/api-keys', generateApiKey);
// router.delete('/api-keys/:keyId', deleteApiKey);

// export default router;











// server/routes/settings.routes.js

import express from 'express';
import multer from 'multer';
import fs from 'fs';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getSettings,
  updateSettings,
  resetSettings,
  getMaintenanceStatus,
  updateMaintenanceMode,
  uploadLogo,
  uploadBanner,
  generateApiKey,
  deleteApiKey,
} from '../controllers/settings.controller.js';

const router = express.Router();

// ================= Multer Config =================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = file.mimetype.split('/')[1];
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// ================= ADMIN ROUTES =================
router.use(protect, adminOnly);

// ✅ IMPORTANT: NO duplicate path here
router.get('/', getSettings);
router.put('/', updateSettings);
router.post('/reset', resetSettings);

router.get('/maintenance', getMaintenanceStatus);
router.put('/maintenance', updateMaintenanceMode);

router.post('/logo/:type', upload.single('logo'), uploadLogo);
router.post('/banner', upload.single('banner'), uploadBanner);

router.post('/api-keys', generateApiKey);
router.delete('/api-keys/:keyId', deleteApiKey);

export default router;