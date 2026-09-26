import { motion } from "framer-motion";
import { Section } from "./Section";

const steps = [
  { n: "01", title: "Apply", text: "Submit your registration inquiry through the website." },
  { n: "02", title: "Review", text: "Our team reviews your details and requirement." },
  { n: "03", title: "WhatsApp Confirmation", text: "Payment confirmation and further communication are handled via WhatsApp." },
  { n: "04", title: "Invoice Issued", text: "After payment confirmation, an invoice will be issued." },
  { n: "05", title: "Onboarding", text: "You will be onboarded as a registered member according to the applicable process." },
];

export function Process() {
  return (
    <Section id="process" eyebrow="Process" title="Our Simple & Transparent Process" subtitle="Five clear steps from inquiry to onboarding.">
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
              className={`relative md:grid md:grid-cols-2 md:gap-12 ${
                i % 2 === 1 ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="md:text-right">
                <div className="flex items-start gap-4 md:justify-end">
                  {i % 2 === 0 && (
                    <div className="hidden md:block">
                      <Card s={s} />
                    </div>
                  )}
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-elegant md:hidden">
                    {s.n}
                  </div>
                  <div className="md:hidden">
                    <Card s={s} />
                  </div>
                  {i % 2 === 1 && (
                    <div className="hidden md:block">
                      <Card s={s} />
                    </div>
                  )}
                </div>
              </div>

              {/* center marker on md+ */}
              <div className="absolute left-1/2 top-3 hidden -translate-x-1/2 md:block">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-elegant ring-8 ring-background">
                  {s.n}
                </div>
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