# 🚀 Supabase SSR Setup - Quick Reference

## What's New

Your project now has a **production-ready Supabase SSR (Server-Side Rendering) setup** for Next.js.

## Files Created

| File | Purpose |
|------|---------|
| `utils/supabase/server.ts` | Server-side Supabase client for Server Components & API routes |
| `utils/supabase/client.ts` | Browser-side Supabase client for Client Components |
| `middleware.ts` | Automatic session refresh middleware |
| `.env.local.example` | Example environment variables |
| `NEWSLETTER_SETUP.md` | Complete newsletter database setup |
| `MIDDLEWARE_SETUP.md` | Middleware configuration guide |

## Your Environment Variables

Copy `.env.local.example` to `.env.local` and fill in:

```env
# Get from Supabase Dashboard > Settings > API
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-role-key

# Get from resend.com
RESEND_API_KEY=your-resend-key

# Your choice
ADMIN_EMAIL=your-admin@email.com
```

## Quick Start

1. **Create Supabase account** at supabase.com
2. **Copy your API keys** from Supabase Settings > API
3. **Create `.env.local`** with your keys
4. **Create database table** using SQL in NEWSLETTER_SETUP.md
5. **Test newsletter** - subscribe on your website

## Using in Your App

### Server Component (fetch data)
```tsx
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.from('newsletter_subscribers').select();
  return <div>{data?.length} subscribers</div>;
}
```

### Client Component (interactive)
```tsx
'use client';
import { createClient } from '@/utils/supabase/client';

export default function Component() {
  const supabase = createClient();
  // Use supabase in useEffect, onClick, etc.
}
```

### API Route (backend logic)
```ts
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  const { data } = await supabase.from('newsletter_subscribers').select();
  return Response.json(data);
}
```

## Key Differences from Before

| Before | Now |
|--------|-----|
| Direct `createClient()` | `await createClient()` in server, `createClient()` in client |
| Service key only | Service key (server) + Publishable key (browser) |
| No session management | Automatic session refresh via middleware |
| No structured helpers | Organized in `utils/supabase/` |

## Security

- ✅ Service key stays on server (never sent to browser)
- ✅ Publishable key is safe in `NEXT_PUBLIC_*` variables
- ✅ Middleware handles session refresh automatically
- ✅ Newsletter signups use Row Level Security policies

## What's Enabled Now

✅ Newsletter signup → Stored in Supabase  
✅ Email validation → Via Resend  
✅ Welcome emails → Sent automatically  
✅ Admin notifications → Sent to your email  
✅ Session management → Automatic  
✅ SSR support → For authentication (future)  

## Next Steps

1. **Test the newsletter** - verify emails and database storage
2. **Review NEWSLETTER_SETUP.md** - understand the database structure
3. **Optional**: Add Supabase Auth for user accounts
4. **Optional**: Create admin dashboard to view subscribers

## Need Help?

- Newsletter setup: See `NEWSLETTER_SETUP.md`
- Middleware setup: See `MIDDLEWARE_SETUP.md`
- Supabase docs: https://supabase.com/docs
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware

## Production Checklist

- [ ] Add `.env.local` to `.gitignore`
- [ ] Set environment variables in Vercel (or your hosting)
- [ ] Test newsletter signup in production
- [ ] Monitor email delivery (Resend dashboard)
- [ ] Set up database backups (Supabase settings)
- [ ] Review Row Level Security policies (Supabase > Auth > Policies)
