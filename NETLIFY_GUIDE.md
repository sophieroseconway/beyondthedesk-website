# Beyond The Desk — Netlify Hosting & Domain Guide

A friendly, step-by-step guide for getting your website online with a custom domain, and updating it whenever you like. Written with zero assumptions about prior tech knowledge.

---

## What you're actually doing (in plain English)

Right now, your website lives only on your computer. To share it with the world (and put a nice clean link on your socials), you need two things:

1. **A host** — somewhere on the internet that serves your website to visitors. We're using Netlify because it's free and beginner-friendly.
2. **A domain** — your custom web address (like `beyondthedesktravel.com`). This is what people type in.

The host stores the site. The domain points to the host. That's the whole concept.

---

## Part 1: Get your website online with Netlify (first-time setup)

You only do this part once.

### Step 1.1 — Create your free Netlify account

1. Open your web browser and go to **https://www.netlify.com**
2. Click **"Sign up"** in the top right corner.
3. You can sign up with email, or with a Google/GitHub account (Google is easiest if you already have one).
4. Follow the prompts. You may be asked a few questions like "what brings you to Netlify" — pick whatever fits, none of it is binding.

### Step 1.2 — Deploy your site (the magic drag-and-drop)

1. Once logged in, look for a section that says something like **"Add new site"** or **"Sites"**.
2. Find the option **"Deploy manually"** or you'll see a big drop zone that says something like *"Drag and drop your site output folder here"*.
3. Open Finder on your Mac and navigate to:
   `Documents > Claude > Projects > BeyondTheDesk Website`
4. **Drag the entire folder** onto the Netlify drop zone in your browser.
5. Wait about 10–30 seconds. Netlify will upload and process the files.
6. You'll get a random temporary URL like `https://magical-cupcake-12345.netlify.app` — click it to see your site live on the internet!

Congratulations, your website is officially online.

### Step 1.3 — Rename your site (optional but tidy)

The random URL is a bit silly. You can change it:

1. From your site's dashboard, click **"Site configuration"** or **"Domain management"**.
2. Look for **"Change site name"**.
3. Pick something like `beyondthedesk` so your temporary URL becomes `beyondthedesk.netlify.app`.

This is just a placeholder until your real domain is connected.

---

## Part 2: Buy and connect your custom domain

### Step 2.1 — Pick and buy your domain

Recommended registrars (places to buy domains):

- **Cloudflare Registrar** — cheapest, no upsells. https://www.cloudflare.com/products/registrar/
- **Porkbun** — also cheap, friendly interface. https://porkbun.com
- **Namecheap** — popular, easy to use. https://www.namecheap.com

Search for the domain you want (e.g., `beyondthedesktravel.com`). Expect to pay around **$10–$15 USD per year** for a `.com`.

**Important:** Check the renewal price, not just the first-year price. Some registrars offer cheap intro pricing then renew at a higher rate.

Complete the purchase. Skip any add-ons they try to sell you (you don't need extra "SSL," "premium DNS," or "site builder" — Netlify handles all that for free).

### Step 2.2 — Connect the domain to Netlify

1. Back in your Netlify dashboard, go to your site.
2. Click **"Domain management"** (sometimes under "Site configuration").
3. Click **"Add a domain"** or **"Add custom domain"**.
4. Type in the domain you just bought (e.g., `beyondthedesktravel.com`) and click **Verify**.
5. Netlify will show you some **DNS records** — these are instructions you need to give your domain registrar so it knows where to send visitors.

### Step 2.3 — Update DNS at your registrar

This part sounds technical but is just copy-and-paste.

1. Log into the registrar where you bought your domain (Cloudflare, Porkbun, Namecheap, etc.).
2. Find the **DNS settings** for your domain.
3. Netlify will give you values to enter — usually:
   - An **A record** pointing to a Netlify IP address
   - A **CNAME record** for the `www` version of your domain
4. Copy them exactly as Netlify shows them.

**Easier alternative:** Netlify also offers to manage DNS for you. If you see a button like **"Use Netlify DNS"**, that's the simplest path — Netlify will give you 4 "nameservers" to paste into your registrar, and they handle everything else.

### Step 2.4 — Wait

DNS changes can take anywhere from 5 minutes to 24 hours to take effect (usually under an hour). Grab a tea. Once it's done, typing your domain into a browser will show your site.

### Step 2.5 — Enable HTTPS (the padlock)

Netlify does this automatically and for free. After the domain is connected, look for an option to **"Provision SSL certificate"** if it isn't already on. This gives you the secure little padlock icon in browsers, which makes your site look legitimate and protects visitors.

---

## Part 3: Updating your site later (the part you'll use most)

This is the everyday workflow once you're set up. **Bookmark this section.**

### When you want to make changes:

1. Ask Claude (me!) to make the edits you want — for example: *"Add a new testimonial to the community page"* or *"Update the booking link on the homepage."*
2. I'll edit the files in your `BeyondTheDesk Website` folder directly.
3. Once changes look good on your computer, you publish them.

### Publishing the updated version:

1. Log into Netlify and go to your site.
2. Click the **"Deploys"** tab at the top.
3. Scroll down — you'll see a drop zone that says something like *"Need to update your site? Drag and drop your site folder here"*.
4. Open Finder and drag the **entire `BeyondTheDesk Website` folder** onto that drop zone.
5. Wait 10–30 seconds. Done. Your live site now has the new changes.

That's the whole update process. No coding, no command line, no scary stuff.

### Bonus: Roll back if something breaks

If you ever publish a change and something looks wrong:

1. Go to the **"Deploys"** tab.
2. You'll see a list of all your past deploys.
3. Click the one from before you made the breaking change.
4. Click **"Publish deploy"**.
5. Your site instantly reverts to that older working version. Crisis averted.

---

## Common questions

**Will my website ever go down?**
Netlify is extremely reliable — uptime is typically 99.99%+. For a small business site like yours, you can essentially treat it as "always on."

**Do I have to keep paying Netlify?**
No. The free tier is generous and covers everything you need for a site like yours. You only pay if you outgrow it (which means hundreds of thousands of visitors a month — a great problem to have).

**What about the domain — is that a one-off cost?**
No, domains renew annually. Set a calendar reminder, or enable auto-renew at your registrar so you don't accidentally lose it.

**Can I get an email address at my domain (e.g., hello@beyondthedesktravel.com)?**
Yes! That's a separate service though — Google Workspace ($6/month) or Zoho Mail (free tier available) are the popular options. Let me know when you're ready and I'll write a guide for that too.

**What if I want to change hosts later?**
Easy. Your files are always on your computer, so you can take them anywhere. Your domain is also separate from your host, so you can point it at a different host whenever you like.

---

## Quick glossary

- **Domain** — your web address (e.g., `beyondthedesktravel.com`)
- **Registrar** — the company you buy your domain from
- **Host** — the company that stores and serves your website (Netlify, in your case)
- **DNS** — the system that connects domains to hosts (think of it as the internet's phone book)
- **Deploy** — the act of publishing your website (or changes) to the internet
- **SSL / HTTPS** — the secure padlock in browsers; Netlify provides this free

---

## When in doubt

If you ever get stuck or confused, just ask Claude. Tell me where you are in the process and what you're seeing on screen, and I'll walk you through it. There's no question too basic.

You've got this!
