// // server/routes/ad.routes.js
// import express from 'express';
// import { protect, adminOnly } from '../middleware/auth.js';
// import {
//   getAllAds,
//   getActiveAds,
//   getAdsByPosition,
//   createAd,
//   updateAd,
//   deleteAd,
//   trackAdClick,
//   trackAdImpression
// } from '../controllers/ad.controller.js';

// const router = express.Router();

// // Public routes
// router.get('/active', getActiveAds);
// router.get('/position/:position', getAdsByPosition);
// router.post('/:id/click', trackAdClick);
// router.post('/:id/impression', trackAdImpression);

// // Admin routes
// router.get('/', protect, adminOnly, getAllAds);
// router.post('/', protect, adminOnly, createAd);
// router.put('/:id', protect, adminOnly, updateAd);
// router.delete('/:id', protect, adminOnly, deleteAd);

// export default router;
















// server/routes/ad.routes.js
import express from 'express';
import { protect, adminOnly } from '../middleware/auth.js';
import Ad from '../models/Ad.js';

const router = express.Router();

// Get ads by position (Public)
router.get('/position/:position', async (req, res) => {
  try {
    const { position } = req.params;
    const { page = 'all' } = req.query;
    
    const query = { 
      isActive: true, 
      position: position,
      pages: { $in: [page, 'all'] }
    };
    
    const ads = await Ad.find(query).sort({ priority: -1 }).limit(5);
    
    res.json({
      success: true,
      data: ads
    });
  } catch (error) {
    console.error('Error fetching ads:', error);
    // Return empty array instead of error
    res.json({ success: true, data: [] });
  }
});

// Track ad click
router.post('/:id/click', async (req, res) => {
  try {
    const { id } = req.params;
    await Ad.findByIdAndUpdate(id, { $inc: { clicks: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: true });
  }
});

// Track ad impression
router.post('/:id/impression', async (req, res) => {
  try {
    const { id } = req.params;
    await Ad.findByIdAndUpdate(id, { $inc: { impressions: 1 } });
    res.json({ success: true });
  } catch (error) {
    res.json({ success: true });
  }
});

// Admin routes
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const ads = await Ad.find().sort({ createdAt: -1 });
    res.json({ success: true, data: ads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const ad = await Ad.create(req.body);
    res.json({ success: true, data: ad });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: ad });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    await Ad.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;