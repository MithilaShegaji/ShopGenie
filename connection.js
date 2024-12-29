// connection.js
const mongoose = require("mongoose");

// MongoDB Connection function using async/await
const connectToMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application if the connection fails
  }
};

module.exports = { connectToMongoDB };
