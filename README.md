# ShopVerse — MERN E-Commerce Application

Full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js) using TypeScript.

## Tech Stack

### Backend
- **Runtime**: Node.js + Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Auth**: JWT (JSON Web Tokens)
- **Architecture**: MVC (Model-View-Controller)
- **Validation**: express-validator

### Frontend
- **Framework**: React 19 with TypeScript
- **Build**: Vite
- **UI**: Bootstrap 5 + Bootstrap Icons
- **State**: Redux Toolkit
- **HTTP**: Axios with JWT interceptor
- **Routing**: React Router v7

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (default: `mongodb://localhost:27017/ecommerce`)

### Backend

```bash
cd server
npm install
npm run dev        # Starts on http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev        # Starts on http://localhost:5173
```

## Project Structure

```
├── server/                 # Backend API
│   └── src/
│       ├── config/         # DB & env config
│       ├── controllers/    # Request handlers
│       ├── middleware/      # Auth, error, validation
│       ├── models/         # Mongoose schemas
│       ├── routes/         # Express routes
│       ├── services/       # Business logic
│       ├── types/          # TypeScript types
│       ├── utils/          # Helpers
│       └── app.ts          # Entry point
└── client/                 # React Frontend
    └── src/
        ├── api/            # Axios instances & API calls
        ├── components/     # Reusable UI components
        ├── hooks/          # Custom React hooks
        ├── pages/          # Route-level pages
        ├── routes/         # Routing config
        ├── store/          # Redux Toolkit store & slices
        └── types/          # Shared TypeScript types
```

## API Endpoints

| Method | Endpoint                | Auth   | Description           |
|--------|------------------------|--------|-----------------------|
| POST   | /api/auth/register     | No     | Register user         |
| POST   | /api/auth/login        | No     | Login, returns JWT    |
| GET    | /api/auth/profile      | Yes    | Get current user      |
| GET    | /api/products          | No     | List/search products  |
| GET    | /api/products/:id      | No     | Product detail        |
| POST   | /api/products          | Admin  | Create product        |
| PUT    | /api/products/:id      | Admin  | Update product        |
| DELETE | /api/products/:id      | Admin  | Delete product        |
| GET    | /api/categories        | No     | List categories       |
| GET    | /api/cart              | Yes    | Get user cart         |
| POST   | /api/cart              | Yes    | Add to cart           |
| DELETE | /api/cart/:productId   | Yes    | Remove from cart      |
| POST   | /api/orders            | Yes    | Place order           |
| GET    | /api/orders            | Yes    | User's orders         |
| GET    | /api/orders/all        | Admin  | All orders            |
| PUT    | /api/orders/:id/status | Admin  | Update order status   |
