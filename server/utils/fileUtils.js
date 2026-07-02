// server/utils/fileUtils.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Delete a file from the filesystem
 * @param {string} filePath - Path to the file
 * @returns {Promise<boolean>} - Success status
 */
export const deleteLocalFile = async (filePath) => {
  try {
    const fullPath = path.join(__dirname, '..', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
};

/**
 * Delete a file from Cloudinary
 * @param {string} publicId - Cloudinary public ID
 * @param {string} type - Resource type (image, video, raw)
 * @returns {Promise<boolean>} - Success status
 */
export const deleteCloudinaryFile = async (publicId, type = 'image') => {
  try {
    if (!publicId) return false;
    
    // If you're using Cloudinary, implement this
    // const result = await cloudinary.uploader.destroy(publicId, { resource_type: type });
    // return result.result === 'ok';
    
    // Placeholder - implement based on your cloud storage setup
    return true;
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

/**
 * Delete file from storage (handles both local and cloud)
 * @param {string} fileId - File ID or path
 * @param {string} type - Resource type
 * @returns {Promise<{success: boolean, message: string}>} - Result
 */
export const deleteFile = async (fileId, type = 'image') => {
  try {
    // Check if it's a Cloudinary ID (contains 'cloudinary' or is a public ID format)
    if (fileId.includes('cloudinary') || fileId.includes('_')) {
      const result = await deleteCloudinaryFile(fileId, type);
      return {
        success: result,
        message: result ? 'File deleted from Cloudinary' : 'Failed to delete from Cloudinary'
      };
    } else {
      // Assume it's a local file path
      const result = await deleteLocalFile(fileId);
      return {
        success: result,
        message: result ? 'File deleted successfully' : 'Failed to delete file'
      };
    }
  } catch (error) {
    console.error('Error in deleteFile:', error);
    return {
      success: false,
      message: error.message || 'Failed to delete file'
    };
  }
};

/**
 * Get file size in a readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Get file extension from filename
 * @param {string} filename - File name
 * @returns {string} - File extension
 */
export const getFileExtension = (filename) => {
  return path.extname(filename).toLowerCase();
};

/**
 * Check if file is an image
 * @param {string} mimeType - MIME type
 * @returns {boolean} - Is image
 */
export const isImage = (mimeType) => {
  return mimeType.startsWith('image/');
};

/**
 * Check if file is audio
 * @param {string} mimeType - MIME type
 * @returns {boolean} - Is audio
 */
export const isAudio = (mimeType) => {
  return mimeType.startsWith('audio/');
};

/**
 * Check if file is video
 * @param {string} mimeType - MIME type
 * @returns {boolean} - Is video
 */
export const isVideo = (mimeType) => {
  return mimeType.startsWith('video/');
};

/**
 * Check if file is a document
 * @param {string} mimeType - MIME type
 * @returns {boolean} - Is document
 */
export const isDocument = (mimeType) => {
  const documentTypes = ['application/pdf', 'application/epub+zip', 'application/x-mobipocket-ebook'];
  return documentTypes.includes(mimeType);
};

/**
 * Generate a unique filename
 * @param {string} originalName - Original filename
 * @param {string} prefix - Optional prefix
 * @returns {string} - Unique filename
 */
export const generateUniqueFilename = (originalName, prefix = '') => {
  const ext = path.extname(originalName);
  const name = path.basename(originalName, ext);
  const timestamp = Date.now();
  const random = Math.round(Math.random() * 1E9);
  const cleanName = name.replace(/\s+/g, '-').toLowerCase();
  return `${prefix}${cleanName}-${timestamp}-${random}${ext}`;
};