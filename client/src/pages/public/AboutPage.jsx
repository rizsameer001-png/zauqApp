import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { BookOpen, Heart, Globe, Sparkles, Users, Target } from 'lucide-react'

const AboutPage = () => {
  const { t } = useTranslation()

  const values = [
    {
      icon: BookOpen,
      title: 'Preservation',
      description: 'We digitize and preserve rare literary works for future generations.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Our love for literature drives everything we do.',
    },
    {
      icon: Globe,
      title: 'Accessibility',
      description: 'Making literature accessible to everyone, everywhere.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Using AI to enhance literary discovery and understanding.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a vibrant community of literature lovers.',
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'Committed to the highest quality in everything we offer.',
    },
  ]

  const stats = [
    { value: '50,000+', label: 'Poems' },
    { value: '2,000+', label: 'Authors' },
    { value: '100,000+', label: 'Users' },
    { value: '5,000+', label: 'Books' },
  ]

  return (
    <div className="page-container max-w-5xl">
      {/* Hero */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About ZauqApp
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            An AI-powered literary ecosystem celebrating the beauty of Urdu poetry, 
            Hindi literature, and English classics.
          </p>
        </motion.div>
      </div>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="p-3 bg-primary-100 rounded-lg inline-block mb-4">
            <Target className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            To preserve, promote, and make accessible the rich literary heritage of 
            South Asia. We believe that poetry and literature have the power to connect 
            hearts, bridge cultures, and inspire generations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="card p-8"
        >
          <div className="p-3 bg-secondary-100 rounded-lg inline-block mb-4">
            <Sparkles className="h-6 w-6 text-secondary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To become the world's most comprehensive digital platform for South Asian 
            literature, powered by cutting-edge AI that helps readers discover, understand, 
            and fall in love with the beauty of words.
          </p>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
      >
        {stats.map((stat, index) => (
          <div key={index} className="card p-6 text-center">
            <p className="text-3xl font-bold text-primary-600 mb-1">{stat.value}</p>
            <p className="text-gray-500">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Values */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card p-6"
            >
              <value.icon className="h-8 w-8 text-primary-600 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600 text-sm">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Our Team</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          ZauqApp is built by a passionate team of literature enthusiasts, engineers, 
          designers, and AI specialists who share a common love for the written word.
        </p>
      </div>
    </div>
  )
}

export default AboutPage