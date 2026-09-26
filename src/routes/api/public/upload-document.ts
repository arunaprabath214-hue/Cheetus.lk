import { createFileRoute } from "@tanstack/react-router";

const MAX = 6 * 1024 * 1024;
const ALLOWED = new Set(["application/pdf", "image/jpeg", "image/jpg", "image/png"]);
const TYPES = new Set(["nic-front", "nic-back", "address-proof", "other"]);

export const Route = createFileRoute("/api/public/upload-document")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const form = await request.formData();
          const applicationId = String(form.get("application_id") ?? "");
          const documentType = String(form.get("document_type") ?? "");
          const file = form.get("file");

          if (!/^[0-9a-f-]{36}$/i.test(applicationId)) {
            return Response.json({ ok: false, error: "Invalid application id" }, { status: 400 });
          }
          if (!TYPES.has(documentType)) {
            return Response.json({ ok: false, error: "Invalid document type" }, { status: 400 });
          }
          if (!(file instanceof File)) {
            return Response.json({ ok: false, error: "Missing file" }, { status: 400 });
          }
          if (file.size > MAX) {
            return Response.json({ ok: false, error: "File too large (max 6MB)" }, { status: 400 });
          }
          if (!ALLOWED.has(file.type)) {
            return Response.json({ ok: false, error: "Unsupported file type" }, { status: 400 });
          }

          const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 120);
          const path = `${applicationId}/${documentType}-${Date.now()}-${safeName}`;

          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const buffer = await file.arrayBuffer();
          const { error: upErr } = await supabaseAdmin.storage
            .from("kyc-documents")
            .upload(path, buffer, { contentType: file.type, upsert: false });
          if (upErr) {
            return Response.json({ ok: false, error: upErr.message }, { status: 500 });
          }

          const { error: dbErr } = await supabaseAdmin.from("application_documents").insert({
            application_id: applicationId,
            document_type: documentType,
            file_path: path,
            file_name: file.name.slice(0, 200),
            file_size: file.size,
            mime_type: file.type,
          });
          if (dbErr) {
            return Response.json({ ok: false, error: dbErr.message }, { status: 500 });
          }
          return Response.json({ ok: true, path });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          return Response.json({ ok: false, error: msg }, { status: 500 });
        }
      },
    },
  },
});