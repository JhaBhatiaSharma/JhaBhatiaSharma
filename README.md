# InternHub S&C Platform - Next-Gen Internship Management

![Tech Stack](https://img.shields.io/badge/stack-MERN-61DAFB?logo=react&logoColor=white)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**InternHub Students & Companies (S&C)** is a full-stack platform revolutionizing university-industry connections for internships. Our solution combines intelligent matching algorithms with comprehensive workflow management to enhance the internship experience for all stakeholders.

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

