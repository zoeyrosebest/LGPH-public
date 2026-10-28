# Long Gone Production Home: website

This is a copy of www.lgphome.com rebuilt as a plain website that you own. It is just HTML, CSS and images, with no Wix, no build step and nothing to install. Any free static host can serve it.

## What's in here

| Page on the old site | File here |
|---|---|
| Home (`/`) | `index.html` |
| About (`/about`) | `about/index.html` |
| Services (`/services`) | `services/index.html` |
| Select Film (`/video-portfolio`) | `video-portfolio/index.html` |
| Select Video (`/copy-of-film-portfolio`) | `copy-of-film-portfolio/index.html` |
| Select Post-Production (`/copy-of-film-portfolio-1`) | `copy-of-film-portfolio-1/index.html` |
| Select Photography (`/photography-portfolio`) | `photography-portfolio/index.html` |
| Select Design (`/design-portfolio`) | `design-portfolio/index.html` |
| Praise and Results (`/praise-and-results`) | `praise-and-results/index.html` |
| Contact (`/contact`) | `contact/index.html` |
| The Art Store (`/store`, a hidden page that isn't in the menu) | `store/index.html` |
| "Page not found" | `404.html` |

Each folder name matches the old Wix address, so existing links (from Google, Instagram, your resume and so on) keep working after the move.

Other folders:

- `css/style.css` holds all colors, fonts and layout. The main colors are at the top, e.g. `--taupe` for the brown-grey band.
- `js/site.js` runs the phone menu, the click-to-enlarge image viewer and the contact form. It's small and has comments.
- `assets/img/` holds every image, resized for the web and given readable names (`photo-03.jpg`, `design-02-dvd-slip.jpg`, ...).
- `assets/video/` holds the two videos that Wix hosted directly. All the other videos are YouTube embeds.

## Editing content

Open any `index.html` in a text editor (TextEdit in plain-text mode, or the free [VS Code](https://code.visualstudio.com/)). The words on the page are plain text between tags, e.g. `<p>Your text here</p>`, so change them and save.

- **Change a picture:** put the new file in `assets/img/`, then change the `src="..."` (and the `href="..."` around it, for the enlarged view) to the new file name. Keep photos under about 1600px wide so the site stays fast.
- **Add a gallery photo:** copy one `<a class="lightbox" ...>...</a>` block in the gallery and point it at the new image.
- **Add a YouTube video:** copy one of the existing `<iframe ...>` blocks and replace the video ID (the part after `/embed/`).
- **Menu, header and footer:** these are repeated at the top and bottom of every page. If you rename a menu item, use find-and-replace across all the `index.html` files (VS Code: Edit > Replace in Files).
- **Colors/fonts:** edit the variables at the top of `css/style.css`.

## Previewing on your computer

Some features (the videos and the form) only work when the site is served rather than opened as a file. In Terminal:

```sh
cd path/to/lgphome-site
python3 -m http.server 8000
```

Then open http://localhost:8000 in a browser. Press Ctrl+C in Terminal to stop it.

## Contact form (one-time setup, required)

Wix handled the old form. Here the form needs a free form service, otherwise visitors just see a "not connected yet" message. Pick **one** of the two options below.

**Option A: Formspree (works on any host).**
1. Sign up free at https://formspree.io with the email where you want messages to arrive.
2. Create a new form. It gives you an address like `https://formspree.io/f/abcdwxyz`.
3. In `contact/index.html`, replace `https://formspree.io/f/YOUR_FORM_ID` with that address.
4. Send yourself a test message from the live site and confirm it the first time Formspree asks.
The free plan currently allows about 50 messages a month.

**Option B: Netlify Forms (only if you host on Netlify).**
1. In `contact/index.html`, on the `<form ...>` line, delete the `action="https://formspree.io/f/YOUR_FORM_ID"` part and add `data-netlify="true"`.
2. Deploy. Messages then show up in Netlify under Site > Forms, and you can turn on email notifications there.

There's also a hidden "honeypot" field that cuts down on spam. Leave it in place.

## Putting it online for free

Any one of these works. Netlify is the easiest.

### Netlify (recommended)
1. Create a free account at https://app.netlify.com.
2. Go to **Add new site > Deploy manually** and drag the whole `lgphome-site` folder onto the page.
3. After a few seconds you get a link like `something.netlify.app`. Check the site there.
4. To update the site later, drag the folder onto the site's **Deploys** tab again.
5. Add your domain under **Domain management > Add a domain** (see "Moving the domain off Wix" below).

### Cloudflare Pages
1. Create a free account at https://dash.cloudflare.com, then go to **Workers & Pages > Create > Pages > Upload assets**.
2. Upload the folder.
3. **Note:** Cloudflare refuses any single file over 25 MB. `assets/video/building-a-home-2013.mp4` is 64 MB, so first upload that film to YouTube (see "Known differences") or delete the file.

### GitHub Pages
1. Create a free GitHub account and a new **public** repository, e.g. `lgphome-site`.
2. Upload everything in this folder (Add file > Upload files) or push it with git. This folder is already a git repository.
3. In the repository, go to **Settings > Pages**. Under Source choose "Deploy from a branch", then pick `main` and `/ (root)`.
4. The site appears at `https://<username>.github.io/lgphome-site/`. Add your custom domain on the same Settings page.

## Moving the domain (lgphome.com) off Wix

There are two parts here, and it's important to keep them apart:

1. **Where the website lives** (Wix today, Netlify etc. tomorrow) is controlled by DNS records.
2. **Who you pay for the domain name** (the registrar) is Wix today if you bought the domain through Wix.

**Step 1: put the new site up first.** Deploy it (above) and check it at the temporary `.netlify.app` / `.pages.dev` address.

**Step 2: find out where the domain is registered.** In Wix, open **Settings > Domains**. If it says the domain was purchased from Wix, Wix is the registrar. If it says "connected", the domain is registered elsewhere (e.g. GoDaddy or Google/Squarespace) and you change the DNS there.

**Step 3: point the domain at the new host.**
- *Simplest path (keep the domain registered where it is for now):* in your new host, add `lgphome.com` and `www.lgphome.com` as custom domains. The host will show you exactly which DNS records to set. With Netlify that's usually an `A` record for `@` pointing at Netlify's load balancer IP and a `CNAME` for `www` pointing to `<yoursite>.netlify.app`. Then in Wix go to **Domains > (your domain) > Manage DNS records** (or the equivalent at your registrar), replace the Wix `A`/`CNAME` records with those values, and save. Leave the **MX** records alone if you use email on this domain.
- *Optional, moving the registration too:* in Wix go to **Domains > ... > Transfer away from Wix**, unlock the domain, and get the **transfer (EPP/auth) code**. Then start a transfer at the new registrar (Cloudflare Registrar, Porkbun and Namecheap are all inexpensive) and paste the code in. A transfer usually takes 5 to 7 days, costs one year of renewal, and isn't possible within 60 days of buying or transferring the domain. Do this after the website itself has moved and is working.

**Step 4: wait and check.** DNS changes take from a few minutes up to 24 to 48 hours. When `https://www.lgphome.com` shows the new site, turn on HTTPS in the host if it isn't automatic (Netlify and Cloudflare do this automatically).

**Step 5: only then cancel Wix Premium.** Make sure auto-renew on the Wix **domain** stays on until a transfer finishes, or the domain could lapse. If you have a Wix mailbox (e.g. Google Workspace bought through Wix), sort that out before cancelling as well.

## Known differences from the Wix site

- **Contact form** is now Formspree or Netlify Forms (setup above). Old messages stay in your Wix inbox, so export anything you want to keep before cancelling.
- **Homepage honeycomb and galleries** were Wix widgets. They're rebuilt with plain CSS and look very close; hovering a hexagon shows the project title.
- **Fonts:** Wix used licensed fonts (Brandon Grotesque / Avenir). This site uses the free Google font *Barlow*, which looks very similar.
- **Building a Home (2013)** was uploaded to Wix directly, and Wix only kept a 360p copy, which is what's here (64 MB). Uploading the original film to YouTube and embedding it like the others would give better quality and keep the site small. A `TODO` note in `video-portfolio/index.html` marks the spot.
- **The Art Store** page had no checkout on Wix either. It still shows the items and prices with a "contact me to purchase" line.
- **Donate with PayPal** is a standard PayPal donate button for zoeyrosebest@gmail.com. Click it once after launch to make sure it opens your PayPal donation page.
- Not copied: the unfinished draft page "copy-of-photography-portfolio" and an empty Wix "fullscreen-page".

## Checklist: compare with the live site before switching the domain

Open the old site and the new one side by side and check:

- [ ] Every menu item opens the right page, and the hidden `/store` page loads.
- [ ] All homepage hexagons show images, and the testimonial and the four YouTube videos are present.
- [ ] Every YouTube video plays on Select Film, Select Video, Select Post-Production and Services.
- [ ] Gallery images open large when clicked, on the Photography, Design, Store and Praise pages.
- [ ] Wording on About, Services and Praise matches (fix any typos here, not on Wix).
- [ ] The contact form is connected (Formspree ID or Netlify) and a test message arrives in your inbox.
- [ ] The PayPal donate button goes to the right PayPal account.
- [ ] The Instagram, Facebook and LinkedIn icons go to your profiles.
- [ ] The site looks right on your phone (the menu becomes a "Menu" button).
- [ ] After the domain switch, both `lgphome.com` and `www.lgphome.com` load with the padlock (HTTPS).
