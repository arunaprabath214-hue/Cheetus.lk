import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, ShieldCheck, Factory, FileText } from "lucide-react";
import { useApply } from "./ApplyContext";
import { useLang } from "@/lib/i18n";
import { cheetusOfficialLogo } from "@/lib/cheetus-logo";
import { SITE } from "@/lib/site";

export function Hero() {
  const { setOpen } = useApply();
  const { t } = useLang();
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!transitioning) return;
    const timer = setTimeout(() => {
      setTransitioning(false);
      setOpen(true);
    }, 1100);
    return () => clearTimeout(timer);
  }, [transitioning, setOpen]);

  const handleStart = () => setTransitioning(true);

  return (
    <section id="home" className="relative isolate overflow-hidden pt-24 md:pt-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-hero" aria-hidden />
      <div aria-hidden className="pointer-events-none absolute -right-28 top-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-[-8%] h-96 w-96 rounded-full bg-amber-100/70 blur-3xl" />

      <div className="container-tight relative grid items-center gap-12 pb-16 pt-4 md:pb-24 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-white/90 px-4 py-3 text-xs font-semibold text-charcoal shadow-sm backdrop-blur"
          >
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="flex flex-col text-left leading-tight"><span>{t("pvBadge")}</span><span className="mt-1 text-[10px] font-bold tracking-[0.08em]">{SITE.pv}</span></span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 max-w-3xl text-[2rem] font-extrabold leading-[1.18] tracking-tight text-charcoal sm:text-5xl md:text-[3.15rem] xl:text-[3.45rem]"
          >
            <><span className="block text-orange-600">{t("heroTitle")}</span><span className="block text-charcoal">{t("heroTitleBlack")}</span></>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="mt-6 max-w-2xl text-base leading-8 text-charcoal-soft md:text-lg md:leading-9"
          >
            {t("heroSub")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <button
              onClick={handleStart}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-bold text-primary-foreground shadow-[0_12px_28px_rgba(234,88,12,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(234,88,12,0.3)]"
            >
              {t("getStarted")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#process"
              className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/85 px-7 py-3.5 text-sm font-semibold text-charcoal transition-colors hover:border-primary/50 hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              {t("howItWorks")}
            </a>
          </motion.div>


        </div>

        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.15 }}
          className="relative lg:col-span-5"
        >
          <div className="relative isolate min-h-[500px] overflow-hidden rounded-[2rem] border border-orange-100 bg-orange-950 shadow-[0_28px_80px_rgba(154,52,18,0.2)] sm:min-h-[560px]">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=88" alt="" className="col-span-2 h-full w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=85" alt="" className="h-full w-full object-cover" />
              <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=85" alt="" className="h-full w-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-orange-950/25 via-orange-950/35 to-orange-950/80" />
            <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 z-[1] h-48 w-48 rounded-full border-[28px] border-white/20" />
            <div aria-hidden className="pointer-events-none absolute -bottom-16 -left-12 z-[1] h-56 w-56 rounded-full border-[34px] border-white/15" />

            <div className="relative z-10 flex min-h-[500px] flex-col items-center justify-center px-6 py-10 text-center sm:min-h-[560px] sm:px-10">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/95 px-4 py-2 text-[11px] font-extrabold tracking-[0.16em] text-orange-800 shadow-lg backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-orange-500" />
                CHEETUS · GROW WITH US
              </div>
              <motion.div className="relative" animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                <div className="absolute -inset-4 rounded-[28%] bg-white/90 shadow-[0_16px_45px_rgba(255,255,255,0.25)]" />
                <img
                  src={cheetusOfficialLogo}
                  alt="Cheetus official company logo"
                  width={220}
                  height={220}
                  className="relative h-36 w-36 rounded-[22%] object-cover shadow-2xl sm:h-48 sm:w-48"
                  style={{ clipPath: "inset(0 round 22%)" }}
                />
              </motion.div>
              <h2 className="mt-8 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">දේශීය කර්මාන්ත නගා සිටුවීමට</h2>
              <p className="mt-2 max-w-sm text-sm leading-7 text-white/95 sm:text-base">අපෙන් පුංචි සහයෝගයක්</p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="rounded-full border border-white/60 bg-white/95 px-3.5 py-2 text-xs font-bold text-charcoal">කර්මාන්ත</span>
                <span className="rounded-full border border-white/60 bg-white/95 px-3.5 py-2 text-xs font-bold text-charcoal">දේශීය ව්‍යාපාර</span>
                <span className="rounded-full border border-white/60 bg-white/95 px-3.5 py-2 text-xs font-bold text-charcoal">චීට්ටු වැඩසටහන</span>
              </div>
              <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-orange-600 px-3 py-1.5 text-[10px] font-bold text-white shadow-md">
                <Factory className="h-3.5 w-3.5" />
                PV 00279330
              </div>
            </div>
          </div>
        </motion.div>
      </div>

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
              <div aria-hidden className="absolute inset-0 -m-16 rounded-full bg-gradient-glow" />
              <img
                src={cheetusOfficialLogo}
                alt="Cheetus"
                className="relative h-40 w-40 rounded-[24%] object-cover drop-shadow-[0_12px_40px_rgba(255,140,40,0.5)] md:h-52 md:w-52"
                style={{ clipPath: "inset(0 round 24%)" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
