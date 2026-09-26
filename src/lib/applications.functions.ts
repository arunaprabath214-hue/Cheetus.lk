import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ApplicationSchema = z.object({
  full_name: z.string().trim().min(2).max(120),
  nic_number: z.string().trim().min(4).max(20),
  phone: z.string().trim().min(7).max(20),
  email: z.string().trim().email().max(200).optional().or(z.literal("")),
  district: z.string().trim().max(60).optional().or(z.literal("")),
  address: z.string().trim().max(500).optional().or(z.literal("")),
  monthly_payment_ability: z.string().trim().max(60).optional().or(z.literal("")),
  required_amount_goal: z.string().trim().max(60).optional().or(z.literal("")),
  preferred_start_time: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  consent_terms: z.boolean(),
  consent_fee: z.boolean(),
  consent_no_guarantee: z.boolean(),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ApplicationSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("applications")
      .insert({
        full_name: data.full_name,
        nic_number: data.nic_number,
        phone: data.phone,
        email: data.email || null,
        district: data.district || null,
        address: data.address || null,
        monthly_payment_ability: data.monthly_payment_ability || null,
        required_amount_goal: data.required_amount_goal || null,
        preferred_start_time: data.preferred_start_time || null,
        message: data.message || null,
        consent_terms: data.consent_terms,
        consent_fee: data.consent_fee,
        consent_no_guarantee: data.consent_no_guarantee,
        status: "new",
      })
      .select("id")
      .single();
    if (error || !row) throw new Error(error?.message || "Insert failed");
    return { id: row.id as string };
  });

export const markWhatsappSent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("applications").update({ whatsapp_sent: true }).eq("id", data.id);
    return { ok: true };
  });

export const listRecentApplications = createServerFn({ method: "GET" })
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("applications")
      .select("id, created_at, full_name, phone, district, required_amount_goal, status")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw new Error(error.message);
    const counts: Record<string, number> = {};
    for (const r of data ?? []) counts[r.status] = (counts[r.status] ?? 0) + 1;
    return { rows: data ?? [], counts };
  });