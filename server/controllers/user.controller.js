// //server/controllers/user.controller.js

// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import Notification from '../models/Notification.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';
// import cloudinary from '../config/cloudinary.js';

// export const getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate('favorites.poems', 'title slug author genre')
//       .populate('favorites.books', 'title slug author coverImage')
//       .populate('favorites.audio', 'title slug author thumbnail')
//       .populate('favorites.videos', 'title slug author thumbnail')
//       .populate('following', 'name slug avatar');

//     successResponse(res, user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { name, bio, preferences } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, bio, preferences },
//       { new: true, runValidators: true }
//     );
//     successResponse(res, user, 'Profile updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePassword = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select('+password');
//     const isMatch = await user.comparePassword(req.body.currentPassword);

//     if (!isMatch) {
//       return errorResponse(res, 'Current password is incorrect', 400);
//     }

//     user.password = req.body.newPassword;
//     await user.save();
//     successResponse(res, null, 'Password updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const uploadAvatar = async (req, res, next) => {
//   try {
//     if (!req.file) {
//       return errorResponse(res, 'Please upload an image', 400);
//     }

//     const result = await cloudinary.uploader.upload(req.file.path, {
//       folder: 'zauqapp/avatars',
//       width: 400,
//       height: 400,
//       crop: 'fill'
//     });

//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatar: result.secure_url },
//       { new: true }
//     );

//     successResponse(res, { avatar: user.avatar }, 'Avatar updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFavorites = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let favorites = [];
//     switch (type) {
//       case 'poems':
//         favorites = await Poem.find({ _id: { $in: user.favorites.poems } })
//           .populate('author', 'name slug');
//         break;
//       case 'books':
//         favorites = await Book.find({ _id: { $in: user.favorites.books } })
//           .populate('author', 'name slug');
//         break;
//       case 'audio':
//         favorites = await Audio.find({ _id: { $in: user.favorites.audio } })
//           .populate('author', 'name slug');
//         break;
//       case 'videos':
//         favorites = await Video.find({ _id: { $in: user.favorites.videos } })
//           .populate('author', 'name slug');
//         break;
//       default:
//         favorites = {
//           poems: await Poem.find({ _id: { $in: user.favorites.poems } }).populate('author', 'name slug'),
//           books: await Book.find({ _id: { $in: user.favorites.books } }).populate('author', 'name slug'),
//           audio: await Audio.find({ _id: { $in: user.favorites.audio } }).populate('author', 'name slug'),
//           videos: await Video.find({ _id: { $in: user.favorites.videos } }).populate('author', 'name slug')
//         };
//     }

//     successResponse(res, favorites);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addToFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.body;
//     const user = await User.findById(req.user.id);

//     const validTypes = ['poems', 'books', 'audio', 'videos'];
//     if (!validTypes.includes(type)) {
//       return errorResponse(res, 'Invalid content type', 400);
//     }

//     if (!user.favorites[type].includes(id)) {
//       user.favorites[type].push(id);
//       await user.save();
//     }

//     successResponse(res, null, 'Added to favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeFromFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.params;
//     const user = await User.findById(req.user.id);

//     user.favorites[type] = user.favorites[type].filter(item => item.toString() !== id);
//     await user.save();

//     successResponse(res, null, 'Removed from favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHistory = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let history = user.readingHistory;
//     if (type) {
//       history = history.filter(h => h.contentType === type);
//     }

//     // Sort by lastRead descending
//     history.sort((a, b) => b.lastRead - a.lastRead);

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDownloads = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     successResponse(res, user.downloads);
//   } catch (error) {
//     next(error);
//   }
// };

// export const followAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const authorId = req.params.authorId;

//     if (!user.following.includes(authorId)) {
//       user.following.push(authorId);
//       await user.save();
//     }

//     successResponse(res, null, 'Author followed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const unfollowAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     user.following = user.following.filter(id => id.toString() !== req.params.authorId);
//     await user.save();
//     successResponse(res, null, 'Author unfollowed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const notifications = await Notification.find({ recipient: req.user.id })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Notification.countDocuments({ recipient: req.user.id });

//     paginatedResponse(res, notifications, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markNotificationRead = async (req, res, next) => {
//   try {
//     if (req.params.id === 'read-all') {
//       await Notification.updateMany(
//         { recipient: req.user.id, isRead: false },
//         { isRead: true, readAt: new Date() }
//       );
//       successResponse(res, null, 'All notifications marked as read');
//     } else {
//       await Notification.findByIdAndUpdate(req.params.id, {
//         isRead: true,
//         readAt: new Date()
//       });
//       successResponse(res, null, 'Notification marked as read');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const getReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const user = await User.findById(req.user.id);

//     const progress = user.readingHistory.find(
//       h => h.contentType === contentType && h.contentId.toString() === contentId
//     );

//     successResponse(res, progress || { progress: 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId, progress } = req.body;

//     await User.findByIdAndUpdate(req.user.id, {
//       $pull: { readingHistory: { contentType, contentId } }
//     });

//     await User.findByIdAndUpdate(req.user.id, {
//       $push: {
//         readingHistory: {
//           contentType,
//           contentId,
//           progress,
//           lastRead: new Date()
//         }
//       }
//     });

//     successResponse(res, null, 'Progress updated');
//   } catch (error) {
//     next(error);
//   }
// };








// // server/controllers/user.controller.js
// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import Notification from '../models/Notification.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';
// import cloudinary from '../config/cloudinary.js';

// export const getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate('favorites.poems', 'title slug author genre')
//       .populate('favorites.books', 'title slug author coverImage')
//       .populate('favorites.audio', 'title slug author thumbnail')
//       .populate('favorites.videos', 'title slug author thumbnail')
//       .populate('following', 'name slug avatar');

//     successResponse(res, user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { name, bio, preferences } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, bio, preferences },
//       { new: true, runValidators: true }
//     );
//     successResponse(res, user, 'Profile updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePassword = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select('+password');
//     const isMatch = await user.comparePassword(req.body.currentPassword);

//     if (!isMatch) {
//       return errorResponse(res, 'Current password is incorrect', 400);
//     }

//     user.password = req.body.newPassword;
//     await user.save();
//     successResponse(res, null, 'Password updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const uploadAvatar = async (req, res, next) => {
//   try {
//     // Check if file exists (multer adds it to req.file)
//     const file = req.file;
    
//     if (!file) {
//       return errorResponse(res, 'Please upload an image file. Field name should be "avatar"', 400);
//     }

//     // Validate file type
//     const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    
//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       return errorResponse(res, 'Invalid file type. Please upload JPEG, PNG, WEBP, or GIF image', 400);
//     }

//     // Validate file size (max 2MB)
//     const maxSize = 2 * 1024 * 1024; // 2MB
    
//     if (file.size > maxSize) {
//       return errorResponse(res, 'File size too large. Maximum size is 2MB', 400);
//     }

//     // Prepare upload options for Cloudinary
//     const uploadOptions = {
//       folder: 'zauqapp/avatars',
//       width: 400,
//       height: 400,
//       crop: 'fill',
//       quality: 'auto:good',
//       gravity: 'face' // Focus on face if detected
//     };

//     let uploadResult;

//     // Upload to Cloudinary from buffer (memory storage)
//     try {
//       // Create a promise-based upload using buffer
//       uploadResult = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
//           if (error) {
//             console.error('Cloudinary upload error:', error);
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         });
        
//         // Write the buffer to the upload stream
//         uploadStream.end(file.buffer);
//       });
//     } catch (cloudinaryError) {
//       console.error('Cloudinary upload failed:', cloudinaryError);
//       return errorResponse(res, 'Failed to upload image to cloud storage. Please try again.', 500);
//     }

//     // Update user with new avatar URL
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatar: uploadResult.secure_url },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     // Return success response
//     successResponse(res, { 
//       avatar: user.avatar,
//       url: uploadResult.secure_url,
//       publicId: uploadResult.public_id
//     }, 'Avatar updated successfully');

//   } catch (error) {
//     console.error('Avatar upload error:', error);
    
//     // Handle specific errors
//     if (error.message && error.message.includes('Cloudinary')) {
//       return errorResponse(res, 'Image upload service error. Please try again later.', 500);
//     }
    
//     next(error);
//   }
// };

// export const getFavorites = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let favorites = [];
//     switch (type) {
//       case 'poems':
//         favorites = await Poem.find({ _id: { $in: user.favorites.poems } })
//           .populate('author', 'name slug');
//         break;
//       case 'books':
//         favorites = await Book.find({ _id: { $in: user.favorites.books } })
//           .populate('author', 'name slug');
//         break;
//       case 'audio':
//         favorites = await Audio.find({ _id: { $in: user.favorites.audio } })
//           .populate('author', 'name slug');
//         break;
//       case 'videos':
//         favorites = await Video.find({ _id: { $in: user.favorites.videos } })
//           .populate('author', 'name slug');
//         break;
//       default:
//         favorites = {
//           poems: await Poem.find({ _id: { $in: user.favorites.poems } }).populate('author', 'name slug'),
//           books: await Book.find({ _id: { $in: user.favorites.books } }).populate('author', 'name slug'),
//           audio: await Audio.find({ _id: { $in: user.favorites.audio } }).populate('author', 'name slug'),
//           videos: await Video.find({ _id: { $in: user.favorites.videos } }).populate('author', 'name slug')
//         };
//     }

//     successResponse(res, favorites);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addToFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.body;
//     const user = await User.findById(req.user.id);

//     const validTypes = ['poems', 'books', 'audio', 'videos'];
//     if (!validTypes.includes(type)) {
//       return errorResponse(res, 'Invalid content type', 400);
//     }

//     if (!user.favorites[type].includes(id)) {
//       user.favorites[type].push(id);
//       await user.save();
//     }

//     successResponse(res, null, 'Added to favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeFromFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.params;
//     const user = await User.findById(req.user.id);

//     user.favorites[type] = user.favorites[type].filter(item => item.toString() !== id);
//     await user.save();

//     successResponse(res, null, 'Removed from favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHistory = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let history = user.readingHistory;
//     if (type) {
//       history = history.filter(h => h.contentType === type);
//     }

//     // Sort by lastRead descending
//     history.sort((a, b) => b.lastRead - a.lastRead);

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDownloads = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     successResponse(res, user.downloads);
//   } catch (error) {
//     next(error);
//   }
// };

// export const followAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const authorId = req.params.authorId;

//     if (!user.following.includes(authorId)) {
//       user.following.push(authorId);
//       await user.save();
//     }

//     successResponse(res, null, 'Author followed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const unfollowAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     user.following = user.following.filter(id => id.toString() !== req.params.authorId);
//     await user.save();
//     successResponse(res, null, 'Author unfollowed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const notifications = await Notification.find({ recipient: req.user.id })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Notification.countDocuments({ recipient: req.user.id });

//     paginatedResponse(res, notifications, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markNotificationRead = async (req, res, next) => {
//   try {
//     if (req.params.id === 'read-all') {
//       await Notification.updateMany(
//         { recipient: req.user.id, isRead: false },
//         { isRead: true, readAt: new Date() }
//       );
//       successResponse(res, null, 'All notifications marked as read');
//     } else {
//       await Notification.findByIdAndUpdate(req.params.id, {
//         isRead: true,
//         readAt: new Date()
//       });
//       successResponse(res, null, 'Notification marked as read');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const getReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const user = await User.findById(req.user.id);

//     const progress = user.readingHistory.find(
//       h => h.contentType === contentType && h.contentId.toString() === contentId
//     );

//     successResponse(res, progress || { progress: 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId, progress } = req.body;

//     // Remove existing progress entry
//     await User.findByIdAndUpdate(req.user.id, {
//       $pull: { readingHistory: { contentType, contentId } }
//     });

//     // Add new progress entry
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: {
//         readingHistory: {
//           contentType,
//           contentId,
//           progress,
//           lastRead: new Date()
//         }
//       }
//     });

//     successResponse(res, null, 'Progress updated');
//   } catch (error) {
//     next(error);
//   }
// };



















// // server/controllers/user.controller.js
// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import Notification from '../models/Notification.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';
// import cloudinary from '../config/cloudinary.js';

// export const getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate('favorites.poems', 'title slug author genre')
//       .populate('favorites.books', 'title slug author coverImage')
//       .populate('favorites.audio', 'title slug author thumbnail')
//       .populate('favorites.videos', 'title slug author thumbnail')
//       .populate('following', 'name slug avatar');

//     successResponse(res, user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { name, bio, preferences } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, bio, preferences },
//       { new: true, runValidators: true }
//     );
//     successResponse(res, user, 'Profile updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePassword = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select('+password');
//     const isMatch = await user.comparePassword(req.body.currentPassword);

//     if (!isMatch) {
//       return errorResponse(res, 'Current password is incorrect', 400);
//     }

//     user.password = req.body.newPassword;
//     await user.save();
//     successResponse(res, null, 'Password updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const uploadAvatar = async (req, res, next) => {
//   try {
//     // Check if file exists (multer adds it to req.file)
//     const file = req.file;
    
//     if (!file) {
//       return errorResponse(res, 'Please upload an image file. Field name should be "avatar"', 400);
//     }

//     // Validate file type
//     const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    
//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       return errorResponse(res, 'Invalid file type. Please upload JPEG, PNG, WEBP, or GIF image', 400);
//     }

//     // Validate file size (max 2MB)
//     const maxSize = 2 * 1024 * 1024; // 2MB
    
//     if (file.size > maxSize) {
//       return errorResponse(res, 'File size too large. Maximum size is 2MB', 400);
//     }

//     // Prepare upload options for Cloudinary
//     const uploadOptions = {
//       folder: 'zauqapp/avatars',
//       width: 400,
//       height: 400,
//       crop: 'fill',
//       quality: 'auto:good',
//       gravity: 'face' // Focus on face if detected
//     };

//     let uploadResult;

//     // Upload to Cloudinary from buffer (memory storage)
//     try {
//       // Create a promise-based upload using buffer
//       uploadResult = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
//           if (error) {
//             console.error('Cloudinary upload error:', error);
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         });
        
//         // Write the buffer to the upload stream
//         uploadStream.end(file.buffer);
//       });
//     } catch (cloudinaryError) {
//       console.error('Cloudinary upload failed:', cloudinaryError);
//       return errorResponse(res, 'Failed to upload image to cloud storage. Please try again.', 500);
//     }

//     // Update user with new avatar URL
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatar: uploadResult.secure_url },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     // Return success response
//     successResponse(res, { 
//       avatar: user.avatar,
//       url: uploadResult.secure_url,
//       publicId: uploadResult.public_id
//     }, 'Avatar updated successfully');

//   } catch (error) {
//     console.error('Avatar upload error:', error);
    
//     // Handle specific errors
//     if (error.message && error.message.includes('Cloudinary')) {
//       return errorResponse(res, 'Image upload service error. Please try again later.', 500);
//     }
    
//     next(error);
//   }
// };

// export const getFavorites = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let favorites = [];
//     switch (type) {
//       case 'poems':
//         favorites = await Poem.find({ _id: { $in: user.favorites.poems } })
//           .populate('author', 'name slug');
//         break;
//       case 'books':
//         favorites = await Book.find({ _id: { $in: user.favorites.books } })
//           .populate('author', 'name slug');
//         break;
//       case 'audio':
//         favorites = await Audio.find({ _id: { $in: user.favorites.audio } })
//           .populate('author', 'name slug');
//         break;
//       case 'videos':
//         favorites = await Video.find({ _id: { $in: user.favorites.videos } })
//           .populate('author', 'name slug');
//         break;
//       default:
//         favorites = {
//           poems: await Poem.find({ _id: { $in: user.favorites.poems } }).populate('author', 'name slug'),
//           books: await Book.find({ _id: { $in: user.favorites.books } }).populate('author', 'name slug'),
//           audio: await Audio.find({ _id: { $in: user.favorites.audio } }).populate('author', 'name slug'),
//           videos: await Video.find({ _id: { $in: user.favorites.videos } }).populate('author', 'name slug')
//         };
//     }

//     successResponse(res, favorites);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addToFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.body;
//     const user = await User.findById(req.user.id);

//     const validTypes = ['poems', 'books', 'audio', 'videos'];
//     if (!validTypes.includes(type)) {
//       return errorResponse(res, 'Invalid content type', 400);
//     }

//     if (!user.favorites[type].includes(id)) {
//       user.favorites[type].push(id);
//       await user.save();
//     }

//     successResponse(res, null, 'Added to favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeFromFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.params;
//     const user = await User.findById(req.user.id);

//     user.favorites[type] = user.favorites[type].filter(item => item.toString() !== id);
//     await user.save();

//     successResponse(res, null, 'Removed from favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHistory = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let history = user.readingHistory;
//     if (type) {
//       history = history.filter(h => h.contentType === type);
//     }

//     // Sort by lastRead descending
//     history.sort((a, b) => b.lastRead - a.lastRead);

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDownloads = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);
    
//     let downloads = user.downloads;
    
//     // Filter by type if provided
//     if (type && type !== 'all') {
//       downloads = downloads.filter(d => d.contentType === type);
//     }
    
//     // Sort by downloadedAt descending (most recent first)
//     downloads.sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt));
    
//     successResponse(res, downloads);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // DOWNLOADS MANAGEMENT - COMPLETE CRUD
// // ============================================

// // Get download by ID
// export const getDownloadById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const user = await User.findById(userId);
//     const download = user.downloads.find(d => d._id.toString() === id);
    
//     if (!download) {
//       return errorResponse(res, 'Download not found', 404);
//     }
    
//     // Optionally populate content details
//     let ContentModel;
//     switch (download.contentType) {
//       case 'book':
//         ContentModel = Book;
//         break;
//       case 'poem':
//         ContentModel = Poem;
//         break;
//       case 'audio':
//         ContentModel = Audio;
//         break;
//       case 'video':
//         ContentModel = Video;
//         break;
//       default:
//         return successResponse(res, download);
//     }
    
//     const content = await ContentModel.findById(download.contentId)
//       .select('title slug coverImage author');
    
//     successResponse(res, {
//       ...download.toObject(),
//       content
//     });
//   } catch (error) {
//     console.error('Error in getDownloadById:', error);
//     next(error);
//   }
// };

// // Download a file (get actual file or download link)
// export const downloadFile = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const userId = req.user.id;
    
//     // Validate content type
//     const validTypes = ['book', 'poem', 'audio', 'video'];
//     if (!validTypes.includes(contentType)) {
//       return errorResponse(res, 'Invalid content type', 400);
//     }
    
//     // Import models dynamically or add to imports
//     let ContentModel;
//     switch (contentType) {
//       case 'book':
//         ContentModel = Book;
//         break;
//       case 'poem':
//         ContentModel = Poem;
//         break;
//       case 'audio':
//         ContentModel = Audio;
//         break;
//       case 'video':
//         ContentModel = Video;
//         break;
//       default:
//         return errorResponse(res, 'Invalid content type', 400);
//     }
    
//     // Find the content
//     const content = await ContentModel.findById(contentId);
//     if (!content) {
//       return errorResponse(res, 'Content not found', 404);
//     }
    
//     // Check if premium content requires subscription
//     if (content.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required to download', 403);
//     }
    
//     // Get download URL (pdfUrl, epubUrl, or fileUrl)
//     let downloadUrl;
//     let title;
//     let fileType;
    
//     if (contentType === 'book') {
//       downloadUrl = content.pdfUrl || content.epubUrl;
//       title = content.title;
//       fileType = content.pdfUrl ? 'PDF' : 'EPUB';
//     } else if (contentType === 'poem') {
//       downloadUrl = content.fileUrl || content.content;
//       title = content.title;
//       fileType = 'PDF';
//     } else if (contentType === 'audio') {
//       downloadUrl = content.audioUrl || content.fileUrl;
//       title = content.title;
//       fileType = 'AUDIO';
//     } else {
//       downloadUrl = content.videoUrl || content.fileUrl;
//       title = content.title;
//       fileType = 'VIDEO';
//     }
    
//     if (!downloadUrl) {
//       return errorResponse(res, 'Download not available for this content', 404);
//     }
    
//     // Add to user's downloads if not already there
//     const user = await User.findById(userId);
//     const alreadyDownloaded = user.downloads.some(
//       d => d.contentId.toString() === contentId && d.contentType === contentType
//     );
    
//     if (!alreadyDownloaded) {
//       user.downloads.push({
//         contentType,
//         contentId,
//         title: title,
//         downloadedAt: new Date()
//       });
//       await user.save();
//     }
    
//     // Increment download stats on content
//     if (content.stats) {
//       content.stats.downloads = (content.stats.downloads || 0) + 1;
//       await content.save();
//     }
    
//     successResponse(res, {
//       downloadUrl,
//       title,
//       contentType,
//       contentId,
//       fileType
//     }, 'Download ready');
    
//   } catch (error) {
//     console.error('Error in downloadFile:', error);
//     next(error);
//   }
// };

// // Check if content is already downloaded
// export const checkIsDownloaded = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const userId = req.user.id;
    
//     const user = await User.findById(userId);
//     const isDownloaded = user.downloads.some(
//       d => d.contentId.toString() === contentId && d.contentType === contentType
//     );
    
//     successResponse(res, { isDownloaded });
//   } catch (error) {
//     console.error('Error in checkIsDownloaded:', error);
//     next(error);
//   }
// };

// // Remove a single download
// export const removeDownload = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const user = await User.findById(userId);
//     const downloadIndex = user.downloads.findIndex(d => d._id.toString() === id);
    
//     if (downloadIndex === -1) {
//       return errorResponse(res, 'Download not found', 404);
//     }
    
//     user.downloads.splice(downloadIndex, 1);
//     await user.save();
    
//     successResponse(res, null, 'Download removed successfully');
//   } catch (error) {
//     console.error('Error in removeDownload:', error);
//     next(error);
//   }
// };

// // Clear all downloads
// export const clearAllDownloads = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
    
//     await User.findByIdAndUpdate(userId, {
//       $set: { downloads: [] }
//     });
    
//     successResponse(res, null, 'All downloads cleared');
//   } catch (error) {
//     console.error('Error in clearAllDownloads:', error);
//     next(error);
//   }
// };

// // Bulk remove downloads
// export const bulkRemoveDownloads = async (req, res, next) => {
//   try {
//     const { ids } = req.body;
//     const userId = req.user.id;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return errorResponse(res, 'No download IDs provided', 400);
//     }
    
//     const user = await User.findById(userId);
//     user.downloads = user.downloads.filter(d => !ids.includes(d._id.toString()));
//     await user.save();
    
//     successResponse(res, null, `${ids.length} downloads removed`);
//   } catch (error) {
//     console.error('Error in bulkRemoveDownloads:', error);
//     next(error);
//   }
// };

// // Get download statistics
// export const getDownloadStats = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
    
//     const stats = {
//       total: user.downloads.length,
//       byType: {
//         books: user.downloads.filter(d => d.contentType === 'book').length,
//         poems: user.downloads.filter(d => d.contentType === 'poem').length,
//         audio: user.downloads.filter(d => d.contentType === 'audio').length,
//         videos: user.downloads.filter(d => d.contentType === 'video').length
//       },
//       recent: user.downloads
//         .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt))
//         .slice(0, 10)
//         .map(d => ({
//           id: d._id,
//           contentType: d.contentType,
//           contentId: d.contentId,
//           title: d.title,
//           downloadedAt: d.downloadedAt
//         }))
//     };
    
//     successResponse(res, stats);
//   } catch (error) {
//     console.error('Error in getDownloadStats:', error);
//     next(error);
//   }
// };

// export const followAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const authorId = req.params.authorId;

//     if (!user.following.includes(authorId)) {
//       user.following.push(authorId);
//       await user.save();
//     }

//     successResponse(res, null, 'Author followed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const unfollowAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     user.following = user.following.filter(id => id.toString() !== req.params.authorId);
//     await user.save();
//     successResponse(res, null, 'Author unfollowed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const notifications = await Notification.find({ recipient: req.user.id })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Notification.countDocuments({ recipient: req.user.id });

//     paginatedResponse(res, notifications, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markNotificationRead = async (req, res, next) => {
//   try {
//     if (req.params.id === 'read-all') {
//       await Notification.updateMany(
//         { recipient: req.user.id, isRead: false },
//         { isRead: true, readAt: new Date() }
//       );
//       successResponse(res, null, 'All notifications marked as read');
//     } else {
//       await Notification.findByIdAndUpdate(req.params.id, {
//         isRead: true,
//         readAt: new Date()
//       });
//       successResponse(res, null, 'Notification marked as read');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const getReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const user = await User.findById(req.user.id);

//     const progress = user.readingHistory.find(
//       h => h.contentType === contentType && h.contentId.toString() === contentId
//     );

//     successResponse(res, progress || { progress: 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId, progress } = req.body;

//     // Remove existing progress entry
//     await User.findByIdAndUpdate(req.user.id, {
//       $pull: { readingHistory: { contentType, contentId } }
//     });

//     // Add new progress entry
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: {
//         readingHistory: {
//           contentType,
//           contentId,
//           progress,
//           lastRead: new Date()
//         }
//       }
//     });

//     successResponse(res, null, 'Progress updated');
//   } catch (error) {
//     next(error);
//   }
// };



















// // server/controllers/user.controller.js
// import User from '../models/User.js';
// import Poem from '../models/Poem.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import Notification from '../models/Notification.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination } from '../utils/pagination.js';
// import cloudinary from '../config/cloudinary.js';

// export const getProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id)
//       .populate('favorites.poems', 'title slug author genre')
//       .populate('favorites.books', 'title slug author coverImage')
//       .populate('favorites.audio', 'title slug author thumbnail')
//       .populate('favorites.videos', 'title slug author thumbnail')
//       .populate('following', 'name slug avatar');

//     successResponse(res, user);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateProfile = async (req, res, next) => {
//   try {
//     const { name, bio, preferences } = req.body;
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { name, bio, preferences },
//       { new: true, runValidators: true }
//     );
//     successResponse(res, user, 'Profile updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updatePassword = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id).select('+password');
//     const isMatch = await user.comparePassword(req.body.currentPassword);

//     if (!isMatch) {
//       return errorResponse(res, 'Current password is incorrect', 400);
//     }

//     user.password = req.body.newPassword;
//     await user.save();
//     successResponse(res, null, 'Password updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const uploadAvatar = async (req, res, next) => {
//   try {
//     // Check if file exists (multer adds it to req.file)
//     const file = req.file;
    
//     if (!file) {
//       return errorResponse(res, 'Please upload an image file. Field name should be "avatar"', 400);
//     }

//     // Validate file type
//     const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    
//     if (!allowedMimeTypes.includes(file.mimetype)) {
//       return errorResponse(res, 'Invalid file type. Please upload JPEG, PNG, WEBP, or GIF image', 400);
//     }

//     // Validate file size (max 2MB)
//     const maxSize = 2 * 1024 * 1024; // 2MB
    
//     if (file.size > maxSize) {
//       return errorResponse(res, 'File size too large. Maximum size is 2MB', 400);
//     }

//     // Prepare upload options for Cloudinary
//     const uploadOptions = {
//       folder: 'zauqapp/avatars',
//       width: 400,
//       height: 400,
//       crop: 'fill',
//       quality: 'auto:good',
//       gravity: 'face' // Focus on face if detected
//     };

//     let uploadResult;

//     // Upload to Cloudinary from buffer (memory storage)
//     try {
//       // Create a promise-based upload using buffer
//       uploadResult = await new Promise((resolve, reject) => {
//         const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
//           if (error) {
//             console.error('Cloudinary upload error:', error);
//             reject(error);
//           } else {
//             resolve(result);
//           }
//         });
        
//         // Write the buffer to the upload stream
//         uploadStream.end(file.buffer);
//       });
//     } catch (cloudinaryError) {
//       console.error('Cloudinary upload failed:', cloudinaryError);
//       return errorResponse(res, 'Failed to upload image to cloud storage. Please try again.', 500);
//     }

//     // Update user with new avatar URL
//     const user = await User.findByIdAndUpdate(
//       req.user.id,
//       { avatar: uploadResult.secure_url },
//       { new: true, runValidators: true }
//     ).select('-password');

//     if (!user) {
//       return errorResponse(res, 'User not found', 404);
//     }

//     // Return success response
//     successResponse(res, { 
//       avatar: user.avatar,
//       url: uploadResult.secure_url,
//       publicId: uploadResult.public_id
//     }, 'Avatar updated successfully');

//   } catch (error) {
//     console.error('Avatar upload error:', error);
    
//     // Handle specific errors
//     if (error.message && error.message.includes('Cloudinary')) {
//       return errorResponse(res, 'Image upload service error. Please try again later.', 500);
//     }
    
//     next(error);
//   }
// };

// export const getFavorites = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let favorites = [];
//     switch (type) {
//       case 'poems':
//         favorites = await Poem.find({ _id: { $in: user.favorites.poems } })
//           .populate('author', 'name slug');
//         break;
//       case 'books':
//         favorites = await Book.find({ _id: { $in: user.favorites.books } })
//           .populate('author', 'name slug');
//         break;
//       case 'audio':
//         favorites = await Audio.find({ _id: { $in: user.favorites.audio } })
//           .populate('author', 'name slug');
//         break;
//       case 'videos':
//         favorites = await Video.find({ _id: { $in: user.favorites.videos } })
//           .populate('author', 'name slug');
//         break;
//       default:
//         favorites = {
//           poems: await Poem.find({ _id: { $in: user.favorites.poems } }).populate('author', 'name slug'),
//           books: await Book.find({ _id: { $in: user.favorites.books } }).populate('author', 'name slug'),
//           audio: await Audio.find({ _id: { $in: user.favorites.audio } }).populate('author', 'name slug'),
//           videos: await Video.find({ _id: { $in: user.favorites.videos } }).populate('author', 'name slug')
//         };
//     }

//     successResponse(res, favorites);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addToFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.body;
//     const user = await User.findById(req.user.id);

//     const validTypes = ['poems', 'books', 'audio', 'videos'];
//     if (!validTypes.includes(type)) {
//       return errorResponse(res, 'Invalid content type', 400);
//     }

//     if (!user.favorites[type].includes(id)) {
//       user.favorites[type].push(id);
//       await user.save();
//     }

//     successResponse(res, null, 'Added to favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeFromFavorites = async (req, res, next) => {
//   try {
//     const { type, id } = req.params;
//     const user = await User.findById(req.user.id);

//     user.favorites[type] = user.favorites[type].filter(item => item.toString() !== id);
//     await user.save();

//     successResponse(res, null, 'Removed from favorites');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHistory = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);

//     let history = user.readingHistory;
//     if (type) {
//       history = history.filter(h => h.contentType === type);
//     }

//     // Sort by lastRead descending
//     history.sort((a, b) => b.lastRead - a.lastRead);

//     successResponse(res, history);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDownloads = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     const user = await User.findById(req.user.id);
    
//     let downloads = user.downloads;
    
//     // Filter by type if provided
//     if (type && type !== 'all') {
//       downloads = downloads.filter(d => d.contentType === type);
//     }
    
//     // Sort by downloadedAt descending (most recent first)
//     downloads.sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt));
    
//     successResponse(res, downloads);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============================================
// // DOWNLOADS MANAGEMENT - COMPLETE CRUD
// // ============================================

// // Get download by ID
// export const getDownloadById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const user = await User.findById(userId);
//     const download = user.downloads.find(d => d._id.toString() === id);
    
//     if (!download) {
//       return errorResponse(res, 'Download not found', 404);
//     }
    
//     // Return download with content populated
//     let ContentModel;
//     switch (download.contentType) {
//       case 'book':
//         ContentModel = Book;
//         break;
//       case 'poem':
//         ContentModel = Poem;
//         break;
//       case 'audio':
//         ContentModel = Audio;
//         break;
//       case 'video':
//         ContentModel = Video;
//         break;
//       default:
//         return successResponse(res, download);
//     }
    
//     const content = await ContentModel.findById(download.contentId)
//       .select('title slug coverImage author description');
    
//     successResponse(res, {
//       id: download._id,
//       contentType: download.contentType,
//       contentId: download.contentId,
//       title: download.title || (content ? content.title : 'Unknown'),
//       downloadedAt: download.downloadedAt,
//       content
//     });
//   } catch (error) {
//     console.error('Error in getDownloadById:', error);
//     next(error);
//   }
// };

// // Download a file (get actual file or download link)
// export const downloadFile = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const userId = req.user.id;
    
//     // Validate content type
//     const validTypes = ['book', 'poem', 'audio', 'video'];
//     if (!validTypes.includes(contentType)) {
//       return errorResponse(res, 'Invalid content type', 400);
//     }
    
//     // Select content model based on type
//     let ContentModel;
//     switch (contentType) {
//       case 'book':
//         ContentModel = Book;
//         break;
//       case 'poem':
//         ContentModel = Poem;
//         break;
//       case 'audio':
//         ContentModel = Audio;
//         break;
//       case 'video':
//         ContentModel = Video;
//         break;
//       default:
//         return errorResponse(res, 'Invalid content type', 400);
//     }
    
//     // Find the content
//     const content = await ContentModel.findById(contentId);
//     if (!content) {
//       return errorResponse(res, 'Content not found', 404);
//     }
    
//     // Check if premium content requires subscription
//     if (content.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required to download', 403);
//     }
    
//     // Get download URL and metadata
//     let downloadUrl;
//     let title = content.title;
//     let fileType;
    
//     if (contentType === 'book') {
//       downloadUrl = content.pdfUrl || content.epubUrl;
//       fileType = content.pdfUrl ? 'PDF' : 'EPUB';
//     } else if (contentType === 'poem') {
//       downloadUrl = content.fileUrl || content.content;
//       fileType = 'PDF';
//     } else if (contentType === 'audio') {
//       downloadUrl = content.audioUrl || content.fileUrl;
//       fileType = 'AUDIO';
//     } else {
//       downloadUrl = content.videoUrl || content.fileUrl;
//       fileType = 'VIDEO';
//     }
    
//     if (!downloadUrl) {
//       return errorResponse(res, 'Download not available for this content', 404);
//     }
    
//     // Add to user's downloads if not already there
//     const user = await User.findById(userId);
//     const alreadyDownloaded = user.downloads.some(
//       d => d.contentId.toString() === contentId && d.contentType === contentType
//     );
    
//     if (!alreadyDownloaded) {
//       user.downloads.push({
//         contentType,
//         contentId,
//         title: title, // Store title for quick access
//         downloadedAt: new Date()
//       });
//       await user.save();
//     }
    
//     // Increment download stats on content
//     if (content.stats) {
//       content.stats.downloads = (content.stats.downloads || 0) + 1;
//       await content.save();
//     }
    
//     successResponse(res, {
//       downloadUrl,
//       title,
//       contentType,
//       contentId,
//       fileType,
//       alreadyOwned: alreadyDownloaded
//     }, 'Download ready');
    
//   } catch (error) {
//     console.error('Error in downloadFile:', error);
//     next(error);
//   }
// };

// // Check if content is already downloaded
// export const checkIsDownloaded = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const userId = req.user.id;
    
//     const user = await User.findById(userId);
//     const isDownloaded = user.downloads.some(
//       d => d.contentId.toString() === contentId && d.contentType === contentType
//     );
    
//     const download = isDownloaded ? user.downloads.find(
//       d => d.contentId.toString() === contentId && d.contentType === contentType
//     ) : null;
    
//     successResponse(res, { 
//       isDownloaded,
//       downloadId: download ? download._id : null,
//       downloadedAt: download ? download.downloadedAt : null
//     });
//   } catch (error) {
//     console.error('Error in checkIsDownloaded:', error);
//     next(error);
//   }
// };

// // Remove a single download
// export const removeDownload = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const user = await User.findById(userId);
//     const downloadIndex = user.downloads.findIndex(d => d._id.toString() === id);
    
//     if (downloadIndex === -1) {
//       return errorResponse(res, 'Download not found', 404);
//     }
    
//     const removed = user.downloads[downloadIndex];
//     user.downloads.splice(downloadIndex, 1);
//     await user.save();
    
//     successResponse(res, { 
//       removed: {
//         id: removed._id,
//         title: removed.title,
//         contentType: removed.contentType
//       }
//     }, 'Download removed successfully');
//   } catch (error) {
//     console.error('Error in removeDownload:', error);
//     next(error);
//   }
// };

// // Clear all downloads
// export const clearAllDownloads = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
//     const count = user.downloads.length;
    
//     await User.findByIdAndUpdate(userId, {
//       $set: { downloads: [] }
//     });
    
//     successResponse(res, { clearedCount: count }, 'All downloads cleared');
//   } catch (error) {
//     console.error('Error in clearAllDownloads:', error);
//     next(error);
//   }
// };

// // Bulk remove downloads
// export const bulkRemoveDownloads = async (req, res, next) => {
//   try {
//     const { ids } = req.body;
//     const userId = req.user.id;
    
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return errorResponse(res, 'No download IDs provided', 400);
//     }
    
//     const user = await User.findById(userId);
//     const removedCount = user.downloads.filter(d => ids.includes(d._id.toString())).length;
//     user.downloads = user.downloads.filter(d => !ids.includes(d._id.toString()));
//     await user.save();
    
//     successResponse(res, { removedCount }, `${removedCount} downloads removed`);
//   } catch (error) {
//     console.error('Error in bulkRemoveDownloads:', error);
//     next(error);
//   }
// };

// // Get download statistics
// export const getDownloadStats = async (req, res, next) => {
//   try {
//     const userId = req.user.id;
//     const user = await User.findById(userId);
    
//     const stats = {
//       total: user.downloads.length,
//       byType: {
//         books: user.downloads.filter(d => d.contentType === 'book').length,
//         poems: user.downloads.filter(d => d.contentType === 'poem').length,
//         audio: user.downloads.filter(d => d.contentType === 'audio').length,
//         videos: user.downloads.filter(d => d.contentType === 'video').length
//       },
//       recent: user.downloads
//         .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt))
//         .slice(0, 10)
//         .map(d => ({
//           id: d._id,
//           contentType: d.contentType,
//           contentId: d.contentId,
//           title: d.title,
//           downloadedAt: d.downloadedAt
//         }))
//     };
    
//     successResponse(res, stats);
//   } catch (error) {
//     console.error('Error in getDownloadStats:', error);
//     next(error);
//   }
// };

// export const followAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     const authorId = req.params.authorId;

//     if (!user.following.includes(authorId)) {
//       user.following.push(authorId);
//       await user.save();
//     }

//     successResponse(res, null, 'Author followed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const unfollowAuthor = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user.id);
//     user.following = user.following.filter(id => id.toString() !== req.params.authorId);
//     await user.save();
//     successResponse(res, null, 'Author unfollowed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getNotifications = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);

//     const notifications = await Notification.find({ recipient: req.user.id })
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Notification.countDocuments({ recipient: req.user.id });

//     paginatedResponse(res, notifications, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const markNotificationRead = async (req, res, next) => {
//   try {
//     if (req.params.id === 'read-all') {
//       await Notification.updateMany(
//         { recipient: req.user.id, isRead: false },
//         { isRead: true, readAt: new Date() }
//       );
//       successResponse(res, null, 'All notifications marked as read');
//     } else {
//       await Notification.findByIdAndUpdate(req.params.id, {
//         isRead: true,
//         readAt: new Date()
//       });
//       successResponse(res, null, 'Notification marked as read');
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// export const getReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId } = req.params;
//     const user = await User.findById(req.user.id);

//     const progress = user.readingHistory.find(
//       h => h.contentType === contentType && h.contentId.toString() === contentId
//     );

//     successResponse(res, progress || { progress: 0 });
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateReadingProgress = async (req, res, next) => {
//   try {
//     const { contentType, contentId, progress } = req.body;

//     // Remove existing progress entry
//     await User.findByIdAndUpdate(req.user.id, {
//       $pull: { readingHistory: { contentType, contentId } }
//     });

//     // Add new progress entry
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: {
//         readingHistory: {
//           contentType,
//           contentId,
//           progress,
//           lastRead: new Date()
//         }
//       }
//     });

//     successResponse(res, null, 'Progress updated');
//   } catch (error) {
//     next(error);
//   }
// };















// server/controllers/user.controller.js
import User from '../models/User.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import Notification from '../models/Notification.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination } from '../utils/pagination.js';
import cloudinary from '../config/cloudinary.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('favorites.poems', 'title slug author genre')
      .populate('favorites.books', 'title slug author coverImage')
      .populate('favorites.audio', 'title slug author thumbnail')
      .populate('favorites.videos', 'title slug author thumbnail')
      .populate('following', 'name slug avatar');

    successResponse(res, user);
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, bio, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, bio, preferences },
      { new: true, runValidators: true }
    );
    successResponse(res, user, 'Profile updated successfully');
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.comparePassword(req.body.currentPassword);

    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400);
    }

    user.password = req.body.newPassword;
    await user.save();
    successResponse(res, null, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};

export const uploadAvatar = async (req, res, next) => {
  try {
    // Check if file exists (multer adds it to req.file)
    const file = req.file;
    
    if (!file) {
      return errorResponse(res, 'Please upload an image file. Field name should be "avatar"', 400);
    }

    // Validate file type
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return errorResponse(res, 'Invalid file type. Please upload JPEG, PNG, WEBP, or GIF image', 400);
    }

    // Validate file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    
    if (file.size > maxSize) {
      return errorResponse(res, 'File size too large. Maximum size is 2MB', 400);
    }

    // Prepare upload options for Cloudinary
    const uploadOptions = {
      folder: 'zauqapp/avatars',
      width: 400,
      height: 400,
      crop: 'fill',
      quality: 'auto:good',
      gravity: 'face' // Focus on face if detected
    };

    let uploadResult;

    // Upload to Cloudinary from buffer (memory storage)
    try {
      // Create a promise-based upload using buffer
      uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            resolve(result);
          }
        });
        
        // Write the buffer to the upload stream
        uploadStream.end(file.buffer);
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary upload failed:', cloudinaryError);
      return errorResponse(res, 'Failed to upload image to cloud storage. Please try again.', 500);
    }

    // Update user with new avatar URL
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { avatar: uploadResult.secure_url },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Return success response
    successResponse(res, { 
      avatar: user.avatar,
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id
    }, 'Avatar updated successfully');

  } catch (error) {
    console.error('Avatar upload error:', error);
    
    // Handle specific errors
    if (error.message && error.message.includes('Cloudinary')) {
      return errorResponse(res, 'Image upload service error. Please try again later.', 500);
    }
    
    next(error);
  }
};

// ============================================
// FAVORITES MANAGEMENT - ENHANCED VERSION
// ============================================

export const getFavorites = async (req, res, next) => {
  try {
    const { type } = req.query;
    const user = await User.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    let favorites = [];
    
    switch (type) {
      case 'poems':
        favorites = await Poem.find({ _id: { $in: user.favorites.poems || [] } })
          .populate('author', 'name slug avatar')
          .lean();
        break;
        
      case 'books':
        favorites = await Book.find({ _id: { $in: user.favorites.books || [] } })
          .populate('author', 'name slug avatar')
          .lean();
        break;
        
      case 'audio':
        favorites = await Audio.find({ _id: { $in: user.favorites.audio || [] } })
          .populate('author', 'name slug avatar')
          .lean();
        break;
        
      case 'videos':
        favorites = await Video.find({ _id: { $in: user.favorites.videos || [] } })
          .populate('author', 'name slug avatar')
          .lean();
        break;
        
      default:
        // Return all favorites with proper structure
        favorites = {
          poems: await Poem.find({ _id: { $in: user.favorites.poems || [] } })
            .populate('author', 'name slug avatar')
            .lean(),
          books: await Book.find({ _id: { $in: user.favorites.books || [] } })
            .populate('author', 'name slug avatar')
            .lean(),
          audio: await Audio.find({ _id: { $in: user.favorites.audio || [] } })
            .populate('author', 'name slug avatar')
            .lean(),
          videos: await Video.find({ _id: { $in: user.favorites.videos || [] } })
            .populate('author', 'name slug avatar')
            .lean()
        };
        
        // Add counts to response
        favorites.counts = {
          poems: favorites.poems.length,
          books: favorites.books.length,
          audio: favorites.audio.length,
          videos: favorites.videos.length,
          total: favorites.poems.length + favorites.books.length + favorites.audio.length + favorites.videos.length
        };
    }

    successResponse(res, favorites);
  } catch (error) {
    console.error('Error in getFavorites:', error);
    next(error);
  }
};

export const addToFavorites = async (req, res, next) => {
  try {
    const { type, id } = req.body;
    
    if (!type || !id) {
      return errorResponse(res, 'Content type and ID are required', 400);
    }

    const validTypes = ['poems', 'books', 'audio', 'videos'];
    if (!validTypes.includes(type)) {
      return errorResponse(res, 'Invalid content type. Must be one of: poems, books, audio, videos', 400);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Verify content exists before adding to favorites
    let ContentModel;
    switch (type) {
      case 'poems': ContentModel = Poem; break;
      case 'books': ContentModel = Book; break;
      case 'audio': ContentModel = Audio; break;
      case 'videos': ContentModel = Video; break;
    }

    const contentExists = await ContentModel.findById(id);
    if (!contentExists) {
      return errorResponse(res, 'Content not found', 404);
    }

    if (!user.favorites[type].includes(id)) {
      user.favorites[type].push(id);
      await user.save();
      successResponse(res, { type, id, added: true }, 'Added to favorites');
    } else {
      successResponse(res, { type, id, added: false, alreadyExists: true }, 'Already in favorites');
    }
  } catch (error) {
    console.error('Error in addToFavorites:', error);
    next(error);
  }
};

export const removeFromFavorites = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    
    const validTypes = ['poems', 'books', 'audio', 'videos'];
    if (!validTypes.includes(type)) {
      return errorResponse(res, 'Invalid content type', 400);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    const wasRemoved = user.favorites[type].includes(id);
    user.favorites[type] = user.favorites[type].filter(item => item.toString() !== id);
    await user.save();

    successResponse(res, { type, id, removed: wasRemoved }, wasRemoved ? 'Removed from favorites' : 'Item was not in favorites');
  } catch (error) {
    console.error('Error in removeFromFavorites:', error);
    next(error);
  }
};

// ============================================
// FAVORITES MANAGEMENT - ADDITIONAL FUNCTIONS
// ============================================

// Check if content is favorited
export const checkIsFavorited = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    
    const validTypes = ['poems', 'books', 'audio', 'videos'];
    if (!validTypes.includes(type)) {
      return errorResponse(res, 'Invalid content type. Must be one of: poems, books, audio, videos', 400);
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    // Check if the favorites array exists and contains the id
    const favoritesArray = user.favorites[type] || [];
    const isFavorited = favoritesArray.some(item => item.toString() === id);
    
    // Get the favorite item details if exists
    let favoritedAt = null;
    if (isFavorited) {
      favoritedAt = new Date();
    }
    
    successResponse(res, { 
      isFavorited, 
      type, 
      id,
      favoritedAt
    });
  } catch (error) {
    console.error('Error in checkIsFavorited:', error);
    next(error);
  }
};

// Get favorites count by type
export const getFavoritesCount = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }

    const counts = {
      poems: user.favorites.poems?.length || 0,
      books: user.favorites.books?.length || 0,
      audio: user.favorites.audio?.length || 0,
      videos: user.favorites.videos?.length || 0,
      total: (user.favorites.poems?.length || 0) + 
             (user.favorites.books?.length || 0) + 
             (user.favorites.audio?.length || 0) + 
             (user.favorites.videos?.length || 0)
    };
    
    successResponse(res, counts);
  } catch (error) {
    console.error('Error in getFavoritesCount:', error);
    next(error);
  }
};

// Bulk check favorites (for multiple items at once)
export const bulkCheckFavorites = async (req, res, next) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return errorResponse(res, 'Invalid request. Expected items array with at least one item.', 400);
    }
    
    const user = await User.findById(req.user.id);
    if (!user) {
      return errorResponse(res, 'User not found', 404);
    }
    
    const validTypes = ['poems', 'books', 'audio', 'videos'];
    const results = items.map(item => {
      const { type, id } = item;
      
      // Validate type
      if (!validTypes.includes(type)) {
        return { 
          type, 
          id, 
          isFavorited: false, 
          error: `Invalid content type: ${type}. Must be one of: poems, books, audio, videos` 
        };
      }
      
      // Check if favorited
      const favoritesArray = user.favorites[type] || [];
      const isFavorited = favoritesArray.some(favId => favId.toString() === id);
      
      return { type, id, isFavorited };
    });
    
    successResponse(res, results, 'Bulk check completed successfully');
  } catch (error) {
    console.error('Error in bulkCheckFavorites:', error);
    next(error);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { type } = req.query;
    const user = await User.findById(req.user.id);

    let history = user.readingHistory || [];
    if (type) {
      history = history.filter(h => h.contentType === type);
    }

    // Sort by lastRead descending
    history.sort((a, b) => b.lastRead - a.lastRead);

    successResponse(res, history);
  } catch (error) {
    next(error);
  }
};

export const getDownloads = async (req, res, next) => {
  try {
    const { type } = req.query;
    const user = await User.findById(req.user.id);
    
    let downloads = user.downloads || [];
    
    // Filter by type if provided
    if (type && type !== 'all') {
      downloads = downloads.filter(d => d.contentType === type);
    }
    
    // Sort by downloadedAt descending (most recent first)
    downloads.sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt));
    
    successResponse(res, downloads);
  } catch (error) {
    next(error);
  }
};

// ============================================
// DOWNLOADS MANAGEMENT - COMPLETE CRUD
// ============================================

// Get download by ID
export const getDownloadById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    const download = user.downloads.find(d => d._id.toString() === id);
    
    if (!download) {
      return errorResponse(res, 'Download not found', 404);
    }
    
    // Return download with content populated
    let ContentModel;
    switch (download.contentType) {
      case 'book':
        ContentModel = Book;
        break;
      case 'poem':
        ContentModel = Poem;
        break;
      case 'audio':
        ContentModel = Audio;
        break;
      case 'video':
        ContentModel = Video;
        break;
      default:
        return successResponse(res, download);
    }
    
    const content = await ContentModel.findById(download.contentId)
      .select('title slug coverImage author description');
    
    successResponse(res, {
      id: download._id,
      contentType: download.contentType,
      contentId: download.contentId,
      title: download.title || (content ? content.title : 'Unknown'),
      downloadedAt: download.downloadedAt,
      content
    });
  } catch (error) {
    console.error('Error in getDownloadById:', error);
    next(error);
  }
};

// Download a file (get actual file or download link)
export const downloadFile = async (req, res, next) => {
  try {
    const { contentType, contentId } = req.params;
    const userId = req.user.id;
    
    // Validate content type
    const validTypes = ['book', 'poem', 'audio', 'video'];
    if (!validTypes.includes(contentType)) {
      return errorResponse(res, 'Invalid content type', 400);
    }
    
    // Select content model based on type
    let ContentModel;
    switch (contentType) {
      case 'book':
        ContentModel = Book;
        break;
      case 'poem':
        ContentModel = Poem;
        break;
      case 'audio':
        ContentModel = Audio;
        break;
      case 'video':
        ContentModel = Video;
        break;
      default:
        return errorResponse(res, 'Invalid content type', 400);
    }
    
    // Find the content
    const content = await ContentModel.findById(contentId);
    if (!content) {
      return errorResponse(res, 'Content not found', 404);
    }
    
    // Check if premium content requires subscription
    if (content.isPremium && req.user?.subscription?.plan === 'free') {
      return errorResponse(res, 'Premium subscription required to download', 403);
    }
    
    // Get download URL and metadata
    let downloadUrl;
    let title = content.title;
    let fileType;
    
    if (contentType === 'book') {
      downloadUrl = content.pdfUrl || content.epubUrl;
      fileType = content.pdfUrl ? 'PDF' : 'EPUB';
    } else if (contentType === 'poem') {
      downloadUrl = content.fileUrl || content.content;
      fileType = 'PDF';
    } else if (contentType === 'audio') {
      downloadUrl = content.audioUrl || content.fileUrl;
      fileType = 'AUDIO';
    } else {
      downloadUrl = content.videoUrl || content.fileUrl;
      fileType = 'VIDEO';
    }
    
    if (!downloadUrl) {
      return errorResponse(res, 'Download not available for this content', 404);
    }
    
    // Add to user's downloads if not already there
    const user = await User.findById(userId);
    const alreadyDownloaded = user.downloads.some(
      d => d.contentId.toString() === contentId && d.contentType === contentType
    );
    
    if (!alreadyDownloaded) {
      user.downloads.push({
        contentType,
        contentId,
        title: title, // Store title for quick access
        slug: content.slug, // Store slug for books/poems
        downloadedAt: new Date()
      });
      await user.save();
    }
    
    // Increment download stats on content
    if (content.stats) {
      content.stats.downloads = (content.stats.downloads || 0) + 1;
      await content.save();
    }
    
    successResponse(res, {
      downloadUrl,
      title,
      contentType,
      contentId,
      slug: content.slug,
      fileType,
      alreadyOwned: alreadyDownloaded
    }, 'Download ready');
    
  } catch (error) {
    console.error('Error in downloadFile:', error);
    next(error);
  }
};

// Check if content is already downloaded
export const checkIsDownloaded = async (req, res, next) => {
  try {
    const { contentType, contentId } = req.params;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    const isDownloaded = user.downloads.some(
      d => d.contentId.toString() === contentId && d.contentType === contentType
    );
    
    const download = isDownloaded ? user.downloads.find(
      d => d.contentId.toString() === contentId && d.contentType === contentType
    ) : null;
    
    successResponse(res, { 
      isDownloaded,
      downloadId: download ? download._id : null,
      downloadedAt: download ? download.downloadedAt : null,
      slug: download ? download.slug : null
    });
  } catch (error) {
    console.error('Error in checkIsDownloaded:', error);
    next(error);
  }
};

// Remove a single download
export const removeDownload = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const user = await User.findById(userId);
    const downloadIndex = user.downloads.findIndex(d => d._id.toString() === id);
    
    if (downloadIndex === -1) {
      return errorResponse(res, 'Download not found', 404);
    }
    
    const removed = user.downloads[downloadIndex];
    user.downloads.splice(downloadIndex, 1);
    await user.save();
    
    successResponse(res, { 
      removed: {
        id: removed._id,
        title: removed.title,
        contentType: removed.contentType
      }
    }, 'Download removed successfully');
  } catch (error) {
    console.error('Error in removeDownload:', error);
    next(error);
  }
};

// Clear all downloads
export const clearAllDownloads = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    const count = user.downloads.length;
    
    await User.findByIdAndUpdate(userId, {
      $set: { downloads: [] }
    });
    
    successResponse(res, { clearedCount: count }, 'All downloads cleared');
  } catch (error) {
    console.error('Error in clearAllDownloads:', error);
    next(error);
  }
};

// Bulk remove downloads
export const bulkRemoveDownloads = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const userId = req.user.id;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return errorResponse(res, 'No download IDs provided', 400);
    }
    
    const user = await User.findById(userId);
    const removedCount = user.downloads.filter(d => ids.includes(d._id.toString())).length;
    user.downloads = user.downloads.filter(d => !ids.includes(d._id.toString()));
    await user.save();
    
    successResponse(res, { removedCount }, `${removedCount} downloads removed`);
  } catch (error) {
    console.error('Error in bulkRemoveDownloads:', error);
    next(error);
  }
};

// Get download statistics
export const getDownloadStats = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    
    const stats = {
      total: user.downloads.length,
      byType: {
        books: user.downloads.filter(d => d.contentType === 'book').length,
        poems: user.downloads.filter(d => d.contentType === 'poem').length,
        audio: user.downloads.filter(d => d.contentType === 'audio').length,
        videos: user.downloads.filter(d => d.contentType === 'video').length
      },
      recent: user.downloads
        .sort((a, b) => new Date(b.downloadedAt) - new Date(a.downloadedAt))
        .slice(0, 10)
        .map(d => ({
          id: d._id,
          contentType: d.contentType,
          contentId: d.contentId,
          title: d.title,
          slug: d.slug,
          downloadedAt: d.downloadedAt
        }))
    };
    
    successResponse(res, stats);
  } catch (error) {
    console.error('Error in getDownloadStats:', error);
    next(error);
  }
};

export const followAuthor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const authorId = req.params.authorId;

    if (!user.following.includes(authorId)) {
      user.following.push(authorId);
      await user.save();
    }

    successResponse(res, null, 'Author followed');
  } catch (error) {
    next(error);
  }
};

export const unfollowAuthor = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    user.following = user.following.filter(id => id.toString() !== req.params.authorId);
    await user.save();
    successResponse(res, null, 'Author unfollowed');
  } catch (error) {
    next(error);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);

    const notifications = await Notification.find({ recipient: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Notification.countDocuments({ recipient: req.user.id });

    paginatedResponse(res, notifications, { page, limit, total });
  } catch (error) {
    next(error);
  }
};

export const markNotificationRead = async (req, res, next) => {
  try {
    if (req.params.id === 'read-all') {
      await Notification.updateMany(
        { recipient: req.user.id, isRead: false },
        { isRead: true, readAt: new Date() }
      );
      successResponse(res, null, 'All notifications marked as read');
    } else {
      await Notification.findByIdAndUpdate(req.params.id, {
        isRead: true,
        readAt: new Date()
      });
      successResponse(res, null, 'Notification marked as read');
    }
  } catch (error) {
    next(error);
  }
};

export const getReadingProgress = async (req, res, next) => {
  try {
    const { contentType, contentId } = req.params;
    const user = await User.findById(req.user.id);

    const progress = user.readingHistory.find(
      h => h.contentType === contentType && h.contentId.toString() === contentId
    );

    successResponse(res, progress || { progress: 0 });
  } catch (error) {
    next(error);
  }
};

export const updateReadingProgress = async (req, res, next) => {
  try {
    const { contentType, contentId, progress } = req.body;

    // Remove existing progress entry
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { readingHistory: { contentType, contentId } }
    });

    // Add new progress entry
    await User.findByIdAndUpdate(req.user.id, {
      $push: {
        readingHistory: {
          contentType,
          contentId,
          progress,
          lastRead: new Date()
        }
      }
    });

    successResponse(res, null, 'Progress updated');
  } catch (error) {
    next(error);
  }
};