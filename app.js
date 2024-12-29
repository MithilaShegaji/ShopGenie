// app.js
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connection"); // Import the MongoDB connection function
const productRoute = require("./Routes/ProductRoutes");
const wishlistRoute = require("./Routes/WishlistRoutes");
const categoryRoutes = require("./Routes/CategoryRoutes");

const PORT = 3000;

// MongoDB URI
const mongoURI = "mongodb://127.0.0.1:27017/ShopGenie";

// Set up the Express app
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Set View Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/products", productRoute); // Product-related routes
app.use("/wishlist", wishlistRoute); // Wishlist-related routes
app.use("/index",categoryRoutes);

// Route for indexPage
app.get('/indexPage', (req, res) => {
  res.render('indexPage', { errorMessage: null });
});

// Connect to MongoDB and start the server after the connection is successful
connectToMongoDB(mongoURI)
  .then(() => {
    // Start Server only after the MongoDB connection is established
    app.listen(PORT, () => {
      console.log(`Click on http://localhost:${PORT}/indexPage`);
      console.log(`Click on http://localhost:${PORT}/wishlist/wishlistPage`);
    });
  })
  .catch((err) => {
    console.error("Error while starting the server:", err);
  });
