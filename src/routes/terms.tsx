import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { LanguageProvider, useLang } from "@/lib/i18n";
import { Logo } from "@/components/site/Logo";
import { LangToggle } from "@/components/site/LangToggle";
import { WhatsAppFab } from "@/components/site/WhatsAppFab";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Cheetus" },
      { name: "description", content: "Terms and conditions for Cheetus member registration and structured cheetu management support." },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <LegalPage kind="terms" />
      <WhatsAppFab />
    </LanguageProvider>
  ),
});

function LegalPage({ kind }: { kind: "terms" | "privacy" }) {
  const { lang } = useLang();
  return (
    <div className="min-h-screen bg-background">
      <LegalHeader />
      <main className="container-tight py-28">
        <h1 className="text-4xl font-semibold text-charcoal sm:text-5xl">
          {kind === "terms"
            ? lang === "si" ? "නියමයන් සහ කොන්දේසි" : "Terms & Conditions"
            : lang === "si" ? "පෞද්ගලිකත්ව නිවේදනය" : "Privacy Notice"}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">{SITE.company} · {SITE.pv}</p>
        <div className="prose mt-10 max-w-3xl text-sm leading-relaxed text-charcoal-soft">
          {kind === "terms" ? <TermsBody lang={lang} /> : <PrivacyBody lang={lang} />}
        </div>
        <div className="mt-12">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-charcoal hover:border-primary/40">
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export { LegalPage };

function LegalHeader() {
  const [scrolled] = useState(false);
  return (
    <header className={`fixed inset-x-0 top-0 z-40 glass shadow-soft ${scrolled ? "" : ""}`}>
      <div className="container-tight flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="flex items-center gap-3">
          <Logo className="h-10 w-10 md:h-12 md:w-12" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-charcoal md:text-base">{SITE.shortName}</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:block">{SITE.pv}</span>
          </div>
        </Link>
        <LangToggle />
      </div>
    </header>
  );
}

function TermsBody({ lang }: { lang: "si" | "en" }) {
  if (lang === "si") {
    return (
      <div className="space-y-5">
        <Section heading="1. සේවා පරාසය">{SITE.company} විසින් සපයන සේවාවන්: සාමාජික ලියාපදිංචිය, KYC සහ ලේඛන ක්‍රියාවලිය, විධිමත් සීට්ටු කණ්ඩායම් කළමනාකරණ සහාය.</Section>
        <Section heading="2. බැංකුවක් හෝ මූල්‍ය සමාගමක් නොවේ">අපි බැංකුවක්, මූල්‍ය සමාගමක්, ණය සපයන්නෙක්, තැන්පත් භාරගන්නා ආයතනයක් හෝ ආයෝජන ප්‍රතිලාභ සපයන්නෙක් නොවේ.</Section>
        <Section heading="3. ලියාපදිංචියෙන් ප්‍රතිඵලයක් අත් වෙන බව guarantee නොවේ">ලියාපදිංචියෙන් කිසිදු සීට්ටු කණ්ඩායමකට ඇතුළත් වීම හෝ මූල්‍ය ප්‍රතිඵලයක් guarantee නොවේ.</Section>
        <Section heading="4. Rs.1,000/= ගාස්තුව">මෙය ලියාපදිංචි, KYC, ලේඛන සැකසීම සහ පරිපාලන කටයුතු සඳහා පමණයි.</Section>
        <Section heading="5. ගෙවීම් තහවුරු කිරීම">ගෙවීම් WhatsApp හරහා තහවුරු කරනු ලැබේ. ඉන්පසු invoice එකක් නිකුත් කරනු ලැබේ.</Section>
        <Section heading="6. KYC සහ ලේඛන සත්‍යාපනය">සියලුම ලේඛන සමාලෝචනය කිරීමට අපට අයිතියක් ඇත.</Section>
        <Section heading="7. තොරතුරුවල නිවැරදිභාවය">ඔබ ලබාදෙන තොරතුරු සත්‍ය විය යුතුය.</Section>
        <Section heading="8. නියමයන් යාවත්කාලීන කිරීම">මෙම නියමයන් කලින් කලට යාවත්කාලීන විය හැක.</Section>
        <Section heading="9. සම්බන්ධතා">{SITE.email} · {SITE.phone} · {SITE.location}</Section>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <Section heading="1. Service Scope">{SITE.company} provides member registration, KYC and document processing, and structured cheetu group management support.</Section>
      <Section heading="2. Not a Bank or Finance Company">We are not a bank, finance company, loan provider, deposit-taking institution, or investment return provider.</Section>
      <Section heading="3. No Guarantee of Outcome">Registration does not guarantee approval, participation in any cheetu group, or any financial outcome.</Section>
      <Section heading="4. Rs.1,000 Fee">The one-time fee is for registration, KYC, document processing, and administration only.</Section>
      <Section heading="5. Payment Confirmation">Payment is confirmed via WhatsApp, after which an invoice is issued.</Section>
      <Section heading="6. KYC and Document Verification">We reserve the right to review and verify all documents submitted.</Section>
      <Section heading="7. Member Grouping">Placement into any member group is subject to internal review.</Section>
      <Section heading="8. Accuracy of Information">You confirm the information provided is true and accurate.</Section>
      <Section heading="9. Updates to Terms">These terms may be updated from time to time.</Section>
      <Section heading="10. Contact">{SITE.email} · {SITE.phone} · {SITE.location}</Section>
    </div>
  );
}

function PrivacyBody({ lang }: { lang: "si" | "en" }) {
  if (lang === "si") {
    return (
      <div className="space-y-5">
        <Section heading="1. රැස්කරන තොරතුරු">නම, NIC, දුරකථන, email, ලිපිනය, ගෙවීමේ හැකියාව, අවශ්‍ය මුදල් ඉලක්කය සහ KYC ලේඛන.</Section>
        <Section heading="2. තොරතුරු එකතු කරන හේතුව">ලියාපදිංචි කිරීම, KYC සත්‍යාපනය, විධිමත් සීට්ටු කළමනාකරණය සහ සාමාජික සහාය සඳහා.</Section>
        <Section heading="3. KYC ලේඛන භාවිතය">අධිකාරිය ලත් සමාගමේ සමාලෝචන සඳහා පමණි. පොදු ප්‍රවේශය ලබා නොදේ.</Section>
        <Section heading="4. ලේඛන ගබඩා කිරීම">ලේඛන secure private storage එකේ තබා ගනු ලැබේ.</Section>
        <Section heading="5. සම්බන්ධතා නාලිකා">{SITE.email} · {SITE.phone}</Section>
        <Section heading="6. පරිශීලක එකඟතාව">තොරතුරු ලබාදීමෙන් ඔබ මෙම පෞද්ගලිකත්ව නියමයන්ට එකඟ වේ.</Section>
        <Section heading="7. දත්ත ප්‍රවේශය">අවසරය ඇති සමාගමේ සමාලෝචන කණ්ඩායමට පමණි.</Section>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      <Section heading="1. Information Collected">Name, NIC, phone, email, address, payment ability, required amount goal, and KYC documents.</Section>
      <Section heading="2. Why It's Collected">For registration, KYC verification, structured cheetu management, and member support.</Section>
      <Section heading="3. How KYC Documents Are Used">Used solely for authorized internal company review. Not exposed publicly.</Section>
      <Section heading="4. Document Storage">Documents are stored in secure private storage with restricted access.</Section>
      <Section heading="5. Contact Channels">{SITE.email} · {SITE.phone}</Section>
      <Section heading="6. User Consent">By submitting your information you consent to this Privacy Notice.</Section>
      <Section heading="7. Data Access">Limited to authorized company review personnel only.</Section>
    </div>
  );
}

function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-1 text-base font-semibold text-charcoal">{heading}</h2>
      <p>{children}</p>
    </section>
  );
}