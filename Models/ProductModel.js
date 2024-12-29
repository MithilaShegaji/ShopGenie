const mongoose = require("mongoose");
const fs = require('fs');
const path = require('path');

// Platform schema
const platformSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  link: { type: String, required: true },
  price: { type: String, required: true },
  maxprice: { type: String, required: true },
  ratings: { type: Number, required: true }
});

// Main Product schema
const productSchema = new mongoose.Schema({
  productID: { type: Number, required: true },
  category: { type: String, required: true },
  categoryID: { type: Number, required: true }, 
  title: { type: String, required: true },
  image: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now },
  platforms: [platformSchema] // Array of platform objects
});
const Product = mongoose.model('Product', productSchema);


async function populateDataFromJSON() {
  try {
    // Read data from the products.json file
    const jsonData = fs.readFileSync(path.join(__dirname, 'Products.json'), 'utf-8');
    const products = JSON.parse(jsonData); // Parse the JSON data

    for (const product of products) {
      // Add real-time date for dateAdded field
      product.dateAdded = new Date();  // Adds the current date and time

      // Check if the product already exists by a unique field (e.g., productID)
      const existingProduct = await Product.findOne({ productID: product.productID });

      if (!existingProduct) {
        // Insert only if the product doesn't exist
        await Product.create(product);
        // console.log(`Added product: ${product.title}`);
      } else {
        // console.log(`Skipped duplicate product: ${product.title}`);
      }
    }
  } catch (err) {
    console.error('Error inserting data into MongoDB:', err);
  }
}

// Main function to run the process
async function main() {  
  await populateDataFromJSON();     
}

main();

module.exports = Product;
