// // server/routes/publicSettings.routes.js
// import express from 'express';
// import {
//   getPublicSettings,
//   getThemeSettings,
//   getSeoSettings,
//   getSocialSettings,
//   getFooterSettings,
//   getAnnouncementSettings
// } from '../controllers/settings.controller.js';

// const router = express.Router();

// // Public settings routes (no authentication required)
// router.get('/public', getPublicSettings);
// router.get('/theme', getThemeSettings);
// router.get('/seo', getSeoSettings);
// router.get('/social', getSocialSettings);
// router.get('/footer', getFooterSettings);
// router.get('/announcement', getAnnouncementSettings);

// export default router;










// server/routes/publicSettings.routes.js
import express from 'express';
import {
  getPublicSettings,
  getThemeSettings,
  getSeoSettings,
  getSocialSettings,
  getFooterSettings,
  getAnnouncementSettings,
  getPublicMaintenanceStatus
} from '../controllers/settings.controller.js';

const router = express.Router();

// Public settings routes (no authentication required)
router.get('/public', getPublicSettings);
router.get('/theme', getThemeSettings);
router.get('/seo', getSeoSettings);
router.get('/social', getSocialSettings);
router.get('/footer', getFooterSettings);
router.get('/announcement', getAnnouncementSettings);
router.get('/maintenance/public', getPublicMaintenanceStatus);

export default router;