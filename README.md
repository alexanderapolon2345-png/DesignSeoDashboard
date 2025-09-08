# YourSEODashboard Platform - MVP

A comprehensive SEO analytics and reporting platform for agencies, built with modern technologies and designed for scalability.

## Project Structure

```
├── marketing/          # Marketing website (yourseodashboard.com)
├── app/               # Main application (app.yourseodashboard.com)
├── server/            # Backend API server
└── README.md
```

## Tech Stack

### Frontend (Marketing & App)

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **Redux Toolkit** - State management (app only)
- **React Router** - Client-side routing

### Backend

- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - Database ORM
- **PostgreSQL** - Database
  **MySQL** - Database
- **JWT** - Authentication
- **Nodemailer** - Email sending
- **bcryptjs** - Password hashing

## Quick Start

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Setup Database

```bash
cd server
cp .env.example .env
# Edit .env with your database credentials
npm run db:generate
npm run db:push
```

### 3. Start Development Servers

```bash
npm run dev
```

This starts:

- Marketing site: http://localhost:3000
- App: http://localhost:3001
- API server: http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new agency
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/verify` - Verify email address

### Agencies (Admin only)

- `GET /api/agencies` - List all agencies
- `POST /api/agencies/invite` - Invite new agency
- `POST /api/agencies/:id/invite-worker` - Invite worker to agency

### Tasks

- `GET /api/tasks` - Get tasks (filtered by role/permissions)
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task

## User Roles & Access

### Admin

- Full platform access
- Manage all agencies
- Invite new agencies
- View all tasks and analytics

### Agency

- Manage their agency
- Invite workers
- Create and assign tasks
- View agency analytics

### Worker

- View assigned tasks
- Update task status
- Access agency reports (read-only)

## Authentication Flow

### Agency Registration

1. Agency visits app.yourseodashboard.com
2. Fills registration form
3. Receives email verification
4. Confirms email to activate account
5. Can now login and access dashboard

### Invitation Flow

1. Admin/Agency sends invitation email
2. Recipient clicks email link
3. Sets up account (password optional for workers)
4. Automatically added to appropriate agency
5. Redirected to role-specific dashboard

## Environment Variables

### Server (.env)

```env
DATABASE_URL="mysql://username:password@localhost:3306/seo_dashboard"
JWT_SECRET="your-super-secret-jwt-key"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
FRONTEND_URL="http://localhost:3001"
PORT="5000"
```

## Domain Setup (Production)

### DNS Configuration

- `yourseodashboard.com` → Marketing site
- `app.yourseodashboard.com` → Main application
- `admin.yourseodashboard.com` → Admin dashboard
- `*.yourseodashboard.com` → Agency subdomains

### Deployment

Each component can be deployed separately:

- Marketing: Static hosting (Vercel, Netlify)
- App: Static hosting with API proxy
- Server: Node.js hosting (Railway, DigitalOcean)

## Database Schema

The platform uses a flexible N:M relationship pattern with MySQL:

### Core Models

- **User** - All platform users (Admin, Agency owners, Workers)
- **Agency** - Agency organizations
- **UserAgency** - Junction table managing user-agency relationships
- **Task** - Work items and projects
- **Token** - Email verification and invitation tokens

### Key Features

- Multi-tenant architecture (agency isolation)
- Role-based access control
- Email verification and invitation system
- JWT-based authentication
- Audit trails and timestamps

## Development Commands

### Root Level

```bash
npm run dev                # Start all services
npm run install:all        # Install all dependencies
```

### Marketing Site

```bash
cd marketing
npm run dev               # Development server
npm run build             # Production build
```

### Main App

```bash
cd app
npm run dev               # Development server
npm run build             # Production build
```

### Server

```bash
cd server
npm run dev               # Development with hot reload
npm run build             # TypeScript compilation
npm run db:generate       # Generate Prisma client
npm run db:push           # Push schema to database
npm run db:studio         # Open Prisma Studio
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Email verification required
- Role-based access control
- Input validation with Zod
- CORS protection
- SQL injection prevention (Prisma)

## Next Steps for Production

1. **Email Setup** - Configure production SMTP provider
2. **Database** - Set up MySQL production instance
3. **Domain Setup** - Configure DNS and SSL certificates
4. **Environment Variables** - Set production environment variables
5. **Monitoring** - Add logging and error tracking
6. **Backup Strategy** - Implement database backups
7. **Security Audit** - Review and strengthen security measures

## Support

For technical questions or issues, please contact the development team or refer to the documentation for each technology used in the stack.
