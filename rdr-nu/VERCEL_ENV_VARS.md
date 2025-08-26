# 🔧 Vercel Environment Variables - Quick Reference

## ✅ Required Variables

Copy and paste these into your Vercel Environment Variables:

### Authentication & Security
```
NEXTAUTH_SECRET=8fa207de21193df016b8234bf6b2baa11121c09f5a713703c624b050cd33aff9
NEXTAUTH_URL=https://rdr.nu
```

### Database
```
DATABASE_URL=[Get from Vercel Postgres Dashboard]
```

## 🔐 OAuth Providers (Choose at least one)

### GitHub OAuth (Recommended)
```
AUTH_GITHUB_ID=[Your GitHub OAuth App Client ID]
AUTH_GITHUB_SECRET=[Your GitHub OAuth App Client Secret]
```

### Google OAuth
```
AUTH_GOOGLE_ID=[Your Google OAuth Client ID]
AUTH_GOOGLE_SECRET=[Your Google OAuth Client Secret]
```

### Discord OAuth
```
AUTH_DISCORD_ID=[Your Discord OAuth App Client ID]
AUTH_DISCORD_SECRET=[Your Discord OAuth App Client Secret]
```

## 📍 How to Add to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `rdr-nu` project
3. **Settings** → **Environment Variables**
4. For each variable:
   - **Name**: Variable name (e.g., `NEXTAUTH_SECRET`)
   - **Value**: Variable value
   - **Environment**: Select `Production`, `Preview`, and `Development`
   - Click **Save**

## 🔗 OAuth Setup Links

- **GitHub**: [GitHub Developer Settings](https://github.com/settings/developers)
- **Google**: [Google Cloud Console](https://console.cloud.google.com/)
- **Discord**: [Discord Developer Portal](https://discord.com/developers/applications)

## ⚠️ Important Notes

- **NEXTAUTH_SECRET**: Use the generated value above or generate your own 32+ character string
- **NEXTAUTH_URL**: Must match your exact domain (https://rdr.nu)
- **DATABASE_URL**: Get from Vercel Postgres tab in your project
- **OAuth Secrets**: Keep these private and never commit to Git

## 🚀 After Adding Variables

1. **Redeploy** your application
2. **Push database schema**: `npx prisma db push`
3. **Test** authentication and URL shortening

---

✨ **Pro Tip**: Save this file for future reference when setting up new environments!