// //client/src/components/layout/Footer.jsx
// //this Footer.jsx from client/src/layouts/MainLayout.jsx

// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

// const Footer = () => {
//   const { t } = useTranslation()

//   const footerLinks = {
//     poetry: [
//       { label: 'Ghazals', path: '/poetry?genre=ghazal' },
//       { label: 'Nazms', path: '/poetry?genre=nazm' },
//       { label: 'Sher', path: '/poetry?genre=sher' },
//       { label: 'Rubai', path: '/poetry?genre=rubai' },
//     ],
//     authors: [
//       { label: 'Classical Poets', path: '/authors?category=classical' },
//       { label: 'Modern Poets', path: '/authors?category=modern' },
//       { label: 'Female Poets', path: '/authors?category=female' },
//       { label: 'Trending', path: '/authors?category=trending' },
//     ],
//     books: [
//       { label: 'Rare Books', path: '/books?category=rare' },
//       { label: 'Journals', path: '/books?category=journal' },
//       { label: 'Magazines', path: '/books?category=magazine' },
//     ],
//     media: [
//       { label: 'Videos', path: '/videos' },
//       { label: 'Podcasts', path: '/videos?category=podcast' },
//       { label: 'Mushaira', path: '/videos?category=mushaira' },
//     ],
//   }

//   return (
//     <footer className="bg-dark-900 text-gray-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
//           {/* Brand */}
//           <div className="lg:col-span-1">
//             <Link to="/" className="flex items-center space-x-2 mb-4">
//               <BookOpen className="h-8 w-8 text-primary-400" />
//               <span className="text-2xl font-bold text-white">Zauq</span>
//             </Link>
//             <p className="text-sm text-gray-400 mb-4">
//               AI-powered literary ecosystem celebrating Urdu poetry, Hindi literature, and English classics.
//             </p>
//             <div className="flex space-x-4">
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Facebook className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Twitter className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Instagram className="h-5 w-5" />
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white transition-colors">
//                 <Youtube className="h-5 w-5" />
//               </a>
//             </div>
//           </div>

//           {/* Poetry */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">{t('common.poetry')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.poetry.map((link) => (
//                 <li key={link.path}>
//                   <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Authors */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">{t('common.authors')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.authors.map((link) => (
//                 <li key={link.path}>
//                   <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Books & Media */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">{t('common.books')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.books.map((link) => (
//                 <li key={link.path}>
//                   <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h3 className="text-white font-semibold mb-4">{t('common.videos')}</h3>
//             <ul className="space-y-2">
//               {footerLinks.media.map((link) => (
//                 <li key={link.path}>
//                   <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Contact & Bottom */}
//         <div className="mt-8 pt-8 border-t border-gray-800">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="flex flex-wrap items-center space-x-6 text-sm">
//               <span className="flex items-center space-x-2">
//                 <Mail className="h-4 w-4" />
//                 <span>contact@zauqapp.com</span>
//               </span>
//               <span className="flex items-center space-x-2">
//                 <Phone className="h-4 w-4" />
//                 <span>+91 12345 67890</span>
//               </span>
//               <span className="flex items-center space-x-2">
//                 <MapPin className="h-4 w-4" />
//                 <span>New Delhi, India</span>
//               </span>
//             </div>
//             <p className="text-sm text-gray-500">
//               &copy; {new Date().getFullYear()} ZauqApp. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </div>
//     </footer>
//   )
// }

// export default Footer














// client/src/components/layout/Footer.jsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { 
  BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, 
  Linkedin, Github, Globe, Heart, Sparkles, ArrowUp, Shield, FileText,
  Info, HelpCircle, Cookie, Award, Users, Music, Video, Bookmark, Headphones
} from 'lucide-react'
import settingsAPI from '../../api/settingsAPI.js'

const Footer = () => {
  const { t } = useTranslation()
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [footerSettings, setFooterSettings] = useState({
    // Company Info
    companyName: 'ZauqApp',
    companyDescription: 'AI-powered literary ecosystem celebrating Urdu poetry, Hindi literature, and English classics.',
    companyEmail: 'contact@zauqapp.com',
    companyPhone: '+91 12345 67890',
    companyAddress: 'New Delhi, India',
    companyLogo: '',
    
    // Social Links
    socialLinks: {
      facebook: 'https://facebook.com/zauqapp',
      twitter: 'https://twitter.com/zauqapp',
      instagram: 'https://instagram.com/zauqapp',
      youtube: 'https://youtube.com/zauqapp',
      linkedin: 'https://linkedin.com/company/zauqapp',
      github: 'https://github.com/zauqapp'
    },
    
    // Legal Pages
    legalPages: {
      privacyPolicy: '/privacy-policy',
      termsOfService: '/terms-of-service',
      aboutUs: '/about-us',
      contactUs: '/contact-us',
      faq: '/faq',
      cookies: '/cookies-policy'
    },
    
    // Footer Sections
    sections: [
      { title: 'Poetry', links: [
        { label: 'Ghazals', path: '/poetry?genre=ghazal' },
        { label: 'Nazms', path: '/poetry?genre=nazm' },
        { label: 'Sher', path: '/poetry?genre=sher' },
        { label: 'Rubai', path: '/poetry?genre=rubai' }
      ]},
      { title: 'Authors', links: [
        { label: 'Classical Poets', path: '/authors?category=classical' },
        { label: 'Modern Poets', path: '/authors?category=modern' },
        { label: 'Female Poets', path: '/authors?category=female' },
        { label: 'Trending', path: '/authors?category=trending' }
      ]},
      { title: 'Resources', links: [
        { label: 'Books', path: '/books' },
        { label: 'Audio', path: '/audio' },
        { label: 'Videos', path: '/videos' },
        { label: 'Blog', path: '/blog' }
      ]},
      { title: 'Support', links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Feedback', path: '/feedback' },
        { label: 'Report Issue', path: '/report' }
      ]}
    ]
  })
  
  const [loading, setLoading] = useState(true)

  // Fetch footer settings from backend
  useEffect(() => {
    const fetchFooterSettings = async () => {
      try {
        const response = await settingsAPI.getFooterSettings()
        if (response?.data) {
          setFooterSettings(prev => ({
            ...prev,
            ...response.data
          }))
        }
      } catch (error) {
        console.error('Error fetching footer settings:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchFooterSettings()
  }, [])

  // Scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const socialIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    youtube: Youtube,
    linkedin: Linkedin,
    github: Github
  }

  const legalLinks = [
    { icon: Info, label: 'About Us', path: footerSettings.legalPages?.aboutUs || '/about-us' },
    { icon: Shield, label: 'Privacy Policy', path: footerSettings.legalPages?.privacyPolicy || '/privacy-policy' },
    { icon: FileText, label: 'Terms of Service', path: footerSettings.legalPages?.termsOfService || '/terms-of-service' },
    { icon: Cookie, label: 'Cookies Policy', path: footerSettings.legalPages?.cookies || '/cookies-policy' },
    { icon: HelpCircle, label: 'FAQ', path: footerSettings.legalPages?.faq || '/faq' },
    { icon: Mail, label: 'Contact Us', path: footerSettings.legalPages?.contactUs || '/contact-us' }
  ]

  if (loading) {
    return (
      <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-center items-center">
            <div className="animate-pulse flex space-x-2">
              <div className="h-3 w-3 bg-primary-500 rounded-full"></div>
              <div className="h-3 w-3 bg-primary-500 rounded-full animation-delay-200"></div>
              <div className="h-3 w-3 bg-primary-500 rounded-full animation-delay-400"></div>
            </div>
          </div>
        </div>
      </footer>
    )
  }

  return (
    <>
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-gray-300 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4 group">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-0 group-hover:opacity-60 transition duration-300"></div>
                  <div className="relative bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl p-2">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  {footerSettings.companyName}
                </span>
              </Link>
              
              <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                {footerSettings.companyDescription}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                {footerSettings.companyEmail && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    <Mail className="h-4 w-4" />
                    <a href={`mailto:${footerSettings.companyEmail}`}>{footerSettings.companyEmail}</a>
                  </div>
                )}
                {footerSettings.companyPhone && (
                  <div className="flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors">
                    <Phone className="h-4 w-4" />
                    <a href={`tel:${footerSettings.companyPhone}`}>{footerSettings.companyPhone}</a>
                  </div>
                )}
                {footerSettings.companyAddress && (
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="h-4 w-4" />
                    <span>{footerSettings.companyAddress}</span>
                  </div>
                )}
              </div>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-2">
                {Object.entries(footerSettings.socialLinks || {}).map(([platform, url]) => {
                  if (!url) return null
                  const Icon = socialIcons[platform]
                  if (!Icon) return null
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/5 rounded-lg hover:bg-primary-500/20 hover:text-primary-400 transition-all duration-300 group"
                    >
                      <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                    </a>
                  )
                })}
              </div>
            </div>

            {/* Dynamic Footer Sections */}
            {(footerSettings.sections || []).map((section, idx) => (
              <div key={idx}>
                <h3 className="text-white font-bold text-base mb-4 relative inline-block">
                  {section.title}
                  <span className="absolute -bottom-1 left-0 w-8 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"></span>
                </h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link 
                        to={link.path} 
                        className="text-sm text-gray-400 hover:text-primary-400 transition-all duration-200 group flex items-center gap-1"
                      >
                        <span className="w-0 group-hover:w-2 h-0.5 bg-primary-500 rounded-full transition-all duration-200"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Legal Links & Newsletter */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Legal Links */}
              <div>
                <div className="flex flex-wrap gap-4">
                  {legalLinks.map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.path}
                      className="text-xs text-gray-500 hover:text-primary-400 transition-colors flex items-center gap-1"
                    >
                      <link.icon className="h-3 w-3" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter Signup */}
              <div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Subscribe to newsletter"
                    className="flex-1 px-4 py-2 bg-white/5 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  />
                  <button className="px-5 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-primary-500/30 transition-all duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Get the latest updates on new poetry, books, and exclusive content.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-gray-800/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>&copy; {new Date().getFullYear()} {footerSettings.companyName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="h-3 w-3 text-red-500 animate-pulse" /> in India
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Powered by AI</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-primary-500" />
                  Literary Innovation
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  )
}

export default Footer