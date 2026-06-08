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












// // client/src/components/layout/Navbar.jsx
// //this Navbar from client/src/layouts/MainLayout.jsx
// import React, { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark, Headphones, Video, Music
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
//   const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
//   const currentLang = useSelector((state) => state.ui.language)

//   const handleLanguageChange = (lang) => {
//     dispatch(setLanguage(lang))
//     setIsLangOpen(false)
//   }

//   // Audio category dropdown items
//   const audioCategories = [
//     { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', occasion: 'muharram' },
//     { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram' },
//     { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', occasion: 'muharram' },
//     { path: '/audio/type/soz', label: 'Soz', icon: '🔥', occasion: 'muharram' },
//     { path: '/audio/type/salam', label: 'Salam', icon: '🕊️', occasion: 'muharram' },
//     // { path: '/audio/type/naat', label: 'Naat', icon: '⭐', occasion: 'milad' },
//     // { path: '/audio/type/hamd', label: 'Hamd', icon: '🕌', occasion: 'general' },
//     // { path: '/audio/type/manqabat', label: 'Manqabat', icon: '✨', occasion: 'general' },
//     { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', occasion: 'general' },
//     { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', occasion: 'general' },
//     { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', occasion: 'general' },
//     { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general' },
//   ]

//   // Occasion categories
//   const occasionCategories = [
//     { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤' },
//     // { path: '/audio/occasion/ramadan', label: 'Ramadan', icon: '🌙' },
//     // { path: '/audio/occasion/eid', label: 'Eid', icon: '🎉' },
//     // { path: '/audio/occasion/milad', label: 'Milad un-Nabi', icon: '⭐' },
//   ]

//   const navLinks = [
//     { path: '/', label: t('common.home'), icon: null },
//     { path: '/explore', label: t('common.explore'), icon: null },
//     { path: '/poetry', label: t('common.poetry'), icon: null },
//     { path: '/authors', label: t('common.authors'), icon: null },
//     { path: '/books', label: t('common.books'), icon: null },
//     { path: '/audio', label: t('common.audio', 'Audio'), icon: Headphones, dropdown: true },
//     { path: '/videos', label: t('common.videos'), icon: Video },
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
//               <div key={link.path} className="relative">
//                 {link.dropdown ? (
//                   <div
//                     onMouseEnter={() => setIsAudioDropdownOpen(true)}
//                     onMouseLeave={() => setIsAudioDropdownOpen(false)}
//                     className="relative"
//                   >
//                     <Link
//                       to={link.path}
//                       className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
//                     >
//                       {link.icon && <link.icon className="h-4 w-4" />}
//                       <span>{link.label}</span>
//                       <ChevronDown className="h-3 w-3" />
//                     </Link>
                    
//                     {/* Audio Dropdown Menu */}
//                     {isAudioDropdownOpen && (
//                       <div className="absolute left-0 mt-0 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
//                         <div className="px-3 py-2 border-b border-gray-100">
//                           <p className="text-xs font-semibold text-gray-400 uppercase">By Category</p>
//                         </div>
//                         {audioCategories.map((category) => (
//                           <Link
//                             key={category.path}
//                             to={category.path}
//                             onClick={() => setIsAudioDropdownOpen(false)}
//                             className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                           >
//                             <span className="text-lg">{category.icon}</span>
//                             <span>{category.label}</span>
//                             {category.occasion && (
//                               <span className="ml-auto text-xs text-gray-400 capitalize">{category.occasion}</span>
//                             )}
//                           </Link>
//                         ))}
//                         <div className="border-t border-gray-100 mt-2 pt-2">
//                           <div className="px-3 py-2">
//                             <p className="text-xs font-semibold text-gray-400 uppercase">By Occasion</p>
//                           </div>
//                           {occasionCategories.map((occasion) => (
//                             <Link
//                               key={occasion.path}
//                               to={occasion.path}
//                               onClick={() => setIsAudioDropdownOpen(false)}
//                               className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
//                             >
//                               <span className="text-lg">{occasion.icon}</span>
//                               <span>{occasion.label}</span>
//                             </Link>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
//                   >
//                     {link.icon && <link.icon className="h-4 w-4" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
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
//                   to="/dashboard/favorites"
//                   className="hidden sm:flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//                   title="Favorites"
//                 >
//                   <Heart className="h-5 w-5" />
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   className="hidden sm:flex items-center space-x-1 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
//                   title="History"
//                 >
//                   <Bookmark className="h-5 w-5" />
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
//                     <ChevronDown className="h-4 w-4 text-gray-600" />
//                   </button>
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 hidden group-hover:block z-50">
//                     <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Dashboard
//                     </Link>
//                     <Link to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Profile
//                     </Link>
//                     <Link to="/dashboard/favorites" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       Favorites
//                     </Link>
//                     <Link to="/dashboard/history" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                       History
//                     </Link>
//                     <hr className="my-1" />
//                     {user?.role === 'admin' && (
//                       <>
//                         <Link to="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                           Admin Panel
//                         </Link>
//                         <hr className="my-1" />
//                       </>
//                     )}
//                     {user?.role === 'creator' && (
//                       <>
//                         <Link to="/creator" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
//                           Creator Dashboard
//                         </Link>
//                         <hr className="my-1" />
//                       </>
//                     )}
//                     <button
//                       onClick={logout}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       <span>Logout</span>
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
//                   <span>Login</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="btn-primary text-sm"
//                 >
//                   Register
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
//                 placeholder="Search poems, authors, books, audio, videos..."
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
//         <div className="md:hidden border-t border-gray-100 bg-white max-h-[calc(100vh-64px)] overflow-y-auto">
//           <div className="px-4 py-2 space-y-1">
//             {navLinks.map((link) => (
//               <div key={link.path}>
//                 {link.dropdown ? (
//                   <>
//                     <Link
//                       to={link.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
//                     >
//                       {link.icon && <link.icon className="h-5 w-5" />}
//                       <span>{link.label}</span>
//                     </Link>
//                     {/* Mobile Audio Submenu */}
//                     <div className="pl-8 space-y-1 mt-1">
//                       <p className="px-3 py-1 text-xs font-semibold text-gray-400 uppercase">Categories</p>
//                       {audioCategories.slice(0, 6).map((category) => (
//                         <Link
//                           key={category.path}
//                           to={category.path}
//                           onClick={() => setIsMenuOpen(false)}
//                           className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50"
//                         >
//                           <span className="text-base">{category.icon}</span>
//                           <span>{category.label}</span>
//                         </Link>
//                       ))}
//                       <Link
//                         to="/audio"
//                         onClick={() => setIsMenuOpen(false)}
//                         className="block px-3 py-2 text-sm text-primary-600 font-medium"
//                       >
//                         View All Audio →
//                       </Link>
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
//                   >
//                     {link.icon && <link.icon className="h-5 w-5" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
//             {!isAuthenticated && (
//               <div className="pt-4 space-y-2 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-primary-600 hover:bg-primary-50"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}
//             {isAuthenticated && (
//               <div className="pt-4 space-y-2 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/dashboard"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/dashboard/favorites"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   Favorites
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50"
//                 >
//                   History
//                 </Link>
//                 {user?.role === 'admin' && (
//                   <Link
//                     to="/admin"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-3 py-2 rounded-md text-base font-medium text-purple-600 hover:bg-purple-50"
//                   >
//                     Admin Panel
//                   </Link>
//                 )}
//                 {user?.role === 'creator' && (
//                   <Link
//                     to="/creator"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
//                   >
//                     Creator Dashboard
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     logout()
//                     setIsMenuOpen(false)
//                   }}
//                   className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                 >
//                   <LogOut className="h-5 w-5" />
//                   <span>Logout</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar












// // client/src/components/layout/Navbar.jsx

// import React, { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark, Headphones, Video,
//   Sparkles, TrendingUp, Clock, Award, Compass, Flame, Zap
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
//   const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [logoError, setLogoError] = useState(false)
//   const currentLang = useSelector((state) => state.ui.language)
//   const audioDropdownTimeoutRef = useRef(null)

//   // Dynamic logo configuration
//   const logoConfig = {
//     text: 'Zauq',
//     subtitle: 'Literary Platform',
//     image: 'https://res.cloudinary.com/dp8wwgs1y/image/upload/v1780172847/lms/banners/yhwihcwidhh6f6hjxott.png',
//     fallbackIcon: BookOpen,
//     gradient: 'from-amber-500 to-rose-500'
//   }

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleMouseEnter = () => {
//     if (audioDropdownTimeoutRef.current) clearTimeout(audioDropdownTimeoutRef.current)
//     setIsAudioDropdownOpen(true)
//   }

//   const handleMouseLeave = () => {
//     audioDropdownTimeoutRef.current = setTimeout(() => {
//       setIsAudioDropdownOpen(false)
//     }, 150)
//   }

//   const handleLanguageChange = (lang) => {
//     dispatch(setLanguage(lang))
//     setIsLangOpen(false)
//   }

//   // Audio category dropdown items
//   const audioCategories = [
//     { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', occasion: 'muharram', color: 'from-red-500 to-orange-500' },
//     { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram', color: 'from-gray-600 to-gray-800' },
//     { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', occasion: 'muharram', color: 'from-emerald-500 to-teal-500' },
//     { path: '/audio/type/soz', label: 'Soz', icon: '🔥', occasion: 'muharram', color: 'from-orange-500 to-red-500' },
//     { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', occasion: 'general', color: 'from-purple-500 to-pink-500' },
//     { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', occasion: 'general', color: 'from-indigo-500 to-purple-500' },
//     { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', occasion: 'general', color: 'from-amber-500 to-orange-500' },
//     { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general', color: 'from-rose-500 to-pink-500' },
//   ]

//   const occasionCategories = [
//     { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤', color: 'from-gray-700 to-gray-900' },
//   ]

//   const navLinks = [
//     { path: '/', label: t('common.home'), icon: Compass },
//     { path: '/explore', label: t('common.explore'), icon: Sparkles },
//     { path: '/poetry', label: t('common.poetry'), icon: BookOpen },
//     { path: '/authors', label: t('common.authors'), icon: User },
//     { path: '/books', label: t('common.books'), icon: Bookmark },
//     { path: '/audio', label: t('common.audio', 'Audio'), icon: Headphones, dropdown: true },
//     { path: '/videos', label: t('common.videos'), icon: Video },
//   ]

//   const getUserDisplayName = () => {
//     if (!user) return 'User'
//     return user?.name?.split(' ')[0] || user?.username || user?.email?.split('@')[0] || 'User'
//   }

//   const getUserRole = () => {
//     if (!user) return 'member'
//     return user?.role || 'member'
//   }

//   const getUserEmail = () => {
//     if (!user) return ''
//     return user?.email || ''
//   }

//   const renderLogo = () => {
//     if (logoConfig.image && !logoError) {
//       return (
//         <div className="relative">
//           <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
//           <img 
//             src={logoConfig.image} 
//             alt={logoConfig.text}
//             className="relative h-9 w-auto object-contain"
//             onError={() => setLogoError(true)}
//           />
//         </div>
//       )
//     }
    
//     const LogoIcon = logoConfig.fallbackIcon || BookOpen
//     return (
//       <div className="relative">
//         <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
//         <div className="relative bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-1.5 shadow-lg">
//           <LogoIcon className="h-5 w-5 text-white" />
//         </div>
//       </div>
//     )
//   }

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
//       scrolled 
//         ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-100/50' 
//         : 'bg-white/95 backdrop-blur-sm shadow-md'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14 lg:h-16">
          
//           {/* Logo - Compact & Premium */}
//           <Link 
//             to="/" 
//             className="flex items-center space-x-2 group cursor-pointer"
//           >
//             {renderLogo()}
//             <div className="flex flex-col">
//               <span className="text-xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
//                 {logoConfig.text}
//               </span>
//               {logoConfig.subtitle && (
//                 <span className="text-[9px] font-medium text-gray-400 -mt-0.5 hidden sm:block tracking-wider">
//                   {logoConfig.subtitle}
//                 </span>
//               )}
//             </div>
//           </Link>

//           {/* Desktop Navigation - Reduced spacing */}
//           <div className="hidden md:flex items-center space-x-0.5">
//             {navLinks.map((link) => (
//               <div key={link.path} className="relative">
//                 {link.dropdown ? (
//                   <div
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                     className="relative"
//                   >
//                     <Link
//                       to={link.path}
//                       className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200 group"
//                     >
//                       {link.icon && <link.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />}
//                       <span>{link.label}</span>
//                       <ChevronDown className={`h-3 w-3 transition-all duration-200 ${isAudioDropdownOpen ? 'rotate-180 text-amber-600' : ''}`} />
//                     </Link>
                    
//                     {/* Premium Audio Dropdown Menu */}
//                     {isAudioDropdownOpen && (
//                       <div 
//                         className="absolute left-0 mt-1 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeInUp"
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                       >
//                         <div className="bg-gradient-to-r from-amber-50 to-rose-50/50 px-4 py-2.5 border-b border-amber-100">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <h3 className="font-bold text-gray-800 text-sm">Audio Library</h3>
//                               <p className="text-[10px] text-gray-500 mt-0.5">Discover soulful recitations</p>
//                             </div>
//                             <div className="h-8 w-8 bg-gradient-to-br from-amber-400 to-rose-400 rounded-lg flex items-center justify-center">
//                               <Headphones className="h-4 w-4 text-white" />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-3 p-4">
//                           <div>
//                             <div className="flex items-center space-x-1.5 mb-2">
//                               <Flame className="h-3 w-3 text-amber-500" />
//                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Categories</p>
//                             </div>
//                             <div className="space-y-0.5">
//                               {audioCategories.map((category) => (
//                                 <Link
//                                   key={category.path}
//                                   to={category.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200 group"
//                                 >
//                                   <span className="text-base">{category.icon}</span>
//                                   <span className="flex-1 font-medium group-hover:text-amber-600">{category.label}</span>
//                                   {category.occasion && (
//                                     <span className="text-[9px] font-semibold text-gray-400 uppercase bg-gray-100 px-1.5 py-0.5 rounded-full">
//                                       {category.occasion}
//                                     </span>
//                                   )}
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <div className="flex items-center space-x-1.5 mb-2">
//                               <Zap className="h-3 w-3 text-amber-500" />
//                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Occasions</p>
//                             </div>
//                             <div className="space-y-0.5 mb-3">
//                               {occasionCategories.map((occasion) => (
//                                 <Link
//                                   key={occasion.path}
//                                   to={occasion.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200 group"
//                                 >
//                                   <span className="text-base">{occasion.icon}</span>
//                                   <span className="font-medium group-hover:text-amber-600">{occasion.label}</span>
//                                 </Link>
//                               ))}
//                             </div>
                            
//                             <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg border border-amber-100">
//                               <div className="flex items-center space-x-1.5">
//                                 <TrendingUp className="h-3 w-3 text-amber-600" />
//                                 <span className="text-[9px] font-bold text-amber-700 uppercase">Trending</span>
//                               </div>
//                               <p className="text-[11px] font-medium text-gray-800 mt-0.5">Nauha of the Week</p>
//                               <p className="text-[9px] text-gray-500">2.5k+ listens</p>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="border-t border-gray-100 px-4 py-2 bg-gray-50/50">
//                           <Link 
//                             to="/audio" 
//                             onClick={() => setIsAudioDropdownOpen(false)}
//                             className="flex items-center justify-between text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors group"
//                           >
//                             <span>Browse all audio</span>
//                             <span className="group-hover:translate-x-0.5 transition-transform">→</span>
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200 group"
//                   >
//                     {link.icon && <link.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Section - Compact & Premium */}
//           <div className="flex items-center space-x-0.5">
//             {/* Search Button */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//             >
//               <Search className="h-4 w-4" />
//             </button>

//             {/* Language Switcher */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center space-x-1 px-1.5 py-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//               >
//                 <Globe className="h-3.5 w-3.5" />
//                 <span className="text-xs font-bold uppercase hidden sm:inline">{currentLang}</span>
//                 <ChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-fadeInUp">
//                   <div className="px-3 py-1.5 border-b border-gray-100">
//                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Language</p>
//                   </div>
//                   {LANGUAGES.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`w-full text-left px-3 py-1.5 text-xs transition-all duration-200 ${
//                         currentLang === lang.code 
//                           ? 'text-amber-600 font-semibold bg-gradient-to-r from-amber-50 to-transparent' 
//                           : 'text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span>{lang.native}</span>
//                         {currentLang === lang.code && (
//                           <div className="h-1 w-1 bg-amber-500 rounded-full"></div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Buttons */}
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-0.5">
//                 <Link
//                   to="/dashboard/favorites"
//                   className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-rose-500 hover:bg-rose-50/60 transition-all duration-200 group relative"
//                   title="Favorites"
//                 >
//                   <Heart className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//                   <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 bg-gray-800 text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                     Favorites
//                   </span>
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-amber-500 hover:bg-amber-50/60 transition-all duration-200 group relative"
//                   title="History"
//                 >
//                   <Clock className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//                   <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 bg-gray-800 text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                     History
//                   </span>
//                 </Link>
                
//                 {/* User Menu */}
//                 <div className="relative group">
//                   <button className="flex items-center space-x-1.5 p-0.5 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt={getUserDisplayName()} className="h-7 w-7 rounded-lg object-cover ring-1 ring-amber-200" />
//                     ) : (
//                       <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
//                         <User className="h-3.5 w-3.5 text-amber-600" />
//                       </div>
//                     )}
//                     <div className="hidden lg:block text-left">
//                       <p className="text-xs font-bold text-gray-700 leading-tight">{getUserDisplayName()}</p>
//                       <p className="text-[9px] text-gray-400 capitalize">{getUserRole()}</p>
//                     </div>
//                     <ChevronDown className="h-3 w-3 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
//                   </button>
                  
//                   <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
//                     <div className="px-3 py-2 border-b border-gray-100">
//                       <p className="text-xs font-bold text-gray-800">{user?.name || getUserDisplayName()}</p>
//                       <p className="text-[10px] text-gray-500 truncate">{getUserEmail()}</p>
//                     </div>
//                     <div className="py-0.5">
//                       <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Award className="h-3 w-3" />
//                         <span>Dashboard</span>
//                       </Link>
//                       <Link to="/dashboard/profile" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <User className="h-3 w-3" />
//                         <span>Profile</span>
//                       </Link>
//                       <Link to="/dashboard/favorites" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Heart className="h-3 w-3" />
//                         <span>Favorites</span>
//                       </Link>
//                       <Link to="/dashboard/history" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Clock className="h-3 w-3" />
//                         <span>History</span>
//                       </Link>
//                     </div>
//                     <div className="border-t border-gray-100 my-1"></div>
//                     {getUserRole() === 'admin' && (
//                       <>
//                         <Link to="/admin" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all duration-200">
//                           <Sparkles className="h-3 w-3" />
//                           <span>Admin Panel</span>
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                       </>
//                     )}
//                     {getUserRole() === 'creator' && (
//                       <>
//                         <Link to="/creator" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
//                           <Award className="h-3 w-3" />
//                           <span>Creator</span>
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                       </>
//                     )}
//                     <button
//                       onClick={logout}
//                       className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-200"
//                     >
//                       <LogOut className="h-3 w-3" />
//                       <span>Sign Out</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-1">
//                 <Link
//                   to="/login"
//                   className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-amber-600 transition-all duration-200 rounded-lg hover:bg-amber-50/60"
//                 >
//                   <LogIn className="h-3 w-3" />
//                   <span>Sign In</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg hover:from-amber-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200"
//             >
//               {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Premium Search Bar */}
//       {isSearchOpen && (
//         <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 px-4 py-2.5 shadow-inner animate-slideDown">
//           <div className="max-w-2xl mx-auto">
//             <div className="relative group">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
//               <input
//                 type="text"
//                 placeholder="Search poems, authors, books, audio, videos..."
//                 className="w-full pl-8 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-amber-400 shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
//                 autoFocus
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     navigate(`/search?q=${e.target.value}`)
//                     setIsSearchOpen(false)
//                   }
//                 }}
//               />
//               <button
//                 onClick={() => setIsSearchOpen(false)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//             <div className="flex items-center justify-center space-x-3 mt-2 text-[10px] text-gray-400">
//               <span>Popular:</span>
//               <button className="hover:text-amber-600 transition-colors">Mirza Ghalib</button>
//               <button className="hover:text-amber-600 transition-colors">Allama Iqbal</button>
//               <button className="hover:text-amber-600 transition-colors">Nauha</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu - Compact */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md max-h-[calc(100vh-56px)] overflow-y-auto animate-slideRight">
//           <div className="px-3 py-2 space-y-0.5">
//             {navLinks.map((link) => (
//               <div key={link.path}>
//                 {link.dropdown ? (
//                   <>
//                     <Link
//                       to={link.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
//                     >
//                       {link.icon && <link.icon className="h-4 w-4" />}
//                       <span>{link.label}</span>
//                     </Link>
//                     <div className="pl-8 space-y-0.5 mt-0.5 mb-1">
//                       <p className="px-3 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Categories</p>
//                       {audioCategories.slice(0, 6).map((category) => (
//                         <Link
//                           key={category.path}
//                           to={category.path}
//                           onClick={() => setIsMenuOpen(false)}
//                           className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//                         >
//                           <span className="text-sm">{category.icon}</span>
//                           <span>{category.label}</span>
//                         </Link>
//                       ))}
//                       <Link
//                         to="/audio"
//                         onClick={() => setIsMenuOpen(false)}
//                         className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-amber-600"
//                       >
//                         <span>View All Audio</span>
//                         <span>→</span>
//                       </Link>
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
//                   >
//                     {link.icon && <link.icon className="h-4 w-4" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
            
//             {!isAuthenticated && (
//               <div className="pt-3 space-y-1 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   <span>Sign In</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             )}
            
//             {isAuthenticated && (
//               <div className="pt-3 space-y-0.5 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/dashboard"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Award className="h-4 w-4" />
//                   <span>Dashboard</span>
//                 </Link>
//                 <Link
//                   to="/dashboard/favorites"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Heart className="h-4 w-4" />
//                   <span>Favorites</span>
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Clock className="h-4 w-4" />
//                   <span>History</span>
//                 </Link>
//                 {getUserRole() === 'admin' && (
//                   <Link
//                     to="/admin"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all duration-200"
//                   >
//                     <Sparkles className="h-4 w-4" />
//                     <span>Admin Panel</span>
//                   </Link>
//                 )}
//                 {getUserRole() === 'creator' && (
//                   <Link
//                     to="/creator"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all duration-200"
//                   >
//                     <Award className="h-4 w-4" />
//                     <span>Creator Dashboard</span>
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     logout()
//                     setIsMenuOpen(false)
//                   }}
//                   className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Sign Out</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style jsx>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideRight {
//           from {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.15s ease-out;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.2s ease-out;
//         }
        
//         .animate-slideRight {
//           animation: slideRight 0.2s ease-out;
//         }
//       `}</style>
//     </nav>
//   )
// }

// export default Navbar











// // client/src/components/layout/Navbar.jsx

// import React, { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark, Headphones, Video,
//   Sparkles, TrendingUp, Clock, Award, Compass, Flame, Zap
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
//   const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [logoError, setLogoError] = useState(false)
//   const currentLang = useSelector((state) => state.ui.language)
//   const audioDropdownTimeoutRef = useRef(null)

//   // Dynamic logo configuration
//   const logoConfig = {
//     text: '',
//     subtitle: '',
//     image: 'https://res.cloudinary.com/dp8wwgs1y/image/upload/v1780172847/lms/banners/yhwihcwidhh6f6hjxott.png',
//     fallbackIcon: BookOpen,
//     gradient: 'from-amber-500 to-rose-500'
//   }

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleMouseEnter = () => {
//     if (audioDropdownTimeoutRef.current) clearTimeout(audioDropdownTimeoutRef.current)
//     setIsAudioDropdownOpen(true)
//   }

//   const handleMouseLeave = () => {
//     audioDropdownTimeoutRef.current = setTimeout(() => {
//       setIsAudioDropdownOpen(false)
//     }, 150)
//   }

//   const handleLanguageChange = (lang) => {
//     dispatch(setLanguage(lang))
//     setIsLangOpen(false)
//   }

//   // Audio category dropdown items
//   const audioCategories = [
//     { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', occasion: 'muharram', color: 'from-red-500 to-orange-500' },
//     { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram', color: 'from-gray-600 to-gray-800' },
//     { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', occasion: 'muharram', color: 'from-emerald-500 to-teal-500' },
//     { path: '/audio/type/soz', label: 'Soz', icon: '🔥', occasion: 'muharram', color: 'from-orange-500 to-red-500' },
//     { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', occasion: 'general', color: 'from-purple-500 to-pink-500' },
//     { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', occasion: 'general', color: 'from-indigo-500 to-purple-500' },
//     { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', occasion: 'general', color: 'from-amber-500 to-orange-500' },
//     { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general', color: 'from-rose-500 to-pink-500' },
//   ]

//   const occasionCategories = [
//     { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤', color: 'from-gray-700 to-gray-900' },
//   ]

//   const navLinks = [
//     { path: '/', label: t('common.home'), icon: Compass },
//     { path: '/explore', label: t('common.explore'), icon: Sparkles },
//     { path: '/poetry', label: t('common.poetry'), icon: BookOpen },
//     { path: '/authors', label: t('common.authors'), icon: User },
//     { path: '/books', label: t('common.books'), icon: Bookmark },
//     { path: '/audio', label: t('common.audio', 'Audio'), icon: Headphones, dropdown: true },
//     { path: '/videos', label: t('common.videos'), icon: Video },
//   ]

//   const getUserDisplayName = () => {
//     if (!user) return 'User'
//     return user?.name?.split(' ')[0] || user?.username || user?.email?.split('@')[0] || 'User'
//   }

//   const getUserRole = () => {
//     if (!user) return 'member'
//     return user?.role || 'member'
//   }

//   const getUserEmail = () => {
//     if (!user) return ''
//     return user?.email || ''
//   }

//   const renderLogo = () => {
//     if (logoConfig.image && !logoError) {
//       return (
//         <div className="relative">
//           <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
//           {/* CHANGE: Increased logo size from h-9 to h-12 and added w-auto for better scaling */}
//           <img 
//             src={logoConfig.image} 
//             alt={logoConfig.text}
//             className="relative h-16 w-auto object-contain"
//             onError={() => setLogoError(true)}
//           />
//         </div>
//       )
//     }
    
//     const LogoIcon = logoConfig.fallbackIcon || BookOpen
//     return (
//       <div className="relative">
//         <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
//         {/* CHANGE: Increased fallback icon container size and icon size */}
//         <div className="relative bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-2 shadow-lg">
//           <LogoIcon className="h-6 w-6 text-white" />
//         </div>
//       </div>
//     )
//   }

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 pt-2 ${
//       scrolled 
//         ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-100/50 pt-1' 
//         : 'bg-white/95 backdrop-blur-sm shadow-md pt-2'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14 lg:h-16">
          
//           {/* Logo - Compact & Premium */}
//           <Link 
//             to="/" 
//             className="flex items-center space-x-3 group cursor-pointer"
//           >
//             {renderLogo()}
//             {/* CHANGE: Increased text size from text-xl to text-2xl */}
//             <div className="flex flex-col">
//               <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
//                 {logoConfig.text}
//               </span>
//               {/* CHANGE: Slightly increased subtitle text size and margin */}
//               {logoConfig.subtitle && (
//                 <span className="text-[10px] font-medium text-gray-400 -mt-0.5 hidden sm:block tracking-wider">
//                   {logoConfig.subtitle}
//                 </span>
//               )}
//             </div>
//           </Link>

//           {/* Desktop Navigation - Reduced spacing */}
//           <div className="hidden md:flex items-center space-x-0.5">
//             {navLinks.map((link) => (
//               <div key={link.path} className="relative">
//                 {link.dropdown ? (
//                   <div
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                     className="relative"
//                   >
//                     <Link
//                       to={link.path}
//                       className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200 group"
//                     >
//                       {link.icon && <link.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />}
//                       <span>{link.label}</span>
//                       <ChevronDown className={`h-3 w-3 transition-all duration-200 ${isAudioDropdownOpen ? 'rotate-180 text-amber-600' : ''}`} />
//                     </Link>
                    
//                     {/* Premium Audio Dropdown Menu */}
//                     {isAudioDropdownOpen && (
//                       <div 
//                         className="absolute left-0 mt-1 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeInUp"
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                       >
//                         <div className="bg-gradient-to-r from-amber-50 to-rose-50/50 px-4 py-2.5 border-b border-amber-100">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <h3 className="font-bold text-gray-800 text-sm">Audio Library</h3>
//                               <p className="text-[10px] text-gray-500 mt-0.5">Discover soulful recitations</p>
//                             </div>
//                             <div className="h-8 w-8 bg-gradient-to-br from-amber-400 to-rose-400 rounded-lg flex items-center justify-center">
//                               <Headphones className="h-4 w-4 text-white" />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-3 p-4">
//                           <div>
//                             <div className="flex items-center space-x-1.5 mb-2">
//                               <Flame className="h-3 w-3 text-amber-500" />
//                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Categories</p>
//                             </div>
//                             <div className="space-y-0.5">
//                               {audioCategories.map((category) => (
//                                 <Link
//                                   key={category.path}
//                                   to={category.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200 group"
//                                 >
//                                   <span className="text-base">{category.icon}</span>
//                                   <span className="flex-1 font-medium group-hover:text-amber-600">{category.label}</span>
//                                   {category.occasion && (
//                                     <span className="text-[9px] font-semibold text-gray-400 uppercase bg-gray-100 px-1.5 py-0.5 rounded-full">
//                                       {category.occasion}
//                                     </span>
//                                   )}
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <div className="flex items-center space-x-1.5 mb-2">
//                               <Zap className="h-3 w-3 text-amber-500" />
//                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Occasions</p>
//                             </div>
//                             <div className="space-y-0.5 mb-3">
//                               {occasionCategories.map((occasion) => (
//                                 <Link
//                                   key={occasion.path}
//                                   to={occasion.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200 group"
//                                 >
//                                   <span className="text-base">{occasion.icon}</span>
//                                   <span className="font-medium group-hover:text-amber-600">{occasion.label}</span>
//                                 </Link>
//                               ))}
//                             </div>
                            
//                             <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg border border-amber-100">
//                               <div className="flex items-center space-x-1.5">
//                                 <TrendingUp className="h-3 w-3 text-amber-600" />
//                                 <span className="text-[9px] font-bold text-amber-700 uppercase">Trending</span>
//                               </div>
//                               <p className="text-[11px] font-medium text-gray-800 mt-0.5">Nauha of the Week</p>
//                               <p className="text-[9px] text-gray-500">2.5k+ listens</p>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="border-t border-gray-100 px-4 py-2 bg-gray-50/50">
//                           <Link 
//                             to="/audio" 
//                             onClick={() => setIsAudioDropdownOpen(false)}
//                             className="flex items-center justify-between text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors group"
//                           >
//                             <span>Browse all audio</span>
//                             <span className="group-hover:translate-x-0.5 transition-transform">→</span>
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200 group"
//                   >
//                     {link.icon && <link.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Section - Compact & Premium */}
//           <div className="flex items-center space-x-0.5">
//             {/* Search Button */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//             >
//               <Search className="h-4 w-4" />
//             </button>

//             {/* Language Switcher */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center space-x-1 px-1.5 py-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//               >
//                 <Globe className="h-3.5 w-3.5" />
//                 <span className="text-xs font-bold uppercase hidden sm:inline">{currentLang}</span>
//                 <ChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-fadeInUp">
//                   <div className="px-3 py-1.5 border-b border-gray-100">
//                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Language</p>
//                   </div>
//                   {LANGUAGES.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`w-full text-left px-3 py-1.5 text-xs transition-all duration-200 ${
//                         currentLang === lang.code 
//                           ? 'text-amber-600 font-semibold bg-gradient-to-r from-amber-50 to-transparent' 
//                           : 'text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <span>{lang.native}</span>
//                         {currentLang === lang.code && (
//                           <div className="h-1 w-1 bg-amber-500 rounded-full"></div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Buttons */}
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-0.5">
//                 <Link
//                   to="/dashboard/favorites"
//                   className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-rose-500 hover:bg-rose-50/60 transition-all duration-200 group relative"
//                   title="Favorites"
//                 >
//                   <Heart className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//                   <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 bg-gray-800 text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                     Favorites
//                   </span>
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-amber-500 hover:bg-amber-50/60 transition-all duration-200 group relative"
//                   title="History"
//                 >
//                   <Clock className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//                   <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 bg-gray-800 text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                     History
//                   </span>
//                 </Link>
                
//                 {/* User Menu */}
//                 <div className="relative group">
//                   <button className="flex items-center space-x-1.5 p-0.5 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt={getUserDisplayName()} className="h-7 w-7 rounded-lg object-cover ring-1 ring-amber-200" />
//                     ) : (
//                       <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
//                         <User className="h-3.5 w-3.5 text-amber-600" />
//                       </div>
//                     )}
//                     <div className="hidden lg:block text-left">
//                       <p className="text-xs font-bold text-gray-700 leading-tight">{getUserDisplayName()}</p>
//                       <p className="text-[9px] text-gray-400 capitalize">{getUserRole()}</p>
//                     </div>
//                     <ChevronDown className="h-3 w-3 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
//                   </button>
                  
//                   <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
//                     <div className="px-3 py-2 border-b border-gray-100">
//                       <p className="text-xs font-bold text-gray-800">{user?.name || getUserDisplayName()}</p>
//                       <p className="text-[10px] text-gray-500 truncate">{getUserEmail()}</p>
//                     </div>
//                     <div className="py-0.5">
//                       <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Award className="h-3 w-3" />
//                         <span>Dashboard</span>
//                       </Link>
//                       <Link to="/dashboard/profile" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <User className="h-3 w-3" />
//                         <span>Profile</span>
//                       </Link>
//                       <Link to="/dashboard/favorites" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Heart className="h-3 w-3" />
//                         <span>Favorites</span>
//                       </Link>
//                       <Link to="/dashboard/history" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Clock className="h-3 w-3" />
//                         <span>History</span>
//                       </Link>
//                     </div>
//                     <div className="border-t border-gray-100 my-1"></div>
//                     {getUserRole() === 'admin' && (
//                       <>
//                         <Link to="/admin" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all duration-200">
//                           <Sparkles className="h-3 w-3" />
//                           <span>Admin Panel</span>
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                       </>
//                     )}
//                     {getUserRole() === 'creator' && (
//                       <>
//                         <Link to="/creator" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
//                           <Award className="h-3 w-3" />
//                           <span>Creator</span>
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                       </>
//                     )}
//                     <button
//                       onClick={logout}
//                       className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-200"
//                     >
//                       <LogOut className="h-3 w-3" />
//                       <span>Sign Out</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-1">
//                 <Link
//                   to="/login"
//                   className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-amber-600 transition-all duration-200 rounded-lg hover:bg-amber-50/60"
//                 >
//                   <LogIn className="h-3 w-3" />
//                   <span>Sign In</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500 rounded-lg hover:from-amber-600 hover:to-rose-600 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200"
//             >
//               {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Premium Search Bar */}
//       {isSearchOpen && (
//         <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 px-4 py-2.5 shadow-inner animate-slideDown">
//           <div className="max-w-2xl mx-auto">
//             <div className="relative group">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
//               <input
//                 type="text"
//                 placeholder="Search poems, authors, books, audio, videos..."
//                 className="w-full pl-8 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-amber-400 shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
//                 autoFocus
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     navigate(`/search?q=${e.target.value}`)
//                     setIsSearchOpen(false)
//                   }
//                 }}
//               />
//               <button
//                 onClick={() => setIsSearchOpen(false)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//             <div className="flex items-center justify-center space-x-3 mt-2 text-[10px] text-gray-400">
//               <span>Popular:</span>
//               <button className="hover:text-amber-600 transition-colors">Mirza Ghalib</button>
//               <button className="hover:text-amber-600 transition-colors">Allama Iqbal</button>
//               <button className="hover:text-amber-600 transition-colors">Nauha</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu - Compact */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md max-h-[calc(100vh-56px)] overflow-y-auto animate-slideRight">
//           <div className="px-3 py-2 space-y-0.5">
//             {navLinks.map((link) => (
//               <div key={link.path}>
//                 {link.dropdown ? (
//                   <>
//                     <Link
//                       to={link.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
//                     >
//                       {link.icon && <link.icon className="h-4 w-4" />}
//                       <span>{link.label}</span>
//                     </Link>
//                     <div className="pl-8 space-y-0.5 mt-0.5 mb-1">
//                       <p className="px-3 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">Categories</p>
//                       {audioCategories.slice(0, 6).map((category) => (
//                         <Link
//                           key={category.path}
//                           to={category.path}
//                           onClick={() => setIsMenuOpen(false)}
//                           className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//                         >
//                           <span className="text-sm">{category.icon}</span>
//                           <span>{category.label}</span>
//                         </Link>
//                       ))}
//                       <Link
//                         to="/audio"
//                         onClick={() => setIsMenuOpen(false)}
//                         className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-amber-600"
//                       >
//                         <span>View All Audio</span>
//                         <span>→</span>
//                       </Link>
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
//                   >
//                     {link.icon && <link.icon className="h-4 w-4" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
            
//             {!isAuthenticated && (
//               <div className="pt-3 space-y-1 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   <span>Sign In</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-amber-500 to-rose-500"
//                 >
//                   Get Started
//                 </Link>
//               </div>
//             )}
            
//             {isAuthenticated && (
//               <div className="pt-3 space-y-0.5 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/dashboard"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Award className="h-4 w-4" />
//                   <span>Dashboard</span>
//                 </Link>
//                 <Link
//                   to="/dashboard/favorites"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Heart className="h-4 w-4" />
//                   <span>Favorites</span>
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Clock className="h-4 w-4" />
//                   <span>History</span>
//                 </Link>
//                 {getUserRole() === 'admin' && (
//                   <Link
//                     to="/admin"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all duration-200"
//                   >
//                     <Sparkles className="h-4 w-4" />
//                     <span>Admin Panel</span>
//                   </Link>
//                 )}
//                 {getUserRole() === 'creator' && (
//                   <Link
//                     to="/creator"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all duration-200"
//                   >
//                     <Award className="h-4 w-4" />
//                     <span>Creator Dashboard</span>
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     logout()
//                     setIsMenuOpen(false)
//                   }}
//                   className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>Sign Out</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideRight {
//           from {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.15s ease-out;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.2s ease-out;
//         }
        
//         .animate-slideRight {
//           animation: slideRight 0.2s ease-out;
//         }
//       `}</style>
//     </nav>
//   )
// }

// export default Navbar










// // client/src/components/layout/Navbar.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark, Headphones, Video,
//   Sparkles, TrendingUp, Clock, Award, Compass, Flame, Zap
// } from 'lucide-react'
// import settingsAPI from '../../api/settingsAPI.js'

// // Supported languages with Urdu and Hindi support
// const SUPPORTED_LANGUAGES = [
//   { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
//   { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', dir: 'rtl' },
//   { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
// ]

// const Navbar = () => {
//   const { t, i18n } = useTranslation()
//   const { user, isAuthenticated, logout } = useAuth()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isLangOpen, setIsLangOpen] = useState(false)
//   const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [logoError, setLogoError] = useState(false)
//   const [faviconError, setFaviconError] = useState(false)
//   const currentLang = useSelector((state) => state.ui.language) || 'en'
//   const audioDropdownTimeoutRef = useRef(null)

//   // Dynamic settings state
//   const [siteSettings, setSiteSettings] = useState({
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem',
//     siteLogo: '',
//     siteFavicon: '',
//     theme: 'light',
//     primaryColor: '#8B4513',
//     secondaryColor: '#DAA520',
//     fontFamily: 'Inter',
//     enableRTL: false
//   })

//   // Fetch site settings from backend
//   useEffect(() => {
//     const fetchSiteSettings = async () => {
//       try {
//         const response = await settingsAPI.getPublicSettings()
//         if (response?.data) {
//           setSiteSettings(prev => ({
//             ...prev,
//             ...response.data
//           }))
          
//           // Apply theme dynamically
//           if (response.data.theme === 'dark') {
//             document.documentElement.classList.add('dark')
//           } else if (response.data.theme === 'light') {
//             document.documentElement.classList.remove('dark')
//           }
          
//           // Apply font family
//           if (response.data.fontFamily) {
//             document.documentElement.style.setProperty('--font-family', response.data.fontFamily)
//             document.body.style.fontFamily = response.data.fontFamily
//           }
          
//           // Apply primary color as CSS variable
//           if (response.data.primaryColor) {
//             document.documentElement.style.setProperty('--primary-color', response.data.primaryColor)
//           }
          
//           // Apply RTL if needed
//           if (currentLang === 'ur' || response.data.enableRTL) {
//             document.documentElement.dir = 'rtl'
//             document.body.classList.add('rtl')
//           } else {
//             document.documentElement.dir = 'ltr'
//             document.body.classList.remove('rtl')
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching site settings:', error)
//       }
//     }
    
//     fetchSiteSettings()
//   }, [currentLang])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   const handleMouseEnter = () => {
//     if (audioDropdownTimeoutRef.current) clearTimeout(audioDropdownTimeoutRef.current)
//     setIsAudioDropdownOpen(true)
//   }

//   const handleMouseLeave = () => {
//     audioDropdownTimeoutRef.current = setTimeout(() => {
//       setIsAudioDropdownOpen(false)
//     }, 150)
//   }

//   const handleLanguageChange = (langCode) => {
//     // Update i18n
//     i18n.changeLanguage(langCode)
//     // Update Redux store
//     dispatch(setLanguage(langCode))
//     // Update HTML dir attribute for RTL support
//     if (langCode === 'ur') {
//       document.documentElement.dir = 'rtl'
//       document.body.classList.add('rtl')
//     } else {
//       document.documentElement.dir = 'ltr'
//       document.body.classList.remove('rtl')
//     }
//     // Close dropdown
//     setIsLangOpen(false)
//     // Save to localStorage
//     localStorage.setItem('language', langCode)
//   }

//   // Audio category dropdown items with translations
//   const audioCategories = [
//     { path: '/audio/type/nauha', label: t('audio.nauha', 'Nauha'), icon: '😢', occasion: 'muharram', color: 'from-red-500 to-orange-500' },
//     { path: '/audio/type/marsiya', label: t('audio.marsiya', 'Marsiya'), icon: '💔', occasion: 'muharram', color: 'from-gray-600 to-gray-800' },
//     { path: '/audio/type/majlis', label: t('audio.majlis', 'Majlis'), icon: '🕌', occasion: 'muharram', color: 'from-emerald-500 to-teal-500' },
//     { path: '/audio/type/soz', label: t('audio.soz', 'Soz'), icon: '🔥', occasion: 'muharram', color: 'from-orange-500 to-red-500' },
//     { path: '/audio/type/ghazal', label: t('audio.ghazal', 'Ghazal'), icon: '🎵', occasion: 'general', color: 'from-purple-500 to-pink-500' },
//     { path: '/audio/type/nazm', label: t('audio.nazm', 'Nazm'), icon: '📝', occasion: 'general', color: 'from-indigo-500 to-purple-500' },
//     { path: '/audio/type/podcast', label: t('audio.podcast', 'Podcast'), icon: '🎙️', occasion: 'general', color: 'from-amber-500 to-orange-500' },
//     { path: '/audio/type/mushaira', label: t('audio.mushaira', 'Mushaira'), icon: '🎤', occasion: 'general', color: 'from-rose-500 to-pink-500' },
//   ]

//   const occasionCategories = [
//     { path: '/audio/occasion/muharram', label: t('occasion.muharram', 'Muharram'), icon: '🖤', color: 'from-gray-700 to-gray-900' },
//   ]

//   const navLinks = [
//     { path: '/', label: t('common.home'), icon: Compass },
//     { path: '/explore', label: t('common.explore'), icon: Sparkles },
//     { path: '/poetry', label: t('common.poetry'), icon: BookOpen },
//     { path: '/authors', label: t('common.authors'), icon: User },
//     { path: '/books', label: t('common.books'), icon: Bookmark },
//     { path: '/audio', label: t('common.audio', 'Audio'), icon: Headphones, dropdown: true },
//     { path: '/videos', label: t('common.videos'), icon: Video },
//   ]

//   const getUserDisplayName = () => {
//     if (!user) return t('common.user', 'User')
//     return user?.name?.split(' ')[0] || user?.username || user?.email?.split('@')[0] || t('common.user', 'User')
//   }

//   const getUserRole = () => {
//     if (!user) return 'member'
//     return user?.role || 'member'
//   }

//   const getUserEmail = () => {
//     if (!user) return ''
//     return user?.email || ''
//   }

//   // Update favicon dynamically
//   useEffect(() => {
//     if (siteSettings.siteFavicon && !faviconError) {
//       let faviconLink = document.querySelector("link[rel*='icon']")
//       if (!faviconLink) {
//         faviconLink = document.createElement('link')
//         faviconLink.rel = 'icon'
//         document.head.appendChild(faviconLink)
//       }
//       faviconLink.href = siteSettings.siteFavicon
//     }
//   }, [siteSettings.siteFavicon, faviconError])

//   const renderLogo = () => {
//     if (siteSettings.siteLogo && !logoError) {
//       return (
//         <div className="relative group">
//           <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
//           <img 
//             src={siteSettings.siteLogo} 
//             alt={siteSettings.siteName}
//             className="relative h-12 w-auto object-contain"
//             onError={() => setLogoError(true)}
//           />
//         </div>
//       )
//     }
    
//     const LogoIcon = BookOpen
//     return (
//       <div className="relative group">
//         <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-rose-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
//         <div className="relative bg-gradient-to-br from-amber-500 to-rose-500 rounded-xl p-2 shadow-lg">
//           <LogoIcon className="h-6 w-6 text-white" />
//         </div>
//       </div>
//     )
//   }

//   // Dynamic gradient based on site colors
//   const getGradientStyle = () => {
//     return {
//       background: `linear-gradient(135deg, ${siteSettings.primaryColor || '#f59e0b'}, ${siteSettings.secondaryColor || '#e11d48'})`
//     }
//   }

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-300 pt-2 ${
//       scrolled 
//         ? 'bg-white/98 backdrop-blur-xl shadow-xl border-b border-gray-100/50 pt-1' 
//         : 'bg-white/95 backdrop-blur-sm shadow-md pt-2'
//     }`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-14 lg:h-16">
          
//           {/* Logo - Dynamic */}
//           <Link 
//             to="/" 
//             className="flex items-center space-x-3 group cursor-pointer"
//           >
//             {renderLogo()}
//             <div className="flex flex-col">
//               <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent tracking-tight">
//                 {siteSettings.siteName}
//               </span>
//               {siteSettings.siteDescription && (
//                 <span className="text-[10px] font-medium text-gray-400 -mt-0.5 hidden sm:block tracking-wider line-clamp-1 max-w-[150px]">
//                   {siteSettings.siteDescription}
//                 </span>
//               )}
//             </div>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-0.5">
//             {navLinks.map((link) => (
//               <div key={link.path} className="relative">
//                 {link.dropdown ? (
//                   <div
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                     className="relative"
//                   >
//                     <Link
//                       to={link.path}
//                       className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200 group"
//                     >
//                       {link.icon && <link.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />}
//                       <span>{link.label}</span>
//                       <ChevronDown className={`h-3 w-3 transition-all duration-200 ${isAudioDropdownOpen ? 'rotate-180 text-amber-600' : ''}`} />
//                     </Link>
                    
//                     {/* Premium Audio Dropdown Menu */}
//                     {isAudioDropdownOpen && (
//                       <div 
//                         className="absolute left-0 mt-1 w-[500px] bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeInUp"
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                       >
//                         <div className="bg-gradient-to-r from-amber-50 to-rose-50/50 px-4 py-2.5 border-b border-amber-100">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <h3 className="font-bold text-gray-800 text-sm">{t('audio.audioLibrary', 'Audio Library')}</h3>
//                               <p className="text-[10px] text-gray-500 mt-0.5">{t('audio.discoverRecitations', 'Discover soulful recitations')}</p>
//                             </div>
//                             <div className="h-8 w-8 bg-gradient-to-br from-amber-400 to-rose-400 rounded-lg flex items-center justify-center">
//                               <Headphones className="h-4 w-4 text-white" />
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-3 p-4">
//                           <div>
//                             <div className="flex items-center space-x-1.5 mb-2">
//                               <Flame className="h-3 w-3 text-amber-500" />
//                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('audio.categories', 'Categories')}</p>
//                             </div>
//                             <div className="space-y-0.5">
//                               {audioCategories.map((category) => (
//                                 <Link
//                                   key={category.path}
//                                   to={category.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200 group"
//                                 >
//                                   <span className="text-base">{category.icon}</span>
//                                   <span className="flex-1 font-medium group-hover:text-amber-600">{category.label}</span>
//                                   {category.occasion && (
//                                     <span className="text-[9px] font-semibold text-gray-400 uppercase bg-gray-100 px-1.5 py-0.5 rounded-full">
//                                       {category.occasion}
//                                     </span>
//                                   )}
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <div className="flex items-center space-x-1.5 mb-2">
//                               <Zap className="h-3 w-3 text-amber-500" />
//                               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{t('audio.occasions', 'Occasions')}</p>
//                             </div>
//                             <div className="space-y-0.5 mb-3">
//                               {occasionCategories.map((occasion) => (
//                                 <Link
//                                   key={occasion.path}
//                                   to={occasion.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200 group"
//                                 >
//                                   <span className="text-base">{occasion.icon}</span>
//                                   <span className="font-medium group-hover:text-amber-600">{occasion.label}</span>
//                                 </Link>
//                               ))}
//                             </div>
                            
//                             <div className="mt-2 p-2 bg-gradient-to-r from-amber-50 to-rose-50 rounded-lg border border-amber-100">
//                               <div className="flex items-center space-x-1.5">
//                                 <TrendingUp className="h-3 w-3 text-amber-600" />
//                                 <span className="text-[9px] font-bold text-amber-700 uppercase">{t('audio.trending', 'Trending')}</span>
//                               </div>
//                               <p className="text-[11px] font-medium text-gray-800 mt-0.5">{t('audio.nauhaOfWeek', 'Nauha of the Week')}</p>
//                               <p className="text-[9px] text-gray-500">2.5k+ {t('audio.listens', 'listens')}</p>
//                             </div>
//                           </div>
//                         </div>
                        
//                         <div className="border-t border-gray-100 px-4 py-2 bg-gray-50/50">
//                           <Link 
//                             to="/audio" 
//                             onClick={() => setIsAudioDropdownOpen(false)}
//                             className="flex items-center justify-between text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors group"
//                           >
//                             <span>{t('audio.browseAll', 'Browse all audio')}</span>
//                             <span className="group-hover:translate-x-0.5 transition-transform">→</span>
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-sm font-semibold text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200 group"
//                   >
//                     {link.icon && <link.icon className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center space-x-0.5">
//             {/* Search Button */}
//             <button
//               onClick={() => setIsSearchOpen(!isSearchOpen)}
//               className="p-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//             >
//               <Search className="h-4 w-4" />
//             </button>

//             {/* Language Switcher - Multi-language support */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center space-x-1 px-1.5 py-1.5 rounded-lg text-gray-500 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//               >
//                 <Globe className="h-3.5 w-3.5" />
//                 <span className="text-xs font-bold hidden sm:inline">
//                   {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.native || 'EN'}
//                 </span>
//                 <ChevronDown className={`h-2.5 w-2.5 transition-transform duration-200 ${isLangOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-fadeInUp">
//                   <div className="px-3 py-1.5 border-b border-gray-100">
//                     <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{t('language.selectLanguage', 'Select Language')}</p>
//                   </div>
//                   {SUPPORTED_LANGUAGES.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`w-full text-left px-3 py-2 text-sm transition-all duration-200 ${
//                         currentLang === lang.code 
//                           ? 'text-amber-600 font-semibold bg-gradient-to-r from-amber-50 to-transparent' 
//                           : 'text-gray-700 hover:bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <span className="text-base">{lang.flag}</span>
//                           <div>
//                             <p className="font-medium">{lang.name}</p>
//                             <p className="text-[10px] text-gray-400">{lang.native}</p>
//                           </div>
//                         </div>
//                         {currentLang === lang.code && (
//                           <div className="h-1.5 w-1.5 bg-amber-500 rounded-full"></div>
//                         )}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Buttons */}
//             {isAuthenticated ? (
//               <div className="flex items-center space-x-0.5">
//                 <Link
//                   to="/dashboard/favorites"
//                   className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-rose-500 hover:bg-rose-50/60 transition-all duration-200 group relative"
//                   title={t('common.favorites', 'Favorites')}
//                 >
//                   <Heart className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//                   <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 bg-gray-800 text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                     {t('common.favorites', 'Favorites')}
//                   </span>
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   className="hidden sm:flex items-center justify-center p-1.5 rounded-lg text-gray-500 hover:text-amber-500 hover:bg-amber-50/60 transition-all duration-200 group relative"
//                   title={t('common.history', 'History')}
//                 >
//                   <Clock className="h-3.5 w-3.5 transition-transform group-hover:scale-110" />
//                   <span className="absolute -top-7 left-1/2 transform -translate-x-1/2 px-1.5 py-0.5 bg-gray-800 text-white text-[9px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
//                     {t('common.history', 'History')}
//                   </span>
//                 </Link>
                
//                 {/* User Menu */}
//                 <div className="relative group">
//                   <button className="flex items-center space-x-1.5 p-0.5 rounded-lg hover:bg-gray-50 transition-all duration-200">
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt={getUserDisplayName()} className="h-7 w-7 rounded-lg object-cover ring-1 ring-amber-200" />
//                     ) : (
//                       <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-amber-100 to-rose-100 flex items-center justify-center">
//                         <User className="h-3.5 w-3.5 text-amber-600" />
//                       </div>
//                     )}
//                     <div className="hidden lg:block text-left">
//                       <p className="text-xs font-bold text-gray-700 leading-tight">{getUserDisplayName()}</p>
//                       <p className="text-[9px] text-gray-400 capitalize">{getUserRole()}</p>
//                     </div>
//                     <ChevronDown className="h-3 w-3 text-gray-400 transition-transform duration-200 group-hover:rotate-180" />
//                   </button>
                  
//                   <div className="absolute right-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-1 group-hover:translate-y-0 z-50">
//                     <div className="px-3 py-2 border-b border-gray-100">
//                       <p className="text-xs font-bold text-gray-800">{user?.name || getUserDisplayName()}</p>
//                       <p className="text-[10px] text-gray-500 truncate">{getUserEmail()}</p>
//                     </div>
//                     <div className="py-0.5">
//                       <Link to="/dashboard" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Award className="h-3 w-3" />
//                         <span>{t('common.dashboard', 'Dashboard')}</span>
//                       </Link>
//                       <Link to="/dashboard/profile" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <User className="h-3 w-3" />
//                         <span>{t('common.profile', 'Profile')}</span>
//                       </Link>
//                       <Link to="/dashboard/favorites" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Heart className="h-3 w-3" />
//                         <span>{t('common.favorites', 'Favorites')}</span>
//                       </Link>
//                       <Link to="/dashboard/history" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-gray-700 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200">
//                         <Clock className="h-3 w-3" />
//                         <span>{t('common.history', 'History')}</span>
//                       </Link>
//                     </div>
//                     <div className="border-t border-gray-100 my-1"></div>
//                     {getUserRole() === 'admin' && (
//                       <>
//                         <Link to="/admin" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-transparent transition-all duration-200">
//                           <Sparkles className="h-3 w-3" />
//                           <span>{t('common.adminPanel', 'Admin Panel')}</span>
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                       </>
//                     )}
//                     {getUserRole() === 'creator' && (
//                       <>
//                         <Link to="/creator" className="flex items-center space-x-2 px-3 py-1.5 text-xs text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-transparent transition-all duration-200">
//                           <Award className="h-3 w-3" />
//                           <span>{t('common.creator', 'Creator')}</span>
//                         </Link>
//                         <div className="border-t border-gray-100 my-1"></div>
//                       </>
//                     )}
//                     <button
//                       onClick={logout}
//                       className="w-full flex items-center space-x-2 px-3 py-1.5 text-xs text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-transparent transition-all duration-200"
//                     >
//                       <LogOut className="h-3 w-3" />
//                       <span>{t('common.signOut', 'Sign Out')}</span>
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-1">
//                 <Link
//                   to="/login"
//                   className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-bold text-gray-600 hover:text-amber-600 transition-all duration-200 rounded-lg hover:bg-amber-50/60"
//                 >
//                   <LogIn className="h-3 w-3" />
//                   <span>{t('common.signIn', 'Sign In')}</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   className="px-3 py-1.5 text-xs font-bold text-white rounded-lg hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
//                   style={getGradientStyle()}
//                 >
//                   {t('common.getStarted', 'Get Started')}
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-1.5 rounded-lg text-gray-600 hover:bg-amber-50 hover:text-amber-600 transition-all duration-200"
//             >
//               {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Premium Search Bar */}
//       {isSearchOpen && (
//         <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 px-4 py-2.5 shadow-inner animate-slideDown">
//           <div className="max-w-2xl mx-auto">
//             <div className="relative group">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
//               <input
//                 type="text"
//                 placeholder={t('search.placeholder', 'Search poems, authors, books, audio, videos...')}
//                 className="w-full pl-8 pr-8 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-amber-400 shadow-sm transition-all duration-200 text-gray-800 placeholder-gray-400"
//                 autoFocus
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     navigate(`/search?q=${e.target.value}`)
//                     setIsSearchOpen(false)
//                   }
//                 }}
//               />
//               <button
//                 onClick={() => setIsSearchOpen(false)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X className="h-3 w-3" />
//               </button>
//             </div>
//             <div className="flex items-center justify-center space-x-3 mt-2 text-[10px] text-gray-400">
//               <span>{t('search.popular', 'Popular:')}</span>
//               <button className="hover:text-amber-600 transition-colors">Mirza Ghalib</button>
//               <button className="hover:text-amber-600 transition-colors">Allama Iqbal</button>
//               <button className="hover:text-amber-600 transition-colors">Nauha</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t border-gray-100 bg-white/98 backdrop-blur-md max-h-[calc(100vh-56px)] overflow-y-auto animate-slideRight">
//           <div className="px-3 py-2 space-y-0.5">
//             {navLinks.map((link) => (
//               <div key={link.path}>
//                 {link.dropdown ? (
//                   <>
//                     <Link
//                       to={link.path}
//                       onClick={() => setIsMenuOpen(false)}
//                       className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
//                     >
//                       {link.icon && <link.icon className="h-4 w-4" />}
//                       <span>{link.label}</span>
//                     </Link>
//                     <div className="pl-8 space-y-0.5 mt-0.5 mb-1">
//                       <p className="px-3 py-1 text-[9px] font-bold text-gray-400 uppercase tracking-wider">{t('audio.categories', 'Categories')}</p>
//                       {audioCategories.slice(0, 6).map((category) => (
//                         <Link
//                           key={category.path}
//                           to={category.path}
//                           onClick={() => setIsMenuOpen(false)}
//                           className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:text-amber-600 hover:bg-amber-50/60 transition-all duration-200"
//                         >
//                           <span className="text-sm">{category.icon}</span>
//                           <span>{category.label}</span>
//                         </Link>
//                       ))}
//                       <Link
//                         to="/audio"
//                         onClick={() => setIsMenuOpen(false)}
//                         className="flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-amber-600"
//                       >
//                         <span>{t('audio.viewAll', 'View All Audio')}</span>
//                         <span>→</span>
//                       </Link>
//                     </div>
//                   </>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-transparent transition-all duration-200"
//                   >
//                     {link.icon && <link.icon className="h-4 w-4" />}
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
            
//             {!isAuthenticated && (
//               <div className="pt-3 space-y-1 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/login"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <LogIn className="h-4 w-4" />
//                   <span>{t('common.signIn', 'Sign In')}</span>
//                 </Link>
//                 <Link
//                   to="/register"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center justify-center px-3 py-2 rounded-lg text-sm font-bold text-white"
//                   style={getGradientStyle()}
//                 >
//                   {t('common.getStarted', 'Get Started')}
//                 </Link>
//               </div>
//             )}
            
//             {isAuthenticated && (
//               <div className="pt-3 space-y-0.5 border-t border-gray-100 mt-2">
//                 <Link
//                   to="/dashboard"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Award className="h-4 w-4" />
//                   <span>{t('common.dashboard', 'Dashboard')}</span>
//                 </Link>
//                 <Link
//                   to="/dashboard/favorites"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Heart className="h-4 w-4" />
//                   <span>{t('common.favorites', 'Favorites')}</span>
//                 </Link>
//                 <Link
//                   to="/dashboard/history"
//                   onClick={() => setIsMenuOpen(false)}
//                   className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
//                 >
//                   <Clock className="h-4 w-4" />
//                   <span>{t('common.history', 'History')}</span>
//                 </Link>
//                 {getUserRole() === 'admin' && (
//                   <Link
//                     to="/admin"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-purple-600 hover:bg-purple-50 transition-all duration-200"
//                   >
//                     <Sparkles className="h-4 w-4" />
//                     <span>{t('common.adminPanel', 'Admin Panel')}</span>
//                   </Link>
//                 )}
//                 {getUserRole() === 'creator' && (
//                   <Link
//                     to="/creator"
//                     onClick={() => setIsMenuOpen(false)}
//                     className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-blue-600 hover:bg-blue-50 transition-all duration-200"
//                   >
//                     <Award className="h-4 w-4" />
//                     <span>{t('common.creator', 'Creator')}</span>
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     logout()
//                     setIsMenuOpen(false)
//                   }}
//                   className="w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
//                 >
//                   <LogOut className="h-4 w-4" />
//                   <span>{t('common.signOut', 'Sign Out')}</span>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeInUp {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideRight {
//           from {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fadeInUp {
//           animation: fadeInUp 0.15s ease-out;
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.2s ease-out;
//         }
        
//         .animate-slideRight {
//           animation: slideRight 0.2s ease-out;
//         }
        
//         .line-clamp-1 {
//           display: -webkit-box;
//           -webkit-line-clamp: 1;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
        
//         /* RTL Support */
//         .rtl {
//           direction: rtl;
//         }
        
//         .rtl .space-x-0.5 > :not([hidden]) ~ :not([hidden]) {
//           margin-right: 0.125rem;
//           margin-left: 0;
//         }
        
//         .rtl .space-x-1.5 > :not([hidden]) ~ :not([hidden]) {
//           margin-right: 0.375rem;
//           margin-left: 0;
//         }
        
//         .rtl .space-x-2 > :not([hidden]) ~ :not([hidden]) {
//           margin-right: 0.5rem;
//           margin-left: 0;
//         }
        
//         .rtl .space-x-3 > :not([hidden]) ~ :not([hidden]) {
//           margin-right: 0.75rem;
//           margin-left: 0;
//         }
//       `}</style>
//     </nav>
//   )
// }

// export default Navbar

















// //6 June2026 client/src/components/layout/Navbar.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark, Headphones, Video,
//   Sparkles, TrendingUp, Clock, Award, Compass, Flame, Zap,
//   Mic, MicOff, Loader2, FileText, Music, Users, BookMarked,
//   LayoutGrid, Radio, Podcast, Newspaper, Star, ArrowRight,
//   Crown, Calendar, LayoutDashboard, Activity
// } from 'lucide-react'
// import settingsAPI from '../../api/settingsAPI.js'
// import audioAPI from '../../api/audioAPI.js'
// import authorAPI from '../../api/authorAPI.js'

// // Supported languages
// const SUPPORTED_LANGUAGES = [
//   { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
//   { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', dir: 'rtl' },
//   { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
// ]

// // Search categories
// const SEARCH_CATEGORIES = [
//   { id: 'all', label: 'All', icon: LayoutGrid, color: 'from-primary-500 to-secondary-500' },
//   { id: 'audio', label: 'Audio', icon: Headphones, color: 'from-amber-500 to-orange-500' },
//   { id: 'authors', label: 'Authors', icon: Users, color: 'from-blue-500 to-cyan-500' },
//   { id: 'poetry', label: 'Poetry', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
//   { id: 'books', label: 'Books', icon: BookMarked, color: 'from-purple-500 to-pink-500' },
//   { id: 'videos', label: 'Videos', icon: Video, color: 'from-red-500 to-rose-500' },
// ]

// const Navbar = () => {
//   const { t, i18n } = useTranslation()
//   const { user, isAuthenticated, logout } = useAuth()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
  
//   // State declarations
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isLangOpen, setIsLangOpen] = useState(false)
//   const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [logoError, setLogoError] = useState(false)
//   const [faviconError, setFaviconError] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [searchResults, setSearchResults] = useState([])
//   const [searching, setSearching] = useState(false)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [voiceTranscript, setVoiceTranscript] = useState('')
//   const [showResults, setShowResults] = useState(false)
  
//   const currentLang = useSelector((state) => state.ui.language) || 'en'
//   const audioDropdownTimeoutRef = useRef(null)
//   const searchTimeoutRef = useRef(null)
//   const searchRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Primary color
//   const primaryColor = '#db2777'
//   const secondaryColor = '#8b5cf6'

//   // Dynamic settings state
//   const [siteSettings, setSiteSettings] = useState({
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem',
//     siteLogo: '',
//     siteFavicon: '',
//     theme: 'light',
//     primaryColor: primaryColor,
//     secondaryColor: secondaryColor,
//     fontFamily: 'Inter',
//     enableRTL: false
//   })

//   // Fetch site settings
//   useEffect(() => {
//     const fetchSiteSettings = async () => {
//       try {
//         const response = await settingsAPI.getPublicSettings()
//         if (response?.data) {
//           setSiteSettings(prev => ({ ...prev, ...response.data }))
          
//           if (response.data.theme === 'dark') {
//             document.documentElement.classList.add('dark')
//           } else if (response.data.theme === 'light') {
//             document.documentElement.classList.remove('dark')
//           }
          
//           if (response.data.fontFamily) {
//             document.documentElement.style.setProperty('--font-family', response.data.fontFamily)
//             document.body.style.fontFamily = response.data.fontFamily
//           }
          
//           if (currentLang === 'ur' || response.data.enableRTL) {
//             document.documentElement.dir = 'rtl'
//             document.body.classList.add('rtl')
//           } else {
//             document.documentElement.dir = 'ltr'
//             document.body.classList.remove('rtl')
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching site settings:', error)
//       }
//     }
//     fetchSiteSettings()
//   }, [currentLang])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Initialize speech recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (!SpeechRecognition) {
//       setVoiceSupported(false)
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.continuous = false
//     recognition.interimResults = true
//     recognition.lang = 'en-US'
//     recognition.maxAlternatives = 5

//     recognition.onstart = () => {
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsListening(false)
//     }

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript
//       setVoiceTranscript(transcript)
//       if (event.results[0].isFinal) {
//         setSearchQuery(transcript)
//         performSearch(transcript)
//       }
//     }

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error)
//       setIsListening(false)
//     }

//     recognitionRef.current = recognition

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }
//     }
//   }, [])

//   // Close search results on click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Perform search using existing APIs
//   const performSearch = async (query) => {
//     if (!query || query.trim().length < 2) {
//       setSearchResults([])
//       setShowResults(false)
//       return
//     }

//     setSearching(true)
//     setShowResults(true)

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current)
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         let results = []
        
//         // Search Audio
//         if (selectedCategory === 'all' || selectedCategory === 'audio') {
//           try {
//             const audioResponse = await audioAPI.getAudioItems({ search: query, limit: 3 })
//             const audioData = audioResponse?.data?.data || audioResponse?.data || audioResponse || []
//             const audioResults = audioData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || `${item.type} audio`,
//               url: `/audio/${item.slug}`,
//               type: 'audio',
//               icon: <Headphones className="h-4 w-4" />
//             }))
//             results = [...results, ...audioResults]
//           } catch (error) {
//             console.error('Audio search error:', error)
//           }
//         }
        
//         // Search Authors
//         if (selectedCategory === 'all' || selectedCategory === 'authors') {
//           try {
//             const authorResponse = await authorAPI.getAuthors({ search: query, limit: 3 })
//             const authorData = authorResponse?.data?.data || authorResponse?.data || authorResponse || []
//             const authorResults = authorData.map(item => ({
//               id: item._id,
//               title: item.name,
//               description: item.bio?.substring(0, 100) || `${item.era || 'Poet'} - ${item.genres?.join(', ') || 'Author'}`,
//               url: `/author/${item.slug}`,
//               type: 'author',
//               icon: <Users className="h-4 w-4" />
//             }))
//             results = [...results, ...authorResults]
//           } catch (error) {
//             console.error('Author search error:', error)
//           }
//         }
        
//         // Search Poetry (if API exists)
//         if (selectedCategory === 'all' || selectedCategory === 'poetry') {
//           try {
//             // Using audio API as fallback for poetry
//             const poetryResponse = await audioAPI.getAudioItems({ search: query, type: 'poem_recitation', limit: 3 })
//             const poetryData = poetryResponse?.data?.data || poetryResponse?.data || poetryResponse || []
//             const poetryResults = poetryData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || 'Poem recitation',
//               url: `/poem/${item.slug || item._id}`,
//               type: 'poetry',
//               icon: <BookOpen className="h-4 w-4" />
//             }))
//             results = [...results, ...poetryResults]
//           } catch (error) {
//             console.error('Poetry search error:', error)
//           }
//         }
        
//         // Search Books (if API exists)
//         if (selectedCategory === 'all' || selectedCategory === 'books') {
//           try {
//             // Using audio API as fallback for audiobooks
//             const bookResponse = await audioAPI.getAudioItems({ search: query, type: 'audiobook', limit: 3 })
//             const bookData = bookResponse?.data?.data || bookResponse?.data || bookResponse || []
//             const bookResults = bookData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || 'Audiobook',
//               url: `/book/${item.slug || item._id}`,
//               type: 'book',
//               icon: <BookMarked className="h-4 w-4" />
//             }))
//             results = [...results, ...bookResults]
//           } catch (error) {
//             console.error('Book search error:', error)
//           }
//         }
        
//         // Search Videos
//         if (selectedCategory === 'all' || selectedCategory === 'videos') {
//           try {
//             // Using audio API as fallback
//             const videoResponse = await audioAPI.getAudioItems({ search: query, limit: 3 })
//             const videoData = videoResponse?.data?.data || videoResponse?.data || videoResponse || []
//             const videoResults = videoData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || `${item.type} content`,
//               url: `/video/${item.slug || item._id}`,
//               type: 'video',
//               icon: <Video className="h-4 w-4" />
//             }))
//             results = [...results, ...videoResults]
//           } catch (error) {
//             console.error('Video search error:', error)
//           }
//         }
        
//         // Remove duplicates and limit results
//         const uniqueResults = results.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i).slice(0, 8)
//         setSearchResults(uniqueResults)
//       } catch (error) {
//         console.error('Search error:', error)
//         setSearchResults([])
//       } finally {
//         setSearching(false)
//       }
//     }, 500)
//   }

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     const value = e.target.value
//     setSearchQuery(value)
//     performSearch(value)
//   }

//   // Handle category change
//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId)
//     if (searchQuery.trim().length >= 2) {
//       performSearch(searchQuery)
//     }
//   }

//   // Start voice search
//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser')
//       return
//     }
//     if (recognitionRef.current) {
//       recognitionRef.current.start()
//     }
//   }

//   // Stop voice search
//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop()
//     }
//   }

//   // Handle result click
//   const handleResultClick = (result) => {
//     setShowResults(false)
//     setSearchQuery('')
//     setIsSearchOpen(false)
//     navigate(result.url)
//   }

//   const handleMouseEnter = () => {
//     if (audioDropdownTimeoutRef.current) clearTimeout(audioDropdownTimeoutRef.current)
//     setIsAudioDropdownOpen(true)
//   }

//   const handleMouseLeave = () => {
//     audioDropdownTimeoutRef.current = setTimeout(() => {
//       setIsAudioDropdownOpen(false)
//     }, 150)
//   }

//   const handleLanguageChange = (langCode) => {
//     i18n.changeLanguage(langCode)
//     dispatch(setLanguage(langCode))
//     if (langCode === 'ur') {
//       document.documentElement.dir = 'rtl'
//       document.body.classList.add('rtl')
//     } else {
//       document.documentElement.dir = 'ltr'
//       document.body.classList.remove('rtl')
//     }
//     setIsLangOpen(false)
//     localStorage.setItem('language', langCode)
//   }

//   // Audio categories
//   const audioCategories = [
//     { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', count: '245+' },
//     { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', count: '189+' },
//     { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', count: '156+' },
//     { path: '/audio/type/soz', label: 'Soz', icon: '🔥', count: '98+' },
//     { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', count: '1.2k+' },
//     { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', count: '876+' },
//     { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', count: '432+' },
//     { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', count: '234+' },
//   ]

//   const occasionCategories = [
//     { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤', count: '567+' },
//     { path: '/audio/occasion/ramadan', label: 'Ramadan', icon: '🌙', count: '432+' },
//     { path: '/audio/occasion/eid', label: 'Eid', icon: '🎉', count: '198+' },
//     { path: '/audio/occasion/milad', label: 'Milad', icon: '⭐', count: '267+' },
//   ]

//   const navLinks = [
//     { path: '/', label: 'Home', icon: Compass },
//     { path: '/explore', label: 'Explore', icon: Sparkles },
//     { path: '/poetry', label: 'Poetry', icon: BookOpen },
//     { path: '/authors', label: 'Authors', icon: User },
//     { path: '/books', label: 'Books', icon: Bookmark },
//     { path: '/audio', label: 'Audio', icon: Headphones, dropdown: true },
//     { path: '/videos', label: 'Videos', icon: Video },
//   ]

//   const getUserDisplayName = () => {
//     if (!user) return 'User'
//     return user?.name?.split(' ')[0] || user?.username || user?.email?.split('@')[0] || 'User'
//   }

//   const getUserRole = () => {
//     if (!user) return 'member'
//     return user?.role || 'member'
//   }

//   const getUserEmail = () => {
//     if (!user) return ''
//     return user?.email || ''
//   }

//   const renderLogo = () => {
//     if (siteSettings.siteLogo && !logoError) {
//       return (
//         <div className="relative group">
//           <img 
//             src={siteSettings.siteLogo} 
//             alt={siteSettings.siteName}
//             className="relative h-10 w-auto object-contain"
//             onError={() => setLogoError(true)}
//           />
//         </div>
//       )
//     }
    
//     return (
//       <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-2 shadow-lg">
//         <BookOpen className="h-5 w-5 text-white" />
//       </div>
//     )
//   }

//   const getGradientStyle = () => ({
//     background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
//   })

//   // Render search result item
//   const renderSearchResult = (result, index) => {
//     const typeColors = {
//       audio: 'from-amber-500 to-orange-500',
//       author: 'from-blue-500 to-cyan-500',
//       poetry: 'from-emerald-500 to-teal-500',
//       book: 'from-purple-500 to-pink-500',
//       video: 'from-red-500 to-rose-500',
//     }

//     return (
//       <div
//         key={result.id || index}
//         onClick={() => handleResultClick(result)}
//         className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent dark:hover:from-primary-950/30 cursor-pointer transition-all duration-200 group"
//       >
//         <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${typeColors[result.type] || 'from-primary-100 to-secondary-100'} flex items-center justify-center`}>
//           {result.icon}
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600">
//             {result.title}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//             {result.description}
//           </p>
//         </div>
//         <div className="text-xs text-gray-400 capitalize">{result.type}</div>
//       </div>
//     )
//   }

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//       scrolled 
//         ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-800/20 py-1' 
//         : 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-md py-2'
//     }`}>
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
//         <div className="flex justify-between items-center">
          
//           {/* Logo - Compact */}
//           <Link to="/" className="flex items-center gap-2 group cursor-pointer flex-shrink-0">
//             {renderLogo()}
//             <div className="hidden md:block">
//               <span className="text-lg font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
//                 {siteSettings.siteName}
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation - Compact spacing */}
//           <div className="hidden md:flex items-center gap-0.5 lg:gap-1">
//             {navLinks.map((link) => (
//               <div key={link.path} className="relative">
//                 {link.dropdown ? (
//                   <div
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                     className="relative"
//                   >
//                     <Link
//                       to={link.path}
//                       className="flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all duration-300"
//                     >
//                       <link.icon className="h-3.5 w-3.5" />
//                       <span className="hidden lg:inline">{link.label}</span>
//                       <span className="lg:hidden">{link.label}</span>
//                       <ChevronDown className={`h-3 w-3 transition-all duration-300 ${isAudioDropdownOpen ? 'rotate-180' : ''}`} />
//                     </Link>
                    
//                     {/* Audio Mega Menu */}
//                     {isAudioDropdownOpen && (
//                       <div 
//                         className="absolute left-0 mt-1 w-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden z-50 animate-fadeInUp"
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                       >
//                         <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 px-4 py-3 border-b border-gray-200/50">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <Headphones className="h-4 w-4 text-primary-600" />
//                                 <h3 className="font-bold text-gray-900 dark:text-white">Audio Library</h3>
//                               </div>
//                               <p className="text-xs text-gray-500">Discover soulful recitations</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-3 gap-3 p-4">
//                           <div>
//                             <p className="text-xs font-bold text-gray-500 mb-2">Categories</p>
//                             <div className="space-y-0.5">
//                               {audioCategories.slice(0, 5).map((category) => (
//                                 <Link
//                                   key={category.path}
//                                   to={category.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-primary-50 transition-all group"
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     <span className="text-sm">{category.icon}</span>
//                                     <span className="group-hover:text-primary-600">{category.label}</span>
//                                   </div>
//                                   <span className="text-[10px] text-gray-400">{category.count}</span>
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <p className="text-xs font-bold text-gray-500 mb-2">Occasions</p>
//                             <div className="space-y-0.5">
//                               {occasionCategories.map((occasion) => (
//                                 <Link
//                                   key={occasion.path}
//                                   to={occasion.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center justify-between px-2 py-1.5 rounded-lg text-xs text-gray-700 dark:text-gray-300 hover:bg-primary-50 transition-all group"
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     <span className="text-sm">{occasion.icon}</span>
//                                     <span className="group-hover:text-primary-600">{occasion.label}</span>
//                                   </div>
//                                   <span className="text-[10px] text-gray-400">{occasion.count}</span>
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>

//                           <div>
//                             <p className="text-xs font-bold text-gray-500 mb-2">Featured</p>
//                             <div className="space-y-2">
//                               <Link to="/audio/premium" className="block p-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-lg border border-amber-200/50">
//                                 <div className="flex items-center gap-1 mb-0.5">
//                                   <Crown className="h-3 w-3 text-amber-600" />
//                                   <span className="text-xs font-bold text-amber-700">Premium</span>
//                                 </div>
//                                 <p className="text-[11px] text-gray-600">Exclusive content</p>
//                               </Link>
//                               <Link to="/audio/featured" className="block p-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-lg border border-purple-200/50">
//                                 <div className="flex items-center gap-1 mb-0.5">
//                                   <Star className="h-3 w-3 text-purple-600" />
//                                   <span className="text-xs font-bold text-purple-700">Editor's Pick</span>
//                                 </div>
//                                 <p className="text-[11px] text-gray-600">Curated for you</p>
//                               </Link>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="border-t border-gray-200/50 px-4 py-2 bg-gray-50/50">
//                           <Link to="/audio" onClick={() => setIsAudioDropdownOpen(false)} className="flex items-center justify-between text-xs font-semibold text-primary-600">
//                             <span>Browse all audio</span>
//                             <ArrowRight className="h-3 w-3" />
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="flex items-center gap-1 px-2 lg:px-3 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all duration-300"
//                   >
//                     <link.icon className="h-3.5 w-3.5" />
//                     <span className="hidden lg:inline">{link.label}</span>
//                     <span className="lg:hidden">{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Section - Compact */}
//           <div className="flex items-center gap-1 sm:gap-2">
//             {/* Search */}
//             <div className="relative" ref={searchRef}>
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
//               >
//                 <Search className="h-4 w-4" />
//               </button>

//               {isSearchOpen && (
//                 <div className="absolute right-0 mt-2 w-[90vw] md:w-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-fadeInUp">
//                   <div className="p-3 border-b border-gray-200/50">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         placeholder="Search poems, authors, books, audio..."
//                         className="w-full pl-9 pr-20 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
//                         autoFocus
//                       />
//                       {searchQuery && (
//                         <button
//                           onClick={() => {
//                             setSearchQuery('')
//                             setSearchResults([])
//                             setShowResults(false)
//                           }}
//                           className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       )}
//                       <button
//                         onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                         className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all ${
//                           isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-primary-600'
//                         }`}
//                       >
//                         {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                       </button>
//                     </div>
//                     {voiceTranscript && !isListening && (
//                       <div className="mt-2 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
//                         "{voiceTranscript}"
//                       </div>
//                     )}
//                   </div>

//                   {/* Category Filters */}
//                   <div className="px-3 py-2 border-b border-gray-200/50 overflow-x-auto scrollbar-hide">
//                     <div className="flex gap-1">
//                       {SEARCH_CATEGORIES.map((category) => (
//                         <button
//                           key={category.id}
//                           onClick={() => handleCategoryChange(category.id)}
//                           className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
//                             selectedCategory === category.id
//                               ? `bg-gradient-to-r ${category.color} text-white shadow-md`
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           <category.icon className="h-3 w-3" />
//                           {category.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Results */}
//                   <div className="max-h-[350px] overflow-y-auto">
//                     {searching ? (
//                       <div className="flex justify-center py-8">
//                         <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                         <span className="ml-2 text-sm text-gray-500">Searching...</span>
//                       </div>
//                     ) : searchResults.length > 0 ? (
//                       <>
//                         <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50">
//                           <p className="text-xs font-semibold text-gray-500">Results</p>
//                         </div>
//                         {searchResults.map((result, idx) => renderSearchResult(result, idx))}
//                         <div className="border-t p-2">
//                           <button
//                             onClick={() => {
//                               navigate(`/search?q=${searchQuery}&category=${selectedCategory}`)
//                               setIsSearchOpen(false)
//                             }}
//                             className="w-full text-center text-xs font-medium text-primary-600 py-1.5"
//                           >
//                             View all results →
//                           </button>
//                         </div>
//                       </>
//                     ) : searchQuery && searchQuery.trim().length >= 2 ? (
//                       <div className="text-center py-8">
//                         <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
//                         <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <Mic className="h-10 w-10 text-gray-300 mx-auto mb-2" />
//                         <p className="text-gray-500 text-sm">Try voice search or type your query</p>
//                         <div className="flex flex-wrap gap-2 justify-center mt-3">
//                           <button onClick={() => setSearchQuery('nauha')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">nauha</button>
//                           <button onClick={() => setSearchQuery('ghazal')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">ghazal</button>
//                           <button onClick={() => setSearchQuery('Mirza Ghalib')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">Mirza Ghalib</button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Language Switcher - Compact */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center gap-1 px-2 py-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
//               >
//                 <Globe className="h-4 w-4" />
//                 <span className="text-sm font-semibold hidden sm:inline">
//                   {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.native?.slice(0, 2) || 'EN'}
//                 </span>
//                 <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border py-1 z-50">
//                   {SUPPORTED_LANGUAGES.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`w-full px-3 py-2 text-sm text-left hover:bg-primary-50 transition ${
//                         currentLang === lang.code ? 'text-primary-600 font-semibold' : 'text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-2">{lang.flag}</span>
//                       {lang.native}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Buttons - Compact */}
//             {isAuthenticated ? (
//               <div className="relative group">
//                 <button className="flex items-center gap-1 p-1 rounded-lg hover:bg-gray-100 transition">
//                   {user?.avatar ? (
//                     <img src={user.avatar} alt="" className="h-7 w-7 rounded-lg object-cover" />
//                   ) : (
//                     <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
//                       <User className="h-3.5 w-3.5 text-white" />
//                     </div>
//                   )}
//                   <ChevronDown className="h-3 w-3 text-gray-400" />
//                 </button>
                
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
//                   <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">Dashboard</Link>
//                   <Link to="/dashboard/favorites" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">Favorites</Link>
//                   <Link to="/dashboard/history" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">History</Link>
//                   {getUserRole() === 'admin' && (
//                     <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50">Admin</Link>
//                   )}
//                   <div className="border-t my-1"></div>
//                   <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-1">
//                 <Link to="/login" className="hidden sm:flex px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600">Sign In</Link>
//                 <Link to="/register" className="px-4 py-2 text-sm font-bold text-white rounded-lg hover:shadow-md transition" style={getGradientStyle()}>
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-primary-50"
//             >
//               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t bg-white dark:bg-gray-950 max-h-[calc(100vh-56px)] overflow-y-auto">
//           <div className="px-3 py-2 space-y-0.5">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition"
//               >
//                 <link.icon className="h-5 w-5" />
//                 {link.label}
//               </Link>
//             ))}
            
//             {!isAuthenticated && (
//               <>
//                 <div className="border-t my-2"></div>
//                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg">
//                   <LogIn className="h-5 w-5" /> Sign In
//                 </Link>
//                 <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-3 py-2.5 text-white rounded-lg mt-2" style={getGradientStyle()}>
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeInUp { animation: fadeInUp 0.2s ease-out; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </nav>
//   )
// }

// export default Navbar
















// client/src/components/layout/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth.js'
import { useSelector, useDispatch } from 'react-redux'
import { setLanguage } from '../../store/slices/uiSlice.js'
import {
  Search, Menu, X, BookOpen, User, LogIn, LogOut,
  Globe, ChevronDown, Heart, Bookmark, Headphones, Video,
  Sparkles, TrendingUp, Clock, Award, Compass, Flame, Zap,
  Mic, MicOff, Loader2, FileText, Music, Users, BookMarked,
  LayoutGrid, Radio, Podcast, Newspaper, Star, ArrowRight,
  Crown, Calendar, LayoutDashboard, Activity
} from 'lucide-react'
import settingsAPI from '../../api/settingsAPI.js'
import audioAPI from '../../api/audioAPI.js'
import authorAPI from '../../api/authorAPI.js'

// Supported languages
const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', dir: 'rtl' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
]

// Search categories
const SEARCH_CATEGORIES = [
  { id: 'all', label: 'All', icon: LayoutGrid, color: 'from-primary-500 to-secondary-500' },
  { id: 'audio', label: 'Audio', icon: Headphones, color: 'from-amber-500 to-orange-500' },
  { id: 'authors', label: 'Authors', icon: Users, color: 'from-blue-500 to-cyan-500' },
  { id: 'poetry', label: 'Poetry', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
  { id: 'books', label: 'Books', icon: BookMarked, color: 'from-purple-500 to-pink-500' },
  { id: 'videos', label: 'Videos', icon: Video, color: 'from-red-500 to-rose-500' },
]

const Navbar = () => {
  const { t, i18n } = useTranslation()
  const { user, isAuthenticated, logout } = useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // State declarations
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const [faviconError, setFaviconError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchResults, setSearchResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [showResults, setShowResults] = useState(false)
  
  const currentLang = useSelector((state) => state.ui.language) || 'en'
  const audioDropdownTimeoutRef = useRef(null)
  const searchTimeoutRef = useRef(null)
  const searchRef = useRef(null)
  const recognitionRef = useRef(null)

  // Primary color
  const primaryColor = '#db2777'
  const secondaryColor = '#8b5cf6'

  // Dynamic settings state
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'ZauqApp',
    siteDescription: 'AI Powered Urdu Literary Ecosystem',
    siteLogo: '',
    siteFavicon: '',
    theme: 'light',
    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    fontFamily: 'Inter',
    enableRTL: false
  })

  // Fetch site settings
  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const response = await settingsAPI.getPublicSettings()
        if (response?.data) {
          setSiteSettings(prev => ({ ...prev, ...response.data }))
          
          if (response.data.theme === 'dark') {
            document.documentElement.classList.add('dark')
          } else if (response.data.theme === 'light') {
            document.documentElement.classList.remove('dark')
          }
          
          if (response.data.fontFamily) {
            document.documentElement.style.setProperty('--font-family', response.data.fontFamily)
            document.body.style.fontFamily = response.data.fontFamily
          }
          
          if (currentLang === 'ur' || response.data.enableRTL) {
            document.documentElement.dir = 'rtl'
            document.body.classList.add('rtl')
          } else {
            document.documentElement.dir = 'ltr'
            document.body.classList.remove('rtl')
          }
        }
      } catch (error) {
        console.error('Error fetching site settings:', error)
      }
    }
    fetchSiteSettings()
  }, [currentLang])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setVoiceSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'
    recognition.maxAlternatives = 5

    recognition.onstart = () => {
      setIsListening(true)
    }

    recognition.onend = () => {
      setIsListening(false)
    }

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setVoiceTranscript(transcript)
      if (event.results[0].isFinal) {
        setSearchQuery(transcript)
        performSearch(transcript)
      }
    }

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
    }

    recognitionRef.current = recognition

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  // Close search results on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Perform search using existing APIs
  const performSearch = async (query) => {
    if (!query || query.trim().length < 2) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    setSearching(true)
    setShowResults(true)

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        let results = []
        
        // Search Audio
        if (selectedCategory === 'all' || selectedCategory === 'audio') {
          try {
            const audioResponse = await audioAPI.getAudioItems({ search: query, limit: 3 })
            const audioData = audioResponse?.data?.data || audioResponse?.data || audioResponse || []
            const audioResults = audioData.map(item => ({
              id: item._id,
              title: item.title,
              description: item.description || `${item.type} audio`,
              url: `/audio/${item.slug}`,
              type: 'audio',
              icon: <Headphones className="h-4 w-4" />
            }))
            results = [...results, ...audioResults]
          } catch (error) {
            console.error('Audio search error:', error)
          }
        }
        
        // Search Authors
        if (selectedCategory === 'all' || selectedCategory === 'authors') {
          try {
            const authorResponse = await authorAPI.getAuthors({ search: query, limit: 3 })
            const authorData = authorResponse?.data?.data || authorResponse?.data || authorResponse || []
            const authorResults = authorData.map(item => ({
              id: item._id,
              title: item.name,
              description: item.bio?.substring(0, 100) || `${item.era || 'Poet'} - ${item.genres?.join(', ') || 'Author'}`,
              url: `/author/${item.slug}`,
              type: 'author',
              icon: <Users className="h-4 w-4" />
            }))
            results = [...results, ...authorResults]
          } catch (error) {
            console.error('Author search error:', error)
          }
        }
        
        // Search Poetry (if API exists)
        if (selectedCategory === 'all' || selectedCategory === 'poetry') {
          try {
            const poetryResponse = await audioAPI.getAudioItems({ search: query, type: 'poem_recitation', limit: 3 })
            const poetryData = poetryResponse?.data?.data || poetryResponse?.data || poetryResponse || []
            const poetryResults = poetryData.map(item => ({
              id: item._id,
              title: item.title,
              description: item.description || 'Poem recitation',
              url: `/poem/${item.slug || item._id}`,
              type: 'poetry',
              icon: <BookOpen className="h-4 w-4" />
            }))
            results = [...results, ...poetryResults]
          } catch (error) {
            console.error('Poetry search error:', error)
          }
        }
        
        // Search Books
        if (selectedCategory === 'all' || selectedCategory === 'books') {
          try {
            const bookResponse = await audioAPI.getAudioItems({ search: query, type: 'audiobook', limit: 3 })
            const bookData = bookResponse?.data?.data || bookResponse?.data || bookResponse || []
            const bookResults = bookData.map(item => ({
              id: item._id,
              title: item.title,
              description: item.description || 'Audiobook',
              url: `/book/${item.slug || item._id}`,
              type: 'book',
              icon: <BookMarked className="h-4 w-4" />
            }))
            results = [...results, ...bookResults]
          } catch (error) {
            console.error('Book search error:', error)
          }
        }
        
        // Search Videos
        if (selectedCategory === 'all' || selectedCategory === 'videos') {
          try {
            const videoResponse = await audioAPI.getAudioItems({ search: query, limit: 3 })
            const videoData = videoResponse?.data?.data || videoResponse?.data || videoResponse || []
            const videoResults = videoData.map(item => ({
              id: item._id,
              title: item.title,
              description: item.description || `${item.type} content`,
              url: `/video/${item.slug || item._id}`,
              type: 'video',
              icon: <Video className="h-4 w-4" />
            }))
            results = [...results, ...videoResults]
          } catch (error) {
            console.error('Video search error:', error)
          }
        }
        
        const uniqueResults = results.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i).slice(0, 8)
        setSearchResults(uniqueResults)
      } catch (error) {
        console.error('Search error:', error)
        setSearchResults([])
      } finally {
        setSearching(false)
      }
    }, 500)
  }

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    performSearch(value)
  }

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId)
    if (searchQuery.trim().length >= 2) {
      performSearch(searchQuery)
    }
  }

  const startVoiceSearch = () => {
    if (!voiceSupported) {
      toast.error('Voice search is not supported in your browser')
      return
    }
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopVoiceSearch = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }

  const handleResultClick = (result) => {
    setShowResults(false)
    setSearchQuery('')
    setIsSearchOpen(false)
    navigate(result.url)
  }

  const handleMouseEnter = () => {
    if (audioDropdownTimeoutRef.current) clearTimeout(audioDropdownTimeoutRef.current)
    setIsAudioDropdownOpen(true)
  }

  const handleMouseLeave = () => {
    audioDropdownTimeoutRef.current = setTimeout(() => {
      setIsAudioDropdownOpen(false)
    }, 150)
  }

  const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode)
    dispatch(setLanguage(langCode))
    if (langCode === 'ur') {
      document.documentElement.dir = 'rtl'
      document.body.classList.add('rtl')
    } else {
      document.documentElement.dir = 'ltr'
      document.body.classList.remove('rtl')
    }
    setIsLangOpen(false)
    localStorage.setItem('language', langCode)
  }

  // Audio categories - 2 columns only (removed Featured section)
  const audioCategories = [
    { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', count: '245+' },
    { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', count: '189+' },
    { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', count: '156+' },
    { path: '/audio/type/soz', label: 'Soz', icon: '🔥', count: '98+' },
    { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', count: '1.2k+' },
    { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', count: '876+' },
    { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', count: '432+' },
    { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', count: '234+' },
  ]

  const occasionCategories = [
    { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤', count: '567+' },
    { path: '/audio/occasion/ramadan', label: 'Ramadan', icon: '🌙', count: '432+' },
    { path: '/audio/occasion/eid', label: 'Eid', icon: '🎉', count: '198+' },
    { path: '/audio/occasion/milad', label: 'Milad', icon: '⭐', count: '267+' },
  ]

  const navLinks = [
    { path: '/', label: 'Home', icon: Compass },
    { path: '/explore', label: 'Explore', icon: Sparkles },
    { path: '/poetry', label: 'Poetry', icon: BookOpen },
    { path: '/authors', label: 'Authors', icon: User },
    { path: '/books', label: 'Books', icon: Bookmark },
    { path: '/audio', label: 'Audio', icon: Headphones, dropdown: true },
    { path: '/videos', label: 'Videos', icon: Video },
  ]

  const getUserDisplayName = () => {
    if (!user) return 'User'
    return user?.name?.split(' ')[0] || user?.username || user?.email?.split('@')[0] || 'User'
  }

  const getUserRole = () => {
    if (!user) return 'member'
    return user?.role || 'member'
  }

  const getUserEmail = () => {
    if (!user) return ''
    return user?.email || ''
  }

  const renderLogo = () => {
    if (siteSettings.siteLogo && !logoError) {
      return (
        <div className="relative group">
          <img 
            src={siteSettings.siteLogo} 
            alt={siteSettings.siteName}
            className="relative h-14 w-auto object-contain"
            onError={() => setLogoError(true)}
          />
        </div>
      )
    }
    
    return (
      <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-2.5 shadow-lg">
        <BookOpen className="h-7 w-7 text-white" />
      </div>
    )
  }

  const getGradientStyle = () => ({
    background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
  })

  const renderSearchResult = (result, index) => {
    const typeColors = {
      audio: 'from-amber-500 to-orange-500',
      author: 'from-blue-500 to-cyan-500',
      poetry: 'from-emerald-500 to-teal-500',
      book: 'from-purple-500 to-pink-500',
      video: 'from-red-500 to-rose-500',
    }

    return (
      <div
        key={result.id || index}
        onClick={() => handleResultClick(result)}
        className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent dark:hover:from-primary-950/30 cursor-pointer transition-all duration-200 group"
      >
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${typeColors[result.type] || 'from-primary-100 to-secondary-100'} flex items-center justify-center`}>
          {result.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600">
            {result.title}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {result.description}
          </p>
        </div>
        <div className="text-xs text-gray-400 capitalize">{result.type}</div>
      </div>
    )
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-800/20 py-2' 
        : 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-md py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center">
          
          {/* Logo - Increased size */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer flex-shrink-0">
            {renderLogo()}
            <div className="hidden md:block">
              <span className="text-xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {siteSettings.siteName}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Larger bold fonts */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {navLinks.map((link) => (
              <div key={link.path} className="relative">
                {link.dropdown ? (
                  <div
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <Link
                      to={link.path}
                      className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg text-base font-bold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all duration-300"
                    >
                      <link.icon className="h-4 w-4" />
                      <span className="hidden lg:inline">{link.label}</span>
                      <span className="lg:hidden">{link.label}</span>
                      <ChevronDown className={`h-3.5 w-3.5 transition-all duration-300 ${isAudioDropdownOpen ? 'rotate-180' : ''}`} />
                    </Link>
                    
                    {/* Audio Mega Menu - 2 columns only (removed Featured) */}
                    {isAudioDropdownOpen && (
                      <div 
                        className="absolute left-0 mt-1 w-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden z-50 animate-fadeInUp"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 px-4 py-3 border-b border-gray-200/50">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Headphones className="h-4 w-4 text-primary-600" />
                                <h3 className="font-bold text-gray-900 dark:text-white">Audio Library</h3>
                              </div>
                              <p className="text-xs text-gray-500">Discover soulful recitations</p>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 p-4">
                          {/* Categories Column */}
                          <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Categories</p>
                            <div className="space-y-1">
                              {audioCategories.map((category) => (
                                <Link
                                  key={category.path}
                                  to={category.path}
                                  onClick={() => setIsAudioDropdownOpen(false)}
                                  className="flex items-center justify-between px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">{category.icon}</span>
                                    <span className="font-medium group-hover:text-primary-600">{category.label}</span>
                                  </div>
                                  <span className="text-xs text-gray-400">{category.count}</span>
                                </Link>
                              ))}
                            </div>
                          </div>

                          {/* Occasions Column */}
                          <div>
                            <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Occasions</p>
                            <div className="space-y-1">
                              {occasionCategories.map((occasion) => (
                                <Link
                                  key={occasion.path}
                                  to={occasion.path}
                                  onClick={() => setIsAudioDropdownOpen(false)}
                                  className="flex items-center justify-between px-2 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 transition-all group"
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-base">{occasion.icon}</span>
                                    <span className="font-medium group-hover:text-primary-600">{occasion.label}</span>
                                  </div>
                                  <span className="text-xs text-gray-400">{occasion.count}</span>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-gray-200/50 px-4 py-2.5 bg-gray-50/50">
                          <Link to="/audio" onClick={() => setIsAudioDropdownOpen(false)} className="flex items-center justify-between text-sm font-semibold text-primary-600">
                            <span>Browse all audio</span>
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={link.path}
                    className="flex items-center gap-1.5 px-3 lg:px-4 py-2 rounded-lg text-base font-bold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all duration-300"
                  >
                    <link.icon className="h-4 w-4" />
                    <span className="hidden lg:inline">{link.label}</span>
                    <span className="lg:hidden">{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search Button */}
            <div className="relative" ref={searchRef}>
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
              >
                <Search className="h-5 w-5" />
              </button>

              {isSearchOpen && (
                <div className="absolute right-0 mt-2 w-[90vw] md:w-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-fadeInUp">
                  <div className="p-3 border-b border-gray-200/50">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search poems, authors, books, audio..."
                        className="w-full pl-9 pr-20 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                        autoFocus
                      />
                      {searchQuery && (
                        <button
                          onClick={() => {
                            setSearchQuery('')
                            setSearchResults([])
                            setShowResults(false)
                          }}
                          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      )}
                      <button
                        onClick={isListening ? stopVoiceSearch : startVoiceSearch}
                        className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all ${
                          isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-primary-600'
                        }`}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </button>
                    </div>
                    {voiceTranscript && !isListening && (
                      <div className="mt-2 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
                        "{voiceTranscript}"
                      </div>
                    )}
                  </div>

                  {/* Category Filters */}
                  <div className="px-3 py-2 border-b border-gray-200/50 overflow-x-auto scrollbar-hide">
                    <div className="flex gap-1">
                      {SEARCH_CATEGORIES.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.id)}
                          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                            selectedCategory === category.id
                              ? `bg-gradient-to-r ${category.color} text-white shadow-md`
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <category.icon className="h-3 w-3" />
                          {category.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Results */}
                  <div className="max-h-[350px] overflow-y-auto">
                    {searching ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
                        <span className="ml-2 text-sm text-gray-500">Searching...</span>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50">
                          <p className="text-xs font-semibold text-gray-500">Results</p>
                        </div>
                        {searchResults.map((result, idx) => renderSearchResult(result, idx))}
                        <div className="border-t p-2">
                          <button
                            onClick={() => {
                              navigate(`/search?q=${searchQuery}&category=${selectedCategory}`)
                              setIsSearchOpen(false)
                            }}
                            className="w-full text-center text-xs font-medium text-primary-600 py-1.5"
                          >
                            View all results →
                          </button>
                        </div>
                      </>
                    ) : searchQuery && searchQuery.trim().length >= 2 ? (
                      <div className="text-center py-8">
                        <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Mic className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                        <p className="text-gray-500 text-sm">Try voice search or type your query</p>
                        <div className="flex flex-wrap gap-2 justify-center mt-3">
                          <button onClick={() => setSearchQuery('nauha')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">nauha</button>
                          <button onClick={() => setSearchQuery('ghazal')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">ghazal</button>
                          <button onClick={() => setSearchQuery('Mirza Ghalib')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">Mirza Ghalib</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 px-2 py-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-semibold hidden sm:inline">
                  {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.native?.slice(0, 2) || 'EN'}
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border py-1 z-50">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full px-3 py-2 text-sm text-left hover:bg-primary-50 transition ${
                        currentLang === lang.code ? 'text-primary-600 font-semibold' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-2">{lang.flag}</span>
                      {lang.native}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center gap-1 p-1 rounded-lg hover:bg-gray-100 transition">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="" className="h-8 w-8 rounded-lg object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">Dashboard</Link>
                  <Link to="/dashboard/favorites" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">Favorites</Link>
                  <Link to="/dashboard/history" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">History</Link>
                  {getUserRole() === 'admin' && (
                    <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50">Admin</Link>
                  )}
                  <div className="border-t my-1"></div>
                  <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <Link to="/login" className="hidden sm:flex px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600">Sign In</Link>
                <Link to="/register" className="px-4 py-2 text-sm font-bold text-white rounded-lg hover:shadow-md transition" style={getGradientStyle()}>
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-primary-50"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-950 max-h-[calc(100vh-56px)] overflow-y-auto">
          <div className="px-3 py-2 space-y-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition"
              >
                <link.icon className="h-5 w-5" />
                {link.label}
              </Link>
            ))}
            
            {!isAuthenticated && (
              <>
                <div className="border-t my-2"></div>
                <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg">
                  <LogIn className="h-5 w-5" /> Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-3 py-2.5 text-white rounded-lg mt-2" style={getGradientStyle()}>
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.2s ease-out; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </nav>
  )
}

export default Navbar



















// // client/src/components/layout/Navbar.jsx
// import React, { useState, useEffect, useRef } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import { useSelector, useDispatch } from 'react-redux'
// import { setLanguage } from '../../store/slices/uiSlice.js'
// import {
//   Search, Menu, X, BookOpen, User, LogIn, LogOut,
//   Globe, ChevronDown, Heart, Bookmark, Headphones, Video,
//   Sparkles, TrendingUp, Clock, Award, Compass, Flame, Zap,
//   Mic, MicOff, Loader2, FileText, Music, Users, BookMarked,
//   LayoutGrid, Radio, Podcast, Newspaper, Star, ArrowRight,
//   Crown, Calendar, LayoutDashboard, Activity
// } from 'lucide-react'
// import settingsAPI from '../../api/settingsAPI.js'
// import audioAPI from '../../api/audioAPI.js'
// import authorAPI from '../../api/authorAPI.js'

// // Supported languages
// const SUPPORTED_LANGUAGES = [
//   { code: 'en', name: 'English', native: 'English', flag: '🇬🇧', dir: 'ltr' },
//   { code: 'ur', name: 'Urdu', native: 'اردو', flag: '🇵🇰', dir: 'rtl' },
//   { code: 'hi', name: 'Hindi', native: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' }
// ]

// // Search categories
// const SEARCH_CATEGORIES = [
//   { id: 'all', label: 'All', icon: LayoutGrid, color: 'from-primary-500 to-secondary-500' },
//   { id: 'audio', label: 'Audio', icon: Headphones, color: 'from-amber-500 to-orange-500' },
//   { id: 'authors', label: 'Authors', icon: Users, color: 'from-blue-500 to-cyan-500' },
//   { id: 'poetry', label: 'Poetry', icon: BookOpen, color: 'from-emerald-500 to-teal-500' },
//   { id: 'books', label: 'Books', icon: BookMarked, color: 'from-purple-500 to-pink-500' },
//   { id: 'videos', label: 'Videos', icon: Video, color: 'from-red-500 to-rose-500' },
// ]

// const Navbar = () => {
//   const { t, i18n } = useTranslation()
//   const { user, isAuthenticated, logout } = useAuth()
//   const dispatch = useDispatch()
//   const navigate = useNavigate()
  
//   // State declarations
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isSearchOpen, setIsSearchOpen] = useState(false)
//   const [isLangOpen, setIsLangOpen] = useState(false)
//   const [isAudioDropdownOpen, setIsAudioDropdownOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [logoError, setLogoError] = useState(false)
//   const [faviconError, setFaviconError] = useState(false)
//   const [searchQuery, setSearchQuery] = useState('')
//   const [selectedCategory, setSelectedCategory] = useState('all')
//   const [searchResults, setSearchResults] = useState([])
//   const [searching, setSearching] = useState(false)
//   const [isListening, setIsListening] = useState(false)
//   const [voiceSupported, setVoiceSupported] = useState(true)
//   const [voiceTranscript, setVoiceTranscript] = useState('')
//   const [showResults, setShowResults] = useState(false)
  
//   const currentLang = useSelector((state) => state.ui.language) || 'en'
//   const audioDropdownTimeoutRef = useRef(null)
//   const searchTimeoutRef = useRef(null)
//   const searchRef = useRef(null)
//   const recognitionRef = useRef(null)

//   // Primary color
//   const primaryColor = '#db2777'
//   const secondaryColor = '#8b5cf6'

//   // Dynamic settings state
//   const [siteSettings, setSiteSettings] = useState({
//     siteName: 'ZauqApp',
//     siteDescription: 'AI Powered Urdu Literary Ecosystem',
//     siteLogo: '',
//     siteFavicon: '',
//     theme: 'light',
//     primaryColor: primaryColor,
//     secondaryColor: secondaryColor,
//     fontFamily: 'Inter',
//     enableRTL: false
//   })

//   // Fetch site settings
//   useEffect(() => {
//     const fetchSiteSettings = async () => {
//       try {
//         const response = await settingsAPI.getPublicSettings()
//         if (response?.data) {
//           setSiteSettings(prev => ({ ...prev, ...response.data }))
          
//           if (response.data.theme === 'dark') {
//             document.documentElement.classList.add('dark')
//           } else if (response.data.theme === 'light') {
//             document.documentElement.classList.remove('dark')
//           }
          
//           if (response.data.fontFamily) {
//             document.documentElement.style.setProperty('--font-family', response.data.fontFamily)
//             document.body.style.fontFamily = response.data.fontFamily
//           }
          
//           if (currentLang === 'ur' || response.data.enableRTL) {
//             document.documentElement.dir = 'rtl'
//             document.body.classList.add('rtl')
//           } else {
//             document.documentElement.dir = 'ltr'
//             document.body.classList.remove('rtl')
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching site settings:', error)
//       }
//     }
//     fetchSiteSettings()
//   }, [currentLang])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Initialize speech recognition
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//     if (!SpeechRecognition) {
//       setVoiceSupported(false)
//       return
//     }

//     const recognition = new SpeechRecognition()
//     recognition.continuous = false
//     recognition.interimResults = true
//     recognition.lang = 'en-US'
//     recognition.maxAlternatives = 5

//     recognition.onstart = () => {
//       setIsListening(true)
//     }

//     recognition.onend = () => {
//       setIsListening(false)
//     }

//     recognition.onresult = (event) => {
//       const transcript = event.results[0][0].transcript
//       setVoiceTranscript(transcript)
//       if (event.results[0].isFinal) {
//         setSearchQuery(transcript)
//         performSearch(transcript)
//       }
//     }

//     recognition.onerror = (event) => {
//       console.error('Speech recognition error:', event.error)
//       setIsListening(false)
//     }

//     recognitionRef.current = recognition

//     return () => {
//       if (recognitionRef.current) {
//         recognitionRef.current.stop()
//       }
//     }
//   }, [])

//   // Close search results on click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowResults(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Perform search using existing APIs
//   const performSearch = async (query) => {
//     if (!query || query.trim().length < 2) {
//       setSearchResults([])
//       setShowResults(false)
//       return
//     }

//     setSearching(true)
//     setShowResults(true)

//     if (searchTimeoutRef.current) {
//       clearTimeout(searchTimeoutRef.current)
//     }

//     searchTimeoutRef.current = setTimeout(async () => {
//       try {
//         let results = []
        
//         if (selectedCategory === 'all' || selectedCategory === 'audio') {
//           try {
//             const audioResponse = await audioAPI.getAudioItems({ search: query, limit: 3 })
//             const audioData = audioResponse?.data?.data || audioResponse?.data || audioResponse || []
//             const audioResults = audioData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || `${item.type} audio`,
//               url: `/audio/${item.slug}`,
//               type: 'audio',
//               icon: <Headphones className="h-4 w-4" />
//             }))
//             results = [...results, ...audioResults]
//           } catch (error) {
//             console.error('Audio search error:', error)
//           }
//         }
        
//         if (selectedCategory === 'all' || selectedCategory === 'authors') {
//           try {
//             const authorResponse = await authorAPI.getAuthors({ search: query, limit: 3 })
//             const authorData = authorResponse?.data?.data || authorResponse?.data || authorResponse || []
//             const authorResults = authorData.map(item => ({
//               id: item._id,
//               title: item.name,
//               description: item.bio?.substring(0, 100) || `${item.era || 'Poet'} - ${item.genres?.join(', ') || 'Author'}`,
//               url: `/author/${item.slug}`,
//               type: 'author',
//               icon: <Users className="h-4 w-4" />
//             }))
//             results = [...results, ...authorResults]
//           } catch (error) {
//             console.error('Author search error:', error)
//           }
//         }
        
//         if (selectedCategory === 'all' || selectedCategory === 'poetry') {
//           try {
//             const poetryResponse = await audioAPI.getAudioItems({ search: query, type: 'poem_recitation', limit: 3 })
//             const poetryData = poetryResponse?.data?.data || poetryResponse?.data || poetryResponse || []
//             const poetryResults = poetryData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || 'Poem recitation',
//               url: `/poem/${item.slug || item._id}`,
//               type: 'poetry',
//               icon: <BookOpen className="h-4 w-4" />
//             }))
//             results = [...results, ...poetryResults]
//           } catch (error) {
//             console.error('Poetry search error:', error)
//           }
//         }
        
//         if (selectedCategory === 'all' || selectedCategory === 'books') {
//           try {
//             const bookResponse = await audioAPI.getAudioItems({ search: query, type: 'audiobook', limit: 3 })
//             const bookData = bookResponse?.data?.data || bookResponse?.data || bookResponse || []
//             const bookResults = bookData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || 'Audiobook',
//               url: `/book/${item.slug || item._id}`,
//               type: 'book',
//               icon: <BookMarked className="h-4 w-4" />
//             }))
//             results = [...results, ...bookResults]
//           } catch (error) {
//             console.error('Book search error:', error)
//           }
//         }
        
//         if (selectedCategory === 'all' || selectedCategory === 'videos') {
//           try {
//             const videoResponse = await audioAPI.getAudioItems({ search: query, limit: 3 })
//             const videoData = videoResponse?.data?.data || videoResponse?.data || videoResponse || []
//             const videoResults = videoData.map(item => ({
//               id: item._id,
//               title: item.title,
//               description: item.description || `${item.type} content`,
//               url: `/video/${item.slug || item._id}`,
//               type: 'video',
//               icon: <Video className="h-4 w-4" />
//             }))
//             results = [...results, ...videoResults]
//           } catch (error) {
//             console.error('Video search error:', error)
//           }
//         }
        
//         const uniqueResults = results.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i).slice(0, 8)
//         setSearchResults(uniqueResults)
//       } catch (error) {
//         console.error('Search error:', error)
//         setSearchResults([])
//       } finally {
//         setSearching(false)
//       }
//     }, 500)
//   }

//   const handleSearchChange = (e) => {
//     const value = e.target.value
//     setSearchQuery(value)
//     performSearch(value)
//   }

//   const handleCategoryChange = (categoryId) => {
//     setSelectedCategory(categoryId)
//     if (searchQuery.trim().length >= 2) {
//       performSearch(searchQuery)
//     }
//   }

//   const startVoiceSearch = () => {
//     if (!voiceSupported) {
//       toast.error('Voice search is not supported in your browser')
//       return
//     }
//     if (recognitionRef.current) {
//       recognitionRef.current.start()
//     }
//   }

//   const stopVoiceSearch = () => {
//     if (recognitionRef.current) {
//       recognitionRef.current.stop()
//     }
//   }

//   const handleResultClick = (result) => {
//     setShowResults(false)
//     setSearchQuery('')
//     setIsSearchOpen(false)
//     navigate(result.url)
//   }

//   const handleMouseEnter = () => {
//     if (audioDropdownTimeoutRef.current) clearTimeout(audioDropdownTimeoutRef.current)
//     setIsAudioDropdownOpen(true)
//   }

//   const handleMouseLeave = () => {
//     audioDropdownTimeoutRef.current = setTimeout(() => {
//       setIsAudioDropdownOpen(false)
//     }, 150)
//   }

//   const handleLanguageChange = (langCode) => {
//     i18n.changeLanguage(langCode)
//     dispatch(setLanguage(langCode))
//     if (langCode === 'ur') {
//       document.documentElement.dir = 'rtl'
//       document.body.classList.add('rtl')
//     } else {
//       document.documentElement.dir = 'ltr'
//       document.body.classList.remove('rtl')
//     }
//     setIsLangOpen(false)
//     localStorage.setItem('language', langCode)
//   }

//   // Audio categories
//   const audioCategories = [
//     { path: '/audio/type/nauha', label: 'Nauha', icon: '😢', count: '245+' },
//     { path: '/audio/type/marsiya', label: 'Marsiya', icon: '💔', count: '189+' },
//     { path: '/audio/type/majlis', label: 'Majlis', icon: '🕌', count: '156+' },
//     { path: '/audio/type/soz', label: 'Soz', icon: '🔥', count: '98+' },
//     { path: '/audio/type/ghazal', label: 'Ghazal', icon: '🎵', count: '1.2k+' },
//     { path: '/audio/type/nazm', label: 'Nazm', icon: '📝', count: '876+' },
//     { path: '/audio/type/podcast', label: 'Podcast', icon: '🎙️', count: '432+' },
//     { path: '/audio/type/mushaira', label: 'Mushaira', icon: '🎤', count: '234+' },
//   ]

//   const occasionCategories = [
//     { path: '/audio/occasion/muharram', label: 'Muharram', icon: '🖤', count: '567+' },
//     { path: '/audio/occasion/ramadan', label: 'Ramadan', icon: '🌙', count: '432+' },
//     { path: '/audio/occasion/eid', label: 'Eid', icon: '🎉', count: '198+' },
//     { path: '/audio/occasion/milad', label: 'Milad', icon: '⭐', count: '267+' },
//   ]

//   // Nav links with Blog added
//   const navLinks = [
//     { path: '/', label: 'Home', icon: Compass },
//     { path: '/explore', label: 'Explore', icon: Sparkles },
//     { path: '/poetry', label: 'Poetry', icon: BookOpen },
//     { path: '/authors', label: 'Authors', icon: User },
//     { path: '/books', label: 'Books', icon: Bookmark },
//     { path: '/audio', label: 'Audio', icon: Headphones, dropdown: true },
//     { path: '/videos', label: 'Videos', icon: Video },
//     { path: '/blog', label: 'Blog', icon: Newspaper },
//   ]

//   const getUserDisplayName = () => {
//     if (!user) return 'User'
//     return user?.name?.split(' ')[0] || user?.username || user?.email?.split('@')[0] || 'User'
//   }

//   const getUserRole = () => {
//     if (!user) return 'member'
//     return user?.role || 'member'
//   }

//   const getUserEmail = () => {
//     if (!user) return ''
//     return user?.email || ''
//   }

//   const renderLogo = () => {
//     if (siteSettings.siteLogo && !logoError) {
//       return (
//         <div className="relative group">
//           <img 
//             src={siteSettings.siteLogo} 
//             alt={siteSettings.siteName}
//             className="relative h-14 w-auto object-contain"
//             onError={() => setLogoError(true)}
//           />
//         </div>
//       )
//     }
    
//     return (
//       <div className="relative bg-gradient-to-br from-primary-600 to-secondary-600 rounded-xl p-2.5 shadow-lg">
//         <BookOpen className="h-7 w-7 text-white" />
//       </div>
//     )
//   }

//   const getGradientStyle = () => ({
//     background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
//   })

//   const renderSearchResult = (result, index) => {
//     const typeColors = {
//       audio: 'from-amber-500 to-orange-500',
//       author: 'from-blue-500 to-cyan-500',
//       poetry: 'from-emerald-500 to-teal-500',
//       book: 'from-purple-500 to-pink-500',
//       video: 'from-red-500 to-rose-500',
//     }

//     return (
//       <div
//         key={result.id || index}
//         onClick={() => handleResultClick(result)}
//         className="flex items-center gap-3 px-4 py-3 hover:bg-gradient-to-r hover:from-primary-50 hover:to-transparent dark:hover:from-primary-950/30 cursor-pointer transition-all duration-200 group"
//       >
//         <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${typeColors[result.type] || 'from-primary-100 to-secondary-100'} flex items-center justify-center`}>
//           {result.icon}
//         </div>
//         <div className="flex-1 min-w-0">
//           <p className="text-sm font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary-600">
//             {result.title}
//           </p>
//           <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//             {result.description}
//           </p>
//         </div>
//         <div className="text-xs text-gray-400 capitalize">{result.type}</div>
//       </div>
//     )
//   }

//   return (
//     <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
//       scrolled 
//         ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-800/20 py-2' 
//         : 'bg-white/90 dark:bg-gray-950/90 backdrop-blur-md shadow-md py-3'
//     }`}>
//       <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
//         <div className="flex justify-between items-center">
          
//           {/* Logo - Larger size */}
//           <Link to="/" className="flex items-center gap-3 group cursor-pointer flex-shrink-0">
//             {renderLogo()}
//             <div className="hidden md:block">
//               <span className="text-xl font-black bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
//                 {siteSettings.siteName}
//               </span>
//             </div>
//           </Link>

//           {/* Desktop Navigation - Bold and larger fonts */}
//           <div className="hidden md:flex items-center">
//             {navLinks.map((link) => (
//               <div key={link.path} className="relative">
//                 {link.dropdown ? (
//                   <div
//                     onMouseEnter={handleMouseEnter}
//                     onMouseLeave={handleMouseLeave}
//                     className="relative"
//                   >
//                     <Link
//                       to={link.path}
//                       className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[15px] font-bold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all duration-300 whitespace-nowrap"
//                     >
//                       <link.icon className="h-4 w-4" />
//                       <span>{link.label}</span>
//                       <ChevronDown className={`h-3.5 w-3.5 transition-all duration-300 ${isAudioDropdownOpen ? 'rotate-180' : ''}`} />
//                     </Link>
                    
//                     {/* Audio Mega Menu */}
//                     {isAudioDropdownOpen && (
//                       <div 
//                         className="absolute left-0 mt-1 w-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 dark:border-gray-800/50 overflow-hidden z-50 animate-fadeInUp"
//                         onMouseEnter={handleMouseEnter}
//                         onMouseLeave={handleMouseLeave}
//                       >
//                         <div className="bg-gradient-to-r from-primary-500/10 to-secondary-500/10 px-4 py-3 border-b border-gray-200/50">
//                           <div className="flex items-center justify-between">
//                             <div>
//                               <div className="flex items-center gap-2">
//                                 <Headphones className="h-4 w-4 text-primary-600" />
//                                 <h3 className="font-bold text-gray-900 dark:text-white">Audio Library</h3>
//                               </div>
//                               <p className="text-xs text-gray-500">Discover soulful recitations</p>
//                             </div>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4 p-4">
//                           {/* Categories Column */}
//                           <div>
//                             <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Categories</p>
//                             <div className="space-y-1">
//                               {audioCategories.map((category) => (
//                                 <Link
//                                   key={category.path}
//                                   to={category.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 transition-all group"
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     <span className="text-base">{category.icon}</span>
//                                     <span className="font-medium group-hover:text-primary-600">{category.label}</span>
//                                   </div>
//                                   <span className="text-xs text-gray-400">{category.count}</span>
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>

//                           {/* Occasions Column */}
//                           <div>
//                             <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Occasions</p>
//                             <div className="space-y-1">
//                               {occasionCategories.map((occasion) => (
//                                 <Link
//                                   key={occasion.path}
//                                   to={occasion.path}
//                                   onClick={() => setIsAudioDropdownOpen(false)}
//                                   className="flex items-center justify-between px-2 py-1.5 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-primary-50 transition-all group"
//                                 >
//                                   <div className="flex items-center gap-2">
//                                     <span className="text-base">{occasion.icon}</span>
//                                     <span className="font-medium group-hover:text-primary-600">{occasion.label}</span>
//                                   </div>
//                                   <span className="text-xs text-gray-400">{occasion.count}</span>
//                                 </Link>
//                               ))}
//                             </div>
//                           </div>
//                         </div>

//                         <div className="border-t border-gray-200/50 px-4 py-2 bg-gray-50/50">
//                           <Link to="/audio" onClick={() => setIsAudioDropdownOpen(false)} className="flex items-center justify-between text-sm font-semibold text-primary-600">
//                             <span>Browse all audio</span>
//                             <ArrowRight className="h-4 w-4" />
//                           </Link>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={link.path}
//                     className="flex items-center gap-1.5 px-2.5 py-2 rounded-lg text-[15px] font-bold text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-950/30 transition-all duration-300 whitespace-nowrap"
//                   >
//                     <link.icon className="h-4 w-4" />
//                     <span>{link.label}</span>
//                   </Link>
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-1 sm:gap-2">
//             {/* Search Button */}
//             <div className="relative" ref={searchRef}>
//               <button
//                 onClick={() => setIsSearchOpen(!isSearchOpen)}
//                 className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
//               >
//                 <Search className="h-5 w-5" />
//               </button>

//               {isSearchOpen && (
//                 <div className="absolute right-0 mt-2 w-[90vw] md:w-[500px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-fadeInUp">
//                   <div className="p-3 border-b border-gray-200/50">
//                     <div className="relative">
//                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                       <input
//                         type="text"
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         placeholder="Search poems, authors, books, audio..."
//                         className="w-full pl-9 pr-20 py-2.5 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
//                         autoFocus
//                       />
//                       {searchQuery && (
//                         <button
//                           onClick={() => {
//                             setSearchQuery('')
//                             setSearchResults([])
//                             setShowResults(false)
//                           }}
//                           className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                         >
//                           <X className="h-4 w-4" />
//                         </button>
//                       )}
//                       <button
//                         onClick={isListening ? stopVoiceSearch : startVoiceSearch}
//                         className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-md transition-all ${
//                           isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-500 hover:text-primary-600'
//                         }`}
//                       >
//                         {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
//                       </button>
//                     </div>
//                     {voiceTranscript && !isListening && (
//                       <div className="mt-2 text-xs text-primary-600 bg-primary-50 px-2 py-1 rounded">
//                         "{voiceTranscript}"
//                       </div>
//                     )}
//                   </div>

//                   {/* Category Filters */}
//                   <div className="px-3 py-2 border-b border-gray-200/50 overflow-x-auto scrollbar-hide">
//                     <div className="flex gap-1">
//                       {SEARCH_CATEGORIES.map((category) => (
//                         <button
//                           key={category.id}
//                           onClick={() => handleCategoryChange(category.id)}
//                           className={`flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
//                             selectedCategory === category.id
//                               ? `bg-gradient-to-r ${category.color} text-white shadow-md`
//                               : 'text-gray-600 hover:bg-gray-100'
//                           }`}
//                         >
//                           <category.icon className="h-3 w-3" />
//                           {category.label}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Results */}
//                   <div className="max-h-[350px] overflow-y-auto">
//                     {searching ? (
//                       <div className="flex justify-center py-8">
//                         <Loader2 className="h-5 w-5 animate-spin text-primary-600" />
//                         <span className="ml-2 text-sm text-gray-500">Searching...</span>
//                       </div>
//                     ) : searchResults.length > 0 ? (
//                       <>
//                         <div className="px-3 py-1.5 bg-gray-50 dark:bg-gray-800/50">
//                           <p className="text-xs font-semibold text-gray-500">Results</p>
//                         </div>
//                         {searchResults.map((result, idx) => renderSearchResult(result, idx))}
//                         <div className="border-t p-2">
//                           <button
//                             onClick={() => {
//                               navigate(`/search?q=${searchQuery}&category=${selectedCategory}`)
//                               setIsSearchOpen(false)
//                             }}
//                             className="w-full text-center text-xs font-medium text-primary-600 py-1.5"
//                           >
//                             View all results →
//                           </button>
//                         </div>
//                       </>
//                     ) : searchQuery && searchQuery.trim().length >= 2 ? (
//                       <div className="text-center py-8">
//                         <Search className="h-10 w-10 text-gray-300 mx-auto mb-2" />
//                         <p className="text-gray-500 text-sm">No results found for "{searchQuery}"</p>
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <Mic className="h-10 w-10 text-gray-300 mx-auto mb-2" />
//                         <p className="text-gray-500 text-sm">Try voice search or type your query</p>
//                         <div className="flex flex-wrap gap-2 justify-center mt-3">
//                           <button onClick={() => setSearchQuery('nauha')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">nauha</button>
//                           <button onClick={() => setSearchQuery('ghazal')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">ghazal</button>
//                           <button onClick={() => setSearchQuery('Mirza Ghalib')} className="px-2 py-1 text-xs bg-gray-100 rounded-full hover:bg-primary-100">Mirza Ghalib</button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Language Switcher */}
//             <div className="relative">
//               <button
//                 onClick={() => setIsLangOpen(!isLangOpen)}
//                 className="flex items-center gap-1 px-2 py-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50/50 transition-all"
//               >
//                 <Globe className="h-4 w-4" />
//                 <span className="text-sm font-semibold hidden sm:inline">
//                   {SUPPORTED_LANGUAGES.find(l => l.code === currentLang)?.native?.slice(0, 2) || 'EN'}
//                 </span>
//                 <ChevronDown className={`h-3 w-3 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
//               </button>
              
//               {isLangOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-xl shadow-lg border py-1 z-50">
//                   {SUPPORTED_LANGUAGES.map((lang) => (
//                     <button
//                       key={lang.code}
//                       onClick={() => handleLanguageChange(lang.code)}
//                       className={`w-full px-3 py-2 text-sm text-left hover:bg-primary-50 transition ${
//                         currentLang === lang.code ? 'text-primary-600 font-semibold' : 'text-gray-700'
//                       }`}
//                     >
//                       <span className="mr-2">{lang.flag}</span>
//                       {lang.native}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Auth Buttons */}
//             {isAuthenticated ? (
//               <div className="relative group">
//                 <button className="flex items-center gap-1 p-1 rounded-lg hover:bg-gray-100 transition">
//                   {user?.avatar ? (
//                     <img src={user.avatar} alt="" className="h-8 w-8 rounded-lg object-cover" />
//                   ) : (
//                     <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
//                       <User className="h-4 w-4 text-white" />
//                     </div>
//                   )}
//                   <ChevronDown className="h-3 w-3 text-gray-400" />
//                 </button>
                
//                 <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-xl shadow-lg border py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
//                   <Link to="/dashboard" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">Dashboard</Link>
//                   <Link to="/dashboard/favorites" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">Favorites</Link>
//                   <Link to="/dashboard/history" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-primary-50">History</Link>
//                   {getUserRole() === 'admin' && (
//                     <Link to="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-purple-600 hover:bg-purple-50">Admin</Link>
//                   )}
//                   <div className="border-t my-1"></div>
//                   <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center gap-1">
//                 <Link to="/login" className="hidden sm:flex px-3 py-2 text-sm font-semibold text-gray-700 hover:text-primary-600">Sign In</Link>
//                 <Link to="/register" className="px-4 py-2 text-sm font-bold text-white rounded-lg hover:shadow-md transition" style={getGradientStyle()}>
//                   Sign Up
//                 </Link>
//               </div>
//             )}

//             {/* Mobile Menu Button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-primary-50"
//             >
//               {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden border-t bg-white dark:bg-gray-950 max-h-[calc(100vh-56px)] overflow-y-auto">
//           <div className="px-3 py-2 space-y-0.5">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 onClick={() => setIsMenuOpen(false)}
//                 className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition"
//               >
//                 <link.icon className="h-5 w-5" />
//                 {link.label}
//               </Link>
//             ))}
            
//             {!isAuthenticated && (
//               <>
//                 <div className="border-t my-2"></div>
//                 <Link to="/login" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-3 py-2.5 text-gray-700 hover:bg-gray-50 rounded-lg">
//                   <LogIn className="h-5 w-5" /> Sign In
//                 </Link>
//                 <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center px-3 py-2.5 text-white rounded-lg mt-2" style={getGradientStyle()}>
//                   Get Started
//                 </Link>
//               </>
//             )}
//           </div>
//         </div>
//       )}

//       <style>{`
//         @keyframes fadeInUp {
//           from { opacity: 0; transform: translateY(-10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fadeInUp { animation: fadeInUp 0.2s ease-out; }
//         .scrollbar-hide::-webkit-scrollbar { display: none; }
//         .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
//       `}</style>
//     </nav>
//   )
// }

// export default Navbar