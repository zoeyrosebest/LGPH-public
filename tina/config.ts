import { defineConfig } from "tinacms";

// Branch Tina reads from and writes to. Set in Netlify env vars for production.
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Tina Cloud project credentials. Get these at tina.io after you sign up and
  // register this repo as a project. Add them as env vars in Netlify:
  //   NEXT_PUBLIC_TINA_CLIENT_ID = <Client ID from Tina Cloud>
  //   TINA_TOKEN                 = <Read-only token from Tina Cloud>
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",

  build: {
    outputFolder: "admin",
    publicFolder: "_site",
  },

  media: {
    tina: {
      mediaRoot: "assets/img",
      publicFolder: "",
    },
  },

  schema: {
    collections: [
      // ---------- Site-wide (header, nav, footer, PayPal, socials) ----------
      {
        name: "site",
        label: "Site (header, menu, footer)",
        path: "_data",
        format: "json",
        match: { include: "site" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          {
            type: "object", name: "brand", label: "Brand",
            fields: [
              { type: "string", name: "title", label: "Site title" },
              { type: "string", name: "subtitle_html", label: "Site subtitle (allows <br>)" },
              { type: "string", name: "logo_alt", label: "Logo alt text" },
              { type: "string", name: "motto_quote", label: "Motto quote" },
              { type: "string", name: "motto_line_html", label: "Motto line (allows <br>)" },
            ],
          },
          {
            type: "object", name: "nav", label: "Menu items", list: true,
            ui: { itemProps: (item) => ({ label: item?.label || "New item" }) },
            fields: [
              { type: "string", name: "label", label: "Menu label" },
              { type: "string", name: "url", label: "Link (e.g. /services/)" },
            ],
          },
          {
            type: "object", name: "footer", label: "Footer",
            fields: [
              { type: "string", name: "collab_text_html", label: "Collab text (allows <br>, <a>)", ui: { component: "textarea" } },
              { type: "string", name: "copyright", label: "Copyright name" },
            ],
          },
          {
            type: "object", name: "paypal", label: "PayPal donate button",
            fields: [
              { type: "string", name: "business", label: "PayPal email" },
              { type: "string", name: "currency_code", label: "Currency (e.g. USD)" },
              { type: "string", name: "item_name", label: "Donation item name" },
            ],
          },
          {
            type: "object", name: "social", label: "Social icons", list: true,
            ui: { itemProps: (item) => ({ label: item?.platform || "New icon" }) },
            fields: [
              { type: "string", name: "platform", label: "Platform (e.g. Instagram)" },
              { type: "string", name: "url", label: "Profile URL" },
              { type: "image", name: "icon", label: "Icon image" },
            ],
          },
        ],
      },

      // ---------- Home ----------
      {
        name: "home",
        label: "Home page",
        path: "_data",
        format: "json",
        match: { include: "home" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          {
            type: "object", name: "honeycomb", label: "Honeycomb gallery", list: true,
            ui: { itemProps: (item) => ({ label: item?.title || "New hex" }) },
            fields: [
              { type: "image", name: "image", label: "Image" },
              { type: "string", name: "title", label: "Caption on hover" },
              { type: "string", name: "link", label: "Optional link (leave blank for none)" },
            ],
          },
          {
            type: "object", name: "testimonial", label: "Testimonial quote",
            fields: [
              { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
              { type: "string", name: "author", label: "Author (keep the leading -)" },
            ],
          },
          {
            type: "object", name: "band", label: "Lower section (eye, intro, videos)",
            fields: [
              {
                type: "string", name: "intro_paragraphs", label: "Intro paragraphs", list: true,
                ui: { component: "textarea" },
              },
              {
                type: "object", name: "videos", label: "Videos", list: true,
                ui: { itemProps: (item) => ({ label: item?.label || "New video" }) },
                fields: [
                  { type: "string", name: "embed_url", label: "YouTube embed URL (youtube-nocookie.com/embed/XXXX)" },
                  { type: "string", name: "label", label: "Short label" },
                ],
              },
              { type: "string", name: "cta_link", label: "Button link" },
              { type: "string", name: "cta_label", label: "Button label" },
            ],
          },
        ],
      },

      // ---------- About ----------
      {
        name: "about",
        label: "About page",
        path: "_data",
        format: "json",
        match: { include: "about" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          {
            type: "object", name: "photos", label: "Top photos", list: true,
            ui: { itemProps: (item) => ({ label: item?.alt || "Photo" }) },
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt text (for screen readers)" },
            ],
          },
          {
            type: "object", name: "skill_sections", label: "Skill sections", list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "Section" }) },
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              {
                type: "object", name: "subsections", label: "Subsections", list: true,
                ui: { itemProps: (item) => ({ label: item?.subheading || "Subsection" }) },
                fields: [
                  { type: "string", name: "subheading", label: "Subheading (optional)" },
                  { type: "string", name: "body_html", label: "Body (allows <strong> for software names)", ui: { component: "textarea" } },
                ],
              },
            ],
          },
          {
            type: "object", name: "worked_with", label: "Worked with",
            fields: [
              { type: "string", name: "intro_html", label: "Intro line (allows <br>)", ui: { component: "textarea" } },
              { type: "string", name: "clients", label: "Client list", list: true },
              { type: "string", name: "footer_html", label: "Footer line (allows <em>)", ui: { component: "textarea" } },
            ],
          },
          { type: "string", name: "cta_link", label: "Bottom button link" },
          { type: "string", name: "cta_label", label: "Bottom button label" },
        ],
      },

      // ---------- Services ----------
      {
        name: "services",
        label: "Services page",
        path: "_data",
        format: "json",
        match: { include: "services" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          {
            type: "object", name: "main_sections", label: "Main sections", list: true,
            ui: { itemProps: (item) => ({ label: item?.heading || "Section" }) },
            fields: [
              { type: "string", name: "heading", label: "Section heading" },
              {
                type: "object", name: "items", label: "Service tiles", list: true,
                ui: { itemProps: (item) => ({ label: item?.title || "Service" }) },
                fields: [
                  { type: "string", name: "title", label: "Service title" },
                  { type: "string", name: "blurb", label: "One-line description" },
                  { type: "string", name: "link", label: "Optional YouTube link" },
                ],
              },
            ],
          },
          { type: "string", name: "aside_heading", label: "Side-list heading" },
          { type: "string", name: "aside_items_html", label: "Side-list items (one per line)", list: true },
        ],
      },

      // ---------- Film ----------
      {
        name: "film",
        label: "Select Film page",
        path: "_data",
        format: "json",
        match: { include: "film" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading_html", label: "Page heading (allows <br>)" },
          {
            type: "object", name: "works", label: "Films", list: true,
            ui: { itemProps: (item) => ({ label: item?.work_title || "Film" }) },
            fields: [
              { type: "string", name: "work_title", label: "Film title (shown on page)" },
              { type: "string", name: "embed_url", label: "YouTube embed URL (youtube-nocookie.com/embed/XXXX). Leave blank if using a video file." },
              { type: "string", name: "embed_title", label: "Short title for the video iframe" },
              { type: "string", name: "video_file", label: "Path to a self-hosted mp4 (optional). Prefer YouTube embeds." },
              { type: "boolean", name: "preserve_todo", label: "Add TODO comment (for the Building a Home mp4)" },
              { type: "string", name: "paragraphs", label: "Paragraphs below the video", list: true, ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ---------- Video ----------
      {
        name: "video",
        label: "Select Video page",
        path: "_data",
        format: "json",
        match: { include: "video" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading_html", label: "Page heading (allows <br>)" },
          {
            type: "object", name: "works", label: "Videos", list: true,
            ui: { itemProps: (item) => ({ label: item?.work_title || "Video" }) },
            fields: [
              { type: "string", name: "work_title", label: "Video title (shown on page)" },
              { type: "string", name: "embed_url", label: "YouTube embed URL" },
              { type: "string", name: "embed_title", label: "Short title for the video iframe" },
              { type: "string", name: "video_file", label: "Path to a self-hosted mp4 (optional)" },
              { type: "boolean", name: "preserve_todo", label: "Add TODO comment" },
              { type: "string", name: "paragraphs", label: "Paragraphs below the video", list: true, ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ---------- Post-production ----------
      {
        name: "post",
        label: "Select Post-Production page",
        path: "_data",
        format: "json",
        match: { include: "post" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading_html", label: "Page heading (allows <br>)" },
          {
            type: "object", name: "works", label: "Projects", list: true,
            ui: { itemProps: (item) => ({ label: item?.work_title || "Project" }) },
            fields: [
              { type: "string", name: "work_title", label: "Project title (shown on page)" },
              { type: "string", name: "embed_url", label: "YouTube embed URL" },
              { type: "string", name: "embed_title", label: "Short title for the video iframe" },
              { type: "string", name: "video_file", label: "Path to a self-hosted mp4 (optional)" },
              { type: "boolean", name: "preserve_todo", label: "Add TODO comment" },
              { type: "string", name: "paragraphs", label: "Paragraphs below the video", list: true, ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ---------- Photography ----------
      {
        name: "photography",
        label: "Select Photography page",
        path: "_data",
        format: "json",
        match: { include: "photography" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading", label: "Page heading" },
          {
            type: "object", name: "images", label: "Photos", list: true,
            ui: { itemProps: (item) => ({ label: item?.src?.split("/").pop() || "Photo" }) },
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt text (for screen readers)" },
            ],
          },
        ],
      },

      // ---------- Design ----------
      {
        name: "design",
        label: "Select Design page",
        path: "_data",
        format: "json",
        match: { include: "design" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading_html", label: "Page heading (allows <br>)" },
          {
            type: "object", name: "images", label: "Designs", list: true,
            ui: { itemProps: (item) => ({ label: item?.alt || "Design" }) },
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "alt", label: "Alt text (for screen readers)" },
            ],
          },
        ],
      },

      // ---------- Praise ----------
      {
        name: "praise",
        label: "Praise and Results page",
        path: "_data",
        format: "json",
        match: { include: "praise" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "big_quote", label: "Large quote at top", ui: { component: "textarea" } },
          {
            type: "object", name: "praise_images", label: "Top images",
            fields: [
              {
                type: "object", name: "logo", label: "Habitat logo",
                fields: [
                  { type: "image", name: "src", label: "Image" },
                  { type: "string", name: "alt", label: "Alt text" },
                ],
              },
              {
                type: "object", name: "letter", label: "Recognition letter",
                fields: [
                  { type: "image", name: "src", label: "Image" },
                  { type: "string", name: "alt", label: "Alt text" },
                ],
              },
            ],
          },
          {
            type: "object", name: "press", label: "Press section",
            fields: [
              { type: "string", name: "heading", label: "Heading" },
              { type: "string", name: "byline", label: "Byline" },
              { type: "string", name: "embed_url", label: "YouTube embed URL" },
              { type: "string", name: "embed_title", label: "Short title for the video iframe" },
              { type: "string", name: "quote_html", label: "Quote (allows &rsquo; etc.)", ui: { component: "textarea" } },
              { type: "string", name: "source_html", label: "Source line (allows <a>)" },
            ],
          },
          {
            type: "object", name: "pictured", label: "Pictured figure",
            fields: [
              {
                type: "object", name: "image", label: "Image",
                fields: [
                  { type: "image", name: "src", label: "Image" },
                  { type: "string", name: "alt", label: "Alt text" },
                ],
              },
              { type: "string", name: "caption_html", label: "Caption (allows <br>)", ui: { component: "textarea" } },
            ],
          },
        ],
      },

      // ---------- Contact ----------
      {
        name: "contact",
        label: "Contact page",
        path: "_data",
        format: "json",
        match: { include: "contact" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading", label: "Page heading" },
          { type: "string", name: "intro", label: "Text above the form" },
          { type: "string", name: "footer_note_html", label: "Text below the form (allows <em>)" },
        ],
      },

      // ---------- Store ----------
      {
        name: "store",
        label: "Store page (hidden)",
        path: "_data",
        format: "json",
        match: { include: "store" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description", ui: { component: "textarea" } },
          { type: "string", name: "heading", label: "Page heading" },
          { type: "string", name: "intro", label: "Intro text" },
          {
            type: "object", name: "items", label: "Items for sale", list: true,
            ui: { itemProps: (item) => ({ label: item?.caption || "Item" }) },
            fields: [
              { type: "image", name: "src", label: "Image" },
              { type: "string", name: "caption", label: "Caption (title and price, leave blank to hide)" },
            ],
          },
          { type: "string", name: "cta_link", label: "Button link" },
          { type: "string", name: "cta_label", label: "Button label" },
        ],
      },

      // ---------- 404 ----------
      {
        name: "notfound",
        label: "404 (Page not found)",
        path: "_data",
        format: "json",
        match: { include: "notfound" },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "string", name: "title", label: "Browser tab title" },
          { type: "string", name: "description", label: "Search engine description" },
          { type: "string", name: "heading", label: "Page heading" },
          { type: "string", name: "body_html", label: "Body (allows <a>)" },
        ],
      },
    ],
  },
});
