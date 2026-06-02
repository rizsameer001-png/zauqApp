//client/src/components/layout/Footer.jsx
//this Footer.jsx from client/src/layouts/MainLayout.jsx

import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react'

const Footer = () => {
  const { t } = useTranslation()

  const footerLinks = {
    poetry: [
      { label: 'Ghazals', path: '/poetry?genre=ghazal' },
      { label: 'Nazms', path: '/poetry?genre=nazm' },
      { label: 'Sher', path: '/poetry?genre=sher' },
      { label: 'Rubai', path: '/poetry?genre=rubai' },
    ],
    authors: [
      { label: 'Classical Poets', path: '/authors?category=classical' },
      { label: 'Modern Poets', path: '/authors?category=modern' },
      { label: 'Female Poets', path: '/authors?category=female' },
      { label: 'Trending', path: '/authors?category=trending' },
    ],
    books: [
      { label: 'Rare Books', path: '/books?category=rare' },
      { label: 'Journals', path: '/books?category=journal' },
      { label: 'Magazines', path: '/books?category=magazine' },
    ],
    media: [
      { label: 'Videos', path: '/videos' },
      { label: 'Podcasts', path: '/videos?category=podcast' },
      { label: 'Mushaira', path: '/videos?category=mushaira' },
    ],
  }

  return (
    <footer className="bg-dark-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BookOpen className="h-8 w-8 text-primary-400" />
              <span className="text-2xl font-bold text-white">Zauq</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              AI-powered literary ecosystem celebrating Urdu poetry, Hindi literature, and English classics.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Poetry */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('common.poetry')}</h3>
            <ul className="space-y-2">
              {footerLinks.poetry.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Authors */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('common.authors')}</h3>
            <ul className="space-y-2">
              {footerLinks.authors.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Books & Media */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('common.books')}</h3>
            <ul className="space-y-2">
              {footerLinks.books.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">{t('common.videos')}</h3>
            <ul className="space-y-2">
              {footerLinks.media.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm hover:text-primary-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact & Bottom */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <span className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@zauqapp.com</span>
              </span>
              <span className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 12345 67890</span>
              </span>
              <span className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>New Delhi, India</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ZauqApp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer