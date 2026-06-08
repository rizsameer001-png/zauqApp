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










// // server/routes/publicSettings.routes.js
// import express from 'express';
// import {
//   getPublicSettings,
//   getThemeSettings,
//   getSeoSettings,
//   getSocialSettings,
//   getFooterSettings,
//   getAnnouncementSettings,
//   getPublicMaintenanceStatus
// } from '../controllers/settings.controller.js';

// const router = express.Router();

// // Public settings routes (no authentication required)
// router.get('/public', getPublicSettings);
// router.get('/theme', getThemeSettings);
// router.get('/seo', getSeoSettings);
// router.get('/social', getSocialSettings);
// router.get('/footer', getFooterSettings);
// router.get('/announcement', getAnnouncementSettings);
// router.get('/maintenance/public', getPublicMaintenanceStatus);

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

// ============================================
// PUBLIC SETTINGS ROUTES (No authentication required)
// ============================================

// Get public settings (site name, logo, contact info, etc.)
// GET /api/settings/public
router.get('/public', getPublicSettings);

// Get theme settings (colors, font, theme mode)
// GET /api/settings/theme
router.get('/theme', getThemeSettings);

// Get SEO settings (meta tags, description, keywords)
// GET /api/settings/seo
router.get('/seo', getSeoSettings);

// Get social media settings (Facebook, Twitter, Instagram, etc.)
// GET /api/settings/social
router.get('/social', getSocialSettings);

// Get footer settings (footer text, columns, copyright)
// GET /api/settings/footer
router.get('/footer', getFooterSettings);

// Get announcement settings (show announcement banner)
// GET /api/settings/announcement
router.get('/announcement', getAnnouncementSettings);

// Get maintenance mode status (for maintenance page)
// GET /api/settings/maintenance/public
router.get('/maintenance/public', getPublicMaintenanceStatus);

export default router;