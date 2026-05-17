// tina/config.tsx
import React from "react";
import { defineConfig } from "tinacms";
import { jsx, jsxs } from "react/jsx-runtime";
var tinaClientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
var tinaToken = process.env.TINA_TOKEN;
var hasTinaCloudCredentials = Boolean(tinaClientId && tinaToken);
var isLocalDev = process.env.TINA_PUBLIC_IS_LOCAL === "true";
var AdvancedIdField = ({ input }) => {
  const [open, setOpen] = React.useState(false);
  return jsxs("div", { style: { marginTop: 4 }, children: [
    jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        style: {
          display: "flex",
          alignItems: "center",
          gap: 4,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "4px 0",
          color: "#6b7280",
          fontSize: 12
        },
        children: [
          jsx("span", { style: { fontSize: 10 }, children: open ? "\u25BC" : "\u25B6" }),
          " Advanced"
        ]
      }
    ),
    open && jsxs("div", { style: { paddingLeft: 12, marginTop: 4 }, children: [
      jsx("label", { style: { display: "block", fontSize: 12, fontWeight: 500, marginBottom: 4, color: "#374151" }, children: "Section ID" }),
      jsx(
        "input",
        {
          ...input,
          placeholder: "Auto-generated from title",
          style: {
            width: "100%",
            padding: "6px 8px",
            fontSize: 13,
            border: "1px solid #d1d5db",
            borderRadius: 4,
            boxSizing: "border-box"
          }
        }
      ),
      jsx("p", { style: { fontSize: 11, color: "#9ca3af", marginTop: 4 }, children: "Custom anchor ID. Leave blank to use the title." })
    ] })
  ] });
};
var navFields = [
  {
    name: "showInNav",
    label: "Show in navigation bar",
    type: "boolean"
  },
  {
    name: "navLabel",
    label: "Nav label (defaults to title if blank)",
    type: "string"
  },
  {
    name: "blockId",
    label: "",
    type: "string",
    ui: { component: AdvancedIdField }
  }
];
var buttonFields = [
  { name: "label", label: "Label", type: "string" },
  { name: "url", label: "URL", type: "string" }
];
var overlayFields = [
  {
    name: "overlayColor",
    label: "Overlay Color",
    type: "string",
    ui: { component: "color" }
  },
  {
    name: "overlayOpacity",
    label: "Overlay Opacity (0\u2013100)",
    type: "number"
  }
];
var heroTemplate = {
  name: "hero",
  label: "Hero",
  fields: [
    // Layout & height
    {
      name: "layout",
      label: "Layout",
      type: "string",
      options: [
        { value: "centered", label: "Centered" },
        { value: "split-left", label: "Split \u2014 Text Left" },
        { value: "split-right", label: "Split \u2014 Text Right" },
        { value: "minimal", label: "Minimal (text only)" }
      ]
    },
    {
      name: "height",
      label: "Height",
      type: "string",
      options: [
        { value: "100vh", label: "Full screen (100vh)" },
        { value: "75vh", label: "Tall (75vh)" },
        { value: "50vh", label: "Medium (50vh)" }
      ]
    },
    // Background
    {
      name: "backgroundType",
      label: "Background Type",
      type: "string",
      options: [
        { value: "image", label: "Image" },
        { value: "video", label: "Video (YouTube / Vimeo)" },
        { value: "color", label: "Color" }
      ]
    },
    { name: "image", label: "Background Image", type: "image" },
    { name: "videoUrl", label: "Background Video URL", type: "string" },
    { name: "backgroundColor", label: "Background Color", type: "string", ui: { component: "color" } },
    // Overlay (for image / video backgrounds)
    ...overlayFields,
    // Content
    { name: "title", label: "Headline", type: "string" },
    { name: "subtitle", label: "Subheading", type: "string" },
    // Buttons
    {
      name: "primaryButton",
      label: "Primary Button",
      type: "object",
      fields: buttonFields
    },
    {
      name: "secondaryButton",
      label: "Secondary Button",
      type: "object",
      fields: buttonFields
    },
    ...navFields
  ]
};
var textSectionTemplate = {
  name: "textSection",
  label: "Simple Text",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string",
      options: [
        { value: "centered", label: "Centered (no image)" },
        { value: "text-left", label: "Text Left, Image Right" },
        { value: "text-right", label: "Image Left, Text Right" }
      ]
    },
    { name: "title", label: "Heading", type: "string" },
    { name: "subtitle", label: "Subheading", type: "string" },
    { name: "body", label: "Body", type: "rich-text" },
    {
      name: "images",
      label: "Images",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.alt || "Image" }) },
      fields: [
        { name: "src", label: "Image", type: "image" },
        { name: "alt", label: "Alt Text", type: "string" }
      ]
    },
    {
      name: "primaryButton",
      label: "Primary Button",
      type: "object",
      fields: buttonFields
    },
    {
      name: "secondaryButton",
      label: "Secondary Button",
      type: "object",
      fields: buttonFields
    },
    ...navFields
  ]
};
var infoBoxesTemplate = {
  name: "infoBoxes",
  label: "Info Boxes",
  fields: [
    { name: "title", label: "Section Heading", type: "string" },
    {
      name: "columns",
      label: "Columns",
      type: "string",
      options: [
        { value: "2", label: "2 columns" },
        { value: "3", label: "3 columns" },
        { value: "4", label: "4 columns" }
      ]
    },
    {
      name: "cards",
      label: "Cards",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Card" }) },
      fields: [
        {
          name: "mediaType",
          label: "Media Type",
          type: "string",
          options: [
            { value: "icon", label: "Icon" },
            { value: "image", label: "Image" }
          ]
        },
        { name: "icon", label: "Icon (name or class)", type: "string" },
        { name: "image", label: "Image", type: "image" },
        { name: "title", label: "Title", type: "string" },
        { name: "titleLink", label: "Title Link URL", type: "string" },
        { name: "description", label: "Description", type: "string" },
        {
          name: "button",
          label: "Button (optional)",
          type: "object",
          fields: buttonFields
        }
      ]
    },
    ...navFields
  ]
};
var featureListTemplate = {
  name: "featureList",
  label: "Feature List",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string",
      options: [
        { value: "horizontal", label: "Horizontal (icon + text inline)" },
        { value: "vertical", label: "Vertical stacked" },
        { value: "two-column-checklist", label: "Two-column checklist" },
        { value: "numbered", label: "Numbered list" }
      ]
    },
    { name: "title", label: "Section Heading", type: "string" },
    { name: "intro", label: "Section Intro", type: "rich-text" },
    {
      name: "items",
      label: "Items",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.title || "Item" }) },
      fields: [
        {
          name: "mediaType",
          label: "Media Type",
          type: "string",
          options: [
            { value: "none", label: "None" },
            { value: "icon", label: "Icon" },
            { value: "image", label: "Image" }
          ]
        },
        { name: "icon", label: "Icon (name or class)", type: "string" },
        { name: "image", label: "Image", type: "image" },
        { name: "title", label: "Title", type: "string" },
        { name: "description", label: "Description", type: "string" }
      ]
    },
    ...navFields
  ]
};
var galleryTemplate = {
  name: "gallery",
  label: "Gallery",
  fields: [
    { name: "title", label: "Section Title", type: "string" },
    {
      name: "displayMode",
      label: "Display Mode",
      type: "string",
      options: [
        { value: "grid", label: "Grid (uniform)" },
        { value: "masonry", label: "Masonry (variable height)" },
        { value: "carousel", label: "Carousel / Slider" },
        { value: "lightbox", label: "Lightbox only" }
      ]
    },
    {
      name: "columns",
      label: "Columns",
      type: "string",
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "auto", label: "Auto" }
      ]
    },
    // Carousel-only controls
    { name: "autoplay", label: "Autoplay (carousel only)", type: "boolean" },
    {
      name: "navigation",
      label: "Navigation Style (carousel only)",
      type: "string",
      options: [
        { value: "arrows", label: "Arrows" },
        { value: "dots", label: "Dots" },
        { value: "both", label: "Both" }
      ]
    },
    {
      name: "images",
      label: "Images",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.alt || "Image" }) },
      fields: [
        { name: "src", label: "Image", type: "image" },
        { name: "alt", label: "Alt Text", type: "string" },
        { name: "caption", label: "Caption", type: "string" },
        { name: "titleOverlay", label: "Title Overlay", type: "string" },
        { name: "linkUrl", label: "Link URL", type: "string" }
      ]
    },
    ...navFields
  ]
};
var bigMediaTemplate = {
  name: "bigMedia",
  label: "Big Media",
  fields: [
    {
      name: "mediaType",
      label: "Media Type",
      type: "string",
      options: [
        { value: "image", label: "Image" },
        { value: "video", label: "Video (YouTube / Vimeo)" },
        { value: "color", label: "Solid Color" }
      ]
    },
    { name: "image", label: "Image", type: "image" },
    { name: "videoUrl", label: "Video URL (YouTube / Vimeo)", type: "string" },
    { name: "backgroundColor", label: "Background Color", type: "string", ui: { component: "color" } },
    {
      name: "height",
      label: "Height",
      type: "string",
      options: [
        { value: "100vh", label: "Full screen (100vh)" },
        { value: "75vh", label: "Tall (75vh)" },
        { value: "50vh", label: "Medium (50vh)" },
        { value: "fixed", label: "Fixed (px)" },
        { value: "natural", label: "Natural (follows image ratio)" }
      ]
    },
    { name: "heightPx", label: "Fixed Height in px (when Height = Fixed)", type: "number" },
    // Overlay
    ...overlayFields,
    // Optional text overlay — leave blank for media-only display
    { name: "title", label: "Heading (optional)", type: "string" },
    { name: "subtitle", label: "Subheading (optional)", type: "string" },
    {
      name: "primaryButton",
      label: "Primary Button",
      type: "object",
      fields: buttonFields
    },
    {
      name: "secondaryButton",
      label: "Secondary Button",
      type: "object",
      fields: buttonFields
    },
    ...navFields
  ]
};
var testimonialsTemplate = {
  name: "testimonials",
  label: "Testimonials",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string",
      options: [
        { value: "cards-grid", label: "Cards Grid" },
        { value: "centered-carousel", label: "Centered Carousel" },
        { value: "horizontal-ticker", label: "Horizontal Ticker" },
        { value: "stacked", label: "Stacked (one per row)" }
      ]
    },
    { name: "title", label: "Section Heading", type: "string" },
    { name: "intro", label: "Section Intro", type: "rich-text" },
    {
      name: "items",
      label: "Testimonials",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.authorName || "Testimonial" }) },
      fields: [
        { name: "quote", label: "Quote", type: "rich-text" },
        { name: "authorName", label: "Author Name", type: "string" },
        { name: "authorTitle", label: "Author Title / Company", type: "string" },
        { name: "authorPhoto", label: "Author Photo", type: "image" },
        { name: "companyLogo", label: "Company Logo", type: "image" },
        { name: "rating", label: "Star Rating (1\u20135)", type: "number" }
      ]
    },
    ...navFields
  ]
};
var signupFormTemplate = {
  name: "signupForm",
  label: "Signup Form",
  fields: [
    { name: "title", label: "Section Heading", type: "string" },
    { name: "intro", label: "Section Intro", type: "rich-text" },
    // Name field (optional, toggleable)
    { name: "showNameField", label: "Show Name Field", type: "boolean" },
    { name: "nameFieldLabel", label: "Name Field Label", type: "string" },
    // Email field
    { name: "emailFieldLabel", label: "Email Field Label", type: "string" },
    // Submit button
    { name: "submitLabel", label: "Button Label", type: "string" },
    { name: "submitColor", label: "Button Color", type: "string", ui: { component: "color" } },
    {
      name: "submitStyle",
      label: "Button Style",
      type: "string",
      options: [
        { value: "filled", label: "Filled" },
        { value: "outlined", label: "Outlined" }
      ]
    },
    // Success state
    {
      name: "successAction",
      label: "After Submit",
      type: "string",
      options: [
        { value: "message", label: "Show success message" },
        { value: "redirect", label: "Redirect to URL" },
        { value: "both", label: "Message then redirect" }
      ]
    },
    { name: "successMessage", label: "Success Message", type: "string" },
    { name: "redirectUrl", label: "Redirect URL", type: "string" },
    ...navFields
  ]
};
var statsTemplate = {
  name: "stats",
  label: "Stats",
  fields: [
    {
      name: "layout",
      label: "Layout",
      type: "string",
      options: [
        { value: "row", label: "Horizontal Row" },
        { value: "grid", label: "Grid" }
      ]
    },
    {
      name: "columns",
      label: "Columns",
      type: "string",
      options: [
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "auto", label: "Auto" }
      ]
    },
    { name: "title", label: "Section Heading", type: "string" },
    { name: "intro", label: "Section Intro", type: "rich-text" },
    {
      name: "items",
      label: "Stats",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.number ? `${item.number} \u2014 ${item.label || ""}` : "Stat" }) },
      fields: [
        { name: "number", label: "Number (e.g. '500+' or '$99')", type: "string" },
        { name: "label", label: "Label", type: "string" },
        {
          name: "mediaType",
          label: "Icon / Image",
          type: "string",
          options: [
            { value: "none", label: "None" },
            { value: "icon", label: "Icon" },
            { value: "image", label: "Image" }
          ]
        },
        { name: "icon", label: "Icon (name or class)", type: "string" },
        { name: "image", label: "Image", type: "image" }
      ]
    },
    ...navFields
  ]
};
var htmlEmbedTemplate = {
  name: "htmlEmbed",
  label: "HTML Embed",
  fields: [
    { name: "title", label: "Section Heading", type: "string" },
    { name: "intro", label: "Section Intro", type: "rich-text" },
    {
      name: "width",
      label: "Width",
      type: "string",
      options: [
        { value: "full-width", label: "Full width" },
        { value: "contained", label: "Contained / centered" }
      ]
    },
    {
      name: "heightType",
      label: "Height",
      type: "string",
      options: [
        { value: "auto", label: "Auto (content determines height)" },
        { value: "fixed", label: "Fixed (px)" }
      ]
    },
    { name: "heightPx", label: "Fixed Height in px (when Height = Fixed)", type: "number" },
    {
      name: "html",
      label: "Embed Code",
      type: "string",
      ui: { component: "textarea" }
    },
    ...navFields
  ]
};
var contactFormTemplate = {
  name: "contactForm",
  label: "Contact Form",
  fields: [
    { name: "title", label: "Section Heading", type: "string" },
    { name: "intro", label: "Section Intro", type: "rich-text" },
    // ── Name field ──────────────────────────────────────────────────────────
    { name: "showNameField", label: "Show Name Field", type: "boolean" },
    { name: "nameRequired", label: "Name Required", type: "boolean" },
    { name: "nameFieldLabel", label: "Name Field Label", type: "string" },
    // ── Email field ─────────────────────────────────────────────────────────
    { name: "emailFieldLabel", label: "Email Field Label", type: "string" },
    // ── Subject field ───────────────────────────────────────────────────────
    { name: "showSubjectField", label: "Show Subject Field", type: "boolean" },
    { name: "subjectRequired", label: "Subject Required", type: "boolean" },
    { name: "subjectFieldLabel", label: "Subject Field Label", type: "string" },
    {
      name: "subjectType",
      label: "Subject Input Type",
      type: "string",
      options: [
        { value: "text", label: "Free text" },
        { value: "dropdown", label: "Dropdown (editor-defined options)" }
      ]
    },
    {
      name: "subjectOptions",
      label: "Dropdown Options (one per item)",
      type: "object",
      list: true,
      ui: { itemProps: (item) => ({ label: item?.option || "Option" }) },
      fields: [
        { name: "option", label: "Option", type: "string" }
      ]
    },
    // ── Message field ────────────────────────────────────────────────────────
    { name: "messageFieldLabel", label: "Message Field Label", type: "string" },
    // ── Submit button ────────────────────────────────────────────────────────
    { name: "submitLabel", label: "Button Label", type: "string" },
    { name: "submitColor", label: "Button Color", type: "string", ui: { component: "color" } },
    {
      name: "submitStyle",
      label: "Button Style",
      type: "string",
      options: [
        { value: "filled", label: "Filled" },
        { value: "outlined", label: "Outlined" }
      ]
    },
    // ── Success state ────────────────────────────────────────────────────────
    {
      name: "successAction",
      label: "After Submit",
      type: "string",
      options: [
        { value: "message", label: "Show success message" },
        { value: "redirect", label: "Redirect to URL" },
        { value: "both", label: "Message then redirect" }
      ]
    },
    { name: "successMessage", label: "Success Message", type: "string" },
    { name: "redirectUrl", label: "Redirect URL", type: "string" },
    ...navFields
  ]
};
var experimentItemTemplate = {
  name: "experimentItem",
  label: "New Experiment",
  fields: [
    { name: "title", label: "Title", type: "string", required: true },
    { name: "matrixCode", label: "Matrix Code", type: "string", required: true },
    { name: "logo", label: "Square Logo", type: "image" },
    {
      name: "matrixPoints",
      label: "Matrix Points",
      type: "number"
    },
    { name: "description", label: "Description", type: "rich-text" },
    {
      name: "link",
      label: "Link to Site",
      type: "reference",
      collections: ["site"]
    }
  ]
};
var experimentRefTemplate = {
  name: "experimentRef",
  label: "Existing Experiment",
  fields: [
    {
      name: "experimentId",
      label: "Select Experiment",
      type: "reference",
      collections: ["experiment"]
    }
  ]
};
var experimentsTemplate = {
  name: "experiments",
  label: "Experiments",
  fields: [
    { name: "heading", label: "Heading", type: "string" },
    { name: "description", label: "Description", type: "string" },
    {
      name: "experimentsList",
      label: "Experiments (Add 1-100)",
      type: "object",
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || item?.experimentId || "Experiment"
        }),
        max: 100
      },
      templates: [experimentRefTemplate, experimentItemTemplate]
    },
    ...navFields
  ]
};
var config_default = defineConfig({
  branch: "main",
  ...hasTinaCloudCredentials ? {
    clientId: tinaClientId,
    token: tinaToken
  } : isLocalDev ? {
    // Local filesystem datalayer — only when TINA_PUBLIC_IS_LOCAL=true
    contentApiUrlOverride: "http://localhost:4001/graphql"
  } : {},
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "site",
        label: "Site",
        path: "content/sites",
        format: "md",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`
        },
        fields: [
          { name: "title", label: "Site Title", type: "string", required: true },
          { name: "slug", label: "Slug", type: "string" },
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
              experimentsTemplate
            ]
          }
        ]
      },
      {
        name: "homepage",
        label: "Home Page",
        path: "content/pages",
        format: "md",
        ui: {
          router: () => "/",
          allowedActions: { create: false, delete: false }
        },
        fields: [
          { name: "title", label: "Title", type: "string" },
          { name: "subtitle", label: "Subtitle", type: "string" }
        ]
      },
      {
        name: "template",
        label: "Templates",
        path: "content/templates",
        format: "md",
        fields: [
          { name: "name", label: "Template Name", type: "string", required: true },
          { name: "description", label: "Description", type: "string" }
        ]
      },
      {
        name: "experiment",
        label: "Experiments",
        path: "content/experiments",
        format: "md",
        ui: {
          router: ({ document }) => `/experiments/${document._sys.filename}`,
          filename: {
            slugify: (doc) => {
              return doc.matrixCode ? doc.matrixCode.toLowerCase().replace(/[^\w-]/g, "") : "experiment";
            }
          }
        },
        fields: [
          { name: "title", label: "Title", type: "string", required: true },
          { name: "matrixCode", label: "Matrix Code", type: "string", required: true },
          { name: "logo", label: "Square Logo", type: "image" },
          {
            name: "matrixPoints",
            label: "Matrix Points",
            type: "number"
          },
          { name: "description", label: "Description", type: "rich-text" },
          {
            name: "link",
            label: "Link to Site",
            type: "reference",
            collections: ["site"]
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
