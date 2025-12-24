# Technology Stack

## Framework & Runtime
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Node.js** - Runtime environment

## Database & ORM
- **PostgreSQL** - Primary database
- **Prisma** - Database ORM and query builder
- Custom Prisma client generation to `lib/generated/prisma`

## Authentication & Authorization
- **Clerk** - Authentication provider with built-in UI components
- Protected routes using middleware for `/dashboard`, `/account`, `/transaction` paths

## UI & Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components for accessibility
- **Shadcn/ui** - Pre-built component library built on Radix
- **Lucide React** - Icon library
- **Class Variance Authority (CVA)** - Component variant management

## Form Handling & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Form validation integration

## Additional Libraries
- **GSAP** - Animation library
- **Date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **Next Themes** - Theme management

## Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
npx prisma migrate   # Run database migrations
npx prisma studio    # Open Prisma Studio
```

## Environment Setup
- Requires `.env` file with database connection and Clerk keys
- PostgreSQL database connection required
- Clerk authentication setup required