# Beyond The Desk — GitHub Hosting & Domain Guide

A friendly, step-by-step guide for getting your website online using GitHub Pages, and updating it whenever you like. Written with zero assumptions about prior tech knowledge.

---

## What you're actually doing (in plain English)

GitHub is a free service used by developers everywhere to store files and track every change to them. You'll use it for three things:

1. **A safe backup** — every version of your website, every change you ever make, kept forever.
2. **Free hosting** — GitHub has a feature called "GitHub Pages" that publishes your site to the internet at no cost.
3. **A clean update workflow** — make changes on your computer, click two buttons, your live website updates within 1–2 minutes.

You'll also need to buy a domain (your custom web address). The domain points to GitHub, and GitHub serves your site. Simple as that.

**The good news:** You will not be typing any commands. Everything is done through a free app called **GitHub Desktop** which handles all the technical stuff with friendly buttons.

---

## Part 1: One-time setup

You only do this section once. Set aside about 30 minutes.

### Step 1.1 — Create your free GitHub account

1. Open your browser and go to **https://github.com**
2. Click **"Sign up"** in the top right.
3. Pick a username — this becomes part of your behind-the-scenes URLs, so something simple and recognisable like `sophieroseconway` is ideal.
4. Use your email address and choose a strong password.
5. Verify your email when GitHub sends you a confirmation link.

### Step 1.2 — Install GitHub Desktop

This is the app that does all the hard work for you. **Don't skip this step** — it's what keeps everything click-based instead of command-line.

1. Go to **https://desktop.github.com**
2. Click **"Download for macOS"**.
3. Open the downloaded `.zip` file. A "GitHub Desktop" icon will appear.
4. Drag that icon into your **Applications** folder.
5. Open GitHub Desktop from Applications.
6. Sign in with the GitHub account you just created.
7. When asked to "Configure Git", just click **Continue** — the defaults are fine.

### Step 1.3 — Create a repository for your website

A "repository" (or "repo") is a special folder that GitHub tracks every change to. Think of it as a magic folder with a built-in time machine.

1. In GitHub Desktop, click **File → New Repository** (or use the welcome screen).
2. **Name:** `beyondthedesk-website` (lowercase, no spaces).
3. **Local path:** click "Choose…" and pick `/Users/sophieroseconway/Documents/Claude/Projects/`.
4. Leave everything else at default. Click **Create Repository**.

GitHub Desktop will create a new empty folder at `/Users/sophieroseconway/Documents/Claude/Projects/beyondthedesk-website`.

### Step 1.4 — Move your website files into the repository

Your website files need to LIVE inside the new repository folder for GitHub to track them.

1. Open Finder.
2. Open the new folder GitHub Desktop just created: `Documents > Claude > Projects > beyondthedesk-website`.
3. From your existing `BeyondTheDesk Website` folder, **copy everything** (all HTML files, the `css` folder, the `js` folder, the `assets` folder, the guide files, etc.) and paste them into the new `beyondthedesk-website` folder.
4. Switch back to GitHub Desktop. You should see a long list of files in the left sidebar, all marked with green plus icons. That's GitHub noticing all your new files.

### Step 1.5 — Make your first commit and publish it

A **commit** is a snapshot of your changes. **Publishing** sends that snapshot up to GitHub's servers.

1. At the bottom-left of GitHub Desktop, you'll see a "Summary" box. Type a short description like *"Initial website upload"*.
2. Click the blue **"Commit to main"** button.
3. Click **"Publish repository"** at the top of the window.
4. **Important:** In the popup that appears, **uncheck** "Keep this code private" (GitHub Pages needs the repo to be public to host it for free).
5. Click **"Publish Repository"**.

Your website is now safely stored on GitHub. You can see it at `https://github.com/YOUR_USERNAME/beyondthedesk-website`.

---

## Part 2: Switch on GitHub Pages (publish your site live)

1. Go to your repository on **github.com** in your browser (the link above).
2. Click the **"Settings"** tab (top right of the page).
3. In the left sidebar of Settings, click **"Pages"**.
4. Under **"Source"**, choose **"Deploy from a branch"**.
5. Under **"Branch"**, choose **"main"** and the folder **"/ (root)"**.
6. Click **Save**.
7. Wait 1–2 minutes, then refresh the page. A green banner will appear with your live URL — something like `https://yourusername.github.io/beyondthedesk-website/`.

Click that URL — your website is now live on the internet, for free, forever.

---

## Part 3: Buy and connect your custom domain

### Step 3.1 — Pick and buy a domain

Recommended registrars (places to buy domains):

- **Cloudflare Registrar** — cheapest, no upsells. https://www.cloudflare.com/products/registrar/
- **Porkbun** — also cheap, friendly interface. https://porkbun.com
- **Namecheap** — popular and easy to use. https://www.namecheap.com

Search for the domain you want (e.g., `beyondthedesktravel.com`). Expect to pay around **$10–$15 USD per year** for a `.com`. Always check the **renewal price**, not just the introductory one.

Skip any add-ons the registrar tries to sell (extra "SSL", "premium DNS", etc.) — GitHub provides all that for free.

### Step 3.2 — Tell GitHub about your domain

1. Back on your repo's **Settings → Pages** page on GitHub.
2. Under **"Custom domain"**, type your domain (e.g., `beyondthedesktravel.com`) and click **Save**.
3. GitHub will create a small file called `CNAME` in your repository automatically.

### Step 3.3 — Update DNS at your registrar

1. Log into the registrar where you bought your domain.
2. Find the **DNS settings** for that domain.
3. Add these records exactly (copy-paste, don't retype):

**Four A records** pointing the bare domain to GitHub:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**One CNAME record** for the `www` version:

| Type | Name | Value |
|------|------|-------|
| CNAME | www | `yourusername.github.io` |

(Replace `yourusername` with your actual GitHub username. Note the dot at the end is fine but not required, depending on the registrar.)

### Step 3.4 — Wait

DNS changes take anywhere from 5 minutes to 24 hours (usually under an hour). Grab a tea.

### Step 3.5 — Enable HTTPS (the padlock icon)

1. Back on **Settings → Pages**, wait for the **"Enforce HTTPS"** checkbox to become available (this can take up to an hour after DNS propagates).
2. Tick the box. GitHub provisions a free SSL certificate automatically.

Once that's done, your custom domain is live with the secure padlock — looks fully professional.

---

## Part 4: Updating your site (the everyday workflow)

This is what you'll do most often. **Bookmark this section.**

### When you want to change something:

1. Ask Claude to make the edit — for example: *"Add a testimonial to the community page"* or *"Update the WhatsApp number on contact"*.
2. Claude edits the files directly inside your `beyondthedesk-website` folder.
3. Open **GitHub Desktop**. The left sidebar will show every file Claude changed, with coloured markers (green = added, yellow = modified).
4. In the **"Summary"** box at the bottom-left, type a short description of the change — e.g., *"Added new testimonial"* or *"Fixed contact details"*.
5. Click the blue **"Commit to main"** button.
6. Click **"Push origin"** at the top of the window.

Within 1–2 minutes your live website will reflect the changes. Refresh your browser to see them.

That's it. No drag-and-drop, no copying folders, no command line.

### Roll back if something breaks

Every commit is preserved forever, so you can always undo:

1. In GitHub Desktop, click the **"History"** tab.
2. Find the commit you want to undo (the most recent one will be at the top).
3. Right-click it → **"Revert Changes in Commit"**.
4. GitHub Desktop creates a new commit that undoes those changes.
5. Click **"Push origin"** to publish the revert.

Within 1–2 minutes, your live site rolls back to its previous state.

---

## Common questions

**Will my code be visible to other people?**
Yes — your HTML, CSS, and JavaScript files will be public on GitHub. This is normal and not a problem. The same code is already viewable to anyone who visits your live website (right-click → View Source). Just don't put any private information (passwords, API keys, personal documents) in the repository.

**Can I work on my site from another computer?**
Yes! Install GitHub Desktop on the other computer, sign in, and click **"Clone a Repository"**. Your files will download and you can edit them anywhere.

**What's a "commit" vs "push"?**
- **Commit** = save a snapshot of changes (still only on your computer).
- **Push** = send those saved snapshots up to GitHub (which then publishes them to your live site).

You can commit several times before pushing, but for simple edits, commit and push together.

**Do I need to learn Git or use a terminal?**
No. GitHub Desktop handles everything with buttons. You never need to type commands.

**What if I accidentally delete a file?**
Every version is preserved in your commit history forever. You can always restore from there.

**Is GitHub Pages reliable?**
Yes — extremely. Used by millions of professional websites. Uptime is excellent.

**What about email at my domain?**
A separate service. Google Workspace ($6/month) or Zoho Mail (free tier) are the common picks. Just ask and I'll write a setup guide when you're ready.

---

## Quick glossary

- **GitHub** — the cloud service that stores your files and tracks every change.
- **GitHub Desktop** — the free app on your Mac that talks to GitHub for you.
- **Repository (repo)** — your magic tracking folder.
- **Commit** — a saved snapshot of changes.
- **Push** — sending commits up to GitHub.
- **GitHub Pages** — GitHub's free website hosting feature.
- **Main (branch)** — the "live" version of your code.
- **DNS** — the system that connects your domain to GitHub.
- **SSL / HTTPS** — the secure padlock you see in browsers.

---

## When in doubt

Just ask Claude. Tell me where you are in the process and exactly what you're seeing on screen, and I'll walk you through it.

---

## Note on the old Netlify guide

If you've decided to go with GitHub instead, you can safely delete the old `NETLIFY_GUIDE.md` file from your project folder. Just say the word and I'll remove it for you, or you can drag it to the trash yourself.

You've got this!
