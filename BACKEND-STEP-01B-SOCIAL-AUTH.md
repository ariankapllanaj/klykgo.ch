# Backend Step 01B: Social login + branded confirmation email

This step keeps the existing email/password authentication and adds:

- Google login (covers Gmail / Google accounts)
- Microsoft login (covers Outlook, Hotmail, Live and Microsoft 365 accounts)
- Apple login (covers Apple ID / iCloud users)
- Yahoo login through a Supabase custom OAuth provider
- Branded multilingual KLYKGO signup confirmation email

## 1. Supabase redirect URLs

In **Supabase → Authentication → URL Configuration** set:

**Site URL (development while testing):**

`http://localhost:3000`

Add these to **Redirect URLs**:

- `http://localhost:3000/**`
- `https://klykgo.ch/**`
- `https://www.klykgo.ch/**`

When the website is live, change the primary Site URL to `https://klykgo.ch`.

## 2. Google

In **Supabase → Authentication → Providers → Google**, enable Google.

Create a Google OAuth web client in Google Cloud and use the Supabase callback shown in the provider setup, normally:

`https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

Paste the Google Client ID and Client Secret into Supabase.

## 3. Microsoft (Outlook + Hotmail)

In **Supabase → Authentication → Providers → Azure**, enable Azure.

Create a Microsoft Entra application and allow the account types you want. For public KLYKGO customers, select the option that includes **personal Microsoft accounts** so Outlook/Hotmail users can authenticate.

Redirect URI:

`https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

The frontend already requests the required `email` scope. Supabase uses Microsoft's `common` tenant by default, which generally allows Microsoft personal and work/school accounts.

## 4. Apple (Apple ID / iCloud)

In **Supabase → Authentication → Providers → Apple**, enable Apple.

For web OAuth, Apple requires an Apple Developer account, Services ID and signing key. Apple's OAuth secret must be rotated periodically, so record that maintenance task before launch.

Use the callback URL required by Supabase, normally:

`https://YOUR_PROJECT_REF.supabase.co/auth/v1/callback`

## 5. Yahoo

Yahoo is not one of Supabase's built-in social providers, so this project uses the custom provider identifier:

`custom:yahoo`

Create a Yahoo application in Yahoo Developer Network and request OpenID Connect **Profile** and **Email** permissions.

Then in **Supabase → Authentication → Providers → New Provider → Manual configuration**, create a custom OAuth2 provider:

- Identifier: `custom:yahoo`
- Client ID: Yahoo Consumer Key
- Client Secret: Yahoo Consumer Secret
- Authorization URL: `https://api.login.yahoo.com/oauth2/request_auth`
- Token URL: `https://api.login.yahoo.com/oauth2/get_token`
- UserInfo URL: `https://api.login.yahoo.com/openid/v1/userinfo`
- Scopes: `openid profile email`
- PKCE: keep enabled

Supabase will show a callback URL for the custom provider. Add exactly that callback to the Yahoo application.

## 6. Branded confirmation email

Open:

**Supabase → Authentication → Email Templates → Confirm signup**

Copy the complete contents of:

`supabase-email-templates/confirm-signup.html`

Recommended subject:

`KLYKGO | E-Mail-Adresse bestätigen`

The app stores the selected site language in `user_metadata.language`, so the email renders German, English or French automatically.

## 7. Professional sender address (recommended before production)

A nice HTML template is only half of a professional email. Configure **Supabase Custom SMTP** so the message comes from a KLYKGO domain address, for example:

- Sender name: `KLYKGO`
- Sender email: `account@klykgo.ch` or `noreply@klykgo.ch`

If the mailbox is hosted at Hostpoint, their SMTP host is `asmtp.mail.hostpoint.ch`. Hostpoint documents authenticated SMTP on port 587 with STARTTLS (or port 465 with SSL for mail clients). Use the SMTP settings accepted by Supabase and test delivery before launch.

Also make sure SPF, DKIM and DMARC are correctly configured for `klykgo.ch`.

## 8. Test order

1. Test existing email/password registration.
2. Confirm that the new KLYKGO email template arrives in the selected language.
3. Enable and test Google.
4. Enable and test Microsoft with both an Outlook/Hotmail account and, if available, a Microsoft 365 account.
5. Enable and test Apple.
6. Configure Yahoo custom OAuth and test Yahoo last.
7. Test logout and page refresh after every provider.

Do not continue to Stripe until all enabled authentication methods are stable.
