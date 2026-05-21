# Accessify Online Platform 🛍️

Accessify is a full-featured MERN (MongoDB, Express, React, Node.js) stack e-commerce web application. The platform includes a customer storefront, a robust backend API, and a dedicated admin management dashboard for adding and removing products.

---

## 🚀 Key Features

### 💻 E-Commerce Storefront (Frontend)
- **User Authentication**: Secure Sign-up and Login using JWT.
- **Shop Catalog**: Browse products categorised by Men, Women, and Kids.
- **Dynamic Cart Management**: Add or remove products with quantities persisting in MongoDB.
- **Product Details Page**: Dedicated pages showcasing individual products with descriptions, pricing, and related recommendations.

### 🛠️ Admin Dashboard
- **Product Management**: Add new products (with image uploading) and delete existing items.
- **Product Listing**: View all products in real-time.
- **Vite-powered Dev Build**: Lightweight and high-speed UI development.

### ⚙️ Backend Server (API)
- **Express REST API**: Routes for managing users, products, authentication, and cart logic.
- **MongoDB Atlas Integration**: Schemas for Users and Products managed with Mongoose.
- **Image Storage Handler**: Locally hosts uploaded product images via `multer`.

---

## 🛠️ Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Frontend** | React, React Router DOM, CSS (Vanilla) |
| **Admin Panel** | React (Vite-built), React Router DOM |
| **Backend API** | Node.js, Express, Multer, JSON Web Tokens (JWT) |
| **Database** | MongoDB Atlas, Mongoose |

---

## 📁 Folder Structure

```text
Accessify_Ecommerce_website-main/
├── admin/               # React + Vite admin dashboard code
├── backend/             # Express server and DB schemas (index.js)
├── ecomm frontend/      # CRA-based customer storefront code
│   └── ecommerc/
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (configured with your connection URI in `backend/index.js`).

---

### Step-by-Step Installation & Setup

#### 1. Setup the Backend Server
1. Navigate into the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   *The server runs on [http://localhost:4000](http://localhost:4000) by default.*

---

#### 2. Setup the Customer Storefront
1. Navigate into the storefront directory:
   ```bash
   cd "ecomm frontend/ecommerc"
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *The storefront opens at [http://localhost:3000](http://localhost:3000).*

---

#### 3. Setup the Admin Dashboard
1. Navigate into the admin panel directory:
   ```bash
   cd admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The admin panel dev URL will be displayed in the terminal (usually [http://localhost:5173](http://localhost:5173)).*

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description | Auth Required? |
| :--- | :--- | :--- | :--- |
| **GET** | `/allproducts` | Retrieve all products in the database | No |
| **POST** | `/upload` | Upload a product image | No |
| **POST** | `/addproduct` | Add a new product to the catalog | No |
| **POST** | `/removeproduct` | Remove a product by ID | No |
| **POST** | `/signup` | Register a new user | No |
| **POST** | `/login` | User login session | No |
| **GET** | `/newcollections` | Retrieve recently added products | No |
| **GET** | `/popularinwomen` | Retrieve featured products in Women category | No |
| **POST** | `/addtocart` | Add product to authenticated user's cart | Yes (`auth-token` header) |
| **POST** | `/removefromcart`| Remove product from authenticated user's cart | Yes (`auth-token` header) |
| **POST** | `/getcart` | Retrieve user's persistent cart data | Yes (`auth-token` header) |

---

## 📜 License
This project is licensed under the ISC License. See `backend/package.json` for details.