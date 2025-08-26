# Email Authentication Setup Guide

This guide will help you configure email-based authentication (magic links) for your rdr.nu URL shortener.

## Environment Variables

Add these environment variables to your `.env.local` file (for development) and to your Vercel environment variables (for production):

```env
# Required for NextAuth
NEXTAUTH_SECRET="your-nextauth-secret-here"
NEXTAUTH_URL="http://localhost:3000"  # Use your production URL for production

# Alternative AUTH_SECRET (NextAuth v5 style)
AUTH_SECRET="your-auth-secret-here"

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/database"

# Email Configuration for Magic Links
EMAIL_SERVER_HOST="smtp.gmail.com"  # Your SMTP server
EMAIL_SERVER_PORT="587"              # SMTP port (587 for TLS, 465 for SSL)
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="noreply@yourdomain.com"  # The "from" address for emails
```

## Email Provider Setup Options

### Option 1: Gmail (Recommended for Development)

1. **Enable 2-Factor Authentication** on your Google account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password as `EMAIL_SERVER_PASSWORD`

3. **Configuration**:
   ```env
   EMAIL_SERVER_HOST="smtp.gmail.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-gmail@gmail.com"
   EMAIL_SERVER_PASSWORD="your-app-password"
   EMAIL_FROM="your-gmail@gmail.com"
   ```

### Option 2: SendGrid (Recommended for Production)

1. **Create SendGrid Account** at [sendgrid.com](https://sendgrid.com)
2. **Generate API Key**:
   - Go to Settings → API Keys
   - Create API Key with "Mail Send" permissions
3. **Configuration**:
   ```env
   EMAIL_SERVER_HOST="smtp.sendgrid.net"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="apikey"
   EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

### Option 3: AWS SES

1. **Setup AWS SES** in your AWS console
2. **Verify your domain** or email address
3. **Create SMTP Credentials**:
   - Go to SES → SMTP Settings
   - Create SMTP credentials
4. **Configuration**:
   ```env
   EMAIL_SERVER_HOST="email-smtp.us-east-1.amazonaws.com"  # Your region
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="your-smtp-username"
   EMAIL_SERVER_PASSWORD="your-smtp-password"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

### Option 4: Resend (Modern Alternative)

1. **Create Resend Account** at [resend.com](https://resend.com)
2. **Add your domain** and verify DNS records
3. **Generate API Key**
4. **Configuration**:
   ```env
   EMAIL_SERVER_HOST="smtp.resend.com"
   EMAIL_SERVER_PORT="587"
   EMAIL_SERVER_USER="resend"
   EMAIL_SERVER_PASSWORD="your-resend-api-key"
   EMAIL_FROM="noreply@yourdomain.com"
   ```

## How Email Authentication Works

1. **User enters email** on the sign-in page
2. **System sends magic link** to the provided email address
3. **User clicks the link** in their email
4. **Automatic sign-in** and redirect to dashboard

## Testing the Setup

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/signin`
3. Enter your email address
4. Check your email for the magic link
5. Click the link to sign in

## Production Deployment

1. Add all environment variables to your Vercel project settings
2. Use a production email service (SendGrid, AWS SES, or Resend)
3. Update `NEXTAUTH_URL` to your production domain
4. Make sure `EMAIL_FROM` uses your verified domain

## Database Requirements

The email authentication requires these tables in your database (handled by Prisma):

- `User` - Stores user information
- `Account` - Links email authentication to users  
- `Session` - Manages user sessions
- `VerificationToken` - Stores magic link tokens

These are already defined in your Prisma schema and will be created when you run `prisma migrate deploy`.

## Security Notes

1. **Magic links expire** after a set time (default: 24 hours)
2. **Links are single-use** - they become invalid after clicking
3. **HTTPS required** in production for secure token transmission
4. **Rate limiting** is recommended to prevent abuse
5. **Email verification** ensures users own the email address

## Troubleshooting

### Common Issues:

1. **"Email not sent"**: Check SMTP credentials and server settings
2. **"Magic link expired"**: Links have a limited lifespan, request a new one
3. **"Invalid credentials"**: Verify your email server configuration
4. **"Email in spam"**: Configure SPF/DKIM records for your domain

### Email Provider Specific:

- **Gmail**: Make sure 2FA is enabled and you're using an app password
- **SendGrid**: Verify your sender identity and domain authentication
- **AWS SES**: Ensure you're not in sandbox mode for production
- **Resend**: Make sure your domain is verified and DNS records are set

## Custom Email Templates

This project includes professionally designed email templates with:

### Features
- **Company branding** with Ampliosoft logo
- **Professional styling** similar to GitHub/Vercel emails
- **Both HTML and text versions** for maximum compatibility
- **Mobile-responsive design** that works on all devices
- **Security warnings** and expiration notices
- **Custom brand colors** (#3d85b8)

### Email Preview
You can preview the email template during development at: `http://localhost:3000/api/email-preview`

### Template Customization
Email templates are located in `src/lib/email-templates/`:
- `magic-link.ts` - Main email template with HTML and text versions
- `preview.ts` - Preview utilities for development

### Brand Customization
To customize the email branding:
1. Update the logo SVG in `magic-link.ts`
2. Change the brand colors (currently `#3d85b8`)
3. Modify the company name and support email
4. Adjust the styling to match your brand guidelines

### Template Structure
The email includes:
- **Header** with logo and company name
- **Clear call-to-action** button
- **Security notice** with expiration time
- **Fallback URL** for copying/pasting
- **Professional footer** with contact information
