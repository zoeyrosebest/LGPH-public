# Long Gone Production Home: website

This is a copy of www.lgphome.com rebuilt as a website that you own. The pages are generated from editable content files by [Eleventy](https://www.11ty.dev/), and you edit them from your browser through [TinaCMS](https://tina.io) — no code required.

## How you edit the site day-to-day

Once this site is deployed and connected to Tina Cloud (one-time setup is below), you go to **`https://your-site-url.netlify.app/admin/`** (or `https://lgphome.com/admin/` after the domain switch), log in, and get a form-based editor for every page. Change text, swap photos, add gallery items, publish. Each publish writes back to this GitHub repo and Netlify rebuilds the live site in about a minute.

If something isn't editable in Tina (fine spacing, colors), see "Advanced: editing by hand" at the bottom.

## What's in here

The visitor-facing pages come from the content files in `_data/` plus the templates next to them:

| Page on the old site | Content file | Template |
|---|---|---|
| Home (`/`) | `_data/home.json` | `index.njk` |
| About (`/about`) | `_data/about.json` | `about/index.njk` |
| Services (`/services`) | `_data/services.json` | `services/index.njk` |
| Select Film (`/video-portfolio`) | `_data/film.json` | `video-portfolio/index.njk` |
| Select Video (`/copy-of-film-portfolio`) | `_data/video.json` | `copy-of-film-portfolio/index.njk` |
| Select Post-Production (`/copy-of-film-portfolio-1`) | `_data/post.json` | `copy-of-film-portfolio-1/index.njk` |
| Select Photography (`/photography-portfolio`) | `_data/photography.json` | `photography-portfolio/index.njk` |
| Select Design (`/design-portfolio`) | `_data/design.json` | `design-portfolio/index.njk` |
| Praise and Results (`/praise-and-results`) | `_data/praise.json` | `praise-and-results/index.njk` |
| Contact (`/contact`) | `_data/contact.json` | `contact/index.njk` |
| The Art Store (hidden, `/store`) | `_data/store.json` | `store/index.njk` |
| "Page not found" | `_data/notfound.json` | `404.njk` |

Each folder name matches the old Wix address, so existing links keep working after the move.

Shared pieces:

- `_data/site.json` — the header, the menu, the footer, PayPal and social icons. One change here updates every page.
- `_includes/base.njk` — the shared page shell (header, menu, footer). You almost never need to touch this.
- `_includes/work-list.njk` — a small shared block that renders a list of film/video projects.
- `css/style.css` — all colors, fonts and layout. Color variables are at the top.
- `js/site.js` — the phone menu, the click-to-enlarge image viewer and the contact form.
- `assets/img/` — every image.
- `assets/video/` — the two videos Wix hosted directly. All other videos are YouTube embeds.
- `tina/config.ts` — the TinaCMS schema (which fields show up in the editor). You only touch this if you want to add a new editable field.

## First-time setup, in order

Do this once when you first move the site off Wix.

### 1. Put the site on GitHub

The repo should already be on GitHub (that's where you're reading this). Keep the default branch at `main`.

### 2. Sign up for Tina Cloud (free)

1. Go to **https://app.tina.io** and sign up with your GitHub account.
2. Click **Create new project**.
3. Pick **"Existing site"** and paste this repo's URL. Allow Tina Cloud to install its GitHub App on this repo.
4. Tina gives you two values:
   - **Client ID** (public, long string of letters and numbers)
   - **Content Token** (private, keep it secret)
   Copy both. You'll paste them into Netlify next.

### 3. Deploy to Netlify (free)

1. Create a free account at **https://app.netlify.com**.
2. **Add new site → Import from Git → GitHub**, pick this repo.
3. Netlify reads `netlify.toml` and sets the build command for you (`npm run tina:build`, publish `_site`). Leave those as-is.
4. Before clicking Deploy, go to **Site configuration → Environment variables → Add a variable** and add:
   - `NEXT_PUBLIC_TINA_CLIENT_ID` = *(the Client ID from step 2)*
   - `TINA_TOKEN` = *(the Content Token from step 2)*
5. Deploy. First build takes 2–3 minutes.
6. When it's live you'll have a URL like `brave-fox-123.netlify.app`. Try `/admin/` on that URL. You should see a login screen; sign in with your Tina Cloud account.

### 4. Connect the contact form

The contact form needs a free form service. Pick **one**:

**Option A: Formspree (works anywhere).**
1. Sign up free at https://formspree.io.
2. Create a form. It gives you an address like `https://formspree.io/f/abcdwxyz`.
3. In Tina, open the Contact page is *not* where this lives — this is in the template, which Tina doesn't expose. In GitHub, open `contact/index.njk` directly, click the pencil, replace `https://formspree.io/f/YOUR_FORM_ID` with your real form URL, commit. (Or edit it locally; see the bottom of this file.)
4. Send yourself a test and confirm the first message.

**Option B: Netlify Forms.**
1. In `contact/index.njk`, on the `<form ...>` line, delete the `action="..."` attribute and add `data-netlify="true"`.
2. Deploy. Messages show up in Netlify under **Site → Forms**, and you can turn on email notifications.

The hidden "honeypot" field cuts down on spam. Leave it alone.

### 5. Move your domain (lgphome.com)

See "Moving the domain", below.

## Moving the domain (lgphome.com) off Wix

Two parts, keep them apart:

1. **Where the website lives** (Wix today, Netlify tomorrow) is controlled by DNS records.
2. **Who you pay for the domain name** (the registrar) is Wix today if you bought the domain through Wix.

**Step 1: get the new site working first.** Confirm the Netlify URL loads the site, Tina admin works, and the contact form sends to your email.

**Step 2: find your registrar.** In Wix, **Settings → Domains**. If it says the domain was purchased from Wix, Wix is the registrar. If it says "connected", the domain is registered elsewhere.

**Step 3: point the domain at Netlify.**
- *Simplest path (keep the domain registered where it is):* in Netlify, go to **Domain management → Add a domain** and add `lgphome.com` and `www.lgphome.com`. Netlify shows the exact DNS records to set: usually an `A` record for `@` pointing at Netlify's load balancer, and a `CNAME` for `www` pointing to `<yoursite>.netlify.app`. Then in Wix (or wherever your DNS lives), replace the Wix records with those. Leave the **MX** records alone if you use email on this domain.
- *Moving the registration (optional):* in Wix, **Domains → … → Transfer away from Wix** gives you an EPP/auth code. Start a transfer at Cloudflare Registrar, Porkbun or Namecheap and paste the code. Takes 5–7 days, costs one year of renewal, can't be done within 60 days of a prior transfer.

**Step 4: wait.** DNS can take minutes to 48 hours.

**Step 5: cancel Wix Premium only after `https://www.lgphome.com` shows the new site.** If you have a Wix-managed mailbox, sort that out first.

## Previewing on your computer (optional)

Only needed if you want to see changes before publishing, or if you want to tweak the design.

Install Node.js 20+ from https://nodejs.org, then in Terminal:

```sh
cd path/to/lgphome-site
npm install
npm run tina:dev
```

Opens the site at **http://localhost:8080** and the editor at **http://localhost:8080/admin/**. Press Ctrl+C to stop.

## Advanced: editing by hand

Everything in Tina is also just files in this repo. If you want to change something Tina doesn't expose (CSS, layout, structure):

- **Text and images on a page**: edit the matching JSON file in `_data/`. Save → run `npm run build` (or commit, and Netlify will rebuild).
- **Colors, fonts, spacing**: edit `css/style.css`. The main color variables are at the top.
- **Site title, menu, footer, PayPal, socials**: edit `_data/site.json` (also available in Tina as "Site").
- **Page structure (changing which fields exist, adding a new page)**: edit the template in that page's folder, add fields in `tina/config.ts`, and add matching keys in the JSON. Then redeploy.

## Known differences from the Wix site

- **Contact form** is now Formspree or Netlify Forms (setup above). Old Wix messages stay in your Wix inbox; export anything worth keeping before cancelling.
- **Homepage honeycomb and galleries** were Wix widgets, now plain CSS. Hovering a hexagon shows the title.
- **Fonts:** Wix used licensed fonts (Brandon Grotesque / Avenir). This site uses the free Google font *Barlow*, which looks very similar.
- **Building a Home (2013)** was uploaded to Wix directly in 360p; that 64 MB copy is at `assets/video/building-a-home-2013.mp4`. Uploading the original to YouTube and embedding it would give better quality and keep the site small. A `TODO` comment in `video-portfolio/index.njk` marks the spot.
- **The Art Store** page had no checkout on Wix either. It still shows the items with a "contact me to purchase" line.
- **Donate with PayPal** is a standard PayPal donate button for zoeyrosebest@gmail.com.
- Not copied: the unfinished draft page "copy-of-photography-portfolio" and an empty Wix "fullscreen-page".

## Checklist: compare with the live site before switching the domain

- [ ] Every menu item opens the right page, and the hidden `/store` page loads.
- [ ] All homepage hexagons show images, and the testimonial and the four YouTube videos are present.
- [ ] Every YouTube video plays on Select Film, Select Video, Select Post-Production and Services.
- [ ] Gallery images open large when clicked, on the Photography, Design, Store and Praise pages.
- [ ] Wording on About, Services and Praise matches.
- [ ] `/admin/` loads and Tina sign-in works. You can edit a word and see it live after a minute.
- [ ] The contact form is connected (Formspree ID or Netlify) and a test message arrives in your inbox.
- [ ] The PayPal donate button goes to the right PayPal account.
- [ ] Instagram, Facebook and LinkedIn icons go to your profiles.
- [ ] The site looks right on your phone (the menu becomes a "Menu" button).
- [ ] After the domain switch, both `lgphome.com` and `www.lgphome.com` load with the padlock (HTTPS).
