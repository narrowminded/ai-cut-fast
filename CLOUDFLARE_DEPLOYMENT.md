# Deploying to Cloudflare Pages (Free)

Your app is now configured for **Cloudflare Pages** deployment, which is free and perfect for your TanStack Start application.

## Step-by-Step Deployment

### 1. Create Cloudflare Account
- Go to [https://dash.cloudflare.com](https://dash.cloudflare.com)
- Sign up for free (no credit card required for Pages)

### 2. Connect Your GitHub Repository
1. In Cloudflare Dashboard, go to **Pages** (left sidebar)
2. Click **Create a project** → **Connect to Git**
3. Authorize GitHub and select your `narrowminded/ai-cut-fast` repository
4. Click **Begin setup**

### 3. Configure Build Settings
Cloudflare will auto-detect these, but verify:
- **Framework preset**: None (or Other)
- **Build command**: `npm run build`
- **Build output directory**: `dist/client`
- **Root directory**: (leave empty)

### 4. Environment Variables (Optional)
Skip for now (you don't need any)

### 5. Deploy
Click **Save and Deploy** — Cloudflare will:
- Clone your repo
- Run `npm run build`
- Deploy the `dist/client` folder
- Give you a live URL (like `ai-cut-fast.pages.dev`)

## After Deployment

### Connect Your Own Domain (Optional)
If you have a domain, you can:
1. Go to your project settings in Cloudflare Pages
2. Add a custom domain
3. Update your domain DNS (Cloudflare will guide you)

### Custom Domain Example
- Free `.pages.dev` subdomain: `ai-cut-fast.pages.dev`
- Or your own domain: `airemover.com`

## Troubleshooting

**If build fails:**
- Check the build logs in Cloudflare Pages dashboard
- Verify `dist/client` folder is being built

**If site shows 404:**
- Cloudflare will automatically redirect all routes to `index.html` for SPA routing

## That's it! 🚀

Your site is now deployed to Cloudflare's global CDN, served from data centers worldwide. Completely free!
