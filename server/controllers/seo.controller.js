// import SEO from '../models/SEO.js';
// import Poem from '../models/Poem.js';
// import Author from '../models/Author.js';
// import Book from '../models/Book.js';
// import { successResponse, errorResponse } from '../utils/response.js';

// export const getSEOMeta = async (req, res, next) => {
//   try {
//     const seo = await SEO.findOne({ page: req.params.page, isActive: true });

//     if (!seo) {
//       // Return default meta
//       return successResponse(res, {
//         page: req.params.page,
//         metaTitle: 'ZauqApp - AI Powered Urdu Literary Ecosystem',
//         metaDescription: 'Discover Urdu poetry, Hindi literature, English classics, Ghazals, Shayari, Audiobooks and more on ZauqApp.',
//         metaKeywords: ['urdu poetry', 'hindi literature', 'ghazal', 'shayari', 'audiobooks'],
//         ogTitle: 'ZauqApp',
//         ogDescription: 'AI Powered Urdu Literary Ecosystem',
//         ogImage: 'https://zauqapp.com/og-image.jpg',
//         ogType: 'website',
//         twitterCard: 'summary_large_image',
//         canonicalUrl: `https://zauqapp.com${req.params.page === 'home' ? '' : '/' + req.params.page}`
//       });
//     }

//     successResponse(res, seo);
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateSEOMeta = async (req, res, next) => {
//   try {
//     const seo = await SEO.findOneAndUpdate(
//       { page: req.params.page },
//       { ...req.body, isActive: true },
//       { new: true, upsert: true }
//     );
//     successResponse(res, seo, 'SEO meta updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const generateSitemap = async (req, res, next) => {
//   try {
//     const baseUrl = process.env.CLIENT_URL || 'https://zauqapp.com';

//     const [poems, authors, books] = await Promise.all([
//       Poem.find({ isPublished: true }).select('slug updatedAt'),
//       Author.find().select('slug updatedAt'),
//       Book.find({ isPublished: true }).select('slug updatedAt')
//     ]);

//     let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
// `;
//     sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// `;

//     // Static pages
//     const staticPages = ['', 'explore', 'poems', 'authors', 'books', 'audio', 'videos', 'about'];
//     staticPages.forEach(page => {
//       sitemap += `  <url>
// `;
//       sitemap += `    <loc>${baseUrl}${page ? '/' + page : ''}</loc>
// `;
//       sitemap += `    <changefreq>daily</changefreq>
// `;
//       sitemap += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>
// `;
//       sitemap += `  </url>
// `;
//     });

//     // Dynamic pages
//     poems.forEach(poem => {
//       sitemap += `  <url>
// `;
//       sitemap += `    <loc>${baseUrl}/poem/${poem.slug}</loc>
// `;
//       sitemap += `    <lastmod>${poem.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
// `;
//       sitemap += `    <changefreq>weekly</changefreq>
// `;
//       sitemap += `    <priority>0.6</priority>
// `;
//       sitemap += `  </url>
// `;
//     });

//     authors.forEach(author => {
//       sitemap += `  <url>
// `;
//       sitemap += `    <loc>${baseUrl}/author/${author.slug}</loc>
// `;
//       sitemap += `    <lastmod>${author.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
// `;
//       sitemap += `    <changefreq>weekly</changefreq>
// `;
//       sitemap += `    <priority>0.7</priority>
// `;
//       sitemap += `  </url>
// `;
//     });

//     books.forEach(book => {
//       sitemap += `  <url>
// `;
//       sitemap += `    <loc>${baseUrl}/book/${book.slug}</loc>
// `;
//       sitemap += `    <lastmod>${book.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
// `;
//       sitemap += `    <changefreq>weekly</changefreq>
// `;
//       sitemap += `    <priority>0.6</priority>
// `;
//       sitemap += `  </url>
// `;
//     });

//     sitemap += `</urlset>`;

//     res.set('Content-Type', 'application/xml');
//     res.send(sitemap);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getRobotsTxt = async (req, res, next) => {
//   try {
//     const baseUrl = process.env.CLIENT_URL || 'https://zauqapp.com';
//     const robots = `User-agent: *
// Allow: /
// Disallow: /api/
// Disallow: /admin/
// Disallow: /creator/
// Disallow: /dashboard/
// Sitemap: ${baseUrl}/api/seo/sitemap.xml`;

//     res.set('Content-Type', 'text/plain');
//     res.send(robots);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getStructuredData = async (req, res, next) => {
//   try {
//     const { page } = req.params;
//     const seo = await SEO.findOne({ page });

//     successResponse(res, seo?.structuredData || {});
//   } catch (error) {
//     next(error);
//   }
// };












// seo.controller.js
import SEO from '../models/SEO.js';
import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Blog from '../models/Blog.js'; // Add Blog model import
import { successResponse, errorResponse } from '../utils/response.js';

export const getSEOMeta = async (req, res, next) => {
  try {
    const seo = await SEO.findOne({ page: req.params.page, isActive: true });

    if (!seo) {
      // Return default meta
      return successResponse(res, {
        page: req.params.page,
        metaTitle: 'ZauqApp - AI Powered Urdu Literary Ecosystem',
        metaDescription: 'Discover Urdu poetry, Hindi literature, English classics, Ghazals, Shayari, Audiobooks and more on ZauqApp.',
        metaKeywords: ['urdu poetry', 'hindi literature', 'ghazal', 'shayari', 'audiobooks'],
        ogTitle: 'ZauqApp',
        ogDescription: 'AI Powered Urdu Literary Ecosystem',
        ogImage: 'https://zauqapp.com/og-image.jpg',
        ogType: 'website',
        twitterCard: 'summary_large_image',
        canonicalUrl: `https://zauqapp.com${req.params.page === 'home' ? '' : '/' + req.params.page}`
      });
    }

    successResponse(res, seo);
  } catch (error) {
    next(error);
  }
};

export const updateSEOMeta = async (req, res, next) => {
  try {
    const seo = await SEO.findOneAndUpdate(
      { page: req.params.page },
      { ...req.body, isActive: true },
      { new: true, upsert: true }
    );
    successResponse(res, seo, 'SEO meta updated');
  } catch (error) {
    next(error);
  }
};

export const generateSitemap = async (req, res, next) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://zauqapp.com';

    const [poems, authors, books, blogs] = await Promise.all([
      Poem.find({ isPublished: true }).select('slug updatedAt'),
      Author.find().select('slug updatedAt'),
      Book.find({ isPublished: true }).select('slug updatedAt'),
      Blog.find({ isPublished: true }).select('slug updatedAt') // Add blogs
    ]);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static pages - Added 'blogs' to the list
    const staticPages = ['', 'explore', 'poems', 'authors', 'books', 'audio', 'videos', 'about', 'blogs'];
    staticPages.forEach(page => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}${page ? '/' + page : ''}</loc>\n`;
      sitemap += `    <changefreq>daily</changefreq>\n`;
      sitemap += `    <priority>${page === '' ? '1.0' : '0.8'}</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Dynamic pages - Poems
    poems.forEach(poem => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/poem/${poem.slug}</loc>\n`;
      sitemap += `    <lastmod>${poem.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.6</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Dynamic pages - Authors
    authors.forEach(author => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/author/${author.slug}</loc>\n`;
      sitemap += `    <lastmod>${author.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.7</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Dynamic pages - Books
    books.forEach(book => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/book/${book.slug}</loc>\n`;
      sitemap += `    <lastmod>${book.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.6</priority>\n`;
      sitemap += `  </url>\n`;
    });

    // Dynamic pages - Blogs (NEW)
    blogs.forEach(blog => {
      sitemap += `  <url>\n`;
      sitemap += `    <loc>${baseUrl}/blog/${blog.slug}</loc>\n`;
      sitemap += `    <lastmod>${blog.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>\n`;
      sitemap += `    <changefreq>weekly</changefreq>\n`;
      sitemap += `    <priority>0.6</priority>\n`;
      sitemap += `  </url>\n`;
    });

    sitemap += `</urlset>`;

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    next(error);
  }
};

export const getRobotsTxt = async (req, res, next) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://zauqapp.com';
    const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /creator/
Disallow: /dashboard/
Sitemap: ${baseUrl}/api/seo/sitemap.xml`;

    res.set('Content-Type', 'text/plain');
    res.send(robots);
  } catch (error) {
    next(error);
  }
};

export const getStructuredData = async (req, res, next) => {
  try {
    const { page } = req.params;
    const seo = await SEO.findOne({ page });

    successResponse(res, seo?.structuredData || {});
  } catch (error) {
    next(error);
  }
};

export const updateStructuredData = async (req, res, next) => {
  try {
    const seo = await SEO.findOneAndUpdate(
      { page: req.params.page },
      { structuredData: req.body },
      { new: true, upsert: true }
    );
    successResponse(res, seo, 'Structured data updated');
  } catch (error) {
    next(error);
  }
};

export const getSEODashboard = async (req, res, next) => {
  try {
    // Get all SEO entries
    const seoEntries = await SEO.find();
    
    // Get counts for all content types
    const [poemsCount, authorsCount, booksCount, blogsCount] = await Promise.all([
      Poem.countDocuments({ isPublished: true }),
      Author.countDocuments(),
      Book.countDocuments({ isPublished: true }),
      Blog.countDocuments({ isPublished: true })
    ]);
    
    const totalPages = seoEntries.length;
    const activePages = seoEntries.filter(s => s.isActive).length;

    successResponse(res, {
      totalPages,
      activePages,
      inactivePages: totalPages - activePages,
      pages: seoEntries,
      contentCounts: {
        poems: poemsCount,
        authors: authorsCount,
        books: booksCount,
        blogs: blogsCount
      }
    });
  } catch (error) {
    next(error);
  }
};

// export const updateStructuredData = async (req, res, next) => {
//   try {
//     const seo = await SEO.findOneAndUpdate(
//       { page: req.params.page },
//       { structuredData: req.body },
//       { new: true, upsert: true }
//     );
//     successResponse(res, seo, 'Structured data updated');
//   } catch (error) {
//     next(error);
//   }
// };

// export const getSEODashboard = async (req, res, next) => {
//   try {
//     const seoEntries = await SEO.find();
//     const totalPages = seoEntries.length;
//     const activePages = seoEntries.filter(s => s.isActive).length;

//     successResponse(res, {
//       totalPages,
//       activePages,
//       inactivePages: totalPages - activePages,
//       pages: seoEntries
//     });
//   } catch (error) {
//     next(error);
//   }
// };
