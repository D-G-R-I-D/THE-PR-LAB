# Middleware Configuration for Supabase Session Refresh

The `middleware.ts` file in your `app/` directory automatically handles Supabase session refreshing for all routes.

## How It Works

The middleware:
1. Intercepts every request to your app
2. Refreshes the user's session (if they have one)
3. Updates cookies to keep sessions fresh
4. Runs transparently in the background

## Matcher Configuration

By default, the middleware runs on all routes. To customize which routes it applies to, update `app/middleware.ts`:

```typescript
export const config = {
  matcher: [
    // Match all routes except static files and API routes that shouldn't refresh
    '/((?!_next/static|_next/image|favicon.ico|api/newsletter).*)',
  ],
};
```

## No Additional Setup Required

Since you have `app/middleware.ts` in your project, session refreshing is now automatic! (Updated to use the modern Next.js middleware location.)

## What This Enables

With the middleware in place, you can now:
- ✅ Use Supabase Auth for user accounts
- ✅ Keep user sessions fresh across page navigation
- ✅ Redirect unauthenticated users (with additional code)
- ✅ Access auth state in both Server and Client Components

## Example: Protecting Routes

To add route protection, update your `app/middleware.ts`:

```typescript
import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { updateSession } from "./middleware";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export async function middleware(request: NextRequest) {
  // Update session
  let response = await updateSession(request);

  // Optional: Redirect to login if not authenticated
  const supabase = createServerClient(supabaseUrl!, supabaseKey!, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value);
        });
      },
    },
  });

  const { data: { user } } = await supabase.auth.getUser();

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin') && !user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
```

## Reference

- [Supabase SSR Setup](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Next.js Middleware Docs](https://nextjs.org/docs/app/building-your-application/routing/middleware)
