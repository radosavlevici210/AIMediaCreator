export default async (request: Request, context: any) => {
  const response = await context.next();
  
  // Add security headers
  const headers = new Headers(response.headers);
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // Content Security Policy
  headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' ws: wss: https:",
    "font-src 'self' https://cdnjs.cloudflare.com",
    "object-src 'none'",
    "media-src 'self' blob: data:",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '));
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};