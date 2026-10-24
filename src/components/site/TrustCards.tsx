import { motion } from "framer-motion";
import { BadgeCheck, FileCheck2, FileText, HeadphonesIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";

export function TrustCards() {
  const { lang } = useLang();
  const items = [
    {
      icon: BadgeCheck,
      title: lang === "si" ? "ලියාපදිංචි සමාගමක්" : "Registered Company",
      text: lang === "si" ? "ශ්‍රී ලංකාවේ ලියාපදිංචි සමාගමක්. PV 00279330." : "Incorporated in Sri Lanka. PV 00279330.",
    },
    {
      icon: FileCheck2,
      title: lang === "si" ? "විධිමත් ලේඛන ක්‍රියාවලිය" : "Documented Process",
      text: lang === "si" ? "සාමාජික තොරතුරු සහ අවශ්‍ය ලේඛන පියවරෙන් පියවර පරීක්ෂා කරයි." : "Member details and required documents are reviewed through a clear process.",
    },
    {
      icon: FileText,
      title: lang === "si" ? "ගෙවීම් පිළිබඳ පැහැදිලි බව" : "Clear Payment Information",
      text: lang === "si" ? "ගෙවීම් තහවුරු කිරීම සහ ඉන්වොයිස් පිළිබඳ තොරතුරු පැහැදිලිව ලබාදෙයි." : "Payment confirmation and invoice information are communicated clearly.",
    },
    {
      icon: HeadphonesIcon,
      title: lang === "si" ? "සම්බන්ධතා සහාය" : "Member Support",
      text: lang === "si" ? "දුරකථනයෙන්, WhatsApp හෝ විද්‍යුත් තැපෑලෙන් අප හා සම්බන්ධ විය හැකියි." : "Reach our team by phone, WhatsApp, or email.",
    },
  ];

  return (
    <section className="relative -mt-6 pb-4 md:pb-8">
      <div className="container-tight">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
                <it.icon className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-charcoal">{it.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}