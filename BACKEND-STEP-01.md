# Backend Step 01: Supabase Authentication

This step intentionally adds authentication only. Stripe, paid subscriptions, the database profile table and the customer dashboard are not connected yet.

## What is included

- Supabase browser client
- Register with email and password
- Login with email and password
- Persistent browser session
- Logout
- Responsive authentication modal
- German, English and French auth text
- Desktop and mobile Login/Account button
- Hostpoint-safe static Next.js architecture

## 1. Create the Supabase project

Create a new project in Supabase.

In the Supabase dashboard, open the project's Connect/API Keys area and copy:

- Project URL
- Publishable key (`sb_publishable_...`)

Do not use a secret key in the frontend.

## 2. Create `.env.local`

Copy `.env.example` to `.env.local` and replace the placeholders:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

## 3. Install and run

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## 4. Test

1. Click Login in the top navigation.
2. Switch to Register.
3. Register a test email/password.
4. If email confirmation is enabled in Supabase, confirm the email.
5. Log in.
6. The top Login button should change to Account.
7. Open Account and test Logout.
8. Refresh the page after logging in. The session should remain active.

## Supabase URL configuration for email confirmation

For local testing, add `http://localhost:3000` as an allowed redirect/site URL in Supabase Auth URL Configuration. Before production, add `https://klykgo.ch` and the final canonical domain used by the site.

## Security

The publishable key is designed for browser use. Never add a Supabase secret key, legacy service-role key, Stripe secret key or webhook secret to a `NEXT_PUBLIC_` variable.
