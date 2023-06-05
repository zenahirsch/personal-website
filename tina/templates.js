export function blog_postFields() {
  return [
    {
      type: "string",
      name: "slug",
      label: "Slug",
      required: true,
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "summary",
      label: "Summary",
    },
    {
      type: "boolean",
      name: "published",
      label: "Published",
    },
  ];
}
export function faqFields() {
  return [
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
  ];
}
export function homeFields() {
  return [];
}
export function pageFields() {
  return [
    {
      type: "string",
      name: "path",
      label: "Path",
      required: true,
    },
    {
      type: "string",
      name: "title",
      label: "Title",
    },
  ];
}
export function stalk_marketFields() {
  return [
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
  ];
}
