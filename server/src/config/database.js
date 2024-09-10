const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });


const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("mongodb:", process.env.MONGODB_URI)
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      console.log("mongodb:", process.env.MONGODB_URI)
      process.exit(1); 
    }
  };  

module.exports = connectDB;