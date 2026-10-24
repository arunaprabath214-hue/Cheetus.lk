import { motion } from "framer-motion";
import { Section } from "./Section";
import { useLang } from "@/lib/i18n";

export function Process() {
  const { lang } = useLang();
  const steps = lang === "si"
    ? [
        { n: "01", title: "ඉල්ලීම යොමු කරන්න", text: "වෙබ් අඩවියේ ලියාපදිංචි පෝරමය පුරවා ඔබගේ තොරතුරු එවන්න." },
        { n: "02", title: "තොරතුරු පරීක්ෂා කිරීම", text: "අපගේ කණ්ඩායම ඔබ ලබාදුන් තොරතුරු සහ අවශ්‍යතාවය පරීක්ෂා කරයි." },
        { n: "03", title: "WhatsApp හරහා දැනුම්දීම", text: "ඊළඟ පියවර සහ ගෙවීම් තහවුරු කරන ආකාරය ගැන ඔබට දැනුම් දෙයි." },
        { n: "04", title: "ඉන්වොයිසිය ලබාදීම", text: "ගෙවීම තහවුරු වූ පසු අදාළ ඉන්වොයිසිය නිකුත් කරයි." },
        { n: "05", title: "ලියාපදිංචිය අවසන් කිරීම", text: "අදාළ ක්‍රියාවලිය සහ කොන්දේසි අනුව සාමාජික ලියාපදිංචිය ඉදිරියට ගෙන යයි." },
      ]
    : [
        { n: "01", title: "Send an inquiry", text: "Complete the registration form on the website and submit your details." },
        { n: "02", title: "Review", text: "Our team reviews the information and your requirement." },
        { n: "03", title: "WhatsApp update", text: "We explain the next steps and how payment confirmation works." },
        { n: "04", title: "Invoice", text: "An invoice is issued after payment confirmation." },
        { n: "05", title: "Registration", text: "Member registration proceeds according to the applicable process and terms." },
      ];

  return (
    <Section
      id="process"
      eyebrow={lang === "si" ? "පියවරෙන් පියවර" : "Process"}
      title={lang === "si" ? "ලියාපදිංචි වීමේ ක්‍රියාවලිය" : "Our Registration Process"}
      subtitle={lang === "si" ? "ඉල්ලීම යොමු කළ තැන සිට ඉදිරි පියවර දැනගන්න." : "Know what happens after you submit an inquiry."}
    >
      <div className="relative mx-auto max-w-5xl">
        <div className="absolute left-[27px] top-2 bottom-2 hidden w-px bg-gradient-to-b from-primary/40 via-border to-transparent md:left-1/2 md:block" />
        <ol className="space-y-6 md:space-y-10">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""}`}
            >
              <div className="md:text-right">
                <div className="flex items-start gap-4 md:justify-end">
                  {i % 2 === 0 && <div className="hidden md:block"><Card s={s} /></div>}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-elegant md:hidden">{s.n}</div>
                  <div className="md:hidden"><Card s={s} /></div>
                  {i % 2 === 1 && <div className="hidden md:block"><Card s={s} /></div>}
                </div>
              </div>
              <div className="absolute left-1/2 top-3 hidden -translate-x-1/2 md:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-elegant ring-8 ring-background">{s.n}</div>
              </div>
              <div />
            </motion.li>
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Card({ s }: { s: { title: string; text: string } }) {
  return (
    <div className="inline-block rounded-2xl border border-border bg-card p-6 text-left shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-card">
      <h3 className="text-lg font-semibold text-charcoal">{s.title}</h3>
      <p className="mt-2 max-w-xs text-sm text-muted-foreground">{s.text}</p>
    </div>
  );
}