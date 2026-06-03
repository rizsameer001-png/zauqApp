// //server/controllers/book.controller.js

// import Book from '../models/Book.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getBooks = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'genre', 'author', 'isFree', 'isPremium']);
//     filters.isPublished = true;

//     const books = await Book.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(filters);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBookBySlug = async (req, res, next) => {
//   try {
//     const book = await Book.findOne({ slug: req.params.slug, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .populate('coAuthors', 'name slug avatar')
//       .populate('category', 'name slug');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     book.stats.views += 1;
//     await book.save();

//     successResponse(res, book);
//   } catch (error) {
//     next(error);
//   }
// };

// export const createBook = async (req, res, next) => {
//   try {
//     const book = await Book.create(req.body);
//     successResponse(res, book, 'Book created', 201);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateBook = async (req, res, next) => {
//   try {
//     const book = await Book.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     successResponse(res, book, 'Book updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteBook = async (req, res, next) => {
//   try {
//     await Book.findByIdAndDelete(req.params.id);
//     successResponse(res, null, 'Book deleted');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getFeaturedBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, books);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBookReader = async (req, res, next) => {
//   try {
//     const book = await Book.findOne({ slug: req.params.slug, isPublished: true });

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check subscription for premium books
//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     successResponse(res, {
//       pdfUrl: book.pdfUrl,
//       epubUrl: book.epubUrl,
//       totalPages: book.totalPages,
//       previewPages: book.previewPages
//     });
//   } catch (error) {
//     next(error);
//   }
// };

// export const getBookPreview = async (req, res, next) => {
//   try {
//     const book = await Book.findOne({ slug: req.params.slug, isPublished: true })
//       .select('title slug coverImage previewPages pdfUrl epubUrl');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     successResponse(res, book);
//   } catch (error) {
//     next(error);
//   }
// };

// export const downloadBook = async (req, res, next) => {
//   try {
//     const book = await Book.findOne({ slug: req.params.slug, isPublished: true });

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     book.stats.downloads += 1;
//     await book.save();

//     // Add to user's downloads
//     await User.findByIdAndUpdate(req.user.id, {
//       $push: {
//         downloads: {
//           contentType: 'book',
//           contentId: book._id
//         }
//       }
//     });

//     successResponse(res, { downloadUrl: book.pdfUrl || book.epubUrl }, 'Download started');
//   } catch (error) {
//     next(error);
//   }
// };

// export const rateBook = async (req, res, next) => {
//   try {
//     const book = await Book.findById(req.params.id);

//     // Remove existing rating if any
//     book.ratings = book.ratings.filter(r => r.user.toString() !== req.user.id);

//     // Add new rating
//     book.ratings.push({
//       user: req.user.id,
//       rating: req.body.rating,
//       review: req.body.review
//     });

//     // Recalculate average
//     const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
//     book.stats.averageRating = total / book.ratings.length;
//     book.stats.ratings = book.ratings.length;

//     await book.save();
//     successResponse(res, { averageRating: book.stats.averageRating, totalRatings: book.ratings.length });
//   } catch (error) {
//     next(error);
//   }
// };








// working revert if 
// //server/controllers/book.controller.js
// import Book from '../models/Book.js';
// import Author from '../models/Author.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getBooks = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'genre', 'author', 'isFree', 'isPremium']);
    
//     // Only show published books for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const books = await Book.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(filters);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooks:', error);
//     next(error);
//   }
// };

// export const getBookBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const book = await Book.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('coAuthors', 'name slug avatar')
//       .populate('category', 'name slug');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check if published or admin
//     if (!book.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Increment views
//     book.stats.views += 1;
//     await book.save();

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookBySlug:', error);
//     next(error);
//   }
// };

// export const createBook = async (req, res, next) => {
//   try {
//     console.log('Creating book with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, author, slug } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
    
//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }
    
//     // Prepare book data
//     const bookData = { ...req.body };
    
//     // If slug is provided, clean it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       bookData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const book = await Book.create(bookData);
    
//     // Populate author data for response
//     const populatedBook = await Book.findById(book._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedBook, 'Book created successfully', 201);
//   } catch (error) {
//     console.error('Error creating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A book with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating book with ID:', id);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // If author is being changed, validate new author
//     if (req.body.author && req.body.author !== book.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
//     }
    
//     // Handle slug update if provided
//     let updateData = { ...req.body };
//     if (req.body.slug && req.body.slug !== book.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingBook = await Book.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingBook) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !book.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedBook = await Book.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedBook, 'Book updated successfully');
//   } catch (error) {
//     console.error('Error updating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting book with ID:', id);
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     await Book.findByIdAndDelete(id);
//     successResponse(res, null, 'Book deleted successfully');
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     next(error);
//   }
// };

// export const getFeaturedBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, books);
//   } catch (error) {
//     console.error('Error in getFeaturedBooks:', error);
//     next(error);
//   }
// };

// export const getBookReader = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check subscription for premium books
//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     successResponse(res, {
//       pdfUrl: book.pdfUrl,
//       epubUrl: book.epubUrl,
//       totalPages: book.totalPages,
//       previewPages: book.previewPages,
//       title: book.title,
//       author: book.author
//     });
//   } catch (error) {
//     console.error('Error in getBookReader:', error);
//     next(error);
//   }
// };

// export const getBookPreview = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title slug coverImage previewPages pdfUrl epubUrl description author');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookPreview:', error);
//     next(error);
//   }
// };

// export const downloadBook = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     // Increment download count
//     book.stats.downloads += 1;
//     await book.save();

//     // Add to user's downloads if user is logged in
//     if (req.user) {
//       await User.findByIdAndUpdate(req.user.id, {
//         $push: {
//           downloads: {
//             contentType: 'book',
//             contentId: book._id,
//             title: book.title,
//             downloadedAt: new Date()
//           }
//         }
//       });
//     }

//     successResponse(res, { 
//       downloadUrl: book.pdfUrl || book.epubUrl,
//       title: book.title,
//       format: book.pdfUrl ? 'PDF' : 'EPUB'
//     }, 'Download started');
//   } catch (error) {
//     console.error('Error in downloadBook:', error);
//     next(error);
//   }
// };

// export const rateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { rating, review } = req.body;
    
//     if (!rating || rating < 1 || rating > 5) {
//       return errorResponse(res, 'Rating must be between 1 and 5', 400);
//     }
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Remove existing rating if any
//     book.ratings = book.ratings.filter(r => r.user.toString() !== req.user.id);

//     // Add new rating
//     book.ratings.push({
//       user: req.user.id,
//       rating: rating,
//       review: review || ''
//     });

//     // Recalculate average
//     const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
//     book.stats.averageRating = total / book.ratings.length;
//     book.stats.ratings = book.ratings.length;

//     await book.save();
    
//     successResponse(res, { 
//       averageRating: book.stats.averageRating, 
//       totalRatings: book.ratings.length 
//     }, 'Rating submitted successfully');
//   } catch (error) {
//     console.error('Error in rateBook:', error);
//     next(error);
//   }
// };

// // Get books by author slug
// export const getBooksByAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const books = await Book.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Book.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooksByAuthor:', error);
//     next(error);
//   }
// };

// // Get related books
// export const getRelatedBooks = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const related = await Book.find({
//       _id: { $ne: book._id },
//       $or: [
//         { author: book.author },
//         { category: book.category },
//         { type: book.type },
//         { genres: { $in: book.genres } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);
    
//     successResponse(res, related);
//   } catch (error) {
//     console.error('Error in getRelatedBooks:', error);
//     next(error);
//   }
// };













// // server/controllers/book.controller.js
// import Book from '../models/Book.js';
// import Author from '../models/Author.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getBooks = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'genre', 'author', 'isFree', 'isPremium']);
    
//     // Only show published books for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const books = await Book.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(filters);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooks:', error);
//     next(error);
//   }
// };

// export const getBookBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const book = await Book.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('coAuthors', 'name slug avatar')
//       .populate('category', 'name slug');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check if published or admin
//     if (!book.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Increment views
//     book.stats.views += 1;
//     await book.save();

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookBySlug:', error);
//     next(error);
//   }
// };

// export const createBook = async (req, res, next) => {
//   try {
//     console.log('Creating book with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, author, slug, pageImages } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
    
//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }
    
//     // Prepare book data
//     const bookData = { ...req.body };
    
//     // Handle pageImages - ensure it's an array and set totalPages
//     if (pageImages && Array.isArray(pageImages) && pageImages.length > 0) {
//       bookData.pageImages = pageImages;
//       bookData.totalPages = pageImages.length;
//     }
    
//     // If slug is provided, clean it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       bookData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const book = await Book.create(bookData);
    
//     // Populate author data for response
//     const populatedBook = await Book.findById(book._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedBook, 'Book created successfully', 201);
//   } catch (error) {
//     console.error('Error creating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A book with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating book with ID:', id);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // If author is being changed, validate new author
//     if (req.body.author && req.body.author !== book.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
//     }
    
//     // Handle slug update if provided
//     let updateData = { ...req.body };
//     if (req.body.slug && req.body.slug !== book.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingBook = await Book.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingBook) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // Handle pageImages update
//     if (req.body.pageImages && Array.isArray(req.body.pageImages)) {
//       updateData.pageImages = req.body.pageImages;
//       updateData.totalPages = req.body.pageImages.length;
//     }
    
//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !book.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedBook = await Book.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedBook, 'Book updated successfully');
//   } catch (error) {
//     console.error('Error updating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting book with ID:', id);
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     await Book.findByIdAndDelete(id);
//     successResponse(res, null, 'Book deleted successfully');
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     next(error);
//   }
// };

// export const getFeaturedBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, books);
//   } catch (error) {
//     console.error('Error in getFeaturedBooks:', error);
//     next(error);
//   }
// };

// export const getBookReader = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check subscription for premium books
//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     successResponse(res, {
//       pdfUrl: book.pdfUrl,
//       epubUrl: book.epubUrl,
//       totalPages: book.totalPages,
//       previewPages: book.previewPages,
//       title: book.title,
//       author: book.author,
//       pageImages: book.pageImages || []
//     });
//   } catch (error) {
//     console.error('Error in getBookReader:', error);
//     next(error);
//   }
// };

// export const getBookPreview = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title slug coverImage previewPages pdfUrl epubUrl description author pageImages totalPages');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookPreview:', error);
//     next(error);
//   }
// };

// export const downloadBook = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     // Increment download count
//     book.stats.downloads += 1;
//     await book.save();

//     // Add to user's downloads if user is logged in
//     if (req.user) {
//       await User.findByIdAndUpdate(req.user.id, {
//         $push: {
//           downloads: {
//             contentType: 'book',
//             contentId: book._id,
//             title: book.title,
//             downloadedAt: new Date()
//           }
//         }
//       });
//     }

//     successResponse(res, { 
//       downloadUrl: book.pdfUrl || book.epubUrl,
//       title: book.title,
//       format: book.pdfUrl ? 'PDF' : 'EPUB'
//     }, 'Download started');
//   } catch (error) {
//     console.error('Error in downloadBook:', error);
//     next(error);
//   }
// };

// export const rateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { rating, review } = req.body;
    
//     if (!rating || rating < 1 || rating > 5) {
//       return errorResponse(res, 'Rating must be between 1 and 5', 400);
//     }
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Remove existing rating if any
//     book.ratings = book.ratings.filter(r => r.user.toString() !== req.user.id);

//     // Add new rating
//     book.ratings.push({
//       user: req.user.id,
//       rating: rating,
//       review: review || ''
//     });

//     // Recalculate average
//     const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
//     book.stats.averageRating = total / book.ratings.length;
//     book.stats.ratings = book.ratings.length;

//     await book.save();
    
//     successResponse(res, { 
//       averageRating: book.stats.averageRating, 
//       totalRatings: book.ratings.length 
//     }, 'Rating submitted successfully');
//   } catch (error) {
//     console.error('Error in rateBook:', error);
//     next(error);
//   }
// };

// // Get books by author slug
// export const getBooksByAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const books = await Book.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Book.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooksByAuthor:', error);
//     next(error);
//   }
// };

// // Get related books
// export const getRelatedBooks = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const related = await Book.find({
//       _id: { $ne: book._id },
//       $or: [
//         { author: book.author },
//         { category: book.category },
//         { type: book.type },
//         { genres: { $in: book.genres } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);
    
//     successResponse(res, related);
//   } catch (error) {
//     console.error('Error in getRelatedBooks:', error);
//     next(error);
//   }
// };

// // ============================================
// // NEW: Get book pages for page-by-page reader
// // ============================================
// export const getBookPages = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title pageImages totalPages isPremium');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Check if user has access to premium books
//     if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
//       return errorResponse(res, 'Premium subscription required to read this book', 403);
//     }
    
//     // If no pageImages but PDF exists, we could generate pages (future feature)
//     if (!book.pageImages || book.pageImages.length === 0) {
//       return successResponse(res, {
//         title: book.title,
//         pages: [],
//         totalPages: 0,
//         message: 'Page images not available. Please download the PDF/EPUB to read.'
//       });
//     }
    
//     successResponse(res, {
//       title: book.title,
//       pages: book.pageImages,
//       totalPages: book.totalPages || book.pageImages.length
//     });
//   } catch (error) {
//     console.error('Error in getBookPages:', error);
//     next(error);
//   }
// };

// // ============================================
// // NEW: Get single page image
// // ============================================
// export const getBookPage = async (req, res, next) => {
//   try {
//     const { slug, pageNumber } = req.params;
//     const pageNum = parseInt(pageNumber);
    
//     if (isNaN(pageNum) || pageNum < 1) {
//       return errorResponse(res, 'Invalid page number', 400);
//     }
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('pageImages totalPages isPremium');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Check premium access
//     if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }
    
//     if (!book.pageImages || book.pageImages.length === 0) {
//       return errorResponse(res, 'No pages available', 404);
//     }
    
//     if (pageNum > book.pageImages.length) {
//       return errorResponse(res, 'Page not found', 404);
//     }
    
//     successResponse(res, {
//       page: pageNum,
//       imageUrl: book.pageImages[pageNum - 1],
//       totalPages: book.totalPages || book.pageImages.length,
//       hasNext: pageNum < book.pageImages.length,
//       hasPrev: pageNum > 1
//     });
//   } catch (error) {
//     console.error('Error in getBookPage:', error);
//     next(error);
//   }
// };













// // server/controllers/book.controller.js
// import Book from '../models/Book.js';
// import Author from '../models/Author.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getBooks = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'genre', 'author', 'isFree', 'isPremium']);
    
//     // Only show published books for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const books = await Book.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(filters);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooks:', error);
//     next(error);
//   }
// };

// export const getBookBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const book = await Book.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('coAuthors', 'name slug avatar')
//       .populate('category', 'name slug');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check if published or admin
//     if (!book.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Increment views
//     book.stats.views += 1;
//     await book.save();

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookBySlug:', error);
//     next(error);
//   }
// };

// export const createBook = async (req, res, next) => {
//   try {
//     console.log('Creating book with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, author, slug, pageImages } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
    
//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }
    
//     // Prepare book data
//     const bookData = { ...req.body };
    
//     // Handle pageImages - ensure it's an array and set totalPages
//     if (pageImages && Array.isArray(pageImages) && pageImages.length > 0) {
//       bookData.pageImages = pageImages;
//       bookData.totalPages = pageImages.length;
//     }
    
//     // If slug is provided, clean it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       bookData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const book = await Book.create(bookData);
    
//     // Populate author data for response
//     const populatedBook = await Book.findById(book._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedBook, 'Book created successfully', 201);
//   } catch (error) {
//     console.error('Error creating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A book with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating book with ID:', id);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // If author is being changed, validate new author
//     if (req.body.author && req.body.author !== book.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
//     }
    
//     // Handle slug update if provided
//     let updateData = { ...req.body };
//     if (req.body.slug && req.body.slug !== book.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingBook = await Book.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingBook) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // Handle pageImages update
//     if (req.body.pageImages && Array.isArray(req.body.pageImages)) {
//       updateData.pageImages = req.body.pageImages;
//       updateData.totalPages = req.body.pageImages.length;
//     }
    
//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !book.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedBook = await Book.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedBook, 'Book updated successfully');
//   } catch (error) {
//     console.error('Error updating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting book with ID:', id);
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     await Book.findByIdAndDelete(id);
//     successResponse(res, null, 'Book deleted successfully');
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     next(error);
//   }
// };

// export const getFeaturedBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, books);
//   } catch (error) {
//     console.error('Error in getFeaturedBooks:', error);
//     next(error);
//   }
// };

// export const getBookReader = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check subscription for premium books
//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     successResponse(res, {
//       pdfUrl: book.pdfUrl,
//       epubUrl: book.epubUrl,
//       totalPages: book.totalPages,
//       previewPages: book.previewPages,
//       title: book.title,
//       author: book.author,
//       pageImages: book.pageImages || []
//     });
//   } catch (error) {
//     console.error('Error in getBookReader:', error);
//     next(error);
//   }
// };

// export const getBookPreview = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title slug coverImage previewPages pdfUrl epubUrl description author pageImages totalPages');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookPreview:', error);
//     next(error);
//   }
// };

// export const downloadBook = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     // Increment download count
//     book.stats.downloads += 1;
//     await book.save();

//     // Add to user's downloads if user is logged in
//     if (req.user) {
//       await User.findByIdAndUpdate(req.user.id, {
//         $push: {
//           downloads: {
//             contentType: 'book',
//             contentId: book._id,
//             title: book.title,
//             slug: book.slug, // ← ADD SLUG for future reference
//             downloadedAt: new Date()
//           }
//         }
//       });
//     }

//     successResponse(res, { 
//       downloadUrl: book.pdfUrl || book.epubUrl,
//       title: book.title,
//       format: book.pdfUrl ? 'PDF' : 'EPUB'
//     }, 'Download started');
//   } catch (error) {
//     console.error('Error in downloadBook:', error);
//     next(error);
//   }
// };

// export const rateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { rating, review } = req.body;
    
//     if (!rating || rating < 1 || rating > 5) {
//       return errorResponse(res, 'Rating must be between 1 and 5', 400);
//     }
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Remove existing rating if any
//     book.ratings = book.ratings.filter(r => r.user.toString() !== req.user.id);

//     // Add new rating
//     book.ratings.push({
//       user: req.user.id,
//       rating: rating,
//       review: review || ''
//     });

//     // Recalculate average
//     const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
//     book.stats.averageRating = total / book.ratings.length;
//     book.stats.ratings = book.ratings.length;

//     await book.save();
    
//     successResponse(res, { 
//       averageRating: book.stats.averageRating, 
//       totalRatings: book.ratings.length 
//     }, 'Rating submitted successfully');
//   } catch (error) {
//     console.error('Error in rateBook:', error);
//     next(error);
//   }
// };

// // Get books by author slug
// export const getBooksByAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const books = await Book.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Book.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooksByAuthor:', error);
//     next(error);
//   }
// };

// // Get related books
// export const getRelatedBooks = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const related = await Book.find({
//       _id: { $ne: book._id },
//       $or: [
//         { author: book.author },
//         { category: book.category },
//         { type: book.type },
//         { genres: { $in: book.genres } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);
    
//     successResponse(res, related);
//   } catch (error) {
//     console.error('Error in getRelatedBooks:', error);
//     next(error);
//   }
// };

// // ============================================
// // BOOK PAGES FOR PAGE-BY-PAGE READER
// // ============================================
// export const getBookPages = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title pageImages totalPages isPremium');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Check if user has access to premium books
//     if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
//       return errorResponse(res, 'Premium subscription required to read this book', 403);
//     }
    
//     // If no pageImages but PDF exists, we could generate pages (future feature)
//     if (!book.pageImages || book.pageImages.length === 0) {
//       return successResponse(res, {
//         title: book.title,
//         pages: [],
//         totalPages: 0,
//         message: 'Page images not available. Please download the PDF/EPUB to read.'
//       });
//     }
    
//     successResponse(res, {
//       title: book.title,
//       pages: book.pageImages,
//       totalPages: book.totalPages || book.pageImages.length
//     });
//   } catch (error) {
//     console.error('Error in getBookPages:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET SINGLE PAGE IMAGE
// // ============================================
// export const getBookPage = async (req, res, next) => {
//   try {
//     const { slug, pageNumber } = req.params;
//     const pageNum = parseInt(pageNumber);
    
//     if (isNaN(pageNum) || pageNum < 1) {
//       return errorResponse(res, 'Invalid page number', 400);
//     }
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('pageImages totalPages isPremium');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Check premium access
//     if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }
    
//     if (!book.pageImages || book.pageImages.length === 0) {
//       return errorResponse(res, 'No pages available', 404);
//     }
    
//     if (pageNum > book.pageImages.length) {
//       return errorResponse(res, 'Page not found', 404);
//     }
    
//     successResponse(res, {
//       page: pageNum,
//       imageUrl: book.pageImages[pageNum - 1],
//       totalPages: book.totalPages || book.pageImages.length,
//       hasNext: pageNum < book.pageImages.length,
//       hasPrev: pageNum > 1
//     });
//   } catch (error) {
//     console.error('Error in getBookPage:', error);
//     next(error);
//   }
// };

// // ============================================
// // FIX: LIKE / UNLIKE BOOK ENDPOINT
// // ============================================
// export const likeBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Initialize likes array if it doesn't exist
//     if (!book.likes) {
//       book.likes = [];
//     }
    
//     const alreadyLiked = book.likes.some(uid => uid.toString() === userId);
    
//     if (alreadyLiked) {
//       // Unlike: remove user from likes array
//       book.likes = book.likes.filter(uid => uid.toString() !== userId);
//       await book.save();
//       return successResponse(res, { 
//         liked: false, 
//         likesCount: book.likes.length 
//       }, 'Book unliked');
//     } else {
//       // Like: add user to likes array
//       book.likes.push(userId);
//       await book.save();
//       return successResponse(res, { 
//         liked: true, 
//         likesCount: book.likes.length 
//       }, 'Book liked');
//     }
//   } catch (error) {
//     console.error('Error in likeBook:', error);
//     next(error);
//   }
// };

// // ============================================
// // FIX: BOOKMARK / REMOVE BOOKMARK ENDPOINT
// // ============================================
// export const bookmarkBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Initialize bookmarks array if it doesn't exist
//     if (!book.bookmarks) {
//       book.bookmarks = [];
//     }
    
//     const alreadyBookmarked = book.bookmarks.some(uid => uid.toString() === userId);
    
//     if (alreadyBookmarked) {
//       // Remove bookmark
//       book.bookmarks = book.bookmarks.filter(uid => uid.toString() !== userId);
//       await book.save();
//       return successResponse(res, { 
//         bookmarked: false, 
//         bookmarksCount: book.bookmarks.length 
//       }, 'Bookmark removed');
//     } else {
//       // Add bookmark
//       book.bookmarks.push(userId);
//       await book.save();
//       return successResponse(res, { 
//         bookmarked: true, 
//         bookmarksCount: book.bookmarks.length 
//       }, 'Book saved');
//     }
//   } catch (error) {
//     console.error('Error in bookmarkBook:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET BOOK LIKE STATUS (Optional helper)
// // ============================================
// export const getBookLikeStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id).select('likes');
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const isLiked = book.likes ? book.likes.some(uid => uid.toString() === userId) : false;
//     const likesCount = book.likes ? book.likes.length : 0;
    
//     successResponse(res, { isLiked, likesCount });
//   } catch (error) {
//     console.error('Error in getBookLikeStatus:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET BOOK BOOKMARK STATUS (Optional helper)
// // ============================================
// export const getBookBookmarkStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id).select('bookmarks');
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const isBookmarked = book.bookmarks ? book.bookmarks.some(uid => uid.toString() === userId) : false;
//     const bookmarksCount = book.bookmarks ? book.bookmarks.length : 0;
    
//     successResponse(res, { isBookmarked, bookmarksCount });
//   } catch (error) {
//     console.error('Error in getBookBookmarkStatus:', error);
//     next(error);
//   }
// };












// // server/controllers/book.controller.js
// import Book from '../models/Book.js';
// import Author from '../models/Author.js';
// import User from '../models/User.js';
// import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
// import { getPagination, getSort, getFilters } from '../utils/pagination.js';

// export const getBooks = async (req, res, next) => {
//   try {
//     const { page, limit, skip } = getPagination(req);
//     const sort = getSort(req);
//     const filters = getFilters(req, ['type', 'language', 'genre', 'author', 'isFree', 'isPremium']);
    
//     // Only show published books for public, admin can see all
//     if (!req.user || req.user.role !== 'admin') {
//       filters.isPublished = true;
//     }

//     const books = await Book.find(filters)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug')
//       .sort(sort)
//       .skip(skip)
//       .limit(limit);

//     const total = await Book.countDocuments(filters);
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooks:', error);
//     next(error);
//   }
// };

// export const getBookBySlug = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     if (!slug) {
//       return errorResponse(res, 'Slug is required', 400);
//     }

//     const book = await Book.findOne({ slug })
//       .populate('author', 'name slug avatar bio')
//       .populate('coAuthors', 'name slug avatar')
//       .populate('category', 'name slug');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check if published or admin
//     if (!book.isPublished && (!req.user || req.user.role !== 'admin')) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Increment views
//     book.stats.views += 1;
//     await book.save();

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookBySlug:', error);
//     next(error);
//   }
// };

// export const createBook = async (req, res, next) => {
//   try {
//     console.log('Creating book with data:', JSON.stringify(req.body, null, 2));
    
//     const { title, author, slug, pageImages, totalPages } = req.body;
    
//     // Validate required fields
//     if (!title || !title.trim()) {
//       return errorResponse(res, 'Title is required', 400);
//     }
//     if (!author) {
//       return errorResponse(res, 'Author is required', 400);
//     }
    
//     // Validate author exists
//     const authorExists = await Author.findById(author);
//     if (!authorExists) {
//       return errorResponse(res, 'Author not found. Please select a valid author.', 404);
//     }
    
//     // Prepare book data
//     const bookData = { ...req.body };
    
//     // Handle pageImages - ensure it's an array and set totalPages
//     if (pageImages && Array.isArray(pageImages) && pageImages.length > 0) {
//       bookData.pageImages = pageImages;
//       bookData.totalPages = pageImages.length;
//     } 
//     // FIX: If totalPages is provided from PDF extraction, use it
//     else if (totalPages && parseInt(totalPages) > 0) {
//       bookData.totalPages = parseInt(totalPages);
//     }
    
//     // If slug is provided, clean it; otherwise will be auto-generated
//     if (slug && slug.trim()) {
//       bookData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
//     }
    
//     const book = await Book.create(bookData);
    
//     // Populate author data for response
//     const populatedBook = await Book.findById(book._id)
//       .populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, populatedBook, 'Book created successfully', 201);
//   } catch (error) {
//     console.error('Error creating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     if (error.code === 11000) {
//       return errorResponse(res, 'A book with this slug already exists. Please use a different slug.', 400);
//     }
    
//     next(error);
//   }
// };

// export const updateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Updating book with ID:', id);
//     console.log('Update data:', JSON.stringify(req.body, null, 2));
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // If author is being changed, validate new author
//     if (req.body.author && req.body.author !== book.author.toString()) {
//       const authorExists = await Author.findById(req.body.author);
//       if (!authorExists) {
//         return errorResponse(res, 'New author not found', 404);
//       }
//     }
    
//     // Handle slug update if provided
//     let updateData = { ...req.body };
//     if (req.body.slug && req.body.slug !== book.slug) {
//       const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
//       const existingBook = await Book.findOne({ slug: cleanSlug, _id: { $ne: id } });
//       if (existingBook) {
//         return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
//       }
//       updateData.slug = cleanSlug;
//     }
    
//     // Handle pageImages update
//     if (req.body.pageImages && Array.isArray(req.body.pageImages)) {
//       updateData.pageImages = req.body.pageImages;
//       updateData.totalPages = req.body.pageImages.length;
//     }
//     // FIX: If totalPages is provided from PDF extraction and no pageImages, use it
//     else if (req.body.totalPages && !req.body.pageImages) {
//       updateData.totalPages = parseInt(req.body.totalPages);
//     }
    
//     // If publishing for first time, set publishedAt
//     if (updateData.isPublished && !book.isPublished) {
//       updateData.publishedAt = new Date();
//     }
    
//     const updatedBook = await Book.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true, runValidators: true }
//     ).populate('author', 'name slug avatar')
//       .populate('category', 'name slug');
    
//     successResponse(res, updatedBook, 'Book updated successfully');
//   } catch (error) {
//     console.error('Error updating book:', error);
    
//     if (error.name === 'ValidationError') {
//       const errors = Object.values(error.errors).map(e => e.message);
//       return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
//     }
    
//     next(error);
//   }
// };

// export const deleteBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     console.log('Deleting book with ID:', id);
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     await Book.findByIdAndDelete(id);
//     successResponse(res, null, 'Book deleted successfully');
//   } catch (error) {
//     console.error('Error deleting book:', error);
//     next(error);
//   }
// };

// export const getFeaturedBooks = async (req, res, next) => {
//   try {
//     const books = await Book.find({ isFeatured: true, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .limit(10);

//     successResponse(res, books);
//   } catch (error) {
//     console.error('Error in getFeaturedBooks:', error);
//     next(error);
//   }
// };

// export const getBookReader = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Check subscription for premium books
//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     successResponse(res, {
//       pdfUrl: book.pdfUrl,
//       epubUrl: book.epubUrl,
//       totalPages: book.totalPages,
//       previewPages: book.previewPages,
//       title: book.title,
//       author: book.author,
//       pageImages: book.pageImages || []
//     });
//   } catch (error) {
//     console.error('Error in getBookReader:', error);
//     next(error);
//   }
// };

// export const getBookPreview = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title slug coverImage previewPages pdfUrl epubUrl description author pageImages totalPages');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     successResponse(res, book);
//   } catch (error) {
//     console.error('Error in getBookPreview:', error);
//     next(error);
//   }
// };

// export const downloadBook = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     if (book.isPremium && req.user?.subscription?.plan === 'free') {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }

//     // Increment download count
//     book.stats.downloads += 1;
//     await book.save();

//     // Add to user's downloads if user is logged in
//     if (req.user) {
//       await User.findByIdAndUpdate(req.user.id, {
//         $push: {
//           downloads: {
//             contentType: 'book',
//             contentId: book._id,
//             title: book.title,
//             slug: book.slug,
//             downloadedAt: new Date()
//           }
//         }
//       });
//     }

//     successResponse(res, { 
//       downloadUrl: book.pdfUrl || book.epubUrl,
//       title: book.title,
//       format: book.pdfUrl ? 'PDF' : 'EPUB'
//     }, 'Download started');
//   } catch (error) {
//     console.error('Error in downloadBook:', error);
//     next(error);
//   }
// };

// export const rateBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const { rating, review } = req.body;
    
//     if (!rating || rating < 1 || rating > 5) {
//       return errorResponse(res, 'Rating must be between 1 and 5', 400);
//     }
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }

//     // Remove existing rating if any
//     book.ratings = book.ratings.filter(r => r.user.toString() !== req.user.id);

//     // Add new rating
//     book.ratings.push({
//       user: req.user.id,
//       rating: rating,
//       review: review || ''
//     });

//     // Recalculate average
//     const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
//     book.stats.averageRating = total / book.ratings.length;
//     book.stats.ratings = book.ratings.length;

//     await book.save();
    
//     successResponse(res, { 
//       averageRating: book.stats.averageRating, 
//       totalRatings: book.ratings.length 
//     }, 'Rating submitted successfully');
//   } catch (error) {
//     console.error('Error in rateBook:', error);
//     next(error);
//   }
// };

// // Get books by author slug
// export const getBooksByAuthor = async (req, res, next) => {
//   try {
//     const { authorId } = req.params;
//     const { page, limit, skip } = getPagination(req);
    
//     const author = await Author.findById(authorId);
//     if (!author) {
//       return errorResponse(res, 'Author not found', 404);
//     }
    
//     const books = await Book.find({ author: authorId, isPublished: true })
//       .populate('author', 'name slug avatar')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);
    
//     const total = await Book.countDocuments({ author: authorId, isPublished: true });
//     paginatedResponse(res, books, { page, limit, total });
//   } catch (error) {
//     console.error('Error in getBooksByAuthor:', error);
//     next(error);
//   }
// };

// // Get related books
// export const getRelatedBooks = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug });
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const related = await Book.find({
//       _id: { $ne: book._id },
//       $or: [
//         { author: book.author },
//         { category: book.category },
//         { type: book.type },
//         { genres: { $in: book.genres } }
//       ],
//       isPublished: true
//     })
//       .populate('author', 'name slug avatar')
//       .limit(6);
    
//     successResponse(res, related);
//   } catch (error) {
//     console.error('Error in getRelatedBooks:', error);
//     next(error);
//   }
// };

// // ============================================
// // BOOK PAGES FOR PAGE-BY-PAGE READER
// // ============================================
// export const getBookPages = async (req, res, next) => {
//   try {
//     const { slug } = req.params;
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('title pageImages totalPages isPremium');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Check if user has access to premium books
//     if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
//       return errorResponse(res, 'Premium subscription required to read this book', 403);
//     }
    
//     // If no pageImages but PDF exists, we could generate pages (future feature)
//     if (!book.pageImages || book.pageImages.length === 0) {
//       return successResponse(res, {
//         title: book.title,
//         pages: [],
//         totalPages: book.totalPages || 0,
//         message: 'Page images not available. Please download the PDF/EPUB to read.'
//       });
//     }
    
//     successResponse(res, {
//       title: book.title,
//       pages: book.pageImages,
//       totalPages: book.totalPages || book.pageImages.length
//     });
//   } catch (error) {
//     console.error('Error in getBookPages:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET SINGLE PAGE IMAGE
// // ============================================
// export const getBookPage = async (req, res, next) => {
//   try {
//     const { slug, pageNumber } = req.params;
//     const pageNum = parseInt(pageNumber);
    
//     if (isNaN(pageNum) || pageNum < 1) {
//       return errorResponse(res, 'Invalid page number', 400);
//     }
    
//     const book = await Book.findOne({ slug, isPublished: true })
//       .select('pageImages totalPages isPremium');

//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Check premium access
//     if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
//       return errorResponse(res, 'Premium subscription required', 403);
//     }
    
//     if (!book.pageImages || book.pageImages.length === 0) {
//       return errorResponse(res, 'No pages available', 404);
//     }
    
//     if (pageNum > book.pageImages.length) {
//       return errorResponse(res, 'Page not found', 404);
//     }
    
//     successResponse(res, {
//       page: pageNum,
//       imageUrl: book.pageImages[pageNum - 1],
//       totalPages: book.totalPages || book.pageImages.length,
//       hasNext: pageNum < book.pageImages.length,
//       hasPrev: pageNum > 1
//     });
//   } catch (error) {
//     console.error('Error in getBookPage:', error);
//     next(error);
//   }
// };

// // ============================================
// // LIKE / UNLIKE BOOK ENDPOINT
// // ============================================
// export const likeBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Initialize likes array if it doesn't exist
//     if (!book.likes) {
//       book.likes = [];
//     }
    
//     const alreadyLiked = book.likes.some(uid => uid.toString() === userId);
    
//     if (alreadyLiked) {
//       // Unlike: remove user from likes array
//       book.likes = book.likes.filter(uid => uid.toString() !== userId);
//       await book.save();
//       return successResponse(res, { 
//         liked: false, 
//         likesCount: book.likes.length 
//       }, 'Book unliked');
//     } else {
//       // Like: add user to likes array
//       book.likes.push(userId);
//       await book.save();
//       return successResponse(res, { 
//         liked: true, 
//         likesCount: book.likes.length 
//       }, 'Book liked');
//     }
//   } catch (error) {
//     console.error('Error in likeBook:', error);
//     next(error);
//   }
// };

// // ============================================
// // BOOKMARK / REMOVE BOOKMARK ENDPOINT
// // ============================================
// export const bookmarkBook = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id);
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     // Initialize bookmarks array if it doesn't exist
//     if (!book.bookmarks) {
//       book.bookmarks = [];
//     }
    
//     const alreadyBookmarked = book.bookmarks.some(uid => uid.toString() === userId);
    
//     if (alreadyBookmarked) {
//       // Remove bookmark
//       book.bookmarks = book.bookmarks.filter(uid => uid.toString() !== userId);
//       await book.save();
//       return successResponse(res, { 
//         bookmarked: false, 
//         bookmarksCount: book.bookmarks.length 
//       }, 'Bookmark removed');
//     } else {
//       // Add bookmark
//       book.bookmarks.push(userId);
//       await book.save();
//       return successResponse(res, { 
//         bookmarked: true, 
//         bookmarksCount: book.bookmarks.length 
//       }, 'Book saved');
//     }
//   } catch (error) {
//     console.error('Error in bookmarkBook:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET BOOK LIKE STATUS (Optional helper)
// // ============================================
// export const getBookLikeStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id).select('likes');
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const isLiked = book.likes ? book.likes.some(uid => uid.toString() === userId) : false;
//     const likesCount = book.likes ? book.likes.length : 0;
    
//     successResponse(res, { isLiked, likesCount });
//   } catch (error) {
//     console.error('Error in getBookLikeStatus:', error);
//     next(error);
//   }
// };

// // ============================================
// // GET BOOK BOOKMARK STATUS (Optional helper)
// // ============================================
// export const getBookBookmarkStatus = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user.id;
    
//     const book = await Book.findById(id).select('bookmarks');
//     if (!book) {
//       return errorResponse(res, 'Book not found', 404);
//     }
    
//     const isBookmarked = book.bookmarks ? book.bookmarks.some(uid => uid.toString() === userId) : false;
//     const bookmarksCount = book.bookmarks ? book.bookmarks.length : 0;
    
//     successResponse(res, { isBookmarked, bookmarksCount });
//   } catch (error) {
//     console.error('Error in getBookBookmarkStatus:', error);
//     next(error);
//   }
// };







// server/controllers/book.controller.js
import Book from '../models/Book.js';
import Author from '../models/Author.js';
import User from '../models/User.js';
import { successResponse, errorResponse, paginatedResponse } from '../utils/response.js';
import { getPagination, getSort, getFilters } from '../utils/pagination.js';
import { convertPdfToImages } from '../utils/pdfConverter.js';

export const getBooks = async (req, res, next) => {
  try {
    const { page, limit, skip } = getPagination(req);
    const sort = getSort(req);
    const filters = getFilters(req, ['type', 'language', 'genre', 'author', 'isFree', 'isPremium']);
    
    // Only show published books for public, admin can see all
    if (!req.user || req.user.role !== 'admin') {
      filters.isPublished = true;
    }

    const books = await Book.find(filters)
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug')
      .sort(sort)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(filters);
    paginatedResponse(res, books, { page, limit, total });
  } catch (error) {
    console.error('Error in getBooks:', error);
    next(error);
  }
};

export const getBookBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    if (!slug) {
      return errorResponse(res, 'Slug is required', 400);
    }

    const book = await Book.findOne({ slug })
      .populate('author', 'name slug avatar bio')
      .populate('coAuthors', 'name slug avatar')
      .populate('category', 'name slug');

    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }

    // Check if published or admin
    if (!book.isPublished && (!req.user || req.user.role !== 'admin')) {
      return errorResponse(res, 'Book not found', 404);
    }

    // Increment views
    book.stats.views += 1;
    await book.save();

    successResponse(res, book);
  } catch (error) {
    console.error('Error in getBookBySlug:', error);
    next(error);
  }
};

// ============================================
// UPDATED: CREATE BOOK WITH PDF TO IMAGE CONVERSION
// ============================================
export const createBook = async (req, res, next) => {
  try {
    console.log('Creating book with data:', JSON.stringify(req.body, null, 2));
    
    const { title, author, slug, pageImages, totalPages, pdfUrl } = req.body;
    
    // Validate required fields
    if (!title || !title.trim()) {
      return errorResponse(res, 'Title is required', 400);
    }
    if (!author) {
      return errorResponse(res, 'Author is required', 400);
    }
    
    // Validate author exists
    const authorExists = await Author.findById(author);
    if (!authorExists) {
      return errorResponse(res, 'Author not found. Please select a valid author.', 404);
    }
    
    // Prepare book data
    const bookData = { ...req.body };
    
    // Handle pageImages - if PDF provided but no pageImages, convert PDF to images
    if (pdfUrl && (!pageImages || pageImages.length === 0)) {
      console.log('🔄 Converting PDF to images...');
      const tempSlug = slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      const conversionResult = await convertPdfToImages(pdfUrl, null, tempSlug);
      
      if (conversionResult.pageImages && conversionResult.pageImages.length > 0) {
        bookData.pageImages = conversionResult.pageImages;
        bookData.totalPages = conversionResult.totalPages;
        console.log(`✅ Converted ${conversionResult.totalPages} pages to images`);
      } else if (totalPages && parseInt(totalPages) > 0) {
        bookData.totalPages = parseInt(totalPages);
      }
    } 
    // Handle pageImages directly
    else if (pageImages && Array.isArray(pageImages) && pageImages.length > 0) {
      bookData.pageImages = pageImages;
      bookData.totalPages = pageImages.length;
    } 
    // Use provided totalPages
    else if (totalPages && parseInt(totalPages) > 0) {
      bookData.totalPages = parseInt(totalPages);
    }
    
    // If slug is provided, clean it; otherwise will be auto-generated
    if (slug && slug.trim()) {
      bookData.slug = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, '-');
    }
    
    const book = await Book.create(bookData);
    
    // Populate author data for response
    const populatedBook = await Book.findById(book._id)
      .populate('author', 'name slug avatar')
      .populate('category', 'name slug');
    
    successResponse(res, populatedBook, 'Book created successfully', 201);
  } catch (error) {
    console.error('Error creating book:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    if (error.code === 11000) {
      return errorResponse(res, 'A book with this slug already exists. Please use a different slug.', 400);
    }
    
    next(error);
  }
};

// ============================================
// UPDATED: UPDATE BOOK WITH PDF TO IMAGE CONVERSION
// ============================================
export const updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Updating book with ID:', id);
    console.log('Update data:', JSON.stringify(req.body, null, 2));
    
    const book = await Book.findById(id);
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    // If author is being changed, validate new author
    if (req.body.author && req.body.author !== book.author.toString()) {
      const authorExists = await Author.findById(req.body.author);
      if (!authorExists) {
        return errorResponse(res, 'New author not found', 404);
      }
    }
    
    // Handle slug update if provided
    let updateData = { ...req.body };
    let newSlug = book.slug;
    
    if (req.body.slug && req.body.slug !== book.slug) {
      const cleanSlug = req.body.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
      const existingBook = await Book.findOne({ slug: cleanSlug, _id: { $ne: id } });
      if (existingBook) {
        return errorResponse(res, 'Slug already exists. Please use a different slug.', 400);
      }
      updateData.slug = cleanSlug;
      newSlug = cleanSlug;
    }
    
    // Handle PDF conversion if new PDF is uploaded and no pageImages
    if (req.body.pdfUrl && req.body.pdfUrl !== book.pdfUrl && 
        (!req.body.pageImages || req.body.pageImages.length === 0)) {
      console.log('🔄 New PDF detected, converting to images...');
      const conversionResult = await convertPdfToImages(req.body.pdfUrl, id, newSlug);
      
      if (conversionResult.pageImages && conversionResult.pageImages.length > 0) {
        updateData.pageImages = conversionResult.pageImages;
        updateData.totalPages = conversionResult.totalPages;
        console.log(`✅ Converted ${conversionResult.totalPages} pages to images`);
      }
    }
    // Handle pageImages update
    else if (req.body.pageImages && Array.isArray(req.body.pageImages)) {
      updateData.pageImages = req.body.pageImages;
      updateData.totalPages = req.body.pageImages.length;
    }
    // Use provided totalPages
    else if (req.body.totalPages && !req.body.pageImages) {
      updateData.totalPages = parseInt(req.body.totalPages);
    }
    
    // If publishing for first time, set publishedAt
    if (updateData.isPublished && !book.isPublished) {
      updateData.publishedAt = new Date();
    }
    
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('author', 'name slug avatar')
      .populate('category', 'name slug');
    
    successResponse(res, updatedBook, 'Book updated successfully');
  } catch (error) {
    console.error('Error updating book:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(e => e.message);
      return errorResponse(res, `Validation failed: ${errors.join(', ')}`, 400);
    }
    
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log('Deleting book with ID:', id);
    
    const book = await Book.findById(id);
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    await Book.findByIdAndDelete(id);
    successResponse(res, null, 'Book deleted successfully');
  } catch (error) {
    console.error('Error deleting book:', error);
    next(error);
  }
};

export const getFeaturedBooks = async (req, res, next) => {
  try {
    const books = await Book.find({ isFeatured: true, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .limit(10);

    successResponse(res, books);
  } catch (error) {
    console.error('Error in getFeaturedBooks:', error);
    next(error);
  }
};

export const getBookReader = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const book = await Book.findOne({ slug, isPublished: true });
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }

    // Check subscription for premium books
    if (book.isPremium && req.user?.subscription?.plan === 'free') {
      return errorResponse(res, 'Premium subscription required', 403);
    }

    successResponse(res, {
      pdfUrl: book.pdfUrl,
      epubUrl: book.epubUrl,
      totalPages: book.totalPages,
      previewPages: book.previewPages,
      title: book.title,
      author: book.author,
      pageImages: book.pageImages || []
    });
  } catch (error) {
    console.error('Error in getBookReader:', error);
    next(error);
  }
};

export const getBookPreview = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const book = await Book.findOne({ slug, isPublished: true })
      .select('title slug coverImage previewPages pdfUrl epubUrl description author pageImages totalPages');

    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }

    successResponse(res, book);
  } catch (error) {
    console.error('Error in getBookPreview:', error);
    next(error);
  }
};

export const downloadBook = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const book = await Book.findOne({ slug, isPublished: true });
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }

    if (book.isPremium && req.user?.subscription?.plan === 'free') {
      return errorResponse(res, 'Premium subscription required', 403);
    }

    // Increment download count
    book.stats.downloads += 1;
    await book.save();

    // Add to user's downloads if user is logged in
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          downloads: {
            contentType: 'book',
            contentId: book._id,
            title: book.title,
            slug: book.slug,
            downloadedAt: new Date()
          }
        }
      });
    }

    successResponse(res, { 
      downloadUrl: book.pdfUrl || book.epubUrl,
      title: book.title,
      format: book.pdfUrl ? 'PDF' : 'EPUB'
    }, 'Download started');
  } catch (error) {
    console.error('Error in downloadBook:', error);
    next(error);
  }
};

export const rateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    
    if (!rating || rating < 1 || rating > 5) {
      return errorResponse(res, 'Rating must be between 1 and 5', 400);
    }
    
    const book = await Book.findById(id);
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }

    // Remove existing rating if any
    book.ratings = book.ratings.filter(r => r.user.toString() !== req.user.id);

    // Add new rating
    book.ratings.push({
      user: req.user.id,
      rating: rating,
      review: review || ''
    });

    // Recalculate average
    const total = book.ratings.reduce((sum, r) => sum + r.rating, 0);
    book.stats.averageRating = total / book.ratings.length;
    book.stats.ratings = book.ratings.length;

    await book.save();
    
    successResponse(res, { 
      averageRating: book.stats.averageRating, 
      totalRatings: book.ratings.length 
    }, 'Rating submitted successfully');
  } catch (error) {
    console.error('Error in rateBook:', error);
    next(error);
  }
};

// Get books by author slug
export const getBooksByAuthor = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const { page, limit, skip } = getPagination(req);
    
    const author = await Author.findById(authorId);
    if (!author) {
      return errorResponse(res, 'Author not found', 404);
    }
    
    const books = await Book.find({ author: authorId, isPublished: true })
      .populate('author', 'name slug avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Book.countDocuments({ author: authorId, isPublished: true });
    paginatedResponse(res, books, { page, limit, total });
  } catch (error) {
    console.error('Error in getBooksByAuthor:', error);
    next(error);
  }
};

// Get related books
export const getRelatedBooks = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const book = await Book.findOne({ slug });
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    const related = await Book.find({
      _id: { $ne: book._id },
      $or: [
        { author: book.author },
        { category: book.category },
        { type: book.type },
        { genres: { $in: book.genres } }
      ],
      isPublished: true
    })
      .populate('author', 'name slug avatar')
      .limit(6);
    
    successResponse(res, related);
  } catch (error) {
    console.error('Error in getRelatedBooks:', error);
    next(error);
  }
};

// ============================================
// BOOK PAGES FOR PAGE-BY-PAGE READER
// ============================================
export const getBookPages = async (req, res, next) => {
  try {
    const { slug } = req.params;
    
    const book = await Book.findOne({ slug, isPublished: true })
      .select('title pageImages totalPages isPremium');

    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    // Check if user has access to premium books
    if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
      return errorResponse(res, 'Premium subscription required to read this book', 403);
    }
    
    // If no pageImages but PDF exists, we could generate pages (future feature)
    if (!book.pageImages || book.pageImages.length === 0) {
      return successResponse(res, {
        title: book.title,
        pages: [],
        totalPages: book.totalPages || 0,
        message: 'Page images not available. Please download the PDF/EPUB to read.'
      });
    }
    
    successResponse(res, {
      title: book.title,
      pages: book.pageImages,
      totalPages: book.totalPages || book.pageImages.length
    });
  } catch (error) {
    console.error('Error in getBookPages:', error);
    next(error);
  }
};

// ============================================
// GET SINGLE PAGE IMAGE
// ============================================
export const getBookPage = async (req, res, next) => {
  try {
    const { slug, pageNumber } = req.params;
    const pageNum = parseInt(pageNumber);
    
    if (isNaN(pageNum) || pageNum < 1) {
      return errorResponse(res, 'Invalid page number', 400);
    }
    
    const book = await Book.findOne({ slug, isPublished: true })
      .select('pageImages totalPages isPremium');

    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    // Check premium access
    if (book.isPremium && (!req.user || req.user.subscription?.plan === 'free')) {
      return errorResponse(res, 'Premium subscription required', 403);
    }
    
    if (!book.pageImages || book.pageImages.length === 0) {
      return errorResponse(res, 'No pages available', 404);
    }
    
    if (pageNum > book.pageImages.length) {
      return errorResponse(res, 'Page not found', 404);
    }
    
    successResponse(res, {
      page: pageNum,
      imageUrl: book.pageImages[pageNum - 1],
      totalPages: book.totalPages || book.pageImages.length,
      hasNext: pageNum < book.pageImages.length,
      hasPrev: pageNum > 1
    });
  } catch (error) {
    console.error('Error in getBookPage:', error);
    next(error);
  }
};

// ============================================
// LIKE / UNLIKE BOOK ENDPOINT
// ============================================
export const likeBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const book = await Book.findById(id);
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    // Initialize likes array if it doesn't exist
    if (!book.likes) {
      book.likes = [];
    }
    
    const alreadyLiked = book.likes.some(uid => uid.toString() === userId);
    
    if (alreadyLiked) {
      // Unlike: remove user from likes array
      book.likes = book.likes.filter(uid => uid.toString() !== userId);
      await book.save();
      return successResponse(res, { 
        liked: false, 
        likesCount: book.likes.length 
      }, 'Book unliked');
    } else {
      // Like: add user to likes array
      book.likes.push(userId);
      await book.save();
      return successResponse(res, { 
        liked: true, 
        likesCount: book.likes.length 
      }, 'Book liked');
    }
  } catch (error) {
    console.error('Error in likeBook:', error);
    next(error);
  }
};

// ============================================
// BOOKMARK / REMOVE BOOKMARK ENDPOINT
// ============================================
export const bookmarkBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const book = await Book.findById(id);
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    // Initialize bookmarks array if it doesn't exist
    if (!book.bookmarks) {
      book.bookmarks = [];
    }
    
    const alreadyBookmarked = book.bookmarks.some(uid => uid.toString() === userId);
    
    if (alreadyBookmarked) {
      // Remove bookmark
      book.bookmarks = book.bookmarks.filter(uid => uid.toString() !== userId);
      await book.save();
      return successResponse(res, { 
        bookmarked: false, 
        bookmarksCount: book.bookmarks.length 
      }, 'Bookmark removed');
    } else {
      // Add bookmark
      book.bookmarks.push(userId);
      await book.save();
      return successResponse(res, { 
        bookmarked: true, 
        bookmarksCount: book.bookmarks.length 
      }, 'Book saved');
    }
  } catch (error) {
    console.error('Error in bookmarkBook:', error);
    next(error);
  }
};

// ============================================
// GET BOOK LIKE STATUS (Optional helper)
// ============================================
export const getBookLikeStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const book = await Book.findById(id).select('likes');
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    const isLiked = book.likes ? book.likes.some(uid => uid.toString() === userId) : false;
    const likesCount = book.likes ? book.likes.length : 0;
    
    successResponse(res, { isLiked, likesCount });
  } catch (error) {
    console.error('Error in getBookLikeStatus:', error);
    next(error);
  }
};

// ============================================
// GET BOOK BOOKMARK STATUS (Optional helper)
// ============================================
export const getBookBookmarkStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    
    const book = await Book.findById(id).select('bookmarks');
    if (!book) {
      return errorResponse(res, 'Book not found', 404);
    }
    
    const isBookmarked = book.bookmarks ? book.bookmarks.some(uid => uid.toString() === userId) : false;
    const bookmarksCount = book.bookmarks ? book.bookmarks.length : 0;
    
    successResponse(res, { isBookmarked, bookmarksCount });
  } catch (error) {
    console.error('Error in getBookBookmarkStatus:', error);
    next(error);
  }
};