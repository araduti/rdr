import { saveEmailPreview } from '@/lib/email-templates/preview';

export async function GET() {
  const htmlContent = saveEmailPreview();
  
  return new Response(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
}
