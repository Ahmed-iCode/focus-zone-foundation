import { createFileRoute } from "@tanstack/react-router";

import ForgotPasswordPage from "@/pages/ForgotPassword";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — FocusZone" },
      {
        name: "description",
        content: "Request a secure link to reset your FocusZone account password.",
      },
      { property: "og:title", content: "Forgot password — FocusZone" },
      {
        property: "og:description",
        content: "Request a secure link to reset your FocusZone account password.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});
