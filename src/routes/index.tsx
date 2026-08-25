import { createFileRoute } from "@tanstack/react-router";

import Home from "@/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FocusZone — Focused task areas" },
      {
        name: "description",
        content:
          "FocusZone helps you group tasks into focus areas and work on one thing at a time.",
      },
      { property: "og:title", content: "FocusZone — Focused task areas" },
      {
        property: "og:description",
        content:
          "FocusZone helps you group tasks into focus areas and work on one thing at a time.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});
