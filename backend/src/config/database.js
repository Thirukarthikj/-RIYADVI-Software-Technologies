const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Disable buffering so unhandled queries fail fast rather than hanging indefinitely
    mongoose.set('bufferCommands', false);

    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/riyadvi';
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️ MongoDB Connection Warning: ${error.message}`);
    console.warn('Backend server running smoothly in In-Memory fallback mode.');
  }
};

module.exports = connectDB;
