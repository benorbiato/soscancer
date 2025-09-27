# SOS Cancer - Grupo Pongaiense de Combate ao Câncer

A comprehensive support and community system for people affected by cancer. This project provides a complete platform with user management, authentication, dashboard, and various support features.

## Project Overview

SOS Cancer is a full-stack web application designed to support cancer patients, volunteers, and supporters. The platform offers a modern interface with secure authentication, user management, and various modules for different aspects of cancer support.

## Architecture

### Backend (NestJS + TypeScript)
- RESTful API with comprehensive endpoints
- JWT-based authentication system
- User management and permissions
- Agenda/events management
- Health monitoring
- Data validation and security

### Frontend (React + TypeScript)
- Modern responsive interface
- Component-based architecture
- Internationalization support
- Dashboard with multiple modules
- Form validation and user feedback
- Dark/light theme support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Access Points
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Features

### Authentication System
- User registration and login
- JWT token-based authentication
- Password security with bcrypt
- Protected routes and permissions
- Automatic token refresh

### User Management
- Multiple user types (volunteer, patient, supporter)
- Profile management
- User permissions and roles
- Data validation and security

### Dashboard
- Comprehensive overview
- Upcoming events
- Financial summaries
- Project statistics
- Quick actions
- Latest news

### Security Features
- Rate limiting
- CORS configuration
- Security headers
- Input validation and sanitization
- Password strength requirements

## Technology Stack

### Backend
- NestJS framework
- TypeScript
- JWT authentication
- bcrypt for password hashing
- Class-validator for validation
- Swagger for API documentation

### Frontend
- React 18
- TypeScript
- Vite build tool
- React Router for navigation
- Tailwind CSS for styling
- React Hook Form for forms
- i18next for internationalization

## Project Structure

```
soscancer/
├── backend/                 # NestJS API
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # User management
│   │   ├── agenda/         # Events management
│   │   ├── health/         # Health checks
│   │   └── common/         # Shared utilities
│   └── data/               # JSON data storage
├── frontend/               # React application
│   ├── src/
│   │   ├── pages/          # Application pages
│   │   ├── components/     # Reusable components
│   │   ├── modules/        # Feature modules
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities and API
└── README.md
```

## Development

### Backend Development
```bash
cd backend
npm run start:dev          # Start development server
npm run build              # Build for production
npm run start:prod         # Start production server
npm run lint               # Run linting
npm run test               # Run tests
```

### Frontend Development
```bash
cd frontend
npm run dev                # Start development server
npm run build              # Build for production
npm run preview            # Preview production build
npm run lint               # Run linting
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

**Grupo Pongaiense de Combate ao Câncer**
- Email: contato@soscancer.org
- Website: [In development]

---

*Developed with care to support people affected by cancer*