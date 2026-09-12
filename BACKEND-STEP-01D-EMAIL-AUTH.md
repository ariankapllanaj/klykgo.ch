# Backend Step 01D — Email authentication only

This version removes all social OAuth buttons and provider logic.

Authentication now uses only:

- Email + password registration
- Email confirmation
- Email + password login
- Persistent Supabase session
- Logout

The professional multilingual Supabase confirmation email template remains in:

`supabase-email-templates/confirm-signup.html`

No Google, Microsoft, Apple or Yahoo provider setup is required for this version.

## Required environment variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/YOUR_FORM_ID
```

## Test

1. Run `npm install`.
2. Run `npm run dev`.
3. Register with an email address.
4. Confirm the email from the Supabase confirmation message.
5. Log in with the confirmed email and password.
6. Refresh and confirm the session remains active.
7. Log out.
