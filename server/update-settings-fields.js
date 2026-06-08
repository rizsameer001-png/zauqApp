// server/update-settings-fields.js
// Run with: node update-settings-fields.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '.env') });

// Import Settings model
import Settings from './models/Settings.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp';

async function updateSettingsFields() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 SETTINGS DATABASE UPDATE SCRIPT');
  console.log('='.repeat(60) + '\n');
  
  try {
    // Connect to MongoDB
    console.log('📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB successfully!\n');

    // Find existing settings
    let settings = await Settings.findOne();
    
    if (!settings) {
      console.log('⚠️ No settings document found. Creating new one...');
      settings = new Settings();
    } else {
      console.log('✅ Found existing settings document');
      console.log(`   ID: ${settings._id}`);
      console.log(`   Created: ${settings.createdAt}`);
      console.log(`   Updated: ${settings.updatedAt}\n`);
    }

    console.log('📝 Checking and adding missing fields...\n');
    
    let fieldsAdded = 0;
    let fieldsSkipped = 0;

    // ============================================
    // General Settings
    // ============================================
    if (settings.contactPhone === undefined) {
      settings.contactPhone = '';
      console.log('   ✅ Added: contactPhone');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: contactPhone (already exists: "${settings.contactPhone}")`);
      fieldsSkipped++;
    }
    
    if (settings.address === undefined) {
      settings.address = '';
      console.log('   ✅ Added: address');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: address (already exists: "${settings.address}")`);
      fieldsSkipped++;
    }

    // ============================================
    // SEO & Social Fields
    // ============================================
    if (settings.metaTitle === undefined) {
      settings.metaTitle = '';
      console.log('   ✅ Added: metaTitle');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: metaTitle (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.metaDescription === undefined) {
      settings.metaDescription = '';
      console.log('   ✅ Added: metaDescription');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: metaDescription (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.metaKeywords === undefined) {
      settings.metaKeywords = [];
      console.log('   ✅ Added: metaKeywords');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: metaKeywords (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.ogImage === undefined) {
      settings.ogImage = '';
      console.log('   ✅ Added: ogImage');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: ogImage (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.twitterHandle === undefined) {
      settings.twitterHandle = '';
      console.log('   ✅ Added: twitterHandle');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: twitterHandle (already exists)`);
      fieldsSkipped++;
    }

    // ============================================
    // Social Links
    // ============================================
    if (settings.facebook === undefined) {
      settings.facebook = '';
      console.log('   ✅ Added: facebook');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: facebook (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.twitter === undefined) {
      settings.twitter = '';
      console.log('   ✅ Added: twitter');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: twitter (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.instagram === undefined) {
      settings.instagram = '';
      console.log('   ✅ Added: instagram');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: instagram (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.youtube === undefined) {
      settings.youtube = '';
      console.log('   ✅ Added: youtube');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: youtube (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.linkedin === undefined) {
      settings.linkedin = '';
      console.log('   ✅ Added: linkedin');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: linkedin (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.github === undefined) {
      settings.github = '';
      console.log('   ✅ Added: github');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: github (already exists)`);
      fieldsSkipped++;
    }

    // ============================================
    // Footer Settings
    // ============================================
    if (settings.footerText === undefined) {
      settings.footerText = '';
      console.log('   ✅ Added: footerText');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: footerText (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.footerColumns === undefined) {
      settings.footerColumns = [];
      console.log('   ✅ Added: footerColumns');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: footerColumns (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.showNewsletter === undefined) {
      settings.showNewsletter = true;
      console.log('   ✅ Added: showNewsletter');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: showNewsletter (already exists: ${settings.showNewsletter})`);
      fieldsSkipped++;
    }
    
    if (settings.copyrightText === undefined) {
      settings.copyrightText = '';
      console.log('   ✅ Added: copyrightText');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: copyrightText (already exists)`);
      fieldsSkipped++;
    }

    // ============================================
    // Announcement Settings
    // ============================================
    if (settings.showAnnouncement === undefined) {
      settings.showAnnouncement = false;
      console.log('   ✅ Added: showAnnouncement');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: showAnnouncement (already exists: ${settings.showAnnouncement})`);
      fieldsSkipped++;
    }
    
    if (settings.announcementText === undefined) {
      settings.announcementText = '';
      console.log('   ✅ Added: announcementText');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: announcementText (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.announcementLink === undefined) {
      settings.announcementLink = '';
      console.log('   ✅ Added: announcementLink');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: announcementLink (already exists)`);
      fieldsSkipped++;
    }
    
    if (settings.announcementExpiry === undefined) {
      settings.announcementExpiry = null;
      console.log('   ✅ Added: announcementExpiry');
      fieldsAdded++;
    } else {
      console.log(`   ⏭️  Skipped: announcementExpiry (already exists)`);
      fieldsSkipped++;
    }

    // ============================================
    // Save the updated settings
    // ============================================
    console.log('\n' + '='.repeat(60));
    console.log('💾 Saving settings to database...');
    
    await settings.save();
    
    console.log('✅ Settings saved successfully!');
    console.log('='.repeat(60));
    
    console.log('\n📊 Summary:');
    console.log(`   ✅ Fields added: ${fieldsAdded}`);
    console.log(`   ⏭️  Fields skipped (already exist): ${fieldsSkipped}`);
    console.log(`   📦 Total fields in document: ${Object.keys(settings.toObject()).length}`);
    
    console.log('\n🔍 Verifying critical fields:');
    console.log(`   contactPhone: "${settings.contactPhone || '(empty)'}"`);
    console.log(`   address: "${settings.address || '(empty)'}"`);
    console.log(`   siteName: "${settings.siteName}"`);
    console.log(`   contactEmail: "${settings.contactEmail}"`);
    
    console.log('\n✅ Update completed successfully!');
    console.log('='.repeat(60) + '\n');
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB\n');
    
  } catch (error) {
    console.error('\n❌ Error:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
updateSettingsFields();