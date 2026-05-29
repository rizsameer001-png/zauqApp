// server/seed/seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import slugify from 'slugify';
import User from '../models/User.js';
import Author from '../models/Author.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Audio from '../models/Audio.js';
import Video from '../models/Video.js';
import Category from '../models/Category.js';
import HomepageConfig from '../models/HomepageConfig.js';
import SEO from '../models/SEO.js';
import Notification from '../models/Notification.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp');
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    process.exit(1);
  }
};

// Helper function to generate unique slug
const generateSlug = (name) => {
  return slugify(name, { lower: true, strict: true }) + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).substr(2, 5);
};

// ============================================
// SEED USERS
// ============================================
const seedUsers = async () => {
  console.log('\n🌱 Seeding Users...');

  await User.deleteMany();

  const users = [
    {
      name: 'Admin User',
      email: 'admin@zauqapp.com',
      password: 'admin123',
      role: 'admin',
      isVerified: true,
      isActive: true,
      bio: 'Platform Administrator',
      avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=8B4513&color=fff',
      subscription: { plan: 'pro', startedAt: new Date(), expiresAt: new Date('2027-12-31') },
      preferences: { language: 'en', theme: 'dark', notifications: true }
    },
    {
      name: 'Moderator User',
      email: 'moderator@zauqapp.com',
      password: 'moderator123',
      role: 'moderator',
      isVerified: true,
      isActive: true,
      bio: 'Content Moderator',
      avatar: 'https://ui-avatars.com/api/?name=Moderator+User&background=2E8B57&color=fff',
      subscription: { plan: 'premium', startedAt: new Date(), expiresAt: new Date('2027-12-31') },
      preferences: { language: 'en', theme: 'light', notifications: true }
    },
    {
      name: 'Creator User',
      email: 'creator@zauqapp.com',
      password: 'creator123',
      role: 'creator',
      isVerified: true,
      isActive: true,
      bio: 'Published Author & Poet',
      avatar: 'https://ui-avatars.com/api/?name=Creator+User&background=4169E1&color=fff',
      subscription: { plan: 'premium', startedAt: new Date(), expiresAt: new Date('2027-12-31') },
      preferences: { language: 'ur', theme: 'dark', notifications: true }
    },
    {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'user123',
      role: 'user',
      isVerified: true,
      isActive: true,
      bio: 'Urdu poetry enthusiast',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=DAA520&color=fff',
      subscription: { plan: 'basic', startedAt: new Date(), expiresAt: new Date('2027-06-30') },
      preferences: { language: 'en', theme: 'light', notifications: true }
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'user123',
      role: 'user',
      isVerified: true,
      isActive: true,
      bio: 'Literature lover from Delhi',
      avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=FF69B4&color=fff',
      subscription: { plan: 'free', startedAt: new Date(), expiresAt: new Date('2027-03-31') },
      preferences: { language: 'hi', theme: 'light', notifications: false }
    },
    {
      name: 'Ali Khan',
      email: 'ali@example.com',
      password: 'user123',
      role: 'user',
      isVerified: true,
      isActive: true,
      bio: 'Premium subscriber - Love ghazals',
      avatar: 'https://ui-avatars.com/api/?name=Ali+Khan&background=20B2AA&color=fff',
      subscription: { plan: 'premium', startedAt: new Date(), expiresAt: new Date('2027-12-31') },
      preferences: { language: 'ur', theme: 'dark', notifications: true }
    },
    {
      name: 'Banned User',
      email: 'banned@example.com',
      password: 'user123',
      role: 'user',
      isVerified: true,
      isActive: false,
      isBanned: true,
      bio: 'This account has been banned',
      avatar: 'https://ui-avatars.com/api/?name=Banned+User&background=808080&color=fff',
      subscription: { plan: 'free', startedAt: new Date(), expiresAt: new Date('2026-06-30') },
      preferences: { language: 'en', theme: 'light', notifications: false }
    },
    {
      name: 'Unverified User',
      email: 'unverified@example.com',
      password: 'user123',
      role: 'user',
      isVerified: false,
      isActive: true,
      bio: 'Waiting for email verification',
      avatar: 'https://ui-avatars.com/api/?name=Unverified+User&background=FFA500&color=fff',
      subscription: { plan: 'free', startedAt: new Date(), expiresAt: new Date('2026-12-31') },
      preferences: { language: 'en', theme: 'light', notifications: true }
    }
  ];

  const createdUsers = [];
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await User.create({
      ...userData,
      password: hashedPassword,
      lastLogin: new Date()
    });
    createdUsers.push({
      name: user.name,
      email: user.email,
      password: userData.password,
      role: user.role,
      id: user._id
    });
  }

  console.log('✅ Users seeded successfully!');
  console.log('\n📋 LOGIN CREDENTIALS:');
  console.log('═══════════════════════════════════════════════════════════');
  createdUsers.forEach(u => {
    console.log(`  ${u.role.toUpperCase().padEnd(12)} | ${u.email.padEnd(28)} | ${u.password}`);
  });
  console.log('═══════════════════════════════════════════════════════════\n');

  return createdUsers;
};

// ============================================
// SEED CATEGORIES
// ============================================
const seedCategories = async () => {
  console.log('🌱 Seeding Categories...');
  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Ghazals', nameUrdu: 'غزلیں', nameHindi: 'ग़ज़लें', type: 'poetry', slug: 'ghazals', order: 1 },
    { name: 'Nazms', nameUrdu: 'نظمیں', nameHindi: 'नज़्में', type: 'poetry', slug: 'nazms', order: 2 },
    { name: 'Sher', nameUrdu: 'شعر', nameHindi: 'शेर', type: 'poetry', slug: 'sher', order: 3 },
    { name: 'Classical Poets', nameUrdu: 'کلاسیکی شاعر', nameHindi: 'शास्त्रीय कवि', type: 'author', slug: 'classical-poets', order: 1 },
    { name: 'Modern Poets', nameUrdu: 'جدید شاعر', nameHindi: 'आधुनिक कवि', type: 'author', slug: 'modern-poets', order: 2 },
    { name: 'Female Poets', nameUrdu: 'خواتین شاعر', nameHindi: 'महिला कवयित्री', type: 'author', slug: 'female-poets', order: 3 },
    { name: 'Rare Books', nameUrdu: 'نایاب کتابیں', nameHindi: 'दुर्लभ पुस्तकें', type: 'book', slug: 'rare-books', order: 1 },
    { name: 'Audiobooks', nameUrdu: 'آڈیو کتابیں', nameHindi: 'ऑडियोबुक', type: 'audio', slug: 'audiobooks', order: 1 },
    { name: 'Mushaira', nameUrdu: 'مشاعرہ', nameHindi: 'मुशायरा', type: 'audio', slug: 'mushaira', order: 2 },
    { name: 'Documentaries', nameUrdu: 'دستاویزی فلمیں', nameHindi: 'दस्तावेज़ी फिल्में', type: 'video', slug: 'documentaries', order: 1 }
  ]);

  console.log(`✅ ${categories.length} Categories seeded`);
  return categories;
};

// ============================================
// SEED AUTHORS (Creating one by one to ensure slugs are generated)
// ============================================
const seedAuthors = async () => {
  console.log('🌱 Seeding Authors...');
  await Author.deleteMany();

  const authorsData = [
    {
      name: 'Mirza Ghalib',
      nameUrdu: 'مرزا غالب',
      nameHindi: 'मिर्ज़ा ग़ालिब',
      bio: 'Mirza Asadullah Khan Ghalib (1797-1869) was the preeminent Urdu and Persian poet of the Mughal era.',
      bioUrdu: 'مرزا اسداللہ خان غالب (1797-1869) مغل دور کے ممتاز اردو اور فارسی شاعر تھے۔',
      birthDate: new Date('1797-12-27'),
      deathDate: new Date('1869-02-15'),
      birthPlace: 'Agra, Mughal India',
      era: 'classical',
      category: 'classical',
      genres: ['ghazal', 'sher'],
      languages: ['urdu', 'persian'],
      isVerified: true,
      isFeatured: true,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mirza_Ghalib.jpg/440px-Mirza_Ghalib.jpg',
      stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
    },
    {
      name: 'Allama Iqbal',
      nameUrdu: 'علامہ اقبال',
      nameHindi: 'अल्लामा इक़बाल',
      bio: 'Sir Muhammad Iqbal (1877-1938), known as Allama Iqbal, was a poet, philosopher, and politician.',
      bioUrdu: 'سر محمد اقبال (1877-1938) ایک شاعر، فلسفی اور سیاست دان تھے۔',
      birthDate: new Date('1877-11-09'),
      deathDate: new Date('1938-04-21'),
      birthPlace: 'Sialkot, Punjab',
      era: 'modern',
      category: 'modern',
      genres: ['nazm', 'ghazal'],
      languages: ['urdu', 'persian'],
      isVerified: true,
      isFeatured: true,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Allama_Iqbal.jpg/440px-Allama_Iqbal.jpg',
      stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
    },
    {
      name: 'Faiz Ahmed Faiz',
      nameUrdu: 'فیض احمد فیض',
      nameHindi: 'फ़ैज़ अहमद फ़ैज़',
      bio: 'Faiz Ahmed Faiz (1911-1984) was a Pakistani Marxist poet and author.',
      bioUrdu: 'فیض احمد فیض (1911-1984) ایک پاکستانی مارکسیسٹ شاعر تھے۔',
      birthDate: new Date('1911-02-13'),
      deathDate: new Date('1984-11-20'),
      birthPlace: 'Kala Qader, Punjab',
      era: 'modern',
      category: 'modern',
      genres: ['nazm', 'ghazal'],
      languages: ['urdu', 'punjabi'],
      isVerified: true,
      isFeatured: true,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Faiz_Ahmed_Faiz.jpg/440px-Faiz_Ahmed_Faiz.jpg',
      stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
    },
    {
      name: 'Mir Taqi Mir',
      nameUrdu: 'میر تقی میر',
      nameHindi: 'मीर तक़ी मीर',
      bio: 'Mir Taqi Mir (1723-1810) was an Urdu poet of the 18th century.',
      bioUrdu: 'میر تقی میر (1723-1810) 18ویں صدی کے ایک اردو شاعر تھے۔',
      birthDate: new Date('1723-02-01'),
      deathDate: new Date('1810-09-21'),
      birthPlace: 'Agra, Mughal India',
      era: 'classical',
      category: 'classical',
      genres: ['ghazal', 'sher'],
      languages: ['urdu'],
      isVerified: true,
      isFeatured: true,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mir_Taqi_Mir.jpg/440px-Mir_Taqi_Mir.jpg',
      stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
    },
    {
      name: 'Parveen Shakir',
      nameUrdu: 'پروین شاکر',
      nameHindi: 'परवीन शाकिर',
      bio: 'Parveen Shakir (1952-1994) was a Pakistani poet, teacher, and civil servant.',
      bioUrdu: 'پروین شاکر (1952-1994) ایک پاکستانی شاعرہ، استاد اور سرکاری ملازمہ تھیں۔',
      birthDate: new Date('1952-11-24'),
      deathDate: new Date('1994-12-26'),
      birthPlace: 'Karachi, Pakistan',
      era: 'contemporary',
      category: 'female',
      genres: ['ghazal', 'nazm'],
      languages: ['urdu'],
      isVerified: true,
      isFeatured: true,
      avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Parveen_Shakir.jpg/440px-Parveen_Shakir.jpg',
      stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
    },
    {
      name: 'Jaun Elia',
      nameUrdu: 'جون ایلیا',
      nameHindi: 'जौन एलिया',
      bio: 'Jaun Elia (1931-2002) was a Pakistani poet, philosopher, and scholar.',
      bioUrdu: 'جون ایلیا (1931-2002) ایک پاکستانی شاعر، فلسفی اور محقق تھے۔',
      birthDate: new Date('1931-12-14'),
      deathDate: new Date('2002-11-08'),
      birthPlace: 'Amroha, India',
      era: 'contemporary',
      category: 'modern',
      genres: ['ghazal', 'sher'],
      languages: ['urdu'],
      isVerified: true,
      isFeatured: true,
      avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Jaun_Elia.jpg/440px-Jaun_Elia.jpg',
      stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
    }
  ];

  // Create authors one by one so pre-save hook generates slug
  const authors = [];
  for (const authorData of authorsData) {
    const author = await Author.create(authorData);
    authors.push(author);
    console.log(`  ✓ Created: ${author.name} (${author.slug})`);
  }

  console.log(`✅ ${authors.length} Authors seeded`);
  return authors;
};

// ============================================
// SEED POEMS
// ============================================
const seedPoems = async (authors) => {
  console.log('🌱 Seeding Poems...');
  await Poem.deleteMany();

  const ghalib = authors.find(a => a.name === 'Mirza Ghalib');
  const iqbal = authors.find(a => a.name === 'Allama Iqbal');
  const faiz = authors.find(a => a.name === 'Faiz Ahmed Faiz');
  const mir = authors.find(a => a.name === 'Mir Taqi Mir');
  const parveen = authors.find(a => a.name === 'Parveen Shakir');
  const jaun = authors.find(a => a.name === 'Jaun Elia');

  const poemsData = [
    {
      title: 'Dil-e-Nadaan',
      content: 'Dil-e-nadaan tujhe hua kya hai\nAakhir is dard ki dawa kya hai',
      contentUrdu: 'دلِ ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے',
      translation: { english: 'O naive heart, what has happened to you?' },
      author: ghalib._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'classical',
      tags: ['love', 'pain'],
      mood: 'sad',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      stats: { views: 15420, likes: 892 }
    },
    {
      title: 'Lab Pe Aati Hai Dua',
      content: 'Lab pe aati hai dua ban ke tamanna meri\nZindagi shamma ki surat ho khudaya meri',
      contentUrdu: 'لب پہ آتی ہے دعا بن کے تمنا میری\nزندگی شمع کی صورت ہو خدایا میری',
      translation: { english: 'The prayer comes to my lips as my desire' },
      author: iqbal._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'modern',
      tags: ['prayer', 'hope'],
      mood: 'spiritual',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      stats: { views: 32100, likes: 2100 }
    },
    {
      title: 'Hum Dekhenge',
      content: 'Hum dekhenge\nLazim hai ke hum bhi dekhenge',
      contentUrdu: 'ہم دیکھیں گے\nلازم ہے کہ ہم بھی دیکھیں گے',
      translation: { english: 'We shall see' },
      author: faiz._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'modern',
      tags: ['revolution', 'hope'],
      mood: 'patriotic',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      stats: { views: 45600, likes: 3400 }
    },
    {
      title: 'Patta Patta Boota Boota',
      content: 'Patta patta boota boota haal hamara jaane hai',
      contentUrdu: 'پتا پتا بوٹا بوٹا حال ہمارا جانے ہے',
      author: mir._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'classical',
      tags: ['love', 'nature'],
      mood: 'romantic',
      isPublished: true,
      publishedAt: new Date(),
      stats: { views: 12300, likes: 678 }
    },
    {
      title: 'Khushbu',
      content: 'Khushbu ki tarah badan mein phailti jati hai',
      contentUrdu: 'خوشبو کی طرح بدن میں پھیلتی جاتی ہے',
      author: parveen._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'contemporary',
      tags: ['poetry', 'identity'],
      mood: 'philosophical',
      isPublished: true,
      publishedAt: new Date(),
      stats: { views: 8900, likes: 567 }
    },
    {
      title: 'Main Bhi Bohat Ajeeb Hun',
      content: 'Main bhi bohat ajeeb hun, itna bhi mujhe kya hai',
      contentUrdu: 'میں بھی بہت عجیب ہوں، اتنا بھی مجھے کیا ہے',
      author: jaun._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'contemporary',
      tags: ['love', 'philosophy'],
      mood: 'philosophical',
      isPublished: true,
      publishedAt: new Date(),
      stats: { views: 15600, likes: 1200 }
    }
  ];

  const poems = [];
  for (const poemData of poemsData) {
    const poem = await Poem.create(poemData);
    poems.push(poem);
  }

  console.log(`✅ ${poems.length} Poems seeded`);
  return poems;
};

// ============================================
// SEED BOOKS
// ============================================
const seedBooks = async (authors) => {
  console.log('🌱 Seeding Books...');
  await Book.deleteMany();

  const ghalib = authors.find(a => a.name === 'Mirza Ghalib');
  const iqbal = authors.find(a => a.name === 'Allama Iqbal');

  const booksData = [
    {
      title: 'Diwan-e-Ghalib',
      description: 'A comprehensive collection of Mirza Ghalib finest ghazals.',
      author: ghalib._id,
      type: 'rare',
      language: 'urdu',
      publisher: 'Ghalib Academy',
      publishYear: 1867,
      totalPages: 450,
      isFree: true,
      isPublished: true,
      isFeatured: true,
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
      stats: { views: 8900, downloads: 2340 }
    },
    {
      title: 'Bang-e-Dara',
      description: 'The Call of the Marching Bell - Allama Iqbal poetry collection.',
      author: iqbal._id,
      type: 'ebook',
      language: 'urdu',
      publisher: 'Iqbal Academy',
      publishYear: 1924,
      totalPages: 320,
      isFree: true,
      isPublished: true,
      isFeatured: true,
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
      stats: { views: 12300, downloads: 3450 }
    }
  ];

  const books = await Book.insertMany(booksData);
  console.log(`✅ ${books.length} Books seeded`);
  return books;
};

// ============================================
// SEED AUDIO
// ============================================
const seedAudio = async (authors) => {
  console.log('🌱 Seeding Audio...');
  await Audio.deleteMany();

  const ghalib = authors.find(a => a.name === 'Mirza Ghalib');
  const faiz = authors.find(a => a.name === 'Faiz Ahmed Faiz');

  const audioData = [
    {
      title: 'Ghalib Ke Ghazal - Dil-e-Nadaan',
      description: 'Beautiful recitation of Ghalib classic ghazal',
      type: 'poem_recitation',
      audioUrl: 'https://example.com/audio/ghalib-dil-e-nadaan.mp3',
      duration: 240,
      author: ghalib._id,
      language: 'urdu',
      tags: ['ghazal', 'recitation'],
      isPublished: true,
      isFeatured: true,
      stats: { views: 12300, plays: 8900 }
    },
    {
      title: 'Faiz Ahmed Faiz - Hum Dekhenge',
      description: 'Iconic recitation of Faiz revolutionary nazm',
      type: 'poem_recitation',
      audioUrl: 'https://example.com/audio/faiz-hum-dekhenge.mp3',
      duration: 180,
      author: faiz._id,
      language: 'urdu',
      tags: ['nazm', 'revolution'],
      isPublished: true,
      isFeatured: true,
      stats: { views: 23400, plays: 18900 }
    }
  ];

  const audio = await Audio.insertMany(audioData);
  console.log(`✅ ${audio.length} Audio items seeded`);
  return audio;
};

// ============================================
// SEED VIDEOS
// ============================================
const seedVideos = async () => {
  console.log('🌱 Seeding Videos...');
  await Video.deleteMany();

  const videosData = [
    {
      title: 'Jashn-e-Rekhta 2024 Highlights',
      description: 'Complete video coverage of the biggest Urdu literary festival',
      type: 'mushaira',
      videoUrl: 'https://example.com/video/jashn-rekhta-2024.mp4',
      duration: 10800,
      language: 'urdu',
      tags: ['mushaira', 'festival'],
      isPublished: true,
      isFeatured: true,
      stats: { views: 45600, likes: 5600 }
    }
  ];

  const videos = await Video.insertMany(videosData);
  console.log(`✅ ${videos.length} Videos seeded`);
  return videos;
};

// ============================================
// SEED HOMEPAGE CONFIG
// ============================================
const seedHomepageConfig = async () => {
  console.log('🌱 Seeding Homepage Config...');
  await HomepageConfig.deleteMany();

  const configs = await HomepageConfig.insertMany([
    {
      section: 'hero',
      title: 'Featured',
      order: 1,
      isActive: true,
      banners: [{
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200',
        title: 'Discover Urdu Poetry',
        subtitle: 'Explore thousands of ghazals, nazms, and sher',
        ctaText: 'Explore Now',
        ctaUrl: '/explore',
        order: 1,
        isActive: true
      }]
    },
    {
      section: 'trending',
      title: 'Trending',
      order: 2,
      isActive: true
    },
    {
      section: 'featured-authors',
      title: 'Featured Authors',
      order: 3,
      isActive: true
    }
  ]);

  console.log(`✅ ${configs.length} Homepage sections seeded`);
  return configs;
};

// ============================================
// SEED SEO
// ============================================
const seedSEO = async () => {
  console.log('🌱 Seeding SEO...');
  await SEO.deleteMany();

  const seoEntries = await SEO.insertMany([
    {
      page: 'home',
      route: '/',
      metaTitle: 'ZauqApp - AI Powered Urdu Literary Ecosystem',
      metaDescription: 'Discover Urdu poetry, Hindi literature, and more.',
      metaKeywords: ['urdu poetry', 'hindi literature', 'ghazal'],
      ogTitle: 'ZauqApp',
      canonicalUrl: 'https://zauqapp.com',
      isActive: true
    }
  ]);

  console.log(`✅ ${seoEntries.length} SEO entries seeded`);
  return seoEntries;
};

// ============================================
// SEED NOTIFICATIONS
// ============================================
const seedNotifications = async (users) => {
  console.log('🌱 Seeding Notifications...');
  await Notification.deleteMany();

  const admin = users.find(u => u.role === 'admin');
  const john = users.find(u => u.email === 'john@example.com');

  if (admin && john) {
    await Notification.insertMany([
      {
        recipient: john.id,
        type: 'system',
        title: 'Welcome to ZauqApp!',
        message: 'Thank you for joining our literary community.',
        isRead: false,
        isSent: true,
        sentAt: new Date()
      },
      {
        recipient: admin.id,
        type: 'system',
        title: 'New User Registration',
        message: 'A new user has registered on the platform.',
        isRead: true,
        isSent: true,
        sentAt: new Date()
      }
    ]);
    console.log('✅ Notifications seeded');
  } else {
    console.log('⚠️ Notifications skipped');
  }
};

// ============================================
// UPDATE AUTHOR STATS
// ============================================
const updateAuthorStats = async (authors, poems, books) => {
  console.log('🌱 Updating Author Stats...');

  for (const author of authors) {
    const poemCount = poems.filter(p => p.author.toString() === author._id.toString()).length;
    const bookCount = books.filter(b => b.author.toString() === author._id.toString()).length;

    await Author.findByIdAndUpdate(author._id, {
      'stats.poemsCount': poemCount,
      'stats.booksCount': bookCount
    });
  }

  console.log('✅ Author stats updated');
};

// ============================================
// MAIN SEED FUNCTION
// ============================================
const seedAll = async () => {
  try {
    console.log('\n🚀 Starting ZauqApp Database Seeding...\n');
    console.log('═══════════════════════════════════════════════════════════');

    await connectDB();

    const users = await seedUsers();
    const categories = await seedCategories();
    const authors = await seedAuthors();
    const poems = await seedPoems(authors);
    const books = await seedBooks(authors);
    const audio = await seedAudio(authors);
    const videos = await seedVideos();
    const homepageConfig = await seedHomepageConfig();
    const seo = await seedSEO();
    await seedNotifications(users);
    await updateAuthorStats(authors, poems, books);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('✅ SEEDING COMPLETED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`\n📊 Summary:`);
    console.log(`   • Users: ${users.length}`);
    console.log(`   • Categories: ${categories.length}`);
    console.log(`   • Authors: ${authors.length}`);
    console.log(`   • Poems: ${poems.length}`);
    console.log(`   • Books: ${books.length}`);
    console.log(`   • Audio: ${audio.length}`);
    console.log(`   • Videos: ${videos.length}`);

    console.log('\n🔑 LOGIN CREDENTIALS:');
    console.log('═══════════════════════════════════════════════════════════');
    users.forEach(u => {
      console.log(`  ${u.role.toUpperCase().padEnd(12)} | ${u.email.padEnd(28)} | ${u.password}`);
    });
    console.log('═══════════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run
seedAll();