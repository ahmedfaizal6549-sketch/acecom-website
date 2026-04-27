# AceCom Lanka - Supabase + Vercel Setup Guide

## Step 1: Create a Supabase Account & Project

1. Go to **https://supabase.com** and click **Start your project**
2. Sign up with your GitHub account (or email)
3. Click **New Project**
4. Fill in:
   - **Project name**: `acecom-lanka`
   - **Database password**: choose a strong password (save it somewhere!)
   - **Region**: pick the closest to Sri Lanka (e.g. Southeast Asia - Singapore)
5. Click **Create new project** and wait ~2 minutes for it to set up

## Step 2: Set Up the Database

1. In your Supabase dashboard, click **SQL Editor** in the left sidebar
2. Click **New Query**
3. Open the file `supabase-setup.sql` from your project folder
4. Copy the entire contents and paste it into the SQL Editor
5. Click **Run** (the green play button)
6. You should see "Success" — this creates all tables, security policies, and inserts your 16 products

## Step 3: Get Your Supabase Keys

1. In the Supabase dashboard, go to **Project Settings** (gear icon at bottom of sidebar)
2. Click **API** under Configuration
3. You'll see two important values:
   - **Project URL** — looks like `https://abcdefg.supabase.co`
   - **anon public** key — a long string starting with `eyJ...`
4. Copy both of these

## Step 4: Add Keys to Your Website

1. Open `js/supabase-config.js` in a text editor
2. Replace the placeholder values on lines 7-8:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';     // paste your Project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6...';   // paste your anon key
```

3. Save the file

## Step 5: Configure Supabase Auth

1. In Supabase dashboard, go to **Authentication** > **Providers**
2. Make sure **Email** is enabled (it should be by default)
3. Go to **Authentication** > **URL Configuration**
4. Set **Site URL** to your Vercel URL (you'll update this after deploying):
   - For now, set it to `http://localhost:3000`
5. Under **Redirect URLs**, add:
   - `http://localhost:3000`
   - `https://your-app.vercel.app` (update after deploying)

## Step 6: Create a GitHub Repository

1. Go to **https://github.com** and sign in (or create an account)
2. Click the **+** icon → **New repository**
3. Name it `acecom-website`
4. Keep it **Public** or **Private** (your choice)
5. Click **Create repository**
6. Open Terminal on your Mac and run these commands:

```bash
cd ~/path/to/acecom-website
git init
git add .
git commit -m "Initial commit - AceCom Lanka e-commerce site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/acecom-website.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## Step 7: Deploy to Vercel

1. Go to **https://vercel.com** and click **Sign Up**
2. Sign up with your **GitHub account** (recommended — it makes connecting repos easy)
3. Click **Add New...** → **Project**
4. You'll see your GitHub repos — click **Import** next to `acecom-website`
5. Under **Configure Project**:
   - **Framework Preset**: select `Other`
   - **Root Directory**: leave as `.` (dot)
   - Leave Build and Output settings empty (it's a static site)
6. Click **Deploy**
7. Wait 30-60 seconds — Vercel will give you a URL like `https://acecom-website.vercel.app`

## Step 8: Update Supabase with Your Live URL

1. Copy your Vercel URL (e.g. `https://acecom-website.vercel.app`)
2. Go back to **Supabase Dashboard** → **Authentication** → **URL Configuration**
3. Update **Site URL** to your Vercel URL
4. Add your Vercel URL to **Redirect URLs**
5. Save

## Step 9: Set Up a Custom Domain (Optional)

### In Vercel:
1. Go to your project → **Settings** → **Domains**
2. Add your custom domain (e.g. `acecom.lk`)
3. Vercel will show you DNS records to add
4. Go to your domain registrar and add the DNS records
5. Wait for DNS propagation (can take up to 48 hours)

### Update Supabase:
1. Add your custom domain to Supabase Auth redirect URLs

## Testing Your Site

After deployment:

1. Visit your Vercel URL
2. Click **Sign Up** to create a test account
3. Check your email for a confirmation link
4. Sign in and try:
   - Browse products
   - Add items to cart
   - View your cart
   - The cart will now persist across devices when logged in!

## Troubleshooting

**"Invalid API key" error in browser console:**
→ Double-check your `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `supabase-config.js`

**Signup not working / no confirmation email:**
→ In Supabase, go to Authentication > Providers > Email and make sure "Confirm email" is toggled. For testing, you can disable it.

**Cart not saving for logged-in users:**
→ Make sure you ran the full `supabase-setup.sql` including the RLS policies

**Page not found on Vercel:**
→ Make sure `vercel.json` is in the root of your project and pushed to GitHub

**Changes not showing on Vercel:**
→ Push your changes to GitHub: `git add . && git commit -m "update" && git push`
→ Vercel auto-deploys on every push

## File Structure

```
acecom-website/
├── css/
│   └── style.css          ← All styles
├── js/
│   ├── main.js            ← Core site logic (cart, shop, products)
│   └── supabase-config.js ← Supabase client + auth + DB functions
├── index.html             ← Homepage
├── shop.html              ← Product listing with filters
├── product.html           ← Product detail page
├── cart.html              ← Shopping cart
├── login.html             ← Login page
├── signup.html            ← Registration page
├── about.html             ← About us
├── contact.html           ← Contact form
├── 404.html               ← Not found page
├── vercel.json            ← Vercel deployment config
├── supabase-setup.sql     ← Database schema (run once in Supabase)
└── SETUP-GUIDE.md         ← This file
```
