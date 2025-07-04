# 💰 Loopr - Personal Finance Management System

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel)](https://loopr-fontend1.vercel.app/)
[![Backend API](https://img.shields.io/badge/API-Live-blue?style=for-the-badge&logo=render)](https://loopr-backend-2idj.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Source-black?style=for-the-badge&logo=github)](https://github.com/rohitshimpi737/loopr-fullstack)

[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.0.0-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![Material-UI](https://img.shields.io/badge/Material--UI-5.14.0-007FFF?style=flat&logo=mui)](https://mui.com/)

# 🚀 Loopr Backend API Collection

**Postman Collection Link:** 
https://www.postman.com/sunshine-9483/workspace/loopr/collection/33122109-db47a29d-75d6-4627-b9d4-0be758c9e79c?action=share&source=copy-link&creator=33122109

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
- 🎨 **Modern UI/UX** - Clean, intuitive Material-UI components
- ⚡ **Real-time Updates** - Live data synchronization across sessions

## 🏗️ Architecture Overview

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

- **♿ Accessibility Features** with WCAG 2.1 compliance
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

## � License

<div align="center">

**MIT License**

Copyright (c) 2024 Rohit Shimpi

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

</div>

---

### 💝 **Built with ❤️ by [Rohit Shimpi](https://rohitshimpi.dev)**

*Made with passion for the developer community*

**🚀 Happy Coding! 🚀**

</div>
