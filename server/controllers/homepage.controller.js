// server/controllers/homepage.controller.js




// import HomepageConfig from '../models/HomepageConfig.js';
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// export const getHomepageConfig = async (req, res, next) => {
//   try {
//     const config = await HomepageConfig.find().sort({ order: 1 });
//     successResponse(res, config);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHomepageData = async (req, res, next) => {
//   try {
//     const [
//       featuredPoems,
//       trendingPoems,
//       featuredAuthors,
//       featuredBooks,
//       featuredAudio,
//       featuredVideos,
//       dailyQuote
//     ] = await Promise.all([
//       Poem.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ featuredAt: -1 })
//         .limit(5),
//       Poem.find({ isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ 'stats.views': -1, 'stats.likes': -1 })
//         .limit(10),
//       Author.find({ isFeatured: true })
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Book.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Audio.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Video.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       getDailyQuoteData()
//     ]);

//     successResponse(res, {
//       hero: {
//         featuredPoems,
//         banners: []
//       },
//       trending: {
//         poems: trendingPoems,
//         authors: [] // Would need trending authors logic
//       },
//       featured: {
//         authors: featuredAuthors,
//         books: featuredBooks,
//         audio: featuredAudio,
//         videos: featuredVideos
//       },
//       dailyQuote,
//       sections: [
//         { id: 'hero', title: 'Featured', active: true },
//         { id: 'trending', title: 'Trending', active: true },
//         { id: 'featured-authors', title: 'Featured Authors', active: true },
//         { id: 'featured-books', title: 'Popular Books', active: true },
//         { id: 'featured-audio', title: 'Audio Highlights', active: true },
//         { id: 'featured-videos', title: 'Video Highlights', active: true },
//         { id: 'daily-quote', title: 'Daily Quote', active: true }
//       ]
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDailyQuote = async (req, res, next) => {
//   try {
//     const quote = await getDailyQuoteData();
//     successResponse(res, quote);
//   } catch (error) {
//     next(error);
//   }
// };

// const getDailyQuoteData = async () => {
//   // Get a random poem for the daily quote
//   const poems = await Poem.find({ isPublished: true })
//     .populate('author', 'name slug avatar')
//     .limit(100);

//   if (poems.length === 0) {
//     return {
//       text: "The pen is mightier than the sword.",
//       author: { name: "Edward Bulwer-Lytton" },
//       source: "Richelieu"
//     };
//   }

//   // Deterministic daily selection based on date
//   const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
//   const selectedPoem = poems[dayOfYear % poems.length];

//   return {
//     text: selectedPoem.content?.split('
// ')[0] || selectedPoem.title,
//     author: selectedPoem.author,
//     poem: selectedPoem,
//     date: new Date().toISOString().split('T')[0]
//   };
// };

// export const getFeaturedContent = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     let content = [];

//     switch (type) {
//       case 'poems':
//         content = await Poem.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ featuredAt: -1 })
//           .limit(10);
//         break;
//       case 'authors':
//         content = await Author.find({ isFeatured: true })
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'books':
//         content = await Book.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'audio':
//         content = await Audio.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'videos':
//         content = await Video.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       default:
//         return errorResponse(res, 'Invalid content type', 400);
//     }

//     successResponse(res, content);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateSection = async (req, res, next) => {
//   try {
//     const section = await HomepageConfig.findOneAndUpdate(
//       { section: req.params.section },
//       req.body,
//       { new: true, upsert: true }
//     );
//     successResponse(res, section, 'Section updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const addBanner = async (req, res, next) => {
//   try {
//     const section = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { $push: { banners: req.body } },
//       { new: true, upsert: true }
//     );
//     successResponse(res, section, 'Banner added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeBanner = async (req, res, next) => {
//   try {
//     const section = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { $pull: { banners: { _id: req.params.id } } },
//       { new: true }
//     );
//     successResponse(res, section, 'Banner removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderSections = async (req, res, next) => {
//   try {
//     const { sections } = req.body;

//     await Promise.all(
//       sections.map((section, index) =>
//         HomepageConfig.findOneAndUpdate(
//           { section: section.id },
//           { order: index },
//           { upsert: true }
//         )
//       )
//     );

//     successResponse(res, null, 'Sections reordered');
//   } catch (error) {
//     next(error);
//   }
// };





// import HomepageConfig from '../models/HomepageConfig.js';
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// export const getHomepageConfig = async (req, res, next) => {
//   try {
//     const config = await HomepageConfig.find().sort({ order: 1 });
//     successResponse(res, config);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHomepageData = async (req, res, next) => {
//   try {
//     const [
//       featuredPoems,
//       trendingPoems,
//       featuredAuthors,
//       featuredBooks,
//       featuredAudio,
//       featuredVideos,
//       dailyQuote
//     ] = await Promise.all([
//       Poem.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ featuredAt: -1 })
//         .limit(5),
//       Poem.find({ isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ 'stats.views': -1, 'stats.likes': -1 })
//         .limit(10),
//       Author.find({ isFeatured: true })
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Book.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Audio.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Video.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       getDailyQuoteData()
//     ]);

//     successResponse(res, {
//       hero: {
//         featuredPoems,
//         banners: []
//       },
//       trending: {
//         poems: trendingPoems,
//         authors: [] // Would need trending authors logic
//       },
//       featured: {
//         authors: featuredAuthors,
//         books: featuredBooks,
//         audio: featuredAudio,
//         videos: featuredVideos
//       },
//       dailyQuote,
//       sections: [
//         { id: 'hero', title: 'Featured', active: true },
//         { id: 'trending', title: 'Trending', active: true },
//         { id: 'featured-authors', title: 'Featured Authors', active: true },
//         { id: 'featured-books', title: 'Popular Books', active: true },
//         { id: 'featured-audio', title: 'Audio Highlights', active: true },
//         { id: 'featured-videos', title: 'Video Highlights', active: true },
//         { id: 'daily-quote', title: 'Daily Quote', active: true }
//       ]
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDailyQuote = async (req, res, next) => {
//   try {
//     const quote = await getDailyQuoteData();
//     successResponse(res, quote);
//   } catch (error) {
//     next(error);
//   }
// };

// const getDailyQuoteData = async () => {
//   // Get a random poem for the daily quote
//   const poems = await Poem.find({ isPublished: true })
//     .populate('author', 'name slug avatar')
//     .limit(100);

//   if (poems.length === 0) {
//     return {
//       text: "The pen is mightier than the sword.",
//       author: { name: "Edward Bulwer-Lytton" },
//       source: "Richelieu"
//     };
//   }

//   // Deterministic daily selection based on date
//   const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
//   const selectedPoem = poems[dayOfYear % poems.length];

//   return {
//     text: selectedPoem.content?.split('\n')[0] || selectedPoem.title,
//     author: selectedPoem.author,
//     poem: selectedPoem,
//     date: new Date().toISOString().split('T')[0]
//   };
// };

// export const getFeaturedContent = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     let content = [];

//     switch (type) {
//       case 'poems':
//         content = await Poem.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ featuredAt: -1 })
//           .limit(10);
//         break;
//       case 'authors':
//         content = await Author.find({ isFeatured: true })
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'books':
//         content = await Book.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'audio':
//         content = await Audio.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'videos':
//         content = await Video.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       default:
//         return errorResponse(res, 'Invalid content type', 400);
//     }

//     successResponse(res, content);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateSection = async (req, res, next) => {
//   try {
//     const section = await HomepageConfig.findOneAndUpdate(
//       { section: req.params.section },
//       req.body,
//       { new: true, upsert: true }
//     );
//     successResponse(res, section, 'Section updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const addBanner = async (req, res, next) => {
//   try {
//     const section = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { $push: { banners: req.body } },
//       { new: true, upsert: true }
//     );
//     successResponse(res, section, 'Banner added');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeBanner = async (req, res, next) => {
//   try {
//     const section = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { $pull: { banners: { _id: req.params.id } } },
//       { new: true }
//     );
//     successResponse(res, section, 'Banner removed');
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderSections = async (req, res, next) => {
//   try {
//     const { sections } = req.body;

//     await Promise.all(
//       sections.map((section, index) =>
//         HomepageConfig.findOneAndUpdate(
//           { section: section.id },
//           { order: index },
//           { upsert: true }
//         )
//       )
//     );

//     successResponse(res, null, 'Sections reordered');
//   } catch (error) {
//     next(error);
//   }
// };














// // server/controllers/homepage.controller.js
// import HomepageConfig from '../models/HomepageConfig.js';
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import Audio from '../models/Audio.js';
// import Video from '../models/Video.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// export const getHomepageConfig = async (req, res, next) => {
//   try {
//     let config = await HomepageConfig.find().sort({ order: 1 });
    
//     // If no config exists, create default sections
//     if (config.length === 0) {
//       const defaultSections = [
//         { section: 'hero', title: 'Hero Banner', type: 'banner', isActive: true, order: 1, banners: [] },
//         { section: 'trending', title: 'Trending Poems', type: 'content', isActive: true, order: 2 },
//         { section: 'featured-authors', title: 'Featured Authors', type: 'content', isActive: true, order: 3 },
//         { section: 'featured-books', title: 'Popular Books', type: 'content', isActive: true, order: 4 },
//         { section: 'featured-audio', title: 'Audio Highlights', type: 'content', isActive: true, order: 5 },
//         { section: 'featured-videos', title: 'Video Highlights', type: 'content', isActive: true, order: 6 },
//         { section: 'daily-quote', title: 'Daily Quote', type: 'widget', isActive: true, order: 7 },
//         { section: 'premium-cta', title: 'Premium CTA', type: 'cta', isActive: true, order: 8 },
//       ];
      
//       config = await HomepageConfig.insertMany(defaultSections);
//     }
    
//     successResponse(res, config);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getHomepageData = async (req, res, next) => {
//   try {
//     const [
//       featuredPoems,
//       trendingPoems,
//       featuredAuthors,
//       featuredBooks,
//       featuredAudio,
//       featuredVideos,
//       dailyQuote,
//       heroSection
//     ] = await Promise.all([
//       Poem.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ featuredAt: -1 })
//         .limit(5),
//       Poem.find({ isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ 'stats.views': -1, 'stats.likes': -1 })
//         .limit(10),
//       Author.find({ isFeatured: true })
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Book.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Audio.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       Video.find({ isFeatured: true, isPublished: true })
//         .populate('author', 'name slug avatar')
//         .sort({ createdAt: -1 })
//         .limit(6),
//       getDailyQuoteData(),
//       HomepageConfig.findOne({ section: 'hero' })
//     ]);

//     successResponse(res, {
//       hero: {
//         featuredPoems,
//         banners: heroSection?.banners || []
//       },
//       trending: {
//         poems: trendingPoems,
//         authors: []
//       },
//       featured: {
//         authors: featuredAuthors,
//         books: featuredBooks,
//         audio: featuredAudio,
//         videos: featuredVideos
//       },
//       dailyQuote,
//       sections: [
//         { id: 'hero', title: 'Featured', active: true },
//         { id: 'trending', title: 'Trending', active: true },
//         { id: 'featured-authors', title: 'Featured Authors', active: true },
//         { id: 'featured-books', title: 'Popular Books', active: true },
//         { id: 'featured-audio', title: 'Audio Highlights', active: true },
//         { id: 'featured-videos', title: 'Video Highlights', active: true },
//         { id: 'daily-quote', title: 'Daily Quote', active: true }
//       ]
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getDailyQuote = async (req, res, next) => {
//   try {
//     const quote = await getDailyQuoteData();
//     successResponse(res, quote);
//   } catch (error) {
//     next(error);
//   }
// };

// const getDailyQuoteData = async () => {
//   // Get a random poem for the daily quote
//   const poems = await Poem.find({ isPublished: true })
//     .populate('author', 'name slug avatar')
//     .limit(100);

//   if (poems.length === 0) {
//     return {
//       text: "The pen is mightier than the sword.",
//       author: { name: "Edward Bulwer-Lytton" },
//       source: "Richelieu"
//     };
//   }

//   // Deterministic daily selection based on date
//   const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
//   const selectedPoem = poems[dayOfYear % poems.length];

//   return {
//     text: selectedPoem.content?.split('\n')[0] || selectedPoem.title,
//     author: selectedPoem.author,
//     poem: selectedPoem,
//     date: new Date().toISOString().split('T')[0]
//   };
// };

// export const getFeaturedContent = async (req, res, next) => {
//   try {
//     const { type } = req.query;
//     let content = [];

//     switch (type) {
//       case 'poems':
//         content = await Poem.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ featuredAt: -1 })
//           .limit(10);
//         break;
//       case 'authors':
//         content = await Author.find({ isFeatured: true })
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'books':
//         content = await Book.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'audio':
//         content = await Audio.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       case 'videos':
//         content = await Video.find({ isFeatured: true, isPublished: true })
//           .populate('author', 'name slug avatar')
//           .sort({ createdAt: -1 })
//           .limit(10);
//         break;
//       default:
//         return errorResponse(res, 'Invalid content type', 400);
//     }

//     successResponse(res, content);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== SECTION MANAGEMENT ==============

// export const updateSection = async (req, res, next) => {
//   try {
//     const { section } = req.params;
//     const updates = req.body;
    
//     const updatedSection = await HomepageConfig.findOneAndUpdate(
//       { section },
//       updates,
//       { new: true, upsert: true }
//     );
    
//     successResponse(res, updatedSection, 'Section updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const toggleSection = async (req, res, next) => {
//   try {
//     const { section } = req.params;
//     const { isActive } = req.body;
    
//     const updatedSection = await HomepageConfig.findOneAndUpdate(
//       { section },
//       { isActive },
//       { new: true, upsert: true }
//     );
    
//     successResponse(res, updatedSection, `Section ${isActive ? 'enabled' : 'disabled'} successfully`);
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderSections = async (req, res, next) => {
//   try {
//     const { sections } = req.body;

//     if (!sections || !Array.isArray(sections)) {
//       return errorResponse(res, 'Invalid sections data', 400);
//     }

//     await Promise.all(
//       sections.map(({ id, order }) =>
//         HomepageConfig.findOneAndUpdate(
//           { section: id },
//           { order },
//           { upsert: true }
//         )
//       )
//     );

//     const updatedSections = await HomepageConfig.find().sort({ order: 1 });
//     successResponse(res, updatedSections, 'Sections reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== BANNER MANAGEMENT ==============

// export const getBanners = async (req, res, next) => {
//   try {
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     const banners = heroSection?.banners || [];
//     successResponse(res, banners);
//   } catch (error) {
//     next(error);
//   }
// };

// export const addBanner = async (req, res, next) => {
//   try {
//     const bannerData = req.body;
    
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     const newBanner = {
//       id: Date.now(),
//       ...bannerData,
//       order: heroSection?.banners?.length || 0
//     };
    
//     const updatedSection = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { $push: { banners: newBanner } },
//       { new: true, upsert: true }
//     );
    
//     successResponse(res, newBanner, 'Banner added successfully', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateBanner = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;
//     const bannerId = parseInt(id);
    
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     if (!heroSection) {
//       return errorResponse(res, 'Hero section not found', 404);
//     }
    
//     const bannerIndex = heroSection.banners.findIndex(b => b.id === bannerId);
//     if (bannerIndex === -1) {
//       return errorResponse(res, 'Banner not found', 404);
//     }
    
//     heroSection.banners[bannerIndex] = {
//       ...heroSection.banners[bannerIndex],
//       ...updates,
//       id: bannerId
//     };
    
//     await heroSection.save();
    
//     successResponse(res, heroSection.banners[bannerIndex], 'Banner updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const removeBanner = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const bannerId = parseInt(id);
    
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     if (!heroSection) {
//       return errorResponse(res, 'Hero section not found', 404);
//     }
    
//     const initialLength = heroSection.banners.length;
//     heroSection.banners = heroSection.banners.filter(b => b.id !== bannerId);
    
//     if (initialLength === heroSection.banners.length) {
//       return errorResponse(res, 'Banner not found', 404);
//     }
    
//     await heroSection.save();
    
//     successResponse(res, null, 'Banner removed successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateBanners = async (req, res, next) => {
//   try {
//     const { banners } = req.body;
    
//     if (!banners || !Array.isArray(banners)) {
//       return errorResponse(res, 'Invalid banners data', 400);
//     }
    
//     const updatedSection = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { banners },
//       { new: true, upsert: true }
//     );
    
//     successResponse(res, updatedSection.banners, 'Banners updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const reorderBanners = async (req, res, next) => {
//   try {
//     const { orders } = req.body;
    
//     if (!orders || !Array.isArray(orders)) {
//       return errorResponse(res, 'Invalid orders data', 400);
//     }
    
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     if (!heroSection) {
//       return errorResponse(res, 'Hero section not found', 404);
//     }
    
//     orders.forEach(({ id, order }) => {
//       const bannerIndex = heroSection.banners.findIndex(b => b.id === id);
//       if (bannerIndex !== -1) {
//         heroSection.banners[bannerIndex].order = order;
//       }
//     });
    
//     heroSection.banners.sort((a, b) => a.order - b.order);
//     await heroSection.save();
    
//     successResponse(res, heroSection.banners, 'Banners reordered successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const toggleBannerStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { isActive } = req.body;
//     const bannerId = parseInt(id);
    
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     if (!heroSection) {
//       return errorResponse(res, 'Hero section not found', 404);
//     }
    
//     const bannerIndex = heroSection.banners.findIndex(b => b.id === bannerId);
//     if (bannerIndex === -1) {
//       return errorResponse(res, 'Banner not found', 404);
//     }
    
//     heroSection.banners[bannerIndex].isActive = isActive;
//     await heroSection.save();
    
//     successResponse(res, heroSection.banners[bannerIndex], 'Banner status updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const bulkUploadBanners = async (req, res, next) => {
//   try {
//     const { banners } = req.body;
    
//     if (!banners || !Array.isArray(banners)) {
//       return errorResponse(res, 'Invalid banners data', 400);
//     }
    
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     const currentBanners = heroSection?.banners || [];
    
//     const newBanners = banners.map((banner, index) => ({
//       id: Date.now() + index,
//       ...banner,
//       order: currentBanners.length + index
//     }));
    
//     const updatedSection = await HomepageConfig.findOneAndUpdate(
//       { section: 'hero' },
//       { $push: { banners: { $each: newBanners } } },
//       { new: true, upsert: true }
//     );
    
//     successResponse(res, newBanners, `${newBanners.length} banners added successfully`, 201);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== FEATURED CONTENT MANAGEMENT ==============

// export const updateFeaturedContent = async (req, res, next) => {
//   try {
//     const featuredContent = req.body;
    
//     // Store featured content in a separate collection or config
//     // For now, we'll update the actual items in their respective collections
//     if (featuredContent.featuredPoem) {
//       await Poem.updateMany({}, { isFeatured: false });
//       await Poem.findByIdAndUpdate(featuredContent.featuredPoem, { isFeatured: true });
//     }
    
//     if (featuredContent.featuredAuthor) {
//       await Author.updateMany({}, { isFeatured: false });
//       await Author.findByIdAndUpdate(featuredContent.featuredAuthor, { isFeatured: true });
//     }
    
//     if (featuredContent.featuredBook) {
//       await Book.updateMany({}, { isFeatured: false });
//       await Book.findByIdAndUpdate(featuredContent.featuredBook, { isFeatured: true });
//     }
    
//     successResponse(res, featuredContent, 'Featured content updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedContent = async (req, res, next) => {
//   try {
//     const [featuredPoem, featuredAuthor, featuredBook] = await Promise.all([
//       Poem.findOne({ isFeatured: true }).populate('author', 'name slug avatar'),
//       Author.findOne({ isFeatured: true }),
//       Book.findOne({ isFeatured: true }).populate('author', 'name slug avatar')
//     ]);
    
//     successResponse(res, {
//       featuredPoem: featuredPoem?._id || '',
//       featuredAuthor: featuredAuthor?._id || '',
//       featuredBook: featuredBook?._id || ''
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== QUOTE SETTINGS ==============

// export const updateQuoteSettings = async (req, res, next) => {
//   try {
//     const quoteSettings = req.body;
    
//     // Store quote settings in a dedicated collection or config
//     // For now, we'll use a simple in-memory storage or you can create a Settings model
//     global.quoteSettings = quoteSettings;
    
//     successResponse(res, quoteSettings, 'Quote settings updated successfully');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getQuoteSettings = async (req, res, next) => {
//   try {
//     const quoteSettings = global.quoteSettings || {
//       source: 'auto',
//       frequency: 'daily'
//     };
    
//     successResponse(res, quoteSettings);
//   } catch (error) {
//     next(error);
//   }
// };

// // ============== STATS ==============

// export const getHomepageStats = async (req, res, next) => {
//   try {
//     const heroSection = await HomepageConfig.findOne({ section: 'hero' });
//     const totalSections = await HomepageConfig.countDocuments();
//     const activeSections = await HomepageConfig.countDocuments({ isActive: true });
    
//     const stats = {
//       totalSections,
//       activeSections,
//       totalBanners: heroSection?.banners?.length || 0,
//       activeBanners: heroSection?.banners?.filter(b => b.isActive !== false).length || 0
//     };
    
//     successResponse(res, stats);
//   } catch (error) {
//     next(error);
//   }
// };














// server/controllers/homepage.controller.js
import HomepageConfig from '../models/HomepageConfig.js';
import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getHomepageConfig = async (req, res, next) => {
  try {
    let config = await HomepageConfig.find().sort({ order: 1 });
    
    // If no config exists, create default sections
    if (config.length === 0) {
      const defaultSections = [
        { section: 'hero', title: 'Hero Banner', type: 'banner', isActive: true, order: 1, banners: [] },
        { section: 'trending', title: 'Trending Poems', type: 'content', isActive: true, order: 2 },
        { section: 'featured-authors', title: 'Featured Authors', type: 'content', isActive: true, order: 3 },
        { section: 'featured-books', title: 'Popular Books', type: 'content', isActive: true, order: 4 },
        { section: 'featured-audio', title: 'Audio Highlights', type: 'content', isActive: true, order: 5 },
        { section: 'featured-videos', title: 'Video Highlights', type: 'content', isActive: true, order: 6 },
        { section: 'daily-quote', title: 'Daily Quote', type: 'widget', isActive: true, order: 7 },
        { section: 'premium-cta', title: 'Premium CTA', type: 'cta', isActive: true, order: 8 },
      ];
      
      config = await HomepageConfig.insertMany(defaultSections);
    }
    
    successResponse(res, config);
  } catch (error) {
    next(error);
  }
};

export const getHomepageData = async (req, res, next) => {
  try {
    const [
      featuredPoems,
      trendingPoems,
      featuredAuthors,
      featuredBooks,
      featuredAudio,
      featuredVideos,
      dailyQuote,
      heroSection
    ] = await Promise.all([
      Poem.find({ isFeatured: true, isPublished: true })
        .populate('author', 'name slug avatar')
        .sort({ featuredAt: -1 })
        .limit(5),
      Poem.find({ isPublished: true })
        .populate('author', 'name slug avatar')
        .sort({ 'stats.views': -1, 'stats.likes': -1 })
        .limit(10),
      Author.find({ isFeatured: true })
        .sort({ createdAt: -1 })
        .limit(6),
      Book.find({ isFeatured: true, isPublished: true })
        .populate('author', 'name slug avatar')
        .sort({ createdAt: -1 })
        .limit(6),
      Audio.find({ isFeatured: true, isPublished: true })
        .populate('author', 'name slug avatar')
        .sort({ createdAt: -1 })
        .limit(6),
      Video.find({ isFeatured: true, isPublished: true })
        .populate('author', 'name slug avatar')
        .sort({ createdAt: -1 })
        .limit(6),
      getDailyQuoteData(),
      HomepageConfig.findOne({ section: 'hero' })
    ]);

    successResponse(res, {
      hero: {
        featuredPoems,
        banners: heroSection?.banners || []
      },
      trending: {
        poems: trendingPoems,
        authors: []
      },
      featured: {
        authors: featuredAuthors,
        books: featuredBooks,
        audio: featuredAudio,
        videos: featuredVideos
      },
      dailyQuote,
      sections: [
        { id: 'hero', title: 'Featured', active: true },
        { id: 'trending', title: 'Trending', active: true },
        { id: 'featured-authors', title: 'Featured Authors', active: true },
        { id: 'featured-books', title: 'Popular Books', active: true },
        { id: 'featured-audio', title: 'Audio Highlights', active: true },
        { id: 'featured-videos', title: 'Video Highlights', active: true },
        { id: 'daily-quote', title: 'Daily Quote', active: true }
      ]
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyQuote = async (req, res, next) => {
  try {
    const quote = await getDailyQuoteData();
    successResponse(res, quote);
  } catch (error) {
    next(error);
  }
};

const getDailyQuoteData = async () => {
  // Get a random poem for the daily quote
  const poems = await Poem.find({ isPublished: true })
    .populate('author', 'name slug avatar')
    .limit(100);

  if (poems.length === 0) {
    return {
      text: "The pen is mightier than the sword.",
      author: { name: "Edward Bulwer-Lytton" },
      source: "Richelieu"
    };
  }

  // Deterministic daily selection based on date
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const selectedPoem = poems[dayOfYear % poems.length];

  return {
    text: selectedPoem.content?.split('\n')[0] || selectedPoem.title,
    author: selectedPoem.author,
    poem: selectedPoem,
    date: new Date().toISOString().split('T')[0]
  };
};

// ============== FEATURED CONTENT (Single unified function) ==============
export const getFeaturedContent = async (req, res, next) => {
  try {
    const { type } = req.query;
    
    // If type is provided, return specific featured content type
    if (type) {
      let content = [];
      switch (type) {
        case 'poems':
          content = await Poem.find({ isFeatured: true, isPublished: true })
            .populate('author', 'name slug avatar')
            .sort({ featuredAt: -1 })
            .limit(10);
          break;
        case 'authors':
          content = await Author.find({ isFeatured: true })
            .sort({ createdAt: -1 })
            .limit(10);
          break;
        case 'books':
          content = await Book.find({ isFeatured: true, isPublished: true })
            .populate('author', 'name slug avatar')
            .sort({ createdAt: -1 })
            .limit(10);
          break;
        case 'audio':
          content = await Audio.find({ isFeatured: true, isPublished: true })
            .populate('author', 'name slug avatar')
            .sort({ createdAt: -1 })
            .limit(10);
          break;
        case 'videos':
          content = await Video.find({ isFeatured: true, isPublished: true })
            .populate('author', 'name slug avatar')
            .sort({ createdAt: -1 })
            .limit(10);
          break;
        default:
          return errorResponse(res, 'Invalid content type', 400);
      }
      return successResponse(res, content);
    }
    
    // Otherwise, return all featured content for admin
    const [featuredPoem, featuredAuthor, featuredBook] = await Promise.all([
      Poem.findOne({ isFeatured: true }).populate('author', 'name slug avatar'),
      Author.findOne({ isFeatured: true }),
      Book.findOne({ isFeatured: true }).populate('author', 'name slug avatar')
    ]);
    
    successResponse(res, {
      featuredPoem: featuredPoem?._id || '',
      featuredAuthor: featuredAuthor?._id || '',
      featuredBook: featuredBook?._id || '',
      featuredPoemData: featuredPoem,
      featuredAuthorData: featuredAuthor,
      featuredBookData: featuredBook
    });
  } catch (error) {
    next(error);
  }
};

// ============== SECTION MANAGEMENT ==============

export const updateSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const updates = req.body;
    
    const updatedSection = await HomepageConfig.findOneAndUpdate(
      { section },
      updates,
      { new: true, upsert: true }
    );
    
    successResponse(res, updatedSection, 'Section updated successfully');
  } catch (error) {
    next(error);
  }
};

export const toggleSection = async (req, res, next) => {
  try {
    const { section } = req.params;
    const { isActive } = req.body;
    
    const updatedSection = await HomepageConfig.findOneAndUpdate(
      { section },
      { isActive },
      { new: true, upsert: true }
    );
    
    successResponse(res, updatedSection, `Section ${isActive ? 'enabled' : 'disabled'} successfully`);
  } catch (error) {
    next(error);
  }
};

export const reorderSections = async (req, res, next) => {
  try {
    const { sections } = req.body;

    if (!sections || !Array.isArray(sections)) {
      return errorResponse(res, 'Invalid sections data', 400);
    }

    await Promise.all(
      sections.map(({ id, order }) =>
        HomepageConfig.findOneAndUpdate(
          { section: id },
          { order },
          { upsert: true }
        )
      )
    );

    const updatedSections = await HomepageConfig.find().sort({ order: 1 });
    successResponse(res, updatedSections, 'Sections reordered successfully');
  } catch (error) {
    next(error);
  }
};

// ============== BANNER MANAGEMENT ==============

export const getBanners = async (req, res, next) => {
  try {
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    const banners = heroSection?.banners || [];
    successResponse(res, banners);
  } catch (error) {
    next(error);
  }
};

export const addBanner = async (req, res, next) => {
  try {
    const bannerData = req.body;
    
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    const newBanner = {
      id: Date.now(),
      ...bannerData,
      order: heroSection?.banners?.length || 0
    };
    
    const updatedSection = await HomepageConfig.findOneAndUpdate(
      { section: 'hero' },
      { $push: { banners: newBanner } },
      { new: true, upsert: true }
    );
    
    successResponse(res, newBanner, 'Banner added successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const updateBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const bannerId = parseInt(id);
    
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    if (!heroSection) {
      return errorResponse(res, 'Hero section not found', 404);
    }
    
    const bannerIndex = heroSection.banners.findIndex(b => b.id === bannerId);
    if (bannerIndex === -1) {
      return errorResponse(res, 'Banner not found', 404);
    }
    
    heroSection.banners[bannerIndex] = {
      ...heroSection.banners[bannerIndex],
      ...updates,
      id: bannerId
    };
    
    await heroSection.save();
    
    successResponse(res, heroSection.banners[bannerIndex], 'Banner updated successfully');
  } catch (error) {
    next(error);
  }
};

export const removeBanner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bannerId = parseInt(id);
    
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    if (!heroSection) {
      return errorResponse(res, 'Hero section not found', 404);
    }
    
    const initialLength = heroSection.banners.length;
    heroSection.banners = heroSection.banners.filter(b => b.id !== bannerId);
    
    if (initialLength === heroSection.banners.length) {
      return errorResponse(res, 'Banner not found', 404);
    }
    
    await heroSection.save();
    
    successResponse(res, null, 'Banner removed successfully');
  } catch (error) {
    next(error);
  }
};

export const updateBanners = async (req, res, next) => {
  try {
    const { banners } = req.body;
    
    if (!banners || !Array.isArray(banners)) {
      return errorResponse(res, 'Invalid banners data', 400);
    }
    
    const updatedSection = await HomepageConfig.findOneAndUpdate(
      { section: 'hero' },
      { banners },
      { new: true, upsert: true }
    );
    
    successResponse(res, updatedSection.banners, 'Banners updated successfully');
  } catch (error) {
    next(error);
  }
};

export const reorderBanners = async (req, res, next) => {
  try {
    const { orders } = req.body;
    
    if (!orders || !Array.isArray(orders)) {
      return errorResponse(res, 'Invalid orders data', 400);
    }
    
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    if (!heroSection) {
      return errorResponse(res, 'Hero section not found', 404);
    }
    
    orders.forEach(({ id, order }) => {
      const bannerIndex = heroSection.banners.findIndex(b => b.id === id);
      if (bannerIndex !== -1) {
        heroSection.banners[bannerIndex].order = order;
      }
    });
    
    heroSection.banners.sort((a, b) => a.order - b.order);
    await heroSection.save();
    
    successResponse(res, heroSection.banners, 'Banners reordered successfully');
  } catch (error) {
    next(error);
  }
};

export const toggleBannerStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;
    const bannerId = parseInt(id);
    
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    if (!heroSection) {
      return errorResponse(res, 'Hero section not found', 404);
    }
    
    const bannerIndex = heroSection.banners.findIndex(b => b.id === bannerId);
    if (bannerIndex === -1) {
      return errorResponse(res, 'Banner not found', 404);
    }
    
    heroSection.banners[bannerIndex].isActive = isActive;
    await heroSection.save();
    
    successResponse(res, heroSection.banners[bannerIndex], 'Banner status updated successfully');
  } catch (error) {
    next(error);
  }
};

export const bulkUploadBanners = async (req, res, next) => {
  try {
    const { banners } = req.body;
    
    if (!banners || !Array.isArray(banners)) {
      return errorResponse(res, 'Invalid banners data', 400);
    }
    
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    const currentBanners = heroSection?.banners || [];
    
    const newBanners = banners.map((banner, index) => ({
      id: Date.now() + index,
      ...banner,
      order: currentBanners.length + index
    }));
    
    const updatedSection = await HomepageConfig.findOneAndUpdate(
      { section: 'hero' },
      { $push: { banners: { $each: newBanners } } },
      { new: true, upsert: true }
    );
    
    successResponse(res, newBanners, `${newBanners.length} banners added successfully`, 201);
  } catch (error) {
    next(error);
  }
};

// ============== FEATURED CONTENT MANAGEMENT (Update only) ==============

export const updateFeaturedContent = async (req, res, next) => {
  try {
    const featuredContent = req.body;
    
    // Store featured content in a separate collection or config
    // For now, we'll update the actual items in their respective collections
    if (featuredContent.featuredPoem) {
      await Poem.updateMany({}, { isFeatured: false });
      await Poem.findByIdAndUpdate(featuredContent.featuredPoem, { isFeatured: true });
    }
    
    if (featuredContent.featuredAuthor) {
      await Author.updateMany({}, { isFeatured: false });
      await Author.findByIdAndUpdate(featuredContent.featuredAuthor, { isFeatured: true });
    }
    
    if (featuredContent.featuredBook) {
      await Book.updateMany({}, { isFeatured: false });
      await Book.findByIdAndUpdate(featuredContent.featuredBook, { isFeatured: true });
    }
    
    successResponse(res, featuredContent, 'Featured content updated successfully');
  } catch (error) {
    next(error);
  }
};

// ============== QUOTE SETTINGS ==============

export const updateQuoteSettings = async (req, res, next) => {
  try {
    const quoteSettings = req.body;
    
    // Store quote settings in a dedicated collection or config
    // For now, we'll use a simple in-memory storage or you can create a Settings model
    global.quoteSettings = quoteSettings;
    
    successResponse(res, quoteSettings, 'Quote settings updated successfully');
  } catch (error) {
    next(error);
  }
};

export const getQuoteSettings = async (req, res, next) => {
  try {
    const quoteSettings = global.quoteSettings || {
      source: 'auto',
      frequency: 'daily'
    };
    
    successResponse(res, quoteSettings);
  } catch (error) {
    next(error);
  }
};

// ============== STATS ==============

export const getHomepageStats = async (req, res, next) => {
  try {
    const heroSection = await HomepageConfig.findOne({ section: 'hero' });
    const totalSections = await HomepageConfig.countDocuments();
    const activeSections = await HomepageConfig.countDocuments({ isActive: true });
    
    const stats = {
      totalSections,
      activeSections,
      totalBanners: heroSection?.banners?.length || 0,
      activeBanners: heroSection?.banners?.filter(b => b.isActive !== false).length || 0
    };
    
    successResponse(res, stats);
  } catch (error) {
    next(error);
  }
};