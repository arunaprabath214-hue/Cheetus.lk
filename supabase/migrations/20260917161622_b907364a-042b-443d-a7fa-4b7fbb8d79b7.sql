-- Explicit deny-by-default policies on storage.objects for the private kyc-documents bucket.
-- Only trusted server-side code (service_role, which bypasses RLS) may read/write these files.
DROP POLICY IF EXISTS "kyc_documents_no_public_select" ON storage.objects;
DROP POLICY IF EXISTS "kyc_documents_no_public_insert" ON storage.objects;
DROP POLICY IF EXISTS "kyc_documents_no_public_update" ON storage.objects;
DROP POLICY IF EXISTS "kyc_documents_no_public_delete" ON storage.objects;

CREATE POLICY "kyc_documents_no_public_select"
ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'kyc-documents' AND false);

CREATE POLICY "kyc_documents_no_public_insert"
ON storage.objects FOR INSERT TO anon, authenticated
WITH CHECK (bucket_id = 'kyc-documents' AND false);

CREATE POLICY "kyc_documents_no_public_update"
ON storage.objects FOR UPDATE TO anon, authenticated
USING (bucket_id = 'kyc-documents' AND false)
WITH CHECK (bucket_id = 'kyc-documents' AND false);

CREATE POLICY "kyc_documents_no_public_delete"
ON storage.objects FOR DELETE TO anon, authenticated
USING (bucket_id = 'kyc-documents' AND false);