# Portfolio Template — Guide

There are now two separate things, kept in two separate folders on purpose:

1. **Your live site** — this folder (`portfolio/`) — `index.html`, `content.js`, `style.css`, etc. This is Kunal Shah's actual website, unchanged in how it looks and works.
2. **A reusable template** — a sibling folder next to this one, at `Desktop/template/` (NOT inside this portfolio folder). It's a copy of the same system with the personal content stripped out and replaced with a worked example, ready to become someone else's portfolio.

Both work the same way, described below. A copy of this same guide also lives inside `Desktop/template/TEMPLATE-GUIDE.md`, so it travels with the template wherever you copy it next.

---

## 1. How the template works

There is no build step, no installer, no framework. It's plain HTML, CSS, and JavaScript — the same as before, just reorganized into **three files that talk to each other**:

| File | What it does |
|---|---|
| **`content.js`** | All the *content* — the person's name, bio, projects, images, links, and which sections are turned on. **This is the only file you'll normally edit.** |
| **`render.js`** | Reads `content.js` and builds the page. You shouldn't need to touch this. |
| **`index.html` / `style.css` / `script.js`** | The design system — layout, colours, type, animations. Shared and reusable. |

When the page opens in a browser, `render.js` reads `content.js` and fills in the page automatically — text, images, project lists, and whether a whole section should even appear. Change `content.js`, save the file, refresh the browser — that's the whole workflow. No installing anything, no command line.

---

## 2. Where you change personal information

Open **`content.js`** in any text editor (Notepad, VS Code, etc.). Near the top:

```js
person: {
  name: "Kunal Shah",
  email: "officialkunalshah@gmail.com",
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/..." }
  ]
},
```

Change the values between the quotes. Keep the quotes and commas exactly where they are — that's what makes it valid JavaScript. If you break the punctuation, the site will stop rendering (see [Troubleshooting](#10-troubleshooting) below).

---

## 3. Where you add images

1. Put the image file in the **`images/`** folder (next to `content.js`).
2. Reference it by that path in `content.js`, e.g.:
   ```js
   image: { src: "images/about-photo.jpg", alt: "A short description of the photo" }
   ```
3. Always fill in `alt` with a short, honest description — it's read aloud by screen readers and used by search engines.

**Recommended sizes** (keeps things sharp without being huge to download):
- Hero background: 1920×1080px (video) or 1600×900px (image)
- Portrait / about photo: 900×1125px (portrait orientation)
- Gallery / project photos: 900×600px
- Logos: 600×600px, transparent background (PNG) if possible

Any reasonably-sized JPG/PNG/WEBP works — the design automatically scales and crops images to fit.

---

## 4. How you add projects (Work section)

In `content.js`, find `work.items` — it's a list. Copy one whole `{ ... }` project block, paste it as a new entry, and edit the values:

```js
{
  year: "2026",
  name: "Project Name",
  role: "Your role on it",
  logo: { src: "images/project-logo.png", alt: "Project Name logo" },
  reverse: false,     // true flips the image to the right instead of left
  blocks: [
    { heading: "The opportunity", paragraphs: ["...", "..."] },
    { heading: "My role", paragraphs: ["..."] }
  ],
  capabilities: { title: "Highlights", items: ["Skill one", "Skill two"] },
  link: { label: "visitsite.com", href: "https://visitsite.com" }
}
```

- `blocks` is however many "chunks" of text you want (opportunity, role, outcome, etc.) — add or remove freely.
- A block can optionally include a `stats` row (numbers with labels), like the "Outcome" block in Kunal's HIMAL Legacy entry — copy that pattern if useful.
- `capabilities` and `link` are optional — delete the whole key if a project doesn't have one.

---

## 5. How you add experience / training

This design has two places for that, depending on the shape of the story:

- **Inside a Work item** (above) — good for "I did X at Company Y."
- **The `journey` section** — a visual timeline + photo gallery + skills, originally built for Kunal's aviation training, but it's a generic "path so far" layout. Rename it for anything with a progression: education, culinary training, a design career path, certifications. Change `journey.title` and everything under it — the layout doesn't care what field it's used for.

See the fully-worked example in `Desktop/template/content.js`, where the same layout becomes a photographer's "Training" section.

---

## 6. How you add skills

Two options, and you can use either or both:

- **`journey.skillGroups`** — skill groups shown inside the Journey/Training section (what Kunal's flight skills and core skills use).
- **The standalone `skills` section** — its own section on the page, for when skills don't belong inside a journey/training story. Turn it on via `sections` (next step) and fill in `skills.groups`.

Both use the same shape: a list of groups, each with a list of `{ term, desc }` pairs.

---

### A note on the resume/CV link

The `contact` section in `content.js` has two optional fields:

```js
resumeUrl: "https://yoursite.com/resume.pdf",   // or null to hide the link
resumeLabel: "Resume / CV"
```

Set `resumeUrl` to a link to a PDF (or a page) and a link will appear next to the social links in the Contact section. Leave it `null` and it won't show up at all.

---

## 7. How you enable/disable sections

In `content.js`, find the `sections` list near the top:

```js
sections: [
  { id: "about",       enabled: true,  navLabel: "About" },
  { id: "journey",      enabled: true,  navLabel: "Aviation" },
  { id: "skills",       enabled: false, navLabel: "Skills" },
  { id: "work",         enabled: true,  navLabel: "Work" },
  { id: "services",     enabled: false, navLabel: "Services" },
  { id: "testimonials", enabled: false, navLabel: "Testimonials" },
  { id: "contact",      enabled: true,  navLabel: "Contact" }
],
```

- Set `enabled: false` to remove a section from the page completely.
- Set `enabled: true` to show it — just make sure the matching content object further down (`services`, `testimonials`, etc.) is filled in.
- The **order of this list is the order sections appear on the page**, top to bottom.
- `navLabel` controls the menu. Set it to `null` to show the section on the page without a menu link.

### Splitting a long section into a homepage teaser + its own page

This is what Kunal's site does with Aviation: it's a lot of content (intro, a training timeline, an aircraft/simulator gallery, two skill lists, a closing statement), so only the shorter part — intro + timeline — stays on the homepage, and a **"read more" link** at the end takes you to `aviation.html` for the rest (aircraft/simulator, flight skills, core skills, closing).

How it's wired up in `content.js`:
- The `journey` object has a `readMore: { lead, label, href }` field. It's rendered into a `#journey-readmore` element that only exists in `index.html`'s (shorter) copy of the section — so it only ever shows up there.
- `aviation.html` has its own, separate copy of the full `<section id="journey">` (heading, intro, photo, timeline, gallery, skill groups, closing) — everything, no `readMore`.
- Both pages load the exact same `content.js`/`render.js`. Each page only fills in whichever placeholder elements actually exist in *that* page's HTML — so one file's content naturally ends up shorter and the other longer, just by which HTML elements are present.

To set this up for a different long section yourself:
1. In `index.html`, trim that section down to just the "teaser" part, and add a small `<div id="yoursection-readmore"></div>` at the end of it.
2. Create `yourpage.html` — easiest is to copy `aviation.html` as a starting point: it's just the shared header, the *full* section (same `id` and all its usual inner placeholder elements), the shared footer, and the same four `<script>` tags at the bottom.
3. Add a `readMore: { lead: "...", label: "...", href: "yourpage.html" }` field to that section's object in `content.js`, and have `render.js` fill it into `#yoursection-readmore` the same way `journey`'s is done (search render.js for `journey-readmore` to see the exact pattern to copy).
4. Everything else — design, nav, scroll animations, footer clock — keeps working automatically.

There's also a simpler all-or-nothing option if a section should move *entirely* off the homepage (no teaser at all): add a `page` field directly to that section's entry in the `sections` list, e.g. `{ id: "journey", enabled: true, navLabel: "Aviation", page: "aviation.html" }`. Then its nav link goes straight to that page instead of scrolling, and the section is removed from `index.html` entirely.

---

## 8. How you change colours or fonts

Open **`style.css`**, right near the top — the `:root` block:

```css
:root {
  --color-bg:          #0B0C0E;   /* page background */
  --color-text:        #F3F1EC;   /* main text colour */
  --color-accent:      #C08552;   /* the copper/gold accent colour */
  --font-display:      'Fraunces', Georgia, serif;   /* headings */
  --font-sans:         'Hanken Grotesk', sans-serif;  /* body text */
  ...
}
```

Everything on the site references these values, so changing one line here updates the whole site consistently. To use different Google Fonts, also update the `<link>` in the `<head>` of `index.html` that loads them.

Don't go looking for colours elsewhere in the file — if you find yourself doing that, you're fighting the system a little; almost every colour on the site traces back to one of these variables.

---

## 9. How you create a new person's portfolio from the template

1. **Copy the whole `Desktop/template/` folder** to a new location (a new folder, or a new git repo) — this becomes the new person's project. Keep it OUTSIDE this portfolio folder, as its own separate project.
2. Open **`content.js`** inside your copy and replace the example (Maya Chen, a photographer) with the real person's information, field by field. Use the `content.js` file inside `Desktop/template/` itself as your reference — every field is filled in with a working example and a comment explaining it.
3. Replace the files in **`images/`** with the real photos (same filenames is easiest, or update the paths in `content.js` to match new filenames).
4. Turn sections on/off as appropriate for that person's profession (step 7 above).
5. Open **`index.html`** and edit the `<head>` block marked `SEO / META — EDIT EVERYTHING IN THIS BLOCK` — the page title, description, and link-preview (Open Graph) tags. These can't come from `content.js` because search engines and messaging apps read them directly from the HTML.
6. Preview it locally (next section) and check it over.
7. Deploy it (step 10).

You now have two independent, fully working sites built from the same design system.

---

## 10. How you preview it locally

Since there's no build step, you can preview the site two ways:

**Simplest:** double-click `index.html` to open it directly in a browser. This works for almost everything, though a couple of browsers restrict local file access slightly.

**More reliable** (recommended if anything looks off): serve the folder over a tiny local web server. If you have Python installed (most Macs do; on Windows, install it from python.org), open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Press `Ctrl+C` in the terminal to stop it when you're done.

---

## 11. How you deploy the finished website

This site is fully static (no server-side code needed), so any static host works. The simplest, free option — and what Kunal's own site uses — is **GitHub Pages**:

1. Create a GitHub repository and push the folder's contents to it (root of the repo = root of the site).
2. In the repo's Settings → Pages, set the source to the `main` branch.
3. If you have a custom domain, add a `CNAME` file (see the root of this project for an example) with just your domain name inside it, and point your domain's DNS at GitHub Pages.
4. Wait a couple of minutes — your site is live.

Other equally good free options: **Netlify** or **Vercel** — both let you drag-and-drop the folder in a browser and get a live URL immediately, with custom domains supported too.

---

## 12. Troubleshooting

- **Page loads but looks empty / blank:** open the browser's developer console (F12 → Console tab) and look for a red error. It's almost always a small typo in `content.js` — a missing comma, or a missing closing `}` or `]`. JavaScript is picky about this. Compare against the working example in `Desktop/template/content.js` to spot the difference.
- **An image doesn't show:** double check the path in `content.js` exactly matches the filename in `images/` (including capitalization and the file extension).
- **A section won't turn off:** make sure you're editing the `sections` list (step 7) and not just deleting content — `enabled: false` is what actually removes it from the page.
- **Nav link goes nowhere / scroll-spy doesn't highlight it:** the section's `id` in `content.js`'s `sections` list must exactly match the section's `id` in `index.html` (they're already matched for you — only change this if you're renaming sections).

---

## What was preserved from the original design

Every visual detail from the original Kunal Shah site carries over unchanged in the shared design system: the dark editorial colour palette, the Fraunces/Hanken Grotesk type pairing, the fluid type scale, the spacing rhythm, scroll-reveal fades, the hero load-in sequence, the magnetic buttons, the custom cursor, the flight-path timeline animation (now usable for any "journey" story), the grain texture overlay, mobile navigation, and full responsive behaviour across desktop, tablet, and mobile. Nothing was simplified or downgraded — it was reorganized so the same design can carry different people's content.
