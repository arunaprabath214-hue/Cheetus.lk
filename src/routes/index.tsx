import { createFileRoute } from "@tanstack/react-router";
import { ApplyProvider } from "@/components/site/ApplyContext";
import { ApplyModal } from "@/components/site/ApplyModal";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { TrustCards } from "@/components/site/TrustCards";
import { About } from "@/components/site/About";
import { Process } from "@/components/site/Process";
import { Membership } from "@/components/site/Membership";
import { Documents } from "@/components/site/Documents";
import { Fee } from "@/components/site/Fee";
import { Notice } from "@/components/site/Notice";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { LanguageProvider } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Cheetus | සීට්ටු සාමාජික ලියාපදිංචිය සහ කළමනාකරණ සහාය",
      },
      {
        name: "description",
        content:
          "ශ්‍රී ලංකාවේ සීට්ටු සාමාජික ලියාපදිංචිය, KYC ලේඛන ක්‍රියාවලිය සහ සාමාජික සහාය පිළිබඳ විස්තර දැනගන්න. Cheetus, Nugawela, Kandy.",
      },
      {
        property: "og:title",
        content: "Cheetus | සීට්ටු සාමාජික ලියාපදිංචිය සහ කළමනාකරණ සහාය",
      },
      {
        property: "og:description",
        content:
          "ශ්‍රී ලංකාවේ සීට්ටු සාමාජික ලියාපදිංචිය සහ KYC ලේඛන ක්‍රියාවලිය පිළිබඳ විස්තර දැනගන්න.",
      },
    ],
    links: [{ rel: "canonical", href: "https://cheetus.lk/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <LanguageProvider>
      <ApplyProvider>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <Hero />
            <TrustCards />
            <About />
            <Process />
            <Membership />
            <Documents />
            <Fee />
            <Notice />
            <Contact />
          </main>
          <Footer />
          <ApplyModal />
          <WhatsAppFab />
        </div>
      </ApplyProvider>
    </LanguageProvider>
  );
}