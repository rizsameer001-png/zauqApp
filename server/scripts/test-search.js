import mongoose from 'mongoose';
import Poem from '../server/models/Poem.js';
import Author from '../server/models/Author.js';
import Book from '../server/models/Book.js';
import Audio from '../server/models/Audio.js';
import Video from '../server/models/Video.js';
import dotenv from 'dotenv';

dotenv.config();

const testSearch = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Check counts
    const poemCount = await Poem.countDocuments();
    const authorCount = await Author.countDocuments();
    const bookCount = await Book.countDocuments();
    const audioCount = await Audio.countDocuments();
    const videoCount = await Video.countDocuments();
    
    console.log('Database counts:');
    console.log(`- Poems: ${poemCount}`);
    console.log(`- Authors: ${authorCount}`);
    console.log(`- Books: ${bookCount}`);
    console.log(`- Audio: ${audioCount}`);
    console.log(`- Videos: ${videoCount}`);
    
    // Test search for "Jameel"
    const searchTerm = 'Jameel';
    const regex = new RegExp(searchTerm, 'i');
    
    const poems = await Poem.find({ title: regex }).limit(5);
    const authors = await Author.find({ name: regex }).limit(5);
    
    console.log(`\nSearch results for "${searchTerm}":`);
    console.log(`- Poems found: ${poems.length}`);
    console.log(`- Authors found: ${authors.length}`);
    
    if (authors.length > 0) {
      console.log('Authors:', authors.map(a => ({ name: a.name, _id: a._id })));
    }
    
    if (poems.length > 0) {
      console.log('Poems:', poems.map(p => ({ title: p.title, author: p.author })));
    }
    
    await mongoose.disconnect();
    console.log('\nTest completed');
  } catch (error) {
    console.error('Test error:', error);
    process.exit(1);
  }
};

testSearch();