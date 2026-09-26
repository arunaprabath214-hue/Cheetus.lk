import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-20 md:py-28 ${className}`}>
      <div className="container-tight">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          >
            {eyebrow && (
              <div className="mb-4 inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-3xl font-semibold text-charcoal md:text-4xl lg:text-[44px]">
                {title}
              </h2>
            )}
            {subtitle && <p className="mt-4 text-base text-muted-foreground md:text-lg">{subtitle}</p>}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}