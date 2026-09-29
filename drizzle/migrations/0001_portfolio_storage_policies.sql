CREATE POLICY "portfolio read" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "portfolio insert" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'portfolio');
CREATE POLICY "portfolio update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'portfolio');
CREATE POLICY "portfolio delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'portfolio');