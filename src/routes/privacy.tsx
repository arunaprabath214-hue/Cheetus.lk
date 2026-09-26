import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { LegalPage } from "./terms";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Notice — Cheetus" },
      { name: "description", content: "How Cheetus collects, uses, and protects member information and KYC documents." },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <LegalPage kind="privacy" />
      <WhatsAppFab />
    </LanguageProvider>
  ),
});