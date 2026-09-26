import { ArrowRight } from "lucide-react";
import { Section } from "./Section";
import { useApply } from "./ApplyContext";

export function Membership() {
  const { setOpen } = useApply();
  return (
    <Section id="membership" eyebrow="Membership" title="Member Registration" subtitle="Submit your details and our team will reach out via WhatsApp.">
      <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card p-10 shadow-card md:p-14">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-glow opacity-70" aria-hidden />
        <div className="relative">
          <p className="text-base leading-relaxed text-charcoal-soft md:text-lg">
            Members can submit their basic details, payment ability, and
            required amount goal through the registration form. The team will
            review the information and contact the applicant through WhatsApp.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform duration-300 hover:scale-[1.03]"
          >
            Apply Now
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </Section>
  );
}