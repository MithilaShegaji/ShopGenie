# ShopGenie

ShopGenie is a shopping platform that aggregates product prices from various websites like Amazon, Flipkart, and Myntra. It suggests the best platform for purchasing based on product ratings and the lowest available prices.

## Features

- **Price Comparison:** View and compare product prices across multiple e-commerce platforms.
- **Best Purchase Suggestions:** Receive recommendations on the optimal platform to buy from, considering both price and user ratings.
- **User Authentication:** Secure user registration and login functionalities.
- **Email Notifications:** Get notified about price drops and special offers via email.

## Demo
### Home page
![navbar](assets/navbar.jpg)
![home page](assets/home_page.jpg)

### Price Comparison
![Price Comparison](assets/price_comparison.jpg)

### Best Purchase Suggestions
![Best Purchase Suggestions](assets/best_purchase_suggestions.jpg)

### User Authentication
![User Authentication](assets/user_authentication.jpg)

### Email Notifications
![Email Notifications](assets/email_notifications.jpg)

## How It Works

### Data Flow
1. **User Authentication:** Users sign up and log in to the system. Credentials are securely stored and verified.
2. **Product Search:** Users search for a product, and the platform retrieves prices and ratings from multiple e-commerce sites.
3. **Price Comparison:** Prices are displayed in a user-friendly format, allowing quick comparison.
4. **Best Suggestion:** Based on the lowest price and ratings, the system recommends the best platform for purchasing the product.

### Persistent Data Storage
- Uses MongoDB for storing user data and session management.
- User preferences and search history can be stored for a personalized experience.

### Technologies Used
- **Frontend:** EJS for templating and creating dynamic user interfaces.
- **Backend:** Express.js for server-side logic and handling API requests.
- **Database:** MongoDB for storing user and product data.
- **Authentication:** JWT (JSON Web Token) for secure user authentication.
- **Email Service:** Nodemailer for sending notifications and updates.

## Code Overview

- **Server Setup:**
  - `server.js`: The entry point of the application, sets up middleware, routes, and starts the server.
- **Routes:**
  - `authRoutes.js`: Handles user authentication (sign up, log in, log out).
  - `productRoutes.js`: Handles product search and comparison logic.
- **Models:**
  - `User.js`: Defines the user schema for MongoDB.
  - `Product.js`: Manages product-related data structures.
- **Utilities:**
  - `emailService.js`: Handles email notifications.
  - `authMiddleware.js`: Middleware for protecting routes.

## Special Features

- **Persistent Data:** User and product data are stored in MongoDB, ensuring data is not lost between sessions.
- **Recommendation System:** Provides intelligent recommendations for purchasing based on ratings and prices.
- **Email Notifications:** Keeps users updated with price drops and special offers.

## Getting Started

### Prerequisites
- Node.js and npm installed. [Download Node.js](https://nodejs.org)
- MongoDB server running locally or on a cloud platform. [Install MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adityadhanraj14/ShopGenie.git
   cd ShopGenie
   ```

2. Install dependencies:
   ```bash
   npm install bcrypt@^5.1.1 cookie-parser@^1.4.7 dotenv@^16.4.7 ejs@^3.1.10 express@^4.21.2 express-session@^1.18.1 jsonwebtoken@^9.0.2 mongoose@^8.9.2 nodemailer@^6.9.16 nodemon@^3.1.9 validator@^13.12.0
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=your_port_number
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   EMAIL_USER=your_email_address
   EMAIL_PASS=your_email_password
   ```

4. Start the application:
   ```bash
   npm start
   ```

   For development:
   ```bash
   npm run dev
   ```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries or support, please contact [mithilashegaji](https://github.com/MithilaShegaji).

---

*Note: This project is for educational purposes only and is not affiliated with Amazon, Flipkart, Myntra, or any other e-commerce platforms.*
