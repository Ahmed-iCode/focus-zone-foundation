import { createFileRoute } from "@tanstack/react-router";

import ResetPasswordPage from "@/pages/ResetPassword";

export const Route = createFileRoute("/reset-password")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Reset password — FocusZone" },
      {
        name: "description",
        content: "Choose a new password for your FocusZone account.",
      },
      { property: "og:title", content: "Reset password — FocusZone" },
      {
        property: "og:description",
        content: "Choose a new password for your FocusZone account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});
