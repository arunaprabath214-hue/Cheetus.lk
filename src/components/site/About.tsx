import { Section } from "./Section";
import { useLang } from "@/lib/i18n";

export function About() {
  const { lang } = useLang();
  return (
    <Section
      id="about"
      eyebrow={lang === "si" ? "අප ගැන" : "About"}
      title={lang === "si" ? "චීටස් ගැන" : "About Cheetus"}
      subtitle={lang === "si"
        ? "චීට්ටු වැඩසටහන ක්‍රියාත්මක කරන අතරම, දේශීය ව්‍යාපාර හා කර්මාන්ත දියුණුවටත් දායක වීම අපේ අරමුණයි."
        : "Alongside our cheetu programme, we aim to contribute to the growth of local businesses and industries."}
    >
      <div className="mx-auto max-w-4xl rounded-3xl border border-border bg-card p-8 shadow-soft md:p-12">
        <p className="text-base leading-relaxed text-charcoal-soft md:text-lg">
          {lang === "si"
            ? "Cheetus Investment Industrial Development (PVT) LTD ශ්‍රී ලංකාවේ ලියාපදිංචි සමාගමක්. අපි දැනට සාමාජික ලියාපදිංචිය, අවශ්‍ය ලේඛන පරීක්ෂා කිරීම සහ චීට්ටු වැඩසටහනට අදාළ පරිපාලන කටයුතු කරගෙන යනවා. ඒ සමඟම, ශ්‍රී ලාංකීය කර්මාන්ත හා දේශීය ව්‍යාපාර දියුණු වීමට දායක විය හැකි අවස්ථා සොයා බැලීමත් අපේ අරමුණක්."
            : "Cheetus Investment Industrial Development (PVT) LTD is a registered Sri Lankan company. We currently handle member registration, document checks, and administration related to our cheetu programme. We also aim to identify ways to contribute to the development of Sri Lankan industries and local businesses."}
        </p>
        <p className="mt-5 text-base leading-relaxed text-charcoal-soft md:text-lg">
          {lang === "si"
            ? "අපි කරන සේවාවන් සහ ක්‍රියාත්මක ව්‍යාපෘති ගැන පැහැදිලි තොරතුරු ලබාදීම අපේ ප්‍රමුඛතාවක්. තහවුරු කළ තොරතුරු පමණක් අපගේ වෙබ් අඩවියේ පළ කරනවා."
            : "We prioritise clear information about our services and projects, and publish only details that can be verified."}
        </p>
      </div>
    </Section>
  );
}