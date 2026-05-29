// server/seed/seed.js - Complete working version
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

// ============================================
// SEED USERS
// ============================================
const seedUsers = async () => {
  console.log('\n🌱 Seeding Users...');
  await User.deleteMany();

  const users = [
    { name: 'Admin User', email: 'admin@zauqapp.com', password: 'admin123', role: 'admin', isVerified: true, isActive: true, bio: 'Platform Administrator', avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=8B4513&color=fff', subscription: { plan: 'pro' }, preferences: { language: 'en', theme: 'dark' } },
    { name: 'Moderator User', email: 'moderator@zauqapp.com', password: 'moderator123', role: 'moderator', isVerified: true, isActive: true, bio: 'Content Moderator', avatar: 'https://ui-avatars.com/api/?name=Moderator+User&background=2E8B57&color=fff', subscription: { plan: 'premium' }, preferences: { language: 'en', theme: 'light' } },
    { name: 'Creator User', email: 'creator@zauqapp.com', password: 'creator123', role: 'creator', isVerified: true, isActive: true, bio: 'Published Author & Poet', avatar: 'https://ui-avatars.com/api/?name=Creator+User&background=4169E1&color=fff', subscription: { plan: 'premium' }, preferences: { language: 'ur', theme: 'dark' } },
    { name: 'John Doe', email: 'john@example.com', password: 'user123', role: 'user', isVerified: true, isActive: true, bio: 'Urdu poetry enthusiast', avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=DAA520&color=fff', subscription: { plan: 'basic' }, preferences: { language: 'en', theme: 'light' } },
    { name: 'Jane Smith', email: 'jane@example.com', password: 'user123', role: 'user', isVerified: true, isActive: true, bio: 'Literature lover', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=FF69B4&color=fff', subscription: { plan: 'free' }, preferences: { language: 'hi', theme: 'light' } },
    { name: 'Ali Khan', email: 'ali@example.com', password: 'user123', role: 'user', isVerified: true, isActive: true, bio: 'Premium subscriber', avatar: 'https://ui-avatars.com/api/?name=Ali+Khan&background=20B2AA&color=fff', subscription: { plan: 'premium' }, preferences: { language: 'ur', theme: 'dark' } },
    { name: 'Banned User', email: 'banned@example.com', password: 'user123', role: 'user', isVerified: true, isActive: false, isBanned: true, bio: 'Banned account', avatar: 'https://ui-avatars.com/api/?name=Banned+User&background=808080&color=fff', subscription: { plan: 'free' }, preferences: { language: 'en', theme: 'light' } },
    { name: 'Unverified User', email: 'unverified@example.com', password: 'user123', role: 'user', isVerified: false, isActive: true, bio: 'Awaiting verification', avatar: 'https://ui-avatars.com/api/?name=Unverified+User&background=FFA500&color=fff', subscription: { plan: 'free' }, preferences: { language: 'en', theme: 'light' } }
  ];

  const createdUsers = [];
  for (const userData of users) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await User.create({ ...userData, password: hashedPassword, lastLogin: new Date() });
    createdUsers.push({ name: user.name, email: user.email, password: userData.password, role: user.role, id: user._id });
  }

  console.log('✅ Users seeded successfully!');
  console.log('\n📋 LOGIN CREDENTIALS:');
  console.log('═══════════════════════════════════════════════════════════');
  createdUsers.forEach(u => console.log(`  ${u.role.toUpperCase().padEnd(12)} | ${u.email.padEnd(28)} | ${u.password}`));
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
    { name: 'Ghazals', type: 'poetry', slug: 'ghazals', order: 1 },
    { name: 'Nazms', type: 'poetry', slug: 'nazms', order: 2 },
    { name: 'Classical Poets', type: 'author', slug: 'classical-poets', order: 1 },
    { name: 'Modern Poets', type: 'author', slug: 'modern-poets', order: 2 },
    { name: 'Rare Books', type: 'book', slug: 'rare-books', order: 1 },
    { name: 'Audiobooks', type: 'audio', slug: 'audiobooks', order: 1 },
    { name: 'Mushaira', type: 'audio', slug: 'mushaira', order: 2 },
    { name: 'Documentaries', type: 'video', slug: 'documentaries', order: 1 }
  ]);

  console.log(`✅ ${categories.length} Categories seeded`);
  return categories;
};

// ============================================
// SEED AUTHORS
// ============================================
const seedAuthors = async () => {
  console.log('🌱 Seeding Authors...');
  await Author.deleteMany();

  const authorsData = [
    { name: 'Mirza Ghalib', nameUrdu: 'مرزا غالب', bio: 'Preeminent Urdu and Persian poet of the Mughal era.', birthDate: new Date('1797-12-27'), deathDate: new Date('1869-02-15'), era: 'classical', category: 'classical', genres: ['ghazal'], languages: ['urdu'], isVerified: true, isFeatured: true, avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Mirza_Ghalib.jpg/440px-Mirza_Ghalib.jpg' },
    { name: 'Allama Iqbal', nameUrdu: 'علامہ اقبال', bio: 'Poet, philosopher, and politician who inspired the Pakistan Movement.', birthDate: new Date('1877-11-09'), deathDate: new Date('1938-04-21'), era: 'modern', category: 'modern', genres: ['nazm', 'ghazal'], languages: ['urdu', 'persian'], isVerified: true, isFeatured: true, avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Allama_Iqbal.jpg/440px-Allama_Iqbal.jpg' },
    { name: 'Faiz Ahmed Faiz', nameUrdu: 'فیض احمد فیض', bio: 'Pakistani Marxist poet and author.', birthDate: new Date('1911-02-13'), deathDate: new Date('1984-11-20'), era: 'modern', category: 'modern', genres: ['nazm', 'ghazal'], languages: ['urdu'], isVerified: true, isFeatured: true, avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Faiz_Ahmed_Faiz.jpg/440px-Faiz_Ahmed_Faiz.jpg' },
    { name: 'Mir Taqi Mir', nameUrdu: 'میر تقی میر', bio: 'Urdu poet of the 18th century, known as the "God of Poetry".', birthDate: new Date('1723-02-01'), deathDate: new Date('1810-09-21'), era: 'classical', category: 'classical', genres: ['ghazal', 'sher'], languages: ['urdu'], isVerified: true, isFeatured: true, avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Mir_Taqi_Mir.jpg/440px-Mir_Taqi_Mir.jpg' },
    { name: 'Parveen Shakir', nameUrdu: 'پروین شاکر', bio: 'Prominent female Urdu poet of the 20th century.', birthDate: new Date('1952-11-24'), deathDate: new Date('1994-12-26'), era: 'contemporary', category: 'female', genres: ['ghazal', 'nazm'], languages: ['urdu'], isVerified: true, isFeatured: true, avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8a/Parveen_Shakir.jpg/440px-Parveen_Shakir.jpg' },
    { name: 'Jaun Elia', nameUrdu: 'جون ایلیا', bio: 'Pakistani poet, philosopher, and scholar.', birthDate: new Date('1931-12-14'), deathDate: new Date('2002-11-08'), era: 'contemporary', category: 'modern', genres: ['ghazal', 'sher'], languages: ['urdu'], isVerified: true, isFeatured: true, avatar: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/2a/Jaun_Elia.jpg/440px-Jaun_Elia.jpg' }
  ];

  const authors = [];
  for (const authorData of authorsData) {
    const author = await Author.create(authorData);
    authors.push(author);
    console.log(`  ✓ Created: ${author.name}`);
  }

  console.log(`✅ ${authors.length} Authors seeded`);
  return authors;
};

// ============================================
// SEED POEMS - FIXED VERSION
// ============================================
const seedPoems = async (authors) => {
  console.log('🌱 Seeding Poems...');
  
  // CRITICAL FIX: Drop the collection to remove any problematic indexes
  try {
    await Poem.collection.drop();
    console.log('  ✓ Dropped existing poems collection');
  } catch (error) {
    console.log('  ℹ No existing poems collection to drop');
  }

  const ghalib = authors.find(a => a.name === 'Mirza Ghalib');
  const iqbal = authors.find(a => a.name === 'Allama Iqbal');
  const faiz = authors.find(a => a.name === 'Faiz Ahmed Faiz');
  const mir = authors.find(a => a.name === 'Mir Taqi Mir');
  const parveen = authors.find(a => a.name === 'Parveen Shakir');
  const jaun = authors.find(a => a.name === 'Jaun Elia');

  const poemsData = [
    { title: 'Dil-e-Nadaan', content: 'Dil-e-nadaan tujhe hua kya hai\nAakhir is dard ki dawa kya hai', contentUrdu: 'دلِ ناداں تجھے ہوا کیا ہے\nآخر اس درد کی دوا کیا ہے', translation: { english: 'O naive heart' }, author: ghalib._id, genre: 'ghazal', language: 'urdu', isPublished: true, isFeatured: true, stats: { views: 15420, likes: 892 } },
    { title: 'Lab Pe Aati Hai Dua', content: 'Lab pe aati hai dua ban ke tamanna meri\nZindagi shamma ki surat ho khudaya meri', contentUrdu: 'لب پہ آتی ہے دعا بن کے تمنا میری\nزندگی شمع کی صورت ہو خدایا میری', translation: { english: 'The prayer comes to my lips' }, author: iqbal._id, genre: 'nazm', language: 'urdu', isPublished: true, isFeatured: true, stats: { views: 32100, likes: 2100 } },
    { title: 'Hum Dekhenge', content: 'Hum dekhenge\nLazim hai ke hum bhi dekhenge', contentUrdu: 'ہم دیکھیں گے\nلازم ہے کہ ہم بھی دیکھیں گے', translation: { english: 'We shall see' }, author: faiz._id, genre: 'nazm', language: 'urdu', isPublished: true, isFeatured: true, stats: { views: 45600, likes: 3400 } },
    { title: 'Patta Patta Boota Boota', content: 'Patta patta boota boota haal hamara jaane hai', contentUrdu: 'پتا پتا بوٹا بوٹا حال ہمارا جانے ہے', translation: { english: 'Every leaf knows' }, author: mir._id, genre: 'ghazal', language: 'urdu', isPublished: true, stats: { views: 12300, likes: 678 } },
    { title: 'Khushbu', content: 'Khushbu ki tarah badan mein phailti jati hai', contentUrdu: 'خوشبو کی طرح بدن میں پھیلتی جاتی ہے', translation: { english: 'Like fragrance' }, author: parveen._id, genre: 'nazm', language: 'urdu', isPublished: true, stats: { views: 8900, likes: 567 } },
    { title: 'Main Bhi Bohat Ajeeb Hun', content: 'Main bhi bohat ajeeb hun, itna bhi mujhe kya hai', contentUrdu: 'میں بھی بہت عجیب ہوں، اتنا بھی مجھے کیا ہے', translation: { english: 'I am very strange' }, author: jaun._id, genre: 'ghazal', language: 'urdu', isPublished: true, stats: { views: 15600, likes: 1200 } }
  ];

  const poems = [];
  for (const poemData of poemsData) {
    const poem = await Poem.create(poemData);
    poems.push(poem);
    console.log(`  ✓ Created: ${poem.title}`);
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

  const books = await Book.insertMany([
    { title: 'Diwan-e-Ghalib', description: 'Collection of Ghalib finest ghazals.', author: ghalib._id, type: 'rare', language: 'urdu', publishYear: 1867, totalPages: 450, isFree: true, isPublished: true, isFeatured: true, coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600', stats: { views: 8900, downloads: 2340 } },
    { title: 'Bang-e-Dara', description: 'Allama Iqbal poetry collection.', author: iqbal._id, type: 'ebook', language: 'urdu', publishYear: 1924, totalPages: 320, isFree: true, isPublished: true, isFeatured: true, coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600', stats: { views: 12300, downloads: 3450 } }
  ]);

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

  const audio = await Audio.insertMany([
    { title: 'Ghalib - Dil-e-Nadaan', description: 'Recitation of Ghalib classic', type: 'poem_recitation', audioUrl: 'https://example.com/audio/ghalib.mp3', duration: 240, author: ghalib._id, language: 'urdu', isPublished: true, isFeatured: true, stats: { views: 12300, plays: 8900 } },
    { title: 'Faiz - Hum Dekhenge', description: 'Recitation of Faiz revolutionary nazm', type: 'poem_recitation', audioUrl: 'https://example.com/audio/faiz.mp3', duration: 180, author: faiz._id, language: 'urdu', isPublished: true, isFeatured: true, stats: { views: 23400, plays: 18900 } }
  ]);

  console.log(`✅ ${audio.length} Audio items seeded`);
  return audio;
};

// ============================================
// SEED VIDEOS
// ============================================
const seedVideos = async () => {
  console.log('🌱 Seeding Videos...');
  await Video.deleteMany();

  const videos = await Video.insertMany([
    { title: 'Jashn-e-Rekhta Highlights', description: 'Urdu literary festival coverage', type: 'mushaira', videoUrl: 'https://example.com/video/jashn.mp4', duration: 10800, language: 'urdu', isPublished: true, isFeatured: true, stats: { views: 45600, likes: 5600 } }
  ]);

  console.log(`✅ ${videos.length} Videos seeded`);
  return videos;
};

// ============================================
// SEED HOMEPAGE CONFIG
// ============================================
const seedHomepageConfig = async () => {
  console.log('🌱 Seeding Homepage Config...');
  await HomepageConfig.deleteMany();

  await HomepageConfig.insertMany([
    { section: 'hero', title: 'Featured', order: 1, isActive: true, banners: [{ image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200', title: 'Discover Urdu Poetry', ctaText: 'Explore', ctaUrl: '/explore', order: 1, isActive: true }] },
    { section: 'trending', title: 'Trending', order: 2, isActive: true },
    { section: 'featured-authors', title: 'Featured Authors', order: 3, isActive: true }
  ]);

  console.log('✅ Homepage Config seeded');
};

// ============================================
// SEED SEO
// ============================================
const seedSEO = async () => {
  console.log('🌱 Seeding SEO...');
  await SEO.deleteMany();

  await SEO.insertMany([
    { page: 'home', route: '/', metaTitle: 'ZauqApp - Urdu Literary Ecosystem', metaDescription: 'Discover Urdu poetry and literature', metaKeywords: ['urdu poetry', 'ghazal'], canonicalUrl: 'https://zauqapp.com', isActive: true }
  ]);

  console.log('✅ SEO seeded');
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
      { recipient: john.id, type: 'system', title: 'Welcome to ZauqApp!', message: 'Thank you for joining!', isRead: false, isSent: true, sentAt: new Date() },
      { recipient: admin.id, type: 'system', title: 'New User Registration', message: 'A new user has registered.', isRead: true, isSent: true, sentAt: new Date() }
    ]);
    console.log('✅ Notifications seeded');
  }
};

// ============================================
// MAIN
// ============================================
const seedAll = async () => {
  try {
    console.log('\n🚀 Starting ZauqApp Database Seeding...\n');
    await connectDB();

    const users = await seedUsers();
    await seedCategories();
    const authors = await seedAuthors();
    const poems = await seedPoems(authors);
    const books = await seedBooks(authors);
    await seedAudio(authors);
    await seedVideos();
    await seedHomepageConfig();
    await seedSEO();
    await seedNotifications(users);

    console.log('\n✅ SEEDING COMPLETED SUCCESSFULLY!\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedAll();