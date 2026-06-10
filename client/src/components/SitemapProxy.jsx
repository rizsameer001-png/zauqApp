// import { useEffect } from 'react';

// const SitemapProxy = () => {
//   useEffect(() => {
//     const loadSitemap = async () => {
//       try {
//         // Fetch from backend
//         const response = await fetch('https://zauqappbackend.onrender.com/api/sitemap/sitemap.xml');
//         const xmlData = await response.text();
        
//         // Clear current page and display XML
//         document.body.innerHTML = '';
//         document.documentElement.innerHTML = xmlData;
        
//         // Set correct content type
//         const contentType = document.createElement('meta');
//         contentType.setAttribute('http-equiv', 'Content-Type');
//         contentType.setAttribute('content', 'application/xml');
//         document.head.appendChild(contentType);
        
//         // Update title
//         document.title = 'Sitemap - ZauqApp';
//       } catch (error) {
//         console.error('Failed to load sitemap:', error);
//         document.body.innerHTML = `<error>Failed to load sitemap: ${error.message}</error>`;
//       }
//     };
    
//     loadSitemap();
//   }, []);
  
//   return null;
// };

// export default SitemapProxy;












import { useEffect, useState } from 'react';

const SitemapProxy = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSitemap = async () => {
      try {
        // Get the requested sitemap type from URL
        const sitemapType = window.location.pathname; // e.g., /sitemap-poems.xml
        const backendUrl = `https://zauqappbackend.onrender.com/api/sitemap${sitemapType}`;
        
        console.log('Fetching sitemap from:', backendUrl);
        
        const response = await fetch(backendUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const xmlContent = await response.text();
        
        // Replace entire page with XML content
        document.documentElement.innerHTML = xmlContent;
        
        // Set proper content type for SEO
        const meta = document.createElement('meta');
        meta.setAttribute('http-equiv', 'Content-Type');
        meta.setAttribute('content', 'application/xml; charset=utf-8');
        document.head.appendChild(meta);
        
      } catch (err) {
        console.error('Error loading sitemap:', err);
        setError(err.message);
      }
    };
    
    fetchSitemap();
  }, []);

  if (error) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h1>Error Loading Sitemap</h1>
        <p>Unable to fetch sitemap from backend.</p>
        <p>Error: {error}</p>
        <p>Backend URL: https://zauqappbackend.onrender.com/api/sitemap/</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <p>Loading sitemap...</p>
    </div>
  );
};

export default SitemapProxy;