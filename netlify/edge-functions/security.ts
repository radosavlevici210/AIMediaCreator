export default async (request: Request, context: any) => {
  const url = new URL(request.url);
  const clientIP = request.headers.get('CF-Connecting-IP') || 
                   request.headers.get('X-Forwarded-For') || 
                   'unknown';
  
  // Enhanced security monitoring
  const suspiciousPatterns = [
    /\.(php|asp|jsp|cgi)$/i,
    /wp-admin|wp-login/i,
    /<script|javascript:|onload=/i,
    /\.\.|\/\.\./,
    /union.*select|drop.*table/i,
    /eval\(|document\.write|innerHTML/i
  ];
  
  const isSuspicious = suspiciousPatterns.some(pattern => 
    pattern.test(url.pathname) || pattern.test(url.search)
  );
  
  if (isSuspicious) {
    console.log(`Security: Blocked suspicious request from ${clientIP}: ${url.pathname}`);
    return new Response('Access Denied', { 
      status: 403,
      headers: {
        'Content-Type': 'text/plain',
        'X-Security-Block': 'pattern-match'
      }
    });
  }
  
  // Rate limiting for API endpoints
  if (url.pathname.startsWith('/api/')) {
    const userAgent = request.headers.get('User-Agent') || '';
    const isBot = /bot|crawler|spider|scraper/i.test(userAgent);
    
    if (isBot && !userAgent.includes('Googlebot') && !userAgent.includes('Bingbot')) {
      console.log(`Security: Blocked bot from ${clientIP}: ${userAgent}`);
      return new Response('Access Denied', { 
        status: 403,
        headers: {
          'Content-Type': 'text/plain',
          'X-Security-Block': 'bot-detection'
        }
      });
    }
  }
  
  const response = await context.next();
  
  // Enhanced security headers
  const headers = new Headers(response.headers);
  headers.set('X-Frame-Options', 'DENY');
  headers.set('X-Content-Type-Options', 'nosniff');
  headers.set('X-XSS-Protection', '1; mode=block');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
  headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  headers.set('X-DNS-Prefetch-Control', 'off');
  headers.set('X-Download-Options', 'noopen');
  headers.set('X-Permitted-Cross-Domain-Policies', 'none');
  
  // Enhanced Content Security Policy
  headers.set('Content-Security-Policy', [
    "default-src 'self'",
    "style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com",
    "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' ws: wss: https:",
    "font-src 'self' https://cdnjs.cloudflare.com https://fonts.gstatic.com",
    "object-src 'none'",
    "media-src 'self' blob: data:",
    "frame-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "upgrade-insecure-requests"
  ].join('; '));
  
  // Performance optimization headers
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ico)$/)) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    headers.set('Vary', 'Accept-Encoding');
  } else if (url.pathname.startsWith('/api/')) {
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');
  } else {
    headers.set('Cache-Control', 'public, max-age=3600');
  }
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
};