# 🚀 Deployment Guide for rdr.nu

This guide will help you deploy your URL shortener to Vercel with Prisma Postgres.

## 📋 Prerequisites

- [Vercel account](https://vercel.com)
- [GitHub account](https://github.com) (for OAuth)
- Your rdr.nu domain configured in Vercel

## 🔧 Step 1: Environment Variables

### Required Variables

Add these to your Vercel project's Environment Variables:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET="8fa207de21193df016b8234bf6b2baa11121c09f5a713703c624b050cd33aff9"
NEXTAUTH_URL="https://rdr.nu"

# Database (from Vercel Postgres)
DATABASE_URL="your-vercel-postgres-connection-string"

# OAuth Provider (choose at least one)
AUTH_GITHUB_ID="your-github-oauth-app-id"
AUTH_GITHUB_SECRET="your-github-oauth-app-secret"
```

### How to Add Environment Variables

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `rdr-nu` project
3. Navigate to **Settings** → **Environment Variables**
4. Add each variable with:
   - **Environment**: `Production`, `Preview`, and `Development`
   - **Type**: `Plain Text`

## 🗄️ Step 2: Database Setup

### Get Database URL from Vercel Postgres

1. In your Vercel project dashboard
2. Go to **Storage** tab
3. Click on your Postgres database
4. Copy the **POSTGRES_PRISMA_URL** connection string
5. Add it as `DATABASE_URL` in environment variables

### Run Database Migrations

After deployment, you'll need to push your database schema:

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Pull environment variables
vercel env pull .env.local

# Push database schema
npx prisma db push

# Optional: Seed database
npx prisma db seed
```

## 🔐 Step 3: OAuth Setup

### GitHub OAuth (Recommended)

1. Go to [GitHub Settings](https://github.com/settings/developers)
2. Click **OAuth Apps** → **New OAuth App**
3. Fill in:
   - **Application name**: `rdr.nu URL Shortener`
   - **Homepage URL**: `https://rdr.nu`
   - **Authorization callback URL**: `https://rdr.nu/api/auth/callback/github`
4. Save and copy **Client ID** and **Client Secret**
5. Add to Vercel as `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET`

### Google OAuth (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Google+ API**
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen
6. Set **Authorized redirect URIs**: `https://rdr.nu/api/auth/callback/google`
7. Copy **Client ID** and **Client Secret**
8. Add to Vercel as `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`

### Discord OAuth (Optional)

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Create **New Application**
3. Go to **OAuth2** → **General**
4. Add redirect: `https://rdr.nu/api/auth/callback/discord`
5. Copy **Client ID** and **Client Secret**
6. Add to Vercel as `AUTH_DISCORD_ID` and `AUTH_DISCORD_SECRET`

## 🌐 Step 4: Domain Configuration

### Custom Domain Setup

1. In Vercel project settings, go to **Domains**
2. Add your domain: `rdr.nu`
3. Configure DNS records as shown by Vercel
4. Wait for SSL certificate provisioning

### DNS Configuration

For `rdr.nu`:
```
A     @     76.76.19.61
CNAME www   cname.vercel-dns.com
```

## 🚀 Step 5: Deploy

### Automatic Deployment

1. Push your code to GitHub
2. Connect repository to Vercel
3. Vercel will automatically deploy on each push

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔍 Step 6: Post-Deployment

### Verify Deployment

1. Visit `https://rdr.nu`
2. Test URL shortening functionality
3. Test authentication with your OAuth provider
4. Create a test link and verify redirect works

### Database Verification

```bash
# Check database connection
npx prisma studio

# View tables
npx prisma db pull
```

## 🛠️ Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure variables are set for all environments (Production, Preview, Development)
   - Redeploy after adding variables

2. **Database Connection Error**
   - Verify `DATABASE_URL` is correct
   - Ensure database schema is pushed: `npx prisma db push`

3. **OAuth Not Working**
   - Check redirect URIs match exactly
   - Verify environment variables are set correctly
   - Ensure OAuth app is configured properly

4. **404 on Short Links**
   - Verify dynamic route `[shortCode]/page.tsx` is deployed
   - Check database for test links

### Useful Commands

```bash
# View logs
vercel logs

# Check environment variables
vercel env ls

# Run database migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate
```

## 📊 Performance Optimization

### Recommended Vercel Settings

1. **Function Regions**: Set to regions closest to your users
2. **Analytics**: Enable Vercel Analytics for performance monitoring
3. **Speed Insights**: Enable for Core Web Vitals tracking

### Database Optimization

1. **Connection Pooling**: Already configured with Prisma
2. **Indexes**: Database schema includes optimized indexes
3. **Query Optimization**: Use Prisma's built-in query optimization

## 🔒 Security Checklist

- ✅ HTTPS enabled (automatic with Vercel)
- ✅ Environment variables secured
- ✅ OAuth apps configured with correct domains
- ✅ Database connection encrypted
- ✅ Input validation implemented
- ✅ Rate limiting ready (implement in production)

## 📈 Monitoring

### Set Up Monitoring

1. **Vercel Analytics**: Monitor performance
2. **Error Tracking**: Consider Sentry integration
3. **Uptime Monitoring**: Use Vercel's built-in monitoring

### Key Metrics to Watch

- Page load times
- API response times
- Error rates
- Database query performance
- Short link redirect speed

## 🎉 You're Live!

Your rdr.nu URL shortener should now be live and fully functional! 

### Next Steps

1. Set up custom domains for clients
2. Implement rate limiting for production
3. Add email notifications
4. Set up analytics dashboards
5. Configure backup strategies

---

Need help? Check the [Vercel documentation](https://vercel.com/docs) or open an issue on GitHub.