// import React from 'react'
// import { useLocation } from 'react-router-dom'
// import { Bell, Search, Menu, User } from 'lucide-react'

// const AdminTopBar = () => {
//   const location = useLocation()

//   const getPageTitle = () => {
//     const path = location.pathname
//     if (path === '/admin') return 'Admin Dashboard'
//     if (path.includes('users')) return 'User Management'
//     if (path.includes('poetry')) return 'Poetry CMS'
//     if (path.includes('authors')) return 'Author CMS'
//     if (path.includes('books')) return 'Ebook CMS'
//     if (path.includes('videos')) return 'Video CMS'
//     if (path.includes('homepage')) return 'Homepage CMS'
//     if (path.includes('seo')) return 'SEO Management'
//     if (path.includes('analytics')) return 'Analytics'
//     if (path.includes('settings')) return 'Settings'
//     return 'Admin Panel'
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
//           <div className="relative hidden md:block">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search..."
//               className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent w-64"
//             />
//           </div>
//           <button className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors relative">
//             <Bell className="h-5 w-5" />
//             <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//           </button>
//           <div className="flex items-center space-x-2">
//             <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
//               <User className="h-5 w-5 text-primary-600" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   )
// }

// export default AdminTopBar








// client/src/components/layout/AdminTopBar.jsx
import React, { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'  // Add Link here
import { Bell, Search, Menu, User, Headphones, Music, Mic, Radio, TrendingUp, X } from 'lucide-react'

const AdminTopBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getPageTitle = () => {
    const path = location.pathname
    
    // Main Pages
    if (path === '/admin') return 'Admin Dashboard'
    if (path.includes('/admin/users')) return 'User Management'
    if (path.includes('/admin/poetry')) return 'Poetry CMS'
    if (path.includes('/admin/authors')) return 'Author CMS'
    if (path.includes('/admin/books')) return 'Ebook CMS'
    if (path.includes('/admin/videos')) return 'Video CMS'
    if (path.includes('/admin/videos/types')) return 'Video Types'
    if (path.includes('/admin/homepage')) return 'Homepage CMS'
    if (path.includes('/admin/categories')) return 'Categories'
    if (path.includes('/admin/seo')) return 'SEO Management'
    if (path.includes('/admin/analytics')) return 'Analytics'
    if (path.includes('/admin/reports')) return 'Reports'
    if (path.includes('/admin/settings')) return 'Settings'
    
    // Audio Management Pages
    if (path === '/admin/audio') return 'Audio Dashboard'
    if (path.includes('/admin/audio/analytics')) return 'Audio Analytics'
    if (path.includes('/admin/audio/types')) return 'Audio Types'
    if (path.includes('/admin/audio/categories')) return 'Audio Categories'
    if (path.includes('/admin/audio/occasions')) return 'Audio Occasions'
    if (path.includes('/admin/audio/playlists')) return 'Audio Playlists'
    if (path.includes('/admin/audio/bulk-upload')) return 'Bulk Upload'
    // if (path.includes('/admin/audio/reports')) return 'Audio Reports'
    
    // Dynamic type pages
    if (path.includes('/admin/audio/type/nauha')) return 'Nauha Management'
    if (path.includes('/admin/audio/type/marsiya')) return 'Marsiya Management'
    if (path.includes('/admin/audio/type/majlis')) return 'Majlis Management'
    if (path.includes('/admin/audio/type/soz')) return 'Soz Management'
    if (path.includes('/admin/audio/type/salam')) return 'Salam Management'
    if (path.includes('/admin/audio/type/naat')) return 'Naat Management'
    if (path.includes('/admin/audio/type/hamd')) return 'Hamd Management'
    if (path.includes('/admin/audio/type/manqabat')) return 'Manqabat Management'
    if (path.includes('/admin/audio/type/ghazal')) return 'Ghazal Management'
    if (path.includes('/admin/audio/type/nazm')) return 'Nazm Management'
    if (path.includes('/admin/audio/type/podcast')) return 'Podcast Management'
    if (path.includes('/admin/audio/type/mushaira')) return 'Mushaira Management'
    
    // Occasion pages
    if (path.includes('/admin/audio/occasion/muharram')) return 'Muharram Content'
    if (path.includes('/admin/audio/occasion/ramadan')) return 'Ramadan Content'
    if (path.includes('/admin/audio/occasion/eid')) return 'Eid Content'
    if (path.includes('/admin/audio/occasion/milad')) return 'Milad Content'
    
    return 'Admin Panel'
  }

  const getPageIcon = () => {
    const path = location.pathname
    
    if (path.includes('/admin/audio')) return <Headphones className="h-5 w-5 text-primary-600" />
    if (path.includes('/admin/audio/analytics')) return <TrendingUp className="h-5 w-5 text-primary-600" />
    if (path.includes('/admin/audio/type/nauha')) return <Mic className="h-5 w-5 text-red-500" />
    if (path.includes('/admin/audio/type/marsiya')) return <Music className="h-5 w-5 text-orange-500" />
    if (path.includes('/admin/audio/type/majlis')) return <Radio className="h-5 w-5 text-purple-500" />
    
    return null
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/admin/audio?search=${encodeURIComponent(searchQuery)}`)
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
            {/* Search */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search audio..."
                    className="w-48 sm:w-64 pl-4 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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

            {/* Admin User */}
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Stats Bar (visible on audio pages) */}
      {(location.pathname.includes('/admin/audio') || location.pathname === '/admin/audio') && (
        <div className="bg-primary-50 border-t border-primary-100 px-4 sm:px-6 py-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              <span className="flex items-center space-x-1 text-primary-700">
                <Mic className="h-3 w-3" />
                <span>Nauha: 234</span>
              </span>
              <span className="flex items-center space-x-1 text-primary-700">
                <Music className="h-3 w-3" />
                <span>Marsiya: 189</span>
              </span>
              <span className="flex items-center space-x-1 text-primary-700">
                <Radio className="h-3 w-3" />
                <span>Majlis: 156</span>
              </span>
              <span className="flex items-center space-x-1 text-primary-700">
                <Headphones className="h-3 w-3" />
                <span>Total Plays: 89.2K</span>
              </span>
            </div>
            <Link to="/admin/audio/analytics" className="text-primary-600 hover:text-primary-700">
              View Analytics →
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

export default AdminTopBar