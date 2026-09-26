import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { LangToggle } from "./LangToggle";
import { NAV, SITE } from "@/lib/site";
import { useApply } from "./ApplyContext";
import { useLang } from "@/lib/i18n";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { setOpen } = useApply();
  const { lang, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "glass shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container-tight flex h-16 items-center justify-between md:h-20">
        <a href="#home" className="flex items-center gap-3">
          <Logo className="h-10 w-10 md:h-12 md:w-12" />
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-charcoal md:text-base">{SITE.shortName}</span>
            <span className="hidden text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:block">
              {SITE.pv}
            </span>
          </div>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-charcoal-soft transition-colors hover:text-primary"
            >
              {lang === "si" ? n.labelSi : n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangToggle className="hidden sm:inline-flex" />
          <button
            onClick={() => setOpen(true)}
            className="hidden rounded-full bg-gradient-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
          >
            {t("applyNow")}
          </button>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/60 text-charcoal lg:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="glass border-t border-border lg:hidden"
          >
            <div className="container-tight flex flex-col gap-1 py-4">
              <div className="mb-2 flex justify-center sm:hidden">
                <LangToggle />
              </div>
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-charcoal-soft hover:bg-accent hover:text-primary"
                >
                  {lang === "si" ? n.labelSi : n.label}
                </a>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setOpen(true);
                }}
                className="mt-2 rounded-full bg-gradient-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant sm:hidden"
              >
                {t("applyNow")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}