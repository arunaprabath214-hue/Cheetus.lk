CREATE TABLE public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  full_name TEXT NOT NULL,
  nic_number TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  district TEXT,
  address TEXT,
  monthly_payment_ability TEXT,
  required_amount_goal TEXT,
  preferred_start_time TEXT,
  message TEXT,
  consent_terms BOOLEAN NOT NULL DEFAULT false,
  consent_fee BOOLEAN NOT NULL DEFAULT false,
  consent_no_guarantee BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'new',
  whatsapp_sent BOOLEAN NOT NULL DEFAULT false,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  invoice_status TEXT NOT NULL DEFAULT 'not_issued',
  kyc_status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT
);
GRANT INSERT ON public.applications TO anon;
GRANT INSERT ON public.applications TO authenticated;
GRANT ALL ON public.applications TO service_role;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit an application"
  ON public.applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE TABLE public.application_documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  application_id UUID NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  document_type TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL
);
GRANT INSERT ON public.application_documents TO anon;
GRANT INSERT ON public.application_documents TO authenticated;
GRANT ALL ON public.application_documents TO service_role;
ALTER TABLE public.application_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can attach documents to a submission"
  ON public.application_documents FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX idx_applications_created_at ON public.applications(created_at DESC);
CREATE INDEX idx_applications_status ON public.applications(status);
CREATE INDEX idx_application_documents_application_id ON public.application_documents(application_id);