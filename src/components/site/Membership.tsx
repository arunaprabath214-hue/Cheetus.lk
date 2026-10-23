import { ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { useApply } from "./ApplyContext";
import { useLang } from "@/lib/i18n";

export function Membership() {
  const { setOpen } = useApply();
  const { lang } = useLang();
  return (
    <Section
      id="membership"
      eyebrow={lang === "si" ? "සාමාජිකත්වය" : "Membership"}
      title={lang === "si" ? "ලියාපදිංචි වීමට කැමතිද?" : "Interested in Registering?"}
      subtitle={lang === "si" ? "ඔබගේ තොරතුරු එවන්න. ඊළඟ පියවර ගැන අපගේ කණ්ඩායම ඔබට දැනුම් දෙයි." : "Send your details and our team will explain the next steps."}
    >
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-glow opacity-70" aria-hidden />
        <div className="relative">
          <p className="text-base leading-relaxed text-charcoal-soft md:text-lg">
            {lang === "si"
              ? "පෝරමය හරහා ඔබගේ මූලික තොරතුරු, මාසිකව ගෙවිය හැකි මුදල සහ අවශ්‍ය මුදල සඳහන් කළ හැකියි. තොරතුරු පරීක්ෂා කිරීමෙන් පසු අපගේ කණ්ඩායම WhatsApp හරහා ඔබව සම්බන්ධ කරගනී."
              : "Use the form to share your basic details, monthly payment ability, and required amount. After reviewing the information, our team will contact you through WhatsApp."}
          </p>
          <button
            onClick={() => setOpen(true)}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform duration-300 hover:scale-[1.03]"
          >
            {lang === "si" ? "ලියාපදිංචි පෝරමය විවෘත කරන්න" : "Open Registration Form"}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </Section>
  );
}