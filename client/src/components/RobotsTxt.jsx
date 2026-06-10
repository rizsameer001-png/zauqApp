// src/components/RobotsTxt.jsx
import { useEffect } from 'react';

const RobotsTxt = () => {
  useEffect(() => {
    const robotsContent = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /creator/
Sitemap: https://zauqapp-site.onrender.com/sitemap.xml

# Allow search engines to crawl all static content
Allow: /poems/
Allow: /authors/
Allow: /books/
Allow: /blogs/
Allow: /audio/
Allow: /videos/

# Crawl delay to be gentle on the server
Crawl-delay: 1

# Specify your host
Host: https://zauqapp-site.onrender.com

# Block AI training bots (optional)
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /`;

    // Set content type and serve robots.txt
    document.write(robotsContent);
  }, []);

  return null;
};

// Add route for robots.txt
// <Route path="/robots.txt" element={<RobotsTxt />} />