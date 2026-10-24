import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function Notice() {
  const { lang } = useLang();
  return (
    <section id="notice" className="relative py-20 md:py-28">
      <div className="container-tight">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-charcoal p-8 text-primary-foreground shadow-elegant md:p-14"
          style={{ backgroundColor: "var(--charcoal)" }}
        >
          <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-gradient-glow opacity-50" aria-hidden />
          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium tracking-wide text-primary-glow">
              <ShieldAlert className="h-3.5 w-3.5" />
              {lang === "si" ? "වැදගත් දැනුම්දීමක්" : "Important Notice"}
            </div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              {lang === "si" ? "ලියාපදිංචි වීමට පෙර මේ කරුණු කියවන්න." : "Please read this before registering."}
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">
              {lang === "si"
                ? "Cheetus Investment Industrial Development (PVT) LTD යනු බැංකුවක්, මූල්‍ය සමාගමක්, ණය දෙන ආයතනයක් හෝ තැන්පතු භාරගන්නා ආයතනයක් නොවේ. අපගේ සේවාවන්ට සාමාජික ලියාපදිංචිය, ලේඛන පරීක්ෂාව, KYC ක්‍රියාවලිය සහ චීට්ටු වැඩසටහනට අදාළ පරිපාලන සහාය ඇතුළත් වේ. ලියාපදිංචිය හෝ විමසීමක් කිරීමෙන් සීට්ටු කණ්ඩායමකට ඇතුළත් වීමක් හෝ මූල්‍ය ප්‍රතිඵලයක් සහතික නොවේ. අදාළ නියමයන් සහ නීතිමය අවශ්‍යතා ක්‍රියාත්මක වේ."
                : "Cheetus Investment Industrial Development (PVT) LTD is not a bank, finance company, loan provider, or deposit-taking institution. Services include member registration, document checks, KYC, and administrative support for the cheetu programme. Registration or inquiry does not guarantee participation in a cheetu group or any financial outcome. Applicable terms and legal requirements apply."}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}