import { Check } from "lucide-react";
import { Section } from "./Section";
import { useLang } from "@/lib/i18n";

export function Documents() {
  const { lang } = useLang();
  const docs = lang === "si"
    ? [
        "ජාතික හැඳුනුම්පතේ පිටපත",
        "සම්බන්ධ කරගත හැකි දුරකථන අංකය",
        "නිවසේ ලිපිනය",
        "මාසිකව ගෙවිය හැකි මුදල",
        "ඔබට අවශ්‍ය මුදල",
        "අවශ්‍ය වුවහොත් අත්සන හෝ ප්‍රකාශයක්",
        "KYC පරීක්ෂාවේදී ඉල්ලා සිටින අමතර ලේඛන",
      ]
    : [
        "NIC copy",
        "Contact number",
        "Address details",
        "Monthly payment ability",
        "Required amount goal",
        "Signature or declaration if required",
        "Additional documents requested during KYC review",
      ];

  return (
    <Section
      id="documents"
      eyebrow={lang === "si" ? "ලේඛන සූදානම් කරගන්න" : "Checklist"}
      title={lang === "si" ? "අවශ්‍ය තොරතුරු සහ ලේඛන" : "Required Information and Documents"}
      subtitle={lang === "si" ? "ලියාපදිංචි වීමේදී පහත තොරතුරු සූදානම් කරගන්න." : "Please have the following ready for registration and KYC."}
    >
      <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
        {docs.map((d) => (
          <div key={d} className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
              <Check className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium text-charcoal">{d}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}