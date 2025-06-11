import { clerkMiddleware } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function middleware(request: NextRequest) {
  try {
    // Generate a unique visitor ID (you can improve this)
    let visitorId = request.cookies.get('visitor_id')?.value;
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      const response = NextResponse.next();
      response.cookies.set('visitor_id', visitorId, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: 'lax',
      });
    }

    // Track the page view
    await supabase
      .from('website_visitors')
      .insert([
        { 
          page_path: request.nextUrl.pathname,
          visitor_id: visitorId
        }
      ]);

    return NextResponse.next();
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return NextResponse.next();
  }
}

export default clerkMiddleware()

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}