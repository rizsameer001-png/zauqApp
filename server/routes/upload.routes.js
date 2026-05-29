// // server/routes/upload.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { uploadImage, uploadEbook, uploadAudio, uploadVideo } from '../config/cloudinary.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// const router = express.Router();

// // Upload single image (cover, page images, etc.)
// router.post('/image', protect, adminOnly, uploadImage.single('image'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size
//     }, 'Image uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload multiple images
// router.post('/images', protect, adminOnly, uploadImage.array('images', 20), async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return errorResponse(res, 'No files uploaded', 400);
//     }
    
//     const uploadedFiles = req.files.map(file => ({
//       url: file.path,
//       publicId: file.filename,
//       format: file.format,
//       size: file.size
//     }));
    
//     successResponse(res, uploadedFiles, `${uploadedFiles.length} images uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload ebook (PDF/EPUB)
// router.post('/ebook', protect, adminOnly, uploadEbook.single('file'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size
//     }, 'Ebook uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload audio file
// router.post('/audio', protect, adminOnly, uploadAudio.single('audio'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       duration: req.body.duration || null
//     }, 'Audio uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload video file
// router.post('/video', protect, adminOnly, uploadVideo.single('video'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       duration: req.body.duration || null
//     }, 'Video uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Delete file from Cloudinary
// router.delete('/delete', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, resourceType = 'image' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType
//     });
    
//     if (result.result === 'ok') {
//       successResponse(res, null, 'File deleted successfully');
//     } else {
//       errorResponse(res, 'Failed to delete file', 400);
//     }
//   } catch (error) {
//     console.error('Delete error:', error);
//     next(error);
//   }
// });

// export default router;









// // server/routes/upload.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { 
//   uploadImage, 
//   uploadCoverImage,
//   uploadPageImages,
//   uploadPDF,
//   uploadEPUB,
//   uploadEbook, 
//   uploadAudio, 
//   uploadVideo 
// } from '../config/cloudinary.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';

// const router = express.Router();

// // ============================================
// // IMAGE UPLOADS
// // ============================================

// // Upload single image (generic)
// router.post('/image', protect, adminOnly, uploadImage.single('image'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'Image uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload cover image (optimized for book covers)
// router.post('/cover', protect, adminOnly, uploadCoverImage.single('image'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'Cover image uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload multiple images (general)
// router.post('/images', protect, adminOnly, uploadImage.array('images', 50), async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return errorResponse(res, 'No files uploaded', 400);
//     }
    
//     const uploadedFiles = req.files.map(file => ({
//       url: file.path,
//       publicId: file.filename,
//       format: file.format,
//       size: file.size,
//       originalName: file.originalname
//     }));
    
//     successResponse(res, uploadedFiles, `${uploadedFiles.length} images uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload page images for book reader
// router.post('/pages', protect, adminOnly, uploadPageImages.array('images', 500), async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return errorResponse(res, 'No files uploaded', 400);
//     }
    
//     const uploadedFiles = req.files.map(file => ({
//       url: file.path,
//       publicId: file.filename,
//       format: file.format,
//       size: file.size,
//       pageNumber: req.body.pageNumbers ? req.body.pageNumbers[req.files.indexOf(file)] : null
//     }));
    
//     successResponse(res, uploadedFiles, `${uploadedFiles.length} page images uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // ============================================
// // DOCUMENT UPLOADS (PDF, EPUB)
// // ============================================

// // Upload PDF file
// router.post('/pdf', protect, adminOnly, uploadPDF.single('file'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: 'pdf',
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'PDF uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload EPUB file
// router.post('/epub', protect, adminOnly, uploadEPUB.single('file'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: 'epub',
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'EPUB uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload ebook (PDF or EPUB) - auto-detects format
// router.post('/ebook', protect, adminOnly, uploadEbook.single('file'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
//     const format = fileExtension === 'pdf' ? 'pdf' : 'epub';
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: format,
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, `${format.toUpperCase()} uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // ============================================
// // MEDIA UPLOADS (Audio, Video)
// // ============================================

// // Upload audio file
// router.post('/audio', protect, adminOnly, uploadAudio.single('audio'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       duration: req.body.duration || null,
//       originalName: req.file.originalname
//     }, 'Audio uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // Upload video file
// router.post('/video', protect, adminOnly, uploadVideo.single('video'), async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       duration: req.body.duration || null,
//       originalName: req.file.originalname,
//       thumbnail: req.body.thumbnail || null
//     }, 'Video uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     next(error);
//   }
// });

// // ============================================
// // FILE MANAGEMENT
// // ============================================

// // Delete single file from Cloudinary
// router.delete('/delete', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, resourceType = 'image' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType
//     });
    
//     if (result.result === 'ok') {
//       successResponse(res, null, 'File deleted successfully');
//     } else {
//       errorResponse(res, 'Failed to delete file', 400);
//     }
//   } catch (error) {
//     console.error('Delete error:', error);
//     next(error);
//   }
// });

// // Delete multiple files from Cloudinary
// router.post('/delete-multiple', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { files } = req.body;
    
//     if (!files || !Array.isArray(files) || files.length === 0) {
//       return errorResponse(res, 'Files array is required', 400);
//     }
    
//     const results = [];
//     for (const file of files) {
//       const { publicId, resourceType = 'image' } = file;
//       try {
//         const result = await cloudinary.uploader.destroy(publicId, {
//           resource_type: resourceType
//         });
//         results.push({ 
//           publicId, 
//           success: result.result === 'ok',
//           message: result.result === 'ok' ? 'Deleted' : 'Failed to delete'
//         });
//       } catch (err) {
//         results.push({ publicId, success: false, message: err.message });
//       }
//     }
    
//     const successCount = results.filter(r => r.success).length;
//     successResponse(res, results, `${successCount} of ${files.length} files deleted successfully`);
//   } catch (error) {
//     console.error('Delete error:', error);
//     next(error);
//   }
// });

// // ============================================
// // UTILITY ENDPOINTS
// // ============================================

// // Get file info from Cloudinary
// router.post('/info', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, resourceType = 'image' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     const result = await cloudinary.api.resource(publicId, {
//       resource_type: resourceType
//     });
    
//     successResponse(res, {
//       publicId: result.public_id,
//       format: result.format,
//       size: result.bytes,
//       url: result.secure_url,
//       createdAt: result.created_at,
//       width: result.width,
//       height: result.height
//     }, 'File info retrieved successfully');
//   } catch (error) {
//     console.error('Info error:', error);
//     errorResponse(res, 'Failed to get file info', 400);
//   }
// });

// // Generate optimized URL for image
// router.post('/optimize', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, width, height, crop = 'fill', quality = 'auto' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     let optimizedUrl = cloudinary.url(publicId, {
//       transformation: [
//         { width: width || 800, height: height || 600, crop: crop },
//         { quality: quality }
//       ]
//     });
    
//     successResponse(res, { optimizedUrl }, 'Optimized URL generated');
//   } catch (error) {
//     console.error('Optimize error:', error);
//     next(error);
//   }
// });

// export default router;









// // server/routes/upload.routes.js
// import express from 'express';
// import multer from 'multer';
// import { protect, adminOnly } from '../middleware/auth.js';
// import { 
//   uploadImage, 
//   uploadCoverImage,
//   uploadPageImages,
//   uploadPDF,
//   uploadEPUB,
//   uploadEbook, 
//   uploadAudio, 
//   uploadVideo 
// } from '../config/cloudinary.js';
// import { successResponse, errorResponse } from '../utils/response.js';
// import cloudinary from '../config/cloudinary.js';

// const router = express.Router();

// // ============================================
// // ERROR HANDLING MIDDLEWARE FOR MULTER
// // ============================================

// const handleMulterError = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     if (err.code === 'FILE_TOO_LARGE') {
//       return errorResponse(res, 'File too large. Max size exceeded.', 400);
//     }
//     if (err.code === 'LIMIT_FILE_COUNT') {
//       return errorResponse(res, 'Too many files. Max count exceeded.', 400);
//     }
//     if (err.code === 'LIMIT_UNEXPECTED_FILE') {
//       return errorResponse(res, 'Unexpected field name.', 400);
//     }
//     return errorResponse(res, `Upload error: ${err.message}`, 400);
//   }
//   if (err) {
//     return errorResponse(res, err.message || 'File upload failed', 400);
//   }
//   next();
// };

// // ============================================
// // IMAGE UPLOADS
// // ============================================

// // Upload single image (generic)
// router.post('/image', protect, adminOnly, (req, res, next) => {
//   uploadImage.single('image')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select an image file.', 400);
//     }
    
//     console.log('File uploaded successfully:', req.file.filename);
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'Image uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload image', 500);
//   }
// });

// // Upload cover image (optimized for book covers)
// router.post('/cover', protect, adminOnly, (req, res, next) => {
//   uploadCoverImage.single('image')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select a cover image.', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'Cover image uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload cover image', 500);
//   }
// });

// // Upload multiple images (general)
// router.post('/images', protect, adminOnly, (req, res, next) => {
//   uploadImage.array('images', 50)(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return errorResponse(res, 'No files uploaded. Please select image files.', 400);
//     }
    
//     const uploadedFiles = req.files.map(file => ({
//       url: file.path,
//       publicId: file.filename,
//       format: file.format,
//       size: file.size,
//       originalName: file.originalname
//     }));
    
//     successResponse(res, uploadedFiles, `${uploadedFiles.length} images uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload images', 500);
//   }
// });

// // Upload page images for book reader
// router.post('/pages', protect, adminOnly, (req, res, next) => {
//   uploadPageImages.array('images', 500)(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return errorResponse(res, 'No files uploaded. Please select page images.', 400);
//     }
    
//     const uploadedFiles = req.files.map((file, index) => ({
//       url: file.path,
//       publicId: file.filename,
//       format: file.format,
//       size: file.size,
//       pageNumber: req.body.pageNumbers ? parseInt(req.body.pageNumbers[index]) : index + 1
//     }));
    
//     successResponse(res, uploadedFiles, `${uploadedFiles.length} page images uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload page images', 500);
//   }
// });

// // ============================================
// // DOCUMENT UPLOADS (PDF, EPUB)
// // ============================================

// // Upload PDF file
// router.post('/pdf', protect, adminOnly, (req, res, next) => {
//   uploadPDF.single('file')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select a PDF file.', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: 'pdf',
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'PDF uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload PDF', 500);
//   }
// });

// // Upload EPUB file
// router.post('/epub', protect, adminOnly, (req, res, next) => {
//   uploadEPUB.single('file')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select an EPUB file.', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: 'epub',
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, 'EPUB uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload EPUB', 500);
//   }
// });

// // Upload ebook (PDF or EPUB) - auto-detects format
// router.post('/ebook', protect, adminOnly, (req, res, next) => {
//   uploadEbook.single('file')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select a PDF or EPUB file.', 400);
//     }
    
//     const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
//     const format = fileExtension === 'pdf' ? 'pdf' : 'epub';
    
//     console.log(`${format.toUpperCase()} file uploaded:`, req.file.filename);
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: format,
//       size: req.file.size,
//       originalName: req.file.originalname
//     }, `${format.toUpperCase()} uploaded successfully`);
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload ebook', 500);
//   }
// });

// // ============================================
// // MEDIA UPLOADS (Audio, Video)
// // ============================================

// // Upload audio file
// router.post('/audio', protect, adminOnly, (req, res, next) => {
//   uploadAudio.single('audio')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select an audio file.', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       duration: req.body.duration || null,
//       originalName: req.file.originalname
//     }, 'Audio uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload audio', 500);
//   }
// });

// // Upload video file
// router.post('/video', protect, adminOnly, (req, res, next) => {
//   uploadVideo.single('video')(req, res, (err) => {
//     if (err) return handleMulterError(err, req, res, next);
//     next();
//   });
// }, async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'No file uploaded. Please select a video file.', 400);
//     }
    
//     successResponse(res, {
//       url: req.file.path,
//       publicId: req.file.filename,
//       format: req.file.format,
//       size: req.file.size,
//       duration: req.body.duration || null,
//       originalName: req.file.originalname,
//       thumbnail: req.body.thumbnail || null
//     }, 'Video uploaded successfully');
//   } catch (error) {
//     console.error('Upload error:', error);
//     errorResponse(res, error.message || 'Failed to upload video', 500);
//   }
// });

// // ============================================
// // FILE MANAGEMENT
// // ============================================

// // Delete single file from Cloudinary
// router.delete('/delete', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, resourceType = 'image' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     console.log('Deleting file:', publicId, 'Resource type:', resourceType);
    
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType
//     });
    
//     if (result.result === 'ok') {
//       successResponse(res, null, 'File deleted successfully');
//     } else {
//       errorResponse(res, 'Failed to delete file. File may not exist.', 404);
//     }
//   } catch (error) {
//     console.error('Delete error:', error);
//     errorResponse(res, error.message || 'Failed to delete file', 500);
//   }
// });

// // Delete multiple files from Cloudinary
// router.post('/delete-multiple', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { files } = req.body;
    
//     if (!files || !Array.isArray(files) || files.length === 0) {
//       return errorResponse(res, 'Files array is required', 400);
//     }
    
//     const results = [];
//     for (const file of files) {
//       const { publicId, resourceType = 'image' } = file;
//       try {
//         const result = await cloudinary.uploader.destroy(publicId, {
//           resource_type: resourceType
//         });
//         results.push({ 
//           publicId, 
//           success: result.result === 'ok',
//           message: result.result === 'ok' ? 'Deleted' : 'Failed to delete'
//         });
//       } catch (err) {
//         results.push({ publicId, success: false, message: err.message });
//       }
//     }
    
//     const successCount = results.filter(r => r.success).length;
//     successResponse(res, results, `${successCount} of ${files.length} files deleted successfully`);
//   } catch (error) {
//     console.error('Delete error:', error);
//     errorResponse(res, error.message || 'Failed to delete files', 500);
//   }
// });

// // ============================================
// // UTILITY ENDPOINTS
// // ============================================

// // Get file info from Cloudinary
// router.post('/info', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, resourceType = 'image' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     const result = await cloudinary.api.resource(publicId, {
//       resource_type: resourceType
//     });
    
//     successResponse(res, {
//       publicId: result.public_id,
//       format: result.format,
//       size: result.bytes,
//       url: result.secure_url,
//       createdAt: result.created_at,
//       width: result.width,
//       height: result.height
//     }, 'File info retrieved successfully');
//   } catch (error) {
//     console.error('Info error:', error);
//     errorResponse(res, error.message || 'Failed to get file info', 500);
//   }
// });

// // Generate optimized URL for image
// router.post('/optimize', protect, adminOnly, async (req, res, next) => {
//   try {
//     const { publicId, width, height, crop = 'fill', quality = 'auto' } = req.body;
    
//     if (!publicId) {
//       return errorResponse(res, 'Public ID is required', 400);
//     }
    
//     let optimizedUrl = cloudinary.url(publicId, {
//       transformation: [
//         { width: width || 800, height: height || 600, crop: crop },
//         { quality: quality }
//       ]
//     });
    
//     successResponse(res, { optimizedUrl }, 'Optimized URL generated');
//   } catch (error) {
//     console.error('Optimize error:', error);
//     errorResponse(res, error.message || 'Failed to generate optimized URL', 500);
//   }
// });

// // Health check endpoint for upload service
// router.get('/health', async (req, res) => {
//   try {
//     // Check Cloudinary connection
//     const pingResult = await cloudinary.api.ping();
//     successResponse(res, {
//       status: 'healthy',
//       cloudinary: pingResult.status === 'ok' ? 'connected' : 'error',
//       timestamp: new Date().toISOString()
//     }, 'Upload service is healthy');
//   } catch (error) {
//     errorResponse(res, 'Upload service is unavailable', 503);
//   }
// });

// export default router;












// server/routes/upload.routes.js
import express from 'express';
import multer from 'multer';
import { protect, adminOnly } from '../middleware/auth.js';
import { 
  uploadImage, 
  uploadCoverImage,
  uploadPageImages,
  uploadPDF,
  uploadEPUB,
  uploadEbook, 
  uploadAudio, 
  uploadVideo 
} from '../config/cloudinary.js';
import { successResponse, errorResponse } from '../utils/response.js';
import cloudinary from '../config/cloudinary.js';

const router = express.Router();

// ============================================
// ERROR HANDLING MIDDLEWARE FOR MULTER
// ============================================

const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return errorResponse(res, 'File too large. Max size exceeded.', 400);
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return errorResponse(res, 'Too many files. Max count exceeded.', 400);
    }
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return errorResponse(res, 'Unexpected field name.', 400);
    }
    return errorResponse(res, `Upload error: ${err.message}`, 400);
  }
  if (err) {
    return errorResponse(res, err.message || 'File upload failed', 400);
  }
  next();
};

// ============================================
// IMAGE UPLOADS
// ============================================

// Upload single image (generic)
router.post('/image', protect, adminOnly, (req, res, next) => {
  uploadImage.single('image')(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select an image file.', 400);
    }
    
    console.log('Image uploaded successfully:', req.file.filename);
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.format,
      size: req.file.size,
      originalName: req.file.originalname
    }, 'Image uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload image', 500);
  }
});

// Upload cover image (optimized for book covers)
router.post('/cover', protect, adminOnly, (req, res, next) => {
  uploadCoverImage.single('image')(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select a cover image.', 400);
    }
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.format,
      size: req.file.size,
      originalName: req.file.originalname
    }, 'Cover image uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload cover image', 500);
  }
});

// Upload multiple images (general)
router.post('/images', protect, adminOnly, (req, res, next) => {
  uploadImage.array('images', 50)(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return errorResponse(res, 'No files uploaded. Please select image files.', 400);
    }
    
    const uploadedFiles = req.files.map(file => ({
      url: file.path,
      publicId: file.filename,
      format: file.format,
      size: file.size,
      originalName: file.originalname
    }));
    
    successResponse(res, uploadedFiles, `${uploadedFiles.length} images uploaded successfully`);
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload images', 500);
  }
});

// Upload page images for book reader
router.post('/pages', protect, adminOnly, (req, res, next) => {
  uploadPageImages.array('images', 500)(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return errorResponse(res, 'No files uploaded. Please select page images.', 400);
    }
    
    const uploadedFiles = req.files.map((file, index) => ({
      url: file.path,
      publicId: file.filename,
      format: file.format,
      size: file.size,
      pageNumber: req.body.pageNumbers ? parseInt(req.body.pageNumbers[index]) : index + 1
    }));
    
    successResponse(res, uploadedFiles, `${uploadedFiles.length} page images uploaded successfully`);
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload page images', 500);
  }
});

// ============================================
// DOCUMENT UPLOADS (PDF, EPUB)
// ============================================

// Upload PDF file
router.post('/pdf', protect, adminOnly, (req, res, next) => {
  uploadPDF.single('file')(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select a PDF file.', 400);
    }
    
    console.log('PDF uploaded successfully:', req.file.filename);
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: 'pdf',
      size: req.file.size,
      originalName: req.file.originalname
    }, 'PDF uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload PDF', 500);
  }
});

// ============================================
// DEDICATED EPUB UPLOAD ROUTE (IMPROVED)
// ============================================
router.post('/epub', protect, adminOnly, (req, res, next) => {
  console.log('📖 EPUB upload request received');
  console.log('  - Headers:', req.headers['content-type']);
  console.log('  - Body keys:', Object.keys(req.body));
  
  uploadEPUB.single('file')(req, res, (err) => {
    if (err) {
      console.error('Multer error in EPUB upload:', err);
      return handleMulterError(err, req, res, next);
    }
    next();
  });
}, async (req, res, next) => {
  try {
    console.log('Processing EPUB upload...');
    console.log('  - File present:', !!req.file);
    
    if (!req.file) {
      console.error('No file in request');
      return errorResponse(res, 'No file uploaded. Please select an EPUB file.', 400);
    }
    
    console.log('  - Original name:', req.file.originalname);
    console.log('  - MIME type:', req.file.mimetype);
    console.log('  - File size:', req.file.size, 'bytes');
    console.log('  - File path:', req.file.path);
    
    // Verify it's actually an EPUB file
    const isEpub = req.file.originalname.toLowerCase().endsWith('.epub') ||
                   req.file.mimetype === 'application/epub+zip';
    
    if (!isEpub) {
      console.error('Invalid file type for EPUB upload');
      return errorResponse(res, 'Invalid file type. Please upload a valid EPUB file.', 400);
    }
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: 'epub',
      size: req.file.size,
      originalName: req.file.originalname,
      message: 'EPUB file uploaded successfully to Cloudinary'
    }, 'EPUB uploaded successfully');
  } catch (error) {
    console.error('EPUB upload error:', error);
    errorResponse(res, error.message || 'Failed to upload EPUB file', 500);
  }
});

// Upload ebook (PDF or EPUB) - auto-detects format
router.post('/ebook', protect, adminOnly, (req, res, next) => {
  uploadEbook.single('file')(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select a PDF or EPUB file.', 400);
    }
    
    const fileExtension = req.file.originalname.split('.').pop().toLowerCase();
    const format = fileExtension === 'pdf' ? 'pdf' : 'epub';
    
    console.log(`${format.toUpperCase()} file uploaded:`, req.file.filename);
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: format,
      size: req.file.size,
      originalName: req.file.originalname
    }, `${format.toUpperCase()} uploaded successfully`);
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload ebook', 500);
  }
});

// ============================================
// MEDIA UPLOADS (Audio, Video)
// ============================================

// Upload audio file
router.post('/audio', protect, adminOnly, (req, res, next) => {
  uploadAudio.single('audio')(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select an audio file.', 400);
    }
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.format,
      size: req.file.size,
      duration: req.body.duration || null,
      originalName: req.file.originalname
    }, 'Audio uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload audio', 500);
  }
});

// Upload video file
router.post('/video', protect, adminOnly, (req, res, next) => {
  uploadVideo.single('video')(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No file uploaded. Please select a video file.', 400);
    }
    
    successResponse(res, {
      url: req.file.path,
      publicId: req.file.filename,
      format: req.file.format,
      size: req.file.size,
      duration: req.body.duration || null,
      originalName: req.file.originalname,
      thumbnail: req.body.thumbnail || null
    }, 'Video uploaded successfully');
  } catch (error) {
    console.error('Upload error:', error);
    errorResponse(res, error.message || 'Failed to upload video', 500);
  }
});

// ============================================
// TEST UPLOAD ENDPOINT (for debugging)
// ============================================
router.post('/test', protect, adminOnly, (req, res, next) => {
  const testUpload = multer({ storage: multer.memoryStorage() }).single('file');
  testUpload(req, res, (err) => {
    if (err) return handleMulterError(err, req, res, next);
    next();
  });
}, async (req, res) => {
  try {
    console.log('Test upload received:');
    console.log('  - File:', req.file ? {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    } : 'No file');
    console.log('  - Body:', req.body);
    
    if (!req.file) {
      return errorResponse(res, 'No file uploaded', 400);
    }
    
    successResponse(res, {
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      message: 'Test upload successful'
    });
  } catch (error) {
    console.error('Test upload error:', error);
    errorResponse(res, error.message, 500);
  }
});

// ============================================
// FILE MANAGEMENT
// ============================================

// Delete single file from Cloudinary
router.delete('/delete', protect, adminOnly, async (req, res, next) => {
  try {
    const { publicId, resourceType = 'image' } = req.body;
    
    if (!publicId) {
      return errorResponse(res, 'Public ID is required', 400);
    }
    
    console.log('Deleting file:', publicId, 'Resource type:', resourceType);
    
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
    
    if (result.result === 'ok') {
      successResponse(res, null, 'File deleted successfully');
    } else {
      errorResponse(res, 'Failed to delete file. File may not exist.', 404);
    }
  } catch (error) {
    console.error('Delete error:', error);
    errorResponse(res, error.message || 'Failed to delete file', 500);
  }
});

// Delete multiple files from Cloudinary
router.post('/delete-multiple', protect, adminOnly, async (req, res, next) => {
  try {
    const { files } = req.body;
    
    if (!files || !Array.isArray(files) || files.length === 0) {
      return errorResponse(res, 'Files array is required', 400);
    }
    
    const results = [];
    for (const file of files) {
      const { publicId, resourceType = 'image' } = file;
      try {
        const result = await cloudinary.uploader.destroy(publicId, {
          resource_type: resourceType
        });
        results.push({ 
          publicId, 
          success: result.result === 'ok',
          message: result.result === 'ok' ? 'Deleted' : 'Failed to delete'
        });
      } catch (err) {
        results.push({ publicId, success: false, message: err.message });
      }
    }
    
    const successCount = results.filter(r => r.success).length;
    successResponse(res, results, `${successCount} of ${files.length} files deleted successfully`);
  } catch (error) {
    console.error('Delete error:', error);
    errorResponse(res, error.message || 'Failed to delete files', 500);
  }
});

// ============================================
// UTILITY ENDPOINTS
// ============================================

// Get file info from Cloudinary
router.post('/info', protect, adminOnly, async (req, res, next) => {
  try {
    const { publicId, resourceType = 'image' } = req.body;
    
    if (!publicId) {
      return errorResponse(res, 'Public ID is required', 400);
    }
    
    const result = await cloudinary.api.resource(publicId, {
      resource_type: resourceType
    });
    
    successResponse(res, {
      publicId: result.public_id,
      format: result.format,
      size: result.bytes,
      url: result.secure_url,
      createdAt: result.created_at,
      width: result.width,
      height: result.height
    }, 'File info retrieved successfully');
  } catch (error) {
    console.error('Info error:', error);
    errorResponse(res, error.message || 'Failed to get file info', 500);
  }
});

// Generate optimized URL for image
router.post('/optimize', protect, adminOnly, async (req, res, next) => {
  try {
    const { publicId, width, height, crop = 'fill', quality = 'auto' } = req.body;
    
    if (!publicId) {
      return errorResponse(res, 'Public ID is required', 400);
    }
    
    let optimizedUrl = cloudinary.url(publicId, {
      transformation: [
        { width: width || 800, height: height || 600, crop: crop },
        { quality: quality }
      ]
    });
    
    successResponse(res, { optimizedUrl }, 'Optimized URL generated');
  } catch (error) {
    console.error('Optimize error:', error);
    errorResponse(res, error.message || 'Failed to generate optimized URL', 500);
  }
});

// Health check endpoint for upload service
router.get('/health', async (req, res) => {
  try {
    // Check if Cloudinary is configured
    const hasCloudinaryConfig = !!(process.env.CLOUDINARY_CLOUD_NAME && 
                                   process.env.CLOUDINARY_API_KEY && 
                                   process.env.CLOUDINARY_API_SECRET);
    
    let cloudinaryStatus = 'not_configured';
    let cloudinaryMessage = 'Cloudinary credentials not set';
    
    if (hasCloudinaryConfig) {
      try {
        const pingResult = await cloudinary.api.ping();
        cloudinaryStatus = pingResult.status === 'ok' ? 'connected' : 'error';
        cloudinaryMessage = pingResult.status === 'ok' ? 'Connected' : 'Connection failed';
      } catch (error) {
        cloudinaryStatus = 'error';
        cloudinaryMessage = error.message;
      }
    }
    
    successResponse(res, {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      cloudinary: {
        configured: hasCloudinaryConfig,
        status: cloudinaryStatus,
        message: cloudinaryMessage,
        cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'configured' : 'missing'
      },
      endpoints: {
        image: '/api/upload/image',
        cover: '/api/upload/cover',
        pages: '/api/upload/pages',
        pdf: '/api/upload/pdf',
        epub: '/api/upload/epub',
        ebook: '/api/upload/ebook',
        audio: '/api/upload/audio',
        video: '/api/upload/video',
        test: '/api/upload/test'
      }
    }, 'Upload service is running');
  } catch (error) {
    console.error('Health check error:', error);
    errorResponse(res, 'Upload service error', 503);
  }
});

export default router;