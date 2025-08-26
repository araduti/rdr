import { createMagicLinkEmail } from './magic-link';

/**
 * Generate a preview of the magic link email for testing
 * This is useful for development and design purposes
 */
export function generateEmailPreview() {
  const sampleUrl = 'http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard&token=abc123&email=user%40example.com';
  const sampleEmail = 'user@example.com';
  
  return createMagicLinkEmail({
    url: sampleUrl,
    email: sampleEmail,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
  });
}

/**
 * Save email preview to a file for visual inspection
 */
export function saveEmailPreview() {
  const { html } = generateEmailPreview();
  return html;
}
