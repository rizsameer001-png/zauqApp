// server/routes/appSettings.routes.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { protect, adminOnly } from '../middleware/auth.js';
import {
  getAllSettings,
  updateAllSettings,
  getSettingByKey,
  updateSettingByKey,
  resetAllSettings,
  uploadSiteLogo,
  generateNewApiKey,
  removeApiKey
} from '../controllers/appSettings.controller.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
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
      cb(new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'));
    }
  }
});

// ============================================
// All routes require admin authentication
// ============================================
router.use(protect, adminOnly);

// ============================================
// Settings CRUD
// ============================================

// Get all settings
router.get('/', getAllSettings);

// Update all settings
router.put('/', updateAllSettings);

// Reset all settings to defaults
router.post('/reset', resetAllSettings);

// Get single setting by key
router.get('/:key', getSettingByKey);

// Update single setting by key
router.put('/:key', updateSettingByKey);

// ============================================
// File Uploads
// ============================================

// Upload logo or favicon
router.post('/upload/:type', upload.single('logo'), uploadSiteLogo);

// ============================================
// API Keys Management
// ============================================

// Generate new API key
router.post('/api-keys', generateNewApiKey);

// Delete API key
router.delete('/api-keys/:keyId', removeApiKey);

export default router;