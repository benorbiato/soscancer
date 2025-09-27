# SOS Cancer Backend

NestJS backend API for the SOS Cancer platform with TypeScript and comprehensive authentication system.

## Technologies

- **NestJS** - Progressive Node.js framework
- **TypeScript** - Typed JavaScript superset
- **JWT** - Token-based authentication
- **Swagger** - API documentation
- **Class Validator** - Data validation
- **Passport** - Authentication strategies
- **bcrypt** - Password hashing

## Project Structure

```
src/
├── auth/                 # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── guards/           # Authentication guards
│   └── strategies/       # Passport strategies
├── users/                # User management module
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── agenda/               # Events/agenda module
│   ├── agenda.controller.ts
│   └── agenda.module.ts
├── health/               # Health check module
│   ├── health.controller.ts
│   └── health.module.ts
├── common/               # Shared code
│   ├── decorators/       # Custom decorators
│   ├── dto/             # Data Transfer Objects
│   ├── enums/           # Enums
│   ├── guards/          # Authorization guards
│   ├── interfaces/      # TypeScript interfaces
│   └── utils/           # Utilities
├── app.module.ts        # Main module
├── app.controller.ts    # Main controller
├── app.service.ts       # Main service
└── main.ts             # Entry point
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables:**
```bash
cp env.example .env
```

3. **Configure .env file:**
```env
NODE_ENV=development
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_REQUESTS=60
```

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Other Commands
```bash
npm run start          # Start application
npm run start:debug    # Start in debug mode
npm run lint           # Run linter
npm run format         # Format code
npm run test           # Run unit tests
npm run test:e2e       # Run e2e tests
npm run test:cov       # Run tests with coverage
```

## API Documentation

Access Swagger documentation at: `http://localhost:3000/docs`

## Authentication

The system uses JWT (JSON Web Tokens) for authentication:

- **Access Token**: Valid for 7 days
- **Bearer Token**: Format `Authorization: Bearer <token>`

## User Roles and Permissions

### Roles
- **ADMIN**: Full system access
- **VOLUNTEER**: Access to agenda and dashboard
- **PATIENT**: View agenda and profile
- **SPONSOR**: Access to agenda and dashboard
- **SUPPORTER**: Limited access
- **USER**: Basic access

### Permissions
- `VIEW_USERS`, `CREATE_USERS`, `UPDATE_USERS`, `DELETE_USERS`
- `VIEW_AGENDA`, `CREATE_EVENTS`, `UPDATE_EVENTS`, `DELETE_EVENTS`
- `VIEW_DASHBOARD`, `VIEW_ANALYTICS`
- `VIEW_SETTINGS`, `UPDATE_PROFILE`, `DELETE_ACCOUNT`
- `VIEW_REGISTRY`, `MANAGE_REGISTRY`
- `ADMIN_ACCESS`, `SYSTEM_SETTINGS`

## Security Features

- **Helmet**: Security headers
- **CORS**: Configured allowed origins
- **Rate Limiting**: Request rate limiting
- **Validation**: Input data validation
- **Password Hashing**: bcrypt for passwords

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Execution environment | `development` |
| `PORT` | Server port | `3000` |
| `JWT_SECRET` | JWT secret key | Required |
| `JWT_EXPIRES_IN` | Token expiration | `7d` |
| `ALLOWED_ORIGINS` | CORS allowed origins | Required |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `60000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `60` |

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/refresh` - Refresh token
- `GET /api/v1/auth/profile` - Get user profile
- `PATCH /api/v1/auth/profile` - Update user profile

### Users
- `GET /api/v1/users` - List users
- `POST /api/v1/users` - Create user
- `GET /api/v1/users/:id` - Get user by ID
- `PATCH /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

### Health
- `GET /api/v1/health` - Health check

## Development

The backend uses NestJS with TypeScript. Key features:

- Modular architecture
- Dependency injection
- Guards and interceptors
- Validation pipes
- Exception filters
- Swagger documentation

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```