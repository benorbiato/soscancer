# SOS Cancer Frontend

React frontend application for the SOS Cancer platform built with Vite, TypeScript, and modern UI components.

## Technologies

- **React 18** - UI library
- **TypeScript** - Typed JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hook Form** - Form handling
- **i18next** - Internationalization
- **Lucide React** - Icon library

## Project Structure

```
src/
├── pages/                # Application pages
│   ├── dashboard.tsx
│   ├── login.tsx
│   ├── register.tsx
│   └── ...
├── components/           # Reusable components
│   ├── ui/              # Base UI components
│   ├── forms/           # Form components
│   └── layouts/         # Layout components
├── modules/             # Feature modules
│   ├── auth/            # Authentication module
│   ├── dashboard/       # Dashboard module
│   ├── agenda/          # Events module
│   └── ...
├── hooks/               # Custom React hooks
├── contexts/            # React contexts
├── lib/                 # Utilities and API
└── types/               # TypeScript type definitions
```

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Set up environment variables (optional):**
```bash
# Create .env file
VITE_API_BASE_URL=http://localhost:3000
```

## Running the Application

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Other Commands
```bash
npm run lint           # Run ESLint
npm run lint:fix       # Fix ESLint issues
npm run format         # Format code with Prettier
```

## Development Server

The development server runs on `http://localhost:5173` by default.

## API Configuration

The frontend connects to the backend API. By default, it expects the backend at `http://localhost:3000`. To change this:

1. Create a `.env` file in the frontend directory
2. Add: `VITE_API_BASE_URL=http://your-backend-url`

## Features

### Authentication
- User login and registration
- JWT token management
- Protected routes
- Automatic token refresh

### Dashboard
- Comprehensive overview
- Upcoming events
- Financial summaries
- Project statistics
- Quick actions
- Latest news

### UI Components
- Responsive design
- Dark/light theme support
- Form validation
- Loading states
- Toast notifications
- Modal dialogs

### Internationalization
- English and Portuguese support
- Easy language switching
- Localized content

## Styling

The project uses Tailwind CSS v4 with custom configuration:

- Utility-first approach
- Custom color palette
- Responsive design
- Dark mode support
- Component-based styling

## State Management

- React Context for global state
- Custom hooks for local state
- Form state with React Hook Form
- API state management

## Routing

The application uses React Router for client-side routing:

- Protected routes
- Route-based code splitting
- Navigation guards
- Breadcrumb navigation

## Development Guidelines

### Component Structure
- Use TypeScript for all components
- Follow React best practices
- Use custom hooks for logic
- Implement proper error boundaries

### Styling
- Use Tailwind CSS classes
- Follow design system guidelines
- Ensure responsive design
- Test dark/light themes

### Forms
- Use React Hook Form
- Implement proper validation
- Show loading states
- Handle errors gracefully

## Building for Production

```bash
# Build the application
npm run build

# The build output will be in the 'dist' directory
# This can be served by any static file server
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new code
3. Write meaningful commit messages
4. Test your changes thoroughly
5. Update documentation as needed