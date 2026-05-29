//server/middleware/upload.js

import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    'image/': ['jpeg', 'jpg', 'png', 'webp', 'gif'],
    'application/': ['pdf', 'epub'],
    'audio/': ['mpeg', 'mp3', 'wav', 'ogg'],
    'video/': ['mp4', 'webm', 'mov']
  };

  const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
  const mimePrefix = file.mimetype.split('/')[0] + '/';

  if (allowedTypes[mimePrefix]?.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`File type not allowed: ${file.mimetype}`), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB max
  }
});

export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: 'File too large. Max size is 100MB'
      });
    }
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }
  next(err);
};
