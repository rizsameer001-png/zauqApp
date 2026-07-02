// server/controllers/creator.audio.controller.js
import Audio from '../models/Audio.js';
import { successResponse, errorResponse } from '../utils/response.js';

/**
 * Upload audio as creator
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
      artist,
      album,
      duration
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
    
    // Parse tags if string
    let tagsArray = [];
    if (tags) {
      try {
        tagsArray = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch {
        tagsArray = typeof tags === 'string' ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
      }
    }
    
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
      publishedAt: status === 'published' ? new Date() : null
    });
    
    successResponse(res, audio, 'Audio uploaded successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Get creator's audio
 */
export const getCreatorAudio = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, search, type } = req.query;
    const userId = req.user.id;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const query = { createdBy: userId };
    
    if (status === 'published') {
      query.isPublished = true;
    } else if (status === 'draft') {
      query.isPublished = false;
    }
    
    if (type) {
      query.type = type;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [audio, total] = await Promise.all([
      Audio.find(query)
        .populate('author', 'name slug')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit)),
      Audio.countDocuments(query)
    ]);
    
    successResponse(res, {
      audio,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single audio by ID
 */
export const getCreatorAudioById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findOne({ _id: id, createdBy: userId })
      .populate('author', 'name slug');
    
    if (!audio) {
      return errorResponse(res, 'Audio not found', 404);
    }
    
    successResponse(res, audio);
  } catch (error) {
    next(error);
  }
};

/**
 * Update audio
 */
export const updateCreatorAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const updateData = { ...req.body };
    
    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.createdBy;
    delete updateData.stats;
    delete updateData.__v;
    
    // Handle file uploads
    if (req.files) {
      if (req.files.audio) {
        updateData.audioUrl = req.files.audio[0].path || req.files.audio[0].secure_url;
        updateData.audioCloudinaryId = req.files.audio[0].public_id;
        updateData.audioSize = req.files.audio[0].size;
        updateData.audioFormat = req.files.audio[0].mimetype;
      }
      if (req.files.coverImage) {
        updateData.coverImage = req.files.coverImage[0].path || req.files.coverImage[0].secure_url;
        updateData.coverCloudinaryId = req.files.coverImage[0].public_id;
      }
    }
    
    // Parse tags if string
    if (updateData.tags && typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch {
        updateData.tags = updateData.tags.split(',').map(t => t.trim()).filter(Boolean);
      }
    }
    
    // Handle boolean fields
    if (updateData.isPremium !== undefined) {
      updateData.isPremium = updateData.isPremium === 'true' || updateData.isPremium === true;
    }
    
    updateData.updatedAt = Date.now();
    
    const audio = await Audio.findOneAndUpdate(
      { _id: id, createdBy: userId },
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!audio) {
      return errorResponse(res, 'Audio not found or unauthorized', 404);
    }
    
    successResponse(res, audio, 'Audio updated successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Delete audio
 */
export const deleteCreatorAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findOneAndDelete({ _id: id, createdBy: userId });
    
    if (!audio) {
      return errorResponse(res, 'Audio not found or unauthorized', 404);
    }
    
    successResponse(res, null, 'Audio deleted successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Publish audio
 */
export const publishCreatorAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findOne({ _id: id, createdBy: userId });
    
    if (!audio) {
      return errorResponse(res, 'Audio not found or unauthorized', 404);
    }
    
    audio.isPublished = true;
    audio.publishedAt = new Date();
    audio.status = 'published';
    await audio.save();
    
    successResponse(res, audio, 'Audio published successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Unpublish audio
 */
export const unpublishCreatorAudio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const audio = await Audio.findOne({ _id: id, createdBy: userId });
    
    if (!audio) {
      return errorResponse(res, 'Audio not found or unauthorized', 404);
    }
    
    audio.isPublished = false;
    audio.status = 'draft';
    await audio.save();
    
    successResponse(res, audio, 'Audio unpublished successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * Bulk delete audio
 */
export const bulkDeleteCreatorAudio = async (req, res, next) => {
  try {
    const { ids } = req.body;
    const userId = req.user.id;
    
    if (!ids || !ids.length) {
      return errorResponse(res, 'No audio IDs provided', 400);
    }
    
    const result = await Audio.deleteMany({ _id: { $in: ids }, createdBy: userId });
    
    if (result.deletedCount === 0) {
      return errorResponse(res, 'No audio found to delete', 404);
    }
    
    successResponse(res, { 
      deletedCount: result.deletedCount,
      ids 
    }, `${result.deletedCount} audio(s) deleted successfully`);
  } catch (error) {
    next(error);
  }
};

/**
 * Get audio presets
 */
export const getCreatorAudioPresets = async (req, res, next) => {
  try {
    const presets = {
      types: ['Recitation', 'Naat', 'Hamd', 'Qawwali', 'Podcast', 'Interview', 'Lecture', 'Other'],
      occasions: ['Ramadan', 'Eid', 'Muharram', 'Milad', 'Wedding', 'Funeral', 'Other'],
      languages: ['urdu', 'hindi', 'english'],
      visibility: ['public', 'private', 'unlisted']
    };
    
    successResponse(res, presets);
  } catch (error) {
    next(error);
  }
};