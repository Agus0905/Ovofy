-- Update universities with 2026 data
TRUNCATE universities CASCADE;

INSERT INTO universities (nombre, location, cost_range, duration, modality, ranking, scholarships, strengths, logo_url) VALUES
('Universidad de Buenos Aires (UBA)', 'CABA y GBA', 'Gratuita', '5-7 años', 'Presencial', 1, 'Progresar, Becas UBA', 'Medicina, Derecho, Ingeniería', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Logo_UBA.png/800px-Logo_UBA.png'),
('Universidad Nacional de La Plata (UNLP)', 'La Plata', 'Gratuita', '5-7 años', 'Presencial', 2, 'UNLP, Comedor, Albergue', 'Artes, Ingeniería, Astronomía', 'https://unlp.edu.ar/wp-content/uploads/2022/10/logo-unlp.png'),
('Universidad de San Andrés (UdeSA)', 'Victoria y CABA', '$1.750.000 / mes', '4 años', 'Presencial', 3, 'Alberdi (100%), Líderes', 'Negocios, Economía, IA', 'https://www.udesa.edu.ar/sites/default/files/logo_udesa_0.png'),
('ITBA', 'Distrito Tecnológico (CABA)', '$1.620.000 / mes', '5 años', 'Presencial', 4, 'ITBA Mérito, Préstamos Honor', 'Ing. Industrial, Bioing., Informática', 'https://www.itba.edu.ar/wp-content/uploads/2017/10/logo-itba-300x160.png'),
('Universidad Torcuato Di Tella (UTDT)', 'CABA', '$1.500.000 / mes', '4 años', 'Presencial', 5, 'Di Tella (hasta 100%), Interior', 'Economía, Derecho, Arquitectura', 'https://www.utdt.edu/descargas/logo_utdt_negro.png'),
('Universidad Austral', 'Pilar y CABA', '$1.400.000 / mes', '4-6 años', 'Presencial', 6, 'Honor, Colegio Amigo', 'Medicina, Comunicación, Derecho', 'https://www.austral.edu.ar/v2/wp-content/uploads/2017/04/logo-austral.png'),
('UCA (Pontificia Universidad Católica)', 'Puerto Madero', '$1.100.000 / mes', '4-6 años', 'Presencial', 7, 'Estímulo, Social', 'Derecho, Psicología, Ingeniería', 'https://uca.edu.ar/sites/default/files/logo-uca.png'),
('UCEMA', 'CABA', '$1.300.000 / mes', '4 años', 'Presencial / Híbrida', 8, 'Mérito (100%), Joven Profesional', 'Finanzas, Economía, RRII', 'https://ucema.edu.ar/sites/default/files/logo-ucema-horizontal.png'),
('UADE', 'CABA', '$420.000 / mes', '4-5 años', 'Presencial y Virtual', 9, 'Honor, Deportiva, Fundación UADE', 'Negocios, Comunicación, Tecnología', 'https://www.uade.edu.ar/media/5034/uade-logo.png'),
('Universidad de Belgrano (UB)', 'CABA', '$650.000 / mes', '4-6 años', 'Presencial', 10, 'Mérito Académico, Egresados', 'Arquitectura, RRII, Psicología', 'https://www.ub.edu.ar/sites/default/files/logo_ub_0.png');

-- Re-link sample courses to correct university IDs
DELETE FROM courses;
INSERT INTO courses (university_id, nombre, carrera, descripcion, cupos_total, image_url) VALUES
((SELECT id FROM universities WHERE nombre = 'Universidad Austral'), 'Medicina en Acción', 'Medicina', 'Experimenta la medicina real en el Hospital Austral.', 25, 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800'),
((SELECT id FROM universities WHERE nombre = 'Universidad Torcuato Di Tella (UTDT)'), 'Economía y Futuro', 'Economía', 'Aprende las bases de la economía global.', 20, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'),
((SELECT id FROM universities WHERE nombre = 'ITBA'), 'Full Stack Engineering', 'Ingeniería Informática', 'Construye sistemas escalables desde cero.', 30, 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'),
((SELECT id FROM universities WHERE nombre = 'Universidad de Buenos Aires (UBA)'), 'Derecho Constitucional', 'Derecho', 'Debates sobre leyes y justicia.', 50, 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800');
