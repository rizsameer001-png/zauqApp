// client/src/components/common/FlipBookReader.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, X, 
  Maximize2, Minimize2, Bookmark, BookmarkCheck, Settings,
  Grid, List, RotateCw, Move, BookOpen, Loader2
} from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const FlipBookReader = ({ pdfUrl, title, onClose, onDownload, initialPage = 1 }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(initialPage);
  const [scale, setScale] = useState(1.2);
  const [loading, setLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isThumbnailView, setIsThumbnailView] = useState(false);
  const [viewMode, setViewMode] = useState('horizontal'); // horizontal, single, double
  const [rotation, setRotation] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [pageWidth, setPageWidth] = useState(500);
  
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const pageRefs = useRef({});

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(`pdf_bookmarks_${title}`);
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, [title]);

  // Save bookmarks to localStorage
  const saveBookmarks = useCallback((newBookmarks) => {
    localStorage.setItem(`pdf_bookmarks_${title}`, JSON.stringify(newBookmarks));
    setBookmarks(newBookmarks);
  }, [title]);

  const addBookmark = () => {
    const existingBookmark = bookmarks.find(b => b.page === pageNumber);
    if (!existingBookmark) {
      const newBookmark = {
        page: pageNumber,
        timestamp: new Date().toISOString(),
        note: ''
      };
      saveBookmarks([...bookmarks, newBookmark]);
    }
  };

  const removeBookmark = (pageToRemove) => {
    const updatedBookmarks = bookmarks.filter(b => b.page !== pageToRemove);
    saveBookmarks(updatedBookmarks);
  };

  const goToBookmark = (page) => {
    setPageNumber(page);
    setShowBookmarks(false);
    scrollToPage(page);
  };

  // Scroll to specific page in horizontal view
  const scrollToPage = useCallback((page) => {
    if (scrollContainerRef.current && pageRefs.current[page]) {
      scrollContainerRef.current.scrollTo({
        left: pageRefs.current[page].offsetLeft - (scrollContainerRef.current.offsetWidth / 2) + (pageRefs.current[page].offsetWidth / 2),
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    scrollToPage(pageNumber);
  }, [pageNumber, scrollToPage]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const goToPrevPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev + 0.2, 3));
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev - 0.2, 0.6));
  };

  const rotatePage = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        setPageWidth(containerWidth - 100);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight') {
        goToNextPage();
      } else if (e.key === 'Escape' && isFullscreen) {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [pageNumber, numPages, isFullscreen]);

  const isBookmarked = bookmarks.some(b => b.page === pageNumber);

  // Render page thumbnails
  const renderThumbnails = () => {
    if (!numPages) return null;
    
    return (
      <div className="absolute left-0 top-0 bottom-0 w-80 bg-gray-800 z-20 overflow-y-auto transform transition-transform duration-300"
           style={{ transform: isThumbnailView ? 'translateX(0)' : 'translateX(-100%)' }}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Thumbnails</h3>
            <button onClick={() => setIsThumbnailView(false)} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: numPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => {
                  setPageNumber(pageNum);
                  setIsThumbnailView(false);
                }}
                className={`p-1 rounded-lg transition-all ${pageNumber === pageNum ? 'bg-primary-600 ring-2 ring-primary-400' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <Document file={pdfUrl}>
                  <Page
                    pageNumber={pageNum}
                    width={100}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
                <span className="text-white text-xs block text-center mt-1">Page {pageNum}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render bookmarks sidebar
  const renderBookmarks = () => {
    if (!showBookmarks) return null;
    
    return (
      <div className="absolute right-0 top-0 bottom-0 w-80 bg-gray-800 z-20 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium">Bookmarks</h3>
            <button onClick={() => setShowBookmarks(false)} className="text-gray-400 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          {bookmarks.length === 0 ? (
            <p className="text-gray-400 text-sm">No bookmarks yet. Click the bookmark icon to add.</p>
          ) : (
            <div className="space-y-2">
              {bookmarks.map((bookmark, idx) => (
                <div key={idx} className="p-2 bg-gray-700 rounded-lg hover:bg-gray-600">
                  <button
                    onClick={() => goToBookmark(bookmark.page)}
                    className="w-full text-left"
                  >
                    <p className="text-white text-sm">Page {bookmark.page}</p>
                    <p className="text-gray-400 text-xs">
                      {new Date(bookmark.timestamp).toLocaleDateString()}
                    </p>
                  </button>
                  <button
                    onClick={() => removeBookmark(bookmark.page)}
                    className="text-red-400 text-xs mt-1 hover:text-red-300"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-700 text-white">
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-white font-medium truncate max-w-[300px]">{title}</h2>
        </div>
        
        <div className="flex items-center gap-1">
          {/* View Mode Toggle */}
          <button
            onClick={() => setViewMode(viewMode === 'horizontal' ? 'single' : 'horizontal')}
            className={`p-2 rounded-lg hover:bg-gray-700 text-white ${viewMode === 'horizontal' ? 'bg-gray-700' : ''}`}
            title="Toggle Horizontal View"
          >
            {viewMode === 'horizontal' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
          </button>
          
          {/* Thumbnail View Toggle */}
          <button
            onClick={() => setIsThumbnailView(!isThumbnailView)}
            className={`p-2 rounded-lg hover:bg-gray-700 text-white ${isThumbnailView ? 'bg-gray-700' : ''}`}
            title="Thumbnails"
          >
            <Grid className="h-4 w-4" />
          </button>
          
          {/* Bookmarks Toggle */}
          <button
            onClick={() => setShowBookmarks(!showBookmarks)}
            className={`p-2 rounded-lg hover:bg-gray-700 text-white ${showBookmarks ? 'bg-gray-700' : ''}`}
            title="Bookmarks"
          >
            <BookOpen className="h-4 w-4" />
          </button>
          
          {/* Add Bookmark */}
          <button
            onClick={addBookmark}
            className={`p-2 rounded-lg hover:bg-gray-700 ${isBookmarked ? 'text-yellow-400' : 'text-white'}`}
            title="Add Bookmark"
          >
            {isBookmarked ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </button>
          
          {/* Zoom Controls */}
          <button onClick={zoomOut} className="p-2 rounded-lg hover:bg-gray-700 text-white" title="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="text-white text-sm min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="p-2 rounded-lg hover:bg-gray-700 text-white" title="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </button>
          
          {/* Rotate */}
          <button onClick={rotatePage} className="p-2 rounded-lg hover:bg-gray-700 text-white" title="Rotate">
            <RotateCw className="h-4 w-4" />
          </button>
          
          {/* Fullscreen */}
          <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-gray-700 text-white" title="Fullscreen">
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          
          {/* Download */}
          {onDownload && (
            <button onClick={onDownload} className="p-2 rounded-lg hover:bg-gray-700 text-white" title="Download">
              <Download className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Sidebars */}
      {renderThumbnails()}
      {renderBookmarks()}

      {/* Main Reader - Horizontal Scroll */}
      <div className="flex-1 relative overflow-hidden">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-10">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-white mx-auto mb-4" />
              <p className="text-gray-400">Loading PDF...</p>
            </div>
          </div>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-x-auto overflow-y-hidden horizontal-scroll-container"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className="flex h-full items-center justify-start" style={{ minWidth: 'max-content' }}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={null}
              error={<div className="text-red-500 p-8">Failed to load PDF. Please try again.</div>}
            >
              {Array.from({ length: numPages || 0 }, (_, index) => {
                const pageNum = index + 1;
                return (
                  <div
                    key={pageNum}
                    ref={el => pageRefs.current[pageNum] = el}
                    className={`flex-shrink-0 flex items-center justify-center p-4 transition-all duration-300 ${
                      pageNumber === pageNum ? 'scale-105' : 'scale-100'
                    }`}
                    style={{ 
                      width: viewMode === 'horizontal' ? 'auto' : '100%',
                      minWidth: viewMode === 'horizontal' ? 'auto' : '100%'
                    }}
                  >
                    <div className="relative">
                      <Page
                        pageNumber={pageNum}
                        scale={scale}
                        rotate={rotation}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        className="shadow-2xl rounded-lg"
                        loading={<div className="w-64 h-80 bg-gray-800 animate-pulse rounded-lg" />}
                      />
                      {/* Page Number Overlay */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                        {pageNum} / {numPages}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Document>
          </div>
        </div>

        {/* Navigation Arrows */}
        {viewMode === 'horizontal' && (
          <>
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all z-10"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="bg-gray-800 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Previous</span>
        </button>
        
        <div className="flex items-center gap-3">
          <span className="text-white text-sm">
            Page {pageNumber} of {numPages || '--'}
          </span>
          <input
            type="number"
            min={1}
            max={numPages || 1}
            value={pageNumber}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= numPages) {
                setPageNumber(page);
                scrollToPage(page);
              }
            }}
            className="w-16 px-2 py-1 rounded bg-gray-700 text-white text-center border border-gray-600 focus:outline-none focus:border-primary-500"
          />
        </div>
        
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Progress Bar */}
      {numPages && (
        <div className="h-1 bg-gray-700">
          <div 
            className="h-full bg-primary-600 transition-all duration-300"
            style={{ width: `${(pageNumber / numPages) * 100}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default FlipBookReader;