import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, ShieldCheck, MessageCircle, Info, ChevronRight, ChevronLeft,
  Check, Upload, AlertCircle, Loader2, Users, FileCheck, Receipt, Phone, Sparkles,
} from "lucide-react";
import { useApply } from "./ApplyContext";
import { useLang, type Lang } from "@/lib/i18n";
import { useServerFn } from "@tanstack/react-start";
import { submitApplication, markWhatsappSent } from "@/lib/applications.functions";
import {
  AMOUNT_GOAL, DISTRICTS, PAYMENT_ABILITY, SITE, START_TIME,
  MAX_FILE_SIZE, ALLOWED_MIME,
} from "@/lib/site";

type Form = {
  full_name: string;
  nic_number: string;
  phone: string;
  email: string;
  district: string;
  address: string;
  monthly_payment_ability: string;
  required_amount_goal: string;
  preferred_start_time: string;
  message: string;
  consent_terms: boolean;
  consent_fee: boolean;
  consent_no_guarantee: boolean;
  consent_truth: boolean;
};

const empty: Form = {
  full_name: "", nic_number: "", phone: "", email: "", district: "", address: "",
  monthly_payment_ability: "", required_amount_goal: "", preferred_start_time: "", message: "",
  consent_terms: false, consent_fee: false, consent_no_guarantee: false, consent_truth: false,
};

type DocKey = "nic-front" | "nic-back" | "address-proof" | "other";
type DocState = { file: File | null; status: "idle" | "uploading" | "ok" | "error"; error?: string };

const docDefaults: Record<DocKey, DocState> = {
  "nic-front": { file: null, status: "idle" },
  "nic-back": { file: null, status: "idle" },
  "address-proof": { file: null, status: "idle" },
  "other": { file: null, status: "idle" },
};

const benefitIcons = [Users, FileCheck, Receipt, Phone, Sparkles];

export function ApplyModal() {
  const { open, setOpen } = useApply();
  const { t, lang } = useLang();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(empty);
  const [docs, setDocs] = useState<Record<DocKey, DocState>>(docDefaults);
  const [submitting, setSubmitting] = useState(false);
  const [appId, setAppId] = useState<string | null>(null);
  const [thank, setThank] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadIssue, setUploadIssue] = useState(false);

  const submitFn = useServerFn(submitApplication);
  const markSent = useServerFn(markWhatsappSent);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeAll(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeAll = () => {
    setOpen(false);
    setTimeout(() => {
      setStep(0); setForm(empty); setDocs(docDefaults);
      setSubmitting(false); setAppId(null); setThank(false);
      setSubmitError(null); setUploadIssue(false);
    }, 300);
  };

  const update = <K extends keyof Form>(k: K, v: Form[K]) => setForm((f) => ({ ...f, [k]: v }));

  const step1Valid =
    form.full_name.trim().length > 1 &&
    form.nic_number.trim().length > 3 &&
    form.phone.trim().length > 6 &&
    form.district;

  const step2Valid =
    !!form.monthly_payment_ability && !!form.required_amount_goal && !!form.preferred_start_time;

  const consentsValid =
    form.consent_truth && form.consent_fee && form.consent_no_guarantee && form.consent_terms;

  const onFile = (key: DocKey, file: File | null) => {
    if (!file) { setDocs((d) => ({ ...d, [key]: { file: null, status: "idle" } })); return; }
    if (file.size > MAX_FILE_SIZE) {
      setDocs((d) => ({ ...d, [key]: { file, status: "error", error: "Max 6MB" } }));
      return;
    }
    if (!ALLOWED_MIME.includes(file.type)) {
      setDocs((d) => ({ ...d, [key]: { file, status: "error", error: "PDF/JPG/PNG only" } }));
      return;
    }
    setDocs((d) => ({ ...d, [key]: { file, status: "idle" } }));
  };

  const uploadAll = async (applicationId: string) => {
    let anyFailed = false;
    const keys = Object.keys(docs) as DocKey[];
    await Promise.all(keys.map(async (k) => {
      const ds = docs[k];
      if (!ds.file || ds.status === "error") return;
      setDocs((prev) => ({ ...prev, [k]: { ...prev[k], status: "uploading" } }));
      try {
        const fd = new FormData();
        fd.append("application_id", applicationId);
        fd.append("document_type", k);
        fd.append("file", ds.file);
        const res = await fetch("/api/public/upload-document", { method: "POST", body: fd });
        const json = (await res.json()) as { ok: boolean; error?: string };
        if (!json.ok) throw new Error(json.error || "Upload failed");
        setDocs((prev) => ({ ...prev, [k]: { ...prev[k], status: "ok" } }));
      } catch (e) {
        anyFailed = true;
        const msg = e instanceof Error ? e.message : "Upload failed";
        setDocs((prev) => ({ ...prev, [k]: { ...prev[k], status: "error", error: msg } }));
      }
    }));
    setUploadIssue(anyFailed);
  };

  const buildWa = (id: string) => {
    const lines = [
      "Hello Cheetus Team,",
      "I would like to register as a member.",
      "",
      `Application ID: ${id}`,
      `Full Name: ${form.full_name}`,
      `NIC Number: ${form.nic_number}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "-"}`,
      `District: ${form.district}`,
      `Address: ${form.address || "-"}`,
      `Monthly Payment Ability: ${form.monthly_payment_ability}`,
      `Required Amount Goal: ${form.required_amount_goal}`,
      `Preferred Start Time: ${form.preferred_start_time}`,
      `Message: ${form.message || "-"}`,
      "",
      "I understand that the one-time registration & KYC processing fee is Rs.1000.",
      "I understand payment confirmation will be handled via WhatsApp before invoice issuance.",
      "I understand registration does not guarantee participation in any cheetu group or any financial outcome.",
      "",
      "Please guide me through the next step.",
    ];
    return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
  };

  const onFinalSubmit = async () => {
    if (!consentsValid || submitting) return;
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await submitFn({
        data: {
          full_name: form.full_name, nic_number: form.nic_number, phone: form.phone,
          email: form.email, district: form.district, address: form.address,
          monthly_payment_ability: form.monthly_payment_ability,
          required_amount_goal: form.required_amount_goal,
          preferred_start_time: form.preferred_start_time,
          message: form.message,
          consent_terms: form.consent_terms,
          consent_fee: form.consent_fee,
          consent_no_guarantee: form.consent_no_guarantee,
        },
      });
      setAppId(res.id);
      await uploadAll(res.id);
      const url = buildWa(res.id);
      window.open(url, "_blank", "noopener,noreferrer");
      markSent({ data: { id: res.id } }).catch(() => {});
      setThank(true);
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : "Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial="hidden" animate="show" exit="hidden"
          variants={{ hidden: {}, show: {} }}
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-md"
            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            onClick={closeAll}
            aria-hidden
          />
          <motion.div
            role="dialog" aria-modal="true" aria-labelledby="apply-title"
            variants={{
              hidden: { opacity: 0, scale: 0.96, y: 20 },
              show: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-t-3xl border border-white/40 bg-white/95 shadow-elegant backdrop-blur-xl sm:rounded-3xl"
          >
            <button
              onClick={closeAll}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/90 text-charcoal-soft transition-colors hover:text-charcoal"
            >
              <X className="h-4 w-4" />
            </button>

            {thank ? (
              <ThankYou onClose={closeAll} appId={appId} waUrl={appId ? buildWa(appId) : null} />
            ) : (
              <>
                <StepHeader step={step} lang={lang} t={t} />
                <div className="max-h-[72vh] overflow-y-auto px-5 pb-6 sm:px-9 sm:pb-9">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.25 }}
                    >
                      {step === 0 && (
                        <>
                          <BenefitsBlock t={t} />
                          <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <Field label={t("fullName")} required>
                              <input maxLength={120} required value={form.full_name} onChange={(e) => update("full_name", e.target.value)} className={inputCls} placeholder="As per NIC" />
                            </Field>
                            <Field label={t("nic")} required>
                              <input maxLength={20} required value={form.nic_number} onChange={(e) => update("nic_number", e.target.value)} className={inputCls} placeholder="e.g. 199012345678" />
                            </Field>
                            <Field label={t("phone")} required>
                              <input type="tel" maxLength={20} required value={form.phone} onChange={(e) => update("phone", e.target.value)} className={inputCls} placeholder="+94 7X XXX XXXX" />
                            </Field>
                            <Field label={t("email")}>
                              <input type="email" maxLength={200} value={form.email} onChange={(e) => update("email", e.target.value)} className={inputCls} placeholder="you@example.com" />
                            </Field>
                            <Field label={t("district")} required>
                              <select required value={form.district} onChange={(e) => update("district", e.target.value)} className={inputCls}>
                                <option value="">—</option>
                                {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                              </select>
                            </Field>
                            <Field label={t("address")}>
                              <input maxLength={300} value={form.address} onChange={(e) => update("address", e.target.value)} className={inputCls} />
                            </Field>
                          </div>
                        </>
                      )}

                      {step === 1 && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <Field label={t("monthlyAbility")} required>
                            <select required value={form.monthly_payment_ability} onChange={(e) => update("monthly_payment_ability", e.target.value)} className={inputCls}>
                              <option value="">—</option>
                              {PAYMENT_ABILITY.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </Field>
                          <Field label={t("amountGoal")} required>
                            <select required value={form.required_amount_goal} onChange={(e) => update("required_amount_goal", e.target.value)} className={inputCls}>
                              <option value="">—</option>
                              {AMOUNT_GOAL.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </Field>
                          <Field label={t("startTime")} required>
                            <select required value={form.preferred_start_time} onChange={(e) => update("preferred_start_time", e.target.value)} className={inputCls}>
                              <option value="">—</option>
                              {START_TIME.map((d) => <option key={d} value={d}>{d}</option>)}
                            </select>
                          </Field>
                          <div className="sm:col-span-2">
                            <Field label={t("message")}>
                              <textarea rows={3} maxLength={1000} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${inputCls} resize-none`} />
                            </Field>
                          </div>
                        </div>
                      )}

                      {step === 2 && (
                        <div className="space-y-4">
                          <p className="text-xs text-muted-foreground">{t("uploadHint")}</p>
                          <FileBox docKey="nic-front" label={t("nicFront")} state={docs["nic-front"]} onPick={(f) => onFile("nic-front", f)} required />
                          <FileBox docKey="nic-back" label={t("nicBack")} state={docs["nic-back"]} onPick={(f) => onFile("nic-back", f)} required />
                          <FileBox docKey="address-proof" label={t("addressProof")} state={docs["address-proof"]} onPick={(f) => onFile("address-proof", f)} />
                          <FileBox docKey="other" label={t("otherDoc")} state={docs["other"]} onPick={(f) => onFile("other", f)} />
                          {uploadIssue && (
                            <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                              <div className="text-xs leading-relaxed text-charcoal-soft">
                                <p>{t("uploadFailMsg")}</p>
                                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-primary underline">
                                  <MessageCircle className="h-3.5 w-3.5" /> {t("sendViaWa")}
                                </a>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="flex items-start gap-3 rounded-2xl border border-primary/20 bg-secondary/60 p-4">
                            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            <div className="text-xs leading-relaxed text-charcoal-soft">
                              <p className="font-semibold text-charcoal">{t("feeNotice")}</p>
                              <p className="mt-1 text-muted-foreground">{t("paymentNote")}</p>
                            </div>
                          </div>
                          <Consent checked={form.consent_truth} onChange={(v) => update("consent_truth", v)} label={t("consent1")} />
                          <Consent checked={form.consent_fee} onChange={(v) => update("consent_fee", v)} label={t("consent2")} />
                          <Consent checked={form.consent_no_guarantee} onChange={(v) => update("consent_no_guarantee", v)} label={t("consent3")} />
                          <Consent checked={form.consent_terms} onChange={(v) => update("consent_terms", v)} label={t("consent4")} />
                          {submitError && (
                            <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-xs text-destructive">
                              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                              <p>{submitError}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-7 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setStep((s) => Math.max(0, s - 1))}
                      disabled={step === 0 || submitting}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-charcoal-soft disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" /> {t("back")}
                    </button>
                    {step < 3 ? (
                      <button
                        onClick={() => setStep((s) => s + 1)}
                        disabled={(step === 0 && !step1Valid) || (step === 1 && !step2Valid)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-elegant disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {t("next")} <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <button
                        onClick={onFinalSubmit}
                        disabled={!consentsValid || submitting}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-7 py-3 text-sm font-semibold text-primary-foreground shadow-elegant disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircle className="h-4 w-4" />}
                        {t("continueWa")}
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StepHeader({ step, lang, t }: { step: number; lang: Lang; t: (k: Parameters<ReturnType<typeof useLang>["t"]>[0]) => string }) {
  const labels = ["step1", "step2", "step3", "step4"] as const;
  return (
    <div className="relative px-5 pt-7 pb-5 sm:px-9 sm:pt-9">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-gradient-glow" aria-hidden />
      <div className="relative">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-primary">
          <ShieldCheck className="h-3.5 w-3.5" />
          {lang === "si" ? "KYC සත්‍යාපිත" : "KYC Verified"}
        </div>
        <h3 id="apply-title" className="text-2xl font-semibold text-charcoal sm:text-3xl">
          {lang === "si" ? "සාමාජික ලියාපදිංචිය" : "Member Registration"}
        </h3>
        <div className="mt-4 flex items-center gap-2">
          {labels.map((k, i) => (
            <div key={k} className="flex flex-1 items-center gap-2">
              <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${i <= step ? "bg-gradient-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground"}`}>
                {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <div className={`hidden text-[11px] font-semibold uppercase tracking-wider sm:block ${i <= step ? "text-charcoal" : "text-muted-foreground"}`}>
                {t(k)}
              </div>
              {i < labels.length - 1 && <div className={`mx-1 h-px flex-1 ${i < step ? "bg-primary" : "bg-border"}`} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BenefitsBlock({ t }: { t: (k: Parameters<ReturnType<typeof useLang>["t"]>[0]) => string }) {
  const items = [t("benefit1"), t("benefit2"), t("benefit3"), t("benefit4"), t("benefit5")];
  return (
    <div className="mb-2 rounded-2xl border border-border bg-secondary/50 p-4 sm:p-5">
      <p className="text-sm font-bold text-charcoal">{t("benefitsTitle")}</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {items.map((label, i) => {
          const Icon = benefitIcons[i] ?? Check;
          return (
            <li key={i} className="flex items-start gap-2 text-xs leading-relaxed text-charcoal-soft">
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                <Icon className="h-3 w-3" />
              </span>
              <span>{label}</span>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">{t("benefitsMicro")}</p>
    </div>
  );
}

function FileBox({ docKey, label, state, onPick, required }: {
  docKey: DocKey; label: string; state: DocState; onPick: (f: File | null) => void; required?: boolean;
}) {
  const id = `file-${docKey}`;
  return (
    <label htmlFor={id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border-2 border-dashed p-3 transition-colors ${state.status === "ok" ? "border-primary/50 bg-primary/5" : state.status === "error" ? "border-destructive/40 bg-destructive/5" : "border-border bg-white/60 hover:border-primary/40"}`}>
      <div className="flex items-center gap-3 min-w-0">
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
          {state.status === "uploading" ? <Loader2 className="h-4 w-4 animate-spin" /> :
           state.status === "ok" ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-charcoal">
            {label} {required && <span className="text-primary">*</span>}
          </p>
          <p className="truncate text-[11px] text-muted-foreground">
            {state.file ? state.file.name : "PDF, JPG, PNG · Max 6MB"}
          </p>
          {state.status === "error" && state.error && (
            <p className="text-[11px] text-destructive">{state.error}</p>
          )}
        </div>
      </div>
      <span className="shrink-0 rounded-full bg-card px-3 py-1 text-[11px] font-semibold text-primary">Choose</span>
      <input
        id={id} type="file" className="hidden"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={(e) => onPick(e.target.files?.[0] ?? null)}
      />
    </label>
  );
}

function Consent({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-white/60 p-3.5 text-sm text-charcoal-soft transition-colors hover:border-primary/40">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="mt-1 h-4 w-4 accent-[color:var(--primary)]" />
      <span className="leading-relaxed">{label}</span>
    </label>
  );
}

function ThankYou({ onClose, appId, waUrl }: { onClose: () => void; appId: string | null; waUrl: string | null }) {
  const { t } = useLang();
  return (
    <div className="px-5 pb-9 pt-12 text-center sm:px-9">
      <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 18 }} className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant">
        <Check className="h-10 w-10" />
      </motion.div>
      <h3 className="mt-6 text-2xl font-semibold text-charcoal sm:text-3xl">{t("thankTitle")}</h3>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-charcoal-soft">{t("thankMsg")}</p>
      {appId && <p className="mt-3 text-[11px] uppercase tracking-wider text-muted-foreground">Application ID: <span className="font-mono text-charcoal">{appId}</span></p>}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {waUrl && (
          <a href={waUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-elegant">
            <MessageCircle className="h-4 w-4" /> {t("openWa")}
          </a>
        )}
        <button onClick={onClose} className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-charcoal hover:border-primary/40">
          {t("backHome")}
        </button>
        <a href={`tel:${SITE.phoneTel}`} className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-charcoal hover:border-primary/40">
          {t("contactSupport")}
        </a>
      </div>
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-white/80 px-4 py-2.5 text-sm text-charcoal shadow-sm transition-all placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-charcoal-soft">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}