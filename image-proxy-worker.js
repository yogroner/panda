/**
 * Cloudflare Worker: Google Drive Image Proxy & Cache
 * 
 * This worker acts as an Edge Caching layer. It fetches images from your
 * local API (which processes them via Google Drive) and caches the resulting
 * optimized WebP images at Cloudflare's Edge locations globally.
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Construct the origin URL (your app's API)
    // Replace with your actual deployed URL
    const originUrl = `https://ais-dev-zoinnwtdzdpkqyc2jopnhv-341614560871.europe-west2.run.app${url.pathname}${url.search}`;

    // Cloudflare Cache API
    const cache = caches.default;
    let response = await cache.match(request);

    if (!response) {
      console.log(`Cache miss for ${url.pathname}. Fetching from origin...`);
      
      response = await fetch(originUrl, {
        headers: {
          'User-Agent': 'Cloudflare-Worker-Panda-Proxy',
        },
      });

      // Only cache successful responses
      if (response.ok) {
        // Reconstruct response to add Cache-Control if origin doesn't provide it
        response = new Response(response.body, response);
        response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
        response.headers.set('X-Proxy-Cache', 'MISS');
        
        ctx.waitUntil(cache.put(request, response.clone()));
      }
    } else {
      console.log(`Cache hit for ${url.pathname}`);
      // Add a header to indicate cache hit for debugging
      response = new Response(response.body, response);
      response.headers.set('X-Proxy-Cache', 'HIT');
    }

    return response;
  },
};
