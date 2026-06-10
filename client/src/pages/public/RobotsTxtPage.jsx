// client/src/pages/public/RobotsTxtPage.jsx
import { useEffect } from 'react';

const RobotsTxtPage = () => {
  useEffect(() => {
    const baseUrl = 'https://zauqapp-site.onrender.com';
    const robotsContent = `# Robots.txt for ZauqApp
# https://zauqapp-site.onrender.com
# Generated on: ${new Date().toISOString()}

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /creator/
Disallow: /login
Disallow: /register
Disallow: /subscription/success
Disallow: /subscription/cancel

# Allow all important content for SEO
Allow: /poetry/
Allow: /poem/
Allow: /authors/
Allow: /author/
Allow: /books/
Allow: /book/
Allow: /audio/
Allow: /videos/
Allow: /blog/
Allow: /explore/
Allow: /search/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay to be gentle on the server
Crawl-delay: 1

# Host directive
Host: ${baseUrl}

# Block AI training bots (optional - remove if you want AI bots to crawl)
User-agent: GPTBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: CCBot
Disallow: /

# Allow Google and Bing bots
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Allow common search engine bots
User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: DuckDuckBot
Allow: /
`;

    // Replace the entire document with plain text
    document.documentElement.innerHTML = robotsContent;
    document.contentType = 'text/plain';
  }, []);
  
  return null;
};

export default RobotsTxtPage;