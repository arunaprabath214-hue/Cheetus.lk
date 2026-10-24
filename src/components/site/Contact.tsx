import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Section } from "./Section";
import { SITE } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function Contact() {
  const wa = `https://wa.me/${SITE.whatsapp}`;
  const { lang } = useLang();
  return (
    <Section
      id="contact"
      eyebrow={lang === "si" ? "අප හා සම්බන්ධ වන්න" : "Contact"}
      title={lang === "si" ? "ඔබට අපෙන් විමසන්න දෙයක් තියෙනවාද?" : "Have a Question?"}
      subtitle={lang === "si" ? "අපගේ සේවා සහ ලියාපදිංචි ක්‍රියාවලිය ගැන දැනගන්න අප හා සම්බන්ධ වන්න." : "Contact us to learn about our services and registration process."}
    >
      <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
        <ContactCard icon={MapPin} title={lang === "si" ? "අප සිටින තැන" : "Visit Us"} lines={[SITE.company, lang === "si" ? "නුගවෙල, මහනුවර, ශ්‍රී ලංකාව" : SITE.location]} />
        <ContactCard icon={Phone} title={lang === "si" ? "දුරකථනය / WhatsApp" : "Call / WhatsApp"} lines={[SITE.phone]} href={`tel:${SITE.phone}`} />
        <ContactCard icon={Mail} title={lang === "si" ? "විද්‍යුත් තැපෑල" : "Email"} lines={[SITE.email]} href={`mailto:${SITE.email}`} />
      </div>
      <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-5 rounded-3xl border border-border bg-card p-6 shadow-soft md:flex-row md:p-8">
        <div className="text-center md:text-left">
          <p className="text-sm font-semibold text-charcoal">{lang === "si" ? "ඉක්මන් පිළිතුරක් අවශ්‍යද?" : "Need a quick answer?"}</p>
          <p className="mt-1 text-sm text-muted-foreground">{lang === "si" ? "WhatsApp හරහා අපගේ කණ්ඩායමට පණිවිඩයක් එවන්න." : "Send our team a message on WhatsApp."}</p>
        </div>
        <a href={wa} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform hover:scale-[1.03]">
          <MessageCircle className="h-4 w-4" />
          {lang === "si" ? "WhatsApp පණිවිඩයක් යවන්න" : "Message us on WhatsApp"}
        </a>
      </div>
    </Section>
  );
}

function ContactCard({ icon: Icon, title, lines, href }: { icon: typeof Mail; title: string; lines: string[]; href?: string }) {
  const inner = (
    <div className="group h-full rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-card">
      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-base font-semibold text-charcoal">{title}</h3>
      <div className="mt-2 space-y-1">
        {lines.map((line) => <p key={line} className="text-sm text-muted-foreground">{line}</p>)}
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}