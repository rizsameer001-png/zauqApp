import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Crown, Check, BookOpen, Download, Headphones, Sparkles } from 'lucide-react'

const features = [
  'Unlimited access to all ebooks',
  'HD audio and video streaming',
  'Offline downloads',
  'AI-powered literary assistance',
  'Ad-free experience',
  'Priority customer support',
]

const PremiumCTA = () => {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 p-8 md:p-12"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium mb-4">
                <Crown className="h-4 w-4" />
                <span>Premium</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t('home.premiumCTA')}
              </h2>
              <p className="text-primary-100 text-lg mb-6">
                Get unlimited access to our complete literary collection with premium features.
              </p>
              <div className="flex items-baseline space-x-2 mb-6">
                <span className="text-4xl font-bold text-white">$9.99</span>
                <span className="text-primary-200">/month</span>
              </div>
              <Link
                to="/subscription"
                className="inline-flex items-center space-x-2 px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Sparkles className="h-5 w-5" />
                <span>Get Premium</span>
              </Link>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 text-white">
                  <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <Check className="h-4 w-4" />
                  </div>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PremiumCTA