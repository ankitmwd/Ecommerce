
# 🛍️ E-Commerce Web Application

A full-stack e-commerce platform built with modern web technologies.

---

## 🌟 Features

- **User Authentication**: Signup, Login, and Password Reset  
- **Product Management**: Browse, search, and filter products  
- **Shopping Cart**: Add/remove items, adjust quantities  
- **Checkout System**: Secure payment processing  
- **Order History**: Track previous orders  
- **Admin Dashboard**: Manage products, users, and orders  
- **Responsive Design**: Works on all devices  

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (with Hooks & Context API)  
- **Redux** (State Management)  
- ****Material UI**, **Chakra UI**, CSS (Styling)
- **Axios** (HTTP Requests)  

### Backend
- **Node.js** (Runtime Environment)  
- **Express.js** (Web Framework)  
- **MongoDB** (Database)  
- **Mongoose** (ODM)  
- **JWT** (Authentication)  

### Payment
- **Stripe API** (Payment Processing)  
![image](https://github.com/user-attachments/assets/69112cc2-3e69-49e0-aa65-b049dded331b)

---

## 🚀 Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/ankitmwd/Ecommerce.git
   cd Ecommerce
   ```

2. **Install Backend Dependencies**  
   ```bash
   cd Ecommerce-backend-main
   npm install
   ```

3. **Install Frontend Dependencies**  
   ```bash
   cd ../Ecommerce-frontend-main
   npm install
   ```

4. **Set Up Environment Variables**  
   Create a `.env` file in the `Ecommerce-backend-main` directory and add the following:  
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

5. **Run the Application**  
   - Start the backend (in one terminal):  
     ```bash
     cd Ecommerce-backend-main
     npm start
     ```
   - Start the frontend (in another terminal):  
     ```bash
     cd ../Ecommerce-frontend-main
     npm start
     ```

   The app should now be running at `http://localhost:3000` (frontend) and `http://localhost:5000` (backend, adjust ports if customized).

---

## 📂 Project Structure

### Backend (`Ecommerce-backend-main`)
```
Ecommerce-backend-main/
├── Routes/
│   ├── CreateProduct.js    # Product creation routes
│   ├── ProductWork.js      # Product-related operations
│   ├── orderRoute.js       # Order management routes
│   ├── paymentroute.js     # Payment processing routes
│   ├── signup.js           # User signup routes
├── database/
│   ├── CartDatabase.js     # Cart schema and operations
│   ├── ProductDatabase.js  # Product schema and operations
│   ├── Seller.js           # Seller schema and operations
│   ├── dataConnection.js   # Database connection setup
│   ├── orderDatabase.js    # Order schema and operations
│   ├── tookenDatabase.js   # Token management (likely JWT)
│   ├── userDatabase.js     # User schema and operations
├── utilis/
│   ├── sendEmail.js        # Email sending utility
├── .gitignore              # Git ignore file
├── package.json            # Backend dependencies
└── server.js               # Main backend server file
```

### Frontend (`Ecommerce-frontend-main`)
```
Ecommerce-frontend-main/
├── public/
│   ├── favicon.ico         # Favicon
│   ├── index.html          # Main HTML file
│   ├── logo192.png         # Logo (192x192)
│   ├── logo512.png         # Logo (512x512)
│   ├── manifest.json       # Web app manifest
│   ├── robots.txt          # Robots file for crawlers
├── src/
│   ├── Components/
│   │   ├── Assests/        # Static assets (images, etc.)
│   │   ├── Auth/           # Authentication components
│   │   ├── Cart/           # Cart components
│   │   ├── CreateProduct/  # Product creation components
│   │   ├── EditProfile/    # Profile editing components
│   │   ├── Footer/         # Footer component
│   │   ├── Header/         # Header component
│   │   ├── Loader/         # Loading spinner component
│   │   ├── Offers/         # Offers display component
│   │   ├── Orders/         # Order display components
│   │   ├── ProductSlider/  # Product slider component
│   │   ├── Profile/        # Profile display components
│   │   ├── Slider/         # General slider component
│   │   ├── Wrapper/        # Wrapper/layout component
│   │   └── data.js         # Component-specific data
│   ├── Pages/
│   │   ├── Authentication/ # Authentication page
│   │   ├── CartPage/       # Cart page
│   │   ├── HomePage/       # Homepage
│   │   ├── ProductPage/    # Products listing page
│   │   ├── SingleProductPage/ # Single product details page
│   │   └── data.js         # Page-specific data
│   ├── Reducers/
│   │   ├── AuthenticationReducer.js # Auth state management
│   │   ├── CardReducer.js  # Cart state management (likely typo: CartReducer.js)
│   │   └── ProductReducer.js # Product state management
│   ├── App.css             # Global styles
│   ├── App.js              # Main app component
│   ├── index.js            # Entry point
│   ├── store.js            # Redux store configuration
├── .gitignore              # Git ignore file
├── package.json            # Frontend dependencies
└── README.md               # This file
```

---

## 📈 Performance of the Site

![Screenshot 2024-07-05 004320](https://github.com/ankitmwd/Ecommerce/assets/170653435/f2b6ca0d-c9c0-4a1e-ab0f-3b6d2c09b3b5)

---

## 🤝 Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---

## 👤 Maintainer

Built and maintained by [ankitmwd](https://github.com/ankitmwd).

---



