# Deployment Guide - Studia (AI Notes SaaS)

## ✅ Pre-Deployment Checklist

### 1. Environment Variables
Before deploying to Vercel, you need to set up these environment variables in your Vercel project settings:

#### Required Variables:
```
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
OPENROUTER_API_KEY=sk-or-v1-...
```

#### Optional but Recommended:
```
OPENROUTER_PREFERRED_MODEL=google/gemini-pro
```
This uses a paid model (~$0.0008/document) for better reliability in production.

### 2. Database Setup
- Make sure your NeonDB database is configured and migrations are applied
- Run `npx prisma migrate deploy` in production after deployment
- Consider enabling Prisma Accelerate for better performance

### 3. Clerk Configuration
- Update your Clerk dashboard with production URLs
- Add your Vercel domain to allowed origins
- Configure webhook URLs if using Clerk webhooks

## 🚀 Deploying to Vercel

### Method 1: Via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure environment variables (see above)
5. Click "Deploy"

### Method 2: Via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## 📋 Post-Deployment Tasks

### 1. Apply Database Migrations
```bash
# SSH into your Vercel deployment or run locally with production DB
npx prisma migrate deploy
```

### 2. Test Core Features
- [ ] Sign up/Sign in works
- [ ] PDF upload and parsing
- [ ] Text input
- [ ] AI generation (all 4 types)
- [ ] History saving and retrieval
- [ ] Mobile responsiveness

### 3. Monitor Logs
Check Vercel logs for any errors:
- API route errors
- Database connection issues
- AI generation failures

## 🔧 Production Optimizations Applied

✅ Build optimization - Production build verified
✅ TypeScript strict mode enabled
✅ API error handling implemented
✅ Rate limiting with model fallback
✅ Database connection pooling (Prisma)
✅ Clerk authentication configured
✅ Proper metadata for SEO

## ⚠️ Known Considerations

### Rate Limits
The free AI models have rate limits. For production:
- Consider setting `OPENROUTER_PREFERRED_MODEL=google/gemini-pro`
- Cost: ~$0.0008 per document (less than 1 cent)
- Eliminates rate limit issues

### Console Logs
Debug console logs are present in API routes. Consider:
- Removing or reducing logs for production
- Using proper logging service (e.g., Vercel Analytics)

### Features Not Yet Implemented
- [ ] PDF export functionality
- [ ] Advanced history filters
- [ ] Light/dark mode toggle
- [ ] Pricing page
- [ ] About page

## 🎯 Recommended Next Steps After Deployment

1. **Set up monitoring**: Use Vercel Analytics or Sentry
2. **Configure custom domain**: Add your domain in Vercel settings
3. **Enable Prisma Accelerate**: For better database performance
4. **Add analytics**: Google Analytics or similar
5. **Set up error tracking**: Sentry or similar service

## 📱 Custom Domain Setup

1. In Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update Clerk settings with new domain
5. Test all authentication flows

## 💾 Database Backups

For NeonDB:
- Automatic backups are included in paid plans
- For free tier, consider manual backups
- Document backup/restore procedures

## 🔐 Security Checklist

✅ Environment variables not committed to git
✅ API routes protected with authentication
✅ Clerk authentication configured
✅ Database connection string secured
✅ CORS and security headers via Next.js
✅ Input validation on API routes

## 📊 Performance Considerations

- API routes are serverless functions (fast cold starts)
- Database uses connection pooling
- Static pages pre-rendered where possible
- Images should be optimized (if adding more assets)

## 🆘 Troubleshooting

### Database Connection Issues
```bash
# Test database connection
npx prisma db push
```

### Build Failures
```bash
# Test build locally
pnpm build
```

### AI Generation Failures
- Check OpenRouter API key is valid
- Verify model names are correct
- Check rate limits on OpenRouter dashboard

## 📖 Additional Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Vercel Docs](https://vercel.com/docs)
- [Prisma Production Checklist](https://www.prisma.io/docs/guides/performance-and-optimization/production-checklist)
- [Clerk Production Checklist](https://clerk.com/docs/deployments/production-checklist)

---

**Need Help?** Check the PROJECT_TRACKER.md for current status and RATE_LIMIT_GUIDE.md for AI configuration details.
