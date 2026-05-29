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
import VideoListPage from './pages/public/VideoListPage.jsx'
import VideoDetailPage from './pages/public/VideoDetailPage.jsx'
import SearchPage from './pages/public/SearchPage.jsx'
// import SubscriptionPage from './pages/public/SubscriptionPage.jsx'
import AboutPage from './pages/public/AboutPage.jsx'

// Auth Pages
import LoginPage from './pages/auth/LoginPage.jsx'
import RegisterPage from './pages/auth/RegisterPage.jsx'

// User Dashboard Pages
//saj
//import UserDashboardPage from '../../pages/user/UserDashboardPage.jsx'
import UserDashboardPage from './pages/user/UserDashboard.jsx'
//import ProfilePage from './pages/user/ProfilePage.jsx'
import ProfilePage from './pages/user/UserProfile.jsx'
//import FavoritesPage from './pages/user/FavoritesPage.jsx'
import FavoritesPage from './pages/user/UserFavorites.jsx'
//import DownloadsPage from './pages/user/DownloadsPage.jsx'
////////import DownloadsPage from './pages/user/UserDownloads.jsx'
//import HistoryPage from './pages/user/HistoryPage.jsx'
import HistoryPage from './pages/user/UserHistory.jsx'
/////import NotificationsPage from './pages/user/NotificationsPage.jsx'
/////import SubscriptionPageUser from './pages/user/SubscriptionPage.jsx'

// Creator Dashboard Pages
import CreatorDashboardPage from './pages/creator/CreatorDashboardPage.jsx'
import UploadPoetryPage from './pages/creator/UploadPoetryPage.jsx'
// import UploadEbookPage from './pages/creator/UploadEbookPage.jsx'
// import UploadAudioPage from './pages/creator/UploadAudioPage.jsx'
// import UploadVideoPage from './pages/creator/UploadVideoPage.jsx'
// import CreatorContentPage from './pages/creator/CreatorContentPage.jsx'
import RevenueAnalyticsPage from './pages/creator/RevenueAnalyticsPage.jsx'

// Admin Pages
import AdminDashboardPage from './pages/admin/AdminDashboardPage.jsx'
import UserManagementPage from './pages/admin/UserManagementPage.jsx'
import PoetryCMSPage from './pages/admin/PoetryCMSPage.jsx'
import AuthorCMSPage from './pages/admin/AuthorCMSPage.jsx'
import EbookCMSPage from './pages/admin/EbookCMSPage.jsx'
import VideoCMSPage from './pages/admin/VideoCMSPage.jsx'
import HomepageCMSPage from './pages/admin/HomepageCMSPage.jsx'
import SEOManagementPage from './pages/admin/SEOManagementPage.jsx'
import AnalyticsPage from './pages/admin/AnalyticsPage.jsx'
import SettingsPage from './pages/admin/SettingsPage.jsx'

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

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/poetry" element={<PoetryListPage />} />
        <Route path="/poetry/:id" element={<PoetryDetailPage />} />
        <Route path="/authors" element={<AuthorsListPage />} />
        <Route path="/authors/:id" element={<AuthorDetailPage />} />
        <Route path="/books" element={<BooksListPage />} />
        <Route path="/books/:id" element={<BookDetailPage />} />
        <Route path="/videos" element={<VideoListPage />} />
        <Route path="/videos/:id" element={<VideoDetailPage />} />
        <Route path="/search" element={<SearchPage />} />
        {/*<Route path="/subscription" element={<SubscriptionPage />} />*/}
        <Route path="/about" element={<AboutPage />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* User Dashboard Routes */}
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
        {/*<Route path="downloads" element={<DownloadsPage />} />*/}
        <Route path="downloads" element={<div>Downloads Coming Soon</div>} />
        <Route path="history" element={<HistoryPage />} />
        {/*<Route path="notifications" element={<NotificationsPage />} />*/}
        {/*<Route path="subscription" element={<SubscriptionPageUser />} />*/}
      </Route>

      {/* Creator Dashboard Routes */}
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
{/*        <Route path="upload-book" element={<UploadEbookPage />} />
        <Route path="upload-audio" element={<UploadAudioPage />} />*/}
        {/*<Route path="upload-video" element={<UploadVideoPage />} />*/}
        {/*<Route path="content" element={<CreatorContentPage />} />*/}
        <Route path="analytics" element={<RevenueAnalyticsPage />} />
        <Route path="revenue" element={<RevenueAnalyticsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<UserManagementPage />} />
        <Route path="poetry" element={<PoetryCMSPage />} />
        <Route path="authors" element={<AuthorCMSPage />} />
        <Route path="books" element={<EbookCMSPage />} />
        {/*<Route path="videos" element={<VideoCMSPage />} />*/}
        <Route path="homepage" element={<HomepageCMSPage />} />
        <Route path="seo" element={<SEOManagementPage />} />
        <Route path="analytics" element={<AnalyticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App