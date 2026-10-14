# 🧸 ToyVerse — Premium Toy E-Commerce Platform

A production-ready, full-stack Indian toy e-commerce web application inspired by top Indian online retail experiences (FirstCry, Hamleys India). Built with modern React, TypeScript, Tailwind CSS, Node.js, Express, and MongoDB.

---

## 📸 UI & Layout Reference Alignment

The application recreates the 7 primary screens from the reference design:
1. **Home Page**: Cheerful pastel header with custom ToyVerse branding, search bar with live auto-suggestions, "Play. Learn. Grow." hero banner with 3-slide auto-rotation, 4 Trust cards (Free Shipping above ₹999, Easy Returns, Secure Payment, Best Quality), "Shop by Category" circular cards, "Best Selling Toys" 4-column card grid, and weekly promotional discount banner.
2. **Product Listing Page (`/shop`)**: Left-hand filter sidebar (Category checkboxes with counts, Age groups, Brands, Interactive Price Slider ₹0–₹5,000, Star Ratings, In Stock toggle), Sort by popularity/price/rating/discount dropdown, 3/4-column product grid, and interactive pagination `[1] [2] [3] [4] [5] [>]`.
3. **Product Details Page (`/product/:slug`)**: Left gallery with vertical thumbnail strip & large image with smooth zoom; Right panel with Title, Ratings, Indian Rupee prices (₹), Discount badges, Stock status, Age Group pill, Brand, Quantity stepper `[-] 1 [+]`, "Add to Cart" and "Buy Now" CTA buttons; Tabbed Description, Specifications, and Customer Reviews with rating submission.
4. **Shopping Cart Page (`/cart`)**: Item selection checkboxes, quantity controls, dynamic subtotal, coupon input supporting `WELCOME10`, `TOY20`, and `SAVE500`, and "Proceed to Checkout" button.
5. **Checkout Page (`/checkout`)**: 4-step progress stepper (Cart → Address → Payment → Confirm), saved delivery address cards (Syed Ahmed, Nusreth Mohammed) with edit/add modals, multi-option payment selectors (Razorpay, UPI, Credit/Debit Card, COD), order summary, and order placement with confetti celebration.
6. **Authentication Page (`/login`, `/register`)**: Tabbed Login and Signup forms, password visibility toggles, social login options, and 1-click **Demo Customer** and **Demo Admin** login buttons for instant evaluation.
7. **Admin Dashboard (`/admin`)**: Dark navy sidebar navigation, live database metrics (Total Orders, Total Revenue, Total Customers, Total Products), interactive 6-month dual-line Sales Overview chart, and Recent Orders status table.

---

## 🛠️ Technology Stack

### Frontend
- **Framework**: React 19 + Vite + TypeScript
- **Styling**: Tailwind CSS (Custom pastel palette, rounded tokens, micro-animations)
- **Icons**: Lucide React
- **Routing**: React Router v7
- **Effects**: Canvas Confetti for celebratory order confirmation

### Backend
- **Runtime**: Node.js v20+ / v24+
- **Server**: Express.js with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Resilience**: Automatic in-memory MongoDB fallback via `mongodb-memory-server` when local MongoDB daemon is not running — runs out-of-the-box with zero setup!
- **Auth**: JWT (JSON Web Tokens) with `bcryptjs` password hashing
- **Payments**: Razorpay environment structure with demo transaction flow

---

## 📂 Project Structure

```
toy-e-commer/
├── package.json              # Root workflow manager
├── backend/                  # REST API Backend
│   ├── src/
│   │   ├── config/           # Database connection & memory fallback
│   │   ├── models/           # Mongoose schemas (User, Product, Category, Order, etc.)
│   │   ├── controllers/      # Business logic handlers
│   │   ├── routes/           # Express API endpoints
│   │   ├── middleware/       # Auth guards & error handlers
│   │   ├── seed/             # 42+ products & realistic Indian test dataset
│   │   └── server.ts         # Express server entry point
│   ├── .env                  # Backend environment settings
│   ├── .env.example          # Template environment file
│   └── package.json
└── frontend/                 # Vite React TypeScript Frontend
    ├── src/
    │   ├── components/       # Header, Footer, Hero, Cards, AdminLayout
    │   ├── context/          # Auth, Cart, Wishlist, Toast state providers
    │   ├── pages/            # Home, Shop, Product, Cart, Checkout, Admin, etc.
    │   ├── services/         # API fetch client
    │   ├── types/            # TypeScript data interfaces
    │   └── App.tsx           # Router & layout wiring
    ├── tailwind.config.js    # Custom brand color tokens
    └── vite.config.ts        # API proxy configuration
```

---

## 🚀 Quick Start & Installation

### 1. Install Dependencies
Run from the root directory:
```bash
npm run install:all
```
*(Or install inside `backend` and `frontend` separately via `cd backend && npm install` and `cd frontend && npm install`)*

### 2. Environment Variables
The `.env` file in `backend/.env` is pre-configured with safe defaults:
```env
PORT=5001
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/toyverse
JWT_SECRET=toyverse_super_secret_jwt_key_2026_secure
RAZORPAY_KEY_ID=rzp_test_placeholder_key_id
RAZORPAY_KEY_SECRET=rzp_test_placeholder_secret
CLIENT_URL=http://localhost:5173
```

### 3. Run Development Servers
Start both backend and frontend concurrently with a single command:
```bash
npm run dev
```

Or run them individually in separate terminals:
- **Backend**:
  ```bash
  npm run dev:backend
  ```
  *(API runs at `http://localhost:5001/api`)*
- **Frontend**:
  ```bash
  npm run dev:frontend
  ```
  *(App runs at `http://localhost:5173` or `http://localhost:5174`)*

---

## 🔑 Demo Login Credentials

Pre-seeded demo credentials are ready to use. On the `/login` screen, you can also use the **1-Click Demo Login** buttons:

| Role | Email | Password |
|---|---|---|
| **Store Admin** | `admin@toyverse.com` | `Admin@12345` |
| **Demo Customer** | `customer@toyverse.com` | `Customer@12345` |

---

## 🏷️ Test Coupons

Test the coupon discount logic on the Cart or Checkout screen:

- `WELCOME10`: 10% Off (Min. order ₹499, Cap ₹300)
- `TOY20`: 20% Off (Min. order ₹999, Cap ₹600)
- `SAVE500`: Flat ₹500 Off (Min. order ₹2,499)
- `KIDS15`: 15% Off (Min. order ₹799)
- `SUMMER25`: 25% Off (Min. order ₹1,499)

---

## 📚 REST API Documentation

### Auth
- `POST /api/auth/register` — Register a new customer
- `POST /api/auth/login` — Login with email/phone & password
- `GET /api/auth/profile` — Get authenticated user details (JWT required)
- `PUT /api/auth/profile` — Update name, phone, or password
- `POST /api/auth/forgot-password` — Password reset flow

### Products
- `GET /api/products` — Filter products by category, brand, age, price, rating, search query
- `GET /api/products/:identifier` — Get product by slug or MongoDB ObjectId (includes related toys)
- `GET /api/products/bestsellers` — Top rated bestsellers
- `POST /api/products` — Create product (Admin only)
- `PUT /api/products/:id` — Update product details (Admin only)
- `DELETE /api/products/:id` — Delete product (Admin only)

### Orders
- `POST /api/orders` — Create order, deduct stock, and register tracking history
- `GET /api/orders/my-orders` — Customer orders history
- `GET /api/orders/:id` — Single order breakdown with shipment timeline
- `GET /api/orders` — All orders list (Admin only)
- `PUT /api/orders/:id/status` — Update order status (Admin only)

### Coupons & Cart
- `POST /api/coupons/validate` — Validate promo code against current cart subtotal
- `GET /api/cart` — Retrieve user cart
- `POST /api/cart` — Add or increment item
- `PUT /api/cart/:itemId` — Modify item quantity
- `DELETE /api/cart/:itemId` — Remove item

### Admin
- `GET /api/admin/dashboard` — Live counts, total revenue, 6-month chart dataset, and recent orders
- `GET /api/admin/inventory` — Stock levels, low stock warnings (≤ 5 units), and out of stock items
- `PUT /api/admin/inventory/:id/stock` — Quick stock level restock

---

## 🚢 Production Build & Deployment

To generate optimized production bundles:
```bash
npm run build
```
This builds both the backend (`backend/dist`) and frontend (`frontend/dist`) using TypeScript and Vite.



-----------------------------------------------------------------------

1. frontend/index.css
2. backend/src/models/Order.ts
3. backend/src/models/User.ts
4. backend/src/models/Product.ts
5. backend/src/models/Cart.ts
6. backend/src/models/Coupon.ts
7. backend/src/controllers/orderController.ts
8. backend/src/routes/orderRoutes.ts
9. backend/src/routes/authRoutes.ts
10. backend/src/routes/productRoutes.ts
11. backend/src/routes/couponRoutes.ts
12. backend/src/routes/cartRoutes.ts
13. backend/src/middleware/authMiddleware.ts
14. backend/src/utils/generateToken.ts
15. backend/src/utils/sendEmail.ts
16. backend/src/server.ts
17. frontend/src/pages/HomePage.tsx
18. frontend/src/pages/ProductDetailsPage.tsx
19. frontend/src/pages/CartPage.tsx
20. frontend/src/pages/CheckoutPage.tsx
21. frontend/src/pages/OrderConfirmationPage.tsx
22. frontend/src/pages/ShopPage.tsx
23. frontend/src/pages/CategoryPage.tsx
24. frontend/src/pages/WishlistPage.tsx
25. frontend/src/pages/AccountPage.tsx
26. frontend/src/pages/OrderHistoryPage.tsx
27. frontend/src/pages/OrderDetailPage.tsx
28. frontend/src/pages/admin/AdminDashboardPage.tsx
29. frontend/src/pages/admin/AdminProductsPage.tsx
30. frontend/src/pages/admin/AdminOrdersPage.tsx
31. frontend/src/pages/admin/AdminCustomersPage.tsx
32. frontend/src/pages/admin/AdminCouponsPage.tsx
33. frontend/src/pages/admin/AdminSettingsPage.tsx
34. frontend/src/pages/admin/AdminInventoryPage.tsx
35. frontend/src/pages/admin/AdminCategoriesPage.tsx
36. frontend/src/services/api.ts
37. frontend/src/context/AuthContext.tsx
38. frontend/src/context/CartContext.tsx
39. frontend/src/context/WishlistContext.tsx
40. frontend/src/components/wondertoys/ui/ProductCard.tsx
41. frontend/src/components/wondertoys/ui/AdminHeader.tsx
42. frontend/src/components/wondertoys/ui/AdminSidebar.tsx
43. frontend/src/components/wondertoys/ui/ProductGrid.tsx
44. frontend/src/components/wondertoys/ui/FilterSidebar.tsx
45. frontend/src/components/wondertoys/ui/CheckoutStepper.tsx
46. frontend/src/components/wondertoys/ui/AddressModal.tsx
47. frontend/src/components/wondertoys/ui/AdminAnalyticsChart.tsx
48. frontend/src/App.tsx
49. frontend/vite.config.ts
50. package.json
51. backend/package.json
52. backend/src/config/db.ts