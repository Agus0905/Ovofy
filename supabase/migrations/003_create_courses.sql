-- Create courses table
CREATE TABLE courses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  university_id UUID NOT NULL REFERENCES universities(id) ON DELETE CASCADE,
  nombre TEXT NOT NULL,
  carrera TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  cupos_total INTEGER NOT NULL DEFAULT 30,
  cupos_disponibles INTEGER NOT NULL DEFAULT 30,
  tendencia BOOLEAN DEFAULT false,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view active courses" ON courses
  FOR SELECT USING (is_active = true);

CREATE POLICY "University users can manage own courses" ON courses
  FOR ALL USING (
    university_id IN (
      SELECT id FROM universities WHERE nombre = (
        SELECT nombre FROM profiles WHERE id = auth.uid() AND role = 'university'
      )
    )
  );

CREATE POLICY "Admins can manage all courses" ON courses
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Updated at trigger
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes for better performance
CREATE INDEX idx_courses_university_id ON courses(university_id);
CREATE INDEX idx_courses_carrera ON courses(carrera);
CREATE INDEX idx_courses_tendencia ON courses(tendencia);
CREATE INDEX idx_courses_is_active ON courses(is_active);

-- Insert sample courses
INSERT INTO courses (university_id, nombre, carrera, descripcion, cupos_total, cupos_disponibles, tendencia, image_url) VALUES
-- Universidad Austral
((SELECT id FROM universities WHERE nombre = 'Universidad Austral'), 'Medicina en Acción', 'Medicina', 'Experimenta el día a día de un médico de emergencias en un hospital simulado. Aprende diagnóstico, tratamiento y ética médica.', 25, 15, true, 'https://example.com/courses/austral-medicina.jpg'),
((SELECT id FROM universities WHERE nombre = 'Universidad Austral'), 'Ingeniería del Futuro', 'Ingeniería', 'Diseña y construye prototipos de robots, aprende sobre IA y automatización industrial.', 30, 20, true, 'https://example.com/courses/austral-ingenieria.jpg'),

-- Universidad Di Tella
((SELECT id FROM universities WHERE nombre = 'Universidad Di Tella'), 'Negocios Digitales', 'Administración', 'Crea tu propio e-commerce desde cero. Aprende marketing digital, finanzas y gestión de equipos.', 20, 8, true, 'https://example.com/courses/ditella-negocios.jpg'),
((SELECT id FROM universities WHERE nombre = 'Universidad Di Tella'), 'Economía Global', 'Economía', 'Analiza mercados internacionales, comprende criptomonedas y simulación de bolsa.', 25, 12, false, 'https://example.com/courses/ditella-economia.jpg'),

-- UBA
((SELECT id FROM universities WHERE nombre = 'UBA'), 'Derecho y Justicia', 'Derecho', 'Participa en juicios simulados, aprende sobre derecho constitucional y penal.', 40, 25, true, 'https://example.com/courses/uba-derecho.jpg'),
((SELECT id FROM universities WHERE nombre = 'UBA'), 'Ciencias de la Computación', 'Ciencias Exactas', 'Programación avanzada, algoritmos y estructuras de datos. Crea tu primera app.', 35, 18, true, 'https://example.com/courses/uba-computacion.jpg'),

-- ITBA
((SELECT id FROM universities WHERE nombre = 'ITBA'), 'Mecatrónica y Robótica', 'Ingeniería Mecánica', 'Construye robots industriales, aprende sobre automatización y control de sistemas.', 25, 10, false, 'https://example.com/courses/itba-mecatronica.jpg'),
((SELECT id FROM universities WHERE nombre = 'ITBA'), 'Energías Renovables', 'Ingeniería Química', 'Diseña sistemas solares y eólicos. Aprende sobre sostenibilidad energética.', 20, 15, false, 'https://example.com/courses/itba-energias.jpg'),

-- UADE
((SELECT id FROM universities WHERE nombre = 'UADE'), 'Diseño de Moda', 'Diseño Textil', 'Crea tu propia colección, aprende sobre tendencias, materiales y marketing de moda.', 30, 22, true, 'https://example.com/courses/uade-moda.jpg'),
((SELECT id FROM universities WHERE nombre = 'UADE'), 'Gastronomía Internacional', 'Gastronomía', 'Cocina platos de alta cuisine, aprende técnicas de chefs internacionales.', 15, 5, false, 'https://example.com/courses/uade-gastronomia.jpg');
