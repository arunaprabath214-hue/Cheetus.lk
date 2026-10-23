import { Info } from "lucide-react";
import { Section } from "./Section";
import { useLang } from "@/lib/i18n";

export function Fee() {
  const { lang } = useLang();
  return (
    <Section
      eyebrow={lang === "si" ? "ගාස්තු" : "Fee"}
      title={lang === "si" ? "ලියාපදිංචි සහ ලේඛන සැකසීමේ ගාස්තුව" : "Registration and Document Processing Fee"}
    >
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-12">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <p className="text-base text-charcoal-soft md:text-lg">
              {lang === "si" ? "ලියාපදිංචිය සහ KYC ලේඛන සැකසීම සඳහා එක් වරක් අය කළ හැකි ගාස්තුව:" : "One-time fee that may apply for registration and KYC document processing:"}
            </p>
            <div className="text-3xl font-semibold text-gradient-primary md:text-4xl">රු. 1,000</div>
          </div>
          <p className="mt-4 text-base text-charcoal-soft md:text-lg">
            {lang === "si"
              ? "මෙම ගාස්තුව ලියාපදිංචි කටයුතු, ලේඛන සැකසීම සහ පරිපාලන සහාය සඳහා පමණයි."
              : "This fee covers registration handling, document processing, and administrative support only."}
          </p>
          <div className="mt-8 flex items-start gap-3 rounded-2xl border border-border bg-secondary/60 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-charcoal-soft">
              <span className="font-semibold text-charcoal">{lang === "si" ? "වැදගත්:" : "Important:"}</span>{" "}
              {lang === "si"
                ? "මෙය ආයෝජනයක්, තැන්පතුවක් හෝ සීට්ටු වාරිකයක් නොවේ. මෙම ගාස්තුව ගෙවීමෙන් සීට්ටු කණ්ඩායමකට ඇතුළත් වීම සහතික නොවේ."
                : "This is not an investment, deposit, or cheetu instalment. Paying this fee does not guarantee participation in a cheetu group."}
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}