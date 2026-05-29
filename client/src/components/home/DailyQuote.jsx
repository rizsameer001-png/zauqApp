import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Quote, Share2, Bookmark, RefreshCw } from 'lucide-react'

const DailyQuote = () => {
  const { t } = useTranslation()

  const quote = {
    text: 'Hazaaron khwahishein aisi ke har khwahish pe dam nikle, Bahut nikle mere armaan lekin phir bhi kam nikle.',
    textUr: 'ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے، بہت نکلے میرے ارمان لیکن پھر بھی کم نکلے۔',
    author: 'Mirza Ghalib',
    authorUr: 'مرزا غالب',
    context: 'From Diwan-e-Ghalib, one of the most celebrated couplets in Urdu literature.',
  }

  return (
    <section className="py-16 bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center space-x-2 mb-6">
            <Quote className="h-8 w-8 text-primary-300" />
            <span className="text-primary-300 font-medium tracking-wide uppercase text-sm">
              {t('home.dailyQuote')}
            </span>
          </div>

          <blockquote className="mb-6">
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-4">
              "{quote.text}"
            </p>
            <p className="urdu-text text-xl md:text-2xl text-primary-200 leading-loose mb-6">
              "{quote.textUr}"
            </p>
          </blockquote>

          <div className="mb-6">
            <p className="text-white font-medium">{quote.author}</p>
            <p className="urdu-text text-primary-300 text-sm">{quote.authorUr}</p>
          </div>

          <p className="text-primary-300 text-sm max-w-lg mx-auto mb-8">
            {quote.context}
          </p>

          <div className="flex items-center justify-center space-x-4">
            <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Bookmark className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DailyQuote