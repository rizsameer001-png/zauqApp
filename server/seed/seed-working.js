//server/seed/seed.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
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
// SEED USERS - ALL ROLES WITH LOGIN CREDENTIALS
// ============================================
const seedUsers = async () => {
  console.log('\n🌱 Seeding Users...');

  await User.deleteMany();

  const users = [
    // 🔴 ADMIN USER
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
    // 🟢 MODERATOR USER
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
    // 🔵 CREATOR USER
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
    // 🟡 REGULAR USER 1
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
    // 🟡 REGULAR USER 2
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
    // 🟡 REGULAR USER 3 (Premium)
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
    // ⚫ BANNED USER (for testing)
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
    // 🟠 UNVERIFIED USER
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
      password: userData.password, // plain password for reference
      role: user.role,
      id: user._id
    });
  }

  console.log('✅ Users seeded successfully!');
  console.log('\n📋 LOGIN CREDENTIALS:');
  console.log('═══════════════════════════════════════════════════════════');
  createdUsers.forEach(u => {
    const status = u.role === 'user' && u.name === 'Banned User' ? ' [BANNED]' : 
                   u.role === 'user' && u.name === 'Unverified User' ? ' [UNVERIFIED]' : '';
    console.log(`  ${u.role.toUpperCase().padEnd(12)} | ${u.email.padEnd(28)} | ${u.password}${status}`);
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
    // Poetry Categories
    { name: 'Ghazals', nameUrdu: 'غزلیں', nameHindi: 'ग़ज़लें', type: 'poetry', slug: 'ghazals', order: 1, description: 'Classic Urdu ghazals' },
    { name: 'Nazms', nameUrdu: 'نظمیں', nameHindi: 'नज़्में', type: 'poetry', slug: 'nazms', order: 2, description: 'Urdu nazms and poems' },
    { name: 'Sher', nameUrdu: 'شعر', nameHindi: 'शेर', type: 'poetry', slug: 'sher', order: 3, description: 'Two-line couplets' },
    { name: 'Rubai', nameUrdu: 'رباعی', nameHindi: 'रुबाई', type: 'poetry', slug: 'rubai', order: 4, description: 'Four-line quatrains' },
    { name: 'Marsiya', nameUrdu: 'مرثیہ', nameHindi: 'मर्सिया', type: 'poetry', slug: 'marsiya', order: 5, description: 'Elegiac poetry' },

    // Author Categories
    { name: 'Classical Poets', nameUrdu: 'کلاسیکی شاعر', nameHindi: 'शास्त्रीय कवि', type: 'author', slug: 'classical-poets', order: 1 },
    { name: 'Modern Poets', nameUrdu: 'جدید شاعر', nameHindi: 'आधुनिक कवि', type: 'author', slug: 'modern-poets', order: 2 },
    { name: 'Female Poets', nameUrdu: 'خواتین شاعر', nameHindi: 'महिला कवयित्री', type: 'author', slug: 'female-poets', order: 3 },
    { name: 'Emerging Voices', nameUrdu: 'ابھرتے آوازیں', nameHindi: 'उभरती आवाज़ें', type: 'author', slug: 'emerging-voices', order: 4 },

    // Book Categories
    { name: 'Rare Books', nameUrdu: 'نایاب کتابیں', nameHindi: 'दुर्लभ पुस्तकें', type: 'book', slug: 'rare-books', order: 1 },
    { name: 'Journals', nameUrdu: 'جرائد', nameHindi: 'पत्रिकाएँ', type: 'book', slug: 'journals', order: 2 },
    { name: 'Magazines', nameUrdu: 'رسائل', nameHindi: 'पत्रिकाएँ', type: 'book', slug: 'magazines', order: 3 },
    { name: 'Manuscripts', nameUrdu: 'دستاویزات', nameHindi: 'हस्तलिखित', type: 'book', slug: 'manuscripts', order: 4 },

    // Audio Categories
    { name: 'Audiobooks', nameUrdu: 'آڈیو کتابیں', nameHindi: 'ऑडियोबुक', type: 'audio', slug: 'audiobooks', order: 1 },
    { name: 'Mushaira', nameUrdu: 'مushaira', nameHindi: 'मुशायरा', type: 'audio', slug: 'mushaira', order: 2 },
    { name: 'Podcasts', nameUrdu: 'پوڈکاسٹ', nameHindi: 'पॉडकास्ट', type: 'audio', slug: 'podcasts', order: 3 },
    { name: 'Ghazal Recitations', nameUrdu: 'غزل خوانی', nameHindi: 'ग़ज़ल पाठ', type: 'audio', slug: 'ghazal-recitations', order: 4 },

    // Video Categories
    { name: 'Mushaira Videos', nameUrdu: 'مushaira ویڈیوز', nameHindi: 'मुशायरा वीडियो', type: 'video', slug: 'mushaira-videos', order: 1 },
    { name: 'Documentaries', nameUrdu: 'دستاویزی فلمیں', nameHindi: 'दस्तावेज़ी फिल्में', type: 'video', slug: 'documentaries', order: 2 },
    { name: 'Interviews', nameUrdu: 'انٹرویوز', nameHindi: 'साक्षात्कार', type: 'video', slug: 'interviews', order: 3 },
    { name: 'Lectures', nameUrdu: 'لیکچرز', nameHindi: 'व्याख्यान', type: 'video', slug: 'lectures', order: 4 }
  ]);

  console.log(`✅ ${categories.length} Categories seeded`);
  return categories;
};

// ============================================
// SEED AUTHORS
// ============================================
const seedAuthors = async (categories) => {
  console.log('🌱 Seeding Authors...');
  await Author.deleteMany();

  const authors = await Author.insertMany([
    {
      name: 'Mirza Ghalib',
      nameUrdu: 'مرزا غالب',
      nameHindi: 'मिर्ज़ा ग़ालिब',
      bio: 'Mirza Asadullah Khan Ghalib (1797-1869) was the preeminent Urdu and Persian poet of the Mughal era. His ghazals are considered the pinnacle of Urdu poetry, exploring themes of love, philosophy, and the human condition with unparalleled depth and wit.',
      bioUrdu: 'مرزا اسداللہ خان غalib (1797-1869) مغل دور کے ممتاز اردو اور فارسی شاعر تھے۔',
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
      coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200',
      quotes: [
        { text: 'Hazaaron khwahishein aisi ke har khwahish pe dam nikle', source: 'Diwan-e-Ghalib' },
        { text: 'Ishq par zor nahi, hai ye wo aatish Ghalib', source: 'Diwan-e-Ghalib' }
      ],
      socialLinks: { website: 'https://ghalib.org', twitter: '@ghalib' }
    },
    {
      name: 'Allama Iqbal',
      nameUrdu: 'علامہ اقبال',
      nameHindi: 'अल्लामा इक़बाल',
      bio: 'Sir Muhammad Iqbal (1877-1938), known as Allama Iqbal, was a poet, philosopher, and politician who inspired the Pakistan Movement. His poetry in Urdu and Persian is celebrated for its spiritual and political vision.',
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
      coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200',
      quotes: [
        { text: 'Sitaron se aage jahan aur bhi hain', source: 'Bal-e-Jibril' },
        { text: 'Khudi ko kar buland itna ke har taqdeer se pehle', source: 'Zarb-e-Kalim' }
      ],
      socialLinks: { website: 'https://iqbal.org.pk' }
    },
    {
      name: 'Faiz Ahmed Faiz',
      nameUrdu: 'فیض احمد فیض',
      nameHindi: 'फ़ैज़ अहमद फ़ैज़',
      bio: 'Faiz Ahmed Faiz (1911-1984) was a Pakistani Marxist poet and author, one of the most celebrated writers of the Urdu language. He was nominated for the Nobel Prize in Literature and received the Lenin Peace Prize.',
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
      coverImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200',
      quotes: [
        { text: 'Hum dekhenge, lazim hai ke hum bhi dekhenge', source: 'Nuskha-ha-e-Wafa' },
        { text: 'Bol ke lab azaad hain tere', source: 'Dast-e-Saba' }
      ]
    },
    {
      name: 'Mir Taqi Mir',
      nameUrdu: 'میر تقی میر',
      nameHindi: 'मीर तक़ी मीर',
      bio: 'Mir Taqi Mir (1723-1810) was an Urdu poet of the 18th century and one of the pioneers who gave shape to the Urdu language itself. He is often called the "God of Poetry" (Khuda-e-Sukhan).',
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
      coverImage: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=1200'
    },
    {
      name: 'Parveen Shakir',
      nameUrdu: 'پروین شاکر',
      nameHindi: 'परवीन शाकिर',
      bio: 'Parveen Shakir (1952-1994) was a Pakistani poet, teacher, and civil servant. She is regarded as one of the most prominent female Urdu poets of the 20th century, known for her feminist perspective.',
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
      coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200'
    },
    {
      name: 'Ahmad Faraz',
      nameUrdu: 'احمد فراز',
      nameHindi: 'अहमद फ़राज़',
      bio: 'Ahmad Faraz (1931-2008) was a Pakistani Urdu poet, considered one of the greatest modern Urdu poets of the last century. He was known for his romantic and revolutionary poetry.',
      bioUrdu: 'احمد فراز (1931-2008) ایک پاکستانی اردو شاعر تھے۔',
      birthDate: new Date('1931-01-12'),
      deathDate: new Date('2008-08-25'),
      birthPlace: 'Kohat, Pakistan',
      era: 'modern',
      category: 'modern',
      genres: ['ghazal', 'nazm'],
      languages: ['urdu'],
      isVerified: true,
      isFeatured: false,
      avatar: 'https://ui-avatars.com/api/?name=Ahmad+Faraz&background=8B0000&color=fff'
    },
    {
      name: 'Jaun Elia',
      nameUrdu: 'جون ایلیا',
      nameHindi: 'जौन एलिया',
      bio: 'Jaun Elia (1931-2002) was a Pakistani poet, philosopher, biographer, and scholar of Urdu. He was the brother of renowned journalist and psychoanalyst Rais Amrohvi.',
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
      coverImage: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=1200'
    },
    {
      name: 'Javed Akhtar',
      nameUrdu: 'جاوید اختر',
      nameHindi: 'जावेद अख़्तर',
      bio: 'Javed Akhtar (born 1945) is an Indian poet, lyricist, and screenwriter. He is a recipient of the Padma Shri, Padma Bhushan, and Sahitya Akademi Award.',
      birthDate: new Date('1945-01-17'),
      birthPlace: 'Gwalior, India',
      era: 'contemporary',
      category: 'modern',
      genres: ['nazm', 'ghazal'],
      languages: ['urdu', 'hindi'],
      isVerified: true,
      isFeatured: false,
      avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Javed_Akhtar.jpg/440px-Javed_Akhtar.jpg'
    }
  ]);

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

  const poems = await Poem.insertMany([
    {
      title: 'Dil-e-Nadaan',
      content: `Dil-e-nadaan tujhe hua kya hai
Aakhir is dard ki dawa kya hai

Humko unse wafa ki hai umeed
Jo nahi jaante wafa kya hai`,
      contentUrdu: `دلِ ناداں تجھے ہوا کیا ہے
آخر اس درد کی دوا کیا ہے

ہم کو ان سے وفا کی ہے امید
جو نہیں جانتے وفا کیا ہے`,
      contentHindi: `दिल-ए-नादाँ तुझे हुआ क्या है
आख़िर इस दर्द की दवा क्या है

हमको उनसे वफ़ा की है उम्मीद
जो नहीं जानते वफ़ा क्या है`,
      transliteration: 'Dil-e-nadaan tujhe hua kya hai',
      translation: {
        english: 'O naive heart, what has happened to you? What is the cure for this pain?',
        hindi: 'हे मूर्ख दिल, तुझे क्या हुआ है? आखिर इस दर्द की दवा क्या है?'
      },
      author: ghalib._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'classical',
      tags: ['love', 'pain', 'ghazal', 'classic'],
      mood: 'sad',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      featuredAt: new Date(),
      stats: { views: 15420, likes: 892, bookmarks: 456, shares: 234, comments: 67 },
      metaTitle: 'Dil-e-Nadaan by Mirza Ghalib | ZauqApp',
      metaDescription: 'Read Dil-e-Nadaan, a classic ghazal by Mirza Ghalib. Explore Urdu poetry and literature on ZauqApp.',
      metaKeywords: ['ghalib', 'dil-e-nadaan', 'urdu poetry', 'ghazal']
    },
    {
      title: 'Hazaaron Khwahishein Aisi',
      content: `Hazaaron khwahishein aisi ke har khwahish pe dam nikle
Bahut nikle mere armaan, lekin phir bhi kam nikle

Dil hi to hai na sang-o-khisht dard se bhar na aaye kyun
Roenge hum hazaar baar, koi humein sataaye kyun`,
      contentUrdu: `ہزاروں خواہشیں ایسی کہ ہر خواہش پہ دم نکلے
بہت نکلے میرے ارمان، لیکن پھر بھی کم نکلے

دل ہی تو ہے نہ سنگ و خشت درد سے بھر نہ آئے کیوں
روئیں گے ہم ہزار بار، کوئی ہمیں ستائے کیوں`,
      author: ghalib._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'classical',
      tags: ['desire', 'pain', 'ghazal', 'classic'],
      mood: 'philosophical',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      featuredAt: new Date(),
      stats: { views: 28900, likes: 1567, bookmarks: 892, shares: 567, comments: 123 },
      metaTitle: 'Hazaaron Khwahishein Aisi by Ghalib | ZauqApp'
    },
    {
      title: 'Lab Pe Aati Hai Dua',
      content: `Lab pe aati hai dua ban ke tamanna meri
Zindagi shamma ki surat ho khudaya meri

Door duniya ka mere dam se andhera ho jaye
Har jagah mere chamakne se ujala ho jaye`,
      contentUrdu: `لب پہ آتی ہے دعا بن کے تمنا میری
زندگی شمع کی صورت ہو خدایا میری

دور دنیا کا میرے دم سے اندھیرا ہو جائے
ہر جگہ میرے چمکنے سے اجالا ہو جائے`,
      contentHindi: `लब पे आती है दुआ बन के तमन्ना मेरी
ज़िंदगी शमा की सूरत हो खुदाया मेरी

दूर दुनिया का मेरे दम से अंधेरा हो जाए
हर जगह मेरे चमकने से उजाला हो जाए`,
      author: iqbal._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'modern',
      tags: ['prayer', 'hope', 'nazm', 'children'],
      mood: 'spiritual',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      featuredAt: new Date(),
      stats: { views: 32100, likes: 2100, bookmarks: 1200, shares: 890, comments: 234 },
      metaTitle: 'Lab Pe Aati Hai Dua by Allama Iqbal | ZauqApp'
    },
    {
      title: 'Hum Dekhenge',
      content: `Hum dekhenge
Lazim hai ke hum bhi dekhenge
Wo din ke jis ka wada hai
Jo loh-e-azal mein likha hai

Hum dekhenge`,
      contentUrdu: `ہم دیکھیں گے
لازم ہے کہ ہم بھی دیکھیں گے
وہ دن جس کا وعدہ ہے
جو لوحِ ازل میں لکھا ہے

ہم دیکھیں گے`,
      contentHindi: `हम देखेंगे
लाज़िम है कि हम भी देखेंगे
वो दिन जिस का वादा है
जो लोह-ए-अज़ल में लिखा है

हम देखेंगे`,
      author: faiz._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'modern',
      tags: ['revolution', 'hope', 'nazm', 'protest'],
      mood: 'patriotic',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      featuredAt: new Date(),
      stats: { views: 45600, likes: 3400, bookmarks: 2100, shares: 1567, comments: 456 },
      metaTitle: 'Hum Dekhenge by Faiz Ahmed Faiz | ZauqApp'
    },
    {
      title: 'Patta Patta Boota Boota',
      content: `Patta patta boota boota haal hamara jaane hai
Jaane na jaane gul hi na jaane, baagh to saara jaane hai`,
      contentUrdu: `پتا پتا بوٹا بوٹا حال ہمارا جانے ہے
جانے نہ جانے گل ہی نہ جانے، باغ تو سارا جانے ہے`,
      author: mir._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'classical',
      tags: ['love', 'nature', 'ghazal'],
      mood: 'romantic',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      stats: { views: 12300, likes: 678, bookmarks: 345, shares: 123, comments: 45 }
    },
    {
      title: 'Khushbu',
      content: `Khushbu ki tarah pa badan phailti jati hai
Meri shaayari meri saans ki tarah`,
      contentUrdu: `خوشبو کی طرح پا بدن پھیلتی جاتی ہے
میری شاعری میری سانس کی طرح`,
      author: parveen._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'contemporary',
      tags: ['poetry', 'identity', 'nazm', 'feminist'],
      mood: 'philosophical',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      stats: { views: 8900, likes: 567, bookmarks: 234, shares: 89, comments: 34 }
    },
    {
      title: 'Main Bhi Bohat Ajeeb Hun',
      content: `Main bhi bohat ajeeb hun, itna bhi mujhe kya hai
Mujh se khafa ho jao to main tumhara kya karun`,
      contentUrdu: `میں بھی بہت عجیب ہوں، اتنا بھی مجھے کیا ہے
مجھ سے خفا ہو جاؤ تو میں تمہارا کیا کروں`,
      author: jaun._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'contemporary',
      tags: ['love', 'strange', 'ghazal', 'modern'],
      mood: 'romantic',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: false,
      stats: { views: 15600, likes: 1200, bookmarks: 678, shares: 345, comments: 89 }
    },
    {
      title: 'Shikwa',
      content: `Kyun ziyaan kaar banun, sood faramosh rahun
Fikr-e-farda na karun, mahw-e-ghum-e-dosh rahun`,
      contentUrdu: `کیوں زیان کار بنوں، سود فراموش رہوں
فکرِ فردا نہ کروں، محوِ غمِ دوش رہوں`,
      author: iqbal._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'modern',
      tags: ['complaint', 'god', 'nazm', 'philosophy'],
      mood: 'spiritual',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: true,
      stats: { views: 23400, likes: 1567, bookmarks: 890, shares: 456, comments: 123 }
    },
    {
      title: 'Bol Ke Lab Azaad Hain Tere',
      content: `Bol ke lab azaad hain tere
Bol zabaan ab tak teri hai`,
      contentUrdu: `بول کہ لب آزاد ہیں تیرے
بول زباں اب تک تیری ہے`,
      author: faiz._id,
      genre: 'nazm',
      language: 'urdu',
      era: 'modern',
      tags: ['freedom', 'speech', 'nazm', 'protest'],
      mood: 'patriotic',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: false,
      stats: { views: 18900, likes: 1456, bookmarks: 789, shares: 567, comments: 234 }
    },
    {
      title: 'Dikhai Diye Yun',
      content: `Dikhai diye yun ke bekhud kiya
Hamen aap se bhi juda kar chale`,
      contentUrdu: `دکھائی دیے یوں کہ بے خود کیا
ہمیں آپ سے بھی جدا کر چلے`,
      author: mir._id,
      genre: 'ghazal',
      language: 'urdu',
      era: 'classical',
      tags: ['love', 'separation', 'ghazal'],
      mood: 'sad',
      isPublished: true,
      publishedAt: new Date(),
      isFeatured: false,
      stats: { views: 11200, likes: 789, bookmarks: 456, shares: 234, comments: 67 }
    }
  ]);

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
  const faiz = authors.find(a => a.name === 'Faiz Ahmed Faiz');

  const books = await Book.insertMany([
    {
      title: 'Diwan-e-Ghalib',
      description: 'A comprehensive collection of Mirza Ghalib finest ghazals, qasidas, and masnavis. This edition includes Urdu, Persian, and Roman transliteration.',
      author: ghalib._id,
      type: 'rare',
      language: 'urdu',
      publisher: 'Ghalib Academy, Delhi',
      publishYear: 1867,
      totalPages: 450,
      isFree: true,
      isPremium: false,
      isPublished: true,
      isFeatured: true,
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600',
      stats: { views: 8900, downloads: 2340, bookmarks: 567, ratings: 89, averageRating: 4.8 }
    },
    {
      title: 'Bang-e-Dara',
      description: 'The Call of the Marching Bell - Allama Iqbal first poetry collection, featuring poems that awakened the Muslim nation.',
      author: iqbal._id,
      type: 'ebook',
      language: 'urdu',
      publisher: 'Iqbal Academy Pakistan',
      publishYear: 1924,
      totalPages: 320,
      isFree: true,
      isPremium: false,
      isPublished: true,
      isFeatured: true,
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600',
      stats: { views: 12300, downloads: 3450, bookmarks: 890, ratings: 156, averageRating: 4.9 }
    },
    {
      title: 'Nuskha-ha-e-Wafa',
      description: 'Faiz Ahmed Faiz complete works collection, including his most celebrated ghazals and nazms. A must-have for every Urdu poetry lover.',
      author: faiz._id,
      type: 'ebook',
      language: 'urdu',
      publisher: 'Maktaba-e-Daniyal',
      publishYear: 1984,
      totalPages: 520,
      isFree: false,
      isPremium: true,
      price: { amount: 199, currency: 'INR' },
      isPublished: true,
      isFeatured: true,
      coverImage: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600',
      stats: { views: 6700, downloads: 890, bookmarks: 456, ratings: 67, averageRating: 4.7 }
    },
    {
      title: 'Bal-e-Jibril',
      description: 'Gabriel Wing - Iqbal philosophical poetry collection that explores the relationship between the individual and the divine.',
      author: iqbal._id,
      type: 'ebook',
      language: 'urdu',
      publisher: 'Iqbal Academy',
      publishYear: 1935,
      totalPages: 280,
      isFree: false,
      isPremium: true,
      price: { amount: 149, currency: 'INR' },
      isPublished: true,
      isFeatured: false,
      coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600',
      stats: { views: 4500, downloads: 340, bookmarks: 234, ratings: 45, averageRating: 4.6 }
    },
    {
      title: 'Kulliyat-e-Mir',
      description: 'The complete works of Mir Taqi Mir, the "God of Poetry". Includes all his ghazals, rubais, and other poetic forms.',
      author: authors.find(a => a.name === 'Mir Taqi Mir')._id,
      type: 'rare',
      language: 'urdu',
      publisher: 'National Council for Promotion of Urdu Language',
      publishYear: 1810,
      totalPages: 600,
      isFree: true,
      isPremium: false,
      isPublished: true,
      isFeatured: true,
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600',
      stats: { views: 5600, downloads: 1230, bookmarks: 345, ratings: 56, averageRating: 4.8 }
    }
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
    {
      title: 'Ghalib Ke Ghazal - Dil-e-Nadaan',
      description: 'Beautiful recitation of Ghalib classic ghazal by renowned artist',
      type: 'poem_recitation',
      audioUrl: 'https://example.com/audio/ghalib-dil-e-nadaan.mp3',
      duration: 240,
      thumbnail: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400',
      author: ghalib._id,
      language: 'urdu',
      tags: ['ghazal', 'recitation', 'classical'],
      isPremium: false,
      isPublished: true,
      isFeatured: true,
      stats: { views: 12300, plays: 8900, likes: 1200, bookmarks: 567 }
    },
    {
      title: 'Faiz Ahmed Faiz - Hum Dekhenge',
      description: 'Iconic recitation of Faiz revolutionary nazm',
      type: 'poem_recitation',
      audioUrl: 'https://example.com/audio/faiz-hum-dekhenge.mp3',
      duration: 180,
      thumbnail: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
      author: faiz._id,
      language: 'urdu',
      tags: ['nazm', 'revolution', 'faiz'],
      isPremium: false,
      isPublished: true,
      isFeatured: true,
      stats: { views: 23400, plays: 18900, likes: 3400, bookmarks: 1200 }
    },
    {
      title: 'Jashn-e-Rekhta 2024 - Mushaira Highlights',
      description: 'Complete audio recording of the annual Jashn-e-Rekhta mushaira',
      type: 'mushaira',
      audioUrl: 'https://example.com/audio/jashn-rekhta-2024.mp3',
      duration: 7200,
      thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400',
      language: 'urdu',
      tags: ['mushaira', 'live', 'jashn-e-rekhta'],
      isPremium: true,
      isPublished: true,
      isFeatured: true,
      stats: { views: 8900, plays: 5600, likes: 890, bookmarks: 456 }
    },
    {
      title: 'Urdu Poetry Podcast - Episode 1',
      description: 'Introduction to classical Urdu poetry and its evolution',
      type: 'podcast',
      audioUrl: 'https://example.com/audio/podcast-ep1.mp3',
      duration: 3600,
      thumbnail: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=400',
      language: 'urdu',
      tags: ['podcast', 'education', 'history'],
      isPremium: false,
      isPublished: true,
      isFeatured: false,
      stats: { views: 3400, plays: 2300, likes: 345, bookmarks: 123 }
    }
  ]);

  console.log(`✅ ${audio.length} Audio items seeded`);
  return audio;
};

// ============================================
// SEED VIDEOS
// ============================================
const seedVideos = async (authors) => {
  console.log('🌱 Seeding Videos...');
  await Video.deleteMany();

  const videos = await Video.insertMany([
    {
      title: 'Jashn-e-Rekhta 2024 - Full Event',
      description: 'Complete video coverage of the biggest Urdu literary festival',
      type: 'mushaira',
      videoUrl: 'https://example.com/video/jashn-rekhta-2024.mp4',
      duration: 10800,
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
      language: 'urdu',
      tags: ['mushaira', 'festival', 'live'],
      isPremium: false,
      isPublished: true,
      isFeatured: true,
      stats: { views: 45600, likes: 5600, bookmarks: 2300 }
    },
    {
      title: 'Documentary: Life of Mirza Ghalib',
      description: 'A comprehensive documentary exploring the life and works of Mirza Ghalib',
      type: 'documentary',
      videoUrl: 'https://example.com/video/ghalib-documentary.mp4',
      duration: 5400,
      thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600',
      language: 'urdu',
      tags: ['documentary', 'ghalib', 'history'],
      isPremium: true,
      isPublished: true,
      isFeatured: true,
      stats: { views: 23400, likes: 3400, bookmarks: 1200 }
    },
    {
      title: 'Interview: Javed Akhtar on Urdu Poetry',
      description: 'In-depth interview with legendary poet and lyricist Javed Akhtar',
      type: 'interview',
      videoUrl: 'https://example.com/video/javed-akhtar-interview.mp4',
      duration: 3600,
      thumbnail: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=600',
      language: 'hindi',
      tags: ['interview', 'javed akhtar', 'poetry'],
      isPremium: false,
      isPublished: true,
      isFeatured: false,
      stats: { views: 18900, likes: 2300, bookmarks: 890 }
    },
    {
      title: 'Performance: Gulzar Reads His Poetry',
      description: 'Legendary poet Gulzar performs his latest collection',
      type: 'performance',
      videoUrl: 'https://example.com/video/gulzar-performance.mp4',
      duration: 2700,
      thumbnail: 'https://images.unsplash.com/photo-1503095396547-776806279b73?w=600',
      language: 'urdu',
      tags: ['performance', 'gulzar', 'contemporary'],
      isPremium: true,
      isPublished: true,
      isFeatured: true,
      stats: { views: 34500, likes: 4500, bookmarks: 1800 }
    }
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

  const configs = await HomepageConfig.insertMany([
    {
      section: 'hero',
      title: 'Featured',
      titleUrdu: 'نمایاں',
      titleHindi: 'विशेष रुप से प्रदर्शित',
      order: 1,
      isActive: true,
      banners: [
        {
          image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1200',
          title: 'Discover Urdu Poetry',
          subtitle: 'Explore thousands of ghazals, nazms, and sher',
          ctaText: 'Explore Now',
          ctaUrl: '/explore',
          order: 1,
          isActive: true
        },
        {
          image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200',
          title: 'Rare Books Collection',
          subtitle: 'Access centuries-old manuscripts and journals',
          ctaText: 'Browse Books',
          ctaUrl: '/books',
          order: 2,
          isActive: true
        }
      ]
    },
    {
      section: 'trending',
      title: 'Trending',
      titleUrdu: 'مقبول',
      titleHindi: 'ट्रेंडिंग',
      order: 2,
      isActive: true
    },
    {
      section: 'featured-authors',
      title: 'Featured Authors',
      titleUrdu: 'نمایاں شاعر',
      titleHindi: 'विशेष लेखक',
      order: 3,
      isActive: true
    },
    {
      section: 'featured-books',
      title: 'Popular Books',
      titleUrdu: 'مقبول کتابیں',
      titleHindi: 'लोकप्रिय किताबें',
      order: 4,
      isActive: true
    },
    {
      section: 'featured-audio',
      title: 'Audio Highlights',
      titleUrdu: 'آڈیو نمایاں',
      titleHindi: 'ऑडियो हाइलाइट्स',
      order: 5,
      isActive: true
    },
    {
      section: 'featured-videos',
      title: 'Video Highlights',
      titleUrdu: 'ویڈیو نمایاں',
      titleHindi: 'वीडियो हाइलाइट्स',
      order: 6,
      isActive: true
    },
    {
      section: 'daily-quote',
      title: 'Daily Quote',
      titleUrdu: 'روزانہ کا قول',
      titleHindi: 'दैनिक उद्धरण',
      order: 7,
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
      metaDescription: 'Discover Urdu poetry, Hindi literature, English classics, Ghazals, Shayari, Audiobooks and more on ZauqApp.',
      metaKeywords: ['urdu poetry', 'hindi literature', 'ghazal', 'shayari', 'audiobooks'],
      ogTitle: 'ZauqApp',
      ogDescription: 'AI Powered Urdu Literary Ecosystem',
      ogImage: 'https://zauqapp.com/og-image.jpg',
      ogType: 'website',
      twitterCard: 'summary_large_image',
      canonicalUrl: 'https://zauqapp.com',
      isActive: true
    },
    {
      page: 'poems',
      route: '/poems',
      metaTitle: 'Urdu Poetry Collection - ZauqApp',
      metaDescription: 'Explore thousands of Urdu ghazals, nazms, and sher by legendary poets.',
      metaKeywords: ['urdu poetry', 'ghazals', 'nazms', 'sher', 'mirza ghalib'],
      ogTitle: 'Urdu Poetry Collection',
      ogDescription: 'Explore thousands of Urdu ghazals and nazms',
      canonicalUrl: 'https://zauqapp.com/poems',
      isActive: true
    },
    {
      page: 'authors',
      route: '/authors',
      metaTitle: 'Authors & Poets - ZauqApp',
      metaDescription: 'Discover legendary poets and literary figures from Urdu, Hindi, and English literature.',
      metaKeywords: ['poets', 'authors', 'mirza ghalib', 'allama iqbal', 'faiz'],
      ogTitle: 'Authors & Poets',
      ogDescription: 'Discover legendary poets and literary figures',
      canonicalUrl: 'https://zauqapp.com/authors',
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

  const notifications = await Notification.insertMany([
    {
      recipient: john._id,
      type: 'system',
      title: 'Welcome to ZauqApp!',
      message: 'Thank you for joining our literary community. Start exploring!',
      isRead: false,
      isSent: true,
      sentAt: new Date()
    },
    {
      recipient: john._id,
      type: 'new_content',
      title: 'New Poem Added',
      message: 'A new poem by Mirza Ghalib has been added to the collection.',
      data: { contentType: 'poem', url: '/poems/dil-e-nadaan' },
      isRead: false,
      isSent: true,
      sentAt: new Date()
    },
    {
      recipient: admin._id,
      type: 'system',
      title: 'New User Registration',
      message: 'A new user has registered on the platform.',
      isRead: true,
      isSent: true,
      sentAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      readAt: new Date()
    }
  ]);

  console.log(`✅ ${notifications.length} Notifications seeded`);
  return notifications;
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
      'stats.booksCount': bookCount,
      'stats.views': Math.floor(Math.random() * 50000) + 1000
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

    // Seed in order
    const users = await seedUsers();
    const categories = await seedCategories();
    const authors = await seedAuthors(categories);
    const poems = await seedPoems(authors);
    const books = await seedBooks(authors);
    const audio = await seedAudio(authors);
    const videos = await seedVideos(authors);
    const homepageConfig = await seedHomepageConfig();
    const seo = await seedSEO();
    const notifications = await seedNotifications(users);

    // Update stats
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
    console.log(`   • Homepage Sections: ${homepageConfig.length}`);
    console.log(`   • SEO Entries: ${seo.length}`);
    console.log(`   • Notifications: ${notifications.length}`);

    console.log('\n═══════════════════════════════════════════════════════════');
    console.log('🔑 LOGIN CREDENTIALS FOR TESTING:');
    console.log('═══════════════════════════════════════════════════════════');
    console.log('  Role         | Email                        | Password   | Status');
    console.log('  ─────────────┼──────────────────────────────┼────────────┼─────────────');
    users.forEach(u => {
      let status = 'Active';
      if (u.name === 'Banned User') status = 'BANNED';
      if (u.name === 'Unverified User') status = 'Unverified';
      console.log(`  ${u.role.padEnd(12)} | ${u.email.padEnd(28)} | ${u.password.padEnd(10)} | ${status}`);
    });
    console.log('═══════════════════════════════════════════════════════════\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
};

// Run if called directly
if (process.argv[1].includes('seed.js')) {
  seedAll();
}

export default seedAll;
