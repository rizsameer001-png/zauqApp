// backend/controllers/sitemap.controller.js
import Poem from '../models/Poem.js';
import Author from '../models/Author.js';
import Book from '../models/Book.js';
import Blog from '../models/Blog.js';

export const getSitemapData = async (req, res) => {
  try {
    const [poems, authors, books, blogs] = await Promise.all([
      Poem.find({ isPublished: true }).select('slug updatedAt title'),
      Author.find().select('slug updatedAt name'),
      Book.find({ isPublished: true }).select('slug updatedAt title'),
      Blog.find({ isPublished: true }).select('slug updatedAt title')
    ]);

    res.json({
      success: true,
      data: {
        poems,
        authors,
        books,
        blogs,
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Generate XML directly from backend (better for SEO)
export const generateSitemapXML = async (req, res) => {
  try {
    const baseUrl = process.env.CLIENT_URL || 'https://zauqapp-site.onrender.com';
    
    const [poems, authors, books, blogs] = await Promise.all([
      Poem.find({ isPublished: true }).select('slug updatedAt'),
      Author.find().select('slug updatedAt'),
      Book.find({ isPublished: true }).select('slug updatedAt'),
      Blog.find({ isPublished: true }).select('slug updatedAt')
    ]);

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    const staticPages = ['', 'explore', 'poetry', 'authors', 'books', 'audio', 'videos', 'blog', 'about'];
    staticPages.forEach(page => {
      const url = page === '' ? baseUrl : `${baseUrl}/${page}`;
      sitemap += `
  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Dynamic poems
    poems.forEach(poem => {
      sitemap += `
  <url>
    <loc>${baseUrl}/poem/${poem.slug}</loc>
    <lastmod>${poem.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Dynamic authors
    authors.forEach(author => {
      sitemap += `
  <url>
    <loc>${baseUrl}/author/${author.slug}</loc>
    <lastmod>${author.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Dynamic books
    books.forEach(book => {
      sitemap += `
  <url>
    <loc>${baseUrl}/book/${book.slug}</loc>
    <lastmod>${book.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    // Dynamic blogs
    blogs.forEach(blog => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt?.toISOString() || new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
    });

    sitemap += `
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).send(`<?xml version="1.0" encoding="UTF-8"?><error>${error.message}</error>`);
  }
};