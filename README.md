# 💰 Loopr - Personal Finance Management System

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://your-loopr-app.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Live-blue?style=for-the-badge&logo=render)](https://loopr-backend-2idj.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Source-black?style=for-the-badge&logo=github)](https://github.com/rohitshimpi737/loopr-fullstack)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.0-007FFF?style=flat&logo=mui)](https://mui.com/)

</div>

> 🚀 A comprehensive full-stack personal finance management application that helps users track expenses, manage budgets, and gain insights into their financial habits with modern web technologies.

## 🌟 Project Overview

Loopr is a **modern, enterprise-grade** finance management platform built with cutting-edge technologies. It provides users with powerful tools to track expenses, categorize transactions, visualize spending patterns, and export financial data for comprehensive analysis.

### ✨ What Makes Loopr Special

🎯 **Smart Financial Tracking** - Intelligent categorization and real-time insights  
📊 **Data-Driven Decisions** - Advanced analytics and visualization tools  
🔒 **Bank-Level Security** - JWT authentication with encrypted data storage  
🎨 **Beautiful Interface** - Modern Material-UI design with dark/light themes  
⚡ **Lightning Fast** - Optimized performance with real-time updates  
📱 **Cross-Platform** - Responsive design for all devices  

### 🎯 Key Features

<table>
<tr>
<td width="50%">

**📊 Dashboard Analytics**
- Real-time financial insights
- Interactive spending trends
- Monthly/yearly comparisons
- Category-wise breakdowns

**💳 Transaction Management**
- Quick add/edit transactions
- Smart categorization
- Bulk operations support
- Advanced search & filters

</td>
<td width="50%">

**📈 Visual Reports**
- Interactive charts & graphs
- Spending pattern analysis
- Income vs expense tracking
- Custom date range reports

**🔐 Secure Authentication**
- JWT-based user sessions
- Password encryption
- Protected API endpoints
- Role-based access control

</td>
</tr>
</table>

**Additional Features:**
- 📋 **Export Functionality** - CSV/PDF export with custom filters
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile
- 🎨 **Modern UI/UX** - Clean, intuitive Material-UI components
- ⚡ **Real-time Updates** - Live data synchronization across sessions

## 🏗️ Architecture Overview

<div align="center">
<img src="https://via.placeholder.com/800x400/667eea/ffffff?text=Loopr+Architecture" alt="Loopr Architecture" width="800"/>
</div>

### 📁 Project Structure

```
loopr-fullstack/
├── 🎨 frontend/                     # React TypeScript SPA
│   ├── src/
│   │   ├── 🧩 components/           # Reusable UI components
│   │   │   ├── Layout.tsx           # Main app layout
│   │   │   ├── ProtectedRoute.tsx   # Route protection
│   │   │   ├── DeveloperFooter.tsx  # Footer component
│   │   │   ├── DeveloperBanner.tsx  # Banner component
│   │   │   └── ProjectInfo.tsx      # Project information
│   │   ├── 📄 pages/               # Application pages/routes
│   │   │   ├── LoginPage.tsx        # User authentication
│   │   │   ├── RegisterPage.tsx     # User registration
│   │   │   ├── DashboardPage.tsx    # Main dashboard
│   │   │   └── TransactionsPage.tsx # Transaction management
│   │   ├── 🔗 services/            # API service layer
│   │   │   ├── apiService.ts        # HTTP client setup
│   │   │   └── authService.ts       # Authentication logic
│   │   ├── 🎯 contexts/            # React Context providers
│   │   │   ├── AuthContext.tsx      # Auth state management
│   │   │   └── AlertContext.tsx     # Alert notifications
│   │   ├── 🎨 theme/               # Material-UI themes
│   │   │   └── darkTheme.ts         # Dark mode configuration
│   │   └── 📝 types/               # TypeScript definitions
│   │       └── index.ts             # Type exports
│   ├── 🌐 public/                  # Static assets
│   ├── 📦 package.json             # Dependencies & scripts
│   ├── ⚙️ vite.config.ts           # Vite configuration
│   └── 🚀 vercel.json              # Deployment config
├── ⚙️ backend/                      # Node.js Express API
│   ├── src/
│   │   ├── 📊 models/              # MongoDB data models
│   │   │   ├── User.ts              # User schema
│   │   │   └── Transaction.ts       # Transaction schema
│   │   ├── 🛣️ routes/              # API route handlers
│   │   │   ├── auth.ts              # Authentication routes
│   │   │   ├── transactions.ts      # Transaction CRUD
│   │   │   ├── dashboard.ts         # Dashboard analytics
│   │   │   └── export.ts            # Data export routes
│   │   ├── 🛡️ middleware/          # Express middleware
│   │   │   └── auth.ts              # JWT verification
│   │   ├── ⚡ services/            # Business logic layer
│   │   │   ├── transactionService.ts # Transaction logic
│   │   │   └── dashboardService.ts   # Analytics logic
│   │   ├── ⚙️ config/              # App configuration
│   │   │   └── database.ts          # MongoDB connection
│   │   ├── 🔧 scripts/             # Utility scripts
│   │   │   └── importTransactions.ts # Data seeding
│   │   └── 📝 types/               # TypeScript interfaces
│   │       ├── index.ts             # Common types
│   │       └── global.d.ts          # Global type augmentation
│   ├── 📂 data/                    # Sample data files
│   │   ├── users.json               # Sample users
│   │   └── transactions.json        # Sample transactions
│   ├── 📦 package.json             # Dependencies & scripts
│   └── ⚙️ tsconfig.json            # TypeScript config
├── 📚 README.md                    # Project documentation
└── 🔐 .env.example                 # Environment template
```

### 🔄 Data Flow

1. **Frontend** → API calls via Axios
2. **Backend** → JWT validation → MongoDB operations
3. **Database** → Response data → Frontend state update
4. **UI** → Real-time updates via React Context

## 🛠️ Tech Stack

<div align="center">

### Frontend Technologies
<img src="https://skillicons.dev/icons?i=react,typescript,vite,materialui" />

### Backend Technologies  
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,jwt" />

### Development Tools
<img src="https://skillicons.dev/icons?i=git,github,vscode,vercel" />

</div>

### 📱 Frontend Stack
<table>
<tr>
<th>Technology</th>
<th>Version</th>
<th>Purpose</th>
<th>Why Chosen</th>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black" /></td>
<td>^18.2.0</td>
<td>UI Framework</td>
<td>Component-based architecture, Virtual DOM, Rich ecosystem</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" /></td>
<td>^5.0.0</td>
<td>Type Safety</td>
<td>Better developer experience, Compile-time error checking</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" /></td>
<td>^4.4.0</td>
<td>Build Tool</td>
<td>Fast HMR, Optimized builds, Modern ES modules</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Material--UI-007FFF?style=flat&logo=mui&logoColor=white" /></td>
<td>^5.14.0</td>
<td>UI Library</td>
<td>Pre-built components, Consistent design, Accessibility</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white" /></td>
<td>^6.15.0</td>
<td>Routing</td>
<td>Client-side navigation, Protected routes, Dynamic routing</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white" /></td>
<td>^1.5.0</td>
<td>HTTP Client</td>
<td>Request/response interceptors, Error handling, Promise-based</td>
</tr>
</table>

### ⚙️ Backend Stack
<table>
<tr>
<th>Technology</th>
<th>Version</th>
<th>Purpose</th>
<th>Why Chosen</th>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white" /></td>
<td>^18.0.0</td>
<td>Runtime</td>
<td>JavaScript everywhere, NPM ecosystem, High performance</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white" /></td>
<td>^4.18.0</td>
<td>Web Framework</td>
<td>Minimalist, Flexible middleware, Large community</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white" /></td>
<td>^6.0.0</td>
<td>Database</td>
<td>Document-based, Flexible schema, Horizontal scaling</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=mongoose&logoColor=white" /></td>
<td>^7.5.0</td>
<td>ODM</td>
<td>Schema validation, Middleware, Query building</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white" /></td>
<td>^9.0.0</td>
<td>Authentication</td>
<td>Stateless auth, Secure token-based, Cross-domain support</td>
</tr>
<tr>
<td><img src="https://img.shields.io/badge/bcrypt-338C5E?style=flat&logo=security&logoColor=white" /></td>
<td>^2.4.0</td>
<td>Password Hash</td>
<td>Secure hashing, Salt rounds, Industry standard</td>
</tr>
</table>

## 📄 Application Pages & Features

### 🔐 Authentication System

<table>
<tr>
<td width="50%">

#### 🔑 Login Page (`/login`)
- **Email/Password Authentication**
- **Form Validation** with real-time feedback
- **Error Handling** for invalid credentials
- **Auto-redirect** to dashboard on success
- **Project Information** showcase
- **Remember Me** functionality
- **Password Reset** link

</td>
<td width="50%">

#### ✍️ Register Page (`/register`)
- **Account Creation** with validation
- **Email Uniqueness** checking
- **Password Strength** requirements
- **Terms & Conditions** acceptance
- **Auto-login** after registration
- **Welcome Email** trigger
- **Profile Setup** guidance

</td>
</tr>
</table>

---

### 📊 Dashboard Hub (`/dashboard`)

<details>
<summary><b>🎯 Financial Overview Cards</b></summary>

- 💰 **Total Balance Display** with trend indicators
- 📈 **Monthly Income Summary** with growth percentage
- 📉 **Monthly Expense Breakdown** with category insights
- 🔢 **Transaction Count Statistics** with comparisons
- ⚡ **Quick Action Buttons** for instant operations
- 🎨 **Interactive Animations** for engaging experience

</details>

<details>
<summary><b>📋 Recent Transactions Panel</b></summary>

- 🕐 **Latest 10 Transactions** with smart ordering
- 🏷️ **Category-based Color Coding** for visual clarity
- 💱 **Currency Formatting** with locale support
- ✏️ **Quick Edit/Delete Actions** with confirmation
- 🔍 **Search & Filter** capabilities
- 📱 **Responsive Transaction Cards** for mobile

</details>

<details>
<summary><b>📈 Analytics & Insights</b></summary>

- 📊 **Interactive Spending Trends** with time filters
- 🥧 **Category-wise Expense Pie Charts** with drill-down
- 📅 **Monthly Comparison Graphs** with YoY analysis
- 📤 **Export Functionality** with custom date ranges
- 🎯 **Budget Goals Tracking** with progress indicators
- 🤖 **AI-powered Insights** for spending patterns

</details>

---

### 💳 Transaction Management (`/transactions`)

<table>
<tr>
<td width="33%">

#### ➕ **Transaction Operations**
- **Add New Transactions** with smart forms
- **Edit Existing Entries** with validation
- **Delete with Confirmation** and undo option
- **Bulk Operations** for multiple selections
- **Duplicate Detection** and prevention
- **Category Auto-suggestion** based on description

</td>
<td width="33%">

#### 🔍 **Advanced Filtering**
- **Date Range Picker** with presets
- **Category Multi-select** with favorites
- **Amount Range Slider** with currency
- **Text Search** across descriptions
- **Transaction Type** filter (income/expense)
- **Save Filter Presets** for quick access

</td>
<td width="33%">

#### 📤 **Data Export Options**
- **CSV Export** with custom columns
- **PDF Reports** with charts and summaries
- **Excel Compatibility** with formulas
- **Email Reports** with scheduling
- **Cloud Backup** integration
- **Print-friendly** formats

</td>
</tr>
</table>

---

### 🎨 UI/UX Features

- **🌙 Dark/Light Mode Toggle** with system preference detection
- **📱 Mobile-First Responsive Design** with touch gestures
- **♿ Accessibility Features** with WCAG 2.1 compliance
- **🔔 Real-time Notifications** with toast messages
- **⌨️ Keyboard Shortcuts** for power users
- **🎭 Smooth Animations** with performance optimization
- **🔄 Progressive Web App** capabilities
- **📴 Offline Mode** with data synchronization

## 🚀 API Documentation

<div align="center">

### 🌐 Base URLs
**Production:** `https://loopr-backend-2idj.onrender.com/api`  
**Development:** `http://localhost:5000/api`

</div>

---

### 🔐 Authentication Endpoints

<details>
<summary><b>POST <code>/auth/register</code> - Create New User Account</b></summary>

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "60d5ecb74f45e73a4c8b4567",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Email already exists",
  "errors": ["User with this email already registered"]
}
```

</details>

<details>
<summary><b>POST <code>/auth/login</code> - Authenticate User</b></summary>

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "60d5ecb74f45e73a4c8b4567",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

</details>

---

### 💳 Transaction Endpoints

<details>
<summary><b>GET <code>/transactions</code> - Get User Transactions</b></summary>

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Query Parameters:**
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10, max: 100)
- `category` (string) - Filter by category
- `type` (string) - Filter by type ('income' | 'expense')
- `startDate` (ISO string) - Filter from date
- `endDate` (ISO string) - Filter to date
- `search` (string) - Search in description
- `sortBy` (string) - Sort field (default: 'date')
- `sortOrder` (string) - Sort order ('asc' | 'desc')

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "id": "60d5ecb74f45e73a4c8b4567",
        "type": "expense",
        "amount": 25.99,
        "category": "Food & Dining",
        "description": "Lunch at restaurant",
        "date": "2024-01-15T12:00:00.000Z",
        "createdAt": "2024-01-15T12:00:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 47,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

</details>

<details>
<summary><b>POST <code>/transactions</code> - Create New Transaction</b></summary>

**Request Body:**
```json
{
  "type": "expense",
  "amount": 25.99,
  "category": "Food & Dining",
  "description": "Lunch at restaurant",
  "date": "2024-01-15"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Transaction created successfully",
  "data": {
    "transaction": {
      "id": "60d5ecb74f45e73a4c8b4567",
      "type": "expense",
      "amount": 25.99,
      "category": "Food & Dining",
      "description": "Lunch at restaurant",
      "date": "2024-01-15T00:00:00.000Z",
      "createdAt": "2024-01-15T12:00:00.000Z"
    }
  }
}
```

</details>

<details>
<summary><b>PUT <code>/transactions/:id</code> - Update Transaction</b></summary>

**Request Body:**
```json
{
  "amount": 30.99,
  "description": "Updated lunch expense",
  "category": "Food & Dining"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction updated successfully",
  "data": {
    "transaction": {
      "id": "60d5ecb74f45e73a4c8b4567",
      "amount": 30.99,
      "description": "Updated lunch expense"
    }
  }
}
```

</details>

<details>
<summary><b>DELETE <code>/transactions/:id</code> - Delete Transaction</b></summary>

**Success Response (200):**
```json
{
  "success": true,
  "message": "Transaction deleted successfully"
}
```

</details>

---

### 📊 Dashboard Endpoints

<details>
<summary><b>GET <code>/dashboard/summary</code> - Get Financial Summary</b></summary>

**Success Response (200):**
```json
{
  "success": true,
  "data": {
    "totalBalance": 5420.75,
    "monthlyIncome": 3200.00,
    "monthlyExpenses": 1850.25,
    "transactionCount": 156,
    "recentTransactions": [
      {
        "id": "60d5ecb74f45e73a4c8b4567",
        "type": "expense",
        "amount": 25.99,
        "category": "Food & Dining",
        "description": "Lunch",
        "date": "2024-01-15T12:00:00.000Z"
      }
    ],
    "categoryBreakdown": [
      {
        "category": "Food & Dining",
        "amount": 450.25,
        "percentage": 24.3,
        "transactionCount": 15
      }
    ],
    "monthlyTrends": [
      {
        "month": "2024-01",
        "income": 3200.00,
        "expenses": 1850.25,
        "balance": 1349.75
      }
    ]
  }
}
```

</details>

---

### 📤 Export Endpoints

<details>
<summary><b>GET <code>/export/csv</code> - Export Transactions as CSV</b></summary>

**Query Parameters:**
- `startDate` (ISO string) - Export from date
- `endDate` (ISO string) - Export to date  
- `category` (string) - Filter by category
- `type` (string) - Filter by type

**Success Response (200):**
```
Content-Type: text/csv
Content-Disposition: attachment; filename="transactions-2024-01-15.csv"

Date,Type,Amount,Category,Description
2024-01-15,expense,25.99,Food & Dining,Lunch at restaurant
2024-01-14,income,2500.00,Salary,Monthly salary
```

</details>

---

### 🚨 Error Handling

**Standard Error Response:**
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["Detailed error messages"],
  "code": "ERROR_CODE"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Server Error

## 🎨 UI Components Architecture

### 🏗️ Component Hierarchy

```
App.tsx
├── AuthContext Provider
├── AlertContext Provider
└── Router
    ├── PublicRoutes
    │   ├── LoginPage
    │   │   ├── ProjectInfo
    │   │   └── LoginForm
    │   └── RegisterPage
    │       ├── ProjectInfo
    │       └── RegisterForm
    └── ProtectedRoutes
        └── Layout
            ├── Navigation
            ├── DeveloperBanner
            ├── Pages (Dashboard/Transactions)
            └── DeveloperFooter
```

---

### 🧩 Core Components

<table>
<tr>
<td width="50%">

#### 🏠 **Layout Components**
- **`Layout.tsx`** - Main app structure with navigation
- **`ProtectedRoute.tsx`** - Authentication guard for routes
- **`Navigation.tsx`** - Top navigation bar with user menu
- **`Sidebar.tsx`** - Collapsible sidebar navigation
- **`Footer.tsx`** - App footer with links

#### 🔐 **Authentication Components**
- **`LoginForm.tsx`** - Email/password login form
- **`RegisterForm.tsx`** - User registration form
- **`ForgotPasswordForm.tsx`** - Password reset form
- **`ProfileMenu.tsx`** - User profile dropdown

</td>
<td width="50%">

#### 📊 **Data Display Components**
- **`DashboardCards.tsx`** - Financial summary cards
- **`TransactionList.tsx`** - Transaction table/cards
- **`ChartsSection.tsx`** - Analytics visualizations
- **`StatsWidget.tsx`** - Reusable statistic displays

#### 🎨 **UI Enhancement Components**
- **`DeveloperBanner.tsx`** - Developer branding
- **`DeveloperFooter.tsx`** - Footer with profile links
- **`ProjectInfo.tsx`** - Comprehensive project showcase
- **`LoadingSpinner.tsx`** - Loading state indicators

</td>
</tr>
</table>

---

### 📝 Form Components

<details>
<summary><b>🔷 TransactionForm Component</b></summary>

```typescript
interface TransactionFormProps {
  initialData?: Transaction;
  onSubmit: (data: TransactionFormData) => void;
  onCancel: () => void;
  loading?: boolean;
}

Features:
- Real-time validation
- Category autocomplete
- Date picker integration
- Amount formatting
- Form state management
```

</details>

<details>
<summary><b>🔷 Advanced Filter Component</b></summary>

```typescript
interface FilterComponentProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
  availableCategories: string[];
}

Features:
- Date range picker
- Multi-select categories
- Amount range slider
- Search input with debounce
- Filter preset saving
```

</details>

---

### 📱 Responsive Design Components

- **📱 Mobile Navigation** - Hamburger menu for mobile
- **📊 Responsive Charts** - Auto-sizing charts for all screens
- **💳 Transaction Cards** - Mobile-optimized transaction display
- **🎯 Touch-friendly Buttons** - Large touch targets for mobile
- **📋 Collapsible Panels** - Space-efficient content organization

## 🔧 Development Setup

### 📋 Prerequisites

<table>
<tr>
<td width="25%">

**Node.js**
- Version: 18.0.0+
- [Download](https://nodejs.org/)

</td>
<td width="25%">

**MongoDB** 
- Local or Atlas
- [Setup Guide](https://docs.mongodb.com/)

</td>
<td width="25%">

**Git**
- Version Control
- [Download](https://git-scm.com/)

</td>
<td width="25%">

**VS Code**
- Recommended IDE
- [Download](https://code.visualstudio.com/)

</td>
</tr>
</table>

---

### 🚀 Quick Start Guide

#### 1️⃣ **Clone & Navigate**
```bash
# Clone the repository
git clone https://github.com/rohitshimpi737/loopr-fullstack.git
cd loopr-fullstack

# Check Node.js version
node --version  # Should be 18.0.0+
npm --version   # Should be 8.0.0+
```

#### 2️⃣ **Backend Setup**
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env  # or use your preferred editor
```

**Backend Environment Variables** (`.env`):
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration  
MONGODB_URI=mongodb://localhost:27017/loopr
MONGODB_TEST_URI=mongodb://localhost:27017/loopr_test

# Security
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Optional: Email Configuration (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

#### 3️⃣ **Frontend Setup** 
```bash
# Navigate to frontend directory (from root)
cd ../frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit environment variables
nano .env.local
```

**Frontend Environment Variables** (`.env.local`):
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Loopr Finance
VITE_APP_VERSION=1.0.0

# Optional: Analytics
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

#### 4️⃣ **Database Setup**
```bash
# Start MongoDB (if using local installation)
# On macOS with Homebrew:
brew services start mongodb-community

# On Windows:
net start MongoDB

# On Linux:
sudo systemctl start mongod

# Verify MongoDB is running
mongosh --eval "db.adminCommand('ismaster')"
```

#### 5️⃣ **Start Development Servers**

**Option A: Run Both Simultaneously**
```bash
# From root directory
npm install -g concurrently  # If not already installed
npm run dev  # Starts both frontend and backend
```

**Option B: Run Separately**
```bash
# Terminal 1 - Backend
cd backend
npm run dev
# 🚀 Backend running on http://localhost:5000

# Terminal 2 - Frontend  
cd frontend
npm run dev
# 🚀 Frontend running on http://localhost:5173
```

---

### 🛠️ Development Scripts

#### Backend Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build TypeScript to JavaScript
npm run start        # Start production server
npm run test         # Run test suite
npm run test:watch   # Run tests in watch mode
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run seed         # Seed database with sample data
```

#### Frontend Scripts  
```bash
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run Vitest tests
npm run test:ui      # Run tests with UI
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # Run TypeScript type checking
```

---

### 🔧 Recommended VS Code Extensions

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode", 
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense",
    "ms-vscode.vscode-json",
    "mongodb.mongodb-vscode"
  ]
}
```

---

### 🚨 Troubleshooting

<details>
<summary><b>❌ Common Issues & Solutions</b></summary>

**Port Already in Use:**
```bash
# Find process using port 5000
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

**MongoDB Connection Issues:**
```bash
# Check MongoDB status
brew services list | grep mongodb  # macOS
systemctl status mongod  # Linux
sc query MongoDB  # Windows

# Reset MongoDB data directory
rm -rf /usr/local/var/mongodb/*  # macOS
```

**Node Version Issues:**
```bash
# Using Node Version Manager (nvm)
nvm install 18
nvm use 18
nvm alias default 18
```

**Permission Issues:**
```bash
# Fix npm permissions (macOS/Linux)
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

</details>

---

### 🔍 Health Checks

#### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Expected: {"status": "OK", "timestamp": "..."}
```

#### Frontend Health Check  
```bash
curl http://localhost:5173
# Expected: HTML response with app title
```

#### Database Health Check
```bash
mongosh --eval "db.adminCommand('ping')"
# Expected: { ok: 1 }
```

## 📦 Production Deployment

### 🌐 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   👥 Users      │    │  🎨 Frontend    │    │  ⚙️ Backend     │
│                 │◄──►│   (Vercel)      │◄──►│   (Render)      │
│  Web Browsers   │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                  │                       │
                                  │                       │
                                  ▼                       ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │  📁 Static      │    │  🗄️ Database    │
                       │   Assets        │    │   (MongoDB)     │
                       │   (Vercel CDN)  │    │   (Atlas)       │
                       └─────────────────┘    └─────────────────┘
```

---

### 🚀 Backend Deployment (Render)

#### **Step 1: Prepare Backend for Production**

```bash
# Navigate to backend directory
cd backend

# Install production dependencies
npm install --production

# Build TypeScript
npm run build

# Test production build locally
npm start
```

#### **Step 2: Create Render Web Service**

1. **🔗 Connect Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository: `loopr-fullstack`

2. **⚙️ Configure Build Settings**
   ```yaml
   # Render Configuration
   Name: loopr-backend
   Environment: Node
   Region: Ohio (US East)
   Branch: main
   Root Directory: backend
   
   # Build Command
   npm install && npm run build
   
   # Start Command  
   npm start
   
   # Health Check Path
   /api/health
   ```

3. **🔧 Environment Variables**
   ```env
   NODE_ENV=production
   PORT=10000
   
   # Database (MongoDB Atlas)
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/loopr?retryWrites=true&w=majority
   
   # JWT Configuration
   JWT_SECRET=your-production-jwt-secret-minimum-32-characters-long
   JWT_EXPIRES_IN=7d
   
   # CORS Configuration
   CORS_ORIGIN=https://your-frontend-domain.vercel.app
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://loopr-finance.vercel.app
   
   # Optional: Monitoring
   SENTRY_DSN=your-sentry-dsn-for-error-tracking
   LOG_LEVEL=info
   ```

4. **🗄️ MongoDB Atlas Setup**
   ```bash
   # 1. Create MongoDB Atlas account
   # 2. Create new cluster
   # 3. Set up database user
   # 4. Whitelist Render IP addresses (0.0.0.0/0 for simplicity)
   # 5. Get connection string
   ```

#### **Step 3: Verify Deployment**
```bash
# Test API endpoints
curl https://your-backend-url.onrender.com/api/health
curl https://your-backend-url.onrender.com/api/auth/test
```

---

### 🎨 Frontend Deployment (Vercel)

#### **Step 1: Prepare Frontend for Production**

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm run preview
```

#### **Step 2: Configure Vercel**

**Create `vercel.json` in frontend directory:**
```json
{
  "version": 2,
  "name": "loopr-finance",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "env": {
    "VITE_API_URL": "@vite_api_url"
  }
}
```

#### **Step 3: Deploy to Vercel**

**Option A: Vercel CLI**
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod

# Set environment variables
vercel env add VITE_API_URL production
# Enter: https://your-backend-url.onrender.com/api
```

**Option B: Vercel Dashboard**
1. **🔗 Import Project**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import from GitHub: `loopr-fullstack`

2. **⚙️ Configure Project**
   ```yaml
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Development Command: npm run dev
   ```

3. **🔧 Environment Variables**
   ```env
   VITE_API_URL=https://loopr-backend-2idj.onrender.com/api
   VITE_APP_NAME=Loopr Finance
   VITE_APP_VERSION=1.0.0
   ```

#### **Step 4: Custom Domain (Optional)**
```bash
# Add custom domain
vercel domains add yourdomain.com
vercel domains add www.yourdomain.com

# Configure DNS
# Add CNAME record: www → cname.vercel-dns.com
# Add A record: @ → 76.76.19.61
```

---

### 🔧 Post-Deployment Configuration

#### **CORS Update**
Update backend CORS configuration:
```typescript
// backend/src/server.ts
const corsOptions = {
  origin: [
    'https://your-frontend-domain.vercel.app',
    'https://loopr-finance.vercel.app',
    'http://localhost:5173' // Keep for local development
  ],
  credentials: true,
  optionsSuccessStatus: 200
};
```

#### **Frontend API Configuration**
Update frontend API base URL:
```typescript
// frontend/src/services/apiService.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://loopr-backend-2idj.onrender.com/api';
```

---

### 📊 Monitoring & Analytics

#### **Error Tracking (Sentry)**
```bash
# Install Sentry
npm install @sentry/node @sentry/react

# Configure backend
# backend/src/config/sentry.ts

# Configure frontend  
# frontend/src/utils/sentry.ts
```

#### **Performance Monitoring**
```typescript
// Add to both frontend and backend
import * as Sentry from '@sentry/node'; // or '@sentry/react'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

---

### 🚨 Deployment Checklist

<details>
<summary><b>✅ Pre-Deployment Checklist</b></summary>

**Backend:**
- [ ] Environment variables configured
- [ ] MongoDB Atlas cluster created
- [ ] CORS origins updated
- [ ] Build process tested
- [ ] Health check endpoint working
- [ ] Error handling implemented
- [ ] Logging configured

**Frontend:**
- [ ] API URL updated
- [ ] Build process tested
- [ ] Environment variables set
- [ ] vercel.json configured
- [ ] Error boundaries implemented
- [ ] Performance optimized

**Security:**
- [ ] JWT secrets are strong
- [ ] Database credentials secured
- [ ] HTTPS enforced
- [ ] Input validation implemented
- [ ] Rate limiting configured

</details>

---

### 🔗 Live URLs

<div align="center">

**🎨 Frontend Application**  
[https://loopr-finance.vercel.app](https://loopr-finance.vercel.app)

**⚙️ Backend API**  
[https://loopr-backend-2idj.onrender.com](https://loopr-backend-2idj.onrender.com)

**📚 API Documentation**  
[https://loopr-backend-2idj.onrender.com/api/docs](https://loopr-backend-2idj.onrender.com/api/docs)

</div>

## �‍💻 About the Developer

<div align="center">

<img src="https://github.com/rohitshimpi737.png" width="150" height="150" style="border-radius: 50%; border: 4px solid #667eea;" alt="Rohit Shimpi" />

### **Rohit Shimpi**
*Full-Stack Developer | MERN Stack Specialist | UI/UX Enthusiast*

---

### 🚀 **Professional Highlights**

<table align="center">
<tr>
<td align="center">🎓</td>
<td><strong>Education:</strong> Computer Science & Engineering</td>
</tr>
<tr>
<td align="center">💼</td>
<td><strong>Experience:</strong> 3+ Years in Full-Stack Development</td>
</tr>
<tr>
<td align="center">🏆</td>
<td><strong>Specialization:</strong> MERN Stack, TypeScript, Cloud Deployment</td>
</tr>
<tr>
<td align="center">🌟</td>
<td><strong>Passion:</strong> Building scalable, user-centric applications</td>
</tr>
</table>

---

### 🛠️ **Technical Expertise**

<div align="center">

**Frontend Technologies**  
<img src="https://skillicons.dev/icons?i=react,typescript,javascript,html,css,tailwind,materialui,redux" />

**Backend Technologies**  
<img src="https://skillicons.dev/icons?i=nodejs,express,mongodb,mysql,postgresql,prisma,graphql" />

**Tools & Platforms**  
<img src="https://skillicons.dev/icons?i=git,github,vscode,docker,aws,vercel,netlify" />

</div>

---

### 🌐 **Connect With Me**

<div align="center">

[![Portfolio](https://img.shields.io/badge/🌐_Portfolio-Visit_Site-667eea?style=for-the-badge&logoColor=white)](https://rohitshimpi.dev)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rohitshimpi737)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rohitshimpi737)
[![Email](https://img.shields.io/badge/Email-Contact-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:rohitshimpi737@gmail.com)

</div>

---

### 💡 **What Drives Me**

> *"I believe in creating digital experiences that not only solve real-world problems but also delight users with intuitive design and robust functionality. Every line of code I write is driven by the passion to build something meaningful."*

### 🎯 **Core Values**

- **📚 Continuous Learning** - Staying updated with latest tech trends
- **🔧 Code Quality** - Writing clean, maintainable, and scalable code  
- **🎨 User Experience** - Prioritizing user-centric design principles
- **🤝 Collaboration** - Building strong development teams and communities
- **🚀 Innovation** - Exploring new technologies and creative solutions

---

### 📈 **GitHub Stats**

<div align="center">

<img src="https://github-readme-stats.vercel.app/api?username=rohitshimpi737&show_icons=true&theme=tokyonight&hide_border=true" height="180" />
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=rohitshimpi737&layout=compact&theme=tokyonight&hide_border=true" height="180" />

</div>

---

### 🏗️ **Featured Projects**

<table align="center">
<tr>
<td align="center">

**💰 Loopr Finance**  
*Personal Finance Management*  
React • Node.js • MongoDB  
[Live Demo](https://loopr-finance.vercel.app)

</td>
<td align="center">

**🛒 E-Commerce Platform**  
*Full-Stack Shopping Solution*  
MERN • Stripe • Redux  
[GitHub](https://github.com/rohitshimpi737)

</td>
<td align="center">

**📊 Analytics Dashboard**  
*Data Visualization Tool*  
React • D3.js • Express  
[GitHub](https://github.com/rohitshimpi737)

</td>
</tr>
</table>

</div>

---

## 🤝 Contributing

<div align="center">

**We welcome contributions from the developer community!**

</div>

### 🔄 **How to Contribute**

1. **🍴 Fork the Repository**
   ```bash
   # Click the Fork button on GitHub
   git clone https://github.com/your-username/loopr-fullstack.git
   ```

2. **🌟 Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **💻 Make Your Changes**
   - Follow existing code style and conventions
   - Add tests for new functionality
   - Update documentation as needed

4. **✅ Test Your Changes**
   ```bash
   # Run backend tests
   cd backend && npm test
   
   # Run frontend tests  
   cd frontend && npm test
   
   # Run integration tests
   npm run test:e2e
   ```

5. **📤 Submit Pull Request**
   ```bash
   git add .
   git commit -m "feat: add amazing new feature"
   git push origin feature/amazing-new-feature
   ```

### 🎯 **Contribution Guidelines**

- **📝 Code Style** - Follow existing TypeScript/ESLint conventions
- **🧪 Testing** - Include unit tests for new features
- **📚 Documentation** - Update README and code comments
- **🔀 Commits** - Use conventional commit messages
- **🐛 Bug Reports** - Use issue templates with detailed reproduction steps

### 🏆 **Recognition**

Contributors will be recognized in our [Contributors Wall](CONTRIBUTORS.md) and featured in release notes!

---

## � License

<div align="center">

**MIT License**

Copyright (c) 2024 Rohit Shimpi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

</div>

---

<div align="center">

## 🌟 **Show Your Support**

**If this project helped you or inspired your work, please consider:**

[![⭐ Star this repo](https://img.shields.io/badge/⭐_Star_this_repo-FFD700?style=for-the-badge&logoColor=black)](https://github.com/rohitshimpi737/loopr-fullstack)
[![🍴 Fork this repo](https://img.shields.io/badge/🍴_Fork_this_repo-667eea?style=for-the-badge&logoColor=white)](https://github.com/rohitshimpi737/loopr-fullstack/fork)
[![📢 Share on LinkedIn](https://img.shields.io/badge/📢_Share_on_LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/rohitshimpi737)

---

### 💝 **Built with ❤️ by [Rohit Shimpi](https://rohitshimpi.dev)**

*Made with passion for the developer community*

**🚀 Happy Coding! 🚀**

</div>
