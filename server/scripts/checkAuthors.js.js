// server/scripts/checkAuthors.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Author from '../models/Author.js';

dotenv.config();

const checkAuthors = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp');
    console.log('✅ Connected to MongoDB\n');

    // Count total authors
    const totalCount = await Author.countDocuments();
    console.log(`📊 Total authors in database: ${totalCount}\n`);

    if (totalCount === 0) {
      console.log('⚠️ No authors found! Please run the seed script:');
      console.log('   node seed/seed.js\n');
      process.exit(0);
    }

    // Get all authors
    const authors = await Author.find({}, { 
      _id: 1, 
      name: 1, 
      nameUrdu: 1,
      slug: 1,
      isVerified: 1,
      'stats.poemsCount': 1
    });

    console.log('📋 List of authors:');
    console.log('═'.repeat(80));
    console.log('ID'.padEnd(30) + 'Name'.padEnd(30) + 'Poems Count');
    console.log('═'.repeat(80));
    
    authors.forEach(author => {
      console.log(
        author._id.toString().padEnd(30) + 
        author.name.padEnd(30) + 
        (author.stats?.poemsCount || 0)
      );
    });
    
    console.log('═'.repeat(80));
    console.log(`\n✅ Total: ${authors.length} authors found`);

    // Check specific hardcoded IDs
    const hardcodedIds = [
      '6754f8a1b2c3d4e5f6a7b8c9',
      '6754f8a1b2c3d4e5f6a7b8d0',
      '6754f8a1b2c3d4e5f6a7b8d1',
      '6754f8a1b2c3d4e5f6a7b8d2',
      '6754f8a1b2c3d4e5f6a7b8d3'
    ];

    console.log('\n🔍 Checking hardcoded author IDs:');
    console.log('═'.repeat(80));
    
    for (const id of hardcodedIds) {
      const author = await Author.findById(id);
      console.log(
        `${id} : ${author ? `✅ FOUND - ${author.name}` : '❌ NOT FOUND'}`
      );
    }

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

checkAuthors();