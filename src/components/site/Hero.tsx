import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Sparkles, Factory } from "lucide-react";
import { useApply } from "./ApplyContext";
import { useLang } from "@/lib/i18n";
import cheetusLogo from "@/assets/cheetus-logo.svg";

export function Hero() {
  const { setOpen } = useApply();
  const { t } = useLang();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!transitioning) return;
    const t = setTimeout(() => {
      setTransitioning(false);
      setOpen(true);
    }, 1100);
    return () => clearTimeout(t);
  }, [transitioning, setOpen]);

  const handleStart = () => setTransitioning(true);

  return (
    <section id="home" className="relative overflow-hidden pt-28 md:pt-32">
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" aria-hidden />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-15%] h-[600px] w-[600px] rounded-full bg-gradient-glow"
        animate={{ scale: [1, 1.12, 1], opacity: [0.55, 0.85, 0.55] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-[-10%] h-[500px] w-[500px] rounded-full bg-gradient-glow opacity-50"
        animate={{ scale: [1, 1.18, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container-tight relative grid items-center gap-10 pb-20 md:pb-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-medium text-charcoal-soft shadow-soft backdrop-blur"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            {t("pvBadge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-3xl font-semibold leading-[1.1] text-charcoal sm:text-5xl md:text-6xl"
          >
            <span className="text-gradient-primary">{t("heroTitle")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-5 max-w-xl text-base text-charcoal-soft md:text-lg"
          >
            {t("heroSub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={handleStart}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-transform duration-300 hover:scale-[1.03]"
            >
              {t("getStarted")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:border-primary/40 hover:text-primary"
            >
              {t("howItWorks")}
            </a>
          </motion.div>
        </div>

        {/* Animated cinematic preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative lg:col-span-5"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-primary shadow-ring-elegant">
            {/* abstract motion */}
            <motion.div
              aria-hidden
              className="absolute -top-10 -left-10 h-64 w-64 rounded-full bg-white/25 blur-2xl"
              animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -bottom-16 -right-10 h-72 w-72 rounded-full bg-white/15 blur-3xl"
              animate={{ x: [0, -25, 0], y: [0, -15, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Logo */}
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <motion.img
                src={cheetusLogo}
                alt="Cheetus"
                className="h-32 w-32 drop-shadow-[0_8px_24px_rgba(0,0,0,0.25)] md:h-40 md:w-40"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="mt-4 text-lg font-semibold tracking-wide">දේශීය දියුණුවට එකට</p>
              <p className="mt-1 text-xs uppercase tracking-[0.25em] opacity-80">ශ්‍රී ලාංකීය කර්මාන්ත හා ව්‍යාපාර දියුණුව</p>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-medium backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" />
                කර්මාන්ත • ව්‍යාපාර • දියුණුව
              </div>
            </motion.div>

            <div className="absolute bottom-5 right-5 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-charcoal shadow-soft">
              <Factory className="h-4 w-4 text-primary" />
              ශ්‍රී ලංකාව වෙනුවෙන්
            </div>
          </div>
        </motion.div>
      </div>

      {/* Logo transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-charcoal/55 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, filter: "blur(8px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              exit={{ scale: 1.3, opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div
                aria-hidden
                className="absolute inset-0 -m-16 rounded-full bg-gradient-glow"
              />
              <img
                src={cheetusLogo}
                alt="Cheetus"
                className="relative h-40 w-40 md:h-52 md:w-52 drop-shadow-[0_12px_40px_rgba(255,140,40,0.5)]"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}