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











// server/server.js
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

//dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// ============================================
// CORS - Allow Multiple Origins
// ============================================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
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
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests for all routes
app.options('*', cors());

// ============================================
// Security & Middleware
// ============================================
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

app.use(cookieParser());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: { success: false, message: 'Too many requests from this IP' }
});
app.use('/api/', limiter);

// Body parsing - increased limit for file uploads
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
app.use(compression());
app.use(morgan('dev'));
app.use(passport.initialize());

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/upload', uploadRoutes); // Upload routes

// ============================================
// Health Checks
// ============================================

// Simple health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Detailed health check for debugging
app.get('/api/health/detailed', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    env: process.env.NODE_ENV,
    cors: {
      allowedOrigins
    }
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
      '/api/upload/image',
      '/api/upload/cover',
      '/api/upload/images',
      '/api/upload/pages',
      '/api/upload/pdf',
      '/api/upload/epub',
      '/api/upload/ebook',
      '/api/upload/audio',
      '/api/upload/video'
    ]
  });
});

// ============================================
// Error Handling
// ============================================
app.use(notFound);
app.use(errorHandler);

// ============================================
// Start Server
// ============================================
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log('✅ MongoDB Connected successfully');
    
    app.listen(PORT, () => {
      console.log(`\n🚀 Server running on port ${PORT}`);
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
      console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
      console.log('PORT:', process.env.PORT);
      console.log(`\n❤️  Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

startServer();

export default app;