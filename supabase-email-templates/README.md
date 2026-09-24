# KLYKGO Supabase email templates

These templates are designed for the hosted Supabase dashboard and support the KLYKGO website languages (German, English and French) through the user's `language` metadata.

## Confirm signup

Supabase path:

**Authentication → Email Templates → Confirm signup**

Template:

`confirm-signup.html`

Recommended subject:

`KLYKGO | E-Mail-Adresse bestätigen`

## Password recovery

Supabase path:

**Authentication → Email Templates → Reset Password / Recovery**

Template:

`reset-password.html`

Recommended subject:

`KLYKGO | Passwort zurücksetzen`

The password recovery template uses Supabase's `{{ .ConfirmationURL }}` so it remains compatible with the current `/reset-password/` flow in this project.

## Sender identity

For production, configure **Supabase Custom SMTP** so the sender appears as KLYKGO rather than the default Supabase sender.

Recommended sender:

`KLYKGO <info@klykgo.ch>`

Both templates also direct account-support questions to `info@klykgo.ch` and recommend enabling authenticator-app Two-Factor Authentication (2FA) for additional account protection.
