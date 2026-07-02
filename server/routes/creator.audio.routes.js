// server/routes/creator.audio.routes.js
import express from 'express';
import { protect, creatorOnly } from '../middleware/auth.js';
import {
  uploadAudio,
  getCreatorAudio,
  getCreatorAudioById,
  updateCreatorAudio,
  deleteCreatorAudio,
  publishCreatorAudio,
  unpublishCreatorAudio,
  bulkDeleteCreatorAudio,
  getCreatorAudioPresets
} from '../controllers/creator.audio.controller.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Upload audio
router.post(
  '/upload',
  protect,
  creatorOnly,
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  uploadAudio
);

// Get all creator audio
router.get('/', protect, creatorOnly, getCreatorAudio);

// Get audio presets
router.get('/presets', protect, creatorOnly, getCreatorAudioPresets);

// Get single audio
router.get('/:id', protect, creatorOnly, getCreatorAudioById);

// Update audio
router.put(
  '/:id',
  protect,
  creatorOnly,
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 }
  ]),
  updateCreatorAudio
);

// Delete audio
router.delete('/:id', protect, creatorOnly, deleteCreatorAudio);

// Publish audio
router.patch('/:id/publish', protect, creatorOnly, publishCreatorAudio);

// Unpublish audio
router.patch('/:id/unpublish', protect, creatorOnly, unpublishCreatorAudio);

// Bulk delete
router.post('/bulk-delete', protect, creatorOnly, bulkDeleteCreatorAudio);

export default router;