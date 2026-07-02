// server/controllers/creator.upload.controller.js
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { deleteFile } from '../utils/fileUtils.js';

/**
 * Upload Poetry
 */
export const uploadPoetry = async (req, res, next) => {
  try {
    const { 
      title, 
      content, 
      genre, 
      language, 
      tags, 
      isPremium, 
      visibility, 
      status,
      isFeatured,
      metaTitle,
      metaDescription
    } = req.body;
    
    const userId = req.user.id;
    
    // Validate required fields
    if (!title || !content) {
      return errorResponse(res, 'Title and content are required', 400);
    }
    
    // Handle file upload
    let coverImage = '';
    let coverCloudinaryId = '';
    
    if (req.files && req.files.coverImage) {
      coverImage = req.files.coverImage[0].path || req.files.coverImage[0].secure_url;
      coverCloudinaryId = req.files.coverImage[0].public_id;
    }
    
    // Parse tags if string
    const tagsArray = typeof tags === 'string' 
      ? tags.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(tags) ? tags : []);
    
    const poem = await Poem.create({
      title,
      content,
      genre: genre || 'Other',
      language: language || 'urdu',
      tags: tagsArray,
      isPremium: isPremium === 'true' || isPremium === true,
      visibility: visibility || 'public',
      status: status || 'draft',
      isPublished: status === 'published',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      createdBy: userId,
      createdBy: userId,
      featuredImage: coverImage,
      coverCloudinaryId,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || content.substring(0, 160),
      publishedAt: status === 'published' ? new Date() : null
    });
    
    successResponse(res, poem, 'Poetry uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Ebook
 */
export const uploadEbook = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      genre, 
      language, 
      format,
      tags, 
      isPremium, 
      visibility, 
      status,
      isFeatured,
      pages,
      price,
      metaTitle,
      metaDescription
    } = req.body;
    
    const userId = req.user.id;
    
    // Validate required fields
    if (!title) {
      return errorResponse(res, 'Title is required', 400);
    }
    
    if (!req.files || !req.files.bookFile) {
      return errorResponse(res, 'Book file is required', 400);
    }
    
    const bookFile = req.files.bookFile[0];
    let coverImage = '';
    let coverCloudinaryId = '';
    
    if (req.files && req.files.coverImage) {
      coverImage = req.files.coverImage[0].path || req.files.coverImage[0].secure_url;
      coverCloudinaryId = req.files.coverImage[0].public_id;
    }
    
    const tagsArray = typeof tags === 'string' 
      ? tags.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(tags) ? tags : []);
    
    const book = await Book.create({
      title,
      description: description || '',
      genre: genre || 'Other',
      language: language || 'urdu',
      format: format || 'PDF',
      tags: tagsArray,
      isPremium: isPremium === 'true' || isPremium === true,
      visibility: visibility || 'public',
      status: status || 'draft',
      isPublished: status === 'published',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      createdBy: userId,
      bookUrl: bookFile.path || bookFile.secure_url,
      bookCloudinaryId: bookFile.public_id,
      bookSize: bookFile.size,
      bookFormat: bookFile.mimetype,
      coverImage,
      coverCloudinaryId,
      pages: parseInt(pages) || 0,
      price: parseFloat(price) || 0,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || description?.substring(0, 160) || title,
      publishedAt: status === 'published' ? new Date() : null
    });
    
    successResponse(res, book, 'Ebook uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Audio
 */
export const uploadAudio = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      type, 
      occasion, 
      language, 
      tags, 
      isPremium, 
      visibility, 
      status,
      isFeatured,
      artist,
      album,
      duration,
      metaTitle,
      metaDescription
    } = req.body;
    
    const userId = req.user.id;
    
    // Validate required fields
    if (!title) {
      return errorResponse(res, 'Title is required', 400);
    }
    
    if (!req.files || !req.files.audio) {
      return errorResponse(res, 'Audio file is required', 400);
    }
    
    const audioFile = req.files.audio[0];
    let coverImage = '';
    let coverCloudinaryId = '';
    
    if (req.files && req.files.coverImage) {
      coverImage = req.files.coverImage[0].path || req.files.coverImage[0].secure_url;
      coverCloudinaryId = req.files.coverImage[0].public_id;
    }
    
    const tagsArray = typeof tags === 'string' 
      ? tags.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(tags) ? tags : []);
    
    const audio = await Audio.create({
      title,
      description: description || '',
      type: type || 'Recitation',
      occasion: occasion || '',
      language: language || 'urdu',
      tags: tagsArray,
      isPremium: isPremium === 'true' || isPremium === true,
      visibility: visibility || 'public',
      status: status || 'draft',
      isPublished: status === 'published',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      createdBy: userId,
      audioUrl: audioFile.path || audioFile.secure_url,
      audioCloudinaryId: audioFile.public_id,
      audioSize: audioFile.size,
      audioFormat: audioFile.mimetype,
      duration: parseInt(duration) || 0,
      artist: artist || '',
      album: album || '',
      coverImage,
      coverCloudinaryId,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || description?.substring(0, 160) || title,
      publishedAt: status === 'published' ? new Date() : null
    });
    
    successResponse(res, audio, 'Audio uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Video
 */
export const uploadVideo = async (req, res, next) => {
  try {
    const { 
      title, 
      description, 
      category, 
      language, 
      tags, 
      isPremium, 
      visibility, 
      status,
      isFeatured,
      duration,
      metaTitle,
      metaDescription
    } = req.body;
    
    const userId = req.user.id;
    
    // Validate required fields
    if (!title) {
      return errorResponse(res, 'Title is required', 400);
    }
    
    if (!req.files || !req.files.video) {
      return errorResponse(res, 'Video file is required', 400);
    }
    
    const videoFile = req.files.video[0];
    let thumbnail = '';
    let thumbnailCloudinaryId = '';
    
    if (req.files && req.files.thumbnail) {
      thumbnail = req.files.thumbnail[0].path || req.files.thumbnail[0].secure_url;
      thumbnailCloudinaryId = req.files.thumbnail[0].public_id;
    }
    
    const tagsArray = typeof tags === 'string' 
      ? tags.split(',').map(t => t.trim()).filter(Boolean)
      : (Array.isArray(tags) ? tags : []);
    
    const video = await Video.create({
      title,
      description: description || '',
      category: category || 'Other',
      language: language || 'urdu',
      tags: tagsArray,
      isPremium: isPremium === 'true' || isPremium === true,
      visibility: visibility || 'public',
      status: status || 'draft',
      isPublished: status === 'published',
      isFeatured: isFeatured === 'true' || isFeatured === true,
      createdBy: userId,
      videoUrl: videoFile.path || videoFile.secure_url,
      videoCloudinaryId: videoFile.public_id,
      videoSize: videoFile.size,
      videoFormat: videoFile.mimetype,
      duration: parseInt(duration) || 0,
      thumbnail,
      thumbnailCloudinaryId,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || description?.substring(0, 160) || title,
      publishedAt: status === 'published' ? new Date() : null
    });
    
    successResponse(res, video, 'Video uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Image (generic)
 */
export const uploadImage = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No image file provided', 400);
    }
    
    const imageData = {
      url: req.file.path || req.file.secure_url,
      cloudinaryId: req.file.public_id,
      size: req.file.size,
      format: req.file.mimetype,
      filename: req.file.originalname
    };
    
    successResponse(res, imageData, 'Image uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Upload Cover Image
 */
export const uploadCover = async (req, res, next) => {
  try {
    if (!req.file) {
      return errorResponse(res, 'No cover image provided', 400);
    }
    
    const coverData = {
      url: req.file.path || req.file.secure_url,
      cloudinaryId: req.file.public_id,
      size: req.file.size,
      format: req.file.mimetype,
      filename: req.file.originalname
    };
    
    successResponse(res, coverData, 'Cover image uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete uploaded file
 */
export const deleteUploadedFile = async (req, res, next) => {
  try {
    const { fileId, type } = req.body;
    
    if (!fileId) {
      return errorResponse(res, 'File ID is required', 400);
    }
    
    // Delete from Cloudinary or local storage
    const result = await deleteFile(fileId, type);
    
    successResponse(res, result, 'File deleted successfully');
  } catch (error) {
    next(error);
  }
};