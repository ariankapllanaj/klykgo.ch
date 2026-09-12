# Deploy KLYKGO on GitHub Pages

This project is already prepared for GitHub Pages.

## 1. Create the repository

Create a new GitHub repository, for example:

`klykgo-website`

Do not add another README, .gitignore, or license when creating it if you are uploading this prepared project.

## 2. Upload this project

Upload the contents of this folder to the repository root. The root of the repository must contain files such as:

- `package.json`
- `next.config.mjs`
- `app/`
- `components/`
- `.github/workflows/deploy-pages.yml`

Do not upload the parent folder as an extra nested level.

## 3. Enable GitHub Pages

In GitHub go to:

**Settings > Pages > Build and deployment > Source > GitHub Actions**

Then push/commit to the `main` branch. The included workflow will install dependencies, build the static Next.js export, and deploy the `out/` folder automatically.

## 4. Open the website

For a normal project repository, the URL will normally be:

`https://YOUR-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

The project automatically detects the repository name during GitHub Actions builds and sets the correct Next.js `basePath`, so you do not need to edit it manually.

If the repository itself is named `YOUR-USERNAME.github.io`, it automatically uses the root URL instead.

## 5. Formspree (when ready)

The contact form expects the environment variable:

`NEXT_PUBLIC_FORMSPREE_ENDPOINT`

To add it on GitHub:

**Settings > Secrets and variables > Actions > New repository secret**

Name:

`NEXT_PUBLIC_FORMSPREE_ENDPOINT`

Value example:

`https://formspree.io/f/xxxxxxx`

After saving the secret, go to **Actions**, open the deployment workflow and run it again, or push a new commit.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Local production test

```bash
npm run build
```

The static website will be generated in `out/`.

## Phase 2 note

GitHub Pages is suitable for the current static frontend phase. When authentication, Supabase, Stripe subscriptions, secure server routes and webhooks are added, deploy the full Next.js application to server-capable hosting rather than GitHub Pages.
