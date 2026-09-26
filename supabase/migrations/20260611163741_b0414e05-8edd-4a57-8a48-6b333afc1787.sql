DROP POLICY IF EXISTS "Anyone can submit an application" ON public.applications;
DROP POLICY IF EXISTS "Anyone can attach documents to a submission" ON public.application_documents;
REVOKE INSERT ON public.applications FROM anon, authenticated;
REVOKE INSERT ON public.application_documents FROM anon, authenticated;