// server/scripts/addAuthors.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Author from '../models/Author.js';

dotenv.config();

const addAuthors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp');
    console.log('✅ Connected to MongoDB\n');

    // Check existing authors
    const existingCount = await Author.countDocuments();
    console.log(`📊 Existing authors: ${existingCount}\n`);

    // Define authors to add (only if they don't exist)
    const authorsToAdd = [
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
        name: 'Ahmad Faraz',
        nameUrdu: 'احمد فراز',
        nameHindi: 'अहमद फ़राज़',
        bio: 'Ahmad Faraz (1931-2008) was a Pakistani Urdu poet.',
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
        avatar: 'https://ui-avatars.com/api/?name=Ahmad+Faraz&background=8B0000&color=fff',
        stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
      },
      {
        name: 'Javed Akhtar',
        nameUrdu: 'جاوید اختر',
        nameHindi: 'जावेद अख़्तर',
        bio: 'Javed Akhtar (born 1945) is an Indian poet, lyricist, and screenwriter.',
        birthDate: new Date('1945-01-17'),
        birthPlace: 'Gwalior, India',
        era: 'contemporary',
        category: 'modern',
        genres: ['nazm', 'ghazal'],
        languages: ['urdu', 'hindi'],
        isVerified: true,
        isFeatured: false,
        avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Javed_Akhtar.jpg/440px-Javed_Akhtar.jpg',
        stats: { poemsCount: 0, booksCount: 0, followers: 0, views: 0 }
      }
    ];

    let added = 0;
    let skipped = 0;

    for (const authorData of authorsToAdd) {
      // Check if author already exists by name
      const existingAuthor = await Author.findOne({ 
        $or: [
          { name: authorData.name },
          { slug: authorData.name.toLowerCase().replace(/ /g, '-') }
        ]
      });

      if (!existingAuthor) {
        // Generate slug
        const slug = authorData.name.toLowerCase().replace(/ /g, '-') + '-' + Date.now().toString(36);
        
        await Author.create({
          ...authorData,
          slug
        });
        console.log(`✅ Added: ${authorData.name}`);
        added++;
      } else {
        console.log(`⏭️ Skipped (already exists): ${authorData.name} (ID: ${existingAuthor._id})`);
        skipped++;
      }
    }

    console.log('\n' + '═'.repeat(50));
    console.log(`📊 Summary:`);
    console.log(`   ✅ Added: ${added} authors`);
    console.log(`   ⏭️ Skipped: ${skipped} authors`);
    console.log(`   📚 Total authors now: ${await Author.countDocuments()}`);
    console.log('═'.repeat(50));

    // Display all authors with their IDs
    const allAuthors = await Author.find({}, { _id: 1, name: 1 });
    console.log('\n📋 Author IDs for frontend:');
    console.log('═'.repeat(60));
    allAuthors.forEach(author => {
      console.log(`   "${author._id}" : "${author.name}"`);
    });
    console.log('═'.repeat(60));

    await mongoose.disconnect();
    console.log('\n✅ Done! You can now use these IDs in your frontend.');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

addAuthors();