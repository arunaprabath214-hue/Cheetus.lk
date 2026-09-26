import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ShieldAlert, Lock } from "lucide-react";
import { listRecentApplications } from "@/lib/applications.functions";
import { Logo } from "@/components/site/Logo";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/admin-review")({
  head: () => ({
    meta: [
      { title: "Admin Review — Cheetus (Internal)" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const STATUSES = [
  { key: "new", label: "New Applications" },
  { key: "whatsapp_pending", label: "WhatsApp Pending" },
  { key: "payment_confirmation_pending", label: "Payment Confirmation Pending" },
  { key: "invoice_issued", label: "Invoice Issued" },
  { key: "kyc_review", label: "KYC Review" },
  { key: "onboarded", label: "Onboarded Members" },
  { key: "rejected", label: "Rejected" },
];

function AdminPage() {
  const fetchFn = useServerFn(listRecentApplications);
  const opts = queryOptions({
    queryKey: ["admin", "applications"],
    queryFn: () => fetchFn(),
  });
  const { data, isLoading, error } = useQuery(opts);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container-tight flex h-16 items-center justify-between md:h-20">
          <Link to="/" className="flex items-center gap-3">
            <Logo className="h-10 w-10" />
            <div>
              <p className="text-sm font-semibold text-charcoal">{SITE.shortName} Admin</p>
              <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Internal review placeholder</p>
            </div>
          </Link>
          <div className="hidden items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-charcoal-soft sm:inline-flex">
            <Lock className="h-3 w-3" /> Not yet authenticated
          </div>
        </div>
      </header>

      <main className="container-tight py-10">
        <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-semibold">This is an internal placeholder.</p>
            <p className="mt-1 text-destructive/80">Future admin login, lead review, KYC verification, payment status, invoice status, and onboarding workflow will be built here. Do not share this URL publicly.</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATUSES.map((s) => (
            <div key={s.key} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{s.label}</p>
              <p className="mt-2 text-3xl font-semibold text-charcoal">{data?.counts?.[s.key] ?? 0}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card shadow-soft">
          <div className="border-b border-border p-5">
            <h2 className="text-lg font-semibold text-charcoal">Recent Applications</h2>
            <p className="text-xs text-muted-foreground">Last 50 submissions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-secondary/60 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">App ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3">Goal</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {isLoading && <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">Loading…</td></tr>}
                {error && <tr><td colSpan={7} className="px-4 py-8 text-center text-destructive">Failed to load</td></tr>}
                {!isLoading && !error && (data?.rows.length ?? 0) === 0 && (
                  <tr><td colSpan={7} className="px-4 py-8 text-center text-muted-foreground">No applications yet</td></tr>
                )}
                {data?.rows.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 font-mono text-[11px] text-muted-foreground">{r.id.slice(0, 8)}…</td>
                    <td className="px-4 py-3 font-medium text-charcoal">{r.full_name}</td>
                    <td className="px-4 py-3 text-charcoal-soft">{r.phone}</td>
                    <td className="px-4 py-3 text-charcoal-soft">{r.district ?? "—"}</td>
                    <td className="px-4 py-3 text-charcoal-soft">{r.required_amount_goal ?? "—"}</td>
                    <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  return (
    <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-charcoal-soft">
      {status}
    </span>
  );
}