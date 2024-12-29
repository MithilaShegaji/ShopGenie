const express = require('express');
const router = express.Router();
const { displayWishlist, handleWishlist, toggleWishlist, removeFromWishlist } = require('../Controllers/WishlistController');


// Route to display paginated wishlist items
router.get('/wishlistPage', displayWishlist); // Displays paginated wishlist items

// Route to add a new item to the wishlist
router.post('/add/:productID', handleWishlist);
 

router.post('/toggle', toggleWishlist);

// Route to remove a product from the wishlist
router.post('/remove', removeFromWishlist);

module.exports = router;