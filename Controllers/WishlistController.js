const Product = require('../Models/ProductModel');
const Wishlist = require('../Models/WishlistModel');

// const displayWishlist = async (req, res) => {
//     try {
//         // Fetch all items in the wishlist
//         const wishlistItems = await Wishlist.find();

//         if (!wishlistItems || wishlistItems.length === 0) {
//             return res.render('wishlistPage', { products: [] });
//         }

//         // Retrieve product details for each wishlist item
//         const products = await Promise.all(
//             wishlistItems.map(async (item) => {
//                 try {
//                     const product = await Product.findOne({ productID: Number(item.productID) }); // Ensure type match
//                     if (product) {
//                         return {
//                             ...product.toObject(),
//                             dateAdded: item.dateAdded // Add dateAdded from wishlist
//                         };
//                     }
//                     return null; // Handle case where product is not found
//                 } catch (error) {
//                     console.error(`Error fetching product for productID: ${item.productID}`, error);
//                     return null;
//                 }
//             })
//         );

//         // Filter out null products (in case of missing or deleted products)
//         const validProducts = products.filter((product) => product !== null);

//         res.render('wishlistPage', { products: validProducts });
//     } catch (err) {
//         console.error('Error fetching wishlist items:', err);
//         res.status(500).send('Internal Server Error');
//     }
// };


// wishlistController.js

const displayWishlist = async (req, res) => {
    const { page = 1 } = req.query; // Get page number from query string
    const ITEMS_PER_PAGE = 9; // Define how many items to show per page

    try {
        // Count total wishlist items
        const totalItems = await Wishlist.countDocuments();
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
        const currentPage = Math.max(1, Math.min(page, totalPages)); // Ensure valid page range

        // Fetch paginated wishlist items
        const wishlistItems = await Wishlist.find()
            .skip((currentPage - 1) * ITEMS_PER_PAGE)
            .limit(ITEMS_PER_PAGE);

        // Retrieve product details for the paginated wishlist items
        const products = await Promise.all(
            wishlistItems.map(async (item) => {
                try {
                    const product = await Product.findOne({ productID: Number(item.productID) });
                    if (product) {
                        return {
                            ...product.toObject(),
                            dateAdded: item.dateAdded,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error(`Error fetching product for productID: ${item.productID}`, error);
                    return null;
                }
            })
        );

        const validProducts = products.filter((product) => product !== null); // Exclude missing products

        // Render the paginated wishlist
        res.render('wishlistPage', {
            products: validProducts,
            currentPage,
            totalPages,
        });
    } catch (err) {
        console.error('Error fetching wishlist items:', err);
        res.status(500).send('Internal Server Error');
    }
};




const handleWishlist = async (req, res) => {
    const { productID } = req.params;  // Get productID from route parameter
    const { isWished } = req.body;  // Get isWished (true/false) from request body

    console.log(req.params); // Check if productID is coming correctly

    try {
        if (isWished) {
            // Add product to wishlist
            const wishlistItem = new Wishlist({ productID });
            await wishlistItem.save();
            return res.status(200).json({ message: 'Product added to wishlist successfully.' });
        } else {
            // Remove product from wishlist
            await Wishlist.deleteOne({ productID });
            return res.status(200).json({ message: 'Product removed from wishlist successfully.' });
        }
    } catch (err) {
        console.error('Error updating wishlist:', err);
        return res.status(500).json({ message: 'Failed to update wishlist. Please try again.' });
    }
};




const toggleWishlist = async (req, res) => {
    const { productID, isWished } = req.body;

    try {
        if (!isWished) {
            await Wishlist.deleteOne({ productID });
            return res.status(200).json({ message: 'Product removed from wishlist.' });
        }

        const existingItem = await Wishlist.findOne({ productID });
        if (!existingItem) {
            const newItem = new Wishlist({ productID });
            await newItem.save();
            return res.status(200).json({ message: 'Product added to wishlist.' });
        }

        res.status(400).json({ message: 'Product is already in the wishlist.' });
    } catch (err) {
        console.error('Error toggling wishlist:', err);
        res.status(500).send('Internal Server Error');
    }
};

const removeFromWishlist = async (req, res) => {
    const { productID } = req.body;
    try {
      const numericProductID = Number(productID);
      const result = await Wishlist.deleteOne({ productID: numericProductID });
  
      if (result.deletedCount > 0) {
        return res.status(200).json({ message: 'Product removed from wishlist.' });
      } else {
        return res.status(404).json({ message: 'Product not found in wishlist.' });
      }
    } catch (err) {
      console.error('Error removing from wishlist:', err);
      res.status(500).send('Internal Server Error');
    }
  };
  
  

module.exports = {
    handleWishlist,
    displayWishlist,
    toggleWishlist,
    removeFromWishlist,
};

// const toggleWishlist = async (req, res) => {
//     const { productID, isWished } = req.body;

//     if (!productID) {
//         return res.status(400).json({ success: false, message: "Product ID is required." });
//     }

//     try {
//         if (isWished) {
//             // Check if the product is already in the wishlist
//             const exists = await Wishlist.findOne({ productID });
//             if (!exists) {
//                 // Add to Wishlist if it doesn't already exist
//                 const newWishlistItem = new Wishlist({ productID });
//                 await newWishlistItem.save();
//             }
//         } else {
//             // Remove from Wishlist
//             await Wishlist.deleteOne({ productID });
//         }

//         return res.status(200).json({ success: true, message: "Wishlist updated successfully." });
//     } catch (error) {
//         console.error("Error updating wishlist:", error);
//         return res.status(500).json({ success: false, message: "Failed to update wishlist." });
//     }
// };

// const toggleWishlist = async (req, res) => {
//     const { productID, isWished } = req.body;

//     if (!productID) {
//         return res.status(400).json({ success: false, message: "Product ID is required." });
//     }

//     try {
//         if (isWished) {
//             // Add to Wishlist (ensure no duplicate)
//             const exists = await Wishlist.findOne({ productID });
//             if (!exists) {
//                 const newWishlistItem = new Wishlist({ productID });
//                 await newWishlistItem.save();
//             }
//         } else {
//             // Remove from Wishlist
//             await Wishlist.deleteOne({ productID });
//         }

//         return res.status(200).json({ success: true, message: "Wishlist updated successfully." });
//     } catch (err) {
//         console.error('Error updating wishlist:', err);
//         res.status(500).json({ success: false, message: "Failed to update wishlist." });
//     }
// };