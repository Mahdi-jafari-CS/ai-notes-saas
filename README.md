# Studia - AI-Powered Study Notes SaaS

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?style=for-the-badge&logo=postgresql)

**Transform your study materials into AI-powered summaries, flashcards, and quizzes**

[Features](#features) • [Demo](#demo) • [Installation](#installation) • [Configuration](#configuration) • [Deployment](#deployment)

</div>

---

## 📚 Overview

**Studia** is a modern, full-stack SaaS application that leverages AI to help students and professionals transform their study materials into multiple learning formats. Upload text or PDF files and instantly generate:

- 📝 **Summaries** - Concise overviews of your content
- 📌 **Bullet Points** - Key takeaways and important points
- 🎴 **Flashcards** - Interactive study cards with flip animations
- 📊 **Quizzes** - Multiple-choice questions to test knowledge

Built with the latest web technologies and designed for scalability, reliability, and an exceptional user experience.

---

## ✨ Features

### Core Functionality
- 🤖 **AI-Powered Generation** - Multiple output formats from a single input
- 📄 **PDF Support** - Upload and process PDF documents
- 💾 **History Management** - Access and manage all your generated notes
- 🔍 **Advanced Filtering** - Filter by type, status, and search by content
- 📥 **Export Options** - Download notes as PDF or copy to clipboard
- 🎨 **Interactive UI** - Beautiful, animated components with smooth transitions

### Technical Features
- 🔐 **Secure Authentication** - Powered by Clerk with social login support
- 🎯 **Type-Safe** - Full TypeScript implementation
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🌙 **Dark Mode** - Complete dark theme support with next-themes
- ⚡ **Fast Performance** - Optimized with Next.js 16 App Router
- 🔄 **Smart AI Fallback** - 4 free AI models with automatic fallback
- 💳 **Optional Paid Models** - Support for premium AI models
- 🎭 **Custom Cursor** - Engaging custom cursor animation
- ♿ **Accessible** - Built with accessibility best practices

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Components**: [Radix UI](https://www.radix-ui.com/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)

### Backend
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)
- **AI Provider**: [OpenRouter](https://openrouter.ai/)
- **PDF Processing**: [pdf2json](https://www.npmjs.com/package/pdf2json)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF)

### Dev Tools
- **Package Manager**: pnpm
- **Linting**: ESLint
- **Code Formatting**: Prettier (implicit via ESLint config)

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** 20.x or higher
- **pnpm** (recommended) or npm/yarn
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Mahdi-jafari-CS/ai-notes-saas.git
   cd ai-notes-saas
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your `.env` file** (see [Configuration](#configuration) below)

5. **Set up the database**
   ```bash
   # Push the Prisma schema to your database
   pnpm prisma db push
   
   # Generate Prisma Client
   pnpm prisma generate
   ```

6. **Run the development server**
   ```bash
   pnpm dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/studia_db"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."

# OpenRouter AI
OPENROUTER_API_KEY="sk-or-v1-..."

# Optional: Use a paid model for better reliability
# OPENROUTER_PREFERRED_MODEL="google/gemini-pro"
```

### Getting API Keys

#### 1. Database (PostgreSQL)
- **Local**: Install PostgreSQL and create a database
- **Cloud**: Use services like:
  - [Neon](https://neon.tech/) (Free tier available)
  - [Supabase](https://supabase.com/) (Free tier available)
  - [Railway](https://railway.app/) (Free tier available)

#### 2. Clerk Authentication
1. Sign up at [clerk.com](https://clerk.com/)
2. Create a new application
3. Copy your publishable and secret keys
4. Configure sign-in/sign-up pages in Clerk dashboard

#### 3. OpenRouter AI
1. Sign up at [openrouter.ai](https://openrouter.ai/)
2. Add credits or use free models
3. Generate an API key from your dashboard

**Free Models Available:**
- `meta-llama/llama-3.2-3b-instruct:free`
- `google/gemma-2-9b-it:free`
- `microsoft/phi-3-mini-128k-instruct:free`
- `qwen/qwen-2-7b-instruct:free`

**Recommended Paid Models:**
- `google/gemini-pro` (Fast, affordable, high quality)
- `anthropic/claude-3-5-sonnet` (Best quality)
- `openai/gpt-4o` (Excellent quality)

---

## 📁 Project Structure

```
ai-notes-saas/
├── app/                          # Next.js App Router
│   ├── api/                     # API Routes
│   │   ├── ai/generate/        # AI generation endpoint
│   │   ├── history/            # Fetch user history
│   │   ├── notes/              # CRUD operations for notes
│   │   └── parse-pdf/          # PDF parsing endpoint
│   ├── dashboard/              # Protected dashboard pages
│   │   ├── history/           # History view page
│   │   └── page.tsx           # Main dashboard
│   ├── sign-in/               # Clerk sign-in page
│   ├── sign-up/               # Clerk sign-up page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Landing page
│   └── globals.css            # Global styles
│
├── components/                 # React components
│   ├── dashboard/            # Dashboard-specific components
│   │   ├── DashboardClient.tsx
│   │   ├── DashboardNavbar.tsx
│   │   ├── FlashcardsDisplay.tsx
│   │   ├── QuizDisplay.tsx
│   │   └── HistorySection/
│   ├── landing/              # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   └── ...
│   ├── ui/                   # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── pointer.tsx       # Custom cursor
│   │   └── ...
│   └── theme-provider.tsx    # Dark mode provider
│
├── lib/                       # Utility functions & services
│   ├── db.ts                 # Prisma client
│   ├── openrouter.ts         # AI service with fallback
│   ├── notes-service.ts      # Notes CRUD operations
│   ├── pdf-parser.ts         # PDF processing
│   ├── pdf-generator.ts      # PDF export
│   └── utils.ts              # Helper functions
│
├── prisma/
│   └── schema.prisma         # Database schema
│
├── public/                    # Static assets
├── middleware.ts             # Clerk authentication middleware
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

## 🔌 API Routes

### `/api/ai/generate` (POST)
Generate AI content from input text.

**Request Body:**
```json
{
  "inputText": "Your study material here...",
  "outputType": "summary" | "bullets" | "flashcards" | "quiz"
}
```

**Response:**
```json
{
  "success": true,
  "output": "Generated content...",
  "model": "meta-llama/llama-3.2-3b-instruct:free"
}
```

### `/api/parse-pdf` (POST)
Parse PDF file and extract text content.

**Request:** FormData with `file` field

### `/api/notes` (POST)
Create a new note in the database.

### `/api/history` (GET)
Fetch all notes for authenticated user.

---

## 📊 Database Schema

```prisma
model User {
  id          String   @id @default(cuid())
  clerkUserId String   @unique
  email       String   @unique
  name        String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  notes       Note[]
}

model Note {
  id          String   @id @default(cuid())
  userId      String
  title       String?
  inputText   String
  inputType   String   // "text" or "pdf"
  fileName    String?
  outputType  String?  // "summary", "bullets", "flashcards", "quiz"
  outputText  String?
  status      String   @default("pending")
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  user        User     @relation(fields: [userId], references: [id])
}
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Import Project"
   - Select your repository
   - Configure environment variables
   - Deploy!

3. **Set Environment Variables**
   Add all variables from your `.env` file to Vercel's environment settings.

4. **Update Clerk URLs**
   In your Clerk dashboard, add your Vercel domain to allowed origins.

### Deploy to Other Platforms

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for:
- Railway
- Render
- DigitalOcean
- AWS

---

## 🧪 Development

### Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm prisma studio # Open Prisma Studio (database GUI)
```

### Database Commands

```bash
pnpm prisma generate      # Generate Prisma Client
pnpm prisma db push      # Push schema changes to database
pnpm prisma studio       # Open database GUI
pnpm prisma migrate dev  # Create and apply migrations
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Module '@prisma/client' has no exported member 'Note'"**
```bash
pnpm prisma generate
```

**2. Database connection errors**
- Check your `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify database credentials

**3. Clerk authentication not working**
- Verify API keys are correct
- Check that domain is added to Clerk dashboard
- Ensure middleware is configured properly

**4. AI generation fails**
- Check `OPENROUTER_API_KEY` is valid
- Verify you have credits (for paid models)
- Try using a different model

**5. Custom cursor conflicts**
- Ensure `<Pointer />` is only in root layout
- Remove from nested layouts

For more issues, see [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md)

---

## 📖 Additional Documentation

- [DEPLOYMENT.md](./DEPLOYMENT.md) - Detailed deployment guide
- [PRODUCTION_READINESS.md](./PRODUCTION_READINESS.md) - Production checklist
- [RATE_LIMIT_GUIDE.md](./RATE_LIMIT_GUIDE.md) - AI rate limiting info
- [DARK_MODE_IMPLEMENTATION.md](./DARK_MODE_IMPLEMENTATION.md) - Theme guide
- [PROJECT_TRACKER.md](./PROJECT_TRACKER.md) - Development tracker

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is private and proprietary.

---

## 👨‍💻 Author

**Mahdi Jafari**
- GitHub: [@Mahdi-jafari-CS](https://github.com/Mahdi-jafari-CS)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [OpenRouter](https://openrouter.ai/) - AI API aggregator
- [Prisma](https://www.prisma.io/) - Database ORM
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Vercel](https://vercel.com/) - Hosting platform

---

<div align="center">

**Built with ❤️ using Next.js 16 and TypeScript**

[⬆ Back to Top](#studia---ai-powered-study-notes-saas)

</div>
