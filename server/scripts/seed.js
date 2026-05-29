import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Author from '../models/Author.js';
import Poem from '../models/Poem.js';
import Book from '../models/Book.js';
import Category from '../models/Category.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Author.deleteMany(),
      Poem.deleteMany(),
      Book.deleteMany(),
      Category.deleteMany()
    ]);

    console.log('Cleared existing data');

    // Create categories
    const categories = await Category.insertMany([
      { name: 'Ghazals', nameUrdu: 'غزلیں', type: 'poetry', slug: 'ghazals', order: 1 },
      { name: 'Nazms', nameUrdu: 'نظمیں', type: 'poetry', slug: 'nazms', order: 2 },
      { name: 'Sher', nameUrdu: 'شعر', type: 'poetry', slug: 'sher', order: 3 },
      { name: 'Rubai', nameUrdu: 'رباعی', type: 'poetry', slug: 'rubai', order: 4 },
      { name: 'Rekhti', nameUrdu: 'رکھتی', type: 'poetry', slug: 'rekhti', order: 5 },
      { name: 'Classical Poets', nameUrdu: 'کلاسیکی شاعر', type: 'author', slug: 'classical-poets', order: 1 },
      { name: 'Modern Poets', nameUrdu: 'جدید شاعر', type: 'author', slug: 'modern-poets', order: 2 },
      { name: 'Female Poets', nameUrdu: 'خواتین شاعر', type: 'author', slug: 'female-poets', order: 3 },
      { name: 'Rare Books', nameUrdu: 'نایاب کتابیں', type: 'book', slug: 'rare-books', order: 1 },
      { name: 'Journals', nameUrdu: 'جرائد', type: 'book', slug: 'journals', order: 2 },
      { name: 'Audiobooks', nameUrdu: 'آڈیو کتابیں', type: 'audio', slug: 'audiobooks', order: 1 },
      { name: 'Mushaira', nameUrdu: 'مushaira', type: 'audio', slug: 'mushaira', order: 2 },
      { name: 'Podcasts', nameUrdu: 'پوڈکاسٹ', type: 'audio', slug: 'podcasts', order: 3 },
      { name: 'Mushaira Videos', nameUrdu: 'مushaira ویڈیوز', type: 'video', slug: 'mushaira-videos', order: 1 },
      { name: 'Documentaries', nameUrdu: 'دستاویزی فلمیں', type: 'video', slug: 'documentaries', order: 2 }
    ]);

    console.log('Categories seeded');

    // Create authors
    const authors = await Author.insertMany([
      {
        name: 'Mirza Ghalib',
        nameUrdu: 'مرزا غالب',
        bio: 'Mirza Asadullah Khan Ghalib was a prominent Urdu and Persian poet during the Mughal era. He is considered one of the most popular and influential poets in Urdu literature.',
        bioUrdu: 'مرزا اسداللہ خان غالب مغل دور کے ایک ممتاز اردو اور فارسی شاعر تھے۔',
        birthDate: new Date('1797-12-27'),
        deathDate: new Date('1869-02-15'),
        birthPlace: 'Agra, India',
        era: 'classical',
        category: 'classical',
        genres: ['ghazal', 'sher'],
        languages: ['urdu', 'persian'],
        isVerified: true,
        isFeatured: true
      },
      {
        name: 'Allama Iqbal',
        nameUrdu: 'علامہ اقبال',
        bio: 'Sir Muhammad Iqbal, widely known as Allama Iqbal, was a poet, philosopher, and politician, as well as an academic, barrister and scholar in British India.',
        bioUrdu: 'سر محمد اقبال، جو عموماً علامہ اقبال کے نام سے جانے جاتے ہیں، ایک شاعر، فلسفی اور سیاست دان تھے۔',
        birthDate: new Date('1877-11-09'),
        deathDate: new Date('1938-04-21'),
        birthPlace: 'Sialkot, Punjab',
        era: 'modern',
        category: 'modern',
        genres: ['nazm', 'ghazal'],
        languages: ['urdu', 'persian'],
        isVerified: true,
        isFeatured: true
      },
      {
        name: 'Faiz Ahmed Faiz',
        nameUrdu: 'فیض احمد فیض',
        bio: 'Faiz Ahmed Faiz was a Pakistani Marxist, poet, and author, and one of the most celebrated writers of the Urdu language.',
        bioUrdu: 'فیض احمد فیض ایک پاکستانی مارکسیسٹ، شاعر اور مصنف تھے۔',
        birthDate: new Date('1911-02-13'),
        deathDate: new Date('1984-11-20'),
        birthPlace: 'Kala Qader, Punjab',
        era: 'modern',
        category: 'modern',
        genres: ['nazm', 'ghazal'],
        languages: ['urdu'],
        isVerified: true,
        isFeatured: true
      },
      {
        name: 'Mir Taqi Mir',
        nameUrdu: 'میر تقی میر',
        bio: 'Mir Taqi Mir was an Urdu poet of the 18th century Mughal India, and one of the pioneers who gave shape to the Urdu language itself.',
        bioUrdu: 'میر تقی میر 18ویں صدی کے مغل ہندوستان کے ایک اردو شاعر تھے۔',
        birthDate: new Date('1723-02-01'),
        deathDate: new Date('1810-09-21'),
        birthPlace: 'Agra, India',
        era: 'classical',
        category: 'classical',
        genres: ['ghazal', 'sher'],
        languages: ['urdu'],
        isVerified: true,
        isFeatured: true
      },
      {
        name: 'Parveen Shakir',
        nameUrdu: 'پروین شاکر',
        bio: 'Parveen Shakir was a Pakistani poet, teacher, and civil servant of the Government of Pakistan.',
        bioUrdu: 'پروین شاکر ایک پاکستانی شاعرہ، استاد اور سرکاری ملازمہ تھیں۔',
        birthDate: new Date('1952-11-24'),
        deathDate: new Date('1994-12-26'),
        birthPlace: 'Karachi, Pakistan',
        era: 'contemporary',
        category: 'female',
        genres: ['ghazal', 'nazm'],
        languages: ['urdu'],
        isVerified: true,
        isFeatured: true
      }
    ]);

    console.log('Authors seeded');

    // Create poems
    const poems = await Poem.insertMany([
      {
        title: 'Dil-e-Nadaan',
        content: 'Dil-e-nadaan tujhe hua kya hai
Aakhir is dard ki dawa kya hai

Humko unse wafa ki hai umeed
Jo nahi jaante wafa kya hai',
        contentUrdu: 'دلِ ناداں تجھے ہوا کیا ہے
آخر اس درد کی دوا کیا ہے

ہم کو ان سے وفا کی ہے امید
جو نہیں جانتے وفا کیا ہے',
        author: authors[0]._id,
        genre: 'ghazal',
        language: 'urdu',
        era: 'classical',
        tags: ['love', 'pain', 'ghazal'],
        mood: 'sad',
        isPublished: true,
        publishedAt: new Date(),
        isFeatured: true,
        metaTitle: 'Dil-e-Nadaan by Mirza Ghalib | ZauqApp',
        metaDescription: 'Read Dil-e-Nadaan, a classic ghazal by Mirza Ghalib on ZauqApp. Explore Urdu poetry and literature.'
      },
      {
        title: 'Lab Pe Aati Hai Dua',
        content: 'Lab pe aati hai dua ban ke tamanna meri
Zindagi shamma ki surat ho khudaya meri

Door duniya ka mere dam se andhera ho jaye
Har jagah mere chamakne se ujala ho jaye',
        contentUrdu: 'لب پہ آتی ہے دعا بن کے تمنا میری
زندگی شمع کی صورت ہو خدایا میری

دور دنیا کا میرے دم سے اندھیرا ہو جائے
ہر جگہ میرے چمکنے سے اجالا ہو جائے',
        author: authors[1]._id,
        genre: 'nazm',
        language: 'urdu',
        era: 'modern',
        tags: ['prayer', 'hope', 'nazm'],
        mood: 'spiritual',
        isPublished: true,
        publishedAt: new Date(),
        isFeatured: true,
        metaTitle: 'Lab Pe Aati Hai Dua by Allama Iqbal | ZauqApp',
        metaDescription: 'Read Lab Pe Aati Hai Dua, a beautiful nazm by Allama Iqbal on ZauqApp.'
      },
      {
        title: 'Hum Dekhenge',
        content: 'Hum dekhenge
Lazim hai ke hum bhi dekhenge
Wo din ke jis ka wada hai
Jo loh-e-azal mein likha hai

Hum dekhenge',
        contentUrdu: 'ہم دیکھیں گے
لازم ہے کہ ہم بھی دیکھیں گے
وہ دن جس کا وعدہ ہے
جو لوحِ ازل میں لکھا ہے

ہم دیکھیں گے',
        author: authors[2]._id,
        genre: 'nazm',
        language: 'urdu',
        era: 'modern',
        tags: ['revolution', 'hope', 'nazm'],
        mood: 'patriotic',
        isPublished: true,
        publishedAt: new Date(),
        isFeatured: true,
        metaTitle: 'Hum Dekhenge by Faiz Ahmed Faiz | ZauqApp',
        metaDescription: 'Read Hum Dekhenge, a revolutionary nazm by Faiz Ahmed Faiz on ZauqApp.'
      },
      {
        title: 'Patta Patta Boota Boota',
        content: 'Patta patta boota boota haal hamara jaane hai
Jaane na jaane gul hi na jaane, baagh to saara jaane hai',
        contentUrdu: 'پتا پتا بوٹا بوٹا حال ہمارا جانے ہے
جانے نہ جانے گل ہی نہ جانے، باغ تو سارا جانے ہے',
        author: authors[3]._id,
        genre: 'ghazal',
        language: 'urdu',
        era: 'classical',
        tags: ['love', 'nature', 'ghazal'],
        mood: 'romantic',
        isPublished: true,
        publishedAt: new Date(),
        isFeatured: true
      },
      {
        title: 'Khushbu',
        content: 'Khushbu ki tarah pa badan phailti jati hai
Meri shaayari meri saans ki tarah',
        contentUrdu: 'خوشبو کی طرح پا بدن پھیلتی جاتی ہے
میری شاعری میری سانس کی طرح',
        author: authors[4]._id,
        genre: 'nazm',
        language: 'urdu',
        era: 'contemporary',
        tags: ['poetry', 'identity', 'nazm'],
        mood: 'philosophical',
        isPublished: true,
        publishedAt: new Date(),
        isFeatured: true
      }
    ]);

    console.log('Poems seeded');

    // Create books
    const books = await Book.insertMany([
      {
        title: 'Diwan-e-Ghalib',
        description: 'A collection of Mirza Ghalib's finest ghazals and poetry.',
        author: authors[0]._id,
        type: 'rare',
        language: 'urdu',
        publisher: 'Ghalib Academy',
        publishYear: 1867,
        isFree: true,
        isPublished: true,
        isFeatured: true
      },
      {
        title: 'Bang-e-Dara',
        description: 'The Call of the Marching Bell - Allama Iqbal's first poetry collection.',
        author: authors[1]._id,
        type: 'ebook',
        language: 'urdu',
        publisher: 'Iqbal Academy',
        publishYear: 1924,
        isFree: true,
        isPublished: true,
        isFeatured: true
      },
      {
        title: 'Nuskha-ha-e-Wafa',
        description: 'Faiz Ahmed Faiz's complete works collection.',
        author: authors[2]._id,
        type: 'ebook',
        language: 'urdu',
        publisher: 'Maktaba-e-Daniyal',
        publishYear: 1984,
        isFree: false,
        isPremium: true,
        price: { amount: 199, currency: 'INR' },
        isPublished: true,
        isFeatured: true
      }
    ]);

    console.log('Books seeded');

    // Update author stats
    await Promise.all(authors.map(async (author, index) => {
      const authorPoems = poems.filter(p => p.author.toString() === author._id.toString());
      const authorBooks = books.filter(b => b.author.toString() === author._id.toString());

      await Author.findByIdAndUpdate(author._id, {
        'stats.poemsCount': authorPoems.length,
        'stats.booksCount': authorBooks.length
      });
    }));

    // Create admin user
    await User.create({
      name: 'Admin',
      email: 'admin@zauqapp.com',
      password: 'admin123',
      role: 'admin',
      isVerified: true
    });

    console.log('Admin user created');

    console.log('\n✅ Seed completed successfully!');
    console.log(`Created: ${categories.length} categories, ${authors.length} authors, ${poems.length} poems, ${books.length} books`);

    process.exit(0);
  } catch (error) {
    console.error('Seed failed:', error);
    process.exit(1);
  }
};

connectDB().then(seedData);
