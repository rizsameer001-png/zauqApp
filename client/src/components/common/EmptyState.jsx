import { motion } from 'framer-motion'
import { BookOpen, Search, FileX } from 'lucide-react'

const icons = {
  search: Search,
  content: BookOpen,
  default: FileX
}

const EmptyState = ({ 
  icon = 'default', 
  title = 'No results found', 
  description = 'Try adjusting your search or filters.',
  action = null 
}) => {
  const Icon = icons[icon] || icons.default

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <div className="w-16 h-16 mb-4 bg-gray-100 dark:bg-dark-800 rounded-full flex items-center justify-center">
        <Icon className="w-8 h-8 text-secondary-400" />
      </div>
      <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-secondary-500 dark:text-secondary-400 max-w-md mb-6">
        {description}
      </p>
      {action}
    </motion.div>
  )
}

export default EmptyState
