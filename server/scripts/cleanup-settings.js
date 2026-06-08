// server/scripts/cleanup-settings.js
import mongoose from 'mongoose';
import Settings from '../models/Settings.js';
import dotenv from 'dotenv';

dotenv.config();

async function cleanupSettings() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp');
    console.log('✅ Connected to MongoDB');
    
    // Find all settings documents
    const allSettings = await Settings.find({});
    console.log(`📊 Found ${allSettings.length} settings documents`);
    
    if (allSettings.length > 1) {
      console.log('⚠️ Multiple settings found, keeping only one...');
      
      // Keep the first one, delete others
      const keep = allSettings[0];
      const deleteIds = allSettings.slice(1).map(doc => doc._id);
      
      await Settings.deleteMany({ _id: { $in: deleteIds } });
      console.log(`✅ Deleted ${deleteIds.length} duplicate settings`);
      
      // Ensure settingsId is set correctly
      keep.settingsId = 'global_settings_const';
      await keep.save();
      console.log('✅ Updated remaining settings with correct ID');
    } else if (allSettings.length === 0) {
      // Create new settings
      await Settings.create({ settingsId: 'global_settings_const' });
      console.log('✅ Created new settings document');
    } else {
      // Ensure the single document has correct settingsId
      const single = allSettings[0];
      if (single.settingsId !== 'global_settings_const') {
        single.settingsId = 'global_settings_const';
        await single.save();
        console.log('✅ Updated settingsId');
      }
      console.log('✅ Settings are clean');
    }
    
    await mongoose.disconnect();
    console.log('🔌 Disconnected');
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

cleanupSettings();