-- Create attendance table
CREATE TABLE attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  enrollment_id UUID NOT NULL REFERENCES enrollments(id) ON DELETE CASCADE,
  encuentro_id UUID NOT NULL REFERENCES encuentros(id) ON DELETE CASCADE,
  present BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(enrollment_id, encuentro_id)
);

-- Create materials table
CREATE TABLE materials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  url TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('pdf', 'video', 'link', 'document')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create forum_posts table
CREATE TABLE forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  contenido TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create professor_feedback table
CREATE TABLE professor_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  professor_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  feedback TEXT NOT NULL,
  private BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create student_feedback table
CREATE TABLE student_feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  liked_most TEXT NOT NULL,
  liked_least TEXT NOT NULL,
  professor_rating INTEGER NOT NULL CHECK (professor_rating >= 1 AND professor_rating <= 5),
  improvements TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE professor_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_feedback ENABLE ROW LEVEL SECURITY;

-- Attendance policies
CREATE POLICY "Students can view own attendance" ON attendance
  FOR SELECT USING (
    enrollment_id IN (
      SELECT id FROM enrollments WHERE student_id = auth.uid()
    )
  );

CREATE POLICY "University users can manage course attendance" ON attendance
  FOR ALL USING (
    encuentro_id IN (
      SELECT id FROM encuentros WHERE course_id IN (
        SELECT id FROM courses WHERE university_id IN (
          SELECT id FROM universities WHERE nombre = (
            SELECT nombre FROM profiles WHERE id = auth.uid() AND role = 'university'
          )
        )
      )
    )
  );

CREATE POLICY "Admins can manage all attendance" ON attendance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Materials policies
CREATE POLICY "Everyone can view materials" ON materials
  FOR SELECT USING (true);

CREATE POLICY "University users can manage own materials" ON materials
  FOR ALL USING (
    course_id IN (
      SELECT id FROM courses WHERE university_id IN (
        SELECT id FROM universities WHERE nombre = (
          SELECT nombre FROM profiles WHERE id = auth.uid() AND role = 'university'
        )
      )
    )
  );

CREATE POLICY "Admins can manage all materials" ON materials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Forum posts policies
CREATE POLICY "Everyone can view forum posts" ON forum_posts
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create forum posts" ON forum_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own posts" ON forum_posts
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all posts" ON forum_posts
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Professor feedback policies
CREATE POLICY "Students can view own feedback" ON professor_feedback
  FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Professors can manage feedback" ON professor_feedback
  FOR ALL USING (professor_id = auth.uid());

CREATE POLICY "University users can view course feedback" ON professor_feedback
  FOR SELECT USING (
    course_id IN (
      SELECT id FROM courses WHERE university_id IN (
        SELECT id FROM universities WHERE nombre = (
          SELECT nombre FROM profiles WHERE id = auth.uid() AND role = 'university'
        )
      )
    )
  );

CREATE POLICY "Admins can manage all feedback" ON professor_feedback
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Student feedback policies
CREATE POLICY "Everyone can view student feedback" ON student_feedback
  FOR SELECT USING (true);

CREATE POLICY "Students can create feedback" ON student_feedback
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT student_id FROM enrollments WHERE course_id = student_feedback.course_id
    )
  );

CREATE POLICY "Admins can manage all student feedback" ON student_feedback
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Create indexes
CREATE INDEX idx_attendance_enrollment_id ON attendance(enrollment_id);
CREATE INDEX idx_attendance_encuentro_id ON attendance(encuentro_id);
CREATE INDEX idx_materials_course_id ON materials(course_id);
CREATE INDEX idx_forum_posts_course_id ON forum_posts(course_id);
CREATE INDEX idx_forum_posts_user_id ON forum_posts(user_id);
CREATE INDEX idx_professor_feedback_course_id ON professor_feedback(course_id);
CREATE INDEX idx_professor_feedback_student_id ON professor_feedback(student_id);
CREATE INDEX idx_student_feedback_course_id ON student_feedback(course_id);

-- Insert sample materials
INSERT INTO materials (course_id, titulo, url, tipo) VALUES
-- Medicina en Acción
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 'Guía de Primeros Auxilios', 'https://example.com/materials/primeros-auxilios.pdf', 'pdf'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 'Video: Triage en Emergencias', 'https://example.com/materials/triage-video.mp4', 'video'),
((SELECT id FROM courses WHERE nombre = 'Medicina en Acción'), 'Código de Ética Médica', 'https://example.com/materials/etica-medica.pdf', 'pdf'),

-- Negocios Digitales
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 'Plantilla Business Model Canvas', 'https://example.com/materials/business-canvas.pdf', 'pdf'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 'Guía SEO para Principiantes', 'https://example.com/materials/guia-seo.pdf', 'pdf'),
((SELECT id FROM courses WHERE nombre = 'Negocios Digitales'), 'Calculadora de ROI Marketing', 'https://example.com/materials/roi-calculator.xlsx', 'document');
