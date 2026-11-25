import { defineConfig } from 'tinacms';

// Where Tina saves. In local mode it writes straight to the files in content/.
// Once TinaCloud is connected it commits to GitHub instead.
const branch =
  process.env.GITHUB_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || 'main';

const textarea = { component: 'textarea' as const };

/** A page that only ever has one file, so no New or Delete buttons. */
const singleton = { allowedActions: { create: false, delete: false } };

export default defineConfig({
  branch,
  // The Client ID is public, it ships inside the admin page anyway, so it lives here.
  // The Token is the secret one and is set as an environment variable on the host.
  clientId: process.env.TINA_CLIENT_ID || '',
  token: process.env.TINA_TOKEN || null,
  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'assets/img', publicFolder: 'public' } },
  schema: {
    collections: [
      {
        name: 'settings',
        label: 'Header, menu and footer',
        path: 'content',
        format: 'json',
        match: { include: 'settings' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'siteTitle', label: 'Site name' },
          { type: 'string', name: 'subtitle', label: 'Line under the site name', ui: textarea },
          { type: 'string', name: 'mottoQuote', label: 'Motto, in quotes' },
          { type: 'string', name: 'mottoLine', label: 'Motto, second line', ui: textarea },
          {
            type: 'object', name: 'nav', label: 'Menu', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.label }) },
            fields: [
              { type: 'string', name: 'label', label: 'What it says' },
              { type: 'string', name: 'href', label: 'Where it goes' },
            ],
          },
          { type: 'string', name: 'commercialSiteLabel', label: 'Commercial site link text' },
          { type: 'string', name: 'commercialSiteUrl', label: 'Commercial site address' },
          { type: 'string', name: 'footerNote', label: 'Footer line', ui: textarea },
          { type: 'string', name: 'footerLinkLabel', label: 'Footer link text' },
          { type: 'string', name: 'footerLinkHref', label: 'Footer link goes to' },
          { type: 'string', name: 'email', label: 'Email address' },
          {
            type: 'object', name: 'social', label: 'Social links', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.label }) },
            fields: [
              { type: 'string', name: 'label', label: 'Name' },
              { type: 'string', name: 'url', label: 'Address' },
              { type: 'image', name: 'icon', label: 'Icon (optional, PNG)' },
            ],
          },
          { type: 'string', name: 'paypalBusiness', label: 'PayPal account email' },
          { type: 'string', name: 'paypalItemName', label: 'PayPal donation label' },
          { type: 'string', name: 'copyright', label: 'Copyright name' },
        ],
      },
      {
        name: 'home',
        label: 'Home page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'home' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          {
            type: 'object', name: 'honeycomb', label: 'Honeycomb hexagons', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              { type: 'image', name: 'image', label: 'Image' },
              { type: 'string', name: 'title', label: 'Title (shows on hover)' },
              { type: 'string', name: 'link', label: 'Link (optional)', description: 'Leave empty if the hexagon is just an image.' },
            ],
          },
          { type: 'string', name: 'testimonialQuote', label: 'Testimonial quote', ui: textarea },
          { type: 'string', name: 'testimonialAttribution', label: 'Who said it' },
          { type: 'string', name: 'bandText', label: 'Brown band text', ui: textarea, description: 'Leave a blank line between paragraphs.' },
          {
            type: 'object', name: 'bandVideos', label: 'Brown band videos', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              { type: 'string', name: 'videoId', label: 'YouTube ID', description: 'The part after v= or youtu.be/.' },
              { type: 'string', name: 'title', label: 'Title (for screen readers)' },
            ],
          },
          { type: 'string', name: 'bandButtonLabel', label: 'Brown band button text' },
          { type: 'string', name: 'bandButtonHref', label: 'Brown band button goes to' },
        ],
      },
      {
        name: 'about',
        label: 'About page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'about' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          {
            type: 'object', name: 'photos', label: 'Photos at the top', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.alt }) },
            fields: [
              { type: 'image', name: 'src', label: 'Photo' },
              { type: 'string', name: 'alt', label: 'Description for screen readers' },
            ],
          },
          {
            type: 'object', name: 'sections', label: 'Skill sections', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.heading }) },
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'text', label: 'Text, if the section has no sub-parts', ui: textarea, description: 'Wrap words in **double asterisks** to bold them.' },
              {
                type: 'object', name: 'entries', label: 'Sub-parts', list: true,
                ui: { itemProps: (i: any) => ({ label: i?.subheading }) },
                fields: [
                  { type: 'string', name: 'subheading', label: 'Sub-heading' },
                  { type: 'string', name: 'text', label: 'Text', ui: textarea, description: 'Wrap words in **double asterisks** to bold them.' },
                ],
              },
            ],
          },
          { type: 'string', name: 'clientsIntro', label: 'Line above the client list', ui: textarea },
          {
            type: 'object', name: 'clients', label: 'Clients', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.name }) },
            fields: [{ type: 'string', name: 'name', label: 'Name' }],
          },
          { type: 'string', name: 'clientsFooter', label: 'Line under the client list' },
          { type: 'string', name: 'buttonLabel', label: 'Button text' },
          { type: 'string', name: 'buttonHref', label: 'Button goes to' },
        ],
      },
      {
        name: 'services',
        label: 'Services page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'services' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'headingOne', label: 'First heading', ui: textarea },
          {
            type: 'object', name: 'groupOne', label: 'First three services', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Service' },
              { type: 'string', name: 'description', label: 'One line about it', ui: textarea },
              { type: 'string', name: 'videoId', label: 'YouTube ID (optional)', description: 'The part after v= or youtu.be/. Leave empty for no link.' },
              { type: 'string', name: 'videoTitle', label: 'Video title (unused, keep blank)' },
            ],
          },
          { type: 'string', name: 'headingTwo', label: 'Second heading', ui: textarea },
          {
            type: 'object', name: 'groupTwo', label: 'Second three services', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.name }) },
            fields: [
              { type: 'string', name: 'name', label: 'Service' },
              { type: 'string', name: 'description', label: 'One line about it', ui: textarea },
              { type: 'string', name: 'videoId', label: 'YouTube ID (optional)', description: 'The part after v= or youtu.be/. Leave empty for no link.' },
              { type: 'string', name: 'videoTitle', label: 'Video title (unused, keep blank)' },
            ],
          },
          { type: 'string', name: 'ideasHeading', label: 'Side box heading' },
          {
            type: 'object', name: 'ideas', label: 'Project ideas', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.text }) },
            fields: [{ type: 'string', name: 'text', label: 'Idea' }],
          },
          { type: 'string', name: 'ideasFooterText', label: 'Last line of the box' },
          { type: 'string', name: 'ideasFooterLinkLabel', label: 'Its link text' },
        ],
      },
      {
        name: 'film',
        label: 'Select Film page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'film' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading', ui: textarea, description: 'Press Enter for a line break.' },
          { type: 'boolean', name: 'showHeart', label: 'Show the hand drawn heart' },
          {
            type: 'object', name: 'works', label: 'Films', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title and year' },
              { type: 'string', name: 'videoId', label: 'YouTube ID', description: 'The part after v= or youtu.be/. Use this when possible.' },
              { type: 'string', name: 'videoFile', label: 'Local video file (fallback)', description: 'Use only if the film is not on YouTube. Path starts with /assets/video/.' },
              { type: 'string', name: 'body', label: 'Description', ui: textarea, description: 'Leave a blank line between paragraphs.' },
            ],
          },
        ],
      },
      {
        name: 'video',
        label: 'Select Video page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'video' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading', ui: textarea, description: 'Press Enter for a line break.' },
          { type: 'boolean', name: 'showHeart', label: 'Show the hand drawn heart' },
          {
            type: 'object', name: 'works', label: 'Videos', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title and year' },
              { type: 'string', name: 'videoId', label: 'YouTube ID' },
              { type: 'string', name: 'videoFile', label: 'Local video file (fallback)' },
              { type: 'string', name: 'body', label: 'Description', ui: textarea, description: 'Leave a blank line between paragraphs.' },
            ],
          },
        ],
      },
      {
        name: 'post',
        label: 'Select Post-Production page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'post' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading', ui: textarea, description: 'Press Enter for a line break.' },
          { type: 'boolean', name: 'showHeart', label: 'Show the hand drawn heart' },
          {
            type: 'object', name: 'works', label: 'Projects', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title and year' },
              { type: 'string', name: 'videoId', label: 'YouTube ID' },
              { type: 'string', name: 'videoFile', label: 'Local video file (fallback)' },
              { type: 'string', name: 'body', label: 'Description', ui: textarea, description: 'Leave a blank line between paragraphs.' },
            ],
          },
        ],
      },
      {
        name: 'photography',
        label: 'Select Photography page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'photography' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading' },
          { type: 'string', name: 'intro', label: 'Paragraph under the heading (optional)', ui: textarea },
          {
            type: 'object', name: 'photos', label: 'Photographs', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.alt }) },
            fields: [
              { type: 'image', name: 'src', label: 'Photograph' },
              { type: 'string', name: 'alt', label: 'Description for screen readers' },
            ],
          },
        ],
      },
      {
        name: 'design',
        label: 'Select Design page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'design' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading', ui: textarea, description: 'Press Enter for a line break.' },
          { type: 'string', name: 'intro', label: 'Paragraph under the heading (optional)', ui: textarea },
          {
            type: 'object', name: 'photos', label: 'Designs', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.alt }) },
            fields: [
              { type: 'image', name: 'src', label: 'Design' },
              { type: 'string', name: 'alt', label: 'Description for screen readers' },
            ],
          },
        ],
      },
      {
        name: 'praise',
        label: 'Praise and Results page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'praise' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'bigQuote', label: 'Large quote at the top', ui: textarea },
          {
            type: 'object', name: 'habitatLogo', label: 'Habitat logo (optional)',
            fields: [
              { type: 'image', name: 'src', label: 'Image' },
              { type: 'string', name: 'alt', label: 'Description for screen readers' },
            ],
          },
          {
            type: 'object', name: 'habitatLetter', label: 'Habitat letter (optional)',
            fields: [
              { type: 'image', name: 'src', label: 'Image' },
              { type: 'string', name: 'alt', label: 'Description for screen readers' },
            ],
          },
          {
            type: 'object', name: 'press', label: 'Press', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.heading }) },
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'byline', label: 'Byline' },
              { type: 'string', name: 'videoId', label: 'YouTube ID', description: 'Leave empty for no video.' },
              { type: 'string', name: 'quote', label: 'What they wrote', ui: textarea },
              { type: 'string', name: 'sourceLabel', label: 'Publication' },
              { type: 'string', name: 'sourceUrl', label: 'Link to the article' },
              { type: 'string', name: 'sourceSuffix', label: 'After the link, e.g. ", 2020"' },
            ],
          },
          {
            type: 'object', name: 'picturedImage', label: 'Pictured photo (optional)',
            fields: [
              { type: 'image', name: 'src', label: 'Photo' },
              { type: 'string', name: 'alt', label: 'Description for screen readers' },
            ],
          },
          { type: 'string', name: 'picturedCaption', label: 'Pictured photo caption', ui: textarea, description: 'Press Enter for line breaks.' },
        ],
      },
      {
        name: 'contact',
        label: 'Contact page',
        path: 'content/pages',
        format: 'json',
        match: { include: 'contact' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading' },
          { type: 'string', name: 'subheading', label: 'Line under the heading' },
          { type: 'string', name: 'formAction', label: 'Formspree address (optional)', description: 'Leave empty and Netlify collects the messages itself, under Forms in your Netlify dashboard. Fill in only to move to Formspree.' },
          { type: 'string', name: 'nameLabel', label: 'Name field label' },
          { type: 'string', name: 'emailLabel', label: 'Email field label' },
          { type: 'string', name: 'messageLabel', label: 'Message field label' },
          { type: 'string', name: 'submitLabel', label: 'Send button text' },
          { type: 'string', name: 'sentMessage', label: 'Message shown after sending' },
          { type: 'string', name: 'footerNote', label: 'Line at the bottom', description: 'Wrap words in **double asterisks** to bold them.' },
        ],
      },
      {
        name: 'store',
        label: 'The Art Store (hidden page)',
        path: 'content/pages',
        format: 'json',
        match: { include: 'store' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title', ui: textarea },
          { type: 'string', name: 'description', label: 'Search engine description', ui: textarea },
          { type: 'string', name: 'heading', label: 'Page heading' },
          { type: 'string', name: 'intro', label: 'Paragraph under the heading', ui: textarea },
          {
            type: 'object', name: 'items', label: 'Items', list: true,
            ui: { itemProps: (i: any) => ({ label: i?.caption }) },
            fields: [
              { type: 'image', name: 'src', label: 'Photo' },
              { type: 'string', name: 'caption', label: 'Caption (title and price)' },
              {
                type: 'string', name: 'buyButtonHtml',
                label: 'Buy Button HTML (optional)',
                description: 'Paste the Buy Button HTML from Square → Online → Items → (your item) → Share → Buy Button. Leave blank and buyers will use the Contact Me button at the bottom instead.',
                ui: textarea,
              },
            ],
          },
          { type: 'string', name: 'buttonLabel', label: 'Bottom button text' },
          { type: 'string', name: 'buttonHref', label: 'Bottom button goes to' },
        ],
      },
      {
        name: 'notfound',
        label: 'Page not found (404)',
        path: 'content/pages',
        format: 'json',
        match: { include: 'notfound' },
        ui: singleton,
        fields: [
          { type: 'string', name: 'title', label: 'Browser tab title' },
          { type: 'string', name: 'description', label: 'Search engine description' },
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'text', label: 'Text' },
          { type: 'string', name: 'linkLabel', label: 'Link text' },
          { type: 'string', name: 'linkHref', label: 'Link goes to' },
        ],
      },
    ],
  },
});
