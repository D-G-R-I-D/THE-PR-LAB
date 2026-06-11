# Newsletter Database Setup Guide

## Supabase Setup

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and sign up
- Create a new project
- Copy your **Project URL** and **Publishable Key** (anon key)

### 2. Get Your API Keys

In your Supabase Dashboard > Settings > API:
- **Project URL** - `NEXT_PUBLIC_SUPABASE_URL`
- **Anon/Public Key** - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- **Service Role Key** - `SUPABASE_SERVICE_KEY` (keep secret!)

### 3. Create the Newsletter Subscribers Table

In your Supabase dashboard, go to **SQL Editor** and run:

```sql
-- Create newsletter_subscribers table
CREATE TABLE newsletter_subscribers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts (for API)
CREATE POLICY "Allow anonymous inserts" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow reads (for admin)
CREATE POLICY "Allow authenticated reads" ON newsletter_subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');
```

### 4. Add Environment Variables

Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual keys:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
SUPABASE_SERVICE_KEY=your-service-role-key

# Resend
RESEND_API_KEY=your-resend-api-key

# Admin email
ADMIN_EMAIL=your-admin@email.com
```

### 5. Install Supabase Packages (Already Done)

```bash
npm install @supabase/supabase-js @supabase/ssr
```

## Project Structure

This project now includes Supabase SSR helpers:

```
utils/
  supabase/
    server.ts      - Server-side client for API routes & Server Components
    client.ts      - Client-side client for Client Components
middleware.ts      - Middleware to refresh sessions
```

## Using Supabase in Your App

### In Server Components:
```tsx
import { createClient } from '@/utils/supabase/server';

export default async function Page() {
  const supabase = await createClient();
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select();

  return <div>{subscribers?.length} subscribers</div>;
}
```

### In Client Components:
```tsx
'use client';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

export default function Component() {
  const [data, setData] = useState(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.from('newsletter_subscribers').select().then(({ data }) => setData(data));
  }, [supabase]);

  return <div>{data?.length} subscribers</div>;
}
```

### In API Routes:
```tsx
import { createClient } from '@supabase/supabase-js';

export async function POST(request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
  
  const { data } = await supabase.from('newsletter_subscribers').select();
  return Response.json(data);
}
```

## Environment Variables Reference

| Variable | Public? | Where to Get | Description |
|----------|---------|-------------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Yes | Supabase Settings > API | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | ✅ Yes | Supabase Settings > API (Anon key) | Publishable key for browser auth |
| `SUPABASE_SERVICE_KEY` | ❌ No (Secret) | Supabase Settings > API | Service role key for server-only |
| `RESEND_API_KEY` | ❌ No (Secret) | [resend.com](https://resend.com) | API key for sending emails |
| `ADMIN_EMAIL` | ❌ No (Secret) | Your choice | Where admin notifications go |

⚠️ **IMPORTANT**: Never commit `.env.local` to git. Keys starting with `NEXT_PUBLIC_` are safe to expose (visible in browser), others must stay secret.

## Testing the Newsletter

1. Start your dev server: `npm run dev`
2. Go to your website and find the newsletter signup
3. Enter an email and subscribe
4. Check:
   - Your email inbox (should get welcome email)
   - Admin email (should get notification)
   - Supabase dashboard > newsletter_subscribers table (should see new entry)

## Querying Newsletter Subscribers

### In Supabase Dashboard:
Go to newsletter_subscribers table and click **Export** to download CSV

### Via SQL:
```sql
SELECT email, subscribed_at 
FROM newsletter_subscribers 
ORDER BY subscribed_at DESC
LIMIT 10;
```

### Via Code:
```typescript
const supabase = await createClient();
const { data: subscribers } = await supabase
  .from('newsletter_subscribers')
  .select()
  .order('subscribed_at', { ascending: false });
```

## Security Notes

- ✅ `NEXT_PUBLIC_*` variables are public and safe in code
- ❌ `SUPABASE_SERVICE_KEY` is secret - never expose to client
- ✅ Email validation prevents spam
- ✅ Duplicate emails are prevented with database constraint
- ✅ Middleware refreshes sessions automatically
