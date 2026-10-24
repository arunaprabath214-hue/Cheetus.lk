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
        title: "Cheetus | ශ්‍රී ලාංකීය කර්මාන්ත හා දේශීය ව්‍යාපාර දියුණුව",
      },
      {
        name: "description",
        content:
          "Cheetus Investment Industrial Development (PVT) LTD සමාගමේ අරමුණු, සීට්ටු වැඩසටහන, සාමාජික ලියාපදිංචිය සහ KYC ක්‍රියාවලිය ගැන දැනගන්න. නුගවෙල, මහනුවර.",
      },
      {
        property: "og:title",
        content: "Cheetus | ශ්‍රී ලාංකීය කර්මාන්ත හා දේශීය ව්‍යාපාර දියුණුව",
      },
      {
        property: "og:description",
        content:
          "චීට්ටු වැඩසටහන සහ ශ්‍රී ලාංකීය කර්මාන්ත හා දේශීය ව්‍යාපාර දියුණුව සඳහා Cheetus සමාගමේ අරමුණු ගැන දැනගන්න.",
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