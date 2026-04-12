-- Add policy to allow insert for authenticated users
CREATE POLICY "Enable insert for authenticated users" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (true);
