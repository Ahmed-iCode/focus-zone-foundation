import { createFileRoute } from "@tanstack/react-router";

import AuthPage from "@/pages/Auth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — FocusZone" },
      {
        name: "description",
        content: "Sign in or create your FocusZone account to organise tasks by focus area.",
      },
      { property: "og:title", content: "Sign in — FocusZone" },
      {
        property: "og:description",
        content: "Sign in or create your FocusZone account to organise tasks by focus area.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});
