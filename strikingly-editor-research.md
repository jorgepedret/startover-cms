# Strikingly Editor Research
## Reference for TinaCMS Implementation

> **Purpose:** Comprehensive breakdown of Strikingly's website builder — all section block types, per-block settings, global styles, and design capabilities — to inform an equivalent setup in TinaCMS.

---

## 1. Editor Architecture

Strikingly's editor is a **section-based, single-page builder** (with optional multi-page support). The left sidebar has three top-level panels:

| Panel | Purpose |
|---|---|
| **Styles** | Site-wide design: fonts, colors, nav, animations, footer |
| **Settings** | Site metadata: name, domain, SEO, integrations |
| **Sections** | Content blocks: add, reorder, show/hide, configure |

The fundamental unit is a **section** — a full-width horizontal band of content. Each section has a fixed type (e.g., Gallery, Store, Blog) with a set of allowed layouts and configuration options. Strikingly 6 introduced drag & drop within sections.

---

## 2. Global Styles Panel

These settings apply site-wide and are separate from per-section customization.

### 2.1 Header & Navigation
- **Layout**: multiple nav layout presets (logo left/center, links left/right/center, hamburger)
- **Spacing**: item spacing between nav links
- **Color**: background color, link color, active/hover color
- **Font size**: navigation text size
- **Border / Drop Shadow**: optional border or shadow on the nav bar
- **Sticky behavior**: nav can be set to stick to the top on scroll
- **Social media icons**: toggleable social links in the header
- **Logo**: upload image logo

### 2.2 Color Scheme
- **Theme palette**: 18 preset colors per template; select from palette or enter custom hex
- **Auto-color from logo**: upload a logo and Strikingly auto-suggests a matching color scheme
- **Primary / accent colors** feed into buttons, headings, section accents globally

### 2.3 Typography
- **Three font slots**: Title Font, Heading Font, Body/Text Font
- **Font library**: curated set of Google Fonts; PRO/VIP can upload custom fonts
- **Text size options** (inline text editor): H2, H3, H4, H5, Paragraph, Small
- **Text formatting**: Bold, Italic, Underline, link
- **Text color**: changeable per text block (limited in some themes)
- **Alignment**: Left, Center, Right (per text block)

### 2.4 Buttons (Global)
- **Color**: primary button background color
- **Style**: varies by template (rounded, square, outlined, filled)

### 2.5 Animations & Effects
- **Scroll animations**: fade-in / slide-in effects as sections enter the viewport
- **Hover effects on images**: zoom, overlay, etc.
- **Background parallax**: background images move at a different scroll speed (select templates)

### 2.6 Footer
- **Show/Hide**: toggle footer visibility
- **Layout options**: multiple presets (text only, text + logo, text + social links, subscribe box, image + text)
- **Content**: copyright text, social links, newsletter subscribe input, logo
- **Color**: inherits from global color scheme or can be customized

---

## 3. Section Types (Block Library)

Below is the full catalogue of known Strikingly section types, grouped by category.

---

### 3.1 🖼 Hero / Landing Section
The mandatory top section of every site. Highly customizable.

**Layouts available:**
- Full-screen image with centered text + CTA
- Split layout (image left/right, text opposite)
- Video background with text overlay
- Minimal text-only hero
- Slideshow/carousel hero (PRO)

**Per-section settings:**
- Headline text (H1 level)
- Subheading text
- CTA button(s): label, link, style (primary/secondary)
- Background: image, video, solid color, gradient
- Text overlay: Light text / Dark text / Light text + dark overlay
- Text alignment: left, center, right
- Scroll-down indicator (arrow)

---

### 3.2 📝 Simple Text / About Section
A straightforward text + optional image section.

**Layouts available:**
- Full-width centered text
- Text left, image right (and inverse)
- Multi-column text
- Advanced layout (PRO): adds button count control, extra spacing options

**Per-section settings:**
- Heading
- Body text (rich text: bold, italic, links, lists)
- Optional image (with alignment)
- Button(s): label + URL
- Background: color, image, video
- Text overlay option

---

### 3.3 📦 Info Boxes / Features Section
Cards arranged in a grid — commonly used for feature lists, services, or "why us" content.

**Layouts available:**
- 2-column grid
- 3-column grid
- 4-column grid
- Icon-only layout
- Image card layout

**Per-card settings:**
- Icon (from icon library) OR image
- Title
- Description text
- Optional button/link

**Per-section settings:**
- Number of cards (add/remove)
- Layout columns
- Background: color, image, video

---

### 3.4 📋 Feature List Section
A structured list format — good for product features, service inclusions, or specs.

**4 layout variants:**
- Horizontal list (icon + text inline)
- Vertical stacked list
- Two-column checklist
- Numbered list style

**Per-item settings:**
- Icon or number indicator
- Title
- Description

**Per-section settings:**
- Background color
- Section title/intro text
- Layout toggle (via Layout button or gear icon)

---

### 3.5 🖼 Gallery Section
Visual media grid or slider for portfolios, photos, products.

**2 display types:**
- **Grid Gallery**: masonry or uniform grid
- **Slider/Carousel**: horizontal scrolling (PRO)

**Per-section settings:**
- Images: upload, reorder, remove
- Image focal point / refocus (thumbnail crop anchor)
- Caption per image (optional)
- Link per image (optional)
- Columns count
- Background: color

---

### 3.6 🎬 Big Media Section
A full-width, single large image or video — cinematic/editorial style.

**Layouts available:**
- Full-width image (no text)
- Full-width image + text overlay (heading + subheading + button)
- Full-width video

**Per-section settings:**
- Background image or video (YouTube, Vimeo, self-hosted)
- Overlay text: heading, subheading, button
- Text overlay style: light / dark / overlay
- Image focal point

---

### 3.7 🎞 Slider Section *(PRO/VIP)*
A multi-slide banner carousel — for promotions, featured content, or storytelling.

**Per-slide settings:**
- Background image or color
- Heading text
- Subheading text
- CTA button: label + URL
- Text overlay style

**Slider controls:**
- Autoplay (on/off)
- Transition speed
- Navigation arrows / dot indicators

---

### 3.8 🛒 Simple Store Section
Native eCommerce product display and cart.

**Layouts available (via LAYOUT + CUSTOMIZE):**
- Grid (2, 3, or 4 columns)
- List view (image left, details right)
- Featured product (large single product)

**Customize options:**
- Columns: 2 / 3 / 4
- Image Shape: square, portrait, landscape (no circle)
- Text Alignment: left / center
- Products Per Page: number selector
- Show/hide price, categories, "Add to Cart" button

**Per-product settings (in Store Manager, not section editor):**
- Product name, description, price
- Images (multiple)
- Categories
- Variants: two-level options (e.g., Size + Color with individual pricing/weight)
- Inventory, shipping, digital download options

**Section-level:**
- Show all categories or filter by one category
- Background color

---

### 3.9 📰 Simple Blog Section
Displays a feed of blog post cards.

**Layouts available:**
- Card grid (2–3 columns)
- List (full-width rows)
- Magazine (featured post large + smaller grid)

**Per-section settings:**
- Show all posts or filter by category/tag
- Number of posts to display
- Show/hide: author, date, excerpt, featured image, read more link
- Background: color

**Blog post editor (separate from section):**
- Rich text with headings, images, video embeds
- Featured image
- Tags and categories
- SEO title/meta description
- Custom HTML per post (PRO)

---

### 3.10 💬 Testimonials Section
Customer quotes / social proof display.

**Layouts available:**
- Cards grid
- Centered single quote carousel
- Horizontal scrolling ticker (select themes)

**Per-testimonial settings:**
- Quote text
- Author name
- Author title / company
- Author photo (optional)
- Star rating (optional)

**Per-section settings:**
- Background: color, image
- Section heading

---

### 3.11 💰 Pricing Table Section
Side-by-side plan comparison.

**Layout:**
- 2, 3, or 4 column pricing cards

**Per-plan settings:**
- Plan name
- Price + billing period
- Feature list (checkmarks, text items)
- CTA button: label + URL
- Highlight/featured flag ("Most Popular")

**Per-section settings:**
- Background: color
- Section heading

---

### 3.12 📧 Contact Form / Signup Form Section
Lead capture and contact.

**2 form types:**
- **Contact Form**: name, email, message fields + submit
- **Signup / Newsletter Form**: email field only + subscribe button

**Per-section settings:**
- Form fields: add/remove/reorder (name, email, phone, message, custom fields)
- Field labels and placeholder text
- Submit button label
- Email notification recipient (where form submissions go)
- Optional: connected to Mailchimp or other email tools (via integrations)
- Background: color, image
- Heading / intro text

---

### 3.13 🎯 Social Feed Section
Embeds a live social media feed.

**Supported platforms (via native connectors or apps):**
- Instagram feed
- Twitter/X feed
- Facebook feed (limited)

**Per-section settings:**
- Account to display
- Number of posts
- Grid or list layout
- Background: color

---

### 3.14 🔢 Stats / Infographic Section
Animated numbers / data highlights (e.g., "500+ clients", "10 years experience").

**Layout:**
- Horizontal row of stat cards (2–5 stats)
- Grid layout

**Per-stat settings:**
- Number (with count-up animation on scroll)
- Label/description
- Optional icon

---

### 3.15 </> HTML Embed Section
Insert any custom HTML, CSS, or JavaScript.

**Use cases:**
- Third-party widgets (Calendly, Typeform, etc.)
- Custom iframes
- Analytics scripts
- Any unsupported feature

**Per-section settings:**
- Raw HTML input field
- Width: full-width or centered/contained
- Background: color

---

### 3.16 🧩 Make Your Own (MYO) Section
Free-form drag & drop canvas section — Strikingly's most flexible option.

**Available elements to add:**
- Text box (heading, paragraph)
- Image
- Video (YouTube, Vimeo, file upload)
- Button
- Spacer / divider
- (All elements can be duplicated and freely repositioned)

**Layout tools:**
- Column system: add/remove columns, resize column widths
- Element drag & drop with snapping
- Section height & width controls
- Padding control per element (in D&D mode)
- Repeated elements: add two elements at once in a row

**Available for all plan levels.**

---

## 4. Universal Per-Section Settings

Every section (regardless of type) exposes these common settings:

| Setting | Options |
|---|---|
| **Section title** (nav anchor) | Custom text for scroll-nav link |
| **Show in navigation** | Toggle on/off |
| **Background type** | Color / Image / Video |
| **Background color** | 18 theme colors + custom hex |
| **Background image** | Upload, with Scale (Stretch / Contain), focal point / refocus |
| **Background video** | YouTube / Vimeo URL; falls back to thumbnail on mobile |
| **Text overlay** | Light text / Dark text / Light text + dark overlay |
| **Section layout** | Multiple presets per section type (via Layout button) |
| **Drag & Drop mode** | Enter free-form edit mode |
| **Section height/width** | Adjust in D&D mode |
| **Reorder** | Drag sections up/down in sidebar |
| **Hide/Show** | Toggle section visibility without deleting |
| **Delete** | Remove section entirely |

---

## 5. Advanced Layout Option *(PRO/VIP)*

Available for these section types:
- Plain Text
- Info Boxes
- Hero
- Signup Form
- Content in Columns
- Content in Rows
- Big Media

Unlocks:
- Extra button slots per section
- More granular spacing controls
- Additional layout variants not available in Standard mode

---

## 6. Multi-Page Architecture

- Free plan: single-page site only
- PRO/VIP: multi-page site with a full navigation menu
- Each **page** is an independent set of sections
- Shared elements: Header (nav), Footer, and global styles carry across all pages
- Multi-page sites support dedicated Blog and Store pages separate from the main page

---

## 7. TinaCMS Implementation Notes

### Section Schema Parity
Each Strikingly section type maps to a TinaCMS **block** in a `blocks` field array. Key fields to model per block:

```
HeroBlock         → headline, subheading, buttons[], backgroundType, backgroundImage, backgroundVideo, textOverlay, layout
SimpleTextBlock   → heading, body (rich text), image, buttons[], layout
InfoBoxesBlock    → heading, items[]{icon, title, description, button}, layout, columns
FeatureListBlock  → heading, items[]{icon, title, description}, layout
GalleryBlock      → images[]{src, caption, link, focalPoint}, displayType (grid|slider), columns
BigMediaBlock     → mediaType (image|video), src, overlayHeading, overlaySubheading, button, textOverlay
SliderBlock       → slides[]{backgroundImage, heading, subheading, button, overlay}, autoplay, speed
StoreBlock        → categoryFilter, columns, imageShape, textAlignment, productsPerPage
BlogBlock         → categoryFilter, postsPerPage, showAuthor, showDate, showExcerpt, layout
TestimonialsBlock → heading, items[]{quote, author, title, photo, rating}, layout
PricingBlock      → heading, plans[]{name, price, period, features[], button, highlighted}
ContactFormBlock  → heading, formType (contact|signup), fields[], submitLabel, recipientEmail
SocialFeedBlock   → platform, handle, count, layout
StatsBlock        → heading, stats[]{number, label, icon}
HtmlEmbedBlock    → html, width (full|contained)
MYOBlock          → elements[] (freeform drag-drop — most complex to replicate)
```

### Global Styles Parity
Map the Strikingly Styles panel to a TinaCMS **global settings document** or site config block:

```
siteStyles:
  navigation: { layout, sticky, color, fontColor, spacing }
  colorScheme: { primary, secondary, accent, background, text }
  typography: { titleFont, headingFont, bodyFont }
  buttons: { color, style }
  footer: { show, layout, content }
  animations: { scrollFade, hoverEffect, parallax }
```

### Key UX Patterns to Replicate
1. **Layout picker per block** — each block should have a `layout` enum with 2–4 visual presets
2. **Background subsystem** — unified background config (color | image | video) on every block
3. **Text overlay enum** — `light | dark | lightWithOverlay` for readability over backgrounds
4. **Section visibility toggle** — `hidden: boolean` field on every block
5. **Nav anchor** — `navTitle: string` field for scroll-to-section nav links
6. **Repeatable sub-items** — items[], slides[], plans[], stats[] as TinaCMS list fields

---

## 8. Key Limitations in Strikingly (Worth Noting for TinaCMS)

- No native **Team/People** section — would need third-party embed or MYO
- No native **FAQ / Accordion** section — same workaround needed
- No native **Countdown Timer** section — third-party app required
- Background videos **don't autoplay on mobile** — show thumbnail fallback instead
- Font color and border color customization is **limited in some themes**
- Advanced layouts (extra buttons, spacing) gated behind **PRO plan**
- Free plan: 1 site, 5 pages max, limited sections, Strikingly subdomain only
- No **true free-form** layout (except MYO section) — everything is section-constrained

---

*Sources: Strikingly Help Center, official Strikingly blog/updates, third-party reviews (WebCreate, Tooltester, Experte, FirstSiteGuide, LitExtension). Research conducted April 2026.*
