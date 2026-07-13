-- Grant anon role access to diary_entries for local development
ALTER TABLE public.diary_entries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all anon selects" ON public.diary_entries
  FOR SELECT
  USING (true);

CREATE POLICY "Allow all anon inserts" ON public.diary_entries
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow all anon updates" ON public.diary_entries
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all anon deletes" ON public.diary_entries
  FOR DELETE
  USING (true);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.diary_entries TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.diary_entries TO authenticated;
