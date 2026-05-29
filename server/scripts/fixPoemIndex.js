import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const fixPoemIndex = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp');
    console.log('✅ Connected to MongoDB\n');

    const db = mongoose.connection.db;
    const collection = db.collection('poems');
    
    // Check if collection exists
    const collections = await db.listCollections({ name: 'poems' }).toArray();
    if (collections.length === 0) {
      console.log('⚠️ Poems collection does not exist yet. No fix needed.');
      await mongoose.disconnect();
      return;
    }
    
    // Get all indexes
    const indexes = await collection.indexes();
    console.log('📋 Current indexes on poems collection:');
    indexes.forEach(index => {
      console.log(`   Name: ${index.name}`);
      console.log(`   Keys:`, JSON.stringify(index.key, null, 2));
      console.log(`   ${index.weights ? '→ This is a TEXT index' : ''}`);
      console.log('---');
    });
    
    // Find and drop text indexes
    let droppedCount = 0;
    for (const index of indexes) {
      // Check if it's a text index
      const isTextIndex = index.weights || Object.values(index.key).some(v => v === 'text');
      
      if (isTextIndex) {
        console.log(`\n🗑️ Dropping text index: ${index.name}`);
        try {
          await collection.dropIndex(index.name);
          console.log(`   ✅ Successfully dropped`);
          droppedCount++;
        } catch (err) {
          console.log(`   ❌ Failed to drop:`, err.message);
        }
      }
    }
    
    if (droppedCount === 0) {
      console.log('\n✅ No text indexes found to drop.');
    } else {
      console.log(`\n✅ Dropped ${droppedCount} text index(es).`);
    }
    
    // Create regular indexes if they don't exist
    console.log('\n📝 Ensuring regular indexes exist...');
    
    const existingIndexes = await collection.indexes();
    const indexNames = existingIndexes.map(i => i.name);
    
    if (!indexNames.includes('title_text_content_text_contentUrdu_text_tags_text_translation.english_text')) {
      console.log('   Creating text search index (without language field)...');
      await collection.createIndex(
        { 
          title: 'text', 
          content: 'text', 
          contentUrdu: 'text',
          tags: 'text',
          'translation.english': 'text'
        },
        { name: 'text_search_index' }
      );
    }
    
    if (!indexNames.includes('genre_1_language_1_isPublished_1')) {
      await collection.createIndex({ genre: 1, language: 1, isPublished: 1 });
    }
    
    if (!indexNames.includes('author_1_isPublished_1')) {
      await collection.createIndex({ author: 1, isPublished: 1 });
    }
    
    if (!indexNames.includes('isFeatured_1_featuredAt_-1')) {
      await collection.createIndex({ isFeatured: 1, featuredAt: -1 });
    }
    
    if (!indexNames.includes('createdAt_-1')) {
      await collection.createIndex({ createdAt: -1 });
    }
    
    console.log('✅ All indexes are now correct!\n');
    
    // Show final indexes
    const finalIndexes = await collection.indexes();
    console.log('📋 Final indexes:');
    finalIndexes.forEach(index => {
      console.log(`   - ${index.name}:`, JSON.stringify(index.key));
    });
    
    await mongoose.disconnect();
    console.log('\n✅ Fix completed! Now try creating a poem again.');
  } catch (error) {
    console.error('❌ Error:', error);
    await mongoose.disconnect();
  }
};

fixPoemIndex();