function recommendBestProduct(productName, platforms, productLink) {
    let maxScore = -Infinity;
    let bestPlatform = null;

    const maxPrice = Math.max(...platforms.map(p => parseFloat(p.price) || 0));
    const maxRating = Math.max(...platforms.map(p => parseFloat(p.ratings) || 0));

    platforms.forEach(platform => {
      const normalizedPrice = maxPrice > 0 ? (parseFloat(platform.price) || 0) / maxPrice : 1;
      const normalizedRating = maxRating > 0 ? (parseFloat(platform.ratings) || 0) / maxRating : 0;
      const score = 0.7 * normalizedRating - 0.3 * normalizedPrice;

      if (score > maxScore) {
        maxScore = score;
        bestPlatform = platform;
      }
    });

    if (bestPlatform) {
      document.getElementById('recommended-product-name').innerText = productName;
      document.getElementById('recommended-product-price').innerText = `₹${bestPlatform.price}`;
      document.getElementById('recommended-product-rating').innerText = bestPlatform.ratings;
      document.getElementById('recommended-product-platform').innerText = bestPlatform.name;
      document.getElementById('recommended-product-link').href = bestPlatform.link;

      const modal = new bootstrap.Modal(document.getElementById('recommendedModal'));
      modal.show();
    }
  }

  function addtowishlist(productID) {
    // Select the button based on the onclick event.
    const button = document.querySelector(`[onclick="addtowishlist('${productID}')"]`);

    // Toggle the 'active' class, which would change the icon's state (e.g., heart to filled).
    const isActive = button.classList.toggle("active"); // This changes the class to toggle the icon

    // Make a POST request to the backend to add or remove the product from the wishlist
    fetch(`/wishlist/toggle`, {  // Endpoint for toggling the wishlist
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ productID: productID, isWished: isActive }) // Pass productID and isActive in the body
    })
    .then(response => response.json())
    .then(response => {
      if (response.message) {
        alert(response.message);
      } else {
        alert("Failed to update wishlist on the server.");
      }
    })
    .catch(error => {
      alert("An error occurred while updating the wishlist.");
      console.error(error);
    });
  }
 
 
 // Function to remove product from the wishlist
 function removeFromWishlist(productID) {
    const button = document.querySelector(
      `[onclick="removeFromWishlist('${productID}')"]`
    );

    // Send a request to remove the product from the wishlist
    fetch(`/wishlist/remove`, {
      // Your backend endpoint for removing product from wishlist
      method: "POST", // We are sending a POST request to the backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productID: productID }), // Send productID in the request body
    })//send the requent to the route , got it?
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          alert(response.message); // Display the success message from the backend 

          // Remove the product element from the DOM (frontend)
          const productElement = document.querySelector(
            `[data-product-id="${productID}"]`
          );
          window.location.reload(100);
        } else {
          alert("Failed to remove product from wishlist.");
        }
      })
      .catch((error) => {
        alert(
          "An error occurred while removing the product from the wishlist."
        );
        console.error(error);
      });
  }
  // Function to recommend the best product
  function recommendBestProduct(title, platforms, link) {
    alert(`Recommendation triggered for ${title}`);
  }