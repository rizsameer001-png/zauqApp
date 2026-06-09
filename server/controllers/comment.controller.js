// server/controllers/comment.controller.js
import Comment from '../models/Comment.js';
import Poem from '../models/Poem.js';
import { successResponse, errorResponse } from '../utils/response.js';

// Get comments for a poem
export const getComments = async (req, res, next) => {
  try {
    const { poemId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const comments = await Comment.find({ 
      poem: poemId, 
      parentComment: null,
      status: 'active'
    })
      .populate('user', 'name email avatar')
      .populate({
        path: 'replies',
        match: { status: 'active' },
        populate: { path: 'user', select: 'name email avatar' }
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Comment.countDocuments({ poem: poemId, parentComment: null, status: 'active' });
    
    // Add liked status for current user
    if (req.user) {
      comments.forEach(comment => {
        comment._doc.isLiked = comment.likes.includes(req.user.id);
        if (comment.replies) {
          comment.replies.forEach(reply => {
            reply._doc.isLiked = reply.likes.includes(req.user.id);
          });
        }
      });
    }
    
    successResponse(res, {
      comments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in getComments:', error);
    next(error);
  }
};

// Add comment to poem
export const addComment = async (req, res, next) => {
  try {
    const { poemId } = req.params;
    const { text, parentCommentId } = req.body;
    
    if (!text || !text.trim()) {
      return errorResponse(res, 'Comment text is required', 400);
    }
    
    // Check if poem exists
    const poem = await Poem.findById(poemId);
    if (!poem) {
      return errorResponse(res, 'Poem not found', 404);
    }
    
    const commentData = {
      poem: poemId,
      user: req.user.id,
      text: text.trim(),
      parentComment: parentCommentId || null
    };
    
    const comment = await Comment.create(commentData);
    
    // If it's a reply, add to parent comment's replies array
    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      });
    }
    
    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name email avatar');
    
    // Update poem comment count
    const commentCount = await Comment.countDocuments({ poem: poemId, status: 'active' });
    await Poem.findByIdAndUpdate(poemId, { 'stats.comments': commentCount });
    
    successResponse(res, populatedComment, 'Comment added successfully', 201);
  } catch (error) {
    console.error('Error in addComment:', error);
    next(error);
  }
};

// Update comment
export const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    
    if (!text || !text.trim()) {
      return errorResponse(res, 'Comment text is required', 400);
    }
    
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }
    
    // Check if user is the author or admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized to edit this comment', 403);
    }
    
    comment.text = text.trim();
    comment.isEdited = true;
    comment.editedAt = new Date();
    await comment.save();
    
    const updatedComment = await Comment.findById(commentId)
      .populate('user', 'name email avatar');
    
    successResponse(res, updatedComment, 'Comment updated successfully');
  } catch (error) {
    console.error('Error in updateComment:', error);
    next(error);
  }
};

// Delete comment (soft delete)
export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }
    
    // Check if user is the author or admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return errorResponse(res, 'Unauthorized to delete this comment', 403);
    }
    
    comment.status = 'deleted';
    comment.text = '[deleted]';
    await comment.save();
    
    // Update poem comment count
    const commentCount = await Comment.countDocuments({ poem: comment.poem, status: 'active' });
    await Poem.findByIdAndUpdate(comment.poem, { 'stats.comments': commentCount });
    
    successResponse(res, null, 'Comment deleted successfully');
  } catch (error) {
    console.error('Error in deleteComment:', error);
    next(error);
  }
};

// Like/unlike comment
export const likeComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;
    
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }
    
    const likeIndex = comment.likes.indexOf(userId);
    if (likeIndex === -1) {
      comment.likes.push(userId);
      comment.likesCount += 1;
    } else {
      comment.likes.splice(likeIndex, 1);
      comment.likesCount -= 1;
    }
    
    await comment.save();
    
    successResponse(res, { 
      liked: likeIndex === -1, 
      likesCount: comment.likesCount 
    });
  } catch (error) {
    console.error('Error in likeComment:', error);
    next(error);
  }
};

// Report comment
export const reportComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { reason } = req.body;
    
    if (!reason || !reason.trim()) {
      return errorResponse(res, 'Report reason is required', 400);
    }
    
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return errorResponse(res, 'Comment not found', 404);
    }
    
    // Check if user already reported
    const alreadyReported = comment.reports.some(r => r.user.toString() === req.user.id);
    if (alreadyReported) {
      return errorResponse(res, 'You have already reported this comment', 400);
    }
    
    comment.reports.push({
      user: req.user.id,
      reason: reason.trim()
    });
    
    // If report count reaches threshold, mark as reported
    if (comment.reports.length >= 3) {
      comment.status = 'reported';
    }
    
    await comment.save();
    
    successResponse(res, null, 'Comment reported successfully');
  } catch (error) {
    console.error('Error in reportComment:', error);
    next(error);
  }
};

// Get comment replies
export const getReplies = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const replies = await Comment.find({ 
      parentComment: commentId,
      status: 'active'
    })
      .populate('user', 'name email avatar')
      .sort({ createdAt: 1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    const total = await Comment.countDocuments({ parentComment: commentId, status: 'active' });
    
    successResponse(res, {
      replies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error in getReplies:', error);
    next(error);
  }
};