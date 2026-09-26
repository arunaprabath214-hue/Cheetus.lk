import { motion } from "framer-motion";
import { BadgeCheck, FileCheck2, FileText, HeadphonesIcon } from "lucide-react";

const items = [
  {
    icon: BadgeCheck,
    title: "Registered Company",
    text: "Incorporated in Sri Lanka. PV 00279330.",
  },
  {
    icon: FileCheck2,
    title: "KYC Verified Process",
    text: "Member identity and basic details are collected through a documented process.",
  },
  {
    icon: FileText,
    title: "Transparent Documentation",
    text: "Registration records, payment confirmation, and invoices are handled with clarity.",
  },
  {
    icon: HeadphonesIcon,
    title: "Member Support",
    text: "Our team supports members through WhatsApp, phone, and email.",
  },
];

export function TrustCards() {
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