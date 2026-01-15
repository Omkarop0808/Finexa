<img width="1896" height="969" alt="Screenshot 2025-12-24 183929" src="https://github.com/user-attachments/assets/096a5d57-6a2f-4e77-95ca-ebb32d2d4da9" />

# 💰 Finexa - Smart Financial Management

> **Transform your financial life with intelligent automation and AI-powered insights**

Finexa is a modern, full-stack financial management application that helps users take complete control of their finances through smart automation, real-time insights, and intuitive design.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![Javascript](https://img.shields.io/badge/JavaScript-5-blue?style=for-the-badge&logo=javascript)
![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-blue?style=for-the-badge&logo=postgresql)

System Architecture
<img width="2010" height="1083" alt="diagram-export-1-13-2026-7_09_58-PM" src="https://github.com/user-attachments/assets/4e98dc19-65e8-4d66-a076-ef1e44b9878b" />

## ✨ Features

<img width="262" height="573" alt="Screenshot 2025-12-25 003015" src="https://github.com/user-attachments/assets/a5330e19-d6e1-4131-8608-fafdeeb92fbd" />

### 🏦 **Multi-Account Management**
- **Current & Savings Accounts** - Manage multiple accounts in one place
- **Real-time Balance Tracking** - Live updates across all accounts
- **Account Analytics** - Detailed insights per account
- **Default Account Settings** - Streamlined transaction flow

### 💸 **Smart Transaction Management**
- **Automated Categorization** - AI-powered expense categorization
- **Receipt Scanning** - Digital receipt storage and processing
- **Recurring Transactions** - Automated handling of regular income/expenses
- **Transaction Search & Filter** - Advanced filtering and search capabilities
- **Bulk Operations** - Efficient transaction management

### 📊 **Intelligent Budgeting**
- **Smart Budget Creation** - AI-recommended budget allocations
- **Real-time Alerts** - Proactive spending notifications at 80% usage
- **Budget Analytics** - Detailed spending pattern analysis
- **Monthly Reports** - Comprehensive financial summaries
- **Overspend Protection** - Intelligent warnings and recommendations

### 🤖 **AI-Powered Insights**
- **Spending Pattern Analysis** - Machine learning-driven insights
- **Personalized Recommendations** - Tailored financial advice
- **Monthly Financial Reports** - AI-generated summaries with actionable insights
- **Trend Prediction** - Future spending forecasts
- **Goal Tracking** - Progress monitoring with smart suggestions

### 📧 **Automated Communications**
- **Budget Alert Emails** - Beautiful, responsive email notifications
- **Monthly Reports** - Comprehensive financial summaries via email
- **Smart Scheduling** - Automated report generation and delivery
- **Professional Templates** - Clean, branded email designs

### 🔐 **Enterprise-Grade Security**
- **Clerk Authentication** - Secure user management and authentication
- **Arcjet Protection** - Advanced bot detection and DDoS protection
- **Rate Limiting** - API protection against abuse
- **Secure Middleware** - Multi-layer security implementation
- **Data Encryption** - End-to-end data protection

  
<img width="1108" height="862" alt="Screenshot 2025-12-24 184130" src="https://github.com/user-attachments/assets/5971cda8-e700-4854-aa2b-e5b0a582375e" />
<img width="1004" height="775" alt="Screenshot 2025-12-24 184014" src="https://github.com/user-attachments/assets/1f05d0c3-4e15-4a9b-ab39-0d8a5ea43adc" />
<img width="1895" height="864" alt="Screenshot 2025-12-24 183956" src="https://github.com/user-attachments/assets/81169b2f-e415-4a98-aee5-de69925d4427" />
<img width="1891" height="857" alt="image" src="https://github.com/user-attachments/assets/a700af78-62ed-4fe1-a1f8-f924629bd8a6" />



## 🚀 Tech Stack

### **Frontend**
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Modern icon library

### **Backend & Database**
- **PostgreSQL** - Robust relational database
- **Prisma ORM** - Type-safe database client
- **Custom Prisma Output** - Optimized client generation
- **Database Migrations** - Version-controlled schema changes

### **Authentication & Security**
- **Clerk** - Complete authentication solution
- **Arcjet** - Bot protection and rate limiting
- **Middleware Protection** - Route-level security
- **Environment Security** - Secure configuration management

### **Automation & AI**
- **Inngest** - Reliable background job processing
- **Google Gemini AI** - Advanced language model for insights
- **Automated Scheduling** - Cron-based task execution
- **Email Automation** - Resend integration for notifications

### **Development Tools**
- **ESLint** - Code quality and consistency
- **React Hook Form** - Performant form management
- **Zod** - Runtime type validation
- **Date-fns** - Modern date manipulation
- **GSAP** - High-performance animations

## 📱 Key Functionalities

### **Dashboard Overview**
- Real-time financial snapshot
- Account balance summaries
- Recent transaction history
- Budget progress indicators
- Quick action buttons

### **Transaction Management**
- Create income/expense transactions
- Categorize with smart suggestions
- Upload and manage receipts
- Set up recurring transactions
- Bulk import/export capabilities

### **Budget Planning**
- Create monthly budgets
- Track spending against limits
- Receive proactive alerts
- Analyze spending patterns
- Adjust budgets based on insights

### **Account Management**
- Add multiple accounts
- Set default accounts
- View account-specific analytics
- Manage account settings
- Transfer between accounts

### **Reporting & Analytics**
- Monthly financial reports
- Category-wise spending analysis
- Trend visualization
- Export capabilities
- AI-generated insights

## 🛠 Installation & Setup

### **Prerequisites**
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### **Environment Variables**
Create a `.env` file with the following variables:

```env
# Database
DATABASE_URL="your_postgresql_connection_string"

# Authentication (Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
CLERK_SECRET_KEY="your_clerk_secret_key"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="sign-up"

# Security (Arcjet)
ARCJET_KEY="your_arcjet_key"

# Email (Resend)
RESEND_API_KEY="your_resend_api_key"

# AI (Google Gemini)
GEMINI_API_KEY="your_gemini_api_key"
```

### **Installation Steps**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/finexa.git
   cd finexa
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📚 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run email:dev    # Preview email templates
```

### **Database Commands**
```bash
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes
npx prisma migrate   # Run migrations
npx prisma studio    # Open Prisma Studio
```

## 🏗 Project Structure

```
finexa/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Protected application pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   └── ui/               # Shadcn/ui components
├── lib/                  # Utilities and configurations
│   ├── prisma.js         # Database client
│   ├── arcjet.js         # Security configuration
│   └── inngest/          # Background job functions
├── actions/              # Server actions
├── data/                 # Static data and constants
├── emails/               # Email templates
├── hooks/                # Custom React hooks
├── prisma/               # Database schema and migrations
└── public/               # Static assets
```

## 🔄 Automated Features

### **Background Jobs (Inngest)**
- **Budget Alerts** - Automated spending notifications (every 6 hours)
- **Recurring Transactions** - Daily processing of recurring items
- **Monthly Reports** - Automated report generation (1st of each month)
- **AI Insights** - Intelligent analysis and recommendations

### **Email Automation**
- **Budget Alerts** - Sent when 80% of budget is used
- **Monthly Reports** - Comprehensive financial summaries
- **Professional Templates** - Responsive, branded email designs
- **Smart Scheduling** - Automated delivery based on user activity

## 🎨 Design System

### **Color Palette**
- **Primary**: Blue/Purple gradient theme
- **Success**: Green for positive financial metrics
- **Warning**: Orange for budget alerts
- **Error**: Red for critical notifications
- **Neutral**: Gray scale for text and backgrounds

### **Typography**
- **Headings**: Inter font family
- **Body**: System font stack for optimal performance
- **Code**: Monospace for technical elements

### **Components**
- **Consistent Design Language** - Unified component library
- **Accessibility First** - WCAG compliant components
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Theme switching capability

## 🚀 Deployment

### **Vercel (Recommended)**
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### **Other Platforms**
- **Vercel** - Full-stack deployment support

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Clerk** for authentication infrastructure
- **Arcjet** for security and protection
- **Inngest** for reliable background processing
- **Vercel** for deployment platform
- **Shadcn** for beautiful UI components

## 📞 Support

For support, email omkarpatilop0826@gmail.com or join our community discussions.

---

<div align="center">
  <strong>Built with ❤️ for better financial management</strong>
  <br>
  <sub>Finexa - Your Smart Financial Companion</sub>
</div>
