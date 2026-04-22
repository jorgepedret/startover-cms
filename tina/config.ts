import { defineConfig } from "tinacms";

export default defineConfig({
  branch: "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  build: {
    outputDir: "admin",
    publicDir: "public",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      rootPath: "/content",
    },
  },
  schema: {
    collections: [
      {
        label: "Sites",
        name: "sites",
        path: "content/sites",
        format: "mdx",
        ui: {
          router: ({ document }) => {
            return `/sites/${document._sys.filename}`;
          },
        },
        fields: [
          {
            type: "object",
            list: true,
            name: "blocks",
            label: "Page Blocks",
            ui: {
              itemProps: (item) => ({ label: item?.type || "Block" }),
              previewSrc: "",
            },
            fields: [
              {
                type: "string",
                name: "type",
                label: "Block Type",
                options: [
                  { label: "Header", value: "header" },
                  { label: "Hero", value: "hero" },
                  { label: "Text", value: "text" },
                  { label: "Grid", value: "grid" },
                  { label: "Gallery", value: "gallery" },
                  { label: "Alternate", value: "alternate" },
                  { label: "Video", value: "video" },
                  { label: "CTA", value: "cta" },
                ],
              },
              {
                type: "string",
                name: "title",
                label: "Title",
              },
              {
                type: "string",
                name: "subtitle",
                label: "Subtitle",
              },
              {
                type: "rich-text",
                name: "content",
                label: "Content",
              },
              {
                type: "image",
                name: "image",
                label: "Image",
              },
              {
                type: "string",
                name: "bgColor",
                label: "Background Color",
                ui: {
                  component: "color",
                },
              },
              {
                type: "object",
                list: true,
                name: "items",
                label: "Items",
                fields: [
                  {
                    type: "string",
                    name: "title",
                    label: "Title",
                  },
                  {
                    type: "string",
                    name: "desc",
                    label: "Description",
                  },
                  {
                    type: "image",
                    name: "image",
                    label: "Image",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
});
