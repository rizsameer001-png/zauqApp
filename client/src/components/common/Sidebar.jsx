// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import {
//   Home, User, Heart, Download, History, Bell,
//   CreditCard, Settings, BookOpen, PenTool, BarChart3,
//   Users, Shield, FileText, Image, Video, Layout
// } from 'lucide-react'

// const Sidebar = () => {
//   const { t } = useTranslation()
//   const { user, isCreator, isAdmin } = useAuth()
//   const location = useLocation()

//   const userMenuItems = [
//     { path: '/dashboard', icon: Home, label: 'Dashboard' },
//     { path: '/dashboard/favorites', icon: Heart, label: 'Favorites' },
//     { path: '/dashboard/downloads', icon: Download, label: 'Downloads' },
//     { path: '/dashboard/history', icon: History, label: 'History' },
//     { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
//     { path: '/dashboard/subscription', icon: CreditCard, label: 'Subscription' },
//     { path: '/dashboard/profile', icon: User, label: 'Profile' },
//     { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
//   ]

//   const creatorMenuItems = [
//     { path: '/creator', icon: BarChart3, label: 'Creator Dashboard' },
//     { path: '/creator/upload-poetry', icon: PenTool, label: 'Upload Poetry' },
//     { path: '/creator/upload-book', icon: BookOpen, label: 'Upload Ebook' },
//     { path: '/creator/upload-audio', icon: FileText, label: 'Upload Audio' },
//     { path: '/creator/upload-video', icon: Video, label: 'Upload Video' },
//     { path: '/creator/content', icon: Layout, label: 'My Content' },
//     { path: '/creator/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/creator/revenue', icon: CreditCard, label: 'Revenue' },
//   ]

//   const adminMenuItems = [
//     { path: '/admin', icon: Shield, label: 'Admin Dashboard' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
//     { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
//     { path: '/admin/authors', icon: User, label: 'Author CMS' },
//     { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
//     { path: '/admin/videos', icon: Video, label: 'Video CMS' },
//     { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS' },
//     { path: '/admin/seo', icon: FileText, label: 'SEO' },
//     { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/admin/settings', icon: Settings, label: 'Settings' },
//   ]

//   const menuItems = isAdmin ? adminMenuItems : isCreator ? creatorMenuItems : userMenuItems

//   return (
//     <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
//       <div className="p-6 border-b border-gray-100">
//         <Link to="/" className="flex items-center space-x-2">
//           <BookOpen className="h-8 w-8 text-primary-600" />
//           <span className="text-xl font-bold text-gray-900">Zauq</span>
//         </Link>
//         {user && (
//           <div className="mt-4 flex items-center space-x-3">
//             {user.avatar ? (
//               <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
//             ) : (
//               <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
//                 <User className="h-6 w-6 text-primary-600" />
//               </div>
//             )}
//             <div>
//               <p className="text-sm font-medium text-gray-900">{user.name}</p>
//               <p className="text-xs text-gray-500 capitalize">{user.role}</p>
//             </div>
//           </div>
//         )}
//       </div>

//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {menuItems.map((item) => {
//             const isActive = location.pathname === item.path
//             const Icon = item.icon
//             return (
//               <li key={item.path}>
//                 <Link
//                   to={item.path}
//                   className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                     isActive
//                       ? 'bg-primary-50 text-primary-700'
//                       : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                   }`}
//                 >
//                   <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
//                   <span>{item.label}</span>
//                 </Link>
//               </li>
//             )
//           })}
//         </ul>
//       </nav>

//       <div className="p-4 border-t border-gray-100">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           <Home className="h-5 w-5 text-gray-400" />
//           <span>Back to Home</span>
//         </Link>
//       </div>
//     </aside>
//   )
// }

// export default Sidebar








// // client/src/components/layout/Sidebar.jsx
// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
// //import { useTranslation } react-i18next'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import {
//   Home, User, Heart, Download, History, Bell,
//   CreditCard, Settings, BookOpen, PenTool, BarChart3,
//   Users, Shield, FileText, Image, Video, Layout,
//   Headphones, Mic, Music, Podcast, Calendar, Star,
//   TrendingUp, Upload, FolderTree, Award, DollarSign,
//   ListMusic, Volume2, PlayCircle, Radio
// } from 'lucide-react'

// const Sidebar = () => {
//   const { t } = useTranslation()
//   const { user, isCreator, isAdmin } = useAuth()
//   const location = useLocation()

//   const userMenuItems = [
//     { path: '/dashboard', icon: Home, label: 'Dashboard' },
//     { path: '/dashboard/favorites', icon: Heart, label: 'Favorites' },
//     { path: '/dashboard/downloads', icon: Download, label: 'Downloads' },
//     { path: '/dashboard/history', icon: History, label: 'History' },
//     { path: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
//     { path: '/dashboard/subscription', icon: CreditCard, label: 'Subscription' },
//     { path: '/dashboard/profile', icon: User, label: 'Profile' },
//     { path: '/dashboard/settings', icon: Settings, label: 'Settings' },
//     // Audio specific user items
//     { path: '/dashboard/audio/history', icon: History, label: 'Audio History' },
//     { path: '/dashboard/audio/playlists', icon: ListMusic, label: 'My Playlists' },
//     { path: '/dashboard/audio/favorites', icon: Heart, label: 'Favorite Audio' },
//   ]

//   const creatorMenuItems = [
//     { path: '/creator', icon: BarChart3, label: 'Creator Dashboard' },
//     { path: '/creator/upload-poetry', icon: PenTool, label: 'Upload Poetry' },
//     { path: '/creator/upload-book', icon: BookOpen, label: 'Upload Ebook' },
//     { path: '/creator/upload-audio', icon: Headphones, label: 'Upload Audio' },
//     { path: '/creator/upload-video', icon: Video, label: 'Upload Video' },
//     { path: '/creator/content', icon: Layout, label: 'My Content' },
//     { path: '/creator/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/creator/revenue', icon: DollarSign, label: 'Revenue' },
//     // Audio specific creator items
//     { path: '/creator/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
//     { path: '/creator/audio/playlists', icon: ListMusic, label: 'Manage Playlists' },
//   ]

//   const adminMenuItems = [
//     // Main Admin
//     { path: '/admin', icon: Shield, label: 'Admin Dashboard' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
    
//     // Content Management
//     { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
//     { path: '/admin/authors', icon: User, label: 'Author CMS' },
//     { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
    
//     // Audio Management Section
//     { path: '/admin/audio', icon: Headphones, label: 'Audio CMS', divider: true },
//     { path: '/admin/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
//     { path: '/admin/audio/types', icon: FolderTree, label: 'Audio Types' },
//     { path: '/admin/audio/categories', icon: FolderTree, label: 'Audio Categories' },
//     { path: '/admin/audio/occasions', icon: Calendar, label: 'Occasions' },
//     { path: '/admin/audio/playlists', icon: ListMusic, label: 'Playlists' },
//     { path: '/admin/audio/bulk-upload', icon: Upload, label: 'Bulk Upload' },
//     { path: '/admin/audio/reports', icon: FileText, label: 'Audio Reports' },
    
//     // Video Management
//     { path: '/admin/videos', icon: Video, label: 'Video CMS', divider: true },
//     { path: '/admin/videos/types', icon: FolderTree, label: 'Video Types' },
//     { path: '/admin/videos/categories', icon: FolderTree, label: 'Video Categories' },
    
//     // Site Management
//     { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS', divider: true },
//     { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
//     { path: '/admin/seo', icon: FileText, label: 'SEO' },
//     { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/admin/reports', icon: FileText, label: 'Reports' },
//     { path: '/admin/settings', icon: Settings, label: 'Settings' },
//   ]

//   const getMenuItems = () => {
//     if (isAdmin) return adminMenuItems
//     if (isCreator) return creatorMenuItems
//     return userMenuItems
//   }

//   const menuItems = getMenuItems()

//   return (
//     <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
//       {/* Logo Section */}
//       <div className="p-6 border-b border-gray-100">
//         <Link to="/" className="flex items-center space-x-2">
//           <BookOpen className="h-8 w-8 text-primary-600" />
//           <span className="text-xl font-bold text-gray-900">Zauq</span>
//         </Link>
//         {user && (
//           <div className="mt-4 flex items-center space-x-3">
//             {user.avatar ? (
//               <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
//             ) : (
//               <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
//                 <User className="h-6 w-6 text-primary-600" />
//               </div>
//             )}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
//               <p className="text-xs text-gray-500 capitalize">
//                 {user.role === 'admin' ? 'Administrator' : user.role === 'creator' ? 'Creator' : 'Member'}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {menuItems.map((item, index) => {
//             const isActive = location.pathname === item.path
//             const Icon = item.icon
            
//             return (
//               <React.Fragment key={item.path}>
//                 {/* Divider */}
//                 {item.divider && index > 0 && (
//                   <li className="pt-4 mt-2 border-t border-gray-100">
//                     <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       {item.label === 'Audio CMS' ? 'Audio Management' : 
//                        item.label === 'Video CMS' ? 'Video Management' : 
//                        item.label === 'Site Management' ? 'Site Management' : ''}
//                     </p>
//                   </li>
//                 )}
                
//                 {/* Menu Item */}
//                 <li>
//                   <Link
//                     to={item.path}
//                     className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                       isActive
//                         ? 'bg-primary-50 text-primary-700'
//                         : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                     }`}
//                   >
//                     <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
//                     <span>{item.label}</span>
                    
//                     {/* Badge for new items */}
//                     {(item.label === 'Audio CMS' || item.label === 'Audio Analytics') && (
//                       <span className="ml-auto text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
//                         New
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               </React.Fragment>
//             )
//           })}
//         </ul>
//       </nav>

//       {/* Quick Access Section */}
//       <div className="p-4 border-t border-gray-100">
//         <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
//           Quick Access
//         </p>
//         <div className="space-y-1">
//           <Link
//             to="/audio"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <Headphones className="h-5 w-5 text-gray-400" />
//             <span>Audio Library</span>
//           </Link>
//           <Link
//             to="/videos"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <Video className="h-5 w-5 text-gray-400" />
//             <span>Video Library</span>
//           </Link>
//           <Link
//             to="/books"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <BookOpen className="h-5 w-5 text-gray-400" />
//             <span>Ebook Library</span>
//           </Link>
//         </div>
        
//         {/* Audio Categories Quick Links (for Admin) */}
//         {isAdmin && (
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
//               Audio Categories
//             </p>
//             <div className="space-y-1">
//               <Link
//                 to="/admin/audio/types?type=nauha"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Mic className="h-3 w-3" />
//                 <span>Nauha</span>
//               </Link>
//               <Link
//                 to="/admin/audio/types?type=marsiya"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Music className="h-3 w-3" />
//                 <span>Marsiya</span>
//               </Link>
//               <Link
//                 to="/admin/audio/types?type=majlis"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Radio className="h-3 w-3" />
//                 <span>Majlis</span>
//               </Link>
//               <Link
//                 to="/admin/audio/types?type=naat"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Star className="h-3 w-3" />
//                 <span>Naat</span>
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer Link */}
//       <div className="p-4 border-t border-gray-100 mt-auto">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           <Home className="h-5 w-5 text-gray-400" />
//           <span>Back to Home</span>
//         </Link>
//       </div>
//     </aside>
//   )
// }

// export default Sidebar










// // client/src/components/layout/Sidebar.jsx
// import React from 'react'
// import { Link, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { useAuth } from '../../hooks/useAuth.js'
// import {
//   Home, User, Heart, Download, History, Bell,
//   CreditCard, Settings, BookOpen, PenTool, BarChart3,
//   Users, Shield, FileText, Image, Video, Layout,
//   Headphones, Mic, Music, Podcast, Calendar, Star,
//   TrendingUp, Upload, FolderTree, Award, DollarSign,
//   ListMusic, Volume2, PlayCircle, Radio, FolderDown
// } from 'lucide-react'

// const Sidebar = () => {
//   const { t } = useTranslation()
//   const { user, isCreator, isAdmin } = useAuth()
//   const location = useLocation()

//   const userMenuItems = [
//     { path: '/dashboard', icon: Home, label: 'Dashboard' },
//     { path: '/dashboard/favorites', icon: Heart, label: 'Favorites' },
//     { path: '/dashboard/downloads', icon: FolderDown, label: 'Downloads' },
//     { path: '/dashboard/history', icon: History, label: 'History' },
//     { path: '/dashboard/subscriptions', icon: CreditCard, label: 'Subscriptions' },
//     { path: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
//     { path: '/dashboard/profile', icon: User, label: 'Profile' },
//     { path: '/dashboard/payment-methods', icon: CreditCard, label: 'Payment Methods' },
//     { path: '/dashboard/invoices', icon: FileText, label: 'Invoices' },
//     // Audio specific user items
//     { path: '/dashboard/audio/history', icon: History, label: 'Audio History' },
//     { path: '/dashboard/audio/playlists', icon: ListMusic, label: 'My Playlists' },
//     { path: '/dashboard/audio/favorites', icon: Heart, label: 'Favorite Audio' },
//   ]

//   const creatorMenuItems = [
//     { path: '/creator', icon: BarChart3, label: 'Creator Dashboard' },
//     { path: '/creator/upload-poetry', icon: PenTool, label: 'Upload Poetry' },
//     { path: '/creator/upload-book', icon: BookOpen, label: 'Upload Ebook' },
//     { path: '/creator/upload-audio', icon: Headphones, label: 'Upload Audio' },
//     { path: '/creator/upload-video', icon: Video, label: 'Upload Video' },
//     { path: '/creator/content', icon: Layout, label: 'My Content' },
//     // { path: '/creator/analytics', icon: BarChart3, label: 'Analytics' },
//     // { path: '/creator/revenue', icon: DollarSign, label: 'Revenue' },
//     // Audio specific creator items
//     { path: '/creator/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
//     { path: '/creator/audio/playlists', icon: ListMusic, label: 'Manage Playlists' },
//   ]

//   const adminMenuItems = [
//     // Main Admin
//     { path: '/admin', icon: Shield, label: 'Admin Dashboard' },
//     { path: '/admin/users', icon: Users, label: 'Users' },
    
//     // Content Management
//     { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
//     { path: '/admin/authors', icon: User, label: 'Author CMS' },
//     { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
    
//     // Audio Management Section
//     { path: '/admin/audio', icon: Headphones, label: 'Audio CMS', divider: true },
//     // { path: '/admin/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
//     { path: '/admin/audio/types', icon: FolderTree, label: 'Audio Types' },
//     { path: '/admin/audio/categories', icon: FolderTree, label: 'Audio Categories' },
//     { path: '/admin/audio/occasions', icon: Calendar, label: 'Occasions' },
//     { path: '/admin/audio/playlists', icon: ListMusic, label: 'Playlists' },
//     { path: '/admin/audio/bulk-upload', icon: Upload, label: 'Bulk Upload' },
//     // { path: '/admin/audio/reports', icon: FileText, label: 'Audio Reports' },
    
//     // Video Management
//     { path: '/admin/videos', icon: Video, label: 'Video CMS', divider: true },
//     // { path: '/admin/videos/types', icon: FolderTree, label: 'Video Types' },
//     { path: '/admin/videos/categories', icon: FolderTree, label: 'Video Categories' },
    
//     // Subscription Management
//     { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions', divider: true },
//     { path: '/admin/subscriptions/plans', icon: CreditCard, label: 'Plans' },
//     { path: '/admin/subscriptions/users', icon: Users, label: 'Subscribers' },
//     { path: '/admin/subscriptions/transactions', icon: FileText, label: 'Transactions' },
//     { path: '/admin/subscriptions/analytics', icon: TrendingUp, label: 'Subscription Analytics' },
//     { path: '/admin/subscriptions/features', icon: Star, label: 'Feature Toggles' },
//     { path: '/admin/subscriptions/coupons', icon: Award, label: 'Coupons' },
    
//     // Site Management
//     { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS', divider: true },
//     { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
//     { path: '/admin/seo', icon: FileText, label: 'SEO' },
//     { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
//     { path: '/admin/reports', icon: FileText, label: 'Reports' },
//     { path: '/admin/settings', icon: Settings, label: 'Settings' },
//   ]

//   const getMenuItems = () => {
//     if (isAdmin) return adminMenuItems
//     if (isCreator) return creatorMenuItems
//     return userMenuItems
//   }

//   const menuItems = getMenuItems()

//   return (
//     <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
//       {/* Logo Section */}
//       <div className="p-6 border-b border-gray-100">
//         <Link to="/" className="flex items-center space-x-2">
//           <BookOpen className="h-8 w-8 text-primary-600" />
//           <span className="text-xl font-bold text-gray-900">Zauq</span>
//         </Link>
//         {user && (
//           <div className="mt-4 flex items-center space-x-3">
//             {user.avatar ? (
//               <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
//             ) : (
//               <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
//                 <User className="h-6 w-6 text-primary-600" />
//               </div>
//             )}
//             <div className="flex-1 min-w-0">
//               <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
//               <p className="text-xs text-gray-500 capitalize">
//                 {user.role === 'admin' ? 'Administrator' : user.role === 'creator' ? 'Creator' : 'Member'}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Navigation Menu */}
//       <nav className="flex-1 overflow-y-auto py-4">
//         <ul className="space-y-1 px-3">
//           {menuItems.map((item, index) => {
//             const isActive = location.pathname === item.path
//             const Icon = item.icon
            
//             return (
//               <React.Fragment key={item.path}>
//                 {/* Divider */}
//                 {item.divider && index > 0 && (
//                   <li className="pt-4 mt-2 border-t border-gray-100">
//                     <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
//                       {item.label === 'Audio CMS' ? 'Audio Management' : 
//                        item.label === 'Video CMS' ? 'Video Management' :
//                        item.label === 'Subscriptions' ? 'Subscription Management' :
//                        item.label === 'Site Management' ? 'Site Management' : ''}
//                     </p>
//                   </li>
//                 )}
                
//                 {/* Menu Item */}
//                 <li>
//                   <Link
//                     to={item.path}
//                     className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
//                       isActive
//                         ? 'bg-primary-50 text-primary-700'
//                         : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
//                     }`}
//                   >
//                     <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
//                     <span>{item.label}</span>
                    
//                     {/* Badge for new items */}
//                     {(item.label === 'Audio CMS' || item.label === 'Audio Analytics') && (
//                       <span className="ml-auto text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded">
//                         New
//                       </span>
//                     )}
                    
//                     {/* Badge for Subscriptions */}
//                     {item.label === 'Subscriptions' && (
//                       <span className="ml-auto text-xs bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">
//                         New
//                       </span>
//                     )}
//                   </Link>
//                 </li>
//               </React.Fragment>
//             )
//           })}
//         </ul>
//       </nav>

//       {/* Quick Access Section */}
//       <div className="p-4 border-t border-gray-100">
//         <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
//           Quick Access
//         </p>
//         <div className="space-y-1">
// {/*          <Link
//             to="/audio"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <Headphones className="h-5 w-5 text-gray-400" />
//             <span>Audio Library</span>
//           </Link>*/}
//           <Link
//             to="/videos"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <Video className="h-5 w-5 text-gray-400" />
//             <span>Video Library</span>
//           </Link>
//           <Link
//             to="/books"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <BookOpen className="h-5 w-5 text-gray-400" />
//             <span>Ebook Library</span>
//           </Link>
// {/*          <Link
//             to="/subscription"
//             className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//           >
//             <CreditCard className="h-5 w-5 text-gray-400" />
//             <span>Subscribe</span>
//           </Link>*/}
//         </div>
        
//         {/* Audio Categories Quick Links (for Admin) */}
//         {isAdmin && (
//           <div className="mt-3 pt-3 border-t border-gray-100">
//             <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
//               Audio Categories
//             </p>
//             <div className="space-y-1">
//               <Link
//                 to="/admin/audio/types?type=nauha"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Mic className="h-3 w-3" />
//                 <span>Nauha</span>
//               </Link>
//               <Link
//                 to="/admin/audio/types?type=marsiya"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Music className="h-3 w-3" />
//                 <span>Marsiya</span>
//               </Link>
// {/*              <Link
//                 to="/admin/audio/types?type=majlis"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Radio className="h-3 w-3" />
//                 <span>Majlis</span>
//               </Link>
//               <Link
//                 to="/admin/audio/types?type=naat"
//                 className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
//               >
//                 <Star className="h-3 w-3" />
//                 <span>Naat</span>
//               </Link>*/}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer Link */}
//       <div className="p-4 border-t border-gray-100 mt-auto">
//         <Link
//           to="/"
//           className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
//         >
//           <Home className="h-5 w-5 text-gray-400" />
//           <span>Back to Home</span>
//         </Link>
//       </div>
//     </aside>
//   )
// }

// export default Sidebar











// client/src/components/layout/Sidebar.jsx
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../hooks/useAuth.js'
import notificationAPI from '../../api/notificationAPI.js'
import {
  Home, User, Heart, Download, History, Bell,
  CreditCard, Settings, BookOpen, PenTool, BarChart3,
  Users, Shield, FileText, Image, Video, Layout,
  Headphones, Mic, Music, Podcast, Calendar, Star,
  TrendingUp, Upload, FolderTree, Award, DollarSign,
  ListMusic, Volume2, PlayCircle, Radio, FolderDown,
  MessageSquare, Globe, Zap, Mail, CheckCircle, AlertCircle
} from 'lucide-react'

const Sidebar = () => {
  const { t } = useTranslation()
  const { user, isCreator, isAdmin } = useAuth()
  const location = useLocation()
  const [unreadCount, setUnreadCount] = useState(0)

  // Fetch unread notification count for badge
  useEffect(() => {
    if (user) {
      fetchUnreadCount()
      // Poll every 30 seconds for new notifications
      const interval = setInterval(fetchUnreadCount, 30000)
      return () => clearInterval(interval)
    }
  }, [user])

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationAPI.getUnreadCount()
      setUnreadCount(response.data?.count || 0)
    } catch (error) {
      console.error('Error fetching unread count:', error)
    }
  }

  // User Menu Items (Regular Users)
  const userMenuItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/dashboard/favorites', icon: Heart, label: 'Favorites' },
    { path: '/dashboard/downloads', icon: FolderDown, label: 'Downloads' },
    { path: '/dashboard/history', icon: History, label: 'History' },
    // NEW: Notifications menu item with badge
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    { path: '/dashboard/subscriptions', icon: CreditCard, label: 'Subscriptions' },
    { path: '/dashboard/billing', icon: CreditCard, label: 'Billing' },
    { path: '/dashboard/profile', icon: User, label: 'Profile' },
    { path: '/dashboard/payment-methods', icon: CreditCard, label: 'Payment Methods' },
    { path: '/dashboard/invoices', icon: FileText, label: 'Invoices' },
    // Audio specific user items
    { path: '/dashboard/audio/history', icon: History, label: 'Audio History' },
    { path: '/dashboard/audio/playlists', icon: ListMusic, label: 'My Playlists' },
    { path: '/dashboard/audio/favorites', icon: Heart, label: 'Favorite Audio' },
  ]

  // Creator Menu Items
  const creatorMenuItems = [
    { path: '/creator', icon: BarChart3, label: 'Creator Dashboard' },
    { path: '/creator/upload-poetry', icon: PenTool, label: 'Upload Poetry' },
    { path: '/creator/upload-book', icon: BookOpen, label: 'Upload Ebook' },
    { path: '/creator/upload-audio', icon: Headphones, label: 'Upload Audio' },
    { path: '/creator/upload-video', icon: Video, label: 'Upload Video' },
    { path: '/creator/content', icon: Layout, label: 'My Content' },
    // NEW: Notifications for creators
    { path: '/dashboard/notifications', icon: Bell, label: 'Notifications', badge: unreadCount },
    // { path: '/creator/analytics', icon: BarChart3, label: 'Analytics' },
    // { path: '/creator/revenue', icon: DollarSign, label: 'Revenue' },
    // Audio specific creator items
    { path: '/creator/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
    { path: '/creator/audio/playlists', icon: ListMusic, label: 'Manage Playlists' },
  ]

  // Admin Menu Items
  const adminMenuItems = [
    // Main Admin
    { path: '/admin', icon: Shield, label: 'Admin Dashboard' },
    { path: '/admin/users', icon: Users, label: 'Users' },
    
    // NEW: Notification Management for Admin
    { path: '/admin/notifications', icon: Bell, label: 'Notification Center', badge: 'Admin' },
    
    // Content Management
    { path: '/admin/poetry', icon: PenTool, label: 'Poetry CMS' },
    { path: '/admin/authors', icon: User, label: 'Author CMS' },
    { path: '/admin/books', icon: BookOpen, label: 'Ebook CMS' },
    
    // Audio Management Section
    { path: '/admin/audio', icon: Headphones, label: 'Audio CMS', divider: true },
    // { path: '/admin/audio/analytics', icon: TrendingUp, label: 'Audio Analytics' },
    { path: '/admin/audio/types', icon: FolderTree, label: 'Audio Types' },
    { path: '/admin/audio/categories', icon: FolderTree, label: 'Audio Categories' },
    { path: '/admin/audio/occasions', icon: Calendar, label: 'Occasions' },
    { path: '/admin/audio/playlists', icon: ListMusic, label: 'Playlists' },
    { path: '/admin/audio/bulk-upload', icon: Upload, label: 'Bulk Upload' },
    // { path: '/admin/audio/reports', icon: FileText, label: 'Audio Reports' },
    
    // Video Management
    { path: '/admin/videos', icon: Video, label: 'Video CMS', divider: true },
    // { path: '/admin/videos/types', icon: FolderTree, label: 'Video Types' },
    { path: '/admin/videos/categories', icon: FolderTree, label: 'Video Categories' },
    
    // Subscription Management
    { path: '/admin/subscriptions', icon: CreditCard, label: 'Subscriptions', divider: true },
    { path: '/admin/subscriptions/plans', icon: CreditCard, label: 'Plans' },
    { path: '/admin/subscriptions/users', icon: Users, label: 'Subscribers' },
    { path: '/admin/subscriptions/transactions', icon: FileText, label: 'Transactions' },
    { path: '/admin/subscriptions/analytics', icon: TrendingUp, label: 'Subscription Analytics' },
    { path: '/admin/subscriptions/features', icon: Star, label: 'Feature Toggles' },
    { path: '/admin/subscriptions/coupons', icon: Award, label: 'Coupons' },
    
    // Site Management
    { path: '/admin/homepage', icon: Layout, label: 'Homepage CMS', divider: true },
    { path: '/admin/categories', icon: FolderTree, label: 'Categories' },
    { path: '/admin/seo', icon: FileText, label: 'SEO' },
    { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/admin/reports', icon: FileText, label: 'Reports' },
    { path: '/admin/settings', icon: Settings, label: 'Settings' },
  ]

  const getMenuItems = () => {
    if (isAdmin) return adminMenuItems
    if (isCreator) return creatorMenuItems
    return userMenuItems
  }

  const menuItems = getMenuItems()

  // Helper to render badge
  const renderBadge = (item) => {
    if (!item.badge) return null
    
    if (typeof item.badge === 'number') {
      if (item.badge === 0) return null
      return (
        <span className="ml-auto bg-red-500 text-white text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
          {item.badge > 99 ? '99+' : item.badge}
        </span>
      )
    }
    
    if (item.badge === 'Admin') {
      return (
        <span className="ml-auto bg-purple-100 text-purple-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
          Admin
        </span>
      )
    }
    
    return (
      <span className="ml-auto bg-green-100 text-green-600 text-xs font-medium px-1.5 py-0.5 rounded-full">
        New
      </span>
    )
  }

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-100">
        <Link to="/" className="flex items-center space-x-2">
          <BookOpen className="h-8 w-8 text-primary-600" />
          <span className="text-xl font-bold text-gray-900">Zauq</span>
        </Link>
        {user && (
          <div className="mt-4 flex items-center space-x-3">
            {user.avatar ? (
              <img src={user.avatar} alt="" className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-6 w-6 text-primary-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 capitalize">
                {user.role === 'admin' ? 'Administrator' : user.role === 'creator' ? 'Creator' : 'Member'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <React.Fragment key={item.path}>
                {/* Divider */}
                {item.divider && index > 0 && (
                  <li className="pt-4 mt-2 border-t border-gray-100">
                    <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      {item.label === 'Audio CMS' ? 'Audio Management' : 
                       item.label === 'Video CMS' ? 'Video Management' :
                       item.label === 'Subscriptions' ? 'Subscription Management' :
                       item.label === 'Site Management' ? 'Site Management' : ''}
                    </p>
                  </li>
                )}
                
                {/* Menu Item */}
                <li>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
                    <span className="flex-1">{item.label}</span>
                    {renderBadge(item)}
                  </Link>
                </li>
              </React.Fragment>
            )
          })}
        </ul>
      </nav>

      {/* Quick Access Section */}
      <div className="p-4 border-t border-gray-100">
        <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Quick Access
        </p>
        <div className="space-y-1">
          {/* <Link
            to="/audio"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Headphones className="h-5 w-5 text-gray-400" />
            <span>Audio Library</span>
          </Link> */}
          <Link
            to="/videos"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Video className="h-5 w-5 text-gray-400" />
            <span>Video Library</span>
          </Link>
          <Link
            to="/books"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <BookOpen className="h-5 w-5 text-gray-400" />
            <span>Ebook Library</span>
          </Link>
          {/* <Link
            to="/subscription"
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span>Subscribe</span>
          </Link> */}
        </div>
        
        {/* Audio Categories Quick Links (for Admin) */}
        {isAdmin && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Audio Categories
            </p>
            <div className="space-y-1">
              <Link
                to="/admin/audio/types?type=nauha"
                className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
              >
                <Mic className="h-3 w-3" />
                <span>Nauha</span>
              </Link>
              <Link
                to="/admin/audio/types?type=marsiya"
                className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
              >
                <Music className="h-3 w-3" />
                <span>Marsiya</span>
              </Link>
              {/* <Link
                to="/admin/audio/types?type=majlis"
                className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
              >
                <Radio className="h-3 w-3" />
                <span>Majlis</span>
              </Link>
              <Link
                to="/admin/audio/types?type=naat"
                className="flex items-center space-x-3 px-3 py-1.5 rounded-lg text-xs text-gray-600 hover:bg-gray-50"
              >
                <Star className="h-3 w-3" />
                <span>Naat</span>
              </Link> */}
            </div>
          </div>
        )}
      </div>

      {/* Footer Link */}
      <div className="p-4 border-t border-gray-100 mt-auto">
        <Link
          to="/"
          className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Home className="h-5 w-5 text-gray-400" />
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar