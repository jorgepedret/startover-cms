import React from "react";
import { defineConfig } from "tinacms";

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

// Shared nav fields added to every block (appended after main fields)
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

const heroTemplate = {
  name: "hero",
  label: "Hero",
  fields: [
    { name: "title", label: "Title", type: "string" as const },
    { name: "subtitle", label: "Subtitle", type: "string" as const },
    { name: "image", label: "Background Image", type: "image" as const },
    ...navFields,
  ],
};

const textSectionTemplate = {
  name: "textSection",
  label: "Text Section",
  fields: [
    { name: "title", label: "Heading", type: "string" as const },
    { name: "body", label: "Body", type: "rich-text" as const },
    ...navFields,
  ],
};

const galleryTemplate = {
  name: "gallery",
  label: "Gallery",
  fields: [
    { name: "title", label: "Title", type: "string" as const },
    {
      name: "images",
      label: "Images",
      type: "object" as const,
      list: true,
      fields: [
        { name: "src", label: "Image", type: "image" as const },
        { name: "alt", label: "Alt Text", type: "string" as const },
      ],
    },
    ...navFields,
  ],
};

const bigMediaTemplate = {
  name: "bigMedia",
  label: "Big Media",
  fields: [
    { name: "title", label: "Title", type: "string" as const },
    { name: "image", label: "Image", type: "image" as const },
    {
      name: "layout",
      label: "Layout",
      type: "string" as const,
      options: ["left", "right", "center"],
    },
    ...navFields,
  ],
};

const fullWidthImageTemplate = {
  name: "fullWidthImage",
  label: "Full Width Image + Text",
  fields: [
    { name: "title", label: "Overlay Text", type: "string" as const },
    { name: "image", label: "Image", type: "image" as const },
    ...navFields,
  ],
};

const videoBlockTemplate = {
  name: "videoBlock",
  label: "Video",
  fields: [
    { name: "title", label: "Title", type: "string" as const },
    { name: "videoUrl", label: "Video URL (YouTube/Vimeo)", type: "string" as const },
    ...navFields,
  ],
};

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
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
        label: "Sites",
        path: "content/sites",
        format: "md",
        ui: {
          router: ({ document }) => `/${document._sys.filename}`,
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
              videoBlockTemplate,
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
          { name: "title", label: "Title", type: "string" as const },
          { name: "subtitle", label: "Subtitle", type: "string" as const },
        ],
      },
      {
        name: "template",
        label: "Templates",
        path: "content/templates",
        format: "md",
        fields: [
          { name: "name", label: "Template Name", type: "string", required: true },
          { name: "description", label: "Description", type: "string" },
        ],
      },
    ],
  },
});
