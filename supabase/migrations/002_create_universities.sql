-- Create universities table
CREATE TABLE universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL UNIQUE,
  location TEXT NOT NULL,
  cost_range TEXT NOT NULL,
  duration TEXT NOT NULL,
  modality TEXT NOT NULL,
  ranking INTEGER NOT NULL,
  scholarships TEXT NOT NULL,
  strengths TEXT NOT NULL,
  logo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view universities" ON universities
  FOR SELECT USING (true);

CREATE POLICY "University users can update own university" ON universities
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'university'
    )
  );

CREATE POLICY "Admins can manage universities" ON universities
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Updated at trigger
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON universities
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial university data
INSERT INTO universities (nombre, location, cost_range, duration, modality, ranking, scholarships, strengths, logo_url) VALUES
('Universidad Austral', 'Pilar, Buenos Aires', '$8,000 - $15,000 USD/año', '5-6 años', 'Presencial', 1, 'Becas mérito, necesidades económicas', 'Medicina, Ingeniería, Derecho', 'https://example.com/logos/austral.png'),
('Universidad Di Tella', 'Buenos Aires', '$10,000 - $18,000 USD/año', '4-5 años', 'Presencial', 2, 'Becas académicas, descuentos tempranos', 'Economía, Administración, Ciencias Políticas', 'https://example.com/logos/ditella.png'),
('Universidad de San Andrés', 'Victoria, Buenos Aires', '$12,000 - $20,000 USD/año', '4-5 años', 'Presencial', 3, 'Becas integrales, parciales', 'Negocios, Relaciones Internacionales', 'https://example.com/logos/sanandres.png'),
('UCEMA', 'Buenos Aires', '$6,000 - $12,000 USD/año', '4-5 años', 'Presencial', 4, 'Becas rendimiento, planes de pago', 'Economía, Finanzas, Marketing', 'https://example.com/logos/uicema.png'),
('UADE', 'Buenos Aires', '$7,000 - $14,000 USD/año', '4-6 años', 'Presencial/Virtual', 5, 'Becas deportivas, académicas', 'Diseño, Comunicación, Gastronomía', 'https://example.com/logos/uade.png'),
('Universidad de Belgrano', 'Buenos Aires', '$5,000 - $11,000 USD/año', '4-6 años', 'Presencial', 6, 'Becas convenios, financiación', 'Arquitectura, Medicina, Derecho', 'https://example.com/logos/ub.png'),
('Universidad de Palermo', 'Buenos Aires', '$6,000 - $13,000 USD/año', '4-5 años', 'Presencial', 7, 'Becas creativas, descuentos', 'Diseño, Cine, Fotografía', 'https://example.com/logos/up.png'),
('UCA', 'Buenos Aires', '$5,500 - $12,000 USD/año', '4-6 años', 'Presencial', 8, 'Becas religiosas, académicas', 'Derecho, Psicología, Educación', 'https://example.com/logos/uca.png'),
('ITBA', 'Buenos Aires', '$9,000 - $16,000 USD/año', '5-6 años', 'Presencial', 9, 'Becas ingenieriles, empresas', 'Ingeniería, Tecnología, Ciencias', 'https://example.com/logos/itba.png'),
('FUCE', 'Buenos Aires', '$4,000 - $9,000 USD/año', '4-5 años', 'Virtual', 10, 'Becas online, planes cuotas', 'Educación, Psicología', 'https://example.com/logos/fuce.png'),
('UBA', 'Buenos Aires', 'Gratuito', '5-7 años', 'Presencial', 11, 'Sin costo, becas ayuda económica', 'Medicina, Derecho, Ciencias Exactas', 'https://example.com/logos/uba.png'),
('UTN', 'Buenos Aires', 'Gratuito', '5-6 años', 'Presencial', 12, 'Sin costo, becas empresas', 'Ingeniería en todas las especialidades', 'https://example.com/logos/utn.png'),
('Universidad Siglo 21', 'Virtual', '$3,000 - $8,000 USD/año', '4-5 años', 'Virtual', 13, 'Becas online, descuentos', 'Abogacía, Contador, Marketing', 'https://example.com/logos/siglo21.png'),
('USAL', 'Buenos Aires', '$4,500 - $10,000 USD/año', '4-6 años', 'Presencial', 14, 'Becas católicas, académicas', 'Filosofía, Letras, Historia', 'https://example.com/logos/usual.png'),
('UCES', 'Buenos Aires', '$5,000 - $11,000 USD/año', '4-5 años', 'Presencial/Virtual', 15, 'Becas económicas, planes pago', 'Economía, Psicología, Derecho', 'https://example.com/logos/uces.png'),
('UAI', 'Buenos Aires', '$4,000 - $9,500 USD/año', '4-5 años', 'Presencial', 16, 'Becas empresariales, descuentos', 'Marketing, RRHH, Finanzas', 'https://example.com/logos/uai.png');
