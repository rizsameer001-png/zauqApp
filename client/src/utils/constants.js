// // API Endpoints
// export const API_ENDPOINTS = {
//   AUTH: {
//     REGISTER: '/auth/register',
//     LOGIN: '/auth/login',
//     GOOGLE: '/auth/google',
//     LOGOUT: '/auth/logout',
//     PROFILE: '/auth/profile',
//   },
//   POEMS: {
//     BASE: '/poems',
//     BY_SLUG: (slug) => `/poems/${slug}`,
//   },
//   AUTHORS: {
//     BASE: '/authors',
//     BY_SLUG: (slug) => `/authors/${slug}`,
//   },
//   BOOKS: {
//     BASE: '/books',
//     BY_SLUG: (slug) => `/books/${slug}`,
//   },
//   VIDEOS: {
//     BASE: '/videos',
//     BY_ID: (id) => `/videos/${id}`,
//   },
// }

// // Content Types
// export const CONTENT_TYPES = {
//   POEM: 'poem',
//   AUTHOR: 'author',
//   BOOK: 'book',
//   VIDEO: 'video',
// }

// // Poetry Genres
// export const POETRY_GENRES = [
//   { id: 'ghazal', label: 'Ghazals', labelHi: 'गजल', labelUr: 'غزلیں' },
//   { id: 'nazm', label: 'Nazms', labelHi: 'नज्म', labelUr: 'نظمیں' },
//   { id: 'sher', label: 'Sher', labelHi: 'शेर', labelUr: 'شعر' },
//   { id: 'rubai', label: 'Rubai', labelHi: 'रुबाई', labelUr: 'رباعی' },
//   { id: 'rekhti', label: 'Rekhti', labelHi: 'रेख्ती', labelUr: 'رختی' },
// ]

// // Author Categories
// export const AUTHOR_CATEGORIES = [
//   { id: 'classical', label: 'Classical', labelHi: 'शास्त्रीय', labelUr: 'کلاسیکی' },
//   { id: 'modern', label: 'Modern', labelHi: 'आधुनिक', labelUr: 'جدید' },
//   { id: 'female', label: 'Female Poets', labelHi: 'महिला कवि', labelUr: 'خواتین شعراء' },
//   { id: 'trending', label: 'Trending', labelHi: 'ट्रेंडिंग', labelUr: 'مقبول' },
// ]

// // Book Categories
// export const BOOK_CATEGORIES = [
//   { id: 'rare', label: 'Rare Books', labelHi: 'दुर्लभ पुस्तकें', labelUr: 'نایاب کتابیں' },
//   { id: 'journal', label: 'Journals', labelHi: 'जर्नल', labelUr: 'جرنل' },
//   { id: 'magazine', label: 'Magazines', labelHi: 'पत्रिकाएं', labelUr: 'رسائل' },
// ]

// // Video Categories
// export const VIDEO_CATEGORIES = [
//   { id: 'mushaira', label: 'Mushaira', labelHi: 'मुशायरा', labelUr: 'مشاعرہ' },
//   { id: 'podcast', label: 'Podcasts', labelHi: 'पॉडकास्ट', labelUr: 'پوڈکاسٹ' },
//   { id: 'documentary', label: 'Documentaries', labelHi: 'डॉक्यूमेंट्री', labelUr: 'دستاویزی' },
// ]

// // Languages
// export const LANGUAGES = [
//   { code: 'en', label: 'English', native: 'English' },
//   { code: 'hi', label: 'Hindi', native: 'हिंदी' },
//   { code: 'ur', label: 'Urdu', native: 'اردو' },
// ]

// // User Roles
// export const USER_ROLES = {
//   ADMIN: 'admin',
//   CREATOR: 'creator',
//   USER: 'user',
// }

// // Subscription Plans
// export const SUBSCRIPTION_PLANS = [
//   {
//     id: 'free',
//     name: 'Free',
//     price: 0,
//     features: ['Basic access', 'Limited downloads', 'Standard quality'],
//   },
//   {
//     id: 'premium',
//     name: 'Premium',
//     price: 9.99,
//     features: ['Full access', 'Unlimited downloads', 'HD quality', 'Offline mode', 'No ads'],
//   },
//   {
//     id: 'creator',
//     name: 'Creator',
//     price: 19.99,
//     features: ['All Premium features', 'Upload content', 'Analytics', 'Revenue share', 'Priority support'],
//   },
// ]

// // Toast Messages
// export const TOAST_MESSAGES = {
//   LOGIN_SUCCESS: 'Welcome back!',
//   REGISTER_SUCCESS: 'Account created successfully!',
//   LOGOUT_SUCCESS: 'Logged out successfully',
//   UPDATE_SUCCESS: 'Updated successfully',
//   DELETE_SUCCESS: 'Deleted successfully',
//   UPLOAD_SUCCESS: 'Uploaded successfully',
//   ERROR_GENERIC: 'Something went wrong. Please try again.',
//   ERROR_NETWORK: 'Network error. Please check your connection.',
// }

// export default {
//   API_ENDPOINTS,
//   CONTENT_TYPES,
//   POETRY_GENRES,
//   AUTHOR_CATEGORIES,
//   BOOK_CATEGORIES,
//   VIDEO_CATEGORIES,
//   LANGUAGES,
//   USER_ROLES,
//   SUBSCRIPTION_PLANS,
//   TOAST_MESSAGES,
// }









// // client/src/utils/constants.js

// // API Endpoints
// export const API_ENDPOINTS = {
//   AUTH: {
//     REGISTER: '/auth/register',
//     LOGIN: '/auth/login',
//     GOOGLE: '/auth/google',
//     LOGOUT: '/auth/logout',
//     PROFILE: '/auth/profile',
//     FORGOT_PASSWORD: '/auth/forgot-password',
//     RESET_PASSWORD: '/auth/reset-password',
//   },
//   POEMS: {
//     BASE: '/poems',
//     BY_SLUG: (slug) => `/poems/${slug}`,
//     FEATURED: '/poems/featured',
//     TRENDING: '/poems/trending',
//     BY_AUTHOR: (authorId) => `/poems/author/${authorId}`,
//   },
//   AUTHORS: {
//     BASE: '/authors',
//     BY_SLUG: (slug) => `/authors/${slug}`,
//     FEATURED: '/authors/featured',
//     TRENDING: '/authors/trending',
//   },
//   BOOKS: {
//     BASE: '/books',
//     BY_SLUG: (slug) => `/books/${slug}`,
//     FEATURED: '/books/featured',
//     DOWNLOAD: (slug) => `/books/${slug}/download`,
//     READER: (slug) => `/books/${slug}/reader`,
//   },
//   AUDIO: {
//     BASE: '/audio',
//     BY_SLUG: (slug) => `/audio/${slug}`,
//     FEATURED: '/audio/featured',
//     STREAM: (slug) => `/audio/${slug}/stream`,
//     TRANSCRIPT: (slug) => `/audio/${slug}/transcript`,
//   },
//   VIDEOS: {
//     BASE: '/videos',
//     BY_SLUG: (slug) => `/videos/${slug}`,
//     FEATURED: '/videos/featured',
//     STREAM: (slug) => `/videos/${slug}/stream`,
//   },
//   UPLOAD: {
//     IMAGE: '/upload/image',
//     PDF: '/upload/pdf',
//     EPUB: '/upload/epub',
//     AUDIO: '/upload/audio',
//     VIDEO: '/upload/video',
//   },
// };

// // Content Types
// export const CONTENT_TYPES = {
//   POEM: 'poem',
//   AUTHOR: 'author',
//   BOOK: 'book',
//   AUDIO: 'audio',
//   VIDEO: 'video',
// };

// // Poetry Genres (Expanded)
// export const POETRY_GENRES = [
//   { id: 'ghazal', label: 'Ghazals', labelHi: 'ग़ज़ल', labelUr: 'غزل', icon: '🎵', description: 'Love, romance, and philosophical poetry' },
//   { id: 'nazm', label: 'Nazms', labelHi: 'नज़्म', labelUr: 'نظم', icon: '📝', description: 'Narrative and descriptive poetry' },
//   { id: 'sher', label: 'Sher', labelHi: 'शेर', labelUr: 'شعر', icon: '📖', description: 'Two-line couplets' },
//   { id: 'rubai', label: 'Rubai', labelHi: 'रुबाई', labelUr: 'رباعی', icon: '🔢', description: 'Four-line quatrains' },
//   { id: 'rekhti', label: 'Rekhti', labelHi: 'रेख़्ती', labelUr: 'ریختی', icon: '💫', description: 'Feminine perspective poetry' },
//   { id: 'qasida', label: 'Qasida', labelHi: 'क़सीदा', labelUr: 'قصیدہ', icon: '🏆', description: 'Panegyric poetry' },
//   { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Elegiac poetry, mourning for martyrs' },
//   { id: 'nauha', label: 'Nauha', labelHi: 'नौहा', labelUr: 'نوحہ', icon: '😢', description: 'Lamentation poetry for Karbala' },
//   { id: 'soz', label: 'Soz', labelHi: 'सोज़', labelUr: 'سوز', icon: '🔥', description: 'Burning lament poetry' },
//   { id: 'salam', label: 'Salam', labelHi: 'सलाम', labelUr: 'سلام', icon: '🕊️', description: 'Salutation poetry for Ahl al-Bayt' },
//   { id: 'munajat', label: 'Munajat', labelHi: 'मुनाजात', labelUr: 'مناجات', icon: '🙏', description: 'Supplication and devotional poetry' },
//   { id: 'naat', label: 'Naat', labelHi: 'नात', labelUr: 'نعت', icon: '⭐', description: 'Poetry in praise of Prophet Muhammad' },
//   { id: 'hamd', label: 'Hamd', labelHi: 'हम्द', labelUr: 'حمد', icon: '🕌', description: 'Poetry in praise of Allah' },
//   { id: 'manqabat', label: 'Manqabat', labelHi: 'मनक़बत', labelUr: 'منقبت', icon: '✨', description: 'Poetry praising saints and Imams' },
//   { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '📚', description: 'Other forms of poetry' },
// ];

// // Author Categories (Expanded)
// export const AUTHOR_CATEGORIES = [
//   { id: 'classical', label: 'Classical', labelHi: 'शास्त्रीय', labelUr: 'کلاسیکی', description: 'Pre-20th century poets' },
//   { id: 'modern', label: 'Modern', labelHi: 'आधुनिक', labelUr: 'جدید', description: '20th century poets' },
//   { id: 'contemporary', label: 'Contemporary', labelHi: 'समकालीन', labelUr: 'معاصر', description: 'Living or recent poets' },
//   { id: 'female', label: 'Female Poets', labelHi: 'महिला कवि', labelUr: 'خواتین شعراء', description: 'Women poets' },
//   { id: 'trending', label: 'Trending', labelHi: 'ट्रेंडिंग', labelUr: 'مقبول', description: 'Most popular authors' },
//   { id: 'emerging', label: 'Emerging Voices', labelHi: 'उभरती आवाज़ें', labelUr: 'ابھرتی آوازیں', description: 'New and upcoming poets' },
//   { id: 'urdu', label: 'Urdu Poets', labelHi: 'उर्दू कवि', labelUr: 'اردو شعراء', description: 'Poets writing in Urdu' },
//   { id: 'persian', label: 'Persian Poets', labelHi: 'फ़ारसी कवि', labelUr: 'فارسی شعراء', description: 'Poets writing in Persian' },
//   { id: 'sufi', label: 'Sufi Poets', labelHi: 'सूफ़ी कवि', labelUr: 'صوفی شعراء', description: 'Mystical and spiritual poets' },
// ];

// // Book Categories (Expanded)
// export const BOOK_CATEGORIES = [
//   { id: 'rare', label: 'Rare Books', labelHi: 'दुर्लभ पुस्तकें', labelUr: 'نایاب کتابیں', description: 'Antique and rare manuscripts' },
//   { id: 'journal', label: 'Journals', labelHi: 'जर्नल', labelUr: 'جرنل', description: 'Literary journals and periodicals' },
//   { id: 'magazine', label: 'Magazines', labelHi: 'पत्रिकाएं', labelUr: 'رسائل', description: 'Literary magazines' },
//   { id: 'manuscript', label: 'Manuscripts', labelHi: 'हस्तलिखित', labelUr: 'مخطوطات', description: 'Handwritten manuscripts' },
//   { id: 'poetry_collection', label: 'Poetry Collections', labelHi: 'काव्य संग्रह', labelUr: 'مجموعہ کلام', description: 'Collected poetry works' },
//   { id: 'prose', label: 'Prose', labelHi: 'गद्य', labelUr: 'نثر', description: 'Literary prose works' },
//   { id: 'critical', label: 'Critical Studies', labelHi: 'आलोचनात्मक', labelUr: 'تنقیدی', description: 'Literary criticism' },
// ];

// // Audio Categories (Expanded)
// export const AUDIO_CATEGORIES = [
//   { id: 'nauha', label: 'Nauha', labelHi: 'नौहा', labelUr: 'نوحہ', icon: '😢', description: 'Lamentation recitations for Imam Hussain' },
//   { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Elegiac poetry recitations' },
//   { id: 'soz', label: 'Soz', labelHi: 'सोज़', labelUr: 'سوز', icon: '🔥', description: 'Burning lament recitations' },
//   { id: 'salam', label: 'Salam', labelHi: 'सलाम', labelUr: 'سلام', icon: '🕊️', description: 'Salutation recitations' },
//   { id: 'majlis', label: 'Majlis', labelHi: 'मजलिस', labelUr: 'مجلس', icon: '🕌', description: 'Mourning gatherings recitations' },
//   { id: 'mushaira', label: 'Mushaira', labelHi: 'मुशायरा', labelUr: 'مشاعرہ', icon: '🎤', description: 'Poetry symposiums' },
//   { id: 'podcast', label: 'Podcast', labelHi: 'पॉडकास्ट', labelUr: 'پوڈکاسٹ', icon: '🎙️', description: 'Literary podcasts and discussions' },
//   { id: 'poem_recitation', label: 'Poem Recitation', labelHi: 'काव्य पाठ', labelUr: 'شعر خوانی', icon: '📖', description: 'Poetry recitations' },
//   { id: 'ghazal', label: 'Ghazal', labelHi: 'ग़ज़ल', labelUr: 'غزل', icon: '🎵', description: 'Ghazal performances' },
//   { id: 'nazm', label: 'Nazm', labelHi: 'नज़्म', labelUr: 'نظم', icon: '📝', description: 'Nazm recitations' },
//   { id: 'naat', label: 'Naat', labelHi: 'नात', labelUr: 'نعت', icon: '⭐', description: 'Poetry in praise of Prophet Muhammad' },
//   { id: 'hamd', label: 'Hamd', labelHi: 'हम्द', labelUr: 'حمد', icon: '🕌', description: 'Poetry in praise of Allah' },
//   { id: 'manqabat', label: 'Manqabat', labelHi: 'मनक़बत', labelUr: 'منقبت', icon: '✨', description: 'Poetry praising saints and Imams' },
//   { id: 'audiobook', label: 'Audiobook', labelHi: 'ऑडियोबुक', labelUr: 'آڈیو کتاب', icon: '📚', description: 'Full book narrations' },
//   { id: 'lecture', label: 'Lecture', labelHi: 'व्याख्यान', labelUr: 'درس', icon: '🎓', description: 'Educational lectures' },
//   { id: 'interview', label: 'Interview', labelHi: 'साक्षात्कार', labelUr: 'انٹرویو', icon: '🎙️', description: 'Author and poet interviews' },
//   { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '📀', description: 'Other audio content' },
// ];

// // Video Categories (Expanded)
// export const VIDEO_CATEGORIES = [
//   { id: 'majlis', label: 'Majlis', labelHi: 'मजलिस', labelUr: 'مجلس', icon: '🕌', description: 'Mourning gatherings' },
//   { id: 'nauha', label: 'Nauha', labelHi: 'नौहा', labelUr: 'نوحہ', icon: '😢', description: 'Nauha recitation videos' },
//   { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Marsiya recitation videos' },
//   { id: 'mushaira', label: 'Mushaira', labelHi: 'मुशायरा', labelUr: 'مشاعرہ', icon: '🎤', description: 'Poetry symposium videos' },
//   { id: 'documentary', label: 'Documentary', labelHi: 'डॉक्यूमेंट्री', labelUr: 'دستاویزی', icon: '🎬', description: 'Literary documentaries' },
//   { id: 'interview', label: 'Interview', labelHi: 'साक्षात्कार', labelUr: 'انٹرویو', icon: '🎙️', description: 'Author and poet interviews' },
//   { id: 'lecture', label: 'Lecture', labelHi: 'व्याख्यान', labelUr: 'درس', icon: '🎓', description: 'Educational lectures' },
//   { id: 'performance', label: 'Performance', labelHi: 'प्रदर्शन', labelUr: 'پرفارمنس', icon: '🎭', description: 'Live poetry performances' },
//   { id: 'documentary_imam', label: 'Imam Hussain Documentary', labelHi: 'इमाम हुसैन डॉक्यूमेंट्री', labelUr: 'امام حسین ڈاکومنٹری', icon: '📽️', description: 'Documentaries about Karbala' },
//   { id: 'karbala', label: 'Karbala', labelHi: 'कर्बला', labelUr: 'کربلا', icon: '🕋', description: 'Karbala-related content' },
//   { id: 'azadari', label: 'Azadari', labelHi: 'अज़ादारी', labelUr: 'عزاداری', icon: '🖤', description: 'Mourning practices' },
//   { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '🎥', description: 'Other video content',},
// ];

// // Languages (Expanded)
// export const LANGUAGES = [
//   { code: 'en', label: 'English', native: 'English', direction: 'ltr' },
//   { code: 'hi', label: 'Hindi', native: 'हिंदी', direction: 'ltr' },
//   { code: 'ur', label: 'Urdu', native: 'اردو', direction: 'rtl', fontClass: 'urdu-text' },
//   { code: 'ar', label: 'Arabic', native: 'العربية', direction: 'rtl' },
//   { code: 'fa', label: 'Persian', native: 'فارسی', direction: 'rtl' },
//   { code: 'pn', label: 'Punjabi', native: 'پنجابی', direction: 'rtl' },
// ];

// // User Roles
// export const USER_ROLES = {
//   ADMIN: 'admin',
//   CREATOR: 'creator',
//   MODERATOR: 'moderator',
//   USER: 'user',
// };

// // Subscription Plans
// export const SUBSCRIPTION_PLANS = [
//   {
//     id: 'free',
//     name: 'Free',
//     price: 0,
//     currency: 'INR',
//     period: 'monthly',
//     features: [
//       'Basic access to all content',
//       'Limited downloads (5 per month)',
//       'Standard audio quality (128kbps)',
//       'Standard video quality (480p)',
//       'Ads supported',
//     ],
//   },
//   {
//     id: 'basic',
//     name: 'Basic',
//     price: 99,
//     currency: 'INR',
//     period: 'monthly',
//     features: [
//       'Full access to all content',
//       'Unlimited poem reading',
//       'Download 10 ebooks per month',
//       'Standard audio quality (128kbps)',
//       'Standard video quality (720p)',
//       'No ads',
//     ],
//   },
//   {
//     id: 'premium',
//     name: 'Premium',
//     price: 199,
//     currency: 'INR',
//     period: 'monthly',
//     features: [
//       'Everything in Basic',
//       'Unlimited downloads',
//       'HD audio quality (320kbps)',
//       'HD video quality (1080p)',
//       'Offline mode',
//       'Early access to new content',
//       'AI explanations',
//     ],
//   },
//   {
//     id: 'pro',
//     name: 'Pro',
//     price: 499,
//     currency: 'INR',
//     period: 'monthly',
//     features: [
//       'Everything in Premium',
//       'Creator tools',
//       'Upload your own content',
//       'Analytics dashboard',
//       'Priority support',
//       'Revenue sharing',
//     ],
//   },
// ];

// // Toast Messages
// export const TOAST_MESSAGES = {
//   LOGIN_SUCCESS: 'Welcome back! You have successfully logged in.',
//   LOGIN_ERROR: 'Invalid email or password. Please try again.',
//   REGISTER_SUCCESS: 'Account created successfully! Please check your email to verify.',
//   REGISTER_ERROR: 'Registration failed. Please try again.',
//   LOGOUT_SUCCESS: 'Logged out successfully.',
//   LOGOUT_ERROR: 'Error during logout.',
//   UPDATE_SUCCESS: 'Updated successfully!',
//   UPDATE_ERROR: 'Update failed. Please try again.',
//   DELETE_SUCCESS: 'Deleted successfully!',
//   DELETE_ERROR: 'Delete failed. Please try again.',
//   UPLOAD_SUCCESS: 'Uploaded successfully!',
//   UPLOAD_ERROR: 'Upload failed. Please check file format and size.',
//   COPY_SUCCESS: 'Link copied to clipboard!',
//   COPY_ERROR: 'Failed to copy link.',
//   NETWORK_ERROR: 'Network error. Please check your connection.',
//   SERVER_ERROR: 'Server error. Please try again later.',
//   NOT_FOUND: 'Content not found.',
//   UNAUTHORIZED: 'Please login to continue.',
//   FORBIDDEN: 'You do not have permission to access this content.',
// };

// // File Upload Limits
// export const UPLOAD_LIMITS = {
//   IMAGE: { maxSize: 5 * 1024 * 1024, formats: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
//   PDF: { maxSize: 100 * 1024 * 1024, formats: ['application/pdf'] },
//   EPUB: { maxSize: 50 * 1024 * 1024, formats: ['application/epub+zip'] },
//   AUDIO: { maxSize: 100 * 1024 * 1024, formats: ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/m4a'] },
//   VIDEO: { maxSize: 500 * 1024 * 1024, formats: ['video/mp4', 'video/webm', 'video/quicktime'] },
// };

// // Reading Modes
// export const READING_MODES = {
//   SINGLE: 'single',
//   DOUBLE: 'double',
//   SCROLL: 'scroll',
// };

// // Themes
// export const THEMES = [
//   { id: 'light', name: 'Light', icon: '☀️' },
//   { id: 'dark', name: 'Dark', icon: '🌙' },
//   { id: 'sepia', name: 'Sepia', icon: '📖' },
// ];

// // Font Sizes
// export const FONT_SIZES = [
//   { id: 'small', name: 'Small', size: '14px' },
//   { id: 'medium', name: 'Medium', size: '16px' },
//   { id: 'large', name: 'Large', size: '18px' },
//   { id: 'xlarge', name: 'Extra Large', size: '20px' },
// ];

// // Default Export
// export default {
//   API_ENDPOINTS,
//   CONTENT_TYPES,
//   POETRY_GENRES,
//   AUTHOR_CATEGORIES,
//   BOOK_CATEGORIES,
//   AUDIO_CATEGORIES,
//   VIDEO_CATEGORIES,
//   LANGUAGES,
//   USER_ROLES,
//   SUBSCRIPTION_PLANS,
//   TOAST_MESSAGES,
//   UPLOAD_LIMITS,
//   READING_MODES,
//   THEMES,
//   FONT_SIZES,
// };










// // API Endpoints 
// export const API_ENDPOINTS = {
//   AUTH: {
//     REGISTER: '/auth/register',
//     LOGIN: '/auth/login',
//     GOOGLE: '/auth/google',
//     LOGOUT: '/auth/logout',
//     PROFILE: '/auth/profile',
//     FORGOT_PASSWORD: '/auth/forgot-password',
//     RESET_PASSWORD: '/auth/reset-password',
//   },
//   POEMS: {
//     BASE: '/poems',
//     BY_SLUG: (slug) => `/poems/${slug}`,
//     FEATURED: '/poems/featured',
//     TRENDING: '/poems/trending',
//     BY_AUTHOR: (authorId) => `/poems/author/${authorId}`,
//   },
//   AUTHORS: {
//     BASE: '/authors',
//     BY_SLUG: (slug) => `/authors/${slug}`,
//     FEATURED: '/authors/featured',
//     TRENDING: '/authors/trending',
//   },
//   BOOKS: {
//     BASE: '/books',
//     BY_SLUG: (slug) => `/books/${slug}`,
//     FEATURED: '/books/featured',
//     DOWNLOAD: (slug) => `/books/${slug}/download`,
//     READER: (slug) => `/books/${slug}/reader`,
//   },
//   AUDIO: {
//     BASE: '/audio',
//     BY_SLUG: (slug) => `/audio/${slug}`,
//     FEATURED: '/audio/featured',
//     STREAM: (slug) => `/audio/${slug}/stream`,
//     TRANSCRIPT: (slug) => `/audio/${slug}/transcript`,
//   },
//   VIDEOS: {
//     BASE: '/videos',
//     BY_SLUG: (slug) => `/videos/${slug}`,
//     FEATURED: '/videos/featured',
//     STREAM: (slug) => `/videos/${slug}/stream`,
//   },
//   UPLOAD: {
//     IMAGE: '/upload/image',
//     PDF: '/upload/pdf',
//     EPUB: '/upload/epub',
//     AUDIO: '/upload/audio',
//     VIDEO: '/upload/video',
//   },
// };

// // Content Types
// export const CONTENT_TYPES = {
//   POEM: 'poem',
//   AUTHOR: 'author',
//   BOOK: 'book',
//   AUDIO: 'audio',
//   VIDEO: 'video',
// };

// // Poetry Genres
// export const POETRY_GENRES = [
//   { id: 'ghazal', label: 'Ghazals', labelHi: 'ग़ज़ल', labelUr: 'غزل', icon: '🎵', description: 'Love, romance, and philosophical poetry' },
//   { id: 'nazm', label: 'Nazms', labelHi: 'नज़्म', labelUr: 'نظم', icon: '📝', description: 'Narrative and descriptive poetry' },
//   { id: 'sher', label: 'Sher', labelHi: 'शेर', labelUr: 'شعر', icon: '📖', description: 'Two-line couplets' },
//   { id: 'rubai', label: 'Rubai', labelHi: 'रुबाई', labelUr: 'رباعی', icon: '🔢', description: 'Four-line quatrains' },
//   { id: 'rekhti', label: 'Rekhti', labelHi: 'रेख़्ती', labelUr: 'ریختی', icon: '💫', description: 'Feminine perspective poetry' },
//   { id: 'qasida', label: 'Qasida', labelHi: 'क़सीदा', labelUr: 'قصیدہ', icon: '🏆', description: 'Panegyric poetry' },
//   { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Elegiac poetry' },
//   { id: 'nauha', label: 'Nauha', labelHi: 'नौहा', labelUr: 'نوحہ', icon: '😢', description: 'Lamentation poetry' },
//   { id: 'soz', label: 'Soz', labelHi: 'सोज़', labelUr: 'سوز', icon: '🔥', description: 'Burning lament poetry' },
//   { id: 'salam', label: 'Salam', labelHi: 'सलाम', labelUr: 'سلام', icon: '🕊️', description: 'Salutation poetry' },
//   { id: 'munajat', label: 'Munajat', labelHi: 'मुनाजात', labelUr: 'مناجات', icon: '🙏', description: 'Devotional poetry' },
//   { id: 'naat', label: 'Naat', labelHi: 'नात', labelUr: 'نعت', icon: '⭐', description: 'Praise of Prophet Muhammad' },
//   { id: 'hamd', label: 'Hamd', labelHi: 'हम्द', labelUr: 'حمد', icon: '🕌', description: 'Praise of Allah' },
//   { id: 'manqabat', label: 'Manqabat', labelHi: 'मनक़बत', labelUr: 'منقبت', icon: '✨', description: 'Praise of saints' },
//   { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '📚', description: 'Other poetry forms' },
// ];

// // Author Categories
// export const AUTHOR_CATEGORIES = [
//   { id: 'classical', label: 'Classical', labelHi: 'शास्त्रीय', labelUr: 'کلاسیکی', description: 'Pre-20th century poets' },
//   { id: 'modern', label: 'Modern', labelHi: 'आधुनिक', labelUr: 'جدید', description: '20th century poets' },
//   { id: 'contemporary', label: 'Contemporary', labelHi: 'समकालीन', labelUr: 'معاصر', description: 'Living poets' },
// ];

// // Book Categories
// export const BOOK_CATEGORIES = [
//   { id: 'rare', label: 'Rare Books', labelHi: 'दुर्लभ', labelUr: 'نایاب', description: 'Rare manuscripts' },
//   { id: 'poetry_collection', label: 'Poetry Collections', labelHi: 'काव्य संग्रह', labelUr: 'مجموعہ کلام', description: 'Collected works' },
// ];

// // Audio Categories
// export const AUDIO_CATEGORIES = [
//   { id: 'nauha', label: 'Nauha', icon: '😢', description: 'Lamentation recitations' },
//   { id: 'ghazal', label: 'Ghazal', icon: '🎵', description: 'Ghazal performances' },
// ];

// // ✅ FIXED HERE
// export const VIDEO_CATEGORIES = [
//   { id: 'majlis', label: 'Majlis', icon: '🕌', description: 'Mourning gatherings' },
//   { id: 'nauha', label: 'Nauha', icon: '😢', description: 'Nauha videos' },
//   { id: 'mushaira', label: 'Mushaira', icon: '🎤', description: 'Poetry events' },
//   { id: 'other', label: 'Other', icon: '🎥', description: 'Other video content' },
// ];

// // Languages
// export const LANGUAGES = [
//   { code: 'en', label: 'English' },
//   { code: 'hi', label: 'Hindi' },
//   { code: 'ur', label: 'Urdu' },
// ];

// // User Roles
// export const USER_ROLES = {
//   ADMIN: 'admin',
//   USER: 'user',
// };

// // Export All
// export default {
//   API_ENDPOINTS,
//   CONTENT_TYPES,
//   POETRY_GENRES,
//   AUTHOR_CATEGORIES,
//   BOOK_CATEGORIES,
//   AUDIO_CATEGORIES,
//   VIDEO_CATEGORIES,
//   LANGUAGES,
//   USER_ROLES,
// };






// // client/src/utils/constants.js

// // API Endpoints
// export const API_ENDPOINTS = {
//   AUTH: {
//     REGISTER: '/auth/register',
//     LOGIN: '/auth/login',
//     GOOGLE: '/auth/google',
//     LOGOUT: '/auth/logout',
//     PROFILE: '/auth/profile',
//     FORGOT_PASSWORD: '/auth/forgot-password',
//     RESET_PASSWORD: '/auth/reset-password',
//   },
//   POEMS: {
//     BASE: '/poems',
//     BY_SLUG: (slug) => `/poems/${slug}`,
//     FEATURED: '/poems/featured',
//     TRENDING: '/poems/trending',
//     BY_AUTHOR: (authorId) => `/poems/author/${authorId}`,
//   },
//   AUTHORS: {
//     BASE: '/authors',
//     BY_SLUG: (slug) => `/authors/${slug}`,
//     FEATURED: '/authors/featured',
//     TRENDING: '/authors/trending',
//   },
//   BOOKS: {
//     BASE: '/books',
//     BY_SLUG: (slug) => `/books/${slug}`,
//     FEATURED: '/books/featured',
//     DOWNLOAD: (slug) => `/books/${slug}/download`,
//     READER: (slug) => `/books/${slug}/reader`,
//   },
//   AUDIO: {
//     BASE: '/audio',
//     BY_SLUG: (slug) => `/audio/${slug}`,
//     FEATURED: '/audio/featured',
//     STREAM: (slug) => `/audio/${slug}/stream`,
//     TRANSCRIPT: (slug) => `/audio/${slug}/transcript`,
//     BY_TYPE: (type) => `/audio/type/${type}`,
//     BY_OCCASION: (occasion) => `/audio/occasion/${occasion}`,
//   },
//   VIDEOS: {
//     BASE: '/videos',
//     BY_SLUG: (slug) => `/videos/${slug}`,
//     FEATURED: '/videos/featured',
//     STREAM: (slug) => `/videos/${slug}/stream`,
//   },
//   UPLOAD: {
//     IMAGE: '/upload/image',
//     PDF: '/upload/pdf',
//     EPUB: '/upload/epub',
//     AUDIO: '/upload/audio',
//     VIDEO: '/upload/video',
//   },
// };

// // Content Types
// export const CONTENT_TYPES = {
//   POEM: 'poem',
//   AUTHOR: 'author',
//   BOOK: 'book',
//   AUDIO: 'audio',
//   VIDEO: 'video',
// };

// // Poetry Genres
// export const POETRY_GENRES = [
//   { id: 'ghazal', label: 'Ghazals', labelHi: 'ग़ज़ल', labelUr: 'غزل', icon: '🎵', description: 'Love, romance, and philosophical poetry' },
//   { id: 'nazm', label: 'Nazms', labelHi: 'नज़्म', labelUr: 'نظم', icon: '📝', description: 'Narrative and descriptive poetry' },
//   { id: 'sher', label: 'Sher', labelHi: 'शेर', labelUr: 'شعر', icon: '📖', description: 'Two-line couplets' },
//   { id: 'rubai', label: 'Rubai', labelHi: 'रुबाई', labelUr: 'رباعی', icon: '🔢', description: 'Four-line quatrains' },
//   { id: 'rekhti', label: 'Rekhti', labelHi: 'रेख़्ती', labelUr: 'ریختی', icon: '💫', description: 'Feminine perspective poetry' },
//   { id: 'qasida', label: 'Qasida', labelHi: 'क़सीदा', labelUr: 'قصیدہ', icon: '🏆', description: 'Panegyric poetry' },
//   { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Elegiac poetry' },
//   { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '📚', description: 'Other forms of poetry' },
// ];

// // Author Categories
// export const AUTHOR_CATEGORIES = [
//   { id: 'classical', label: 'Classical Poets', labelHi: 'शास्त्रीय कवि', labelUr: 'کلاسیکی شعراء', description: 'Pre-20th century poets' },
//   { id: 'modern', label: 'Modern Poets', labelHi: 'आधुनिक कवि', labelUr: 'جدید شعراء', description: '20th century poets' },
//   { id: 'contemporary', label: 'Contemporary Poets', labelHi: 'समकालीन कवि', labelUr: 'معاصر شعراء', description: 'Living or recent poets' },
//   { id: 'female', label: 'Female Poets', labelHi: 'महिला कवि', labelUr: 'خواتین شعراء', description: 'Women poets' },
//   { id: 'trending', label: 'Trending Poets', labelHi: 'ट्रेंडिंग कवि', labelUr: 'مقبول شعراء', description: 'Most popular authors' },
//   { id: 'emerging', label: 'Emerging Voices', labelHi: 'उभरती आवाज़ें', labelUr: 'ابھرتی آوازیں', description: 'New and upcoming poets' },
// ];

// // Book Categories
// export const BOOK_CATEGORIES = [
//   { id: 'rare', label: 'Rare Books', labelHi: 'दुर्लभ पुस्तकें', labelUr: 'نایاب کتابیں', description: 'Antique and rare manuscripts' },
//   { id: 'journal', label: 'Journals', labelHi: 'जर्नल', labelUr: 'جرنل', description: 'Literary journals' },
//   { id: 'magazine', label: 'Magazines', labelHi: 'पत्रिकाएं', labelUr: 'رسائل', description: 'Literary magazines' },
//   { id: 'manuscript', label: 'Manuscripts', labelHi: 'हस्तलिखित', labelUr: 'مخطوطات', description: 'Handwritten manuscripts' },
//   { id: 'poetry_collection', label: 'Poetry Collections', labelHi: 'काव्य संग्रह', labelUr: 'مجموعہ کلام', description: 'Collected poetry works' },
//   { id: 'prose', label: 'Prose', labelHi: 'गद्य', labelUr: 'نثر', description: 'Literary prose works' },
// ];

// // Audio Categories
// export const AUDIO_CATEGORIES = [
//   { id: 'nauha', label: 'Nauha', icon: '😢', occasion: 'muharram', description: 'Lamentation recitations' },
//   { id: 'marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram', description: 'Elegiac poetry' },
//   { id: 'mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general', description: 'Poetry events' },
//   { id: 'podcast', label: 'Podcast', icon: '🎙️', occasion: 'general', description: 'Podcasts' },
//   { id: 'other', label: 'Other', icon: '📀', occasion: 'general', description: 'Other audio content' },
// ];

// // Occasion Categories
// export const OCCASION_CATEGORIES = [
//   { id: 'muharram', label: 'Muharram', icon: '🖤' },
//   { id: 'ramadan', label: 'Ramadan', icon: '🌙' },
//   { id: 'eid', label: 'Eid', icon: '🎉' },
//   { id: 'milad', label: 'Milad', icon: '⭐' },
//   { id: 'general', label: 'General', icon: '📀' },
// ];

// // Video Categories
// export const VIDEO_CATEGORIES = [
//   { id: 'majlis', label: 'Majlis', icon: '🕌' },
//   { id: 'nauha', label: 'Nauha', icon: '😢' },
//   { id: 'mushaira', label: 'Mushaira', icon: '🎤' },
//   { id: 'other', label: 'Other', icon: '🎥' },
// ];

// // Languages
// export const LANGUAGES = [
//   { code: 'en', label: 'English' },
//   { code: 'hi', label: 'Hindi' },
//   { code: 'ur', label: 'Urdu' },
// ];

// // Roles
// export const USER_ROLES = {
//   ADMIN: 'admin',
//   USER: 'user',
// };

// // Export
// export default {
//   API_ENDPOINTS,
//   CONTENT_TYPES,
//   POETRY_GENRES,
//   AUTHOR_CATEGORIES,
//   BOOK_CATEGORIES,
//   AUDIO_CATEGORIES,
//   OCCASION_CATEGORIES,
//   VIDEO_CATEGORIES,
//   LANGUAGES,
//   USER_ROLES,
// };














// // API Endpoints
// export const API_ENDPOINTS = {
//   AUTH: {
//     REGISTER: '/auth/register',
//     LOGIN: '/auth/login',
//     GOOGLE: '/auth/google',
//     LOGOUT: '/auth/logout',
//     PROFILE: '/auth/profile',
//     FORGOT_PASSWORD: '/auth/forgot-password',
//     RESET_PASSWORD: '/auth/reset-password',
//   },
//   POEMS: {
//     BASE: '/poems',
//     BY_SLUG: (slug) => `/poems/${slug}`,
//     FEATURED: '/poems/featured',
//     TRENDING: '/poems/trending',
//     BY_AUTHOR: (authorId) => `/poems/author/${authorId}`,
//   },
//   AUTHORS: {
//     BASE: '/authors',
//     BY_SLUG: (slug) => `/authors/${slug}`,
//     FEATURED: '/authors/featured',
//     TRENDING: '/authors/trending',
//   },
//   BOOKS: {
//     BASE: '/books',
//     BY_SLUG: (slug) => `/books/${slug}`,
//     FEATURED: '/books/featured',
//     DOWNLOAD: (slug) => `/books/${slug}/download`,
//     READER: (slug) => `/books/${slug}/reader`,
//   },
//   AUDIO: {
//     BASE: '/audio',
//     BY_SLUG: (slug) => `/audio/${slug}`,
//     FEATURED: '/audio/featured',
//     STREAM: (slug) => `/audio/${slug}/stream`,
//     TRANSCRIPT: (slug) => `/audio/${slug}/transcript`,
//     BY_TYPE: (type) => `/audio/type/${type}`,
//     BY_OCCASION: (occasion) => `/audio/occasion/${occasion}`,
//   },
//   VIDEOS: {
//     BASE: '/videos',
//     BY_SLUG: (slug) => `/videos/${slug}`,
//     FEATURED: '/videos/featured',
//     STREAM: (slug) => `/videos/${slug}/stream`,
//   },
//   UPLOAD: {
//     IMAGE: '/upload/image',
//     PDF: '/upload/pdf',
//     EPUB: '/upload/epub',
//     AUDIO: '/upload/audio',
//     VIDEO: '/upload/video',
//   },
//   SUBSCRIPTIONS: {
//     BASE: '/subscriptions',
//     PLANS: '/subscriptions/plans',
//     CURRENT: '/subscriptions/current',
//     SUBSCRIBE: '/subscriptions/subscribe',
//     CANCEL: '/subscriptions/cancel',
//     BILLING_HISTORY: '/subscriptions/billing-history',
//     VERIFY_PAYMENT: '/subscriptions/verify-payment',
//     FEATURES: '/subscriptions/features',
//   }
// };

// // Content Types
// export const CONTENT_TYPES = {
//   POEM: 'poem',
//   AUTHOR: 'author',
//   BOOK: 'book',
//   AUDIO: 'audio',
//   VIDEO: 'video',
// };

// // Subscription Plans
// export const SUBSCRIPTION_PLANS = {
//   FREE: {
//     id: 'free',
//     name: 'Free',
//     price: 0,
//     currency: 'INR',
//     period: 'month',
//     description: 'Perfect for getting started',
//     features: [
//       'Browse all content',
//       'Read public poems',
//       'Basic search',
//       'Limited downloads (50 poems/day)',
//       '2 ebooks/month',
//       '5 audio streams/month'
//     ],
//     limits: {
//       poemsPerDay: 50,
//       booksPerMonth: 2,
//       audioPerMonth: 5
//     },
//     badge: null,
//     recommended: false,
//     color: 'gray'
//   },
//   BASIC: {
//     id: 'basic',
//     name: 'Basic',
//     price: 99,
//     currency: 'INR',
//     period: 'month',
//     description: 'Great for regular readers',
//     features: [
//       'All free features',
//       'Unlimited poem reading',
//       'Download 5 ebooks/month',
//       'Basic audio streaming',
//       'Ad-supported experience',
//       'Email support'
//     ],
//     limits: {
//       ebooksPerMonth: 5,
//       audiobooksPerMonth: 3
//     },
//     badge: 'Popular',
//     recommended: true,
//     color: 'blue'
//   },
//   PREMIUM: {
//     id: 'premium',
//     name: 'Premium',
//     price: 199,
//     currency: 'INR',
//     period: 'month',
//     description: 'For serious literature enthusiasts',
//     features: [
//       'All Basic features',
//       'Unlimited downloads',
//       'HD audio streaming',
//       'Ad-free experience',
//       'AI-powered explanations',
//       'Priority support',
//       'Offline access'
//     ],
//     limits: {
//       unlimited: true
//     },
//     badge: 'Best Value',
//     recommended: true,
//     color: 'amber'
//   },
//   PRO: {
//     id: 'pro',
//     name: 'Pro',
//     price: 499,
//     currency: 'INR',
//     period: 'month',
//     description: 'For creators and power users',
//     features: [
//       'All Premium features',
//       'Creator tools',
//       'Analytics dashboard',
//       'Early access to features',
//       '24/7 priority support',
//       'API access',
//       'Content monetization',
//       'Custom branding'
//     ],
//     limits: {
//       unlimited: true,
//       creator: true
//     },
//     badge: 'Creator',
//     recommended: false,
//     color: 'purple'
//   }
// };

// // Billing Cycles
// export const BILLING_CYCLES = {
//   MONTHLY: 'monthly',
//   QUARTERLY: 'quarterly',
//   YEARLY: 'yearly'
// };

// // Payment Methods
// export const PAYMENT_METHODS = {
//   CARD: 'card',
//   UPI: 'upi',
//   NETBANKING: 'netbanking',
//   WALLET: 'wallet',
//   FREE: 'free'
// };

// // Subscription Status
// export const SUBSCRIPTION_STATUS = {
//   ACTIVE: 'active',
//   CANCELLED: 'cancelled',
//   EXPIRED: 'expired',
//   PENDING: 'pending'
// };

// // Helper functions for subscriptions
// export const getPlanById = (planId) => {
//   return Object.values(SUBSCRIPTION_PLANS).find(plan => plan.id === planId);
// };

// export const getAllPlans = () => {
//   return Object.values(SUBSCRIPTION_PLANS);
// };

// export const getRecommendedPlans = () => {
//   return Object.values(SUBSCRIPTION_PLANS).filter(plan => plan.recommended);
// };

// export const getActivePlans = () => {
//   return Object.values(SUBSCRIPTION_PLANS);
// };

// export const calculateDiscountedPrice = (plan, billingCycle) => {
//   const basePrice = plan.price;
//   if (billingCycle === BILLING_CYCLES.QUARTERLY) {
//     return {
//       amount: basePrice * 3,
//       discount: 10,
//       totalSavings: Math.round(basePrice * 3 * 0.1)
//     };
//   } else if (billingCycle === BILLING_CYCLES.YEARLY) {
//     return {
//       amount: basePrice * 12,
//       discount: 20,
//       totalSavings: Math.round(basePrice * 12 * 0.2)
//     };
//   }
//   return {
//     amount: basePrice,
//     discount: 0,
//     totalSavings: 0
//   };
// };

// // Poetry Genres
// export const POETRY_GENRES = [
//   { id: 'ghazal', label: 'Ghazals', labelHi: 'ग़ज़ल', labelUr: 'غزل', icon: '🎵', description: 'Love, romance, and philosophical poetry' },
//   { id: 'nazm', label: 'Nazms', labelHi: 'नज़्म', labelUr: 'نظم', icon: '📝', description: 'Narrative and descriptive poetry' },
//   { id: 'sher', label: 'Sher', labelHi: 'शेर', labelUr: 'شعر', icon: '📖', description: 'Two-line couplets' },
//   { id: 'rubai', label: 'Rubai', labelHi: 'रुबाई', labelUr: 'رباعی', icon: '🔢', description: 'Four-line quatrains' },
//   { id: 'rekhti', label: 'Rekhti', labelHi: 'रेख़्ती', labelUr: 'ریختی', icon: '💫', description: 'Feminine perspective poetry' },
//   { id: 'qasida', label: 'Qasida', labelHi: 'क़सीदा', labelUr: 'قصیدہ', icon: '🏆', description: 'Panegyric poetry' },
//   { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Elegiac poetry' },
//   { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '📚', description: 'Other forms of poetry' },
// ];

// // Author Categories
// export const AUTHOR_CATEGORIES = [
//   { id: 'classical', label: 'Classical Poets', labelHi: 'शास्त्रीय कवि', labelUr: 'کلاسیکی شعراء', description: 'Pre-20th century poets' },
//   { id: 'modern', label: 'Modern Poets', labelHi: 'आधुनिक कवि', labelUr: 'جدید شعراء', description: '20th century poets' },
//   { id: 'contemporary', label: 'Contemporary Poets', labelHi: 'समकालीन कवि', labelUr: 'معاصر شعراء', description: 'Living or recent poets' },
//   { id: 'female', label: 'Female Poets', labelHi: 'महिला कवि', labelUr: 'خواتین شعراء', description: 'Women poets' },
//   { id: 'trending', label: 'Trending Poets', labelHi: 'ट्रेंडिंग कवि', labelUr: 'مقبول شعراء', description: 'Most popular authors' },
//   { id: 'emerging', label: 'Emerging Voices', labelHi: 'उभरती आवाज़ें', labelUr: 'ابھرتی آوازیں', description: 'New and upcoming poets' },
// ];

// // Book Categories
// export const BOOK_CATEGORIES = [
//   { id: 'rare', label: 'Rare Books', labelHi: 'दुर्लभ पुस्तकें', labelUr: 'نایاب کتابیں', description: 'Antique and rare manuscripts' },
//   { id: 'journal', label: 'Journals', labelHi: 'जर्नल', labelUr: 'جرنل', description: 'Literary journals' },
//   { id: 'magazine', label: 'Magazines', labelHi: 'पत्रिकाएं', labelUr: 'رسائل', description: 'Literary magazines' },
//   { id: 'manuscript', label: 'Manuscripts', labelHi: 'हस्तलिखित', labelUr: 'مخطوطات', description: 'Handwritten manuscripts' },
//   { id: 'poetry_collection', label: 'Poetry Collections', labelHi: 'काव्य संग्रह', labelUr: 'مجموعہ کلام', description: 'Collected poetry works' },
//   { id: 'prose', label: 'Prose', labelHi: 'गद्य', labelUr: 'نثر', description: 'Literary prose works' },
// ];

// // Audio Categories
// export const AUDIO_CATEGORIES = [
//   { id: 'nauha', label: 'Nauha', icon: '😢', occasion: 'muharram', description: 'Lamentation recitations' },
//   { id: 'marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram', description: 'Elegiac poetry' },
//   { id: 'mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general', description: 'Poetry events' },
//   { id: 'podcast', label: 'Podcast', icon: '🎙️', occasion: 'general', description: 'Podcasts' },
//   { id: 'other', label: 'Other', icon: '📀', occasion: 'general', description: 'Other audio content' },
// ];

// // Occasion Categories
// export const OCCASION_CATEGORIES = [
//   { id: 'muharram', label: 'Muharram', icon: '🖤' },
//   { id: 'ramadan', label: 'Ramadan', icon: '🌙' },
//   { id: 'eid', label: 'Eid', icon: '🎉' },
//   { id: 'milad', label: 'Milad', icon: '⭐' },
//   { id: 'general', label: 'General', icon: '📀' },
// ];

// // Video Categories
// export const VIDEO_CATEGORIES = [
//   { id: 'majlis', label: 'Majlis', icon: '🕌' },
//   { id: 'nauha', label: 'Nauha', icon: '😢' },
//   { id: 'mushaira', label: 'Mushaira', icon: '🎤' },
//   { id: 'other', label: 'Other', icon: '🎥' },
// ];

// // Languages
// export const LANGUAGES = [
//   { code: 'en', label: 'English' },
//   { code: 'hi', label: 'Hindi' },
//   { code: 'ur', label: 'Urdu' },
// ];

// // Roles
// export const USER_ROLES = {
//   ADMIN: 'admin',
//   USER: 'user',
//   CREATOR: 'creator',
//   MODERATOR: 'moderator',
//   SUPERADMIN: 'superadmin'
// };

// // Export all
// export default {
//   API_ENDPOINTS,
//   CONTENT_TYPES,
//   SUBSCRIPTION_PLANS,
//   BILLING_CYCLES,
//   PAYMENT_METHODS,
//   SUBSCRIPTION_STATUS,
//   getPlanById,
//   getAllPlans,
//   getRecommendedPlans,
//   getActivePlans,
//   calculateDiscountedPrice,
//   POETRY_GENRES,
//   AUTHOR_CATEGORIES,
//   BOOK_CATEGORIES,
//   AUDIO_CATEGORIES,
//   OCCASION_CATEGORIES,
//   VIDEO_CATEGORIES,
//   LANGUAGES,
//   USER_ROLES,
// };

















// client/src/utils/constants.js

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    GOOGLE: '/auth/google',
    LOGOUT: '/auth/logout',
    PROFILE: '/auth/profile',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  POEMS: {
    BASE: '/poems',
    BY_SLUG: (slug) => `/poems/${slug}`,
    FEATURED: '/poems/featured',
    TRENDING: '/poems/trending',
    BY_AUTHOR: (authorId) => `/poems/author/${authorId}`,
  },
  AUTHORS: {
    BASE: '/authors',
    BY_SLUG: (slug) => `/authors/${slug}`,
    FEATURED: '/authors/featured',
    TRENDING: '/authors/trending',
  },
  BOOKS: {
    BASE: '/books',
    BY_SLUG: (slug) => `/books/${slug}`,
    FEATURED: '/books/featured',
    DOWNLOAD: (slug) => `/books/${slug}/download`,
    READER: (slug) => `/books/${slug}/reader`,
  },
  AUDIO: {
    BASE: '/audio',
    BY_SLUG: (slug) => `/audio/${slug}`,
    FEATURED: '/audio/featured',
    STREAM: (slug) => `/audio/${slug}/stream`,
    TRANSCRIPT: (slug) => `/audio/${slug}/transcript`,
    BY_TYPE: (type) => `/audio/type/${type}`,
    BY_OCCASION: (occasion) => `/audio/occasion/${occasion}`,
  },
  VIDEOS: {
    BASE: '/videos',
    BY_SLUG: (slug) => `/videos/${slug}`,
    FEATURED: '/videos/featured',
    STREAM: (slug) => `/videos/${slug}/stream`,
  },
  UPLOAD: {
    IMAGE: '/upload/image',
    PDF: '/upload/pdf',
    EPUB: '/upload/epub',
    AUDIO: '/upload/audio',
    VIDEO: '/upload/video',
  },
  SUBSCRIPTIONS: {
    BASE: '/subscriptions',
    PLANS: '/subscriptions/plans',
    CURRENT: '/subscriptions/current',
    SUBSCRIBE: '/subscriptions/subscribe',
    CANCEL: '/subscriptions/cancel',
    BILLING_HISTORY: '/subscriptions/billing-history',
    VERIFY_PAYMENT: '/subscriptions/verify-payment',
    FEATURES: '/subscriptions/features',
  }
};

// Content Types
export const CONTENT_TYPES = {
  POEM: 'poem',
  AUTHOR: 'author',
  BOOK: 'book',
  AUDIO: 'audio',
  VIDEO: 'video',
};

// ============================================
// AUDIO TYPES
// ============================================
export const AUDIO_TYPES = [
  { id: 'nauha', label: 'Nauha', icon: '😢', occasion: 'muharram', description: 'Lamentation recitations commemorating the martyrs of Karbala' },
  { id: 'marsiya', label: 'Marsiya', icon: '💔', occasion: 'muharram', description: 'Elegiac poetry mourning the martyrs' },
  { id: 'soz', label: 'Soz', icon: '🔥', occasion: 'muharram', description: 'Poems expressing grief and sorrow' },
  { id: 'salam', label: 'Salam', icon: '🕊️', occasion: 'muharram', description: 'Salutations to the Ahl al-Bayt' },
  { id: 'majlis', label: 'Majlis', icon: '🎙️', occasion: 'muharram', description: 'Religious gatherings and sermons' },
  { id: 'naat', label: 'Naat', icon: '⭐', occasion: 'general', description: 'Poems in praise of Prophet Muhammad (PBUH)' },
  { id: 'hamd', label: 'Hamd', icon: '🕌', occasion: 'general', description: 'Songs praising Allah' },
  { id: 'manqabat', label: 'Manqabat', icon: '⚔️', occasion: 'general', description: 'Poems praising Imam Ali (AS)' },
  { id: 'munajat', label: 'Munajat', icon: '🤲', occasion: 'general', description: 'Supplications and whispered prayers' },
  { id: 'ghazal', label: 'Ghazal', icon: '💕', occasion: 'general', description: 'Poetic expression of love and mysticism' },
  { id: 'nazm', label: 'Nazm', icon: '📝', occasion: 'general', description: 'Modern Urdu poems' },
  { id: 'podcast', label: 'Podcast', icon: '🎙️', occasion: 'general', description: 'Talk shows and discussions' },
  { id: 'audiobook', label: 'Audiobook', icon: '📚', occasion: 'general', description: 'Audio versions of books' },
  { id: 'mushaira', label: 'Mushaira', icon: '🎤', occasion: 'general', description: 'Poetry events and gatherings' },
  { id: 'poem_recitation', label: 'Poem Recitation', icon: '📖', occasion: 'general', description: 'Poetry recitations' },
  { id: 'lecture', label: 'Lecture', icon: '🎓', occasion: 'general', description: 'Educational lectures' },
  { id: 'interview', label: 'Interview', icon: '🎙️', occasion: 'general', description: 'Interviews with scholars and poets' },
  { id: 'other', label: 'Other', icon: '📀', occasion: 'general', description: 'Other audio content' },
];

// ============================================
// OCCASION CATEGORIES
// ============================================
export const OCCASION_CATEGORIES = [
  { id: 'muharram', label: 'Muharram', icon: '🖤', description: 'Content for the month of Muharram' },
  { id: 'ramadan', label: 'Ramadan', icon: '🌙', description: 'Content for the holy month of Ramadan' },
  { id: 'eid', label: 'Eid', icon: '🎉', description: 'Eid celebrations and special content' },
  { id: 'milad', label: 'Milad', icon: '⭐', description: 'Birth anniversary celebrations' },
  { id: 'general', label: 'General', icon: '📀', description: 'General religious content' },
];

// ============================================
// OCCASIONS - Alias for backward compatibility
// ============================================
export const OCCASIONS = OCCASION_CATEGORIES;

// ============================================
// SIMPLE OCCASIONS - Simplified version
// ============================================
export const SIMPLE_OCCASIONS = [
  { id: 'muharram', label: 'Muharram', value: 'muharram' },
  { id: 'ramadan', label: 'Ramadan', value: 'ramadan' },
  { id: 'eid', label: 'Eid', value: 'eid' },
  { id: 'milad', label: 'Milad', value: 'milad' },
  { id: 'general', label: 'General', value: 'general' },
];

// Subscription Plans
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'INR',
    period: 'month',
    description: 'Perfect for getting started',
    features: [
      'Browse all content',
      'Read public poems',
      'Basic search',
      'Limited downloads (50 poems/day)',
      '2 ebooks/month',
      '5 audio streams/month'
    ],
    limits: {
      poemsPerDay: 50,
      booksPerMonth: 2,
      audioPerMonth: 5
    },
    badge: null,
    recommended: false,
    color: 'gray'
  },
  BASIC: {
    id: 'basic',
    name: 'Basic',
    price: 99,
    currency: 'INR',
    period: 'month',
    description: 'Great for regular readers',
    features: [
      'All free features',
      'Unlimited poem reading',
      'Download 5 ebooks/month',
      'Basic audio streaming',
      'Ad-supported experience',
      'Email support'
    ],
    limits: {
      ebooksPerMonth: 5,
      audiobooksPerMonth: 3
    },
    badge: 'Popular',
    recommended: true,
    color: 'blue'
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 199,
    currency: 'INR',
    period: 'month',
    description: 'For serious literature enthusiasts',
    features: [
      'All Basic features',
      'Unlimited downloads',
      'HD audio streaming',
      'Ad-free experience',
      'AI-powered explanations',
      'Priority support',
      'Offline access'
    ],
    limits: {
      unlimited: true
    },
    badge: 'Best Value',
    recommended: true,
    color: 'amber'
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 499,
    currency: 'INR',
    period: 'month',
    description: 'For creators and power users',
    features: [
      'All Premium features',
      'Creator tools',
      'Analytics dashboard',
      'Early access to features',
      '24/7 priority support',
      'API access',
      'Content monetization',
      'Custom branding'
    ],
    limits: {
      unlimited: true,
      creator: true
    },
    badge: 'Creator',
    recommended: false,
    color: 'purple'
  }
};

// Billing Cycles
export const BILLING_CYCLES = {
  MONTHLY: 'monthly',
  QUARTERLY: 'quarterly',
  YEARLY: 'yearly'
};

// Payment Methods
export const PAYMENT_METHODS = {
  CARD: 'card',
  UPI: 'upi',
  NETBANKING: 'netbanking',
  WALLET: 'wallet',
  FREE: 'free'
};

// Subscription Status
export const SUBSCRIPTION_STATUS = {
  ACTIVE: 'active',
  CANCELLED: 'cancelled',
  EXPIRED: 'expired',
  PENDING: 'pending'
};

// Helper functions for subscriptions
export const getPlanById = (planId) => {
  return Object.values(SUBSCRIPTION_PLANS).find(plan => plan.id === planId);
};

export const getAllPlans = () => {
  return Object.values(SUBSCRIPTION_PLANS);
};

export const getRecommendedPlans = () => {
  return Object.values(SUBSCRIPTION_PLANS).filter(plan => plan.recommended);
};

export const getActivePlans = () => {
  return Object.values(SUBSCRIPTION_PLANS);
};

export const calculateDiscountedPrice = (plan, billingCycle) => {
  const basePrice = plan.price;
  if (billingCycle === BILLING_CYCLES.QUARTERLY) {
    return {
      amount: basePrice * 3,
      discount: 10,
      totalSavings: Math.round(basePrice * 3 * 0.1)
    };
  } else if (billingCycle === BILLING_CYCLES.YEARLY) {
    return {
      amount: basePrice * 12,
      discount: 20,
      totalSavings: Math.round(basePrice * 12 * 0.2)
    };
  }
  return {
    amount: basePrice,
    discount: 0,
    totalSavings: 0
  };
};

// Poetry Genres
export const POETRY_GENRES = [
  { id: 'ghazal', label: 'Ghazals', labelHi: 'ग़ज़ल', labelUr: 'غزل', icon: '🎵', description: 'Love, romance, and philosophical poetry' },
  { id: 'nazm', label: 'Nazms', labelHi: 'नज़्म', labelUr: 'نظم', icon: '📝', description: 'Narrative and descriptive poetry' },
  { id: 'sher', label: 'Sher', labelHi: 'शेर', labelUr: 'شعر', icon: '📖', description: 'Two-line couplets' },
  { id: 'rubai', label: 'Rubai', labelHi: 'रुबाई', labelUr: 'رباعی', icon: '🔢', description: 'Four-line quatrains' },
  { id: 'rekhti', label: 'Rekhti', labelHi: 'रेख़्ती', labelUr: 'ریختی', icon: '💫', description: 'Feminine perspective poetry' },
  { id: 'qasida', label: 'Qasida', labelHi: 'क़सीदा', labelUr: 'قصیدہ', icon: '🏆', description: 'Panegyric poetry' },
  { id: 'marsiya', label: 'Marsiya', labelHi: 'मर्सिया', labelUr: 'مرثیہ', icon: '💔', description: 'Elegiac poetry' },
  { id: 'other', label: 'Other', labelHi: 'अन्य', labelUr: 'دیگر', icon: '📚', description: 'Other forms of poetry' },
];

// Author Categories
export const AUTHOR_CATEGORIES = [
  { id: 'classical', label: 'Classical Poets', labelHi: 'शास्त्रीय कवि', labelUr: 'کلاسیکی شعراء', description: 'Pre-20th century poets' },
  { id: 'modern', label: 'Modern Poets', labelHi: 'आधुनिक कवि', labelUr: 'جدید شعراء', description: '20th century poets' },
  { id: 'contemporary', label: 'Contemporary Poets', labelHi: 'समकालीन कवि', labelUr: 'معاصر شعراء', description: 'Living or recent poets' },
  { id: 'female', label: 'Female Poets', labelHi: 'महिला कवि', labelUr: 'خواتین شعراء', description: 'Women poets' },
  { id: 'trending', label: 'Trending Poets', labelHi: 'ट्रेंडिंग कवि', labelUr: 'مقبول شعراء', description: 'Most popular authors' },
  { id: 'emerging', label: 'Emerging Voices', labelHi: 'उभरती आवाज़ें', labelUr: 'ابھرتی آوازیں', description: 'New and upcoming poets' },
];

// Book Categories
export const BOOK_CATEGORIES = [
  { id: 'rare', label: 'Rare Books', labelHi: 'दुर्लभ पुस्तकें', labelUr: 'نایاب کتابیں', description: 'Antique and rare manuscripts' },
  { id: 'journal', label: 'Journals', labelHi: 'जर्नल', labelUr: 'جرنل', description: 'Literary journals' },
  { id: 'magazine', label: 'Magazines', labelHi: 'पत्रिकाएं', labelUr: 'رسائل', description: 'Literary magazines' },
  { id: 'manuscript', label: 'Manuscripts', labelHi: 'हस्तलिखित', labelUr: 'مخطوطات', description: 'Handwritten manuscripts' },
  { id: 'poetry_collection', label: 'Poetry Collections', labelHi: 'काव्य संग्रह', labelUr: 'مجموعہ کلام', description: 'Collected poetry works' },
  { id: 'prose', label: 'Prose', labelHi: 'गद्य', labelUr: 'نثر', description: 'Literary prose works' },
];

// Audio Categories (Legacy - use AUDIO_TYPES instead)
export const AUDIO_CATEGORIES = AUDIO_TYPES;

// Video Categories
export const VIDEO_CATEGORIES = [
  { id: 'majlis', label: 'Majlis', icon: '🕌' },
  { id: 'nauha', label: 'Nauha', icon: '😢' },
  { id: 'mushaira', label: 'Mushaira', icon: '🎤' },
  { id: 'other', label: 'Other', icon: '🎥' },
];

// Languages
// export const LANGUAGES = [
//   { code: 'en', label: 'English', name: 'English' },
//   { code: 'hi', label: 'Hindi', name: 'हिन्दी' },
//   { code: 'ur', label: 'Urdu', name: 'اردو' },
//   { code: 'ar', label: 'Arabic', name: 'العربية' },
//   { code: 'fa', label: 'Persian', name: 'فارسی' },
// ];

// ✅ CORRECT - Codes match backend enum exactly
export const LANGUAGES = [
  { code: 'urdu', label: 'Urdu (اردو)', name: 'اردو' },
  { code: 'hindi', label: 'Hindi (हिन्दी)', name: 'हिन्दी' },
  { code: 'english', label: 'English', name: 'English' },
  { code: 'arabic', label: 'Arabic (العربية)', name: 'العربية' },
  { code: 'persian', label: 'Persian (فارسی)', name: 'فارسی' },
];

// Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  CREATOR: 'creator',
  MODERATOR: 'moderator',
  SUPERADMIN: 'superadmin'
};

// Export all as default
export default {
  API_ENDPOINTS,
  CONTENT_TYPES,
  AUDIO_TYPES,
  OCCASION_CATEGORIES,
  OCCASIONS, // Added this export
  SIMPLE_OCCASIONS,
  SUBSCRIPTION_PLANS,
  BILLING_CYCLES,
  PAYMENT_METHODS,
  SUBSCRIPTION_STATUS,
  getPlanById,
  getAllPlans,
  getRecommendedPlans,
  getActivePlans,
  calculateDiscountedPrice,
  POETRY_GENRES,
  AUTHOR_CATEGORIES,
  BOOK_CATEGORIES,
  AUDIO_CATEGORIES,
  VIDEO_CATEGORIES,
  LANGUAGES,
  USER_ROLES,
};