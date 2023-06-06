import { defineConfig } from "tinacms";
import { blog_postFields } from "./templates";
import { faqFields } from "./templates";
import { homeFields } from "./templates";
import { pageFields } from "./templates";
import { stalk_marketFields } from "./templates";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: "2886e608-977e-473c-ab7c-b60468d5903e", // Get this from tina.io
  token: "2ae1051f03eba96f2dc22163be816ae801ad7e63", // Get this from tina.io
  client: { skip: true },
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        format: "md",
        label: "Posts",
        name: "blog_post",
        path: "src/content/posts",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...blog_postFields(),
        ],
      },
      {
        format: "md",
        label: "Pages",
        name: "page",
        path: "src/content/pages",
        match: {
          include: "**/*",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          ...pageFields(),
        ],
      },
      {
        format: "md",
        label: "Home",
        name: "home",
        path: "src/content",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "home",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
        ],
      },
      {
        format: "md",
        label: "FAQ",
        name: "faq",
        path: "src/content",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "faq",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: "string",
            name: "path",
            label: "Path",
            required: true,
          },
          {
            type: "object",
            name: "faq",
            label: "FAQ",
            list: true,
            fields: [
              {
                type: "string",
                name: "question",
                label: "Question",
              },
              {
                type: "string",
                name: "answer",
                label: "Answer",
                ui: {
                  component: "textarea",
                },
              },
            ],
          },
        ],
      },
      {
        format: "md",
        label: "Stalk Market",
        name: "stalk_market",
        path: "src/content",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "stalk-market",
        },
        fields: [
          {
            type: "rich-text",
            name: "body",
            label: "Body of Document",
            description: "This is the markdown body",
            isBody: true,
          },
          {
            type: "string",
            name: "path",
            label: "Path",
          },
          {
            type: "string",
            name: "title",
            label: "Title",
          },
          {
            type: "object",
            name: "weekly_turnip_price_records",
            label: "Weekly Turnip Price Records",
            list: true,
            fields: [
              {
                type: "datetime",
                name: "week_starting",
                label: "Week Starting",
                required: true,
              },
              {
                type: "number",
                name: "purchase_price",
                label: "Purchase Price (Sunday)",
              },
              {
                type: "object",
                name: "turnip_prices",
                label: "Turnip Prices",
                list: true,
                fields: [
                  {
                    type: "string",
                    name: "day",
                    label: "Day",
                    options: [
                      "Monday AM",
                      "Monday PM",
                      "Tuesday AM",
                      "Tuesday PM",
                      "Wednesday AM",
                      "Wednesday PM",
                      "Thursday AM",
                      "Thursday PM",
                      "Friday AM",
                      "Friday PM",
                      "Saturday AM",
                      "Saturday PM",
                      "Unknown",
                    ],
                    required: true,
                  },
                  {
                    type: "number",
                    name: "price",
                    label: "Price",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        format: "json",
        label: "Scripts",
        name: "scripts",
        path: "/",
        ui: {
          allowedActions: {
            create: false,
            delete: false,
          },
        },
        match: {
          include: "package",
        },
        fields: [
          {
            name: "dummy",
            label: "Dummy field",
            type: "string",
            description:
              "This is a dummy field, please replace it with the fields you want to edit. See https://tina.io/docs/schema/ for more info",
          },
        ],
      },
    ],
  },
});
