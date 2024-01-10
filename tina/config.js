import { defineConfig } from "tinacms"

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "master"

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId:
    process.env.NEXT_PUBLIC_TINA_CLIENT_ID ||
    "04406a99-90c5-4c0c-85c7-876cd25b0946",
  // Get this from tina.io
  token: process.env.TINA_TOKEN || "3f9ad21bd287c606ae6d3f2e293b985d40f768c6",

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "src/content/blog",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            label: "Author",
            name: "author",
            type: "reference",
            collections: ["authors"], // points to a collection with the name "author"
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Publication Date",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "authors",
        label: "Authors",
        path: "src/content/authors",
        fields: [
          {
            type: "string",
            name: "name",
            label: "Name",
            required: true,
          },
          {
            type: "image",
            name: "avatar",
            label: "Image",
            required: true,
          },
        ],
      },
    ],
  },
})
