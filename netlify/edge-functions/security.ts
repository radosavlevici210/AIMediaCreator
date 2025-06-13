export default async (request: Request, context: any) => {
  const response = await context.next();

  // Security headers
  const headers = new Headers(response.headers);

  // Enhanced security for AI Studio
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  // Content Security Policy for AI Enterprise Studio
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' wss: https:",
    "media-src 'self' blob:",
    "worker-src 'self' blob:",
    "frame-ancestors 'none'"
  ].join('; ');

  headers.set('Content-Security-Policy', csp);

  // AI Studio specific headers
  headers.set('X-AI-Studio-Version', '1.0.0');
  headers.set('X-Powered-By', 'AI Enterprise Studio Pro+');

  // Rate limiting headers (simulated)
  headers.set('X-RateLimit-Limit', '1000');
  headers.set('X-RateLimit-Remaining', '999');
  headers.set('X-RateLimit-Reset', String(Date.now() + 3600000));

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};

export const config = {
  path: "/*"
};