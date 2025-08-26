#!/usr/bin/env node

/**
 * Script to generate required secrets for rdr.nu deployment
 * Run with: node scripts/generate-secrets.js
 */

import crypto from 'crypto';

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateBase64Secret(length = 32) {
  return crypto.randomBytes(length).toString('base64');
}

console.log('🔐 Generated Secrets for rdr.nu Deployment\n');
console.log('Copy these to your Vercel Environment Variables:\n');

console.log('📋 Required Variables:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`NEXTAUTH_SECRET="${generateSecret(32)}"`);
console.log(`NEXTAUTH_URL="https://rdr.nu"`);
console.log('');

console.log('📋 Database (from Vercel Postgres):');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('DATABASE_URL="[Get this from Vercel Postgres dashboard]"');
console.log('');

console.log('📋 OAuth Providers (choose one or more):');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('# GitHub OAuth:');
console.log('AUTH_GITHUB_ID="[Get from GitHub OAuth App]"');
console.log('AUTH_GITHUB_SECRET="[Get from GitHub OAuth App]"');
console.log('');
console.log('# Google OAuth:');
console.log('AUTH_GOOGLE_ID="[Get from Google Cloud Console]"');
console.log('AUTH_GOOGLE_SECRET="[Get from Google Cloud Console]"');
console.log('');
console.log('# Discord OAuth:');
console.log('AUTH_DISCORD_ID="[Get from Discord Developer Portal]"');
console.log('AUTH_DISCORD_SECRET="[Get from Discord Developer Portal]"');
console.log('');

console.log('📋 Optional (for production):');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('# For rate limiting and analytics');
console.log('REDIS_URL="[Redis connection string if using rate limiting]"');
console.log('# For email notifications');
console.log('RESEND_API_KEY="[Resend API key for transactional emails]"');
console.log('# For geo-location');
console.log('GEOIP_API_KEY="[MaxMind or similar service for geo data]"');
console.log('');

console.log('🚀 Next Steps:');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('1. Add these to Vercel Environment Variables');
console.log('2. Set up OAuth apps for your chosen providers');
console.log('3. Get DATABASE_URL from Vercel Postgres');
console.log('4. Deploy and run database migrations');
console.log('');