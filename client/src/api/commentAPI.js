// // client/src/api/commentAPI.js
// import api from './apiConfig';

// const commentAPI = {
//   // Get comments for a poem
//   getComments: (poemId) => {
//     if (!poemId) return Promise.reject(new Error('Poem ID is required'));
//     return api.get(`/comments/poem/${poemId}`);
//   },

//   // Add comment to a poem
//   addComment: (poemId, text) => {
//     if (!poemId) return Promise.reject(new Error('Poem ID is required'));
//     if (!text || !text.trim()) return Promise.reject(new Error('Comment text is required'));
//     return api.post(`/comments/poem/${poemId}`, { text: text.trim() });
//   },

//   // Update comment
//   updateComment: (poemId, commentId, text) => {
//     if (!poemId) return Promise.reject(new Error('Poem ID is required'));
//     if (!commentId) return Promise.reject(new Error('Comment ID is required'));
//     if (!text || !text.trim()) return Promise.reject(new Error('Comment text is required'));
//     return api.put(`/comments/${commentId}`, { text: text.trim(), poemId });
//   },

//   // Delete comment
//   deleteComment: (poemId, commentId) => {
//     if (!poemId) return Promise.reject(new Error('Poem ID is required'));
//     if (!commentId) return Promise.reject(new Error('Comment ID is required'));
//     return api.delete(`/comments/${commentId}`, { data: { poemId } });
//   },

//   // Like comment
//   likeComment: (poemId, commentId) => {
//     if (!poemId) return Promise.reject(new Error('Poem ID is required'));
//     if (!commentId) return Promise.reject(new Error('Comment ID is required'));
//     return api.post(`/comments/${commentId}/like`, { poemId });
//   },

//   // Report comment
//   reportComment: (poemId, commentId, reason) => {
//     if (!poemId) return Promise.reject(new Error('Poem ID is required'));
//     if (!commentId) return Promise.reject(new Error('Comment ID is required'));
//     if (!reason || !reason.trim()) return Promise.reject(new Error('Reason is required'));
//     return api.post(`/comments/${commentId}/report`, { poemId, reason: reason.trim() });
//   }
// };

// export default commentAPI;














// client/src/api/commentAPI.js
import api from './apiConfig';

const commentAPI = {
  // Get comments for a poem
  getComments: (poemId, params = {}) => {
    if (!poemId) return Promise.reject(new Error('Poem ID is required'));
    return api.get(`/comments/poem/${poemId}`, { params });
  },

  // Add comment to poem
  addComment: (poemId, text, parentCommentId = null) => {
    if (!poemId) return Promise.reject(new Error('Poem ID is required'));
    if (!text || !text.trim()) return Promise.reject(new Error('Comment text is required'));
    return api.post(`/comments/poem/${poemId}`, { text: text.trim(), parentCommentId });
  },

  // Update comment
  updateComment: (poemId, commentId, text) => {
    if (!commentId) return Promise.reject(new Error('Comment ID is required'));
    if (!text || !text.trim()) return Promise.reject(new Error('Comment text is required'));
    return api.put(`/comments/${commentId}`, { text: text.trim() });
  },

  // Delete comment
  deleteComment: (poemId, commentId) => {
    if (!commentId) return Promise.reject(new Error('Comment ID is required'));
    return api.delete(`/comments/${commentId}`);
  },

  // Like comment
  likeComment: (poemId, commentId) => {
    if (!commentId) return Promise.reject(new Error('Comment ID is required'));
    return api.post(`/comments/${commentId}/like`);
  },

  // Report comment
  reportComment: (poemId, commentId, reason) => {
    if (!commentId) return Promise.reject(new Error('Comment ID is required'));
    if (!reason || !reason.trim()) return Promise.reject(new Error('Reason is required'));
    return api.post(`/comments/${commentId}/report`, { reason: reason.trim() });
  },

  // Get replies for a comment
  getReplies: (commentId, params = {}) => {
    if (!commentId) return Promise.reject(new Error('Comment ID is required'));
    return api.get(`/comments/${commentId}/replies`, { params });
  }
};

export default commentAPI;