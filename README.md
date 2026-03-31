# FinancialFlow Frontend

A modern Angular-based financial management dashboard for tracking transactions, visualizing spending patterns, and managing personal finances.

## Technologies

- **Framework**: [Angular](https://angular.io/) v21.0.0
- **Language**: [TypeScript](https://www.typescriptlang.org/) v5.9.2
- **UI Library**: [Angular Material](https://material.angular.io/) v21.1.3
- **Charts**: [Chart.js](https://www.chartjs.org/) v4.5.1 + [ng2-charts](https://valor-software.com/ng2-charts/) v10.0.0
- **Testing**: [Vitest](https://vitest.dev/) v4.0.8 with jsdom
- **Package Manager**: npm v11.7.0

## Architecture

The project follows a **feature-based modular architecture** with clear separation of concerns:

```
src/app/
├── core/                    # Singleton services, guards, interceptors, interfaces
│   ├── guards/              # Route guards for authentication
│   ├── interceptors/        # HTTP interceptors
│   ├── interfaces/          # TypeScript interfaces
│   └── services/            # API services (auth, transactions, categories, users)
├── features/                # Feature modules (lazy-loaded)
├── layout/                  # Layout components
├── shared/                  # Reusable components, pipes, directives
│   ├── components/          # Shared UI components
│   │   ├── charts/          # Chart visualization components
│   │   ├── dashboard/       # Main dashboard view
│   │   ├── login/           # Authentication form
│   │   └── register/        # Registration form
└── app.routes.ts           # Centralized routing configuration
```

### Key Services

- **AuthService**: Handles user authentication and JWT token management
- **TransactionService**: Manages financial transactions CRUD operations
- **CategoryService**: Handles transaction categories
- **UserCreateService**: User registration and profile management

### Design Patterns

- **Dependency Injection**: Angular's built-in DI system for loose coupling
- **Reactive Programming**: RxJS observables for async operations
- **Component-Based Architecture**: Reusable, self-contained UI components
- **Interface-Driven Development**: Strong typing with TypeScript interfaces

## Getting Started

### Installation

1. Clone the repository and navigate to the project directory

2. Install dependencies:
```bash
npm install
```

### Development Server

Start the local development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/`. The application will automatically reload on file changes.

### Build

Production build with optimizations:
```bash
npm run build
ng build
```

Output will be in the `dist/` directory.

### Testing

Run unit tests with Vitest:
```bash
npm test
ng test
```

### Development with watch mode:
```bash
npm run watch
ng build --watch --configuration development
```

## Available Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirects to `/login` | Default landing page |
| `/login` | Login | User authentication |
| `/register` | Register | New user registration |
| `/dashboard` | Dashboard | Main financial dashboard with charts |

