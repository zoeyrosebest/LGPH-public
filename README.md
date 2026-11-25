# Long Gone Production Home: the portfolio site

The same portfolio you had on Wix, rebuilt so you can edit it in a visual editor
instead of in HTML.

- The **design** is unchanged. `src/styles/style.css` is the same stylesheet.
- The **words and images** all live in `content/`, as plain JSON files.
- **Tina** reads those files and gives you a form for each page.

Set up the same way as the commercial site at `~/Projects/lgph-commercial`, so
once you know one, you know both.

## Editing

```sh
npm run dev
```

Then open **http://localhost:3017/admin/index.html**. You get a sidebar with one
entry per page, plus one shared one:

| In the sidebar | What it changes |
|---|---|
| Header, menu and footer | Every page at once. Menu items can be renamed, reordered, added or removed here. |
| Home page | Honeycomb grid, testimonial, brown band and its videos. |
| About page | Skill sections, client list, photos. |
| Services page | The six services and the project ideas box. |
| Select Film page | The list of films. |
| Select Video page | The list of videos. |
| Select Post-Production page | The list of editing projects. |
| Select Photography page | Heading, paragraph, and photographs. |
| Select Design page | Heading, paragraph, and designs. |
| Praise and Results page | Big quote, press write-ups, pictured photo. |
| Contact page | Headings, field labels, and where the form sends. |
| The Art Store (hidden page) | The hidden shop at `/store/`. Still off the menu. |
| Page not found (404) | The 404 page. |

The site itself is at **http://localhost:3017** while that is running. Changes you
save in the editor show up there straight away.

Two things worth knowing about the text boxes:

- A **blank line** starts a new paragraph. A single line break stays a line break.
- `**Two asterisks around words**` makes them bold. This is used on the About page.

## Putting videos back

Each film / video / post-production project has a *YouTube ID* box. Paste the
part of the YouTube address after `v=` or after `youtu.be/` and the player
appears. Leave it empty and the entry falls back to a local mp4 if one is
listed, or stays text only.

One film still has a local mp4 instead of a YouTube embed:

- **Building a Home, 2013** — 64 MB mp4 the Wix site hosted directly. The site
  still plays it from `/assets/video/building-a-home-2013.mp4` (upload the file
  under Media Manager → `video` if it is missing). Better: upload the original
  film to YouTube, paste the ID into the YouTube ID box, and the player
  replaces the mp4.

## The contact form

Messages go to Netlify. Open your site in Netlify and look under **Forms**; the
form is called `contact`. Turn on email notifications there (**Forms > Settings
and usage > Form notifications**) so a copy lands in your inbox instead of you
having to check the dashboard.

There is a *Formspree address* box on the Contact page in the editor. Leave it
empty and Netlify handles everything. Fill it in and the form posts to Formspree
instead, which is only worth doing if you ever move off Netlify.

The hidden honeypot field cuts down on spam. Leave it in place.

## Going live

1. The repo is at
   [github.com/zoeyrosebest/LGPH-public](https://github.com/zoeyrosebest/LGPH-public),
   public.
2. **TinaCloud:** sign in at [app.tina.io](https://app.tina.io/), **Create
   project**, pick this repo, branch `main`. Copy the **Client ID** and
   generate a **Read-only Content Token**.
3. **Netlify:** **Add new site → Import from GitHub**, pick this repo. The build
   settings come from `netlify.toml`. Before the first deploy, add two
   environment variables in **Site settings → Environment variables**:
   - `TINA_CLIENT_ID` = the Client ID from TinaCloud
   - `TINA_TOKEN` = the Content Token from TinaCloud
4. Back in TinaCloud, add the Netlify address to **Site URLs** alongside
   `http://localhost:3017`, otherwise the editor refuses to load on the live
   site.
5. Point the lgphome.com domain at it when ready (see below).

After that, editing happens at `yoursite.com/admin/index.html` from any browser,
and saving commits to GitHub and redeploys on its own. No Terminal.

## Moving lgphome.com off Wix

Two separate parts, worth keeping apart:

1. **Where the website lives** (Wix today, Netlify tomorrow) is controlled by
   DNS records.
2. **Who you pay for the domain name** (the registrar) is Wix today if you
   bought the domain through Wix.

1. **Put the new site up first.** Deploy it (above) and check it at the
   temporary `.netlify.app` address.
2. **Find out where the domain is registered.** In Wix, open **Settings >
   Domains**. If it says the domain was purchased from Wix, Wix is the
   registrar. If it says "connected", the domain is registered elsewhere.
3. **Point the domain at Netlify.** In Netlify, add `lgphome.com` and
   `www.lgphome.com` as custom domains. Netlify tells you exactly which DNS
   records to set — usually an `A` record for `@` and a `CNAME` for `www`. Set
   those at your registrar. Leave the **MX** records alone if you use email
   on this domain.
4. **Update `astro.config.mjs`.** Change `site:` from
   `https://longgoneproductionhome.netlify.app` to `https://www.lgphome.com`
   so the canonical tags and sitemap point to the real address. Commit.
5. **Wait and check.** DNS changes take a few minutes to 24 hours. When
   `https://www.lgphome.com` shows the new site, Netlify issues HTTPS
   automatically.
6. **Only then cancel Wix Premium.** Make sure auto-renew on the Wix
   **domain** stays on until any registrar transfer finishes, or the domain
   could lapse.

## Known differences from the Wix site

- **Contact form** is now Netlify Forms or Formspree (your choice, in the
  editor). Old messages stay in your Wix inbox — export anything you want to
  keep before cancelling.
- **Honeycomb and galleries** were Wix widgets. Rebuilt with plain CSS; look
  very close.
- **Fonts:** Wix used licensed fonts (Brandon Grotesque / Avenir). This site
  uses the free Google font *Barlow*, which looks very similar.
- **Building a Home (2013)** — see the "Putting videos back" section above.
- **The Art Store** page had no checkout on Wix. Each item can now optionally
  carry a Square **Buy Button** that shows under its photo; items without one
  still fall through to the page-wide "Contact Me" button. See **Store checkout**
  below.
- Not copied: the unfinished draft page "copy-of-photography-portfolio" and an
  empty Wix "fullscreen-page".

## Store checkout

Sign up for **Square Online** (free plan, unlimited products, pay only per sale)
and — for shirts, pillows and prints — **Printful** (free, connects to Square
via its App Marketplace; Printful prints and ships each order so you never touch
inventory). Both are free up front.

For each product, in Square's dashboard go to **Online → Items → (your item) →
Share → Buy Button** and copy the HTML it gives you. In Tina, open **The Art
Store**, click the item, paste it into **Buy Button HTML (optional)**, and save.
The button appears under that item's photo on the live site the next time it
rebuilds. Items with no button fall back to the page's "Contact Me" link.

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Editor and site together, on port 3017 |
| `npm run build` | Builds the finished site into `dist/` |
| `npm run preview` | Serves what was built, to check it before deploying |
