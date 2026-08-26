import { createFileRoute } from "@tanstack/react-router";

import Dashboard from "@/pages/Dashboard";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Your FocusZone" },
      {
        name: "description",
        content: "Your signed-in FocusZone home.",
      },
      { property: "og:title", content: "Your FocusZone" },
      { property: "og:description", content: "Your signed-in FocusZone home." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});
