// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark
// } from 'lucide-react'
// import { LANGUAGES } from '../../utils/constants.js'

// const Navbar = () => {
//   const { t } = useTranslation()
//   const { user, isAuthenticated, logout } = useAuth()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isLangOpen, setIsLangOpen] = useState(false)
//   const currentLang = useSelector((state) => state.ui.language)

//   const handleLanguageChange = (lang) => {
//     dispatch(setLanguage(lang))
//     setIsLangOpen(false)
//   }

//   const navLinks = [
//     { path: '/', label: t('common.home') },
//     { path: '/explore', label: t('common.explore') },
//     { path: '/poetry', label: t('common.poetry') },
//     { path: '/authors', label: t('common.authors') },
//     { path: '/books', label: t('common.books') },
//     { path: '/videos', label: t('common.videos') },
//   ]

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2">
//             <BookOpen className="h-8 w-8 text-primary-600" />
//             <span className="text-2xl font-bold text-gray-900">Zauq</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-2">
//             {/* Search */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {/* Language Switcher */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//               >
//                 <Globe className="h-5 w-5" />
//                 <span className="text-sm font-medium uppercase">{currentLang}</span>
//                 <ChevronDown className="h-4 w-4" />
//               </button>
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
//                   {LANGUAGES.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
//                         currentLang === lang.code ? 'text-primary-600 font-medium bg-primary-50' : 'text-gray-700'
//                       }`}
//                     >
//                       {lang.native}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Buttons */}
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-2">
//                 <Link
//                   to="/dashboard"
//                   className="hidden sm:flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   <Bookmark className="h-5 w-5" />
//                 </Link>
//                 <Link
//                   to="/dashboard"
//                   className="hidden sm:flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//                 >
//                   <Heart className="h-5 w-5" />
//                 </Link>
//                 <div className="relative group">
//                   <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
//                     ) : (
//                       <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
//                         <User className="h-5 w-5 text-primary-600" />
//                       </div>
//                     )}
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
//                     <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       {t('common.dashboard')}
//                     </Link>
//                     <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       {t('common.profile')}
//                     </Link>
//                     <hr className="my-1" />
//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>{t('common.logout')}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link
//                   to="/login"
//                   className="hidden sm:flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   <span>{t('common.login')}</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn-primary text-sm"
//                 >
//                   {t('common.register')}
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//             >
//               {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Search Bar */}
//       {isSearchOpen && (
//         <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
//           <div className="max-w-3xl mx-auto">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder={t('common.search') + '...'}
//                 className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                 autoFocus
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     navigate(`/search?q=${e.target.value}`)
//                     setIsSearchOpen(false)
//                   }
//                 }}
//               />
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white">
//           <div className="px-4 py-2 space-y-1">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
//               >
//                 {link.label}
//               </Link>
//             ))}
//             {!isAuthenticated && (
//               <div className="pt-2 space-y-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   {t('common.login')}
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
//                 >
//                   {t('common.register')}
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar












// client/src/components/layout/Navbar.jsx
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth.js'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../../store/slices/uiSlice.js'
import {
  Search, Menu, X, BookOpen, User, LogIn, LogOut,
  Globe, ChevronDown, Heart, Bookmark, Headphones, Video, Music
} from 'lucide-react'
import { LANGUAGES } from '../../utils/constants.js'

const Navbar = () => {
  const { t } = useTranslation()
  const { user, isAuthenticated, logout } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
  const currentLang = useSelector((state) => state.ui.language)

  const handleLanguageChange = (lang) => {
    dispatch(setLanguage(lang))
    setIsLangOpen(false)
  }

  // Audio category dropdown items
  const audioCategories = [
    { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', occasion: 'muharram' },
    { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram' },
    { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', occasion: 'muharram' },
    { path: '/audio/type/soz', label: 'Soz', icon: '🔥', occasion: 'muharram' },
    { path: '/audio/type/salam', label: 'Salam', icon: '🕊️', occasion: 'muharram' },
    // { path: '/audio/type/naat', label: 'Naat', icon: '⭐', occasion: 'milad' },
    // { path: '/audio/type/hamd', label: 'Hamd', icon: '🕌', occasion: 'general' },
    // { path: '/audio/type/manqabat', label: 'Manqabat', icon: '✨', occasion: 'general' },
    { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', occasion: 'general' },
    { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', occasion: 'general' },
    { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', occasion: 'general' },
    { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general' },
  ]

  // Occasion categories
  const occasionCategories = [
    { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤' },
    // { path: '/audio/occasion/ramadan', label: 'Ramadan', icon: '🌙' },
    // { path: '/audio/occasion/eid', label: 'Eid', icon: '🎉' },
    // { path: '/audio/occasion/milad', label: 'Milad un-Nabi', icon: '⭐' },
  ]

  const navLinks = [
    { path: '/', label: t('common.home'), icon: null },
    { path: '/explore', label: t('common.explore'), icon: null },
    { path: '/poetry', label: t('common.poetry'), icon: null },
    { path: '/authors', label: t('common.authors'), icon: null },
    { path: '/books', label: t('common.books'), icon: null },
    { path: '/audio', label: t('common.audio', 'Audio'), icon: Headphones, dropdown: true },
    { path: '/videos', label: t('common.videos'), icon: Video },
  ]

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-primary-600" />
            <span className="text-2xl font-bold text-gray-900">Zauq</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.dropdown ? (
                  <div
                    onMouseEnter={() => setIsAudioDropdownOpen(true)}
                    onMouseLeave={() => setIsAudioDropdownOpen(false)}
                    className="relative"
                  >
                    <Link
                      to={link.path}
                      className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      {link.icon && <link.icon className="h-4 w-4" />}
                      <span>{link.label}</span>
                      <ChevronDown className="h-3 w-3" />
                    </Link>
                    
                    {/* Audio Dropdown Menu */}
                    {isAudioDropdownOpen && (
                      <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                        <div className="px-3 py-2 border-b border-gray-100">
                          <p className="text-xs font-semibold text-gray-400 uppercase">By Category</p>
                        </div>
                        {audioCategories.map((category) => (
                          <Link
                            key={category.path}
                            to={category.path}
                            onClick={() => setIsAudioDropdownOpen(false)}
                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <span className="text-lg">{category.icon}</span>
                            <span>{category.label}</span>
                            {category.occasion && (
                              <span className="ml-auto text-xs text-gray-400 capitalize">{category.occasion}</span>
                            )}
                          </Link>
                        ))}
                        <div className="border-t border-gray-100 mt-2 pt-2">
                          <div className="px-3 py-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase">By Occasion</p>
                          </div>
                          {occasionCategories.map((occasion) => (
                            <Link
                              key={occasion.path}
                              to={occasion.path}
                              onClick={() => setIsAudioDropdownOpen(false)}
                              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              <span className="text-lg">{occasion.icon}</span>
                              <span>{occasion.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                  >
                    {link.icon && <link.icon className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
              >
                <Globe className="h-5 w-5" />
                <span className="text-sm font-medium uppercase">{currentLang}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        currentLang === lang.code ? 'text-primary-600 font-medium bg-primary-50' : 'text-gray-700'
                      }`}
                    >
                      {lang.native}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/dashboard/favorites"
                  className="hidden sm:flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  title="Favorites"
                >
                  <Heart className="h-5 w-5" />
                </Link>
                <Link
                  to="/dashboard/history"
                  className="hidden sm:flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                  title="History"
                >
                  <Bookmark className="h-5 w-5" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="" className="h-8 w-8 rounded-full object-cover" />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                    )}
                    <ChevronDown className="h-4 w-4 text-gray-600" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Dashboard
                    </Link>
                    <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link to="/dashboard/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      Favorites
                    </Link>
                    <Link to="/dashboard/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      History
                    </Link>
                    <hr className="my-1" />
                    {user?.role === 'admin' && (
                      <>
                        <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Admin Panel
                        </Link>
                        <hr className="my-1" />
                      </>
                    )}
                    {user?.role === 'creator' && (
                      <>
                        <Link to="/creator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                          Creator Dashboard
                        </Link>
                        <hr className="my-1" />
                      </>
                    )}
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="hidden sm:flex items-center space-x-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-gray-100 bg-gray-50 px-4 py-3">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search poems, authors, books, audio, videos..."
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/search?q=${e.target.value}`)
                    setIsSearchOpen(false)
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map((link) => (
              <div key={link.path}>
                {link.dropdown ? (
                  <>
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                    >
                      {link.icon && <link.icon className="h-5 w-5" />}
                      <span>{link.label}</span>
                    </Link>
                    {/* Mobile Audio Submenu */}
                    <div className="pl-8 space-y-1 mt-1">
                      <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">Categories</p>
                      {audioCategories.slice(0, 6).map((category) => (
                        <Link
                          key={category.path}
                          to={category.path}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50"
                        >
                          <span className="text-base">{category.icon}</span>
                          <span>{category.label}</span>
                        </Link>
                      ))}
                      <Link
                        to="/audio"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-primary-600 font-medium"
                      >
                        View All Audio →
                      </Link>
                    </div>
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  >
                    {link.icon && <link.icon className="h-5 w-5" />}
                    <span>{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
            {!isAuthenticated && (
              <div className="pt-4 space-y-2 border-t border-gray-100 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
                >
                  Register
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <div className="pt-4 space-y-2 border-t border-gray-100 mt-2">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                <Link
                  to="/dashboard/favorites"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  Favorites
                </Link>
                <Link
                  to="/dashboard/history"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
                >
                  History
                </Link>
                {user?.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50"
                  >
                    Admin Panel
                  </Link>
                )}
                {user?.role === 'creator' && (
                  <Link
                    to="/creator"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                  >
                    Creator Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar