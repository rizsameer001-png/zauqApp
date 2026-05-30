// import mongoose from 'mongoose';

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       // Mongoose 6+ handles these automatically, but explicit for clarity
//     });
//     console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
//     return conn;
//   } catch (error) {
//     console.error(`❌ MongoDB Connection Error: ${error.message}`);
//     throw error;
//   }
// };

// export default connectDB;




import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Critical timeout settings for Render deployment
      serverSelectionTimeoutMS: 30000,  // Time to wait for server selection (default 10000ms)
      socketTimeoutMS: 45000,           // Time to wait for socket activity
      connectTimeoutMS: 30000,          // Time to wait for initial connection
      family: 4,                        // Force IPv4 (helps with some network issues)
      retryWrites: true,                // Enable retryable writes
      retryReads: true,                 // Enable retryable reads
    });
    
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📊 Database Name: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error(`🔍 Check your MONGODB_URI environment variable`);
    throw error;
  }
};

export default connectDB;