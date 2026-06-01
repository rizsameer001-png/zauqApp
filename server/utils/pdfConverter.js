// server/utils/pdfConverter.js
import { fromPath } from 'pdf2pic';
import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import os from 'os';

// Configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const convertPdfToImages = async (pdfUrl, bookId, bookSlug) => {
  try {
    // Create temp directory
    const tempDir = path.join(os.tmpdir(), `pdf_${bookId}`);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Download PDF to temp file
    const response = await fetch(pdfUrl);
    const pdfBuffer = await response.arrayBuffer();
    const tempPdfPath = path.join(tempDir, 'book.pdf');
    fs.writeFileSync(tempPdfPath, Buffer.from(pdfBuffer));

    // Configure pdf2pic
    const options = {
      density: 150,
      saveFilename: 'page',
      savePath: tempDir,
      format: 'jpg',
      width: 1000,
      height: 1400
    };

    const convert = fromPath(tempPdfPath, options);
    const pages = await convert.bulk(-1); // Convert all pages
    
    // Upload each page to Cloudinary
    const pageImages = [];
    for (let i = 0; i < pages.length; i++) {
      const pagePath = pages[i].path;
      const result = await cloudinary.uploader.upload(pagePath, {
        folder: `books/${bookSlug}/pages`,
        public_id: `page_${i + 1}`,
        transformation: [
          { quality: 'auto:good' },
          { fetch_format: 'webp' }
        ]
      });
      pageImages.push(result.secure_url);
      
      // Clean up temp file
      fs.unlinkSync(pagePath);
    }

    // Clean up temp directory
    fs.rmdirSync(tempDir, { recursive: true });

    return {
      pageImages,
      totalPages: pages.length
    };
  } catch (error) {
    console.error('Error converting PDF to images:', error);
    return { pageImages: [], totalPages: 0 };
  }
};