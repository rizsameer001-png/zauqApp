// server/routes/creator.upload.routes.js
import express from 'express';
import { protect, creatorOnly } from '../middleware/auth.js';
import {
  uploadPoetry,
  uploadEbook,
  uploadAudio,
  uploadVideo,
  uploadImage,
  uploadCover,
  deleteUploadedFile
} from '../controllers/creator.upload.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// ============================================
// CREATOR UPLOAD ROUTES
// ============================================

// Upload Poetry
router.post(
  '/poetry',
  protect,
  creatorOnly,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'audioFile', maxCount: 1 }
  ]),
  uploadPoetry
);

// Upload Ebook
router.post(
  '/ebook',
  protect,
  creatorOnly,
  upload.fields([
    { name: 'bookFile', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  uploadEbook
);

// Upload Audio
router.post(
  '/audio',
  protect,
  creatorOnly,
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  uploadAudio
);

// Upload Video
router.post(
  '/video',
  protect,
  creatorOnly,
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  uploadVideo
);

// Upload Image (generic)
router.post(
  '/image',
  protect,
  creatorOnly,
  upload.single('image'),
  uploadImage
);

// Upload Cover Image
router.post(
  '/cover',
  protect,
  creatorOnly,
  upload.single('cover'),
  uploadCover
);

// Delete uploaded file
router.delete(
  '/delete',
  protect,
  creatorOnly,
  deleteUploadedFile
);

export default router;