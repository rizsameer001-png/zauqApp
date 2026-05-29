// // client/src/api/uploadAPI.js
// import api from './apiConfig';

// const uploadAPI = {
//   // Upload single image
//   uploadImage: async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);
//     const response = await api.post('/upload/image', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload multiple images
//   uploadImages: async (files) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('images', file);
//     });
//     const response = await api.post('/upload/images', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload ebook (PDF/EPUB)
//   uploadEbook: async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await api.post('/upload/ebook', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Delete file
//   deleteFile: async (publicId, resourceType = 'image') => {
//     const response = await api.delete('/upload/delete', {
//       data: { publicId, resourceType }
//     });
//     return response.data;
//   }
// };

// export default uploadAPI;







// // client/src/api/uploadAPI.js
// import api from './apiConfig';

// const uploadAPI = {
//   // Upload cover image (single image)
//   uploadCover: async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);
//     const response = await api.post('/upload/cover', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload single image (generic)
//   uploadImage: async (file) => {
//     const formData = new FormData();
//     formData.append('image', file);
//     const response = await api.post('/upload/image', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload multiple images (page images)
//   uploadImages: async (files) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('images', file);
//     });
//     const response = await api.post('/upload/images', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload multiple page images (alias for uploadImages)
//   uploadPages: async (files) => {
//     const formData = new FormData();
//     files.forEach(file => {
//       formData.append('images', file);
//     });
//     const response = await api.post('/upload/pages', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload PDF file
//   uploadPDF: async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await api.post('/upload/pdf', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload EPUB file
//   uploadEPUB: async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await api.post('/upload/epub', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload ebook (PDF/EPUB) - generic method
//   uploadEbook: async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     const response = await api.post('/upload/ebook', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload audio file
//   uploadAudio: async (file) => {
//     const formData = new FormData();
//     formData.append('audio', file);
//     const response = await api.post('/upload/audio', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Upload video file
//   uploadVideo: async (file) => {
//     const formData = new FormData();
//     formData.append('video', file);
//     const response = await api.post('/upload/video', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' }
//     });
//     return response.data;
//   },
  
//   // Delete file from Cloudinary
//   deleteFile: async (publicId, resourceType = 'image') => {
//     const response = await api.delete('/upload/delete', {
//       data: { publicId, resourceType }
//     });
//     return response.data;
//   },
  
//   // Delete multiple files
//   deleteMultipleFiles: async (files) => {
//     const response = await api.post('/upload/delete-multiple', { files });
//     return response.data;
//   }
// };

// export default uploadAPI;













// // client/src/api/uploadAPI.js
// import api from './apiConfig';

// // Constants for upload configuration
// const UPLOAD_CONFIG = {
//   MAX_RETRIES: 3,
//   RETRY_DELAY: 1000,
//   TIMEOUT: 120000, // 2 minutes for large files
//   CHUNK_SIZE: 1024 * 1024 * 5, // 5MB chunks for large files
// };

// // Helper function to delay retry
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Helper function to upload with retry logic
// const uploadWithRetry = async (url, formData, options = {}, retryCount = 0) => {
//   try {
//     const response = await api.post(url, formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//       timeout: UPLOAD_CONFIG.TIMEOUT,
//       onUploadProgress: options.onProgress,
//       ...options
//     });
//     return response.data;
//   } catch (error) {
//     // Don't retry for validation errors
//     if (error.response?.status === 400) {
//       throw error;
//     }
    
//     // Retry for network errors or timeouts
//     if (retryCount < UPLOAD_CONFIG.MAX_RETRIES && (error.code === 'ECONNABORTED' || error.message.includes('timeout') || !error.response)) {
//       console.log(`Retrying upload (${retryCount + 1}/${UPLOAD_CONFIG.MAX_RETRIES})...`);
//       await delay(UPLOAD_CONFIG.RETRY_DELAY * (retryCount + 1));
//       return uploadWithRetry(url, formData, options, retryCount + 1);
//     }
//     throw error;
//   }
// };

// // Helper function to validate file before upload
// const validateFile = (file, options = {}) => {
//   const { maxSize, allowedTypes, typeName = 'file' } = options;
  
//   if (!file) {
//     throw new Error('No file selected');
//   }
  
//   if (maxSize && file.size > maxSize) {
//     throw new Error(`${typeName} size exceeds ${maxSize / (1024 * 1024)}MB limit`);
//   }
  
//   if (allowedTypes && allowedTypes.length > 0) {
//     const isValidType = allowedTypes.some(type => {
//       if (type.includes('/')) {
//         return file.type === type;
//       }
//       return file.name.endsWith(type);
//     });
    
//     if (!isValidType) {
//       throw new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
//     }
//   }
  
//   return true;
// };

// const uploadAPI = {
//   // Upload cover image with validation
//   uploadCover: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 5 * 1024 * 1024, // 5MB
//         allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
//         typeName: 'Cover image'
//       });
      
//       const formData = new FormData();
//       formData.append('image', file);
      
//       return await uploadWithRetry('/upload/cover', formData, { onProgress });
//     } catch (error) {
//       console.error('Cover upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload single image
//   uploadImage: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 5 * 1024 * 1024,
//         allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
//         typeName: 'Image'
//       });
      
//       const formData = new FormData();
//       formData.append('image', file);
      
//       return await uploadWithRetry('/upload/image', formData, { onProgress });
//     } catch (error) {
//       console.error('Image upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload multiple images
//   uploadImages: async (files, onProgress = null) => {
//     try {
//       if (!files || files.length === 0) {
//         throw new Error('No files selected');
//       }
      
//       // Validate each file
//       for (const file of files) {
//         validateFile(file, {
//           maxSize: 5 * 1024 * 1024,
//           allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
//           typeName: 'Image'
//         });
//       }
      
//       const formData = new FormData();
//       files.forEach(file => {
//         formData.append('images', file);
//       });
      
//       return await uploadWithRetry('/upload/images', formData, { onProgress });
//     } catch (error) {
//       console.error('Multiple images upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload page images (book pages)
//   uploadPages: async (files, onProgress = null) => {
//     try {
//       if (!files || files.length === 0) {
//         throw new Error('No page images selected');
//       }
      
//       // Validate each file (smaller limit for pages)
//       for (const file of files) {
//         validateFile(file, {
//           maxSize: 2 * 1024 * 1024, // 2MB per page
//           allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
//           typeName: 'Page image'
//         });
//       }
      
//       const formData = new FormData();
//       files.forEach((file, index) => {
//         formData.append('images', file);
//         formData.append('pageNumbers', index + 1);
//       });
      
//       return await uploadWithRetry('/upload/pages', formData, { onProgress });
//     } catch (error) {
//       console.error('Page images upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload PDF file
//   uploadPDF: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 100 * 1024 * 1024, // 100MB
//         allowedTypes: ['application/pdf', '.pdf'],
//         typeName: 'PDF'
//       });
      
//       const formData = new FormData();
//       formData.append('file', file);
      
//       return await uploadWithRetry('/upload/pdf', formData, { onProgress });
//     } catch (error) {
//       console.error('PDF upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload EPUB file
//   uploadEPUB: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 50 * 1024 * 1024, // 50MB
//         allowedTypes: ['application/epub+zip', '.epub'],
//         typeName: 'EPUB'
//       });
      
//       const formData = new FormData();
//       formData.append('file', file);
      
//       return await uploadWithRetry('/upload/epub', formData, { onProgress });
//     } catch (error) {
//       console.error('EPUB upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload ebook (PDF or EPUB)
//   uploadEbook: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 100 * 1024 * 1024, // 100MB
//         allowedTypes: ['application/pdf', 'application/epub+zip', '.pdf', '.epub'],
//         typeName: 'Ebook'
//       });
      
//       const formData = new FormData();
//       formData.append('file', file);
      
//       return await uploadWithRetry('/upload/ebook', formData, { onProgress });
//     } catch (error) {
//       console.error('Ebook upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload audio file
//   uploadAudio: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 100 * 1024 * 1024, // 100MB
//         allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', '.mp3', '.wav', '.ogg', '.m4a'],
//         typeName: 'Audio'
//       });
      
//       const formData = new FormData();
//       formData.append('audio', file);
      
//       return await uploadWithRetry('/upload/audio', formData, { onProgress });
//     } catch (error) {
//       console.error('Audio upload error:', error);
//       throw error;
//     }
//   },
  
//   // Upload video file
//   uploadVideo: async (file, onProgress = null) => {
//     try {
//       validateFile(file, {
//         maxSize: 500 * 1024 * 1024, // 500MB
//         allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime', '.mp4', '.webm', '.mov'],
//         typeName: 'Video'
//       });
      
//       const formData = new FormData();
//       formData.append('video', file);
      
//       return await uploadWithRetry('/upload/video', formData, { onProgress });
//     } catch (error) {
//       console.error('Video upload error:', error);
//       throw error;
//     }
//   },
  
//   // Delete single file
//   deleteFile: async (publicId, resourceType = 'image') => {
//     try {
//       if (!publicId) {
//         throw new Error('Public ID is required');
//       }
      
//       const response = await api.delete('/upload/delete', {
//         data: { publicId, resourceType },
//         timeout: 30000
//       });
//       return response.data;
//     } catch (error) {
//       console.error('File deletion error:', error);
//       throw error;
//     }
//   },
  
//   // Delete multiple files
//   deleteMultipleFiles: async (files) => {
//     try {
//       if (!files || files.length === 0) {
//         throw new Error('No files selected for deletion');
//       }
      
//       const response = await api.post('/upload/delete-multiple', { files }, {
//         timeout: 60000
//       });
//       return response.data;
//     } catch (error) {
//       console.error('Multiple files deletion error:', error);
//       throw error;
//     }
//   },
  
//   // Chunked upload for very large files
//   uploadLargeFile: async (file, onProgress = null) => {
//     const CHUNK_SIZE = UPLOAD_CONFIG.CHUNK_SIZE;
//     const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
//     let uploadedChunks = 0;
    
//     const uploadChunk = async (chunk, chunkIndex) => {
//       const formData = new FormData();
//       formData.append('file', chunk);
//       formData.append('chunkIndex', chunkIndex);
//       formData.append('totalChunks', totalChunks);
//       formData.append('fileName', file.name);
//       formData.append('fileType', file.type);
      
//       return await uploadWithRetry('/upload/chunk', formData, {
//         onProgress: (progressEvent) => {
//           const chunkProgress = (progressEvent.loaded / progressEvent.total) * 100;
//           const totalProgress = ((uploadedChunks + chunkProgress / 100) / totalChunks) * 100;
//           if (onProgress) onProgress(totalProgress);
//         }
//       });
//     };
    
//     try {
//       for (let i = 0; i < totalChunks; i++) {
//         const start = i * CHUNK_SIZE;
//         const end = Math.min(start + CHUNK_SIZE, file.size);
//         const chunk = file.slice(start, end);
        
//         await uploadChunk(chunk, i);
//         uploadedChunks++;
        
//         if (onProgress) {
//           onProgress((uploadedChunks / totalChunks) * 100);
//         }
//       }
      
//       // Finalize upload
//       const finalizeResponse = await api.post('/upload/finalize', {
//         fileName: file.name,
//         totalChunks,
//         fileSize: file.size,
//         fileType: file.type
//       });
      
//       return finalizeResponse.data;
//     } catch (error) {
//       console.error('Chunked upload error:', error);
//       throw error;
//     }
//   },
  
//   // Cancel ongoing upload
//   cancelUpload: (uploadId) => {
//     // Implementation depends on your cancelation mechanism
//     console.log(`Cancelling upload: ${uploadId}`);
//     // You can implement AbortController here
//   }
// };

// // Create upload progress hook for React components
// export const useUploadProgress = () => {
//   const [progress, setProgress] = useState(0);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState(null);
  
//   const upload = async (uploadFn, file) => {
//     setIsUploading(true);
//     setError(null);
//     setProgress(0);
    
//     try {
//       const result = await uploadFn(file, (p) => setProgress(p));
//       return result;
//     } catch (err) {
//       setError(err.message);
//       throw err;
//     } finally {
//       setIsUploading(false);
//     }
//   };
  
//   return { progress, isUploading, error, upload };
// };

// export default uploadAPI;












// client/src/api/uploadAPI.js
import api from './apiConfig';

// Constants for upload configuration
const UPLOAD_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
  TIMEOUT: 120000, // 2 minutes for large files
  CHUNK_SIZE: 1024 * 1024 * 5, // 5MB chunks for large files
};

// Helper function to delay retry
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to upload with retry logic
const uploadWithRetry = async (url, formData, options = {}, retryCount = 0) => {
  try {
    const response = await api.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: UPLOAD_CONFIG.TIMEOUT,
      onUploadProgress: options.onProgress,
      ...options
    });
    return response.data;
  } catch (error) {
    // Don't retry for validation errors
    if (error.response?.status === 400) {
      throw error;
    }
    
    // Retry for network errors or timeouts
    if (retryCount < UPLOAD_CONFIG.MAX_RETRIES && (error.code === 'ECONNABORTED' || error.message.includes('timeout') || !error.response)) {
      console.log(`Retrying upload (${retryCount + 1}/${UPLOAD_CONFIG.MAX_RETRIES})...`);
      await delay(UPLOAD_CONFIG.RETRY_DELAY * (retryCount + 1));
      return uploadWithRetry(url, formData, options, retryCount + 1);
    }
    throw error;
  }
};

// Helper function to validate file before upload
const validateFile = (file, options = {}) => {
  const { maxSize, allowedTypes, typeName = 'file' } = options;
  
  if (!file) {
    throw new Error('No file selected');
  }
  
  if (maxSize && file.size > maxSize) {
    throw new Error(`${typeName} size exceeds ${maxSize / (1024 * 1024)}MB limit`);
  }
  
  if (allowedTypes && allowedTypes.length > 0) {
    const isValidType = allowedTypes.some(type => {
      if (type.includes('/')) {
        return file.type === type;
      }
      return file.name.toLowerCase().endsWith(type.toLowerCase());
    });
    
    if (!isValidType) {
      throw new Error(`Invalid file type. Allowed: ${allowedTypes.join(', ')}`);
    }
  }
  
  return true;
};

// Helper function to get file extension
const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

const uploadAPI = {
  // Upload cover image with validation
  uploadCover: async (file, onProgress = null) => {
    try {
      validateFile(file, {
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', '.jpg', '.jpeg', '.png', '.webp'],
        typeName: 'Cover image'
      });
      
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await uploadWithRetry('/upload/cover', formData, { onProgress });
      return response;
    } catch (error) {
      console.error('Cover upload error:', error);
      throw error;
    }
  },
  
  // Upload single image
  uploadImage: async (file, onProgress = null) => {
    try {
      validateFile(file, {
        maxSize: 5 * 1024 * 1024,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', '.jpg', '.jpeg', '.png', '.webp', '.gif'],
        typeName: 'Image'
      });
      
      const formData = new FormData();
      formData.append('image', file);
      
      return await uploadWithRetry('/upload/image', formData, { onProgress });
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  },
  
  // Upload multiple images
  uploadImages: async (files, onProgress = null) => {
    try {
      if (!files || files.length === 0) {
        throw new Error('No files selected');
      }
      
      // Validate each file
      for (const file of files) {
        validateFile(file, {
          maxSize: 5 * 1024 * 1024,
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', '.jpg', '.jpeg', '.png', '.webp', '.gif'],
          typeName: 'Image'
        });
      }
      
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });
      
      return await uploadWithRetry('/upload/images', formData, { onProgress });
    } catch (error) {
      console.error('Multiple images upload error:', error);
      throw error;
    }
  },
  
  // Upload page images (book pages)
  uploadPages: async (files, onProgress = null) => {
    try {
      if (!files || files.length === 0) {
        throw new Error('No page images selected');
      }
      
      // Validate each file (smaller limit for pages)
      for (const file of files) {
        validateFile(file, {
          maxSize: 2 * 1024 * 1024, // 2MB per page
          allowedTypes: ['image/jpeg', 'image/png', 'image/webp', '.jpg', '.jpeg', '.png', '.webp'],
          typeName: 'Page image'
        });
      }
      
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append('images', file);
        formData.append('pageNumbers', index + 1);
      });
      
      return await uploadWithRetry('/upload/pages', formData, { onProgress });
    } catch (error) {
      console.error('Page images upload error:', error);
      throw error;
    }
  },
  
  // Upload PDF file
  uploadPDF: async (file, onProgress = null) => {
    try {
      validateFile(file, {
        maxSize: 100 * 1024 * 1024, // 100MB
        allowedTypes: ['application/pdf', '.pdf'],
        typeName: 'PDF'
      });
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await uploadWithRetry('/upload/pdf', formData, { onProgress });
      return response;
    } catch (error) {
      console.error('PDF upload error:', error);
      throw error;
    }
  },
  
  // ============================================
  // FIXED: EPUB upload with correct endpoint
  // ============================================
  uploadEPUB: async (file, onProgress = null) => {
    try {
      console.log('📖 Starting EPUB upload...');
      console.log('  - File name:', file.name);
      console.log('  - File size:', file.size, 'bytes');
      console.log('  - File type:', file.type);
      
      validateFile(file, {
        maxSize: 50 * 1024 * 1024, // 50MB
        allowedTypes: ['application/epub+zip', '.epub'],
        typeName: 'EPUB'
      });
      
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('  - Sending to /upload/epub endpoint');
      const response = await uploadWithRetry('/upload/epub', formData, { onProgress });
      console.log('  - Upload successful:', response);
      return response;
    } catch (error) {
      console.error('EPUB upload error:', error);
      console.error('  - Error details:', error.response?.data || error.message);
      throw error;
    }
  },
  
  // Upload ebook (PDF or EPUB) - auto-detects format
  uploadEbook: async (file, onProgress = null) => {
    try {
      const ext = getFileExtension(file.name);
      const isPdf = ext === 'pdf';
      const isEpub = ext === 'epub';
      
      if (!isPdf && !isEpub) {
        throw new Error('Only PDF and EPUB files are allowed');
      }
      
      validateFile(file, {
        maxSize: isPdf ? 100 * 1024 * 1024 : 50 * 1024 * 1024,
        allowedTypes: isPdf ? ['application/pdf', '.pdf'] : ['application/epub+zip', '.epub'],
        typeName: isPdf ? 'PDF' : 'EPUB'
      });
      
      const formData = new FormData();
      formData.append('file', file);
      
      // Use dedicated endpoint based on file type
      const endpoint = isPdf ? '/upload/pdf' : '/upload/epub';
      console.log(`📚 Uploading ${isPdf ? 'PDF' : 'EPUB'} to ${endpoint}`);
      
      const response = await uploadWithRetry(endpoint, formData, { onProgress });
      return response;
    } catch (error) {
      console.error('Ebook upload error:', error);
      throw error;
    }
  },
  
  // Upload audio file
  uploadAudio: async (file, onProgress = null) => {
    try {
      validateFile(file, {
        maxSize: 100 * 1024 * 1024, // 100MB
        allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/m4a', 'audio/aac', '.mp3', '.wav', '.ogg', '.m4a', '.aac'],
        typeName: 'Audio'
      });
      
      const formData = new FormData();
      formData.append('audio', file);
      
      return await uploadWithRetry('/upload/audio', formData, { onProgress });
    } catch (error) {
      console.error('Audio upload error:', error);
      throw error;
    }
  },
  
  // Upload video file
  uploadVideo: async (file, onProgress = null) => {
    try {
      validateFile(file, {
        maxSize: 500 * 1024 * 1024, // 500MB
        allowedTypes: ['video/mp4', 'video/webm', 'video/quicktime', '.mp4', '.webm', '.mov'],
        typeName: 'Video'
      });
      
      const formData = new FormData();
      formData.append('video', file);
      
      return await uploadWithRetry('/upload/video', formData, { onProgress });
    } catch (error) {
      console.error('Video upload error:', error);
      throw error;
    }
  },
  
  // Test upload endpoint (for debugging)
  testUpload: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      console.log('Testing upload with file:', file.name);
      const response = await api.post('/upload/test', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      });
      console.log('Test upload response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Test upload error:', error);
      throw error;
    }
  },
  
  // Delete single file
  deleteFile: async (publicId, resourceType = 'image') => {
    try {
      if (!publicId) {
        throw new Error('Public ID is required');
      }
      
      const response = await api.delete('/upload/delete', {
        data: { publicId, resourceType },
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      console.error('File deletion error:', error);
      throw error;
    }
  },
  
  // Delete multiple files
  deleteMultipleFiles: async (files) => {
    try {
      if (!files || files.length === 0) {
        throw new Error('No files selected for deletion');
      }
      
      const response = await api.post('/upload/delete-multiple', { files }, {
        timeout: 60000
      });
      return response.data;
    } catch (error) {
      console.error('Multiple files deletion error:', error);
      throw error;
    }
  },
  
  // Check upload service health
  checkHealth: async () => {
    try {
      const response = await api.get('/upload/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },
  
  // Chunked upload for very large files
  uploadLargeFile: async (file, onProgress = null) => {
    const CHUNK_SIZE = UPLOAD_CONFIG.CHUNK_SIZE;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    let uploadedChunks = 0;
    
    const uploadChunk = async (chunk, chunkIndex) => {
      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('chunkIndex', chunkIndex);
      formData.append('totalChunks', totalChunks);
      formData.append('fileName', file.name);
      formData.append('fileType', file.type);
      
      return await uploadWithRetry('/upload/chunk', formData, {
        onProgress: (progressEvent) => {
          const chunkProgress = (progressEvent.loaded / progressEvent.total) * 100;
          const totalProgress = ((uploadedChunks + chunkProgress / 100) / totalChunks) * 100;
          if (onProgress) onProgress(totalProgress);
        }
      });
    };
    
    try {
      for (let i = 0; i < totalChunks; i++) {
        const start = i * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);
        
        await uploadChunk(chunk, i);
        uploadedChunks++;
        
        if (onProgress) {
          onProgress((uploadedChunks / totalChunks) * 100);
        }
      }
      
      // Finalize upload
      const finalizeResponse = await api.post('/upload/finalize', {
        fileName: file.name,
        totalChunks,
        fileSize: file.size,
        fileType: file.type
      });
      
      return finalizeResponse.data;
    } catch (error) {
      console.error('Chunked upload error:', error);
      throw error;
    }
  },
  
  // Cancel ongoing upload
  cancelUpload: (uploadId) => {
    console.log(`Cancelling upload: ${uploadId}`);
    // You can implement AbortController here
  }
};

// Helper function to format file size
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Helper function to get file icon based on type
export const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const icons = {
    pdf: '📄',
    epub: '📖',
    mp3: '🎵',
    mp4: '🎬',
    jpg: '🖼️',
    jpeg: '🖼️',
    png: '🖼️',
    gif: '🖼️',
    webp: '🖼️'
  };
  return icons[ext] || '📁';
};

export default uploadAPI;