// backend/routes/sitemap.routes.js
import express from 'express';
import { getSitemapData, generateSitemapXML } from '../controllers/sitemap.controller.js';

const router = express.Router();

router.get('/sitemap.xml', generateSitemapXML);
router.get('/sitemap-data', getSitemapData);

export default router;