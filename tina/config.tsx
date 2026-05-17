import React from "react";
import { defineConfig } from "tinacms";

const tinaClientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const tinaToken = process.env.TINA_TOKEN;
const hasTinaCloudCredentials = Boolean(tinaClientId && tinaToken);
// Local dev override: only active when explicitly running `tinacms dev` locally
const isLocalDev = process.env.TINA_PUBLIC_IS_LOCAL === "true";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AdvancedIdField = ({ input }: any) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ marginTop: 4 }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: 4, background: "none",
          border: "none", cursor: "pointer", padding: "4px 0", color: "#6b7280", fontSize: 12,
        }}
      >
        <span style={{ fontSize: 10 }}>{open ? "▼" : "▶"}</span> Advanced
      </button>
      {open && (
        <div style={{ paddingLeft: 12, marginTop: 4 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 500, marginBottom: 4, color: "#374151" }}>
            Section ID
          </label>
          <input
            {...input}
            placeholder="Auto-generated from title"
            style={{
              width: "100%", padding: "6px 8px", fontSize: 13,
              border: "1px solid #d1d5db", borderRadius: 4, boxSizing: "border-box",
            }}
          />
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
            Custom anchor ID. Leave blank to use the title.
          </p>
        </div>
      )}
    </div>
  );
};

// ---------------------------------------------------------------------------
// Shared field groups
// ---------------------------------------------------------------------------

// Appended to every block — controls nav anchor visibility
const navFields = [
  {
    name: "showInNav",
    label: "Show in navigation bar",
    type: "boolean" as const,
  },
  {
    name: "navLabel",
    label: "Nav label (defaults to title if blank)",
    type: "string" as const,
  },
  {
    name: "blockId",
    label: "",
    type: "string" as const,
    ui: { component: AdvancedIdField },
  },
];

// Reusable button field shape
const buttonFields = [
  { name: "label", label: "Label", type: "string" as const },
  { name: "url",   label: "URL",   type: "string" as const },
];

// Reusable overlay fields (color + opacity) — used on blocks with bg image/video
const overlayFields = [
  {
    name: "overlayColor",
    label: "Overlay Color",
    type: "string" as const,
    ui: { component: "color" },
  },
  {
    name: "overlayOpacity",
    label: "Overlay Opacity (0–100)",
    type: "number" as const,
  },
];

// ---------------------------------------------------------------------------
// 1. Hero / Landing
// ---------------------------------------------------------------------------
const heroTemplate = {
  name: "hero",
  label: "Hero",
  fields: [
    // Layout & height
    {
      name: "layout",
      label: "Layout",
      type: "string" as const,
      options: [
        { value: "centered",    label: "Centered" },
        { value: "split-left",  label: "Split — Text Left" },
        { value: "split-right", label: "Split — Text Right" },
        { value: "minimal",     label: "Minimal (text only)" },
      ],
    },
    {
      name: "height",
      label: "Height",
      type: "string" as const,
      options: [
        { value: "100vh", label: "Full screen (100vh)" },
        { value: "75vh",  label: "Tall (75vh)" },
        { value: "50vh",  label: "Medium (50vh)" },
      ],
    },
    // Background
    {
      name: "backgroundType",
      label: "Background Type",
      type: "string" as const,
      options: [
        { value: "image", label: "Image" },
        { value: "video", label: "Video (YouTube / Vimeo)" },
        { value: "color", label: "Color" },
      ],
    },
    { name: "image",           label: "Background Image",              type: "image"  as const },
    { name: "videoUrl",        label: "Background Video URL",          type: "string" as const },
    { name: "backgroundColor", label: "Background Color",             type: "string" as const, ui: { component: "color" } },
    // Overlay (for image / video backgrounds)
    ...overlayFields,
    // Content
    { name: "title",    label: "Headline",   type: "string" as const },
    { name: "subtitle", label: "Subheading", type: "string" as const },
    // Buttons
    {
      name: "primaryButton",
      label: "Primary Button",
      type: "object" as const,
      fields: buttonFields,
    },
    {
      name: "secondaryButton",
      label: "Secondary Button",
      type: "object" as const,
      fields: buttonFields,
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 2. Simple Text / About
// ---------------------------------------------------------------------------
const textSectionTemplate = {
  name: "textSection",
  label: "Simple Text",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string" as const,
      options: [
        { value: "centered",    label: "Centered (no image)" },
        { value: "text-left",   label: "Text Left, Image Right" },
        { value: "text-right",  label: "Image Left, Text Right" },
      ],
    },
    { name: "title",    label: "Heading",    type: "string"     as const },
    { name: "subtitle", label: "Subheading", type: "string"     as const },
    { name: "body",     label: "Body",       type: "rich-text"  as const },
    {
      name: "images",
      label: "Images",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { alt?: string }) => ({ label: item?.alt || "Image" }) },
      fields: [
        { name: "src", label: "Image",    type: "image"  as const },
        { name: "alt", label: "Alt Text", type: "string" as const },
      ],
    },
    {
      name: "primaryButton",
      label: "Primary Button",
      type: "object" as const,
      fields: buttonFields,
    },
    {
      name: "secondaryButton",
      label: "Secondary Button",
      type: "object" as const,
      fields: buttonFields,
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 3. Info Boxes / Features / Cards Grid
// ---------------------------------------------------------------------------
const infoBoxesTemplate = {
  name: "infoBoxes",
  label: "Info Boxes",
  fields: [
    { name: "title", label: "Section Heading", type: "string" as const },
    {
      name: "columns",
      label: "Columns",
      type: "string" as const,
      options: [
        { value: "2", label: "2 columns" },
        { value: "3", label: "3 columns" },
        { value: "4", label: "4 columns" },
      ],
    },
    {
      name: "cards",
      label: "Cards",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title || "Card" }) },
      fields: [
        {
          name: "mediaType",
          label: "Media Type",
          type: "string" as const,
          options: [
            { value: "icon",  label: "Icon" },
            { value: "image", label: "Image" },
          ],
        },
        { name: "icon",        label: "Icon (name or class)",  type: "string" as const },
        { name: "image",       label: "Image",                 type: "image"  as const },
        { name: "title",       label: "Title",                 type: "string" as const },
        { name: "titleLink",   label: "Title Link URL",        type: "string" as const },
        { name: "description", label: "Description",           type: "string" as const },
        {
          name: "button",
          label: "Button (optional)",
          type: "object" as const,
          fields: buttonFields,
        },
      ],
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 4. Feature List
// ---------------------------------------------------------------------------
const featureListTemplate = {
  name: "featureList",
  label: "Feature List",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string" as const,
      options: [
        { value: "horizontal",           label: "Horizontal (icon + text inline)" },
        { value: "vertical",             label: "Vertical stacked" },
        { value: "two-column-checklist", label: "Two-column checklist" },
        { value: "numbered",             label: "Numbered list" },
      ],
    },
    { name: "title", label: "Section Heading", type: "string"    as const },
    { name: "intro", label: "Section Intro",   type: "rich-text" as const },
    {
      name: "items",
      label: "Items",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title || "Item" }) },
      fields: [
        {
          name: "mediaType",
          label: "Media Type",
          type: "string" as const,
          options: [
            { value: "none",  label: "None" },
            { value: "icon",  label: "Icon" },
            { value: "image", label: "Image" },
          ],
        },
        { name: "icon",        label: "Icon (name or class)", type: "string" as const },
        { name: "image",       label: "Image",                type: "image"  as const },
        { name: "title",       label: "Title",                type: "string" as const },
        { name: "description", label: "Description",          type: "string" as const },
      ],
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 5. Gallery (grid / masonry / carousel / lightbox)
// ---------------------------------------------------------------------------
const galleryTemplate = {
  name: "gallery",
  label: "Gallery",
  fields: [
    { name: "title", label: "Section Title", type: "string" as const },
    {
      name: "displayMode",
      label: "Display Mode",
      type: "string" as const,
      options: [
        { value: "grid",      label: "Grid (uniform)" },
        { value: "masonry",   label: "Masonry (variable height)" },
        { value: "carousel",  label: "Carousel / Slider" },
        { value: "lightbox",  label: "Lightbox only" },
      ],
    },
    {
      name: "columns",
      label: "Columns",
      type: "string" as const,
      options: [
        { value: "2",    label: "2" },
        { value: "3",    label: "3" },
        { value: "4",    label: "4" },
        { value: "auto", label: "Auto" },
      ],
    },
    // Carousel-only controls
    { name: "autoplay", label: "Autoplay (carousel only)", type: "boolean" as const },
    {
      name: "navigation",
      label: "Navigation Style (carousel only)",
      type: "string" as const,
      options: [
        { value: "arrows", label: "Arrows" },
        { value: "dots",   label: "Dots" },
        { value: "both",   label: "Both" },
      ],
    },
    {
      name: "images",
      label: "Images",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { alt?: string }) => ({ label: item?.alt || "Image" }) },
      fields: [
        { name: "src",          label: "Image",         type: "image"  as const },
        { name: "alt",          label: "Alt Text",      type: "string" as const },
        { name: "caption",      label: "Caption",       type: "string" as const },
        { name: "titleOverlay", label: "Title Overlay", type: "string" as const },
        { name: "linkUrl",      label: "Link URL",      type: "string" as const },
      ],
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 6. Big Media (full-width image / video / color)
// ---------------------------------------------------------------------------
const bigMediaTemplate = {
  name: "bigMedia",
  label: "Big Media",
  fields: [
    {
      name: "mediaType",
      label: "Media Type",
      type: "string" as const,
      options: [
        { value: "image", label: "Image" },
        { value: "video", label: "Video (YouTube / Vimeo)" },
        { value: "color", label: "Solid Color" },
      ],
    },
    { name: "image",           label: "Image",                        type: "image"  as const },
    { name: "videoUrl",        label: "Video URL (YouTube / Vimeo)",  type: "string" as const },
    { name: "backgroundColor", label: "Background Color",             type: "string" as const, ui: { component: "color" } },
    {
      name: "height",
      label: "Height",
      type: "string" as const,
      options: [
        { value: "100vh",   label: "Full screen (100vh)" },
        { value: "75vh",    label: "Tall (75vh)" },
        { value: "50vh",    label: "Medium (50vh)" },
        { value: "fixed",   label: "Fixed (px)" },
        { value: "natural", label: "Natural (follows image ratio)" },
      ],
    },
    { name: "heightPx", label: "Fixed Height in px (when Height = Fixed)", type: "number" as const },
    // Overlay
    ...overlayFields,
    // Optional text overlay — leave blank for media-only display
    { name: "title",    label: "Heading (optional)",    type: "string" as const },
    { name: "subtitle", label: "Subheading (optional)", type: "string" as const },
    {
      name: "primaryButton",
      label: "Primary Button",
      type: "object" as const,
      fields: buttonFields,
    },
    {
      name: "secondaryButton",
      label: "Secondary Button",
      type: "object" as const,
      fields: buttonFields,
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 7. Testimonials
// ---------------------------------------------------------------------------
const testimonialsTemplate = {
  name: "testimonials",
  label: "Testimonials",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string" as const,
      options: [
        { value: "cards-grid",         label: "Cards Grid" },
        { value: "centered-carousel",  label: "Centered Carousel" },
        { value: "horizontal-ticker",  label: "Horizontal Ticker" },
        { value: "stacked",            label: "Stacked (one per row)" },
      ],
    },
    { name: "title", label: "Section Heading", type: "string"    as const },
    { name: "intro", label: "Section Intro",   type: "rich-text" as const },
    {
      name: "items",
      label: "Testimonials",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { authorName?: string }) => ({ label: item?.authorName || "Testimonial" }) },
      fields: [
        { name: "quote",       label: "Quote",                  type: "rich-text" as const },
        { name: "authorName",  label: "Author Name",            type: "string"    as const },
        { name: "authorTitle", label: "Author Title / Company", type: "string"    as const },
        { name: "authorPhoto", label: "Author Photo",           type: "image"     as const },
        { name: "companyLogo", label: "Company Logo",           type: "image"     as const },
        { name: "rating",      label: "Star Rating (1–5)",      type: "number"    as const },
      ],
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 8. Signup / Newsletter Form
// ---------------------------------------------------------------------------
const signupFormTemplate = {
  name: "signupForm",
  label: "Signup Form",
  fields: [
    { name: "title", label: "Section Heading", type: "string"    as const },
    { name: "intro", label: "Section Intro",   type: "rich-text" as const },
    // Name field (optional, toggleable)
    { name: "showNameField",  label: "Show Name Field",       type: "boolean" as const },
    { name: "nameFieldLabel", label: "Name Field Label",      type: "string"  as const },
    // Email field
    { name: "emailFieldLabel", label: "Email Field Label",    type: "string"  as const },
    // Submit button
    { name: "submitLabel", label: "Button Label",             type: "string"  as const },
    { name: "submitColor", label: "Button Color",             type: "string"  as const, ui: { component: "color" } },
    {
      name: "submitStyle",
      label: "Button Style",
      type: "string" as const,
      options: [
        { value: "filled",   label: "Filled" },
        { value: "outlined", label: "Outlined" },
      ],
    },
    // Success state
    {
      name: "successAction",
      label: "After Submit",
      type: "string" as const,
      options: [
        { value: "message",  label: "Show success message" },
        { value: "redirect", label: "Redirect to URL" },
        { value: "both",     label: "Message then redirect" },
      ],
    },
    { name: "successMessage", label: "Success Message", type: "string" as const },
    { name: "redirectUrl",    label: "Redirect URL",    type: "string" as const },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 9. Stats / Infographic
// ---------------------------------------------------------------------------
const statsTemplate = {
  name: "stats",
  label: "Stats",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string" as const,
      options: [
        { value: "row",  label: "Horizontal Row" },
        { value: "grid", label: "Grid" },
      ],
    },
    {
      name: "columns",
      label: "Columns",
      type: "string" as const,
      options: [
        { value: "2",    label: "2" },
        { value: "3",    label: "3" },
        { value: "4",    label: "4" },
        { value: "auto", label: "Auto" },
      ],
    },
    { name: "title", label: "Section Heading", type: "string"    as const },
    { name: "intro", label: "Section Intro",   type: "rich-text" as const },
    {
      name: "items",
      label: "Stats",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { number?: string; label?: string }) => ({ label: item?.number ? `${item.number} — ${item.label || ""}` : "Stat" }) },
      fields: [
        { name: "number", label: "Number (e.g. '500+' or '$99')", type: "string" as const },
        { name: "label",  label: "Label",                          type: "string" as const },
        {
          name: "mediaType",
          label: "Icon / Image",
          type: "string" as const,
          options: [
            { value: "none",  label: "None" },
            { value: "icon",  label: "Icon" },
            { value: "image", label: "Image" },
          ],
        },
        { name: "icon",  label: "Icon (name or class)", type: "string" as const },
        { name: "image", label: "Image",                type: "image"  as const },
      ],
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 10. HTML Embed
// ---------------------------------------------------------------------------
const htmlEmbedTemplate = {
  name: "htmlEmbed",
  label: "HTML Embed",
  fields: [
    { name: "title", label: "Section Heading", type: "string"    as const },
    { name: "intro", label: "Section Intro",   type: "rich-text" as const },
    {
      name: "width",
      label: "Width",
      type: "string" as const,
      options: [
        { value: "full-width", label: "Full width" },
        { value: "contained",  label: "Contained / centered" },
      ],
    },
    {
      name: "heightType",
      label: "Height",
      type: "string" as const,
      options: [
        { value: "auto",  label: "Auto (content determines height)" },
        { value: "fixed", label: "Fixed (px)" },
      ],
    },
    { name: "heightPx", label: "Fixed Height in px (when Height = Fixed)", type: "number" as const },
    {
      name: "html",
      label: "Embed Code",
      type: "string" as const,
      ui: { component: "textarea" },
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 11. Contact Form
// ---------------------------------------------------------------------------
const contactFormTemplate = {
  name: "contactForm",
  label: "Contact Form",
  fields: [
    { name: "title", label: "Section Heading", type: "string"    as const },
    { name: "intro", label: "Section Intro",   type: "rich-text" as const },
    // ── Name field ──────────────────────────────────────────────────────────
    { name: "showNameField",  label: "Show Name Field",    type: "boolean" as const },
    { name: "nameRequired",   label: "Name Required",      type: "boolean" as const },
    { name: "nameFieldLabel", label: "Name Field Label",   type: "string"  as const },
    // ── Email field ─────────────────────────────────────────────────────────
    { name: "emailFieldLabel", label: "Email Field Label", type: "string" as const },
    // ── Subject field ───────────────────────────────────────────────────────
    { name: "showSubjectField",  label: "Show Subject Field",    type: "boolean" as const },
    { name: "subjectRequired",   label: "Subject Required",      type: "boolean" as const },
    { name: "subjectFieldLabel", label: "Subject Field Label",   type: "string"  as const },
    {
      name: "subjectType",
      label: "Subject Input Type",
      type: "string" as const,
      options: [
        { value: "text",     label: "Free text" },
        { value: "dropdown", label: "Dropdown (editor-defined options)" },
      ],
    },
    {
      name: "subjectOptions",
      label: "Dropdown Options (one per item)",
      type: "object" as const,
      list: true,
      ui: { itemProps: (item: { option?: string }) => ({ label: item?.option || "Option" }) },
      fields: [
        { name: "option", label: "Option", type: "string" as const },
      ],
    },
    // ── Message field ────────────────────────────────────────────────────────
    { name: "messageFieldLabel", label: "Message Field Label", type: "string" as const },
    // ── Submit button ────────────────────────────────────────────────────────
    { name: "submitLabel", label: "Button Label",  type: "string" as const },
    { name: "submitColor", label: "Button Color",  type: "string" as const, ui: { component: "color" } },
    {
      name: "submitStyle",
      label: "Button Style",
      type: "string" as const,
      options: [
        { value: "filled",   label: "Filled" },
        { value: "outlined", label: "Outlined" },
      ],
    },
    // ── Success state ────────────────────────────────────────────────────────
    {
      name: "successAction",
      label: "After Submit",
      type: "string" as const,
      options: [
        { value: "message",  label: "Show success message" },
        { value: "redirect", label: "Redirect to URL" },
        { value: "both",     label: "Message then redirect" },
      ],
    },
    { name: "successMessage", label: "Success Message", type: "string" as const },
    { name: "redirectUrl",    label: "Redirect URL",    type: "string" as const },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// 12. Experiments
// ---------------------------------------------------------------------------
const experimentsTemplate = {
  name: "experiments",
  label: "Experiments",
  fields: [
    {
      name: "experiments",
      label: "Experiments",
      type: "object" as const,
      list: true as const,
      ui: { itemProps: (item: { title?: string }) => ({ label: item?.title || "Experiment" }) },
      fields: [
        { name: "title", label: "Title", type: "string" as const, required: true },
        { name: "logo", label: "Square Logo", type: "image" as const },
        { name: "matrixCode", label: "Matrix Code", type: "string" as const },
        {
          name: "matrixPoints",
          label: "Matrix Points",
          type: "number" as const,
        },
        { name: "description", label: "Description", type: "rich-text" as const },
        {
          name: "link",
          label: "Link to Site",
          type: "reference" as const,
          collections: ["site"],
        },
      ],
    },
    ...navFields,
  ],
};

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------
export default defineConfig({
  branch: "main",
  ...(hasTinaCloudCredentials
    ? {
        clientId: tinaClientId as string,
        token: tinaToken as string,
      }
    : isLocalDev
    ? {
        // Local filesystem datalayer — only when TINA_PUBLIC_IS_LOCAL=true
        contentApiUrlOverride: "http://localhost:4001/graphql",
      }
    : {}),
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public",
    },
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site",
        path: "content/sites",
        format: "md",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
        },
        fields: [
          { name: "title", label: "Site Title", type: "string", required: true },
          { name: "slug",  label: "Slug",       type: "string" },
          {
            name: "blocks",
            label: "Content Blocks",
            type: "object",
            list: true,
            templates: [
              heroTemplate,
              textSectionTemplate,
              infoBoxesTemplate,
              featureListTemplate,
              galleryTemplate,
              bigMediaTemplate,
              testimonialsTemplate,
              signupFormTemplate,
              statsTemplate,
              htmlEmbedTemplate,
              contactFormTemplate,
              experimentsTemplate,
            ],
          },
        ],
      },
      {
        name: "homepage",
        label: "Home Page",
        path: "content/pages",
        format: "md",
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false },
        },
        fields: [
          { name: "title",    label: "Title",    type: "string" as const },
          { name: "subtitle", label: "Subtitle", type: "string" as const },
        ],
      },
      {
        name: "template",
        label: "Templates",
        path: "content/templates",
        format: "md",
        fields: [
          { name: "name",        label: "Template Name", type: "string", required: true },
          { name: "description", label: "Description",   type: "string" },
        ],
      },
      {
        name: "experiment",
        label: "Experiments",
        path: "content/experiments",
        format: "md",
        ui: {
          router: ({ document }) => `/experiments/${document._sys.filename}`,
          filename: {
            slugify: (doc: any) => {
              return doc.matrixCode ? doc.matrixCode.toLowerCase().replace(/[^\w-]/g, "") : "experiment";
            },
          },
        },
        fields: [
          { name: "title", label: "Title", type: "string", required: true },
          { name: "matrixCode", label: "Matrix Code", type: "string", required: true },
          { name: "logo", label: "Square Logo", type: "image" },
          {
            name: "matrixPoints",
            label: "Matrix Points",
            type: "number",
          },
          { name: "description", label: "Description", type: "rich-text" },
          {
            name: "link",
            label: "Link to Site",
            type: "reference",
            collections: ["site"],
          },
        ],
      },
    ],
  },
});
