// // client/src/App.js
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'
// // import AudioListPage from './pages/public/AudioListPage.jsx'
// // import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// const App = () => {
//   return (
//     <Routes>
//       {/* Public Routes - Using SLUGS instead of IDs */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* Poetry Routes - Using :slug */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         {/* Legacy redirect from old ID-based URLs */}
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* Author Routes - Using :slug */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         {/* Legacy redirect */}
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* Book Routes - Using :slug */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         {/* Legacy redirect */}
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* Audio Routes - Using :slug */}
// {/*        <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />*/}

//         {/* Video Routes - Using :slug */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         {/* Legacy redirect */}
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* Auth Routes */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* User Dashboard Routes */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<div>Downloads Coming Soon</div>} />
//         <Route path="history" element={<HistoryPage />} />
//       </Route>

//       {/* Creator Dashboard Routes */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
//       </Route>

//       {/* Admin Routes */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<AdminDashboardPage />} />
//         <Route path="users" element={<UserManagementPage />} />
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
//         <Route path="videos" element={<VideoCMSPage />} />
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
//       </Route>

//       {/* Fallback - 404 Page */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default App








// // client/src/App.js
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// const App = () => {
//   return (
//     <Routes>
//       {/* ============================================
//           PUBLIC ROUTES - Using SLUGS instead of IDs
//       ============================================ */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* ============================================
//             POETRY ROUTES
//         ============================================ */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         {/* Legacy redirect from old ID-based URLs */}
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* ============================================
//             AUTHOR ROUTES
//         ============================================ */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         {/* Legacy redirect */}
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* ============================================
//             BOOK ROUTES
//         ============================================ */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         {/* Legacy redirect */}
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* ============================================
//             AUDIO ROUTES - PUBLIC
//         ============================================ */}
//         {/* Main Audio Routes */}
//         <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />
        
//         {/* Audio Category Routes - By Type */}
//         <Route path="/audio/type/nauha" element={<AudioByTypePage />} />
//         <Route path="/audio/type/marsiya" element={<AudioByTypePage />} />
//         <Route path="/audio/type/soz" element={<AudioByTypePage />} />
//         <Route path="/audio/type/salam" element={<AudioByTypePage />} />
//         <Route path="/audio/type/majlis" element={<AudioByTypePage />} />
//         <Route path="/audio/type/mushaira" element={<AudioByTypePage />} />
//         <Route path="/audio/type/podcast" element={<AudioByTypePage />} />
//         <Route path="/audio/type/poem_recitation" element={<AudioByTypePage />} />
//         <Route path="/audio/type/ghazal" element={<AudioByTypePage />} />
//         <Route path="/audio/type/nazm" element={<AudioByTypePage />} />
//         <Route path="/audio/type/naat" element={<AudioByTypePage />} />
//         <Route path="/audio/type/hamd" element={<AudioByTypePage />} />
//         <Route path="/audio/type/manqabat" element={<AudioByTypePage />} />
//         <Route path="/audio/type/munajat" element={<AudioByTypePage />} />
//         <Route path="/audio/type/audiobook" element={<AudioByTypePage />} />
//         <Route path="/audio/type/lecture" element={<AudioByTypePage />} />
//         <Route path="/audio/type/interview" element={<AudioByTypePage />} />
        
//         {/* Dynamic category route - catches any valid type */}
//         <Route path="/audio/category/:type" element={<AudioByTypePage />} />
        
//         {/* Audio Occasion Routes */}
//         <Route path="/audio/occasion/muharram" element={<AudioByOccasionPage />} />
//         <Route path="/audio/occasion/ramadan" element={<AudioByOccasionPage />} />
//         <Route path="/audio/occasion/eid" element={<AudioByOccasionPage />} />
//         <Route path="/audio/occasion/milad" element={<AudioByOccasionPage />} />
        
//         {/* Legacy redirect */}
//         <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//         {/* ============================================
//             VIDEO ROUTES
//         ============================================ */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         {/* Video Category Routes */}
// {/*        <Route path="/video/type/majlis" element={<VideoByTypePage />} />
//         <Route path="/video/type/nauha" element={<VideoByTypePage />} />
//         <Route path="/video/type/marsiya" element={<VideoByTypePage />} />
//         <Route path="/video/type/mushaira" element={<VideoByTypePage />} />
//         <Route path="/video/type/documentary" element={<VideoByTypePage />} />*/}
//         {/* Legacy redirect */}
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* ============================================
//           AUTH ROUTES
//       ============================================ */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* ============================================
//           USER DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<div>Downloads Coming Soon</div>} />
//         <Route path="history" element={<HistoryPage />} />
        
//         {/* User Audio Preferences */}
//         {/*<Route path="audio/history" element={<UserAudioHistoryPage />} />*/}
//         {/*<Route path="audio/playlists" element={<UserPlaylistsPage />} />*/}
//         {/*<Route path="audio/favorites" element={<UserAudioFavoritesPage />} />*/}
//       </Route>

//       {/* ============================================
//           CREATOR DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         {/*<Route path="upload-audio" element={<UploadAudioPage />} />*/}
//         {/*<Route path="upload-video" element={<UploadVideoPage />} />*/}
//         {/*<Route path="upload-book" element={<UploadBookPage />} />*/}
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
//         {/*<Route path="content" element={<CreatorContentPage />} />*/}
//       </Route>

//       {/* ============================================
//           ADMIN ROUTES
//       ============================================ */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Admin */}
//         <Route index element={<AdminDashboardPage />} />
        
//         {/* User Management */}
//         <Route path="users" element={<UserManagementPage />} />
//         <Route path="users/:id" element={<UserDetailPage />} />
        
//         {/* Content Management */}
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
        
//         {/* Audio CMS - Admin */}
//         <Route path="audio" element={<AudioCMSPage />} />
//         <Route path="audio/types" element={<AudioTypesManagementPage />} />
//         <Route path="audio/playlists" element={<AudioPlaylistsManagementPage />} />
//         <Route path="audio/analytics" element={<AudioAnalyticsPage />} />
//         <Route path="audio/bulk-upload" element={<AudioBulkUploadPage />} />
        
//         {/* Video CMS - Admin */}
//         <Route path="videos" element={<VideoCMSPage />} />
//         <Route path="videos/types" element={<VideoTypesManagementPage />} />
        
//         {/* Site Management */}
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
        
//         {/* Category Management */}
//         <Route path="categories" element={<CategoriesManagementPage />} />
//         <Route path="categories/audio" element={<AudioCategoriesPage />} />
//         <Route path="categories/video" element={<VideoCategoriesPage />} />
        
//         {/* Reports */}
//         <Route path="reports" element={<ReportsPage />} />
//         <Route path="reports/audio" element={<AudioReportsPage />} />
//       </Route>

//       {/* ============================================
//           FALLBACK - 404 PAGE
//       ============================================ */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default App












// // client/src/App.jsx
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'



// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'
// // import VideoByTypePage from './pages/public/VideoByTypePage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Add these imports with your other page imports
// import SubscriptionPage from './pages/subscription/SubscriptionPage';
// import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage';
// import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage';

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'

// // User Audio Pages (Create these files or comment out)
// // import UserAudioHistoryPage from './pages/user/UserAudioHistory.jsx'
// // import UserPlaylistsPage from './pages/user/UserPlaylistsPage.jsx'
// // import UserAudioFavoritesPage from './pages/user/UserAudioFavoritesPage.jsx'

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Creator Upload Pages (Create these files or comment out)
// // import UploadAudioPage from './pages/creator/UploadAudioPage.jsx'
// // import UploadVideoPage from './pages/creator/UploadVideoPage.jsx'
// // import UploadBookPage from './pages/creator/UploadBookPage.jsx'
// // import CreatorContentPage from './pages/creator/CreatorContentPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// // In your router configuration
// import SubscribersListPage from './pages/admin/SubscribersListPage';
// import TransactionsPage from './pages/admin/TransactionsPage';

// import SettingsPage from './pages/admin/SettingsPage.jsx'




// // Admin Management Pages (Create these files or comment out)
// // import UserDetailPage from './pages/admin/UserDetailPage.jsx'
// // import AudioTypesManagementPage from './pages/admin/AudioTypesManagementPage.jsx'
// // import AudioPlaylistsManagementPage from './pages/admin/AudioPlaylistsManagementPage.jsx'
// // import AudioAnalyticsPage from './pages/admin/AudioAnalyticsPage.jsx'
// // import AudioBulkUploadPage from './pages/admin/AudioBulkUploadPage.jsx'
// // import VideoTypesManagementPage from './pages/admin/VideoTypesManagementPage.jsx'
// // import CategoriesManagementPage from './pages/admin/CategoriesManagementPage.jsx'
// // import AudioCategoriesPage from './pages/admin/AudioCategoriesPage.jsx'
// // import VideoCategoriesPage from './pages/admin/VideoCategoriesPage.jsx'
// // import ReportsPage from './pages/admin/ReportsPage.jsx'
// // import AudioReportsPage from './pages/admin/AudioReportsPage.jsx'

// // Temporary placeholder component for missing pages
// const PlaceholderPage = ({ title }) => (
//   <div className="flex items-center justify-center min-h-[60vh]">
//     <div className="text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
//       <p className="text-gray-500">This page is under construction.</p>
//     </div>
//   </div>
// )

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// const App = () => {
//   return (
//     <Routes>
//       {/* ============================================
//           PUBLIC ROUTES - Using SLUGS instead of IDs
//       ============================================ */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* ============================================
//             POETRY ROUTES
//         ============================================ */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* ============================================
//             AUTHOR ROUTES
//         ============================================ */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* ============================================
//             BOOK ROUTES
//         ============================================ */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* ============================================
//             AUDIO ROUTES - PUBLIC
//         ============================================ */}
//         <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />
//         <Route path="/audio/type/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
//         <Route path="/audio/category/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//         {/* ============================================
//             VIDEO ROUTES
//         ============================================ */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         {/*<Route path="/video/type/:type" element={<VideoByTypePage />} />*/}
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* ============================================
//           AUTH ROUTES
//       ============================================ */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* ============================================
//           USER DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<PlaceholderPage title="Downloads" />} />
//         <Route path="history" element={<HistoryPage />} />
        
//         {/* User Audio Routes - Commented out until components are created */}
//         {/* <Route path="audio/history" element={<UserAudioHistoryPage />} /> */}
//         {/* <Route path="audio/playlists" element={<UserPlaylistsPage />} /> */}
//         {/* <Route path="audio/favorites" element={<UserAudioFavoritesPage />} /> */}
//       </Route>

//       {/* ============================================
//           CREATOR DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
        
//         {/* Creator Upload Routes - Commented out until components are created */}
//         {/* <Route path="upload-audio" element={<UploadAudioPage />} /> */}
//         {/* <Route path="upload-video" element={<UploadVideoPage />} /> */}
//         {/* <Route path="upload-book" element={<UploadBookPage />} /> */}
//         {/* <Route path="content" element={<CreatorContentPage />} /> */}
//       </Route>

//       {/* ============================================
//           ADMIN ROUTES
//       ============================================ */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Admin */}
//         <Route index element={<AdminDashboardPage />} />
        
//         {/* User Management */}
//         <Route path="users" element={<UserManagementPage />} />
//         {/* <Route path="users/:id" element={<UserDetailPage />} /> */}
        
//         {/* Content Management */}
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
        
//         {/* Audio CMS - Admin */}
//         <Route path="audio" element={<AudioCMSPage />} />
//         {/* <Route path="audio/types" element={<AudioTypesManagementPage />} /> */}
//         {/* <Route path="audio/playlists" element={<AudioPlaylistsManagementPage />} /> */}
//         {/* <Route path="audio/analytics" element={<AudioAnalyticsPage />} /> */}
//         {/* <Route path="audio/bulk-upload" element={<AudioBulkUploadPage />} /> */}
        
//         {/* Video CMS - Admin */}
//         <Route path="videos" element={<VideoCMSPage />} />
//         {/* <Route path="videos/types" element={<VideoTypesManagementPage />} /> */}

//         {/* Subscription CMS - Admin */}
//         {/*<Route path="subscription" element={<SubscriptionCMSPage />} />*/}
//         // Then add this route inside the Admin Routes section:
//         <Route path="subscriptions" element={<SubscriptionCMSPage />} />
//         <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
//         <Route path="subscriptions/users" element={<PlaceholderPage title="Subscribers" />} />
//         <Route path="subscriptions/transactions" element={<PlaceholderPage title="Transactions" />} />
//         <Route path="subscriptions/analytics" element={<PlaceholderPage title="Revenue Analytics" />} />
//         <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
//         // Add these routes
//         <Route path="/admin/subscriptions/users" element={<SubscribersListPage />} />
//         <Route path="/admin/subscriptions/transactions" element={<TransactionsPage />} />

//         {/* Site Management */}
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
        
//         {/* Category Management - Commented out */}
//         {/* <Route path="categories" element={<CategoriesManagementPage />} /> */}
//         {/* <Route path="categories/audio" element={<AudioCategoriesPage />} /> */}
//         {/* <Route path="categories/video" element={<VideoCategoriesPage />} /> */}
        
//         {/* Reports - Commented out */}
//         {/* <Route path="reports" element={<ReportsPage />} /> */}
//         {/* <Route path="reports/audio" element={<AudioReportsPage />} /> */}
//       </Route>


//       {/* ============================================
//           SUBSCRIPTION ROUTES
//       ============================================ */}
// {/*      <Route path="/subscription" element={<SubscriptionPage />} />
//       <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
//       <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />*/}

//       {/* ============================================
//           FALLBACK - 404 PAGE
//       ============================================ */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default App





















// // client/src/App.jsx
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Subscription Pages
// import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx'
// import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage.jsx'
// import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'
// import UserSubscriptionsPage from './pages/user/UserSubscriptionsPage.jsx'
// import UserBillingPage from './pages/user/UserBillingPage.jsx'

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SubscribersListPage from './pages/admin/SubscribersListPage.jsx'
// import TransactionsPage from './pages/admin/TransactionsPage.jsx'
// import SubscriptionAnalyticsPage from './pages/admin/SubscriptionAnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// const App = () => {
//   return (
//     <Routes>
//       {/* ============================================
//           PUBLIC ROUTES - Using SLUGS instead of IDs
//       ============================================ */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* Poetry Routes */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* Author Routes */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* Book Routes */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* Audio Routes - Public */}
//         <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />
//         <Route path="/audio/type/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
//         <Route path="/audio/category/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//         {/* Video Routes */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* ============================================
//           AUTH ROUTES
//       ============================================ */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* ============================================
//           SUBSCRIPTION ROUTES - PUBLIC
//       ============================================ */}
//       <Route path="/subscription" element={<SubscriptionPage />} />
//       <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
//       <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />

//       {/* ============================================
//           USER DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<PlaceholderPage title="Downloads" />} />
//         <Route path="history" element={<HistoryPage />} />
        
//         {/* User Subscription Routes */}
//         <Route path="subscriptions" element={<UserSubscriptionsPage />} />
//         <Route path="billing" element={<UserBillingPage />} />
//         <Route path="payment-methods" element={<PlaceholderPage title="Payment Methods" />} />
//         <Route path="invoices" element={<PlaceholderPage title="Invoices" />} />
//       </Route>

//       {/* ============================================
//           CREATOR DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
        
//         {/* Creator Subscription Routes */}
//         <Route path="subscription" element={<PlaceholderPage title="Creator Subscription" />} />
//         <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
//       </Route>

//       {/* ============================================
//           ADMIN ROUTES
//       ============================================ */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Admin */}
//         <Route index element={<AdminDashboardPage />} />
        
//         {/* User Management */}
//         <Route path="users" element={<UserManagementPage />} />
//         <Route path="users/:id" element={<PlaceholderPage title="User Details" />} />
        
//         {/* Content Management */}
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
        
//         {/* Audio CMS - Admin */}
//         <Route path="audio" element={<AudioCMSPage />} />
//         <Route path="audio/types" element={<PlaceholderPage title="Audio Types Management" />} />
//         <Route path="audio/playlists" element={<PlaceholderPage title="Audio Playlists" />} />
//         <Route path="audio/analytics" element={<PlaceholderPage title="Audio Analytics" />} />
//         <Route path="audio/bulk-upload" element={<PlaceholderPage title="Bulk Audio Upload" />} />
        
//         {/* Video CMS - Admin */}
//         <Route path="videos" element={<VideoCMSPage />} />
//         <Route path="videos/types" element={<PlaceholderPage title="Video Types Management" />} />

//         {/* ============================================
//             SUBSCRIPTION CMS - ADMIN (FULLY CONFIGURED)
//         ============================================ */}
//         {/* Main Subscription Management */}
//         <Route path="subscriptions" element={<SubscriptionCMSPage />} />
//         <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
        
//         {/* Subscriber Management */}
//         <Route path="subscriptions/users" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers/:id" element={<PlaceholderPage title="Subscriber Details" />} />
        
//         {/* Transaction Management */}
//         <Route path="subscriptions/transactions" element={<TransactionsPage />} />
//         <Route path="subscriptions/payments" element={<TransactionsPage />} />
//         <Route path="subscriptions/transactions/:id" element={<PlaceholderPage title="Transaction Details" />} />
        
//         {/* Subscription Analytics */}
//         <Route path="subscriptions/analytics" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/stats" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/reports" element={<PlaceholderPage title="Subscription Reports" />} />
        
//         {/* Feature Management */}
//         <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
        
//         {/* Coupon/Discount Management */}
//         <Route path="subscriptions/coupons" element={<PlaceholderPage title="Coupon Management" />} />
//         <Route path="subscriptions/discounts" element={<PlaceholderPage title="Discount Management" />} />

//         {/* Site Management */}
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
        
//         {/* Category Management */}
//         <Route path="categories" element={<PlaceholderPage title="Categories Management" />} />
//         <Route path="categories/audio" element={<PlaceholderPage title="Audio Categories" />} />
//         <Route path="categories/video" element={<PlaceholderPage title="Video Categories" />} />
        
//         {/* Reports */}
//         <Route path="reports" element={<PlaceholderPage title="Reports" />} />
//         <Route path="reports/audio" element={<PlaceholderPage title="Audio Reports" />} />
//         <Route path="reports/payments" element={<PlaceholderPage title="Payment Reports" />} />
//       </Route>

//       {/* ============================================
//           FALLBACK - 404 PAGE
//       ============================================ */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// // Temporary placeholder component for missing pages
// const PlaceholderPage = ({ title }) => (
//   <div className="flex items-center justify-center min-h-[60vh]">
//     <div className="text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
//       <p className="text-gray-500">This page is under construction.</p>
//     </div>
//   </div>
// )

// export default App















// // client/src/App.jsx
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Subscription Pages
// import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx'
// import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage.jsx'
// import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'
// import DownloadsPage from './pages/user/DownloadsPage.jsx'
// import UserSubscriptionsPage from './pages/user/UserSubscriptionsPage.jsx'
// import UserBillingPage from './pages/user/UserBillingPage.jsx'
// import PaymentMethodsPage from './pages/user/PaymentMethodsPage.jsx';
// import InvoicesPage from './pages/user/InvoicesPage.jsx';

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SubscribersListPage from './pages/admin/SubscribersListPage.jsx'
// import TransactionsPage from './pages/admin/TransactionsPage.jsx'
// import SubscriptionAnalyticsPage from './pages/admin/SubscriptionAnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// // Temporary placeholder component for missing pages
// const PlaceholderPage = ({ title }) => (
//   <div className="flex items-center justify-center min-h-[60vh]">
//     <div className="text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
//       <p className="text-gray-500">This page is under construction.</p>
//     </div>
//   </div>
// )

// const App = () => {
//   return (
//     <Routes>
//       {/* ============================================
//           PUBLIC ROUTES - Using SLUGS instead of IDs
//       ============================================ */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* Poetry Routes */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* Author Routes */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* Book Routes */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* Audio Routes - Public */}
//         <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />
//         <Route path="/audio/type/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
//         <Route path="/audio/category/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//         {/* Video Routes */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* ============================================
//           AUTH ROUTES
//       ============================================ */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* ============================================
//           SUBSCRIPTION ROUTES - PUBLIC
//       ============================================ */}
//       <Route path="/subscription" element={<SubscriptionPage />} />
//       <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
//       <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />

//       {/* ============================================
//           USER DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<DownloadsPage />} />
//         <Route path="history" element={<HistoryPage />} />
        
//         {/* User Subscription Routes */}
// {/*        <Route path="subscriptions" element={<UserSubscriptionsPage />} />
//         <Route path="billing" element={<UserBillingPage />} />
//         <Route path="payment-methods" element={<PlaceholderPage title="Payment Methods" />} />
//         <Route path="invoices" element={<PlaceholderPage title="Invoices" />} />
//       </Route>*/}

//         <Route path="subscriptions" element={<UserSubscriptionsPage />} />
//         <Route path="billing" element={<UserBillingPage />} />
//         <Route path="payment-methods" element={<PaymentMethodsPage />} />
//         <Route path="invoices" element={<InvoicesPage />} />

//       {/* ============================================
//           CREATOR DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
        
//         {/* Creator Subscription Routes */}
//         <Route path="subscription" element={<PlaceholderPage title="Creator Subscription" />} />
//         <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
//       </Route>

//       {/* ============================================
//           ADMIN ROUTES
//       ============================================ */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Admin */}
//         <Route index element={<AdminDashboardPage />} />
        
//         {/* User Management */}
//         <Route path="users" element={<UserManagementPage />} />
//         <Route path="users/:id" element={<PlaceholderPage title="User Details" />} />
        
//         {/* Content Management */}
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
        
//         {/* Audio CMS - Admin */}
//         <Route path="audio" element={<AudioCMSPage />} />
//         <Route path="audio/types" element={<PlaceholderPage title="Audio Types Management" />} />
//         <Route path="audio/playlists" element={<PlaceholderPage title="Audio Playlists" />} />
//         <Route path="audio/analytics" element={<PlaceholderPage title="Audio Analytics" />} />
//         <Route path="audio/bulk-upload" element={<PlaceholderPage title="Bulk Audio Upload" />} />
        
//         {/* Video CMS - Admin */}
//         <Route path="videos" element={<VideoCMSPage />} />
//         <Route path="videos/types" element={<PlaceholderPage title="Video Types Management" />} />

//         {/* ============================================
//             SUBSCRIPTION CMS - ADMIN (FULLY CONFIGURED)
//         ============================================ */}
//         {/* Main Subscription Management */}
//         <Route path="subscriptions" element={<SubscriptionCMSPage />} />
//         <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
        
//         {/* Subscriber Management */}
//         <Route path="subscriptions/users" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers/:id" element={<PlaceholderPage title="Subscriber Details" />} />
        
//         {/* Transaction Management */}
//         <Route path="subscriptions/transactions" element={<TransactionsPage />} />
//         <Route path="subscriptions/payments" element={<TransactionsPage />} />
//         <Route path="subscriptions/transactions/:id" element={<PlaceholderPage title="Transaction Details" />} />
        
//         {/* Subscription Analytics */}
//         <Route path="subscriptions/analytics" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/stats" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/reports" element={<PlaceholderPage title="Subscription Reports" />} />
        
//         {/* Feature Management */}
//         <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
        
//         {/* Coupon/Discount Management */}
//         <Route path="subscriptions/coupons" element={<PlaceholderPage title="Coupon Management" />} />
//         <Route path="subscriptions/discounts" element={<PlaceholderPage title="Discount Management" />} />

//         {/* Site Management */}
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
        
//         {/* Category Management */}
//         <Route path="categories" element={<PlaceholderPage title="Categories Management" />} />
//         <Route path="categories/audio" element={<PlaceholderPage title="Audio Categories" />} />
//         <Route path="categories/video" element={<PlaceholderPage title="Video Categories" />} />
        
//         {/* Reports */}
//         <Route path="reports" element={<PlaceholderPage title="Reports" />} />
//         <Route path="reports/audio" element={<PlaceholderPage title="Audio Reports" />} />
//         <Route path="reports/payments" element={<PlaceholderPage title="Payment Reports" />} />
//       </Route>

//       {/* ============================================
//           FALLBACK - 404 PAGE
//       ============================================ */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default App
















// // client/src/App.jsx
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Subscription Pages
// import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx'
// import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage.jsx'
// import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'
// import DownloadsPage from './pages/user/DownloadsPage.jsx'
// import UserSubscriptionsPage from './pages/user/UserSubscriptionsPage.jsx'
// import UserBillingPage from './pages/user/UserBillingPage.jsx'
// import PaymentMethodsPage from './pages/user/PaymentMethodsPage.jsx'
// import InvoicesPage from './pages/user/InvoicesPage.jsx'
// import NotificationsPage from './pages/user/NotificationsPage'; // Import notifications page

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SubscribersListPage from './pages/admin/SubscribersListPage.jsx'
// import TransactionsPage from './pages/admin/TransactionsPage.jsx'
// import SubscriptionAnalyticsPage from './pages/admin/SubscriptionAnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'
// import NotificationCMSPage from './pages/admin/NotificationCMSPage'; // Import notification CMS

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// // Temporary placeholder component for missing pages
// const PlaceholderPage = ({ title }) => (
//   <div className="flex items-center justify-center min-h-[60vh]">
//     <div className="text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
//       <p className="text-gray-500">This page is under construction.</p>
//     </div>
//   </div>
// )

// const App = () => {
//   return (
//     <Routes>
//       {/* ============================================
//           PUBLIC ROUTES - Using SLUGS instead of IDs
//       ============================================ */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* Poetry Routes */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* Author Routes */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* Book Routes */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* Audio Routes - Public */}
//         <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />
//         <Route path="/audio/type/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
//         <Route path="/audio/category/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//         {/* Video Routes */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* ============================================
//           AUTH ROUTES
//       ============================================ */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* ============================================
//           SUBSCRIPTION ROUTES - PUBLIC
//       ============================================ */}
//       <Route path="/subscription" element={<SubscriptionPage />} />
//       <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
//       <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />

//       {/* ============================================
//           USER DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<DownloadsPage />} />
//         <Route path="history" element={<HistoryPage />} />
        
//         {/* User Subscription Routes */}
//         <Route path="subscriptions" element={<UserSubscriptionsPage />} />
//         <Route path="billing" element={<UserBillingPage />} />
//         <Route path="payment-methods" element={<PaymentMethodsPage />} />
//         <Route path="invoices" element={<InvoicesPage />} />
//         {/* NEW: User Notifications Route */}
//         <Route path="notifications" element={<NotificationsPage />} />
        
//       </Route>

//       {/* ============================================
//           CREATOR DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
        
//         {/* Creator Subscription Routes */}
//         <Route path="subscription" element={<PlaceholderPage title="Creator Subscription" />} />
//         <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
//       </Route>

//       {/* ============================================
//           ADMIN ROUTES
//       ============================================ */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Admin */}
//         <Route index element={<AdminDashboardPage />} />
        
//         {/* User Management */}
//         <Route path="users" element={<UserManagementPage />} />
//         <Route path="users/:id" element={<PlaceholderPage title="User Details" />} />
        
//         {/* Content Management */}
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
        
//         {/* Audio CMS - Admin */}
//         <Route path="audio" element={<AudioCMSPage />} />
//         <Route path="audio/types" element={<PlaceholderPage title="Audio Types Management" />} />
//         <Route path="audio/playlists" element={<PlaceholderPage title="Audio Playlists" />} />
//         <Route path="audio/analytics" element={<PlaceholderPage title="Audio Analytics" />} />
//         <Route path="audio/bulk-upload" element={<PlaceholderPage title="Bulk Audio Upload" />} />
        
//         {/* Video CMS - Admin */}
//         <Route path="videos" element={<VideoCMSPage />} />
//         <Route path="videos/types" element={<PlaceholderPage title="Video Types Management" />} />

//         {/* NEW: Notification CMS Page */}
//         <Route path="/admin/notifications" element={<NotificationCMSPage />} />

//         {/* ============================================
//             SUBSCRIPTION CMS - ADMIN (FULLY CONFIGURED)
//         ============================================ */}
//         {/* Main Subscription Management */}
//         <Route path="subscriptions" element={<SubscriptionCMSPage />} />
//         <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
        
//         {/* Subscriber Management */}
//         <Route path="subscriptions/users" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers/:id" element={<PlaceholderPage title="Subscriber Details" />} />
        
//         {/* Transaction Management */}
//         <Route path="subscriptions/transactions" element={<TransactionsPage />} />
//         <Route path="subscriptions/payments" element={<TransactionsPage />} />
//         <Route path="subscriptions/transactions/:id" element={<PlaceholderPage title="Transaction Details" />} />
        
//         {/* Subscription Analytics */}
//         <Route path="subscriptions/analytics" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/stats" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/reports" element={<PlaceholderPage title="Subscription Reports" />} />
        
//         {/* Feature Management */}
//         <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
        
//         {/* Coupon/Discount Management */}
//         <Route path="subscriptions/coupons" element={<PlaceholderPage title="Coupon Management" />} />
//         <Route path="subscriptions/discounts" element={<PlaceholderPage title="Discount Management" />} />

//         {/* Site Management */}
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
        
//         {/* Category Management */}
//         <Route path="categories" element={<PlaceholderPage title="Categories Management" />} />
//         <Route path="categories/audio" element={<PlaceholderPage title="Audio Categories" />} />
//         <Route path="categories/video" element={<PlaceholderPage title="Video Categories" />} />
        
//         {/* Reports */}
//         <Route path="reports" element={<PlaceholderPage title="Reports" />} />
//         <Route path="reports/audio" element={<PlaceholderPage title="Audio Reports" />} />
//         <Route path="reports/payments" element={<PlaceholderPage title="Payment Reports" />} />
//       </Route>

//       {/* ============================================
//           FALLBACK - 404 PAGE
//       ============================================ */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default App

















// // client/src/App.jsx
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// // Subscription Pages
// import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx'
// import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage.jsx'
// import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'
// import DownloadsPage from './pages/user/DownloadsPage.jsx'
// import UserSubscriptionsPage from './pages/user/UserSubscriptionsPage.jsx'
// import UserBillingPage from './pages/user/UserBillingPage.jsx'
// import PaymentMethodsPage from './pages/user/PaymentMethodsPage.jsx'
// import InvoicesPage from './pages/user/InvoicesPage.jsx'
// import NotificationsPage from './pages/user/NotificationsPage'

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import AudioTypesPage from './pages/admin/AudioTypesPage.jsx'
// import AudioPlaylistsPage from './pages/admin/AudioPlaylistsPage.jsx'
// import AudioBulkUploadPage from './pages/admin/AudioBulkUploadPage.jsx'
// import AudioAnalyticsPage from './pages/admin/AudioAnalyticsPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SubscribersListPage from './pages/admin/SubscribersListPage.jsx'
// import TransactionsPage from './pages/admin/TransactionsPage.jsx'
// import SubscriptionAnalyticsPage from './pages/admin/SubscriptionAnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'
// import NotificationCMSPage from './pages/admin/NotificationCMSPage'
// import CategoriesManagementPage from './pages/admin/CategoriesManagementPage.jsx'
// import AudioOccasionsPage from './pages/admin/AudioOccasionsPage';
// import AudioPlayerBar from './components/AudioPlayerBar';

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// // Temporary placeholder component for missing pages
// const PlaceholderPage = ({ title }) => (
//   <div className="flex items-center justify-center min-h-[60vh]">
//     <div className="text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
//       <p className="text-gray-500">This page is under construction.</p>
//     </div>
//   </div>
// )

// const App = () => {
//   return (
//     <Routes>
//       {/* ============================================
//           PUBLIC ROUTES - Using SLUGS instead of IDs
//       ============================================ */}
//       <Route element={<MainLayout />}>
//         {/* Home & Explore */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/explore" element={<ExplorePage />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/about" element={<AboutPage />} />

//         {/* Poetry Routes */}
//         <Route path="/poetry" element={<PoetryListPage />} />
//         <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//         <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//         {/* Author Routes */}
//         <Route path="/authors" element={<AuthorsListPage />} />
//         <Route path="/author/:slug" element={<AuthorDetailPage />} />
//         <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//         {/* Book Routes */}
//         <Route path="/books" element={<BooksListPage />} />
//         <Route path="/book/:slug" element={<BookDetailPage />} />
//         <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//         {/* Audio Routes - Public */}
//         <Route path="/audio" element={<AudioListPage />} />
//         <Route path="/audio/:slug" element={<AudioDetailPage />} />
//         <Route path="/audio/type/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
//         <Route path="/audio/category/:type" element={<AudioByTypePage />} />
//         <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//         {/* Video Routes */}
//         <Route path="/videos" element={<VideoListPage />} />
//         <Route path="/video/:slug" element={<VideoDetailPage />} />
//         <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />
//       </Route>

//       {/* ============================================
//           AUTH ROUTES
//       ============================================ */}
//       <Route path="/login" element={<LoginPage />} />
//       <Route path="/register" element={<RegisterPage />} />

//       {/* ============================================
//           SUBSCRIPTION ROUTES - PUBLIC
//       ============================================ */}
//       <Route path="/subscription" element={<SubscriptionPage />} />
//       <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
//       <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />

//       {/* ============================================
//           USER DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/dashboard"
//         element={
//           <ProtectedRoute>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<UserDashboardPage />} />
//         <Route path="profile" element={<ProfilePage />} />
//         <Route path="favorites" element={<FavoritesPage />} />
//         <Route path="downloads" element={<DownloadsPage />} />
//         <Route path="history" element={<HistoryPage />} />
        
//         {/* User Subscription Routes */}
//         <Route path="subscriptions" element={<UserSubscriptionsPage />} />
//         <Route path="billing" element={<UserBillingPage />} />
//         <Route path="payment-methods" element={<PaymentMethodsPage />} />
//         <Route path="invoices" element={<InvoicesPage />} />
//         <Route path="notifications" element={<NotificationsPage />} />
//       </Route>

//       {/* ============================================
//           CREATOR DASHBOARD ROUTES
//       ============================================ */}
//       <Route
//         path="/creator"
//         element={
//           <ProtectedRoute allowedRoles={['creator', 'admin']}>
//             <DashboardLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route index element={<CreatorDashboardPage />} />
//         <Route path="upload-poetry" element={<UploadPoetryPage />} />
//         <Route path="analytics" element={<RevenueAnalyticsPage />} />
//         <Route path="revenue" element={<RevenueAnalyticsPage />} />
        
//         {/* Creator Subscription Routes */}
//         <Route path="subscription" element={<PlaceholderPage title="Creator Subscription" />} />
//         <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
//       </Route>

//       {/* ============================================
//           ADMIN ROUTES
//       ============================================ */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={['admin']}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         {/* Main Admin Dashboard */}
//         <Route index element={<AdminDashboardPage />} />
        
//         {/* User Management */}
//         <Route path="users" element={<UserManagementPage />} />
//         <Route path="users/:id" element={<PlaceholderPage title="User Details" />} />
        
//         {/* Content Management */}
//         <Route path="poetry" element={<PoetryCMSPage />} />
//         <Route path="authors" element={<AuthorCMSPage />} />
//         <Route path="books" element={<EbookCMSPage />} />
        
//         {/* ============================================
//             AUDIO CMS - ADMIN (FULLY CONFIGURED)
//         ============================================ */}
//         {/* Main Audio Management */}
//         <Route path="audio" element={<AudioCMSPage />} />
        
//         {/* Audio Types Management */}
//         <Route path="audio/types" element={<AudioTypesPage />} />
//         <Route path="audio/occasions" element={<AudioOccasionsPage />} />
        
//         {/* Audio Playlists Management */}
//         <Route path="audio/playlists" element={<AudioPlaylistsPage />} />
        
//         {/* Audio Bulk Upload */}
//         <Route path="audio/bulk-upload" element={<AudioBulkUploadPage />} />
        
//         {/* Audio Analytics */}
//         <Route path="audio/analytics" element={<AudioAnalyticsPage />} />
        
//         {/* Audio Categories */}
//         <Route path="audio/categories" element={<CategoriesManagementPage type="audio" />} />
        
//         {/* Audio Reports */}
//         <Route path="audio/reports" element={<PlaceholderPage title="Audio Reports" />} />
        
//         {/* ============================================
//             VIDEO CMS - ADMIN
//         ============================================ */}
//         <Route path="videos" element={<VideoCMSPage />} />
//         <Route path="videos/types" element={<PlaceholderPage title="Video Types Management" />} />
//         <Route path="videos/analytics" element={<PlaceholderPage title="Video Analytics" />} />

//         {/* ============================================
//             NOTIFICATION CMS - ADMIN
//         ============================================ */}
//         <Route path="notifications" element={<NotificationCMSPage />} />

//         {/* ============================================
//             SUBSCRIPTION CMS - ADMIN (FULLY CONFIGURED)
//         ============================================ */}
//         {/* Main Subscription Management */}
//         <Route path="subscriptions" element={<SubscriptionCMSPage />} />
//         <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
        
//         {/* Subscriber Management */}
//         <Route path="subscriptions/users" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers" element={<SubscribersListPage />} />
//         <Route path="subscriptions/subscribers/:id" element={<PlaceholderPage title="Subscriber Details" />} />
        
//         {/* Transaction Management */}
//         <Route path="subscriptions/transactions" element={<TransactionsPage />} />
//         <Route path="subscriptions/payments" element={<TransactionsPage />} />
//         <Route path="subscriptions/transactions/:id" element={<PlaceholderPage title="Transaction Details" />} />
        
//         {/* Subscription Analytics */}
//         <Route path="subscriptions/analytics" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/stats" element={<SubscriptionAnalyticsPage />} />
//         <Route path="subscriptions/reports" element={<PlaceholderPage title="Subscription Reports" />} />
        
//         {/* Feature Management */}
//         <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
        
//         {/* Coupon/Discount Management */}
//         <Route path="subscriptions/coupons" element={<PlaceholderPage title="Coupon Management" />} />
//         <Route path="subscriptions/discounts" element={<PlaceholderPage title="Discount Management" />} />

//         {/* ============================================
//             SITE MANAGEMENT - ADMIN
//         ============================================ */}
//         <Route path="homepage" element={<HomepageCMSPage />} />
//         <Route path="seo" element={<SEOManagementPage />} />
//         <Route path="analytics" element={<AnalyticsPage />} />
//         <Route path="settings" element={<SettingsPage />} />
        
//         {/* Category Management */}
//         <Route path="categories" element={<CategoriesManagementPage />} />
//         <Route path="categories/audio" element={<CategoriesManagementPage type="audio" />} />
//         <Route path="categories/video" element={<CategoriesManagementPage type="video" />} />
        
//         {/* Reports */}
//         <Route path="reports" element={<PlaceholderPage title="Reports" />} />
//         <Route path="reports/audio" element={<PlaceholderPage title="Audio Reports" />} />
//         <Route path="reports/payments" element={<PlaceholderPage title="Payment Reports" />} />
        
//         {/* System */}
//         <Route path="system/logs" element={<PlaceholderPage title="System Logs" />} />
//         <Route path="system/backup" element={<PlaceholderPage title="Backup Management" />} />
//       </Route>

//       {/* ============================================
//           FALLBACK - 404 PAGE
//       ============================================ */}
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   )
// }

// export default App















// // client/src/App.jsx
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { useSelector } from 'react-redux'

// // Layouts
// import MainLayout from './layouts/MainLayout.jsx'
// import DashboardLayout from './layouts/DashboardLayout.jsx'
// import AdminLayout from './layouts/AdminLayout.jsx'

// // Public Pages
// import HomePage from './pages/public/HomePage.jsx'
// import ExplorePage from './pages/public/ExplorePage.jsx'
// import PoetryListPage from './pages/public/PoetryListPage.jsx'
// import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
// import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
// import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
// import BooksListPage from './pages/public/BooksListPage.jsx'
// import BookDetailPage from './pages/public/BookDetailPage.jsx'

// // Audio Public Pages
// import AudioListPage from './pages/public/AudioListPage.jsx'
// import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
// import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
// import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// // Video Public Pages
// import VideoListPage from './pages/public/VideoListPage.jsx'
// import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// // Other Public Pages
// import SearchPage from './pages/public/SearchPage.jsx'
// import AboutPage from './pages/public/AboutPage.jsx'

// //Blog
// import BlogListPage from './pages/public/BlogListPage';
// import BlogDetailPage from './pages/public/BlogDetailPage';

// // Subscription Pages
// import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx'
// import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage.jsx'
// import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage.jsx'

// // Auth Pages
// import LoginPage from './pages/auth/LoginPage.jsx'
// import RegisterPage from './pages/auth/RegisterPage.jsx'

// // User Dashboard Pages
// import UserDashboardPage from './pages/user/UserDashboard.jsx'
// import ProfilePage from './pages/user/UserProfile.jsx'
// import FavoritesPage from './pages/user/UserFavorites.jsx'
// import HistoryPage from './pages/user/UserHistory.jsx'
// import DownloadsPage from './pages/user/DownloadsPage.jsx'
// import UserSubscriptionsPage from './pages/user/UserSubscriptionsPage.jsx'
// import UserBillingPage from './pages/user/UserBillingPage.jsx'
// import PaymentMethodsPage from './pages/user/PaymentMethodsPage.jsx'
// import InvoicesPage from './pages/user/InvoicesPage.jsx'
// import NotificationsPage from './pages/user/NotificationsPage'

// // Creator Dashboard Pages
// import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
// import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// // Admin Pages
// import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
// import UserManagementPage from './pages/admin/UserManagementPage.jsx'
// import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
// import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
// import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
// import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
// import AudioTypesPage from './pages/admin/AudioTypesPage.jsx'
// import AudioPlaylistsPage from './pages/admin/AudioPlaylistsPage.jsx'
// import AudioBulkUploadPage from './pages/admin/AudioBulkUploadPage.jsx'
// import AudioAnalyticsPage from './pages/admin/AudioAnalyticsPage.jsx'
// import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
// import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
// import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
// import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
// import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
// import SubscribersListPage from './pages/admin/SubscribersListPage.jsx'
// import TransactionsPage from './pages/admin/TransactionsPage.jsx'
// import SubscriptionAnalyticsPage from './pages/admin/SubscriptionAnalyticsPage.jsx'
// import SettingsPage from './pages/admin/SettingsPage.jsx'
// import NotificationCMSPage from './pages/admin/NotificationCMSPage'
// import CategoriesManagementPage from './pages/admin/CategoriesManagementPage.jsx'
// import AudioOccasionsPage from './pages/admin/AudioOccasionsPage'
// import BlogCMSPage from './pages/admin/BlogCMSPage';
// //import BlogListPage from './pages/admin/BlogListPage';
// import BlogCategoriesPage from './pages/admin/BlogCategoriesPage'
// import BlogCommentsPage from './pages/admin/BlogCommentsPage'
// import DatabaseBackup from './pages/admin/DatabaseBackup';



// // Audio Player Component
// import AudioPlayerBar from './components/AudioPlayerBar'

// // Protected Route Component
// const ProtectedRoute = ({ children, allowedRoles = [] }) => {
//   const { isAuthenticated, user } = useSelector((state) => state.auth)

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />
//   }

//   if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />
//   }

//   return children
// }

// // Temporary placeholder component for missing pages
// const PlaceholderPage = ({ title }) => (
//   <div className="flex items-center justify-center min-h-[60vh]">
//     <div className="text-center">
//       <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
//       <p className="text-gray-500">This page is under construction.</p>
//     </div>
//   </div>
// )

// const App = () => {
//   return (
//     <>
//       <Routes>
//         {/* ============================================
//             PUBLIC ROUTES - Using SLUGS instead of IDs
//         ============================================ */}
//         <Route element={<MainLayout />}>
//           {/* Home & Explore */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/explore" element={<ExplorePage />} />
//           <Route path="/search" element={<SearchPage />} />
//           <Route path="/about" element={<AboutPage />} />

//           {/* Poetry Routes */}
//           <Route path="/poetry" element={<PoetryListPage />} />
//           <Route path="/poem/:slug" element={<PoetryDetailPage />} />
//           <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

//           {/* Author Routes */}
//           <Route path="/authors" element={<AuthorsListPage />} />
//           <Route path="/author/:slug" element={<AuthorDetailPage />} />
//           <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

//           {/* Book Routes */}
//           <Route path="/books" element={<BooksListPage />} />
//           <Route path="/book/:slug" element={<BookDetailPage />} />
//           <Route path="/books/:id" element={<Navigate to="/books" replace />} />

//           {/* Audio Routes - Public */}
//           <Route path="/audio" element={<AudioListPage />} />
//           <Route path="/audio/:slug" element={<AudioDetailPage />} />
//           <Route path="/audio/type/:type" element={<AudioByTypePage />} />
//           <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
//           <Route path="/audio/category/:type" element={<AudioByTypePage />} />
//           <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

//           {/* Video Routes */}
//           <Route path="/videos" element={<VideoListPage />} />
//           <Route path="/video/:slug" element={<VideoDetailPage />} />
//           <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />


//           {/* Blog Routes - Public */}
//           <Route path="/blog" element={<BlogListPage />} />
//           <Route path="/blog/:slug" element={<BlogDetailPage />} />

//         </Route>

//         {/* ============================================
//             AUTH ROUTES
//         ============================================ */}
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/register" element={<RegisterPage />} />

//         {/* ============================================
//             SUBSCRIPTION ROUTES - PUBLIC
//         ============================================ */}
//         <Route path="/subscription" element={<SubscriptionPage />} />
//         <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
//         <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />

//         {/* ============================================
//             USER DASHBOARD ROUTES
//         ============================================ */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<UserDashboardPage />} />
//           <Route path="profile" element={<ProfilePage />} />
//           <Route path="favorites" element={<FavoritesPage />} />
//           <Route path="downloads" element={<DownloadsPage />} />
//           <Route path="history" element={<HistoryPage />} />
          
//           {/* User Subscription Routes */}
//           <Route path="subscriptions" element={<UserSubscriptionsPage />} />
//           <Route path="billing" element={<UserBillingPage />} />
//           <Route path="payment-methods" element={<PaymentMethodsPage />} />
//           <Route path="invoices" element={<InvoicesPage />} />
//           <Route path="notifications" element={<NotificationsPage />} />
//         </Route>

//         {/* ============================================
//             CREATOR DASHBOARD ROUTES
//         ============================================ */}
//         <Route
//           path="/creator"
//           element={
//             <ProtectedRoute allowedRoles={['creator', 'admin']}>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         >
//           <Route index element={<CreatorDashboardPage />} />
//           <Route path="upload-poetry" element={<UploadPoetryPage />} />
//           <Route path="analytics" element={<RevenueAnalyticsPage />} />
//           <Route path="revenue" element={<RevenueAnalyticsPage />} />
          
//           {/* Creator Subscription Routes */}
//           <Route path="subscription" element={<PlaceholderPage title="Creator Subscription" />} />
//           <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
//         </Route>

//         {/* ============================================
//             ADMIN ROUTES
//         ============================================ */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <AdminLayout />
//             </ProtectedRoute>
//           }
//         >
//           {/* Main Admin Dashboard */}
//           <Route index element={<AdminDashboardPage />} />
          
//           {/* User Management */}
//           <Route path="users" element={<UserManagementPage />} />
//           <Route path="users/:id" element={<PlaceholderPage title="User Details" />} />
          
//           {/* Content Management */}
//           <Route path="poetry" element={<PoetryCMSPage />} />
//           <Route path="authors" element={<AuthorCMSPage />} />
//           <Route path="books" element={<EbookCMSPage />} />
          
//           {/* ============================================
//               AUDIO CMS - ADMIN (FULLY CONFIGURED)
//           ============================================ */}
//           {/* Main Audio Management */}
//           <Route path="audio" element={<AudioCMSPage />} />
          
//           {/* Audio Types Management */}
//           <Route path="audio/types" element={<AudioTypesPage />} />
//           <Route path="audio/occasions" element={<AudioOccasionsPage />} />
          
//           {/* Audio Playlists Management */}
//           <Route path="audio/playlists" element={<AudioPlaylistsPage />} />
          
//           {/* Audio Bulk Upload */}
//           <Route path="audio/bulk-upload" element={<AudioBulkUploadPage />} />
          
//           {/* Audio Analytics */}
//           <Route path="audio/analytics" element={<AudioAnalyticsPage />} />
          
//           {/* Audio Categories */}
//           <Route path="audio/categories" element={<CategoriesManagementPage type="audio" />} />
          
//           {/* Audio Reports */}
//           <Route path="audio/reports" element={<PlaceholderPage title="Audio Reports" />} />
          
//           {/* ============================================
//               VIDEO CMS - ADMIN
//           ============================================ */}
//           <Route path="videos" element={<VideoCMSPage />} />
//           <Route path="videos/types" element={<PlaceholderPage title="Video Types Management" />} />
//           <Route path="videos/analytics" element={<PlaceholderPage title="Video Analytics" />} />


//           {/* ============================================
//               BLOG CMS - ADMIN
//           ============================================ */}
          
//           <Route path="blog" element={<BlogListPage />} />
//           <Route path="blog/new" element={<BlogCMSPage />} />
//           <Route path="blog/edit/:id" element={<BlogCMSPage />} />
//           <Route path="blog" element={<BlogListPage />} />
//           <Route path="blog/categories" element={<BlogCategoriesPage />} />
//           <Route path="blog/comments" element={<BlogCommentsPage />} />

//           {/* ============================================
//               NOTIFICATION CMS - ADMIN
//           ============================================ */}
//           <Route path="notifications" element={<NotificationCMSPage />} />

//           {/* ============================================
//               SUBSCRIPTION CMS - ADMIN (FULLY CONFIGURED)
//           ============================================ */}
//           {/* Main Subscription Management */}
//           <Route path="subscriptions" element={<SubscriptionCMSPage />} />
//           <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
          
//           {/* Subscriber Management */}
//           <Route path="subscriptions/users" element={<SubscribersListPage />} />
//           <Route path="subscriptions/subscribers" element={<SubscribersListPage />} />
//           <Route path="subscriptions/subscribers/:id" element={<PlaceholderPage title="Subscriber Details" />} />
          
//           {/* Transaction Management */}
//           <Route path="subscriptions/transactions" element={<TransactionsPage />} />
//           <Route path="subscriptions/payments" element={<TransactionsPage />} />
//           <Route path="subscriptions/transactions/:id" element={<PlaceholderPage title="Transaction Details" />} />
          
//           {/* Subscription Analytics */}
//           <Route path="subscriptions/analytics" element={<SubscriptionAnalyticsPage />} />
//           <Route path="subscriptions/stats" element={<SubscriptionAnalyticsPage />} />
//           <Route path="subscriptions/reports" element={<PlaceholderPage title="Subscription Reports" />} />
          
//           {/* Feature Management */}
//           <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
          
//           {/* Coupon/Discount Management */}
//           <Route path="subscriptions/coupons" element={<PlaceholderPage title="Coupon Management" />} />
//           <Route path="subscriptions/discounts" element={<PlaceholderPage title="Discount Management" />} />

//           {/* ============================================
//               SITE MANAGEMENT - ADMIN
//           ============================================ */}
//           <Route path="homepage" element={<HomepageCMSPage />} />
//           <Route path="seo" element={<SEOManagementPage />} />
//           <Route path="analytics" element={<AnalyticsPage />} />
//           <Route path="settings" element={<SettingsPage />} />
          
//           {/* Category Management */}
//           <Route path="categories" element={<CategoriesManagementPage />} />
//           <Route path="categories/audio" element={<CategoriesManagementPage type="audio" />} />
//           <Route path="categories/video" element={<CategoriesManagementPage type="video" />} />
          
//           {/* Reports */}
//           <Route path="reports" element={<PlaceholderPage title="Reports" />} />
//           <Route path="reports/audio" element={<PlaceholderPage title="Audio Reports" />} />
//           <Route path="reports/payments" element={<PlaceholderPage title="Payment Reports" />} />
          
//           {/* System */}
//           <Route path="system/logs" element={<PlaceholderPage title="System Logs" />} />
//           <Route path="system/backup" element={<PlaceholderPage title="Backup Management" />} />


//         </Route>

//         {/* ============================================
//             FALLBACK - 404 PAGE
//         ============================================ */}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
      
//       {/* Global Audio Player Bar - Shows when audio is playing */}
//       <AudioPlayerBar />
//     </>
//   )
// }

// export default App



















// client/src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Layouts
import MainLayout from './layouts/MainLayout.jsx'
import DashboardLayout from './layouts/DashboardLayout.jsx'
import AdminLayout from './layouts/AdminLayout.jsx'

// Public Pages
import HomePage from './pages/public/HomePage.jsx'
import ExplorePage from './pages/public/ExplorePage.jsx'
import PoetryListPage from './pages/public/PoetryListPage.jsx'
import PoetryDetailPage from './pages/public/PoetryDetailPage.jsx'
import AuthorsListPage from './pages/public/AuthorsListPage.jsx'
import AuthorDetailPage from './pages/public/AuthorDetailPage.jsx'
import BooksListPage from './pages/public/BooksListPage.jsx'
import BookDetailPage from './pages/public/BookDetailPage.jsx'

// Audio Public Pages
import AudioListPage from './pages/public/AudioListPage.jsx'
import AudioDetailPage from './pages/public/AudioDetailPage.jsx'
import AudioByTypePage from './pages/public/AudioByTypePage.jsx'
import AudioByOccasionPage from './pages/public/AudioByOccasionPage.jsx'

// Video Public Pages
import VideoListPage from './pages/public/VideoListPage.jsx'
import VideoDetailPage from './pages/public/VideoDetailPage.jsx'

// Other Public Pages
import SearchPage from './pages/public/SearchPage.jsx'
import AboutPage from './pages/public/AboutPage.jsx'

// Blog
import BlogListPage from './pages/public/BlogListPage';
import BlogDetailPage from './pages/public/BlogDetailPage';

// Subscription Pages
import SubscriptionPage from './pages/subscription/SubscriptionPage.jsx'
import SubscriptionSuccessPage from './pages/subscription/SubscriptionSuccessPage.jsx'
import SubscriptionCancelPage from './pages/subscription/SubscriptionCancelPage.jsx'

// Auth Pages
import LoginPage from './pages/auth/LoginPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'

// User Dashboard Pages
import UserDashboardPage from './pages/user/UserDashboard.jsx'
import ProfilePage from './pages/user/UserProfile.jsx'
import FavoritesPage from './pages/user/UserFavorites.jsx'
import HistoryPage from './pages/user/UserHistory.jsx'
import DownloadsPage from './pages/user/DownloadsPage.jsx'
import UserSubscriptionsPage from './pages/user/UserSubscriptionsPage.jsx'
import UserBillingPage from './pages/user/UserBillingPage.jsx'
import PaymentMethodsPage from './pages/user/PaymentMethodsPage.jsx'
import InvoicesPage from './pages/user/InvoicesPage.jsx'
import NotificationsPage from './pages/user/NotificationsPage'

// Creator Dashboard Pages
import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import UserManagementPage from './pages/admin/UserManagementPage.jsx'
import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
import AudioCMSPage from './pages/admin/AudioCMSPage.jsx'
import AudioTypesPage from './pages/admin/AudioTypesPage.jsx'
import AudioPlaylistsPage from './pages/admin/AudioPlaylistsPage.jsx'
import AudioBulkUploadPage from './pages/admin/AudioBulkUploadPage.jsx'
import AudioAnalyticsPage from './pages/admin/AudioAnalyticsPage.jsx'
import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
import SubscriptionCMSPage from './pages/admin/SubscriptionCMSPage.jsx'
import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
import SubscribersListPage from './pages/admin/SubscribersListPage.jsx'
import TransactionsPage from './pages/admin/TransactionsPage.jsx'
import SubscriptionAnalyticsPage from './pages/admin/SubscriptionAnalyticsPage.jsx'
import SettingsPage from './pages/admin/SettingsPage.jsx'
import NotificationCMSPage from './pages/admin/NotificationCMSPage'
import CategoriesManagementPage from './pages/admin/CategoriesManagementPage.jsx'
import AudioOccasionsPage from './pages/admin/AudioOccasionsPage'
import BlogCMSPage from './pages/admin/BlogCMSPage';
import BlogCategoriesPage from './pages/admin/BlogCategoriesPage'
import BlogCommentsPage from './pages/admin/BlogCommentsPage'
import DatabaseBackup from './pages/admin/DatabaseBackup';

// Audio Player Component
import AudioPlayerBar from './components/AudioPlayerBar'

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth)

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}

// Temporary placeholder component for missing pages
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-500">This page is under construction.</p>
    </div>
  </div>
)

const App = () => {
  return (
    <>
      <Routes>
        {/* ============================================
            PUBLIC ROUTES - Using SLUGS instead of IDs
        ============================================ */}
        <Route element={<MainLayout />}>
          {/* Home & Explore */}
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Poetry Routes */}
          <Route path="/poetry" element={<PoetryListPage />} />
          <Route path="/poem/:slug" element={<PoetryDetailPage />} />
          <Route path="/poetry/:id" element={<Navigate to="/poetry" replace />} />

          {/* Author Routes */}
          <Route path="/authors" element={<AuthorsListPage />} />
          <Route path="/author/:slug" element={<AuthorDetailPage />} />
          <Route path="/authors/:id" element={<Navigate to="/authors" replace />} />

          {/* Book Routes */}
          <Route path="/books" element={<BooksListPage />} />
          <Route path="/book/:slug" element={<BookDetailPage />} />
          <Route path="/books/:id" element={<Navigate to="/books" replace />} />

          {/* Audio Routes - Public */}
          <Route path="/audio" element={<AudioListPage />} />
          <Route path="/audio/:slug" element={<AudioDetailPage />} />
          <Route path="/audio/type/:type" element={<AudioByTypePage />} />
          <Route path="/audio/occasion/:occasion" element={<AudioByOccasionPage />} />
          <Route path="/audio/category/:type" element={<AudioByTypePage />} />
          <Route path="/audio/id/:id" element={<Navigate to="/audio" replace />} />

          {/* Video Routes */}
          <Route path="/videos" element={<VideoListPage />} />
          <Route path="/video/:slug" element={<VideoDetailPage />} />
          <Route path="/videos/:id" element={<Navigate to="/videos" replace />} />

          {/* Blog Routes - Public */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogDetailPage />} />
        </Route>

        {/* ============================================
            AUTH ROUTES
        ============================================ */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* ============================================
            SUBSCRIPTION ROUTES - PUBLIC
        ============================================ */}
        <Route path="/subscription" element={<SubscriptionPage />} />
        <Route path="/subscription/success" element={<SubscriptionSuccessPage />} />
        <Route path="/subscription/cancel" element={<SubscriptionCancelPage />} />

        {/* ============================================
            USER DASHBOARD ROUTES
        ============================================ */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="downloads" element={<DownloadsPage />} />
          <Route path="history" element={<HistoryPage />} />
          
          {/* User Subscription Routes */}
          <Route path="subscriptions" element={<UserSubscriptionsPage />} />
          <Route path="billing" element={<UserBillingPage />} />
          <Route path="payment-methods" element={<PaymentMethodsPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>

        {/* ============================================
            CREATOR DASHBOARD ROUTES
        ============================================ */}
        <Route
          path="/creator"
          element={
            <ProtectedRoute allowedRoles={['creator', 'admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<CreatorDashboardPage />} />
          <Route path="upload-poetry" element={<UploadPoetryPage />} />
          <Route path="analytics" element={<RevenueAnalyticsPage />} />
          <Route path="revenue" element={<RevenueAnalyticsPage />} />
          
          {/* Creator Subscription Routes */}
          <Route path="subscription" element={<PlaceholderPage title="Creator Subscription" />} />
          <Route path="earnings" element={<PlaceholderPage title="Earnings" />} />
        </Route>

        {/* ============================================
            ADMIN ROUTES
        ============================================ */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          {/* Main Admin Dashboard */}
          <Route index element={<AdminDashboardPage />} />
          
          {/* User Management */}
          <Route path="users" element={<UserManagementPage />} />
          <Route path="users/:id" element={<PlaceholderPage title="User Details" />} />
          
          {/* Content Management */}
          <Route path="poetry" element={<PoetryCMSPage />} />
          <Route path="authors" element={<AuthorCMSPage />} />
          <Route path="books" element={<EbookCMSPage />} />
          
          {/* ============================================
              AUDIO CMS - ADMIN (FULLY CONFIGURED)
          ============================================ */}
          {/* Main Audio Management */}
          <Route path="audio" element={<AudioCMSPage />} />
          
          {/* Audio Types Management */}
          <Route path="audio/types" element={<AudioTypesPage />} />
          <Route path="audio/occasions" element={<AudioOccasionsPage />} />
          
          {/* Audio Playlists Management */}
          <Route path="audio/playlists" element={<AudioPlaylistsPage />} />
          
          {/* Audio Bulk Upload */}
          <Route path="audio/bulk-upload" element={<AudioBulkUploadPage />} />
          
          {/* Audio Analytics */}
          <Route path="audio/analytics" element={<AudioAnalyticsPage />} />
          
          {/* Audio Categories */}
          <Route path="audio/categories" element={<CategoriesManagementPage type="audio" />} />
          
          {/* Audio Reports */}
          <Route path="audio/reports" element={<PlaceholderPage title="Audio Reports" />} />
          
          {/* ============================================
              VIDEO CMS - ADMIN
          ============================================ */}
          <Route path="videos" element={<VideoCMSPage />} />
          <Route path="videos/types" element={<PlaceholderPage title="Video Types Management" />} />
          <Route path="videos/analytics" element={<PlaceholderPage title="Video Analytics" />} />

          {/* ============================================
              BLOG CMS - ADMIN
          ============================================ */}
          <Route path="blog" element={<BlogListPage />} />
          <Route path="blog/new" element={<BlogCMSPage />} />
          <Route path="blog/edit/:id" element={<BlogCMSPage />} />
          <Route path="blog/categories" element={<BlogCategoriesPage />} />
          <Route path="blog/comments" element={<BlogCommentsPage />} />

          {/* ============================================
              NOTIFICATION CMS - ADMIN
          ============================================ */}
          <Route path="notifications" element={<NotificationCMSPage />} />

          {/* ============================================
              SUBSCRIPTION CMS - ADMIN (FULLY CONFIGURED)
          ============================================ */}
          {/* Main Subscription Management */}
          <Route path="subscriptions" element={<SubscriptionCMSPage />} />
          <Route path="subscriptions/plans" element={<SubscriptionCMSPage />} />
          
          {/* Subscriber Management */}
          <Route path="subscriptions/users" element={<SubscribersListPage />} />
          <Route path="subscriptions/subscribers" element={<SubscribersListPage />} />
          <Route path="subscriptions/subscribers/:id" element={<PlaceholderPage title="Subscriber Details" />} />
          
          {/* Transaction Management */}
          <Route path="subscriptions/transactions" element={<TransactionsPage />} />
          <Route path="subscriptions/payments" element={<TransactionsPage />} />
          <Route path="subscriptions/transactions/:id" element={<PlaceholderPage title="Transaction Details" />} />
          
          {/* Subscription Analytics */}
          <Route path="subscriptions/analytics" element={<SubscriptionAnalyticsPage />} />
          <Route path="subscriptions/stats" element={<SubscriptionAnalyticsPage />} />
          <Route path="subscriptions/reports" element={<PlaceholderPage title="Subscription Reports" />} />
          
          {/* Feature Management */}
          <Route path="subscriptions/features" element={<PlaceholderPage title="Feature Toggles" />} />
          
          {/* Coupon/Discount Management */}
          <Route path="subscriptions/coupons" element={<PlaceholderPage title="Coupon Management" />} />
          <Route path="subscriptions/discounts" element={<PlaceholderPage title="Discount Management" />} />

          {/* ============================================
              SITE MANAGEMENT - ADMIN
          ============================================ */}
          <Route path="homepage" element={<HomepageCMSPage />} />
          <Route path="seo" element={<SEOManagementPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          
          {/* Category Management */}
          <Route path="categories" element={<CategoriesManagementPage />} />
          <Route path="categories/audio" element={<CategoriesManagementPage type="audio" />} />
          <Route path="categories/video" element={<CategoriesManagementPage type="video" />} />
          
          {/* Reports */}
          <Route path="reports" element={<PlaceholderPage title="Reports" />} />
          <Route path="reports/audio" element={<PlaceholderPage title="Audio Reports" />} />
          <Route path="reports/payments" element={<PlaceholderPage title="Payment Reports" />} />
          
          {/* System */}
          <Route path="system/logs" element={<PlaceholderPage title="System Logs" />} />
          <Route path="system/backup" element={<DatabaseBackup />} />
          <Route path="system/database-backup" element={<DatabaseBackup />} />
        </Route>

        {/* ============================================
            FALLBACK - 404 PAGE
        ============================================ */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      
      {/* Global Audio Player Bar - Shows when audio is playing */}
      <AudioPlayerBar />
    </>
  )
}

export default App