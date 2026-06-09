// // server/scripts/createDummyAds.js
// import mongoose from 'mongoose';
// import Ad from '../models/Ad.js';
// import dotenv from 'dotenv';

// dotenv.config();

// const dummyAds = [
//   {
//     name: 'Book Store Ad',
//     type: 'sidebar',
//     position: 'sidebar-top',
//     imageUrl: 'https://placehold.co/300x250/8B5CF6/white?text=Buy+Poetry+Books',
//     linkUrl: 'https://example.com/books',
//     altText: 'Buy poetry books online',
//     codeType: 'image',
//     dimensions: { width: 300, height: 250 },
//     deviceType: 'all',
//     pages: ['all'],
//     isActive: true,
//     priority: 10
//   },
//   {
//     name: 'Poetry Workshop',
//     type: 'sidebar',
//     position: 'sidebar-middle',
//     imageUrl: 'https://placehold.co/300x250/F59E0B/white?text=Join+Poetry+Workshop',
//     linkUrl: 'https://example.com/workshop',
//     altText: 'Learn poetry writing',
//     codeType: 'image',
//     dimensions: { width: 300, height: 250 },
//     deviceType: 'all',
//     pages: ['all'],
//     isActive: true,
//     priority: 8
//   },
//   {
//     name: 'Poetry Competition',
//     type: 'sidebar',
//     position: 'sidebar-bottom',
//     imageUrl: 'https://placehold.co/300x250/10B981/white?text=Poetry+Competition+2024',
//     linkUrl: 'https://example.com/competition',
//     altText: 'Submit your poem',
//     codeType: 'image',
//     dimensions: { width: 300, height: 250 },
//     deviceType: 'all',
//     pages: ['all'],
//     isActive: true,
//     priority: 7
//   },
//   {
//     name: 'Amazon Ad',
//     type: 'sidebar',
//     position: 'sidebar-top',
//     imageUrl: 'https://placehold.co/300x250/3B82F6/white?text=Shop+on+Amazon',
//     linkUrl: 'https://amazon.com',
//     altText: 'Shop now',
//     codeType: 'image',
//     dimensions: { width: 300, height: 250 },
//     deviceType: 'all',
//     pages: ['all'],
//     isActive: true,
//     priority: 5
//   },
//   {
//     name: 'Google AdSense Demo',
//     type: 'sidebar',
//     position: 'sidebar-middle',
//     htmlCode: '<div class="bg-gray-100 p-4 text-center rounded-lg"><p class="text-gray-500">Advertisement</p><div class="h-40 flex items-center justify-center"><span class="text-gray-400">Google AdSense Demo</span></div></div>',
//     codeType: 'html',
//     dimensions: { width: 300, height: 250 },
//     deviceType: 'all',
//     pages: ['all'],
//     isActive: true,
//     priority: 6
//   }
// ];

// async function createDummyAds() {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('Connected to MongoDB');
    
//     // Clear existing ads
//     await Ad.deleteMany({});
//     console.log('Cleared existing ads');
    
//     // Insert dummy ads
//     const ads = await Ad.insertMany(dummyAds);
//     console.log(`Created ${ads.length} dummy ads`);
    
//     console.log('Dummy ads created successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error('Error creating dummy ads:', error);
//     process.exit(1);
//   }
// }

// createDummyAds();












// server/scripts/createDummyAds.js
import mongoose from 'mongoose';
import Ad from '../models/Ad.js';
import dotenv from 'dotenv';

dotenv.config();

const dummyAds = [
  {
    name: 'Book Store Ad - Top',
    type: 'sidebar',
    position: 'sidebar-top',
    imageUrl: 'https://placehold.co/300x250/8B5CF6/white?text=Buy+Poetry+Books',
    linkUrl: 'https://example.com/books',
    altText: 'Buy poetry books online',
    codeType: 'image',
    dimensions: { width: 300, height: 250 },
    deviceType: 'all',
    pages: ['all'],
    isActive: true,
    priority: 10
  },
  {
    name: 'Poetry Workshop - Bottom',
    type: 'sidebar',
    position: 'sidebar-bottom',
    imageUrl: 'https://placehold.co/300x250/F59E0B/white?text=Join+Poetry+Workshop',
    linkUrl: 'https://example.com/workshop',
    altText: 'Learn poetry writing',
    codeType: 'image',
    dimensions: { width: 300, height: 250 },
    deviceType: 'all',
    pages: ['all'],
    isActive: true,
    priority: 8
  },
  {
    name: 'Poetry Competition',
    type: 'sidebar',
    position: 'sidebar-bottom',
    imageUrl: 'https://placehold.co/300x250/10B981/white?text=Poetry+Competition+2024',
    linkUrl: 'https://example.com/competition',
    altText: 'Submit your poem',
    codeType: 'image',
    dimensions: { width: 300, height: 250 },
    deviceType: 'all',
    pages: ['all'],
    isActive: true,
    priority: 7
  },
  {
    name: 'Amazon Shopping Ad',
    type: 'sidebar',
    position: 'sidebar-top',
    imageUrl: 'https://placehold.co/300x250/3B82F6/white?text=Shop+on+Amazon',
    linkUrl: 'https://amazon.com',
    altText: 'Shop now',
    codeType: 'image',
    dimensions: { width: 300, height: 250 },
    deviceType: 'all',
    pages: ['all'],
    isActive: true,
    priority: 5
  },
  {
    name: 'Google AdSense Demo',
    type: 'sidebar',
    position: 'sidebar-bottom',
    htmlCode: '<div class="bg-gray-100 dark:bg-gray-700 p-4 text-center rounded-lg"><p class="text-gray-500 dark:text-gray-400">Advertisement</p><div class="h-40 flex items-center justify-center"><span class="text-gray-400 dark:text-gray-500">Google AdSense Demo</span></div></div>',
    codeType: 'html',
    dimensions: { width: 300, height: 250 },
    deviceType: 'all',
    pages: ['all'],
    isActive: true,
    priority: 6
  },
  {
    name: 'Poetry Book Sale',
    type: 'sidebar',
    position: 'sidebar-top',
    imageUrl: 'https://placehold.co/300x250/EF4444/white?text=50%25+OFF+Poetry+Books',
    linkUrl: 'https://example.com/sale',
    altText: 'Poetry book sale',
    codeType: 'image',
    dimensions: { width: 300, height: 250 },
    deviceType: 'all',
    pages: ['all'],
    isActive: true,
    priority: 9
  }
];

async function createDummyAds() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/zauqapp');
    console.log('Connected to MongoDB');
    
    // Clear existing ads
    const deleted = await Ad.deleteMany({});
    console.log(`Cleared ${deleted.deletedCount} existing ads`);
    
    // Insert dummy ads
    const ads = await Ad.insertMany(dummyAds);
    console.log(`✅ Created ${ads.length} dummy ads successfully!`);
    
    // Log the created ads
    console.log('\n📊 Created Ads:');
    ads.forEach(ad => {
      console.log(`  - ${ad.name} (${ad.position})`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating dummy ads:', error);
    process.exit(1);
  }
}

createDummyAds();