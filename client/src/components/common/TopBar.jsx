// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import { useAuth } from '../../hooks/useAuth.js'
// import { Bell, Search, Menu } from 'lucide-react'

// const TopBar = () => {
//   const { user } = useAuth()
//   const location = useLocation()

//   const getPageTitle = () => {
//     const path = location.pathname
//     if (path === '/dashboard') return 'Dashboard'
//     if (path.includes('favorites')) return 'My Favorites'
//     if (path.includes('downloads')) return 'My Downloads'
//     if (path.includes('history')) return 'Reading History'
//     if (path.includes('notifications')) return 'Notifications'
//     if (path.includes('subscription')) return 'Subscription'
//     if (path.includes('profile')) return 'Profile'
//     if (path.includes('settings')) return 'Settings'
//     if (path === '/creator') return 'Creator Dashboard'
//     if (path.includes('upload')) return 'Upload Content'
//     if (path.includes('content')) return 'My Content'
//     if (path.includes('analytics')) return 'Analytics'
//     if (path.includes('revenue')) return 'Revenue'
//     return 'Dashboard'
//   }

//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-4">
//       <div className="flex items-center justify-between">
//         <div className="flex items-center space-x-4">
//           <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
//             <Menu className="h-6 w-6" />
//           </button>
//           <h1 className="text-xl font-semibold text-gray-900">{getPageTitle()}</h1>
//         </div>

//         <div className="flex items-center space-x-4">
//           <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
//             <Search className="h-5 w-5" />
//           </button>
//           <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//           </button>
//           <div className="flex items-center space-x-2">
//             {user?.avatar ? (
//               <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
//             ) : (
//               <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
//                 <span className="text-sm font-medium text-primary-600">
//                   {user?.name?.charAt(0)?.toUpperCase() || 'U'}
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default TopBar








// client/src/components/layout/TopBar.jsx
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.js'
import { Bell, Search, Menu, X, Headphones, Music, Mic, Radio } from 'lucide-react'

const TopBar = () => {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getPageTitle = () => {
    const path = location.pathname
    
    // User Dashboard Pages
    if (path === '/dashboard') return 'Dashboard'
    if (path.includes('/dashboard/favorites')) return 'My Favorites'
    if (path.includes('/dashboard/downloads')) return 'My Downloads'
    if (path.includes('/dashboard/history')) return 'Reading History'
    if (path.includes('/dashboard/notifications')) return 'Notifications'
    if (path.includes('/dashboard/subscription')) return 'Subscription'
    if (path.includes('/dashboard/profile')) return 'Profile'
    if (path.includes('/dashboard/settings')) return 'Settings'
    
    // User Audio Pages
    if (path.includes('/dashboard/audio/history')) return 'Audio History'
    if (path.includes('/dashboard/audio/playlists')) return 'My Playlists'
    if (path.includes('/dashboard/audio/favorites')) return 'Favorite Audio'
    
    // Creator Dashboard Pages
    if (path === '/creator') return 'Creator Dashboard'
    if (path.includes('/creator/upload-poetry')) return 'Upload Poetry'
    if (path.includes('/creator/upload-book')) return 'Upload Ebook'
    if (path.includes('/creator/upload-audio')) return 'Upload Audio'
    if (path.includes('/creator/upload-video')) return 'Upload Video'
    if (path.includes('/creator/content')) return 'My Content'
    // if (path.includes('/creator/analytics')) return 'Analytics'
    // if (path.includes('/creator/revenue')) return 'Revenue'
    // if (path.includes('/creator/audio/analytics')) return 'Audio Analytics'
    if (path.includes('/creator/audio/playlists')) return 'Manage Playlists'
    
    // Admin Pages
    if (path === '/admin') return 'Admin Dashboard'
    if (path.includes('/admin/users')) return 'User Management'
    if (path.includes('/admin/poetry')) return 'Poetry CMS'
    if (path.includes('/admin/authors')) return 'Author CMS'
    if (path.includes('/admin/books')) return 'Ebook CMS'
    if (path.includes('/admin/audio')) return 'Audio CMS'
    if (path.includes('/admin/audio/types')) return 'Audio Types'
    if (path.includes('/admin/audio/categories')) return 'Audio Categories'
    // if (path.includes('/admin/audio/occasions')) return 'Occasions'
    if (path.includes('/admin/audio/playlists')) return 'Playlists'
    if (path.includes('/admin/audio/bulk-upload')) return 'Bulk Upload'
    // if (path.includes('/admin/audio/analytics')) return 'Audio Analytics'
    // if (path.includes('/admin/audio/reports')) return 'Audio Reports'
    if (path.includes('/admin/videos')) return 'Video CMS'
    if (path.includes('/admin/videos/types')) return 'Video Types'
    if (path.includes('/admin/homepage')) return 'Homepage CMS'
    if (path.includes('/admin/categories')) return 'Categories'
    if (path.includes('/admin/seo')) return 'SEO Management'
    if (path.includes('/admin/analytics')) return 'Analytics'
    if (path.includes('/admin/reports')) return 'Reports'
    if (path.includes('/admin/settings')) return 'Settings'
    
    return 'Dashboard'
  }

  const getPageIcon = () => {
    const path = location.pathname
    
    // Audio related icons
    if (path.includes('/audio')) return <Headphones className="h-5 w-5" />
    // if (path.includes('/audio/types')) return <Music className="h-5 w-5" />
    // if (path.includes('/audio/occasions')) return <Radio className="h-5 w-5" />
    if (path.includes('/creator/upload-audio')) return <Mic className="h-5 w-5" />
    
    // Default
    return null
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              {getPageIcon()}
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Button & Bar */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-48 sm:w-64 px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-primary-600"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-2 p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            )}

            {/* Notifications */}
            <button className="relative p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center space-x-2">
              {user?.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="h-8 w-8 sm:h-9 sm:w-9 rounded-full object-cover border-2 border-gray-100"
                />
              ) : (
                <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-600">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Bar (Optional) */}
      {location.pathname === '/dashboard' && (
        <div className="bg-gray-50 px-4 sm:px-6 py-2 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <Headphones className="h-3 w-3" />
                <span>Recently Played: 5 items</span>
              </span>
              <span className="flex items-center space-x-1">
                <Music className="h-3 w-3" />
                <span>Playlists: 3</span>
              </span>
            </div>
            <button className="text-primary-600 hover:text-primary-700">View All →</button>
          </div>
        </div>
      )}
    </header>
  )
}

export default TopBar








