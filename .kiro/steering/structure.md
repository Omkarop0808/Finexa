# Project Structure

## Directory Organization

### `/app` - Next.js App Router
- **App Router structure** with nested layouts and pages
- **Route Groups**: `(auth)` for authentication pages
- **Dynamic Routes**: `[[...sign-in]]` and `[[...sign-up]]` for Clerk auth
- **Global Layout**: Root layout with Clerk provider and Header component
- **Styling**: `globals.css` for global styles

### `/components` - React Components
- **Shared Components**: `Header.jsx`, `hero.jsx` for reusable UI
- **UI Components**: `/ui` folder contains Shadcn/ui components
  - All UI components follow Radix UI + CVA pattern
  - Consistent naming: lowercase with hyphens (e.g., `alert-dialog.jsx`)
  - Export both component and variants where applicable

### `/lib` - Utilities and Configuration
- **Database**: `prisma.js` for Prisma client setup
- **Utilities**: `utils.js` with `cn()` helper for className merging
- **Auth**: `checkUser.js` for user verification logic
- **Generated**: `/generated/prisma` for auto-generated Prisma client

### `/data` - Static Data
- **Landing Page Data**: `landing.js` with features, stats, testimonials
- **Categories**: `categories.js` for transaction categories
- Data files export named constants (e.g., `featuresData`, `statsData`)

### `/prisma` - Database Schema
- **Schema**: `schema.prisma` with User, Account, Transaction, Budget models
- **Migrations**: `/migrations` folder for database version control
- **Custom Output**: Prisma client generates to `lib/generated/prisma`

### `/public` - Static Assets
- **Images**: Logo, banner, icons (SVG preferred)
- **Favicon**: Standard favicon.ico

## File Naming Conventions

### Components
- **React Components**: PascalCase for files (e.g., `Header.jsx`)
- **UI Components**: kebab-case (e.g., `alert-dialog.jsx`)
- **Pages**: lowercase (e.g., `page.js`, `layout.js`)

### Data and Utilities
- **Data Files**: camelCase (e.g., `landing.js`, `categories.js`)
- **Utility Files**: camelCase (e.g., `utils.js`, `checkUser.js`)

## Code Organization Patterns

### Component Structure
- Use functional components with hooks
- Import order: React, Next.js, third-party, local components, utilities
- Export default for main component, named exports for utilities

### Styling Approach
- **Tailwind Classes**: Use utility classes directly in JSX
- **Component Variants**: Use CVA for component variations
- **Responsive Design**: Mobile-first approach with responsive prefixes
- **Color Scheme**: Blue/purple gradient theme (`from-blue-600 to-purple-600`)

### Authentication Flow
- **Clerk Integration**: Use Clerk components (`SignedIn`, `SignedOut`, `UserButton`)
- **Route Protection**: Middleware handles protected routes
- **User Management**: `checkUser()` function for user verification

### Database Patterns
- **Models**: User, Account, Transaction, Budget with proper relationships
- **Enums**: Use Prisma enums for constrained values
- **Indexes**: Proper indexing on foreign keys and frequently queried fields