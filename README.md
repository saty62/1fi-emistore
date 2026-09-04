# 1Fi EMIStore — Dynamic Product & Mutual Fund Backed EMI Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB.svg)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-1B222D.svg)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791.svg)](https://www.postgresql.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A production-grade, full-stack web application built for the **1Fi SDE1 Assignment**. The platform renders dynamic flagship smartphone product pages with customizable variants (storage and finishes) and flexible EMI plans backed by mutual funds. All data is dynamically queried from a normalized PostgreSQL database via an Express REST API with zero hardcoded values in the frontend.

---

## Table of Contents
1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Visual Reference Alignment](#visual-reference-alignment)
4. [Tech Stack](#tech-stack)
5. [System Architecture](#system-architecture)
6. [Database Schema](#database-schema)
7. [Seed Data](#seed-data)
8. [API Endpoints Documentation](#api-endpoints-documentation)
9. [Local Development & Setup](#local-development--setup)
10. [Automated Testing](#automated-testing)
11. [Deployment Guide](#deployment-guide)
12. [Assignment Compliance Audit](#assignment-compliance-audit)

---

## Overview

Traditional consumer credit often carries high interest rates and rigid approvals. **1Fi EMIStore** showcases next-generation fintech financing where consumers leverage their mutual fund investments to unlock **0% interest** and low-interest EMI tenures for flagship smartphones (such as Apple iPhone 17 Pro, Samsung Galaxy S24 Ultra, and Google Pixel 9 Pro).

The solution strictly adheres to the 1Fi assignment specification:
- Dynamic database retrieval (no hardcoded product or EMI data in frontend components).
- Unique SEO-friendly URLs for each product (`/products/iphone-17-pro`, `/products/samsung-galaxy-s24-ultra`, `/products/google-pixel-9-pro`).
- At least 3 flagship smartphone models with 4 variants each (storage and color finishes).
- 6 to 7 realistic, mathematically verified EMI plans per product with 0% interest tenures, competitive interest rates (e.g., 10.5%), and instant cashback credit (₹5,000 to ₹7,500).
- Interactive plan selection and a digital reservation confirmation flow via `POST /api/emi-plans/select`.

---

## Key Features

- **Dynamic Relational Architecture**: PostgreSQL as the single source of truth; Prisma ORM handles schema migrations, indexes, and type-safe queries.
- **Variant Switching**: Selecting different storage capacities or color finishes updates the high-resolution device preview, price, and MRP instantly.
- **Reference-Accurate EMI Layout**: Stacked EMI cards showing monthly amount, tenure, interest rate badges (`0% interest` / `10.5% interest`), and cashback callouts (`Additional cashback of ₹7,500`).
- **Interactive Selection**: Single-select radio behavior with visual focus, blue border highlights, checkmark indicators, and keyboard accessibility.
- **Proceed Flow Modal**: Clicking "Proceed with EMI" calls the backend confirmation endpoint and opens an accessible modal with complete financial breakdowns (tenure, installment, interest, cashback, net cost, and confirmation ID).
- **Graceful States**: Skeleton shimmer loaders during network requests, 404 "Product not found" handling with redirect buttons, and "Unable to load product" retry handlers.
- **Responsive Design**: Mobile-first architecture tested across 375px, 390px, 768px, 1024px, and 1440px viewports.
- **Accessibility (WCAG)**: Semantic HTML5 (`<header>`, `<main>`, `<nav>`, `<button>`), ARIA radiogroup roles, visible focus rings, and high-contrast typography.

---

## Visual Reference Alignment

The application faithfully captures the layout and design cues from the official 1Fi assignment reference:

| Reference Element | Implementation Detail |
| :--- | :--- |
| **"NEW" Badge** | Rendered on newly launched flagship models |
| **Product Name & Storage** | Dynamic header: `Apple iPhone 17 Pro` • `256GB` |
| **Color Dot Indicators** | "Available in 3 finishes" with circular color swatches under the device |
| **Price & MRP** | Prominent selling price (`₹1,27,400`), strikethrough MRP (`₹1,34,900`), and discount tag |
| **EMI Section Header** | `"EMI plans backed by mutual funds"` |
| **EMI Card Format** | `₹44,967 x 3 months 0% interest` with `Additional cashback of ₹7,500` |
| **Proceed Button** | Prominent "Proceed with EMI" CTA with validation check |

---

## Tech Stack

### Frontend
- **Framework**: React 18.3 + Vite 6
- **Language**: TypeScript 5.7 (Strict mode)
- **Styling**: Tailwind CSS 3.4
- **Routing**: React Router DOM v6
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library

### Backend
- **Runtime**: Node.js v20+ / v22+
- **Server Framework**: Express.js 4.21
- **Language**: TypeScript 5.7
- **Security**: Helmet, CORS
- **Validation**: Zod 3.24
- **Testing**: Vitest + Supertest

### Database & ORM
- **Database**: PostgreSQL 16
- **ORM**: Prisma 6.4

---

## System Architecture

```
PostgreSQL Database
       │
       ▼
  Prisma ORM
       │
       ▼
Express REST API (Layered Architecture: routes → controllers → services)
       │
       ▼
Frontend API Client (productService.ts / api.ts)
       │
       ▼
React Pages & Components (ProductDetailPage, EmiPlanList, VariantSelector)
       │
       ▼
End User Experience (Responsive, Accessible UI)
```

### Monorepo Structure

```
/
├── frontend/
│   ├── public/
│   │   └── images/              # High-resolution SVG product artwork
│   ├── src/
│   │   ├── components/          # Navbar, Footer, ProductCard, ProductGallery,
│   │   │                        # VariantSelector, EmiPlanCard, EmiPlanList,
│   │   │                        # ProceedModal, SkeletonLoader, ErrorState
│   │   ├── pages/               # ProductListingPage, ProductDetailPage, NotFoundPage
│   │   ├── services/            # api.ts, productService.ts
│   │   ├── types/               # TypeScript interfaces
│   │   ├── utils/               # currencyFormatter.ts, emiUtils.ts
│   │   ├── App.tsx              # React Router setup
│   │   ├── main.tsx             # DOM entrypoint
│   │   └── index.css            # Tailwind directives & shimmer animations
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Normalized PostgreSQL schema
│   │   └── seed.ts              # Seed data for 3 products, 12 variants, 19 EMI plans
│   ├── src/
│   │   ├── controllers/         # product.controller.ts, emi.controller.ts
│   │   ├── services/            # product.service.ts, emi.service.ts
│   │   ├── routes/              # product.routes.ts, emi.routes.ts, health.routes.ts
│   │   ├── middleware/          # errorHandler.ts, validateRequest.ts
│   │   ├── schemas/             # Zod validation schemas
│   │   ├── utils/               # emiCalculator.ts, prismaClient.ts
│   │   ├── app.ts               # Express configuration
│   │   └── server.ts            # Server entrypoint
│   ├── tests/                   # API endpoint and calculation tests
│   └── package.json
│
├── docker-compose.yml           # Single-command local PostgreSQL container
├── package.json                 # Monorepo scripts (concurrent execution)
├── .gitignore
├── .env.example
└── README.md
```

---

## Database Schema

```mermaid
erDiagram
    PRODUCT ||--o{ VARIANT : "has many"
    PRODUCT ||--o{ EMI_PLAN : "has many"

    PRODUCT {
        uuid id PK
        string slug UK "Unique slug for routing"
        string name
        string brand
        string description
        string category
        int mrp "MRP in INR"
        int basePrice "Selling price in INR"
        boolean isNew
        datetime createdAt
        datetime updatedAt
    }

    VARIANT {
        uuid id PK
        uuid productId FK
        string color "e.g. Silver, Orange"
        string colorCode "Hex code for swatches"
        string storage "e.g. 256GB, 512GB"
        int mrp "Optional variant override"
        int price "Optional variant override"
        string imageUrl "URL or asset path"
        boolean available
        datetime createdAt
        datetime updatedAt
    }

    EMI_PLAN {
        uuid id PK
        uuid productId FK
        int tenureMonths "e.g. 3, 6, 12, 24, 36, 48, 60"
        int monthlyAmount "Monthly installment in INR"
        float interestRate "Annual rate (0% or 10.5%)"
        int cashbackAmount "Cashback credited in INR"
        int processingFee
        boolean isPopular
        datetime createdAt
        datetime updatedAt
    }
```

---

## Seed Data

The database includes realistic seed data matching the official assignment reference:

### 1. Apple iPhone 17 Pro (`iphone-17-pro`)
- **Base Price**: ₹1,27,400 | **MRP**: ₹1,34,900
- **Variants (4)**:
  - 256GB Silver (`#E3E4E5`)
  - 256GB Cosmic Orange (`#E86A38`)
  - 512GB Silver (`#E3E4E5`)
  - 512GB Cosmic Orange (`#E86A38`)
- **EMI Plans (7)**:
  - 3 Months: ₹44,967 / mo | 0% Interest | ₹7,500 Cashback
  - 6 Months: ₹22,483 / mo | 0% Interest | ₹7,500 Cashback *(Popular)*
  - 12 Months: ₹11,242 / mo | 0% Interest | ₹7,500 Cashback
  - 24 Months: ₹5,621 / mo | 0% Interest | ₹7,500 Cashback
  - 36 Months: ₹4,297 / mo | 10.5% Interest | ₹7,500 Cashback
  - 48 Months: ₹3,385 / mo | 10.5% Interest | ₹7,500 Cashback
  - 60 Months: ₹2,842 / mo | 10.5% Interest | ₹7,500 Cashback

### 2. Samsung Galaxy S24 Ultra (`samsung-galaxy-s24-ultra`)
- **Base Price**: ₹1,29,999 | **MRP**: ₹1,39,999
- **Variants (4)**: 256GB Titanium Black, 256GB Titanium Gray, 512GB Titanium Black, 512GB Titanium Violet
- **EMI Plans (6)**: 3, 6, 12, 24 months (0% interest) and 36, 48 months (11.0% interest) with ₹6,000 cashback.

### 3. Google Pixel 9 Pro (`google-pixel-9-pro`)
- **Base Price**: ₹1,09,999 | **MRP**: ₹1,19,999
- **Variants (4)**: 256GB Obsidian, 256GB Porcelain, 512GB Obsidian, 512GB Hazel
- **EMI Plans (6)**: 3, 6, 12, 24 months (0% interest) and 36, 48 months (10.0% interest) with ₹5,000 cashback.

---

## API Endpoints Documentation

All responses follow a consistent standard:

```json
// Success
{ "success": true, "data": {} }

// Error
{ "success": false, "error": { "message": "...", "details": [] } }
```

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response** `200 OK`:
  ```json
  {
    "status": "ok",
    "service": "1Fi EMI Store API",
    "uptime": 142.3,
    "timestamp": "2026-09-04T10:00:00.000Z"
  }
  ```

### 2. Get All Products
- **Endpoint**: `GET /api/products`
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "c1f7a26b-8d7b-4d77-a89c-d49d9d4a0001",
        "slug": "iphone-17-pro",
        "name": "Apple iPhone 17 Pro",
        "brand": "Apple",
        "category": "smartphones",
        "mrp": 134900,
        "basePrice": 127400,
        "isNew": true,
        "variants": [...],
        "emiPlans": [...]
      }
    ]
  }
  ```

### 3. Get Product by Slug
- **Endpoint**: `GET /api/products/slug/:slug`
- **Example**: `GET /api/products/slug/iphone-17-pro`
- **Response** `200 OK`: Returns full product object with sorted variants and EMI plans.

### 4. Get Product by ID
- **Endpoint**: `GET /api/products/:id`
- **Example**: `GET /api/products/c1f7a26b-8d7b-4d77-a89c-d49d9d4a0001`

### 5. Get Product Variants
- **Endpoint**: `GET /api/products/:productId/variants`

### 6. Get Product EMI Plans
- **Endpoint**: `GET /api/products/:productId/emi-plans`

### 7. Select EMI Plan (Proceed Flow)
- **Endpoint**: `POST /api/emi-plans/select`
- **Request Body**:
  ```json
  {
    "productId": "c1f7a26b-8d7b-4d77-a89c-d49d9d4a0001",
    "variantId": "d2e8b37c-9e8c-5e88-b90d-e50e0e5b0001",
    "emiPlanId": "e3f9c48d-0f9d-6f99-ca1e-f61f1f6c0002"
  }
  ```
- **Response** `200 OK`:
  ```json
  {
    "success": true,
    "message": "EMI plan selected successfully",
    "data": {
      "confirmationId": "CONF-MK2L8Z",
      "selectedAt": "2026-09-04T10:15:30.000Z",
      "product": {
        "id": "c1f7a26b-8d7b-4d77-a89c-d49d9d4a0001",
        "name": "Apple iPhone 17 Pro",
        "slug": "iphone-17-pro",
        "brand": "Apple"
      },
      "variant": {
        "id": "d2e8b37c-9e8c-5e88-b90d-e50e0e5b0001",
        "color": "Cosmic Orange",
        "storage": "256GB",
        "price": 127400,
        "mrp": 134900
      },
      "selectedPlan": {
        "id": "e3f9c48d-0f9d-6f99-ca1e-f61f1f6c0002",
        "tenureMonths": 6,
        "monthlyAmount": 22483,
        "interestRate": 0.0,
        "cashbackAmount": 7500
      },
      "financialBreakdown": {
        "productPrice": 127400,
        "totalPayable": 134898,
        "totalInterestSavedOrPaid": 0,
        "cashbackDiscount": 7500,
        "netEffectiveCost": 127398,
        "financingType": "Mutual Fund Backed Flexible Credit"
      }
    }
  }
  ```

---

## Local Development & Setup

### Prerequisites
- Node.js 20+ (tested on v22)
- npm 10+
- PostgreSQL database (Local, Docker, or Cloud instance such as Neon / Supabase)

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/1fi-emistore.git
cd 1fi-emistore

# Install root, backend, and frontend packages
npm run install:all
```

### 2. Environment Configuration
Create `.env` in `backend/` and `frontend/`:

**`backend/.env`**:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:postgrespassword@localhost:5432/emistore?schema=public"
FRONTEND_URL="http://localhost:5173"
```

**`frontend/.env`**:
```env
VITE_API_URL="http://localhost:5000/api"
```

### 3. Database Initialization (PostgreSQL)

**Option A: Using Docker (Recommended for local dev)**
```bash
docker compose up -d
```

**Option B: Using Cloud PostgreSQL (Neon / Supabase)**
Paste your pooled connection string into `backend/.env` under `DATABASE_URL`.

**Run Migrations & Seed:**
```bash
# Push Prisma schema to PostgreSQL
npm run prisma:push

# Seed products, variants, and EMI plans
npm run prisma:seed
```

### 4. Run Development Servers
From the root directory:
```bash
npm run dev
```
- Backend starts at: `http://localhost:5000`
- Frontend starts at: `http://localhost:5173`

---

## Automated Testing

Run the full automated test suite from the repository root:
```bash
npm test
```

### Included Tests:
- **Backend API Integration Tests (`backend/tests/api.test.ts`)**:
  - `GET /api/health` status and uptime verification
  - `GET /api/products` schema and data response verification
  - `GET /api/products/slug/:slug` positive retrieval & 404 handler
  - `GET /api/products/:id` UUID validation and rejection tests
  - `POST /api/emi-plans/select` Zod request validation and confirmation generation
  - 404 handler for unknown endpoints
- **Financial Calculation Tests (`backend/tests/calculator.test.ts`)**:
  - 0% interest amortization formula verification
  - Standard compounding interest formula verification
  - Tenure validation edge cases
- **Frontend Utility Tests (`frontend/src/utils/currencyFormatter.test.ts`)**:
  - INR currency format validation
  - Discount calculation logic

---

## Deployment Guide

### 1. Database (Neon / Supabase)
1. Create a free PostgreSQL project on [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
2. Copy the `DATABASE_URL` connection string.

### 2. Backend (Render / Railway)
1. Create a new Web Service on [Render](https://render.com) pointing to the `/backend` folder.
2. Build command:
   ```bash
   npm install && npm run prisma:generate && npm run build
   ```
3. Start command:
   ```bash
   npm run start
   ```
4. Set Environment Variables:
   - `DATABASE_URL`: Connection string from Neon/Supabase
   - `PORT`: `5000`
   - `NODE_ENV`: `production`
   - `FRONTEND_URL`: URL of your deployed frontend
5. Run the one-time seed script in Render shell or locally pointing to the remote DB:
   ```bash
   npm run prisma:seed
   ```

### 3. Frontend (Vercel)
1. Deploy the `/frontend` folder to [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Build command: `npm run build` | Output directory: `dist`.
4. Set Environment Variable:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api`
5. Vercel SPA routing is pre-configured via `frontend/vercel.json`.

---

## Assignment Compliance Audit

| # | Official PDF Requirement | Implementation Status | Notes |
| :---: | :--- | :---: | :--- |
| 1 | Dynamic data from backend API connected to database (no hardcoding) | **Implemented** | PostgreSQL + Prisma ORM + Express REST API; 0 hardcoded records |
| 2 | Unique URLs for each product (`/products/iphone-17-pro`, etc.) | **Implemented** | React Router slug routes matching `/products/:slug` |
| 3 | At least 3 products | **Implemented** | Apple iPhone 17 Pro, Samsung S24 Ultra, Google Pixel 9 Pro |
| 4 | 2+ variants per product (color, finish, storage) | **Implemented** | 4 variants per product (256GB/512GB in Silver, Orange, Black, etc.) |
| 5 | Available EMI plans with monthly amount, tenure, interest, cashback | **Implemented** | Exact reference values (0% & 10.5% interest, ₹7,500 cashback, etc.) |
| 6 | Selectable EMI plans with visual active state | **Implemented** | Accessible radiogroup, highlighted border, and checkmark indicator |
| 7 | Button to proceed with selected plan | **Implemented** | "Proceed with EMI" button calls backend and triggers summary modal |
| 8 | Backend REST APIs (`/api/products`, `/:id`, `/slug/:slug`, `POST /select`) | **Implemented** | Layered controllers, services, and Zod validation middleware |
| 9 | Database schema with proper relationships & normalization | **Implemented** | Product → Variant (1:N), Product → EmiPlan (1:N) with foreign keys |
| 10 | Seed data script | **Implemented** | `prisma/seed.ts` populates full catalog with clean execution |
| 11 | Responsive UI (Desktop, Laptop, Tablet, Mobile) | **Implemented** | Mobile-first Tailwind grid with zero horizontal scroll |
| 12 | Loading / Error / Empty states | **Implemented** | Shimmer skeleton loaders, 404 state, retry buttons, empty plan fallback |
| 13 | High-quality image strategy | **Implemented** | Vector SVG graphics for every phone model & color + fallback handler |
| 14 | Automated tests | **Implemented** | 16 automated tests across backend and frontend passing cleanly |
| 15 | Deployment readiness | **Implemented** | `render.yaml`, `vercel.json`, and environment variable decoupling |
| 16 | Comprehensive README with setup, schema, and API docs | **Implemented** | Complete documentation with exact commands and JSON payloads |

---

## License
MIT License. Built for the 1Fi Software Development Engineer (SDE1) Assignment.
