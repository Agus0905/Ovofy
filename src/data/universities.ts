export interface University {
  name: string
  location: string
  cost_range: string
  duration: string
  modality: string
  ranking: string
  scholarships: string[]
  strengths: string[]
  study_plan: string[]
  careers_offered: string[]
}

export interface CareerComparison {
  university: string
  career: string
  duration: string
  cost: string
  requirements: string[]
  advantages: string[]
  job_prospects: string[]
}

export const universities: University[] = [
  {
    name: "Universidad Austral",
    location: "Pilar, Buenos Aires",
    cost_range: "$8.000 - $15.000 USD/año",
    duration: "5-6 años",
    modality: "Presencial",
    ranking: "#1 en Argentina",
    scholarships: ["Beca Excelencia Académica", "Beca Deportiva", "Beca Necesidad Económica"],
    strengths: ["Medicina", "Ingeniería", "Negocios"],
    study_plan: ["Semestral", "Sistema de créditos", "Intercambios internacionales"],
    careers_offered: ["Medicina", "Ingeniería", "Administración", "Derecho", "Comunicación"]
  },
  {
    name: "Universidad Di Tella",
    location: "Buenos Aires",
    cost_range: "$10.000 - $18.000 USD/año",
    duration: "4-6 años",
    modality: "Presencial",
    ranking: "#2 en Argentina",
    scholarships: ["Beca Meritocrática", "Beca Investigación", "Beca Internacional"],
    strengths: ["Economía", "Ciencias Sociales", "Diseño"],
    study_plan: ["Cuatrimestral", "Seminarios intensivos", "Programa de honores"],
    careers_offered: ["Economía", "Diseño Gráfico", "Ciencia Política", "Relaciones Internacionales"]
  },
  {
    name: "Universidad de San Andrés",
    location: "Victoria, Buenos Aires",
    cost_range: "$12.000 - $20.000 USD/año",
    duration: "4-5 años",
    modality: "Presencial",
    ranking: "#3 en Argentina",
    scholarships: ["Beca San Andrés", "Beca Líderes", "Beca Emprendedores"],
    strengths: ["Negocios", "Economía", "Relaciones Internacionales"],
    study_plan: ["Semestral", "Casos prácticos", "Programa de mentorías"],
    careers_offered: ["Administración", "Economía", "Marketing", "Relaciones Internacionales"]
  },
  {
    name: "UCEMA",
    location: "Buenos Aires",
    cost_range: "$6.000 - $12.000 USD/año",
    duration: "4-5 años",
    modality: "Presencial y Virtual",
    ranking: "#4 en Argentina",
    scholarships: ["Beca Académica", "Beca Economía", "Beca Excelencia"],
    strengths: ["Economía", "Finanzas", "Negocios"],
    study_plan: ["Cuatrimestral", "Horarios nocturnos", "Modalidad híbrida"],
    careers_offered: ["Economía", "Finanzas", "Administración", "Contabilidad"]
  },
  {
    name: "UADE",
    location: "Buenos Aires",
    cost_range: "$7.000 - $14.000 USD/año",
    duration: "4-5 años",
    modality: "Presencial",
    ranking: "#5 en Argentina",
    scholarships: ["Beca UADE", "Beca Deportiva", "Beca Cultural"],
    strengths: ["Diseño", "Comunicación", "Negocios"],
    study_plan: ["Cuatrimestral", "Talleres prácticos", "Proyectos finales"],
    careers_offered: ["Diseño Gráfico", "Marketing", "Comunicación", "Administración"]
  },
  {
    name: "Universidad de Buenos Aires (UBA)",
    location: "Buenos Aires",
    cost_range: "Gratuita + $500 USD/materia",
    duration: "5-7 años",
    modality: "Presencial",
    ranking: "#6 en Argentina",
    scholarships: ["Beca UBA", "Beca Investigación", "Beca Extensión"],
    strengths: ["Medicina", "Ingeniería", "Derecho", "Ciencias Exactas"],
    study_plan: ["Anual", "Sistema de correlativas", "Exámenes finales"],
    careers_offered: ["Medicina", "Ingeniería", "Derecho", "Arquitectura", "Psicología"]
  },
  {
    name: "Universidad del Palermo (UP)",
    location: "Buenos Aires",
    cost_range: "$8.000 - $16.000 USD/año",
    duration: "4-6 años",
    modality: "Presencial",
    ranking: "#7 en Argentina",
    scholarships: ["Beca UP", "Beca Creatividad", "Beca Internacional"],
    strengths: ["Diseño", "Comunicación", "Arte"],
    study_plan: ["Cuatrimestral", "Proyectos integradores", "Workshops industriales"],
    careers_offered: ["Diseño", "Comunicación", "Arte Digital", "Fotografía"]
  },
  {
    name: "Universidad Católica Argentina (UCA)",
    location: "Buenos Aires",
    cost_range: "$9.000 - $17.000 USD/año",
    duration: "5-6 años",
    modality: "Presencial",
    ranking: "#8 en Argentina",
    scholarships: ["Beca UCA", "Beca Social", "Beca Académica"],
    strengths: ["Derecho", "Ciencias Sociales", "Filosofía"],
    study_plan: ["Semestral", "Formación humanista", "Servicio comunitario"],
    careers_offered: ["Derecho", "Psicología", "Filosofía", "Trabajo Social"]
  },
  {
    name: "Instituto Tecnológico de Buenos Aires (ITBA)",
    location: "Buenos Aires",
    cost_range: "$11.000 - $19.000 USD/año",
    duration: "5-6 años",
    modality: "Presencial",
    ranking: "#9 en Argentina",
    scholarships: ["Beca ITBA", "Beca Ingeniería", "Beca Innovación"],
    strengths: ["Ingeniería", "Tecnología", "Ciencias Exactas"],
    study_plan: ["Semestral", "Laboratorios equipados", "Proyectos de investigación"],
    careers_offered: ["Ingeniería Mecánica", "Ingeniería Electrónica", "Ingeniería Química", "Ingeniería Industrial"]
  },
  {
    name: "Fundación Universidad de Ciencias de la Educación (FUCE)",
    location: "Buenos Aires",
    cost_range: "$5.000 - $10.000 USD/año",
    duration: "4-5 años",
    modality: "Presencial",
    ranking: "#10 en Argentina",
    scholarships: ["Beca FUCE", "Beca Docente", "Beca Investigación"],
    strengths: ["Educación", "Pedagogía", "Psicopedagogía"],
    study_plan: ["Cuatrimestral", "Prácticas docentes", "Observación de clases"],
    careers_offered: ["Educación", "Psicopedagogía", "Letras", "Historia"]
  },
  {
    name: "Universidad Tecnológica Nacional (UTN)",
    location: "Múltiples sedes",
    cost_range: "$3.000 - $8.000 USD/año",
    duration: "5-6 años",
    modality: "Presencial",
    ranking: "#11 en Argentina",
    scholarships: ["Beca UTN", "Beca Ingeniería", "Beca Regional"],
    strengths: ["Ingeniería", "Tecnología", "Producción"],
    study_plan: ["Anual", "Sistema de talleres", "Prácticas profesionales"],
    careers_offered: ["Ingeniería Civil", "Ingeniería Eléctrica", "Ingeniería Mecánica", "Ingeniería Química", "Ingeniería de Sistemas"]
  },
  {
    name: "Universidad Siglo 21",
    location: "Buenos Aires",
    cost_range: "$6.000 - $12.000 USD/año",
    duration: "4-5 años",
    modality: "Virtual y Presencial",
    ranking: "#12 en Argentina",
    scholarships: ["Beca Siglo 21", "Beca Online", "Beca Emprendedores"],
    strengths: ["Marketing", "Negocios", "Comunicación"],
    study_plan: ["Cuatrimestral", "Plataforma online", "Clases grabadas"],
    careers_offered: ["Marketing", "Administración", "Comunicación", "RRHH"]
  },
  {
    name: "Universidad del Salvador (USAL)",
    location: "Buenos Aires",
    cost_range: "$8.000 - $15.000 USD/año",
    duration: "5-6 años",
    modality: "Presencial",
    ranking: "#13 en Argentina",
    scholarships: ["Beca USAL", "Beca Social", "Beca Religiosa"],
    strengths: ["Derecho", "Medicina", "Ciencias Sociales"],
    study_plan: ["Semestral", "Formación integral", "Servicio comunitario"],
    careers_offered: ["Derecho", "Medicina", "Psicología", "Trabajo Social"]
  },
  {
    name: "Universidad de Ciencias Empresariales y Sociales (UCES)",
    location: "Buenos Aires",
    cost_range: "$7.000 - $13.000 USD/año",
    duration: "4-5 años",
    modality: "Presencial y Virtual",
    ranking: "#14 en Argentina",
    scholarships: ["Beca UCES", "Beca Empresarial", "Beca Excelencia"],
    strengths: ["Negocios", "Marketing", "Economía"],
    study_plan: ["Cuatrimestral", "Casos de estudio", "Simulaciones empresariales"],
    careers_offered: ["Administración", "Marketing", "Economía", "RRHH"]
  },
  {
    name: "Universidad Abierta Interamericana (UAI)",
    location: "Buenos Aires",
    cost_range: "$6.000 - $11.000 USD/año",
    duration: "4-5 años",
    modality: "Presencial y Virtual",
    ranking: "#15 en Argentina",
    scholarships: ["Beca UAI", "Beca Flexible", "Beca Internacional"],
    strengths: ["Psicología", "Educación", "Negocios"],
    study_plan: ["Cuatrimestral", "Horarios flexibles", "Tutorías personalizadas"],
    careers_offered: ["Psicología", "Educación", "Administración", "Comunicación"]
  },
  {
    name: "Universidad Nacional de La Plata (UNLP)",
    location: "La Plata, Buenos Aires",
    cost_range: "Gratuita + $400 USD/materia",
    duration: "5-7 años",
    modality: "Presencial",
    ranking: "#16 en Argentina",
    scholarships: ["Beca UNLP", "Beca Investigación", "Beca Extensión"],
    strengths: ["Ingeniería", "Arquitectura", "Ciencias Exactas"],
    study_plan: ["Anual", "Sistema de correlativas", "Trabajos prácticos"],
    careers_offered: ["Ingeniería", "Arquitectura", "Informática", "Física", "Matemática"]
  }
]

export const careerComparisons: CareerComparison[] = [
  // Derecho
  {
    university: "Universidad de Buenos Aires (UBA)",
    career: "Derecho",
    duration: "6 años",
    cost: "Gratuito + $500 USD/materia",
    requirements: ["Secundario completo", "Examen de ingreso"],
    advantages: ["Prestigio nacional", "Amplia red de egresados", "Gratuidad"],
    job_prospects: ["Abogado", "Juez", "Fiscal", "Asesor legal"]
  },
  {
    university: "Universidad Católica Argentina (UCA)",
    career: "Derecho",
    duration: "5-6 años",
    cost: "$9.000 - $17.000 USD/año",
    requirements: ["Secundario completo", "Curso de nivelación"],
    advantages: ["Enfoque humanista", "Red internacional", "Servicio comunitario"],
    job_prospects: ["Abogado", "Notario", "Asesor corporativo", "Diplomático"]
  },
  // Medicina
  {
    university: "Universidad Austral",
    career: "Medicina",
    duration: "6 años",
    cost: "$8.000 - $15.000 USD/año",
    requirements: ["Secundario completo", "Ciclo de nivelación", "Examen de ingreso"],
    advantages: ["Hospital propio", "Investigación médica", "Intercambios"],
    job_prospects: ["Médico clínico", "Cirujano", "Investigador", "Médico especialista"]
  },
  {
    university: "Universidad del Salvador (USAL)",
    career: "Medicina",
    duration: "6 años",
    cost: "$8.000 - $15.000 USD/año",
    requirements: ["Secundario completo", "Biológica", "Química"],
    advantages: ["Formación integral", "Servicio comunitario", "Red hospitalaria"],
    job_prospects: ["Médico general", "Pediatra", "Cardiólogo", "Investigador médico"]
  },
  // Ingeniería
  {
    university: "Universidad Tecnológica Nacional (UTN)",
    career: "Ingeniería",
    duration: "5-6 años",
    cost: "$3.000 - $8.000 USD/año",
    requirements: ["Secundario completo", "Matemática avanzada", "Física"],
    advantages: ["Múltiples especialidades", "Salidas laborales", "Prestigio nacional"],
    job_prospects: ["Ingeniero civil", "Ingeniero industrial", "Ingeniero de sistemas", "Consultor técnico"]
  },
  {
    university: "Instituto Tecnológico de Buenos Aires (ITBA)",
    career: "Ingeniería",
    duration: "5-6 años",
    cost: "$11.000 - $19.000 USD/año",
    requirements: ["Secundario completo", "Ciencias exactas", "Examen de ingreso"],
    advantages: ["Laboratorios modernos", "Investigación aplicada", "Red de empresas"],
    job_prospects: ["Ingeniero especialista", "Director técnico", "Investigador", "Emprendedor tecnológico"]
  },
  // Economía
  {
    university: "Universidad Di Tella",
    career: "Economía",
    duration: "4-5 años",
    cost: "$10.000 - $18.000 USD/año",
    requirements: ["Secundario completo", "Matemática", "Examen de ingreso"],
    advantages: ["Enfoque cuantitativo", "Programa de honores", "Red internacional"],
    job_prospects: ["Economista", "Analista financiero", "Consultor económico", "Investigador"]
  },
  {
    university: "UCEMA",
    career: "Economía",
    duration: "4-5 años",
    cost: "$6.000 - $12.000 USD/año",
    requirements: ["Secundario completo", "Matemática"],
    advantages: ["Horarios flexibles", "Modalidad híbrida", "Enfoque práctico"],
    job_prospects: ["Analista económico", "Asesor financiero", "Consultor de negocios", "Economista corporativo"]
  },
  // Diseño
  {
    university: "Universidad de Palermo (UP)",
    career: "Diseño",
    duration: "4-5 años",
    cost: "$8.000 - $16.000 USD/año",
    requirements: ["Secundario completo", "Portfolio", "Entrevista"],
    advantages: ["Workshops industriales", "Proyectos reales", "Red creativa"],
    job_prospects: ["Diseñador gráfico", "Director de arte", "Diseñador UX/UI", "Creativo publicitario"]
  },
  {
    university: "UADE",
    career: "Diseño",
    duration: "4-5 años",
    cost: "$7.000 - $14.000 USD/año",
    requirements: ["Secundario completo", "Prueba de aptitud", "Portfolio"],
    advantages: ["Talleres prácticos", "Proyectos finales", "Enfoque comercial"],
    job_prospects: ["Diseñador industrial", "Diseñador de moda", "Director creativo", "Emprendedor creativo"]
  },
  // Psicología
  {
    university: "Universidad Católica Argentina (UCA)",
    career: "Psicología",
    duration: "5 años",
    cost: "$9.000 - $17.000 USD/año",
    requirements: ["Secundario completo", "Biología", "Examen psicotécnico"],
    advantages: ["Formación humanista", "Servicio comunitario", "Red profesional"],
    job_prospects: ["Psicólogo clínico", "Psicólogo organizacional", "Investigador", "Psicólogo educativo"]
  },
  {
    university: "Universidad Abierta Interamericana (UAI)",
    career: "Psicología",
    duration: "4-5 años",
    cost: "$6.000 - $11.000 USD/año",
    requirements: ["Secundario completo", "Ciencias sociales"],
    advantages: ["Horarios flexibles", "Tutorías personalizadas", "Modalidad híbrida"],
    job_prospects: ["Psicólogo clínico", "Psicólogo infantil", "Orientador vocacional", "Consultor organizacional"]
  },
  // Marketing
  {
    university: "Universidad Siglo 21",
    career: "Marketing",
    duration: "4 años",
    cost: "$6.000 - $12.000 USD/año",
    requirements: ["Secundario completo", "Interés en negocios"],
    advantages: ["Plataforma online", "Clases grabadas", "Enfoque digital"],
    job_prospects: ["Marketing digital", "Brand manager", "Community manager", "Analista de marketing"]
  },
  {
    university: "Universidad de Ciencias Empresariales y Sociales (UCES)",
    career: "Marketing",
    duration: "4 años",
    cost: "$7.000 - $13.000 USD/año",
    requirements: ["Secundario completo", "Interés en comunicación"],
    advantages: ["Simulaciones empresariales", "Casos de estudio", "Red de empresas"],
    job_prospects: ["Director de marketing", "Analista de mercado", "Consultor de branding", "Especialista en marketing digital"]
  },
  // Arquitectura
  {
    university: "Universidad de Buenos Aires (UBA)",
    career: "Arquitectura",
    duration: "6 años",
    cost: "Gratuito + $500 USD/materia",
    requirements: ["Secundario completo", "Dibujo técnico", "Examen de ingreso"],
    advantages: ["Prestigio nacional", "Talleres intensivos", "Red de egresados"],
    job_prospects: ["Arquitecto", "Urbanista", "Diseñador de interiores", "Consultor de arquitectura"]
  },
  {
    university: "Universidad Nacional de La Plata (UNLP)",
    career: "Arquitectura",
    duration: "6 años",
    cost: "Gratuito + $400 USD/materia",
    requirements: ["Secundario completo", "Dibujo", "Geometría"],
    advantages: ["Trabajos prácticos", "Laboratorios equipados", "Enfoque sustentable"],
    job_prospects: ["Arquitecto", "Urbanista", "Diseñador sustentable", "Planificador urbano"]
  }
]
