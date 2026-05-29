
// //server/config/cloudinary.js
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// // Storage configurations
// const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/images',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
//     transformation: [{ quality: 'auto:good' }]
//   }
// });

// const ebookStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks',
//     resource_type: 'raw',
//     allowed_formats: ['pdf', 'epub']
//   }
// });

// const audioStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/audio',
//     resource_type: 'video', // Cloudinary uses 'video' for audio too
//     allowed_formats: ['mp3', 'wav', 'ogg', 'm4a']
//   }
// });

// const videoStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/videos',
//     resource_type: 'video',
//     allowed_formats: ['mp4', 'webm', 'mov']
//   }
// });

// export const uploadImage = multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 } });
// export const uploadEbook = multer({ storage: ebookStorage, limits: { fileSize: 50 * 1024 * 1024 } });
// export const uploadAudio = multer({ storage: audioStorage, limits: { fileSize: 100 * 1024 * 1024 } });
// export const uploadVideo = multer({ storage: videoStorage, limits: { fileSize: 500 * 1024 * 1024 } });

// export default cloudinary;







// // server/config/cloudinary.js
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// // ============================================
// // IMAGE STORAGE CONFIGURATIONS
// // ============================================

// // Storage for general images
// const imageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/images',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
//     transformation: [{ quality: 'auto:good' }]
//   }
// });

// // Storage for cover images (optimized for books)
// const coverImageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/covers',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [
//       { width: 500, height: 700, crop: 'fill' },
//       { quality: 'auto:good' }
//     ]
//   }
// });

// // Storage for page images (for book reader)
// const pageImageStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/pages',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ quality: 'auto:good' }]
//   }
// });

// // ============================================
// // DOCUMENT STORAGE CONFIGURATIONS
// // ============================================

// // Storage for PDF files
// const pdfStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks/pdfs',
//     resource_type: 'raw',
//     allowed_formats: ['pdf'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // Storage for EPUB files
// const epubStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks/epubs',
//     resource_type: 'raw',
//     allowed_formats: ['epub'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // Storage for general ebooks (PDF/EPUB)
// const ebookStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks',
//     resource_type: 'raw',
//     allowed_formats: ['pdf', 'epub'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // ============================================
// // MEDIA STORAGE CONFIGURATIONS
// // ============================================

// // Storage for audio files
// const audioStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/audio',
//     resource_type: 'video', // Cloudinary uses 'video' for audio too
//     allowed_formats: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // Storage for video files
// const videoStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/videos',
//     resource_type: 'video',
//     allowed_formats: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     },
//     transformation: [{ quality: 'auto' }]
//   }
// });

// // ============================================
// // AVATAR STORAGE (for user profiles)
// // ============================================

// // Storage for user avatars
// const avatarStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/avatars',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [
//       { width: 200, height: 200, crop: 'fill' },
//       { quality: 'auto:good' }
//     ]
//   }
// });

// // ============================================
// // TEMPORARY STORAGE (for drafts)
// // ============================================

// // Storage for temporary files
// const tempStorage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'zauqapp/temp',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'epub'],
//     transformation: [{ quality: 'auto:good' }]
//   }
// });

// // ============================================
// // MULTER INSTANCES
// // ============================================

// // Image uploads
// export const uploadImage = multer({ 
//   storage: imageStorage, 
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// });

// export const uploadCoverImage = multer({ 
//   storage: coverImageStorage, 
//   limits: { fileSize: 5 * 1024 * 1024 } // 5MB
// });

// export const uploadPageImages = multer({ 
//   storage: pageImageStorage, 
//   limits: { fileSize: 2 * 1024 * 1024 } // 2MB per page
// });

// export const uploadAvatar = multer({ 
//   storage: avatarStorage, 
//   limits: { fileSize: 2 * 1024 * 1024 } // 2MB
// });

// // Document uploads
// export const uploadPDF = multer({ 
//   storage: pdfStorage, 
//   limits: { fileSize: 100 * 1024 * 1024 } // 100MB
// });

// export const uploadEPUB = multer({ 
//   storage: epubStorage, 
//   limits: { fileSize: 50 * 1024 * 1024 } // 50MB
// });

// export const uploadEbook = multer({ 
//   storage: ebookStorage, 
//   limits: { fileSize: 100 * 1024 * 1024 } // 100MB
// });

// // Media uploads
// export const uploadAudio = multer({ 
//   storage: audioStorage, 
//   limits: { fileSize: 100 * 1024 * 1024 } // 100MB
// });

// export const uploadVideo = multer({ 
//   storage: videoStorage, 
//   limits: { fileSize: 500 * 1024 * 1024 } // 500MB
// });

// // Temporary uploads
// export const uploadTemp = multer({ 
//   storage: tempStorage, 
//   limits: { fileSize: 20 * 1024 * 1024 } // 20MB
// });

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Delete file from Cloudinary
// export const deleteFile = async (publicId, resourceType = 'image') => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType
//     });
//     return result.result === 'ok';
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     return false;
//   }
// };

// // Delete multiple files
// export const deleteMultipleFiles = async (files) => {
//   const results = [];
//   for (const file of files) {
//     const { publicId, resourceType = 'image' } = file;
//     const success = await deleteFile(publicId, resourceType);
//     results.push({ publicId, success });
//   }
//   return results;
// };

// // Get optimized URL for image
// export const getOptimizedImageUrl = (publicId, options = {}) => {
//   const { width, height, crop = 'fill', quality = 'auto' } = options;
//   return cloudinary.url(publicId, {
//     transformation: [
//       { width: width || 800, height: height || 600, crop: crop },
//       { quality: quality }
//     ]
//   });
// };

// // Get thumbnail URL
// export const getThumbnailUrl = (publicId, size = 200) => {
//   return cloudinary.url(publicId, {
//     transformation: [
//       { width: size, height: size, crop: 'thumb', gravity: 'face' },
//       { quality: 'auto' }
//     ]
//   });
// };

// export default cloudinary;










// // server/config/cloudinary.js
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// // Verify configuration
// console.log('✅ Cloudinary configured for:', process.env.CLOUDINARY_CLOUD_NAME);

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Generate unique filename
// const generateUniqueFilename = (req, file) => {
//   const timestamp = Date.now();
//   const randomStr = Math.random().toString(36).substring(2, 8);
//   const originalName = file.originalname.split('.')[0];
//   const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//   return `${sanitizedName}-${timestamp}-${randomStr}`;
// };

// // ============================================
// // IMAGE STORAGE CONFIGURATIONS
// // ============================================

// // Storage for general images
// const imageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/images',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
//     transformation: [{ quality: 'auto:good' }],
//     public_id: (req, file) => generateUniqueFilename(req, file)
//   }
// });

// // Storage for cover images (optimized for books)
// const coverImageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/covers',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [
//       { width: 500, height: 700, crop: 'fill' },
//       { quality: 'auto:good' }
//     ],
//     public_id: (req, file) => generateUniqueFilename(req, file)
//   }
// });

// // Storage for page images (for book reader)
// const pageImageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/pages',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [{ quality: 'auto:good' }],
//     public_id: (req, file) => {
//       const pageNum = req.body.pageNumber || Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-page-${pageNum}`;
//     }
//   }
// });

// // Storage for user avatars
// const avatarStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/avatars',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//     transformation: [
//       { width: 200, height: 200, crop: 'fill' },
//       { quality: 'auto:good' }
//     ],
//     public_id: (req, file) => generateUniqueFilename(req, file)
//   }
// });

// // ============================================
// // DOCUMENT STORAGE CONFIGURATIONS
// // ============================================

// // Storage for PDF files
// const pdfStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks/pdfs',
//     resource_type: 'raw',
//     allowed_formats: ['pdf'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // Storage for EPUB files
// const epubStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks/epubs',
//     resource_type: 'raw',
//     allowed_formats: ['epub'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // Storage for general ebooks (PDF/EPUB)
// const ebookStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/ebooks',
//     resource_type: 'raw',
//     allowed_formats: ['pdf', 'epub'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // ============================================
// // MEDIA STORAGE CONFIGURATIONS
// // ============================================

// // Storage for audio files
// const audioStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/audio',
//     resource_type: 'video', // Cloudinary uses 'video' for audio too
//     allowed_formats: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     }
//   }
// });

// // Storage for video files
// const videoStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/videos',
//     resource_type: 'video',
//     allowed_formats: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'],
//     public_id: (req, file) => {
//       const timestamp = Date.now();
//       const originalName = file.originalname.split('.')[0];
//       const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//       return `${sanitizedName}-${timestamp}`;
//     },
//     transformation: [{ quality: 'auto' }]
//   }
// });

// // ============================================
// // TEMPORARY STORAGE (for drafts)
// // ============================================

// // Storage for temporary files
// const tempStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'zauqapp/temp',
//     allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'epub'],
//     transformation: [{ quality: 'auto:good' }],
//     public_id: (req, file) => generateUniqueFilename(req, file)
//   }
// });

// // ============================================
// // MULTER INSTANCES WITH FILE FILTERS
// // ============================================

// // Image file filter
// const imageFileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed'), false);
//   }
// };

// // PDF file filter
// const pdfFileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF files are allowed'), false);
//   }
// };

// // EPUB file filter
// const epubFileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/epub+zip' || file.originalname.endsWith('.epub')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only EPUB files are allowed'), false);
//   }
// };

// // Ebook file filter (PDF or EPUB)
// const ebookFileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'application/epub+zip'];
//   if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.epub')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF and EPUB files are allowed'), false);
//   }
// };

// // Audio file filter
// const audioFileFilter = (req, file, cb) => {
//   const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', 'audio/flac'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only audio files are allowed'), false);
//   }
// };

// // Video file filter
// const videoFileFilter = (req, file, cb) => {
//   const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only video files are allowed'), false);
//   }
// };

// // ============================================
// // MULTER INSTANCES
// // ============================================

// // Image uploads
// export const uploadImage = multer({ 
//   storage: imageStorage, 
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: imageFileFilter
// });

// export const uploadCoverImage = multer({ 
//   storage: coverImageStorage, 
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: imageFileFilter
// });

// export const uploadPageImages = multer({ 
//   storage: pageImageStorage, 
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB per page
//   fileFilter: imageFileFilter
// });

// export const uploadAvatar = multer({ 
//   storage: avatarStorage, 
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
//   fileFilter: imageFileFilter
// });

// // Document uploads
// export const uploadPDF = multer({ 
//   storage: pdfStorage, 
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
//   fileFilter: pdfFileFilter
// });

// export const uploadEPUB = multer({ 
//   storage: epubStorage, 
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
//   fileFilter: epubFileFilter
// });

// export const uploadEbook = multer({ 
//   storage: ebookStorage, 
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
//   fileFilter: ebookFileFilter
// });

// // Media uploads
// export const uploadAudio = multer({ 
//   storage: audioStorage, 
//   limits: { fileSize: 100 * 1024 * 1024 }, // 100MB
//   fileFilter: audioFileFilter
// });

// export const uploadVideo = multer({ 
//   storage: videoStorage, 
//   limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
//   fileFilter: videoFileFilter
// });

// // Temporary uploads
// export const uploadTemp = multer({ 
//   storage: tempStorage, 
//   limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
//     if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.epub')) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images, PDF, and EPUB files are allowed'), false);
//     }
//   }
// });

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Delete file from Cloudinary
// export const deleteFile = async (publicId, resourceType = 'image') => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId, {
//       resource_type: resourceType
//     });
//     return result.result === 'ok';
//   } catch (error) {
//     console.error('Error deleting file:', error);
//     return false;
//   }
// };

// // Delete multiple files
// export const deleteMultipleFiles = async (files) => {
//   const results = [];
//   for (const file of files) {
//     const { publicId, resourceType = 'image' } = file;
//     const success = await deleteFile(publicId, resourceType);
//     results.push({ publicId, success });
//   }
//   return results;
// };

// // Get optimized URL for image
// export const getOptimizedImageUrl = (publicId, options = {}) => {
//   const { width, height, crop = 'fill', quality = 'auto' } = options;
//   return cloudinary.url(publicId, {
//     transformation: [
//       { width: width || 800, height: height || 600, crop: crop },
//       { quality: quality }
//     ]
//   });
// };

// // Get thumbnail URL
// export const getThumbnailUrl = (publicId, size = 200) => {
//   return cloudinary.url(publicId, {
//     transformation: [
//       { width: size, height: size, crop: 'thumb', gravity: 'face' },
//       { quality: 'auto' }
//     ]
//   });
// };

// // Get video thumbnail
// export const getVideoThumbnail = (publicId, time = '5') => {
//   return cloudinary.url(publicId, {
//     resource_type: 'video',
//     transformation: [
//       { start_offset: time },
//       { format: 'jpg' }
//     ]
//   });
// };

// export default cloudinary;













// // server/config/cloudinary.js
// import { v2 as cloudinary } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import dotenv from 'dotenv';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Get current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Load environment variables from root .env file
// dotenv.config({ path: path.join(__dirname, '../.env') });

// // Log environment variables for debugging
// console.log('\n🔍 Cloudinary Environment Check:');
// console.log('   CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
// console.log('   CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
// console.log('   CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');

// // Check if Cloudinary is configured
// const isCloudinaryConfigured = !!(process.env.CLOUDINARY_CLOUD_NAME && 
//                                    process.env.CLOUDINARY_API_KEY && 
//                                    process.env.CLOUDINARY_API_SECRET);

// // Configure Cloudinary only if credentials exist
// if (isCloudinaryConfigured) {
//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true
//   });
//   console.log('✅ Cloudinary configured for:', process.env.CLOUDINARY_CLOUD_NAME);
// } else {
//   console.log('⚠️  Cloudinary credentials missing. Using fallback local storage mode.');
// }

// // ============================================
// // FALLBACK LOCAL STORAGE (when Cloudinary is not available)
// // ============================================
// import fs from 'fs';

// // Ensure upload directories exist
// const uploadDirs = [
//   'uploads/images',
//   'uploads/covers',
//   'uploads/pages',
//   'uploads/ebooks/pdfs',
//   'uploads/ebooks/epubs',
//   'uploads/audio',
//   'uploads/videos',
//   'uploads/temp'
// ];

// uploadDirs.forEach(dir => {
//   const fullPath = path.join(process.cwd(), dir);
//   if (!fs.existsSync(fullPath)) {
//     fs.mkdirSync(fullPath, { recursive: true });
//   }
// });

// // Local storage for images
// const localImageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/images/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Local storage for covers
// const localCoverStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/covers/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'cover-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Local storage for pages
// const localPageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/pages/');
//   },
//   filename: (req, file, cb) => {
//     const pageNum = req.body.pageNumber || Date.now();
//     cb(null, 'page-' + pageNum + path.extname(file.originalname));
//   }
// });

// // Local storage for ebooks
// const localEbookStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const ext = path.extname(file.originalname).toLowerCase();
//     const subFolder = ext === '.pdf' ? 'pdfs' : 'epubs';
//     cb(null, `uploads/ebooks/${subFolder}/`);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'ebook-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Local storage for audio
// const localAudioStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/audio/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // Local storage for video
// const localVideoStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/videos/');
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
//   }
// });

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Generate unique filename for Cloudinary
// const generateUniqueFilename = (req, file) => {
//   const timestamp = Date.now();
//   const randomStr = Math.random().toString(36).substring(2, 8);
//   const originalName = file.originalname.split('.')[0];
//   const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//   return `${sanitizedName}-${timestamp}-${randomStr}`;
// };

// // ============================================
// // CLOUDINARY STORAGE CONFIGURATIONS (only if configured)
// // ============================================

// let imageStorage, coverImageStorage, pageImageStorage, avatarStorage;
// let pdfStorage, epubStorage, ebookStorage;
// let audioStorage, videoStorage, tempStorage;

// if (isCloudinaryConfigured) {
//   // Cloudinary storage for images
//   imageStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/images',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
//       transformation: [{ quality: 'auto:good' }],
//       public_id: (req, file) => generateUniqueFilename(req, file)
//     }
//   });

//   // Cloudinary storage for cover images
//   coverImageStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/covers',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//       transformation: [
//         { width: 500, height: 700, crop: 'fill' },
//         { quality: 'auto:good' }
//       ],
//       public_id: (req, file) => generateUniqueFilename(req, file)
//     }
//   });

//   // Cloudinary storage for page images
//   pageImageStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/pages',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//       transformation: [{ quality: 'auto:good' }],
//       public_id: (req, file) => {
//         const pageNum = req.body.pageNumber || Date.now();
//         const originalName = file.originalname.split('.')[0];
//         const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         return `${sanitizedName}-page-${pageNum}`;
//       }
//     }
//   });

//   // Cloudinary storage for avatars
//   avatarStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/avatars',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
//       transformation: [
//         { width: 200, height: 200, crop: 'fill' },
//         { quality: 'auto:good' }
//       ],
//       public_id: (req, file) => generateUniqueFilename(req, file)
//     }
//   });

//   // Cloudinary storage for PDFs
//   pdfStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/ebooks/pdfs',
//       resource_type: 'raw',
//       allowed_formats: ['pdf'],
//       public_id: (req, file) => {
//         const timestamp = Date.now();
//         const originalName = file.originalname.split('.')[0];
//         const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         return `${sanitizedName}-${timestamp}`;
//       }
//     }
//   });

//   // Cloudinary storage for EPUBs
//   epubStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/ebooks/epubs',
//       resource_type: 'raw',
//       allowed_formats: ['epub'],
//       public_id: (req, file) => {
//         const timestamp = Date.now();
//         const originalName = file.originalname.split('.')[0];
//         const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         return `${sanitizedName}-${timestamp}`;
//       }
//     }
//   });

//   // Cloudinary storage for general ebooks
//   ebookStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/ebooks',
//       resource_type: 'raw',
//       allowed_formats: ['pdf', 'epub'],
//       public_id: (req, file) => {
//         const timestamp = Date.now();
//         const originalName = file.originalname.split('.')[0];
//         const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         return `${sanitizedName}-${timestamp}`;
//       }
//     }
//   });

//   // Cloudinary storage for audio
//   audioStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/audio',
//       resource_type: 'video',
//       allowed_formats: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'],
//       public_id: (req, file) => {
//         const timestamp = Date.now();
//         const originalName = file.originalname.split('.')[0];
//         const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         return `${sanitizedName}-${timestamp}`;
//       }
//     }
//   });

//   // Cloudinary storage for video
//   videoStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/videos',
//       resource_type: 'video',
//       allowed_formats: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'],
//       public_id: (req, file) => {
//         const timestamp = Date.now();
//         const originalName = file.originalname.split('.')[0];
//         const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
//         return `${sanitizedName}-${timestamp}`;
//       },
//       transformation: [{ quality: 'auto' }]
//     }
//   });

//   // Cloudinary storage for temp files
//   tempStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'zauqapp/temp',
//       allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'epub'],
//       transformation: [{ quality: 'auto:good' }],
//       public_id: (req, file) => generateUniqueFilename(req, file)
//     }
//   });
// }

// // ============================================
// // FILE FILTERS
// // ============================================

// const imageFileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image/')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only image files are allowed'), false);
//   }
// };

// const pdfFileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF files are allowed'), false);
//   }
// };

// const epubFileFilter = (req, file, cb) => {
//   if (file.mimetype === 'application/epub+zip' || file.originalname.endsWith('.epub')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only EPUB files are allowed'), false);
//   }
// };

// const ebookFileFilter = (req, file, cb) => {
//   const allowedTypes = ['application/pdf', 'application/epub+zip'];
//   if (allowedTypes.includes(file.mimetype) || file.originalname.endsWith('.epub')) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only PDF and EPUB files are allowed'), false);
//   }
// };

// const audioFileFilter = (req, file, cb) => {
//   const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', 'audio/flac'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only audio files are allowed'), false);
//   }
// };

// const videoFileFilter = (req, file, cb) => {
//   const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error('Only video files are allowed'), false);
//   }
// };

// // ============================================
// // MULTER INSTANCES (Use Cloudinary if configured, otherwise local)
// // ============================================

// // Image uploads
// export const uploadImage = isCloudinaryConfigured ? 
//   multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
//   multer({ storage: localImageStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter });

// export const uploadCoverImage = isCloudinaryConfigured ?
//   multer({ storage: coverImageStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
//   multer({ storage: localCoverStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter });

// export const uploadPageImages = isCloudinaryConfigured ?
//   multer({ storage: pageImageStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
//   multer({ storage: localPageStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter });

// export const uploadAvatar = isCloudinaryConfigured ?
//   multer({ storage: avatarStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
//   multer({ storage: localImageStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter });

// // Document uploads
// export const uploadPDF = isCloudinaryConfigured ?
//   multer({ storage: pdfStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: pdfFileFilter }) :
//   multer({ storage: localEbookStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: pdfFileFilter });

// export const uploadEPUB = isCloudinaryConfigured ?
//   multer({ storage: epubStorage, limits: { fileSize: 50 * 1024 * 1024 }, fileFilter: epubFileFilter }) :
//   multer({ storage: localEbookStorage, limits: { fileSize: 50 * 1024 * 1024 }, fileFilter: epubFileFilter });

// export const uploadEbook = isCloudinaryConfigured ?
//   multer({ storage: ebookStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: ebookFileFilter }) :
//   multer({ storage: localEbookStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: ebookFileFilter });

// // Media uploads
// export const uploadAudio = isCloudinaryConfigured ?
//   multer({ storage: audioStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: audioFileFilter }) :
//   multer({ storage: localAudioStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: audioFileFilter });

// export const uploadVideo = isCloudinaryConfigured ?
//   multer({ storage: videoStorage, limits: { fileSize: 500 * 1024 * 1024 }, fileFilter: videoFileFilter }) :
//   multer({ storage: localVideoStorage, limits: { fileSize: 500 * 1024 * 1024 }, fileFilter: videoFileFilter });

// export const uploadTemp = isCloudinaryConfigured ?
//   multer({ storage: tempStorage, limits: { fileSize: 20 * 1024 * 1024 } }) :
//   multer({ storage: localImageStorage, limits: { fileSize: 20 * 1024 * 1024 } });

// // ============================================
// // HELPER FUNCTIONS
// // ============================================

// // Delete file from Cloudinary or local
// export const deleteFile = async (publicId, resourceType = 'image') => {
//   if (isCloudinaryConfigured) {
//     try {
//       const result = await cloudinary.uploader.destroy(publicId, {
//         resource_type: resourceType
//       });
//       return result.result === 'ok';
//     } catch (error) {
//       console.error('Error deleting file from Cloudinary:', error);
//       return false;
//     }
//   } else {
//     // For local storage, delete file from filesystem
//     try {
//       const filePath = path.join(process.cwd(), 'uploads', publicId);
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//         return true;
//       }
//       return false;
//     } catch (error) {
//       console.error('Error deleting local file:', error);
//       return false;
//     }
//   }
// };

// // Delete multiple files
// export const deleteMultipleFiles = async (files) => {
//   const results = [];
//   for (const file of files) {
//     const { publicId, resourceType = 'image' } = file;
//     const success = await deleteFile(publicId, resourceType);
//     results.push({ publicId, success });
//   }
//   return results;
// };

// // Get optimized URL for image
// export const getOptimizedImageUrl = (publicId, options = {}) => {
//   if (!isCloudinaryConfigured) {
//     return `/uploads/images/${publicId}`;
//   }
  
//   const { width, height, crop = 'fill', quality = 'auto' } = options;
//   return cloudinary.url(publicId, {
//     transformation: [
//       { width: width || 800, height: height || 600, crop: crop },
//       { quality: quality }
//     ]
//   });
// };

// // Get thumbnail URL
// export const getThumbnailUrl = (publicId, size = 200) => {
//   if (!isCloudinaryConfigured) {
//     return `/uploads/images/${publicId}`;
//   }
  
//   return cloudinary.url(publicId, {
//     transformation: [
//       { width: size, height: size, crop: 'thumb', gravity: 'face' },
//       { quality: 'auto' }
//     ]
//   });
// };

// // Get video thumbnail
// export const getVideoThumbnail = (publicId, time = '5') => {
//   if (!isCloudinaryConfigured) {
//     return null;
//   }
  
//   return cloudinary.url(publicId, {
//     resource_type: 'video',
//     transformation: [
//       { start_offset: time },
//       { format: 'jpg' }
//     ]
//   });
// };

// export default cloudinary;











// server/config/cloudinary.js
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from root .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Log environment variables for debugging
console.log('\n🔍 Cloudinary Environment Check:');
console.log('   CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME ? '✅ Set' : '❌ Missing');
console.log('   CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY ? '✅ Set' : '❌ Missing');
console.log('   CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? '✅ Set' : '❌ Missing');

// Check if Cloudinary is configured
const isCloudinaryConfigured = !!(process.env.CLOUDINARY_CLOUD_NAME && 
                                   process.env.CLOUDINARY_API_KEY && 
                                   process.env.CLOUDINARY_API_SECRET);

// Configure Cloudinary only if credentials exist
if (isCloudinaryConfigured) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
  });
  console.log('✅ Cloudinary configured for:', process.env.CLOUDINARY_CLOUD_NAME);
} else {
  console.log('⚠️  Cloudinary credentials missing. Using fallback local storage mode.');
}

// ============================================
// FALLBACK LOCAL STORAGE (when Cloudinary is not available)
// ============================================

// Ensure upload directories exist
const uploadDirs = [
  'uploads/images',
  'uploads/covers',
  'uploads/pages',
  'uploads/ebooks/pdfs',
  'uploads/ebooks/epubs',
  'uploads/audio',
  'uploads/videos',
  'uploads/temp'
];

uploadDirs.forEach(dir => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`📁 Created directory: ${dir}`);
  }
});

// Local storage for images
const localImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Local storage for covers
const localCoverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/covers/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'cover-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Local storage for pages
const localPageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/pages/');
  },
  filename: (req, file, cb) => {
    const pageNum = req.body.pageNumber || Date.now();
    cb(null, 'page-' + pageNum + path.extname(file.originalname));
  }
});

// Local storage for ebooks
const localEbookStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const subFolder = ext === '.pdf' ? 'pdfs' : 'epubs';
    cb(null, `uploads/ebooks/${subFolder}/`);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'ebook-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Local storage for audio
const localAudioStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audio/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'audio-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Local storage for video
const localVideoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// ============================================
// HELPER FUNCTIONS
// ============================================

// Generate unique filename for Cloudinary
const generateUniqueFilename = (req, file) => {
  const timestamp = Date.now();
  const randomStr = Math.random().toString(36).substring(2, 8);
  const originalName = file.originalname.split('.')[0];
  const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
  return `${sanitizedName}-${timestamp}-${randomStr}`;
};

// ============================================
// CLOUDINARY STORAGE CONFIGURATIONS (only if configured)
// ============================================

let imageStorage, coverImageStorage, pageImageStorage, avatarStorage;
let pdfStorage, epubStorage, ebookStorage;
let audioStorage, videoStorage, tempStorage;

if (isCloudinaryConfigured) {
  // Cloudinary storage for images
  imageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/images',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [{ quality: 'auto:good' }],
      public_id: (req, file) => generateUniqueFilename(req, file)
    }
  });

  // Cloudinary storage for cover images
  coverImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/covers',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 500, height: 700, crop: 'fill' },
        { quality: 'auto:good' }
      ],
      public_id: (req, file) => generateUniqueFilename(req, file)
    }
  });

  // Cloudinary storage for page images
  pageImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/pages',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ quality: 'auto:good' }],
      public_id: (req, file) => {
        const pageNum = req.body.pageNumber || Date.now();
        const originalName = file.originalname.split('.')[0];
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        return `${sanitizedName}-page-${pageNum}`;
      }
    }
  });

  // Cloudinary storage for avatars
  avatarStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/avatars',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [
        { width: 200, height: 200, crop: 'fill' },
        { quality: 'auto:good' }
      ],
      public_id: (req, file) => generateUniqueFilename(req, file)
    }
  });

  // Cloudinary storage for PDFs
  pdfStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/ebooks/pdfs',
      resource_type: 'auto',
      allowed_formats: ['pdf'],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        return `${sanitizedName}-${timestamp}`;
      }
    }
  });

  // ============================================
  // FIXED: More permissive EPUB storage configuration
  // ============================================
  epubStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/ebooks/epubs',
      resource_type: 'auto', // Changed from 'raw' to 'auto' for better compatibility
      allowed_formats: ['epub'],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        return `${sanitizedName}-${timestamp}`;
      }
    }
  });

  // Cloudinary storage for general ebooks
  ebookStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/ebooks',
      resource_type: 'auto', // Changed from 'raw' to 'auto'
      allowed_formats: ['pdf', 'epub'],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        return `${sanitizedName}-${timestamp}`;
      }
    }
  });

  // Cloudinary storage for audio
  audioStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/audio',
      resource_type: 'video',
      allowed_formats: ['mp3', 'wav', 'ogg', 'm4a', 'aac', 'flac'],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        return `${sanitizedName}-${timestamp}`;
      }
    }
  });

  // Cloudinary storage for video
  videoStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/videos',
      resource_type: 'video',
      allowed_formats: ['mp4', 'webm', 'mov', 'avi', 'mkv', 'flv'],
      public_id: (req, file) => {
        const timestamp = Date.now();
        const originalName = file.originalname.split('.')[0];
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9]/g, '_');
        return `${sanitizedName}-${timestamp}`;
      },
      transformation: [{ quality: 'auto' }]
    }
  });

  // Cloudinary storage for temp files
  tempStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'zauqapp/temp',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'pdf', 'epub'],
      transformation: [{ quality: 'auto:good' }],
      public_id: (req, file) => generateUniqueFilename(req, file)
    }
  });
}

// ============================================
// FIXED: More permissive FILE FILTERS
// ============================================

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

const pdfFileFilter = (req, file, cb) => {
  // Check by MIME type or file extension
  const isPdf = file.mimetype === 'application/pdf' || 
                file.originalname.toLowerCase().endsWith('.pdf');
  
  if (isPdf) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed'), false);
  }
};

// FIXED: More permissive EPUB file filter
const epubFileFilter = (req, file, cb) => {
  // Check by file extension (most reliable for EPUB)
  // EPUB files often have incorrect MIME types
  const isEpub = file.originalname.toLowerCase().endsWith('.epub') || 
                 file.mimetype === 'application/epub+zip' ||
                 file.mimetype === 'application/octet-stream' ||
                 file.mimetype === 'application/zip';
  
  if (isEpub) {
    cb(null, true);
  } else {
    cb(new Error('Only EPUB files are allowed (.epub)'), false);
  }
};

// FIXED: More permissive ebook file filter
const ebookFileFilter = (req, file, cb) => {
  const isPdf = file.mimetype === 'application/pdf' || 
                file.originalname.toLowerCase().endsWith('.pdf');
  const isEpub = file.originalname.toLowerCase().endsWith('.epub') || 
                 file.mimetype === 'application/epub+zip' ||
                 file.mimetype === 'application/octet-stream';
  
  if (isPdf || isEpub) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF and EPUB files are allowed'), false);
  }
};

const audioFileFilter = (req, file, cb) => {
  const allowedTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', 'audio/flac'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed'), false);
  }
};

const videoFileFilter = (req, file, cb) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'), false);
  }
};

// ============================================
// MULTER INSTANCES (Use Cloudinary if configured, otherwise local)
// ============================================

// Image uploads
export const uploadImage = isCloudinaryConfigured ? 
  multer({ storage: imageStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
  multer({ storage: localImageStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter });

export const uploadCoverImage = isCloudinaryConfigured ?
  multer({ storage: coverImageStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
  multer({ storage: localCoverStorage, limits: { fileSize: 5 * 1024 * 1024 }, fileFilter: imageFileFilter });

export const uploadPageImages = isCloudinaryConfigured ?
  multer({ storage: pageImageStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
  multer({ storage: localPageStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter });

export const uploadAvatar = isCloudinaryConfigured ?
  multer({ storage: avatarStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter }) :
  multer({ storage: localImageStorage, limits: { fileSize: 2 * 1024 * 1024 }, fileFilter: imageFileFilter });

// Document uploads
export const uploadPDF = isCloudinaryConfigured ?
  multer({ storage: pdfStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: pdfFileFilter }) :
  multer({ storage: localEbookStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: pdfFileFilter });

// FIXED: More permissive EPUB upload
export const uploadEPUB = isCloudinaryConfigured ?
  multer({ storage: epubStorage, limits: { fileSize: 50 * 1024 * 1024 }, fileFilter: epubFileFilter }) :
  multer({ storage: localEbookStorage, limits: { fileSize: 50 * 1024 * 1024 }, fileFilter: epubFileFilter });

// FIXED: More permissive ebook upload
export const uploadEbook = isCloudinaryConfigured ?
  multer({ storage: ebookStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: ebookFileFilter }) :
  multer({ storage: localEbookStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: ebookFileFilter });

// Media uploads
export const uploadAudio = isCloudinaryConfigured ?
  multer({ storage: audioStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: audioFileFilter }) :
  multer({ storage: localAudioStorage, limits: { fileSize: 100 * 1024 * 1024 }, fileFilter: audioFileFilter });

export const uploadVideo = isCloudinaryConfigured ?
  multer({ storage: videoStorage, limits: { fileSize: 500 * 1024 * 1024 }, fileFilter: videoFileFilter }) :
  multer({ storage: localVideoStorage, limits: { fileSize: 500 * 1024 * 1024 }, fileFilter: videoFileFilter });

export const uploadTemp = isCloudinaryConfigured ?
  multer({ storage: tempStorage, limits: { fileSize: 20 * 1024 * 1024 } }) :
  multer({ storage: localImageStorage, limits: { fileSize: 20 * 1024 * 1024 } });

// ============================================
// HELPER FUNCTIONS
// ============================================

// Delete file from Cloudinary or local
export const deleteFile = async (publicId, resourceType = 'image') => {
  if (isCloudinaryConfigured) {
    try {
      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType
      });
      return result.result === 'ok';
    } catch (error) {
      console.error('Error deleting file from Cloudinary:', error);
      return false;
    }
  } else {
    // For local storage, delete file from filesystem
    try {
      const filePath = path.join(process.cwd(), 'uploads', publicId);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting local file:', error);
      return false;
    }
  }
};

// Delete multiple files
export const deleteMultipleFiles = async (files) => {
  const results = [];
  for (const file of files) {
    const { publicId, resourceType = 'image' } = file;
    const success = await deleteFile(publicId, resourceType);
    results.push({ publicId, success });
  }
  return results;
};

// Get optimized URL for image
export const getOptimizedImageUrl = (publicId, options = {}) => {
  if (!isCloudinaryConfigured) {
    return `/uploads/images/${publicId}`;
  }
  
  const { width, height, crop = 'fill', quality = 'auto' } = options;
  return cloudinary.url(publicId, {
    transformation: [
      { width: width || 800, height: height || 600, crop: crop },
      { quality: quality }
    ]
  });
};

// Get thumbnail URL
export const getThumbnailUrl = (publicId, size = 200) => {
  if (!isCloudinaryConfigured) {
    return `/uploads/images/${publicId}`;
  }
  
  return cloudinary.url(publicId, {
    transformation: [
      { width: size, height: size, crop: 'thumb', gravity: 'face' },
      { quality: 'auto' }
    ]
  });
};

// Get video thumbnail
export const getVideoThumbnail = (publicId, time = '5') => {
  if (!isCloudinaryConfigured) {
    return null;
  }
  
  return cloudinary.url(publicId, {
    resource_type: 'video',
    transformation: [
      { start_offset: time },
      { format: 'jpg' }
    ]
  });
};

export default cloudinary;