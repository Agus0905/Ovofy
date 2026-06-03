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
    name: "Universidad de Buenos Aires (UBA)",
    location: "CABA y sedes GBA",
    cost_range: "Gratuita",
    duration: "5-7 años (inc. CBC)",
    modality: "Presencial",
    ranking: "#1 en Argentina | #84 Global (QS 2026)",
    scholarships: ["Beca Progresar", "Becas UBA", "Beca Ayuda Económica"],
    strengths: ["Medicina", "Derecho", "Ingeniería", "Ciencias Exactas"],
    study_plan: ["Ciclo Básico Común (CBC)", "Orientación profesional", "Prácticas pre-profesionales"],
    careers_offered: ["Medicina", "Derecho", "Arquitectura", "Ingeniería Informática", "Psicología"]
  },
  {
    name: "Universidad Nacional de La Plata (UNLP)",
    location: "La Plata, Buenos Aires",
    cost_range: "Gratuita",
    duration: "5-7 años",
    modality: "Presencial",
    ranking: "#2 en Argentina | #458 Global (QS 2026)",
    scholarships: ["Beca UNLP", "Beca de Comedor", "Beca de Albergue"],
    strengths: ["Artes y Humanidades", "Ingeniería", "Astronomía", "Informática"],
    study_plan: ["Ciclo introductorio", "Sistemas de correlativas", "Trabajo final/Tesis"],
    careers_offered: ["Informática", "Arquitectura", "Artes Plásticas", "Física", "Veterinaria"]
  },
  {
    name: "Universidad de San Andrés (UdeSA)",
    location: "Victoria y CABA",
    cost_range: "$1.750.000 / mes (Promedio 2026)",
    duration: "4 años",
    modality: "Presencial",
    ranking: "#1 Privada en Reputación (QS)",
    scholarships: ["Beca Juan Bautista Alberdi (100%)", "Beca Líderes", "Beca Meritocrática"],
    strengths: ["Negocios", "Economía", "Relaciones Internacionales", "Inteligencia Artificial"],
    study_plan: ["Ciclo de Fundamentos", "Orientaciones", "Capstone Project"],
    careers_offered: ["Negocios Digitales", "Economía", "IA y Robótica", "Ciencia de Datos", "Relaciones Internacionales"]
  },
  {
    name: "ITBA",
    location: "Distrito Tecnológico (CABA)",
    cost_range: "$1.620.000 / mes (Ingeniería 2026)",
    duration: "5 años",
    modality: "Presencial",
    ranking: "#1 en Tecnología y Empleabilidad",
    scholarships: ["Beca ITBA (Mérito)", "Becas del Sector Privado", "Préstamos de Honor"],
    strengths: ["Ingeniería Industrial", "Bioingeniería", "Ingeniería Informática"],
    study_plan: ["Ingreso nivelatorio", "Laboratorios intensivos", "Práctica profesional supervisada"],
    careers_offered: ["Ingeniería Informática", "Bioingeniería", "Ingeniería Industrial", "Ciencia de Datos"]
  },
  {
    name: "Universidad Torcuato Di Tella (UTDT)",
    location: "CABA",
    cost_range: "$1.500.000 / mes (Grado 2026)",
    duration: "4 años",
    modality: "Presencial",
    ranking: "Top 3 Privadas (QS)",
    scholarships: ["Becas Di Tella (hasta 100%)", "Becas del Interior", "Becas Colegio Público"],
    strengths: ["Economía", "Derecho", "Arquitectura", "Estudios Internacionales"],
    study_plan: ["Programa de Honores", "Seminarios interdisciplinarios", "Intercambios"],
    careers_offered: ["Economía", "Arquitectura", "Derecho", "Ciencia Política", "Diseño"]
  },
  {
    name: "Universidad Austral",
    location: "Pilar, Buenos Aires y CABA",
    cost_range: "$1.400.000 / mes (Promedio 2026)",
    duration: "4-6 años",
    modality: "Presencial",
    ranking: "#25 Regional (QS LATAM)",
    scholarships: ["Beca de Honor", "Beca Colegio Amigo", "Convenios Regionales"],
    strengths: ["Medicina", "Comunicación", "Derecho", "Agronegocios"],
    study_plan: ["Tutorías personalizadas", "Hospital Austral (Prácticas)", "Enfoque humanista"],
    careers_offered: ["Medicina", "Comunicación Social", "Derecho", "Ingeniería Industrial"]
  },
  {
    name: "UCA (Pontificia Universidad Católica)",
    location: "Puerto Madero y sedes",
    cost_range: "$1.100.000 / mes (Promedio 2026)",
    duration: "4-6 años",
    modality: "Presencial",
    ranking: "#517 Global (QS 2026)",
    scholarships: ["Beca de Estímulo", "Becas por convenio colegios", "Beca Social"],
    strengths: ["Derecho", "Psicología", "Ingeniería", "Filosofía"],
    study_plan: ["Ciclo de formación integral", "Módulos de especialización", "Ética profesional"],
    careers_offered: ["Derecho", "Psicología", "Ingeniería Ambiental", "Ciencias Políticas"]
  },
  {
    name: "UCEMA",
    location: "CABA",
    cost_range: "$1.300.000 / mes (2026)",
    duration: "4 años",
    modality: "Presencial / Híbrida",
    ranking: "Referente en Finanzas y Economía",
    scholarships: ["Beca al Mérito (hasta 100%)", "Beca Joven Profesional", "Beca Mujer en Negocios"],
    strengths: ["Finanzas", "Economía", "Relaciones Internacionales"],
    study_plan: ["Semestres de especialización", "Networking empresarial", "Pasantías"],
    careers_offered: ["Economía", "Finanzas", "Administración de Empresas", "Marketing"]
  },
  {
    name: "UADE",
    location: "CABA (Sede Monserrat)",
    cost_range: "$420.000 / mes (Referencia 2026)",
    duration: "4-5 años",
    modality: "Presencial y Virtual",
    ranking: "#1 en Conexión con Empresas",
    scholarships: ["Beca de Honor", "Beca Deportiva", "Beca Fundación UADE"],
    strengths: ["Negocios", "Comunicación", "Tecnología", "Artes Digitales"],
    study_plan: ["Learning by doing", "Laboratorios UADE Labs", "Proyecto final de carrera"],
    careers_offered: ["Administración de Empresas", "Marketing", "Diseño Gráfico", "Multimedia"]
  },
  {
    name: "Universidad de Belgrano (UB)",
    location: "CABA (Belgrano)",
    cost_range: "$650.000 / mes (Referencia 2026)",
    duration: "4-6 años",
    modality: "Presencial",
    ranking: "Puesto 951-1000 Global (QS)",
    scholarships: ["Becas por mérito académico", "Descuentos para egresados", "Convenios"],
    strengths: ["Arquitectura", "Relaciones Internacionales", "Psicología", "Hotelería"],
    study_plan: ["Talleres prácticos", "Intercambios de doble titulación", "Práctica profesional"],
    careers_offered: ["Arquitectura", "Relaciones Internacionales", "Abogacía", "Psicología"]
  }
]

export const careerComparisons: CareerComparison[] = [
  {
    university: "Universidad de Buenos Aires (UBA)",
    career: "Derecho",
    duration: "6 años",
    cost: "Gratuito",
    requirements: ["CBC aprobado", "Secundario completo"],
    advantages: ["Prestigio histórico", "Red de contactos inmensa", "Acceso gratuito"],
    job_prospects: ["Poder Judicial", "Grandes Estudios Jurídicos", "Docencia Universitaria"]
  },
  {
    university: "Universidad Torcuato Di Tella (UTDT)",
    career: "Derecho",
    duration: "4 años",
    cost: "$1.500.000 / mes",
    requirements: ["Examen de ingreso", "Entrevista personal"],
    advantages: ["Enfoque global", "Programa de Honores", "Excelente empleabilidad privada"],
    job_prospects: ["Estudios Corporativos", "Organismos Internacionales", "Asesoría Legal"]
  },
  {
    university: "ITBA",
    career: "Ingeniería Informática",
    duration: "5 años",
    cost: "$1.620.000 / mes",
    requirements: ["Examen de ingreso exigente", "Nivel avanzado de física/matemática"],
    advantages: ["Laboratorios de vanguardia", "Conexión directa con Big Tech", "Fuerte enfoque en emprendimiento"],
    job_prospects: ["CTO", "Software Architect", "Data Scientist", "Founder"]
  },
  {
    university: "UADE",
    career: "Marketing",
    duration: "4 años",
    cost: "$420.000 / mes",
    requirements: ["Secundario completo", "Curso de ingreso"],
    advantages: ["UADE Labs (Cámara Gessell)", "Enfoque 100% práctico", "Bolsa de empleo activa"],
    job_prospects: ["Brand Manager", "Growth Hacker", "Analista de Mercado", "Agencias de Publicidad"]
  }
]
