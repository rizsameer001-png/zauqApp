// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';
// import passport from 'passport';

// import connectDB from './config/db.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import { notFound } from './middleware/notFound.js';

// // Route imports
// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import poemRoutes from './routes/poem.routes.js';
// import authorRoutes from './routes/author.routes.js';
// import bookRoutes from './routes/book.routes.js';
// import audioRoutes from './routes/audio.routes.js';
// import videoRoutes from './routes/video.routes.js';
// import categoryRoutes from './routes/category.routes.js';
// import searchRoutes from './routes/search.routes.js';
// import notificationRoutes from './routes/notification.routes.js';
// import subscriptionRoutes from './routes/subscription.routes.js';
// import analyticsRoutes from './routes/analytics.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import creatorRoutes from './routes/creator.routes.js';
// import homepageRoutes from './routes/homepage.routes.js';
// import seoRoutes from './routes/seo.routes.js';

// dotenv.config();

// const app = express();

// // Security middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.CLIENT_URL || 'http://localhost:5173',
//   credentials: true
// }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: 'Too many requests from this IP'
// });
// app.use('/api/', limiter);

// // Body parsing
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(compression());
// app.use(morgan('dev'));
// app.use(passport.initialize());

// // Static files
// app.use('/uploads', express.static('uploads'));

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/poems', poemRoutes);
// app.use('/api/authors', authorRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/audio', audioRoutes);
// app.use('/api/videos', videoRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/creator', creatorRoutes);
// app.use('/api/homepage', homepageRoutes);
// app.use('/api/seo', seoRoutes);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // Error handling
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }).catch(err => {
//   console.error('Database connection failed:', err);
//   process.exit(1);
// });

// export default app;



// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';
// import dotenv from 'dotenv';
// import rateLimit from 'express-rate-limit';
// import passport from 'passport';
// import cookieParser from 'cookie-parser';

// import connectDB from './config/db.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import { notFound } from './middleware/notFound.js';

// // Route imports
// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import poemRoutes from './routes/poem.routes.js';
// import authorRoutes from './routes/author.routes.js';
// import bookRoutes from './routes/book.routes.js';
// import audioRoutes from './routes/audio.routes.js';
// import videoRoutes from './routes/video.routes.js';
// import categoryRoutes from './routes/category.routes.js';
// import searchRoutes from './routes/search.routes.js';
// import notificationRoutes from './routes/notification.routes.js';
// import subscriptionRoutes from './routes/subscription.routes.js';
// import analyticsRoutes from './routes/analytics.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import creatorRoutes from './routes/creator.routes.js';
// import homepageRoutes from './routes/homepage.routes.js';
// import seoRoutes from './routes/seo.routes.js';
// // server/server.js or server/app.js
// import uploadRoutes from './routes/upload.routes.js';
// dotenv.config();

// const app = express();

// // ============================================
// // CORS - Allow Multiple Origins
// // ============================================
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:5173',
//   process.env.CLIENT_URL
// ].filter(Boolean); // Remove undefined

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.warn(`CORS blocked: ${origin} not in allowed list`);
//       callback(new Error(`Origin ${origin} not allowed by CORS`));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // Handle preflight requests for all routes
// app.options('*', cors());

// // ============================================
// // Security & Middleware
// // ============================================
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: 'cross-origin' }
// }));

// app.use(cookieParser());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: { success: false, message: 'Too many requests from this IP' }
// });
// app.use('/api/', limiter);

// // Body parsing
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(compression());
// app.use(morgan('dev'));
// app.use(passport.initialize());

// // Static files
// app.use('/uploads', express.static('uploads'));

// // ============================================
// // API Routes
// // ============================================
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/poems', poemRoutes);
// app.use('/api/authors', authorRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/audio', audioRoutes);
// app.use('/api/videos', videoRoutes);
// // Add this after other route declarations
// app.use('/api/upload', uploadRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/creator', creatorRoutes);
// app.use('/api/homepage', homepageRoutes);
// app.use('/api/seo', seoRoutes);


// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', timestamp: new Date().toISOString() });
// });

// // ============================================
// // Error Handling
// // ============================================
// app.use(notFound);
// app.use(errorHandler);

// // ============================================
// // Start Server
// // ============================================
// const PORT = process.env.PORT || 5000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//     console.log(`📋 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
//   });
// }).catch(err => {
//   console.error('❌ Database connection failed:', err);
//   process.exit(1);
// });

// export default app;











// // server/server.js
// import dotenv from 'dotenv';
// dotenv.config(); // ✅ MUST BE FIRST
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';

// import rateLimit from 'express-rate-limit';
// import passport from 'passport';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import connectDB from './config/db.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import { notFound } from './middleware/notFound.js';

// // Route imports
// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import poemRoutes from './routes/poem.routes.js';
// import authorRoutes from './routes/author.routes.js';
// import bookRoutes from './routes/book.routes.js';
// import audioRoutes from './routes/audio.routes.js';
// import videoRoutes from './routes/video.routes.js';
// import categoryRoutes from './routes/category.routes.js';
// import searchRoutes from './routes/search.routes.js';
// import notificationRoutes from './routes/notification.routes.js';
// import subscriptionRoutes from './routes/subscription.routes.js';
// import analyticsRoutes from './routes/analytics.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import creatorRoutes from './routes/creator.routes.js';
// import homepageRoutes from './routes/homepage.routes.js';
// import seoRoutes from './routes/seo.routes.js';
// import uploadRoutes from './routes/upload.routes.js';
// import settingsRoutes from './routes/settings.routes.js';
// import publicSettingsRoutes from './routes/publicSettings.routes.js';
// import aiRoutes from './routes/aiRoutes.js';
// import transliterationRoutes from './routes/transliterationRoutes.js';

// //dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // ============================================
// // CORS - Allow Multiple Origins
// // ============================================
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:5000',
//   process.env.CLIENT_URL
// ].filter(Boolean);

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.warn(`CORS blocked: ${origin} not in allowed list`);
//       callback(new Error(`Origin ${origin} not allowed by CORS`));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
// }));

// // Handle preflight requests for all routes
// app.options('*', cors());

// // ============================================
// // Security & Middleware
// // ============================================
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: 'cross-origin' }
// }));

// app.use(cookieParser());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100,
//   message: { success: false, message: 'Too many requests from this IP' }
// });
// app.use('/api/', limiter);

// // Body parsing - increased limit for file uploads
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true, limit: '100mb' }));
// app.use(compression());
// app.use(morgan('dev'));
// app.use(passport.initialize());

// // Static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // ============================================
// // API Routes
// // ============================================
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/poems', poemRoutes);
// app.use('/api/authors', authorRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/audio', audioRoutes);
// app.use('/api/videos', videoRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/creator', creatorRoutes);
// app.use('/api/homepage', homepageRoutes);
// app.use('/api/seo', seoRoutes);
// app.use('/api/upload', uploadRoutes); // Upload routes
// // Add this middleware
// //app.use('/api/admin/settings', settingsRoutes);
// // Admin settings routes (protected)
// app.use('/api/admin/settings', settingsRoutes);
// app.use('/api/settings', publicSettingsRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/transliteration', transliterationRoutes);

// // ============================================
// // Health Checks
// // ============================================

// // Simple health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime()
//   });
// });

// // Detailed health check for debugging
// app.get('/api/health/detailed', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     memory: process.memoryUsage(),
//     env: process.env.NODE_ENV,
//     cors: {
//       allowedOrigins
//     }
//   });
// });

// // ============================================
// // Upload endpoint test (for debugging)
// // ============================================
// app.get('/api/upload-test', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Upload endpoint is configured',
//     endpoints: [
//       '/api/upload/image',
//       '/api/upload/cover',
//       '/api/upload/images',
//       '/api/upload/pages',
//       '/api/upload/pdf',
//       '/api/upload/epub',
//       '/api/upload/ebook',
//       '/api/upload/audio',
//       '/api/upload/video'
//     ]
//   });
// });

// // ============================================
// // Error Handling
// // ============================================
// app.use(notFound);
// app.use(errorHandler);

// // ============================================
// // Start Server
// // ============================================
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     console.log('✅ MongoDB Connected successfully');
    
//     app.listen(PORT, () => {
//       console.log(`\n🚀 Server running on port ${PORT}`);
//       console.log(`📋 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
//       console.log(`\n📁 Upload endpoints:`);
//       console.log(`   POST   /api/upload/image`);
//       console.log(`   POST   /api/upload/cover`);
//       console.log(`   POST   /api/upload/images`);
//       console.log(`   POST   /api/upload/pages`);
//       console.log(`   POST   /api/upload/pdf`);
//       console.log(`   POST   /api/upload/epub`);
//       console.log(`   POST   /api/upload/ebook`);
//       console.log(`   POST   /api/upload/audio`);
//       console.log(`   POST   /api/upload/video`);
//       console.log(`   DELETE /api/upload/delete`);
//       console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
//       console.log('PORT:', process.env.PORT);
//       console.log(`\n❤️  Health check: http://localhost:${PORT}/api/health`);
//     });
//   } catch (error) {
//     console.error('❌ Server startup failed:', error);
//     process.exit(1);
//   }
// };

// startServer();

// export default app;















// // server/server.js
// import dotenv from 'dotenv';
// dotenv.config(); // ✅ MUST BE FIRST
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import compression from 'compression';
// import morgan from 'morgan';

// import rateLimit from 'express-rate-limit';
// import passport from 'passport';
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import { fileURLToPath } from 'url';

// import connectDB from './config/db.js';
// import { errorHandler } from './middleware/errorHandler.js';
// import { notFound } from './middleware/notFound.js';

// // Route imports
// import authRoutes from './routes/auth.routes.js';
// import userRoutes from './routes/user.routes.js';
// import poemRoutes from './routes/poem.routes.js';
// import authorRoutes from './routes/author.routes.js';
// import bookRoutes from './routes/book.routes.js';
// import audioRoutes from './routes/audio.routes.js';
// import videoRoutes from './routes/video.routes.js';
// import categoryRoutes from './routes/category.routes.js';
// import searchRoutes from './routes/search.routes.js';
// import notificationRoutes from './routes/notification.routes.js';
// import subscriptionRoutes from './routes/subscription.routes.js';
// import analyticsRoutes from './routes/analytics.routes.js';
// import adminRoutes from './routes/admin.routes.js';
// import creatorRoutes from './routes/creator.routes.js';
// import homepageRoutes from './routes/homepage.routes.js';
// import seoRoutes from './routes/seo.routes.js';
// import uploadRoutes from './routes/upload.routes.js';
// import settingsRoutes from './routes/settings.routes.js';
// import publicSettingsRoutes from './routes/publicSettings.routes.js';
// import aiRoutes from './routes/aiRoutes.js';
// import transliterationRoutes from './routes/transliterationRoutes.js';
// import playlistRoutes from './routes/playlist.routes.js';
// // import categoryRoutes from './routes/category.routes.js';
// // Blog Routes
// import blogRoutes from './routes/blog.routes.js';
// // Import backup routes
// import backupRoutes from './routes/backup.routes.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const app = express();

// // ============================================
// // CORS - Allow Multiple Origins
// // ============================================
// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'http://localhost:5000',
//   'http://127.0.0.1:3000',
//   'http://127.0.0.1:5000',
//   process.env.CLIENT_URL
// ].filter(Boolean);

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (mobile apps, curl, Postman)
//     if (!origin) return callback(null, true);
    
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.warn(`CORS blocked: ${origin} not in allowed list`);
//       // For development, allow any origin
//       if (process.env.NODE_ENV === 'development') {
//         callback(null, true);
//       } else {
//         callback(new Error(`Origin ${origin} not allowed by CORS`));
//       }
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
// }));

// // Handle preflight requests for all routes
// app.options('*', cors());

// // ============================================
// // Security & Middleware
// // ============================================
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: 'cross-origin' },
//   contentSecurityPolicy: false // Disable for development if needed
// }));

// app.use(cookieParser());

// // Rate limiting - different limits for different routes
// const generalLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 300,
//   message: { success: false, message: 'Too many requests from this IP' }
// });

// const strictLimiter = rateLimit({
//   windowMs: 60 * 60 * 1000, // 1 hour
//   max: 150,
//   message: { success: false, message: 'Too many requests. Please try again later.' }
// });

// // Apply rate limiting
// app.use('/api/', generalLimiter);
// app.use('/api/auth/', strictLimiter); // Stricter limit for auth routes
// app.use('/api/upload/', strictLimiter); // Stricter limit for uploads

// // Body parsing - increased limit for file uploads
// app.use(express.json({ limit: '100mb' }));
// app.use(express.urlencoded({ extended: true, limit: '100mb' }));
// app.use(compression());
// app.use(morgan('dev'));
// app.use(passport.initialize());

// // Static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/temp', express.static(path.join(__dirname, 'temp')));

// // ============================================
// // Request logging middleware (for debugging)
// // ============================================
// app.use((req, res, next) => {
//   if (process.env.NODE_ENV === 'development') {
//     console.log(`${req.method} ${req.url}`);
//   }
//   next();
// });

// // ============================================
// // API Routes
// // ============================================
// app.use('/api/auth', authRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/poems', poemRoutes);
// app.use('/api/authors', authorRoutes);
// app.use('/api/books', bookRoutes);
// app.use('/api/audio', audioRoutes);
// app.use('/api/videos', videoRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/search', searchRoutes);
// app.use('/api/notifications', notificationRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/analytics', analyticsRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/creator', creatorRoutes);
// app.use('/api/homepage', homepageRoutes);
// app.use('/api/seo', seoRoutes);
// app.use('/api/upload', uploadRoutes);
// app.use('/api/admin/settings', settingsRoutes);
// app.use('/api/settings', publicSettingsRoutes);
// app.use('/api/ai', aiRoutes);
// app.use('/api/transliteration', transliterationRoutes);
// app.use('/api/playlists', playlistRoutes);
// // app.use('/api/categories', categoryRoutes);
// app.use('/api/blogs', blogRoutes);
// app.use('/api/backup', backupRoutes);

// // ============================================
// // Health Checks
// // ============================================

// // Simple health check
// app.get('/api/health', (req, res) => {
//   res.json({ 
//     status: 'OK', 
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     environment: process.env.NODE_ENV || 'development'
//   });
// });

// // Detailed health check for debugging
// app.get('/api/health/detailed', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     memory: process.memoryUsage(),
//     environment: process.env.NODE_ENV,
//     nodeVersion: process.version,
//     cors: {
//       allowedOrigins,
//       currentMode: process.env.NODE_ENV === 'development' ? 'development (permissive)' : 'production (restricted)'
//     },
//     database: {
//       connected: mongoose?.connection?.readyState === 1,
//       state: mongoose?.connection?.readyState
//     },
//     routes: {
//       audio: '/api/audio',
//       audioTypes: '/api/audio/type/:type',
//       audioOccasions: '/api/audio/occasion/:occasion',
//       audioStats: '/api/audio/stats',
//       audioPlaylists: '/api/audio/playlist/:playlistId'
//     }
//   });
// });

// // ============================================
// // Audio routes test endpoint
// // ============================================
// app.get('/api/audio-test', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Audio routes are configured',
//     availableEndpoints: [
//       'GET    /api/audio',
//       'GET    /api/audio/featured',
//       'GET    /api/audio/stats',
//       'GET    /api/audio/type/:type',
//       'GET    /api/audio/occasion/:occasion',
//       'GET    /api/audio/playlist/:playlistId',
//       'GET    /api/audio/search',
//       'GET    /api/audio/trending',
//       'GET    /api/audio/popular/:type',
//       'GET    /api/audio/author/:authorId',
//       'GET    /api/audio/tag/:tag',
//       'GET    /api/audio/:slug',
//       'GET    /api/audio/:slug/stream',
//       'GET    /api/audio/:slug/transcript',
//       'GET    /api/audio/:slug/similar',
//       'POST   /api/audio',
//       'PUT    /api/audio/:id',
//       'DELETE /api/audio/:id',
//       'POST   /api/audio/:id/like',
//       'DELETE /api/audio/:id/like',
//       'POST   /api/audio/:id/bookmark',
//       'DELETE /api/audio/:id/bookmark',
//       'GET    /api/audio/playlists/user',
//       'POST   /api/audio/playlists',
//       'POST   /api/audio/:audioId/playlist/:playlistId',
//       'DELETE /api/audio/:audioId/playlist/:playlistId',
//       'GET    /api/audio/recent/played',
//       'GET    /api/audio/recommended',
//       'GET    /api/admin/audio/analytics',
//       'POST   /api/admin/audio/bulk',
//       'PATCH  /api/admin/audio/:id/metadata'
//     ]
//   });
// });

// // ============================================
// // Upload endpoint test (for debugging)
// // ============================================
// app.get('/api/upload-test', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Upload endpoint is configured',
//     endpoints: [
//       'POST   /api/upload/image',
//       'POST   /api/upload/cover',
//       'POST   /api/upload/images',
//       'POST   /api/upload/pages',
//       'POST   /api/upload/pdf',
//       'POST   /api/upload/epub',
//       'POST   /api/upload/ebook',
//       'POST   /api/upload/audio',
//       'POST   /api/upload/video',
//       'DELETE /api/upload/delete'
//     ]
//   });
// });

// // ============================================
// // Root endpoint
// // ============================================
// app.get('/', (req, res) => {
//   res.json({
//     name: 'Adabiyat API',
//     version: '1.0.0',
//     status: 'running',
//     endpoints: {
//       health: '/api/health',
//       audio: '/api/audio',
//       auth: '/api/auth',
//       admin: '/api/admin'
//     }
//   });
// });

// // ============================================
// // Error Handling
// // ============================================
// app.use(notFound);
// app.use(errorHandler);

// // ============================================
// // Import mongoose for health check
// // ============================================
// import mongoose from 'mongoose';

// // ============================================
// // Start Server
// // ============================================
// const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//   try {
//     await connectDB();
//     console.log('✅ MongoDB Connected successfully');
//     console.log(`📊 MongoDB State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
//     app.listen(PORT, () => {
//       console.log(`\n🚀 Server running on port ${PORT}`);
//       console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
//       console.log(`📋 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
      
//       console.log(`\n📁 Upload endpoints:`);
//       console.log(`   POST   /api/upload/image`);
//       console.log(`   POST   /api/upload/cover`);
//       console.log(`   POST   /api/upload/images`);
//       console.log(`   POST   /api/upload/pages`);
//       console.log(`   POST   /api/upload/pdf`);
//       console.log(`   POST   /api/upload/epub`);
//       console.log(`   POST   /api/upload/ebook`);
//       console.log(`   POST   /api/upload/audio`);
//       console.log(`   POST   /api/upload/video`);
//       console.log(`   DELETE /api/upload/delete`);
      
//       console.log(`\n🎵 Audio Routes:`);
//       console.log(`   GET    /api/audio`);
//       console.log(`   GET    /api/audio/type/:type (e.g., /api/audio/type/nauha)`);
//       console.log(`   GET    /api/audio/occasion/:occasion (e.g., /api/audio/occasion/muharram)`);
//       console.log(`   GET    /api/audio/stats`);
//       console.log(`   GET    /api/audio/featured`);
//       console.log(`   GET    /api/audio/:slug`);
//       console.log(`   GET    /api/audio/:slug/stream`);
//       console.log(`   POST   /api/audio (admin only)`);
      
//       console.log(`\n🔧 Configuration:`);
//       console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
//       console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
//       console.log(`   CLIENT_URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
      
//       console.log(`\n❤️  Health check: http://localhost:${PORT}/api/health`);
//       console.log(`🎵 Audio test: http://localhost:${PORT}/api/audio-test`);
//       console.log(`📁 Upload test: http://localhost:${PORT}/api/upload-test`);
//     });
//   } catch (error) {
//     console.error('❌ Server startup failed:', error);
//     process.exit(1);
//   }
// };

// startServer();

// export default app;




















import dotenv from 'dotenv';
dotenv.config(); // ✅ MUST BE FIRST
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';

import rateLimit from 'express-rate-limit';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Route imports
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import poemRoutes from './routes/poem.routes.js';
import authorRoutes from './routes/author.routes.js';
import bookRoutes from './routes/book.routes.js';
import audioRoutes from './routes/audio.routes.js';
import videoRoutes from './routes/video.routes.js';
import categoryRoutes from './routes/category.routes.js';
import searchRoutes from './routes/search.routes.js';
import notificationRoutes from './routes/notification.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import adminRoutes from './routes/admin.routes.js';
import creatorRoutes from './routes/creator.routes.js';
import homepageRoutes from './routes/homepage.routes.js';
import seoRoutes from './routes/seo.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import settingsRoutes from './routes/settings.routes.js';
import publicSettingsRoutes from './routes/publicSettings.routes.js';
import aiRoutes from './routes/aiRoutes.js';
import transliterationRoutes from './routes/transliterationRoutes.js';
import playlistRoutes from './routes/playlist.routes.js';
// import categoryRoutes from './routes/category.routes.js';
// Blog Routes
import blogRoutes from './routes/blog.routes.js';
// Import backup routes
import backupRoutes from './routes/backup.routes.js';
// 🔴 NEW: Import app settings routes
import appSettingsRoutes from './routes/appSettings.routes.js';
// server/server.js - Add captcha routes
import captchaRoutes from './routes/captcha.routes.js';
import commentRoutes from './routes/comment.routes.js';
import adRoutes from './routes/ad.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ============================================
// CORS - Allow Multiple Origins
// ============================================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:5000',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked: ${origin} not in allowed list`);
      // For development, allow any origin
      if (process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Handle preflight requests for all routes
app.options('*', cors());

// ============================================
// Security & Middleware
// ============================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
  contentSecurityPolicy: false // Disable for development if needed
}));

app.use(cookieParser());

// Rate limiting - different limits for different routes
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  message: { success: false, message: 'Too many requests from this IP' }
});

const strictLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 150,
  message: { success: false, message: 'Too many requests. Please try again later.' }
});

// Apply rate limiting
app.use('/api/', generalLimiter);
app.use('/api/auth/', strictLimiter); // Stricter limit for auth routes
app.use('/api/upload/', strictLimiter); // Stricter limit for uploads

// Body parsing - increased limit for file uploads
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(compression());
app.use(morgan('dev'));
app.use(passport.initialize());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/temp', express.static(path.join(__dirname, 'temp')));

// ============================================
// Request logging middleware (for debugging)
// ============================================
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// ============================================
// API Routes
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/poems', poemRoutes);
app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/audio', audioRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/creator', creatorRoutes);
app.use('/api/homepage', homepageRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin/settings', settingsRoutes);
app.use('/api/settings', publicSettingsRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/transliteration', transliterationRoutes);
app.use('/api/playlists', playlistRoutes);
// app.use('/api/categories', categoryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/backup', backupRoutes);
// 🔴 NEW: App Settings Routes (Complete settings management)
// 🔴 This is the NEW endpoint that returns ALL settings fields
app.use('/api/app-settings', appSettingsRoutes);
app.use('/api/captcha', captchaRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/ads', adRoutes);

// ============================================
// Health Checks
// ============================================

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Detailed health check for debugging
app.get('/api/health/detailed', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV,
    nodeVersion: process.version,
    cors: {
      allowedOrigins,
      currentMode: process.env.NODE_ENV === 'development' ? 'development (permissive)' : 'production (restricted)'
    },
    database: {
      connected: mongoose?.connection?.readyState === 1,
      state: mongoose?.connection?.readyState
    },
    routes: {
      audio: '/api/audio',
      audioTypes: '/api/audio/type/:type',
      audioOccasions: '/api/audio/occasion/:occasion',
      audioStats: '/api/audio/stats',
      audioPlaylists: '/api/audio/playlist/:playlistId'
    }
  });
});

// ============================================
// Audio routes test endpoint
// ============================================
app.get('/api/audio-test', (req, res) => {
  res.json({
    success: true,
    message: 'Audio routes are configured',
    availableEndpoints: [
      'GET    /api/audio',
      'GET    /api/audio/featured',
      'GET    /api/audio/stats',
      'GET    /api/audio/type/:type',
      'GET    /api/audio/occasion/:occasion',
      'GET    /api/audio/playlist/:playlistId',
      'GET    /api/audio/search',
      'GET    /api/audio/trending',
      'GET    /api/audio/popular/:type',
      'GET    /api/audio/author/:authorId',
      'GET    /api/audio/tag/:tag',
      'GET    /api/audio/:slug',
      'GET    /api/audio/:slug/stream',
      'GET    /api/audio/:slug/transcript',
      'GET    /api/audio/:slug/similar',
      'POST   /api/audio',
      'PUT    /api/audio/:id',
      'DELETE /api/audio/:id',
      'POST   /api/audio/:id/like',
      'DELETE /api/audio/:id/like',
      'POST   /api/audio/:id/bookmark',
      'DELETE /api/audio/:id/bookmark',
      'GET    /api/audio/playlists/user',
      'POST   /api/audio/playlists',
      'POST   /api/audio/:audioId/playlist/:playlistId',
      'DELETE /api/audio/:audioId/playlist/:playlistId',
      'GET    /api/audio/recent/played',
      'GET    /api/audio/recommended',
      'GET    /api/admin/audio/analytics',
      'POST   /api/admin/audio/bulk',
      'PATCH  /api/admin/audio/:id/metadata'
    ]
  });
});

// ============================================
// Upload endpoint test (for debugging)
// ============================================
app.get('/api/upload-test', (req, res) => {
  res.json({
    success: true,
    message: 'Upload endpoint is configured',
    endpoints: [
      'POST   /api/upload/image',
      'POST   /api/upload/cover',
      'POST   /api/upload/images',
      'POST   /api/upload/pages',
      'POST   /api/upload/pdf',
      'POST   /api/upload/epub',
      'POST   /api/upload/ebook',
      'POST   /api/upload/audio',
      'POST   /api/upload/video',
      'DELETE /api/upload/delete'
    ]
  });
});

// ============================================
// Root endpoint
// ============================================
app.get('/', (req, res) => {
  res.json({
    name: 'Adabiyat API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      audio: '/api/audio',
      auth: '/api/auth',
      admin: '/api/admin',
      appSettings: '/api/app-settings' // 🔴 NEW endpoint added
    }
  });
});

// ============================================
// Error Handling
// ============================================
app.use(notFound);
app.use(errorHandler);

// ============================================
// Import mongoose for health check
// ============================================
import mongoose from 'mongoose';

// ============================================
// Start Server
// ============================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected successfully');
    console.log(`📊 MongoDB State: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`📋 Allowed CORS origins: ${allowedOrigins.join(', ')}`);
      
      console.log(`\n📁 Upload endpoints:`);
      console.log(`   POST   /api/upload/image`);
      console.log(`   POST   /api/upload/cover`);
      console.log(`   POST   /api/upload/images`);
      console.log(`   POST   /api/upload/pages`);
      console.log(`   POST   /api/upload/pdf`);
      console.log(`   POST   /api/upload/epub`);
      console.log(`   POST   /api/upload/ebook`);
      console.log(`   POST   /api/upload/audio`);
      console.log(`   POST   /api/upload/video`);
      console.log(`   DELETE /api/upload/delete`);
      
      console.log(`\n🎵 Audio Routes:`);
      console.log(`   GET    /api/audio`);
      console.log(`   GET    /api/audio/type/:type (e.g., /api/audio/type/nauha)`);
      console.log(`   GET    /api/audio/occasion/:occasion (e.g., /api/audio/occasion/muharram)`);
      console.log(`   GET    /api/audio/stats`);
      console.log(`   GET    /api/audio/featured`);
      console.log(`   GET    /api/audio/:slug`);
      console.log(`   GET    /api/audio/:slug/stream`);
      console.log(`   POST   /api/audio (admin only)`);
      
      // 🔴 NEW: App Settings Routes
      console.log(`\n⚙️ App Settings Routes (NEW):`);
      console.log(`   GET    /api/app-settings - Get all settings`);
      console.log(`   PUT    /api/app-settings - Update all settings`);
      console.log(`   POST   /api/app-settings/reset - Reset to defaults`);
      console.log(`   GET    /api/app-settings/:key - Get single setting`);
      console.log(`   PUT    /api/app-settings/:key - Update single setting`);
      console.log(`   POST   /api/app-settings/upload/:type - Upload logo/favicon`);
      console.log(`   POST   /api/app-settings/api-keys - Generate API key`);
      console.log(`   DELETE /api/app-settings/api-keys/:keyId - Delete API key`);
      
      console.log(`\n🔧 Configuration:`);
      console.log(`   MONGODB_URI: ${process.env.MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
      console.log(`   JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
      console.log(`   CLIENT_URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
      
      console.log(`\n❤️  Health check: http://localhost:${PORT}/api/health`);
      console.log(`🎵 Audio test: http://localhost:${PORT}/api/audio-test`);
      console.log(`📁 Upload test: http://localhost:${PORT}/api/upload-test`);
      console.log(`⚙️  App Settings test: http://localhost:${PORT}/api/app-settings`); // 🔴 NEW
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();

export default app;