# KLYKGO Supabase email template

Use `confirm-signup.html` for **Authentication → Email Templates → Confirm signup** in the hosted Supabase dashboard.

Recommended subject for launch:

`KLYKGO | E-Mail-Adresse bestätigen`

The website now saves the selected website language (`de`, `en`, or `fr`) into signup metadata, so the template automatically renders the matching language through Supabase Go-template conditions.

For a professional sender identity in production, configure **Supabase Custom SMTP** with a KLYKGO mailbox such as `noreply@klykgo.ch` or `account@klykgo.ch` instead of relying on Supabase's default development mail sender.
