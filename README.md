# KLYKGO | Phase 1 Frontend

Premium responsive one-page frontend for KLYKGO Marketing Agency.

## Stack

- Next.js (App Router)
- TypeScript
- Custom CSS
- GSAP + ScrollTrigger
- Formspree-ready contact form

## Phase 1 included

- Responsive desktop / tablet / mobile layout
- Fixed premium navigation + mobile menu
- Intro-only parallax scroll animation
- Floating service objects in hero
- About / positioning
- All 5 service categories
- Webdesign **and full web development** positioning
- Why KLYKGO
- Process
- 3 subscription cards with temporary descriptions/prices
- Phase-2 modal for Login / subscription actions
- Formspree-ready contact form
- Instagram / TikTok / LinkedIn placeholders
- Impressum / Datenschutz placeholders

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Formspree

1. Copy `.env.example` to `.env.local`
2. Replace `YOUR_FORM_ID` with the real Formspree form ID:

```env
NEXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Restart `npm run dev`.

## Replace before launch

Search the project for these placeholders:

- `CHF XXX`
- `hello@klykgo.ch`
- Social media links (`href="#"` in footer)
- Impressum / Datenschutz links
- Company city/address
- Final subscription contents

## Phase 2 planned

Recommended backend architecture:

- Supabase Authentication
- Supabase PostgreSQL
- Stripe Checkout / Billing / Customer Portal
- Subscription webhooks
- Customer dashboard
- Register / Login / Password Reset

The Phase 1 frontend is already structured so the current Login and subscription CTAs can be connected during Phase 2 without redesigning the page.


## Multilingual frontend

The Phase 1 frontend includes German, English and French with a DE / EN / FR switcher on desktop and inside the mobile menu. The selected language is remembered in the browser.

## GitHub Pages deployment

This package is prepared for GitHub Pages. See `GITHUB-PAGES.md` for the short deployment instructions. The included GitHub Actions workflow automatically builds and publishes the static Next.js export on every push to `main`.

## Backend step 01: Supabase authentication

This build adds email/password registration, login, session persistence and logout with Supabase Auth. Stripe and subscriptions are intentionally not connected yet so authentication can be tested independently.

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Add your Supabase Project URL and public anon key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_YOUR_KEY
```

4. Install dependencies and run locally:

```bash
npm install
npm run dev
```

5. Open the site and use `Login` in the top navigation. Registration and login are handled by Supabase. If email confirmation is enabled in Supabase, confirm the email before attempting to log in.

The Supabase publishable key is intended for browser use. Never place a Supabase secret key or Stripe secret key in any `NEXT_PUBLIC_` environment variable.
