# InternHub S&C Platform - Next-Gen Internship Management
<p align="center">
  <img src="https://cdn.worldvectorlogo.com/logos/politecnico-di-milano.svg" alt="Politecnico di Milano" width="250">
</p>

![Tech Stack](https://img.shields.io/badge/stack-MERN-61DAFB?logo=react&logoColor=white)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**InternHub Students & Companies (S&C)** is a full-stack platform revolutionizing university-industry connections for internships. Our solution combines intelligent matching algorithms with comprehensive workflow management to enhance the internship experience for all stakeholders.

# 🎥 Prototype Demo
This repository contains interactive prototype demos for different dashboards.

---

## 🛠️ Admin Dashboard Prototype Testing
### 🚀 Overview: 
This prototype demonstrates the admin dashboard functionality.
### 📌 Features: 
- User Management
- Analytics
- Role-Based Access.
  
![Admin Dashboard Prototype](https://raw.githubusercontent.com/JhaBhatiaSharma/JhaBhatiaSharma/feature/prototype-v1-testing/Prototype_Demo/Admin_Dashboard_Prototype_Testing.gif)

---

## 🏢 Company Dashboard Prototype Testing
### 📊 Overview: 
The company dashboard showcases enterprise-level features.
### ✅ Features: 
- Job Postings
- Application tTracking
- Company Insights.
  
![Company Dashboard Prototype](https://raw.githubusercontent.com/JhaBhatiaSharma/JhaBhatiaSharma/feature/prototype-v1-testing/Prototype_Demo/Company_Dashboard_Prototype_Testing.gif)

---

## 🎓 Student Dashboard Prototype Testing
### 📚 Overview: 
A student-friendly dashboard for career opportunities.
### 🔍 Features: 
- Resume Management
- Job Applications
- Notifications.
  
![Student Dashboard Prototype](https://raw.githubusercontent.com/JhaBhatiaSharma/JhaBhatiaSharma/feature/prototype-v1-testing/Prototype_Demo/Student_Dashboard_Prototype_Testing.gif)

---

## 🌟 Key Features

- **AI-Powered Matching**: Smart algorithm connecting student skills with company requirements
- **End-to-End Workflow**: Complete management from application to final evaluation
- **Real-time Analytics Dashboard**: Monitor progress and engagement metrics
- **Secure Authentication**: JWT-based authorization with bcrypt password hashing
- **Automated Documentation**: PDF generation for contracts and reports
- **Quality Control**: Integrated complaint resolution and feedback system
- **Responsive UI**: Modern interface built with component-driven architecture

## 🛠 Technology Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Tailwind Merge
- **Build Tool**: Vite
- **State Management**: React Router + Context API
- **Testing**: Jest + React Testing Library
- **Utilities**: Axios, Lucide Icons, DatePicker

### Backend
- **Runtime**: Node.js 18+ 
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Security**: Helmet, CORS, bcryptjs, JWT
- **Automation**: PDFKit, Google APIs
- **Testing**: Jest + Supertest
- **Dev Tools**: Nodemon, Morgan

## 🚀 Getting Started

### Prerequisites
- Node.js ≥18.x
- MongoDB ≥6.x
- NPM ≥9.x

### Installation

1. **Clone Repository**
```bash
git clone https://github.com/JhaBhatiaSharma/JhaBhatiaSharma.git
cd JhaBhatiaSharma
```

2. **Frontend Setup**
```bash
cd frontend
npm i
```

3. **Backend Setup**
```bash
cd ../backend
npm i
```

## ⚡ Running the Application

### Development Mode

1. **Start Backend Server (from backend directory)**
```bash
npx nodemon server.js
```

2. **Start Frontend (from backend directory)**
```bash
npm run dev
```

3. **Production Build**
```bash
# Frontend
cd frontend
npm run build

# Backend
cd ../backend
NODE_ENV=production node server.js
```

## 🐳 Docker Setup (Recommended)
```bash
# Start full-stack application with hot-reload
docker-compose up --build
```

### Access Services
1. **Frontend:** http://localhost:5173
2. **Backend:** http://localhost:5001
> **Important Notes:**  
> ⏱️ **First Build:** Initial container setup may take 2-3 minutes  
> 🔄 **Hot Reloading:** Code changes will automatically reload both services  
> 🔐 **Environment:** Ensure backend environment variables are configured (see [Environment Variables](#environment-variables) section below)

## 🔒 Environment Variables
1. **Backend Preparation:**
Create `.env` file in backend directory: (example)
```env
MONGO_URI=mongodb://localhost:27017/internhub
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=90d
PORT=5001
```

## ✅ Testing Suite

### Frontend Tests (from frontend directory):
```bash
cd frontend
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Generate coverage report
```

### Backend Tests (from backend directory):
```bash
cd backend
npm test              # Run all tests with coverage
```

## 📁 Project Structure

### Frontend Architecture:
```bash
frontend/
├── Dockerfile
├── public/               # Static assets
│   └── vite.svg
├── src/
│   ├── Pages/            # Application views
│   │   ├── AdminDashboard.jsx
│   │   ├── Company/      # Company-specific pages
│   │   ├── Student/      # Student-specific pages
│   │   └── ...other pages
│   ├── components/       # Reusable UI components
│   │   └── ui/          # UI primitives
│   ├── context/          # React context providers
│   ├── __tests__/        # Component & page tests
│   ├── assets/           # Static assets
│   ├── lib/              # Utilities & mock data
│   └── main.jsx          # Application entry point
├── tailwind.config.js    # Tailwind configuration
├── vite.config.js        # Vite configuration
└── ...other config files
```

### Backend Architecture
```bash
backend/
├── Dockerfile
├── app.js                # Express application setup
├── config/               # Environment configuration
├── controllers/          # Business logic handlers
│   ├── adminController.js
│   ├── authController.js
│   └── ...other controllers
├── models/               # MongoDB schemas
│   ├── User.js
│   ├── Internship.js
│   └── ...other models
├── routes/               # API endpoint definitions
│   ├── authRoutes.js
│   ├── adminRoutes.js
│   └── ...other routes
├── middleware/           # Authentication & error handling
├── __tests__/            # Integration & unit tests
├── utils/                # Helper functions
└── ...other core files
```

## 🎭 Contributors

<table>
  <tr>
    <th>Contributor</th>
    <th>Name</th>
    <th>Course</th>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/32769890?v=4" width="100"></td>
    <td><strong>Shreesh Kumar Jha</strong></td>
    <td>MSc Computer Science & Engineering</td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/76564396?v=4" width="100"></td>
    <td><strong>Samarth Bhatia</strong></td>
    <td>MSc Computer Science & Engineering</td>
  </tr>
  <tr>
    <td><img src="https://avatars.githubusercontent.com/u/92645618?v=4" width="100"></td>
    <td><strong>Satvik Sharma</strong></td>
    <td>MSc Computer Science & Engineering</td>
  </tr>
</table>

