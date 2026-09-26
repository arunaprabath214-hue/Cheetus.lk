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
      { title: "Cheetus — Structured Member Registration & Cheetu Management" },
      { name: "description", content: "Premium member registration, KYC document processing, and structured cheetu management support in Sri Lanka. Registered PV 00279330." },
      { property: "og:title", content: "Cheetus — A Structured Member Process for Your Financial Goal" },
      { property: "og:description", content: "Member registration, KYC documentation, and structured cheetu management support in one organized platform." },
    ],
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