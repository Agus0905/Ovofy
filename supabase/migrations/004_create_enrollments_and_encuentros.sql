-- Create enrollments table
CREATE TABLE enrollments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed BOOLEAN DEFAULT false,
  UNIQUE(student_id, course_id)
);

-- Enable RLS
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Students can view own enrollments" ON enrollments
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can create own enrollments" ON enrollments
  FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "University users can view course enrollments" ON enrollments
  FOR SELECT USING (
    course_id IN (
      SELECT id FROM courses WHERE university_id IN (
        SELECT id FROM universities WHERE nombre = (
          SELECT nombre FROM profiles WHERE id = auth.uid() AND role = 'university'
        )
      )
    )
  );

CREATE POLICY "Admins can manage all enrollments" ON enrollments
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create encuentros table
CREATE TABLE encuentros (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  numero INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descripcion TEXT NOT NULL,
  fecha TIMESTAMP WITH TIME ZONE NOT NULL,
  recording_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(course_id, numero)
);

-- Enable RLS
ALTER TABLE encuentros ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Everyone can view encuentros" ON encuentros
  FOR SELECT USING (true);

CREATE POLICY "University users can manage own encuentros" ON encuentros
  FOR ALL USING (
    course_id IN (
      SELECT id FROM courses WHERE university_id IN (
        SELECT id FROM universities WHERE nombre = (
          SELECT nombre FROM profiles WHERE id = auth.uid() AND role = 'university'
        )
      )
    )
  );

CREATE POLICY "Admins can manage all encuentros" ON encuentros
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Updated at trigger
CREATE TRIGGER handle_updated_at
  BEFORE UPDATE ON encuentros
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Create indexes
CREATE INDEX idx_enrollments_student_id ON enrollments(student_id);
CREATE INDEX idx_enrollments_course_id ON enrollments(course_id);
CREATE INDEX idx_encuentros_course_id ON encuentros(course_id);

-- Insert sample encuentros for some courses
INSERT INTO encuentros (course_id, numero, titulo, descripcion, fecha) VALUES
-- Medicina en Acción
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 1, 'Introducción a la Emergencia', 'Conoce el área de emergencias, triage y primeros auxilios básicos.', NOW() + INTERVAL '1 day'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 2, 'Diagnóstico Clínico', 'Aprende a realizar exámenes físicos y diagnosticar patologías comunes.', NOW() + INTERVAL '8 days'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 3, 'Procedimientos Médicos', 'Práctica de suturas, inyecciones y manejo de vía aérea.', NOW() + INTERVAL '15 days'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 4, 'Ética y Comunicación', 'Cómo comunicar malas noticias y dilemas éticos en medicina.', NOW() + INTERVAL '22 days'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 5, 'Simulación de Casos', 'Resolución de casos clínicos complejos en equipo.', NOW() + INTERVAL '29 days'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 6, 'Proyecto Final', 'Presentación de caso clínico completo y evaluación final.', NOW() + INTERVAL '36 days'),

-- Negocios Digitales
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 1, 'Ideación y Validación', 'Cómo encontrar una idea de negocio y validarla en el mercado.', NOW() + INTERVAL '2 days'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 2, 'Creación de E-commerce', 'Configuración de tienda online con Shopify/WooCommerce.', NOW() + INTERVAL '9 days'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 3, 'Marketing Digital', 'SEO, SEM, redes sociales y email marketing.', NOW() + INTERVAL '16 days'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 4, 'Finanzas para Emprendedores', 'Modelado financiero, pricing y gestión de flujo de caja.', NOW() + INTERVAL '23 days'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 5, 'Operaciones y Logística', 'Gestión de inventario, fulfillment y atención al cliente.', NOW() + INTERVAL '30 days'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 6, 'Pitch y Escalamiento', 'Cómo presentar tu proyecto y escalar el negocio.', NOW() + INTERVAL '37 days');
