const mongoose = require('mongoose');

// Wishlist Schema
const wishlistSchema = new mongoose.Schema({
  productID: { type: Number, required: true }, // Referencing the product ID
  dateAdded: { type: Date, default: Date.now }
});

// Create Wishlist Model
const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
