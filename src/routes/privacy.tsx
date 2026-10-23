import { createFileRoute } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/i18n";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { LegalPage } from "./terms";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Cheetus | පෞද්ගලිකත්ව නිවේදනය" },
      {
        name: "description",
        content:
          "Cheetus වෙබ් අඩවිය හරහා ලබාදෙන පුද්ගලික තොරතුරු සහ KYC ලේඛන එකතු කිරීම, භාවිතය සහ ආරක්ෂාව පිළිබඳ දැනුම්දීම.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cheetus.lk/privacy" }],
  }),
  component: () => (
    <LanguageProvider>
      <LegalPage kind="privacy" />
      <WhatsAppFab />
    </LanguageProvider>
  ),
});