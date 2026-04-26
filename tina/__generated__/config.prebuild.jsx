// tina/config.tsx
import React from "react";
import { defineConfig } from "tinacms";
import { jsx, jsxs } from "react/jsx-runtime";
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
var heroTemplate = {
  name: "hero",
  label: "Hero",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "subtitle", label: "Subtitle", type: "string" },
    { name: "image", label: "Background Image", type: "image" },
    ...navFields
  ]
};
var textSectionTemplate = {
  name: "textSection",
  label: "Text Section",
  fields: [
    { name: "title", label: "Heading", type: "string" },
    { name: "body", label: "Body", type: "rich-text" },
    ...navFields
  ]
};
var galleryTemplate = {
  name: "gallery",
  label: "Gallery",
  fields: [
    { name: "title", label: "Title", type: "string" },
    {
      name: "images",
      label: "Images",
      type: "object",
      list: true,
      fields: [
        { name: "src", label: "Image", type: "image" },
        { name: "alt", label: "Alt Text", type: "string" }
      ]
    },
    ...navFields
  ]
};
var bigMediaTemplate = {
  name: "bigMedia",
  label: "Big Media",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "image", label: "Image", type: "image" },
    {
      name: "layout",
      label: "Layout",
      type: "string",
      options: ["left", "right", "center"]
    },
    ...navFields
  ]
};
var fullWidthImageTemplate = {
  name: "fullWidthImage",
  label: "Full Width Image + Text",
  fields: [
    { name: "title", label: "Overlay Text", type: "string" },
    { name: "image", label: "Image", type: "image" },
    ...navFields
  ]
};
var videoBlockTemplate = {
  name: "videoBlock",
  label: "Video",
  fields: [
    { name: "title", label: "Title", type: "string" },
    { name: "videoUrl", label: "Video URL (YouTube/Vimeo)", type: "string" },
    ...navFields
  ]
};
var config_default = defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
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
        label: "Sites",
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
              galleryTemplate,
              bigMediaTemplate,
              fullWidthImageTemplate,
              videoBlockTemplate
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
      }
    ]
  }
});
export {
  config_default as default
};
