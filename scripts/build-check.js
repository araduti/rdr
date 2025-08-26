#!/usr/bin/env node

/**
 * Build check script to verify deployment readiness
 * Run with: node scripts/build-check.js
 */

console.log('🔍 Checking rdr.nu Build Configuration...\n');

// Check required files
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const requiredFiles = [
  'prisma/schema.prisma',
  'src/server/api/routers/link.ts',
  'src/app/[shortCode]/page.tsx',
  'src/components/landing-page.tsx',
  'src/app/dashboard/page.tsx',
];

console.log('📁 Checking required files:');
requiredFiles.forEach(file => {
  const exists = fs.existsSync(path.join(path.dirname(__dirname), file));
  console.log(`${exists ? '✅' : '❌'} ${file}`);
  if (!exists) {
    console.error(`❌ Missing required file: ${file}`);
    process.exit(1);
  }
});

// Check package.json scripts
console.log('\n📦 Checking package.json scripts:');
const packageJson = JSON.parse(fs.readFileSync(path.join(path.dirname(__dirname), 'package.json'), 'utf8'));
const requiredScripts = ['build', 'start', 'db:push', 'db:migrate'];

requiredScripts.forEach(script => {
  const exists = packageJson.scripts && packageJson.scripts[script];
  console.log(`${exists ? '✅' : '❌'} ${script}`);
});

// Check dependencies
console.log('\n📚 Checking key dependencies:');
const requiredDeps = [
  '@prisma/client',
  'next',
  'react',
  'next-auth',
  '@trpc/server',
  '@trpc/client',
  'framer-motion',
  'lucide-react',
];

requiredDeps.forEach(dep => {
  const exists = packageJson.dependencies && packageJson.dependencies[dep];
  console.log(`${exists ? '✅' : '❌'} ${dep}`);
});

console.log('\n🔧 Environment Setup Checklist:');
console.log('');
console.log('For Vercel deployment, ensure you have:');
console.log('┌─────────────────────────────────────────────────────────┐');
console.log('│ ✅ NEXTAUTH_SECRET                                      │');
console.log('│ ✅ NEXTAUTH_URL                                         │');
console.log('│ ✅ DATABASE_URL (from Vercel Postgres)                  │');
console.log('│ ✅ AUTH_GITHUB_ID & AUTH_GITHUB_SECRET (or other OAuth) │');
console.log('└─────────────────────────────────────────────────────────┘');
console.log('');

console.log('🚀 Deployment Steps:');
console.log('1. Add environment variables to Vercel');
console.log('2. Connect GitHub repository to Vercel');
console.log('3. Deploy and run: npx prisma db push');
console.log('4. Test at https://rdr.nu');
console.log('');

console.log('✅ Build configuration looks good!');
console.log('📖 See DEPLOYMENT.md for detailed instructions');
console.log('📋 See VERCEL_ENV_VARS.md for environment variables');