interface MagicLinkEmailParams {
  url: string;
  email: string;
  expires?: Date;
}

export function createMagicLinkEmail({ url, email, expires }: MagicLinkEmailParams) {
  const expiresText = expires 
    ? `This link will expire ${expires.toLocaleString()}.`
    : 'This link will expire in 24 hours.';

  // Your Ampliosoft logo as inline SVG (optimized for email)
  const logoSvg = `<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style="display: block;">
    <g>
      <path fill="#3d85b8" fill-rule="nonzero" d="m47.38755,168.97282l-46.67661,0l12.17578,-20.62481l49.46724,0c4.25239,-0.01576 8.38852,1.23087 11.8768,3.53478c9.26889,5.99652 14.6508,16.0801 14.25214,26.73178c-12.6907,-6.29631 -26.77674,-9.6102 -41.09535,-9.64175zm0,0"/>
      <path fill="#3d85b8" fill-rule="nonzero" d="m152.61756,168.97282l46.67665,0l-12.25887,-20.62481l-49.38419,0c-4.25239,-0.01576 -8.38848,1.23087 -11.8768,3.53478c-9.26885,5.99652 -14.6508,16.0801 -14.25214,26.73178c12.69075,-6.29631 26.77679,-9.6102 41.09535,-9.64175zm0,0"/>
      <path fill="#3d85b8" fill-rule="nonzero" d="m99.46269,75.42741l36.7267,60.40688l43.40427,0l-80.13096,-134.41632l-79.26718,134.41632l42.60694,0l36.66023,-60.40688zm0,0"/>
    </g>
  </svg>`;

  return {
    subject: 'Sign in to rdr.nu',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign in to rdr.nu</title>
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f9fafb;">
    <!-- Wrapper -->
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f9fafb; padding: 20px 0;">
        <tr>
            <td align="center">
                <!-- Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 0 40px;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td>
                                        <div style="display: flex; align-items: center; margin-bottom: 32px;">
                                            ${logoSvg}
                                            <span style="margin-left: 12px; font-size: 24px; font-weight: 600; color: #111827;">rdr.nu</span>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                        <td style="padding: 0 40px 40px 40px;">
                            <h1 style="margin: 0 0 24px 0; font-size: 28px; font-weight: 600; color: #111827; line-height: 1.25;">
                                Sign in to rdr.nu
                            </h1>
                            
                            <p style="margin: 0 0 24px 0; font-size: 16px; color: #4b5563; line-height: 1.5;">
                                We received a request to sign in to your rdr.nu account using this email address:
                            </p>
                            
                            <div style="margin: 0 0 32px 0; padding: 16px; background-color: #f3f4f6; border-radius: 6px; border-left: 4px solid #3d85b8;">
                                <p style="margin: 0; font-size: 16px; font-weight: 500; color: #111827;">
                                    ${email}
                                </p>
                            </div>
                            
                            <p style="margin: 0 0 32px 0; font-size: 16px; color: #4b5563; line-height: 1.5;">
                                Click the button below to sign in. If you didn't request this, you can safely ignore this email.
                            </p>
                            
                            <!-- CTA Button -->
                            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 0 32px 0;">
                                <tr>
                                    <td style="border-radius: 6px; background-color: #3d85b8;">
                                        <a href="${url}" 
                                           target="_blank" 
                                           style="display: inline-block; padding: 16px 32px; font-size: 16px; font-weight: 600; color: #ffffff; text-decoration: none; border-radius: 6px; transition: background-color 0.2s ease;">
                                            Sign in to rdr.nu
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <div style="margin: 32px 0; padding: 16px; background-color: #fef3c7; border-radius: 6px; border: 1px solid #f59e0b;">
                                <p style="margin: 0; font-size: 14px; color: #92400e; line-height: 1.4;">
                                    <strong>Security tip:</strong> ${expiresText} Always verify that the URL starts with <code style="background-color: #fbbf24; padding: 2px 4px; border-radius: 3px; font-family: Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;">https://rdr.nu</code>
                                </p>
                            </div>
                            
                            <p style="margin: 0 0 16px 0; font-size: 14px; color: #6b7280; line-height: 1.4;">
                                Or copy and paste this URL into your browser:
                            </p>
                            
                            <div style="margin: 0 0 32px 0; padding: 12px; background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; word-break: break-all; font-family: Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace; font-size: 13px; color: #374151;">
                                ${url}
                            </div>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td>
                                        <p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            This email was sent by <strong>rdr.nu</strong> to ${email}
                                        </p>
                                        <p style="margin: 0; font-size: 12px; color: #6b7280; line-height: 1.4;">
                                            If you have any questions, please contact us at <a href="mailto:support@rdr.nu" style="color: #3d85b8; text-decoration: none;">support@rdr.nu</a>
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`,
    text: `Sign in to rdr.nu

Hi there,

We received a request to sign in to your rdr.nu account using this email address: ${email}

Click the link below to sign in:
${url}

${expiresText}

If you didn't request this, you can safely ignore this email.

For security, always verify that the URL starts with https://rdr.nu

---
This email was sent by rdr.nu to ${email}
If you have any questions, please contact us at support@rdr.nu`
  };
}
