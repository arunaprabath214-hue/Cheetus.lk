import { motion } from "framer-motion";
import { ShieldAlert } from "lucide-react";

export function Notice() {
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
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary-glow">
              <ShieldAlert className="h-3.5 w-3.5" />
              Important Notice
            </div>
            <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
              Please read this carefully before applying.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/80 md:text-base">
              Cheetus Investment Industrial Development (PVT) LTD is not a bank,
              finance company, loan provider, deposit-taking institution, or
              investment return provider. Our services are focused on member
              registration, documentation, KYC process, communication, and
              structured cheetu management support subject to applicable terms,
              verification, and legal requirements. Registration or inquiry does
              not guarantee participation in any cheetu group.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}