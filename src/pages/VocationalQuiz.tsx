import { useState } from 'react'
import { CheckCircle2, ChevronRight, Sparkles, ArrowRight } from 'lucide-react'
import { QuizIntroduction } from '../components/quiz/QuizIntroduction'

export function VocationalQuiz() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
  const [showResults, setShowResults] = useState(false)

  // Psychometric Matrix: 12 Forced-Choice Questions
  const questions = [
    { id: 1, question: "¿Qué preferirías hacer en un taller técnico?", options: [{ text: "Reparar un motor o circuito eléctrico.", type: "R" }, { text: "Investigar por qué falla una reacción química.", type: "I" }] },
    { id: 2, question: "Si tuvieras que organizar un evento masivo:", options: [{ text: "Me encargaría de cuidar y atender a los asistentes.", type: "S" }, { text: "Me encargaría de buscar patrocinadores y dirigir al equipo.", type: "E" }] },
    { id: 3, question: "En tu tiempo libre, preferís:", options: [{ text: "Crear contenido digital, escribir o dibujar.", type: "A" }, { text: "Organizar tus finanzas personales o archivos.", type: "C" }] },
    { id: 4, question: "Al enfrentar un problema complejo:", options: [{ text: "Analizo datos y busco evidencia científica.", type: "I" }, { text: "Busco una herramienta y trato de arreglarlo físicamente.", type: "R" }] },
    { id: 5, question: "En un entorno laboral ideal:", options: [{ text: "Sería el dueño de la empresa o el gerente de ventas.", type: "E" }, { text: "Sería el responsable de que los procesos sean exactos.", type: "C" }] },
    { id: 6, question: "¿Qué actividad te genera más satisfacción?", options: [{ text: "Enseñar a alguien algo que no entiende.", type: "S" }, { text: "Presentar una idea visualmente atractiva.", type: "A" }] },
    { id: 7, question: "Si tuvieras que trabajar en un proyecto de salud:", options: [{ text: "Estaría en el laboratorio analizando muestras.", type: "I" }, { text: "Estaría atendiendo pacientes directamente.", type: "S" }] },
    { id: 8, question: "¿Cómo preferís recibir instrucciones?", options: [{ text: "A través de demostraciones prácticas.", type: "R" }, { text: "Con un protocolo paso a paso por escrito.", type: "C" }] },
    { id: 9, question: "Si estuvieras en una agencia creativa:", options: [{ text: "Diseñaría la identidad visual del producto.", type: "A" }, { text: "Operaría los equipos técnicos de impresión o video.", type: "R" }] },
    { id: 10, question: "En un equipo de investigación:", options: [{ text: "Me enfocaría en descubrir nuevas teorías.", type: "I" }, { text: "Me enfocaría en aplicar las normas de control de calidad.", type: "C" }] },
    { id: 11, question: "¿Qué tipo de reconocimiento valorás más?", options: [{ text: "Haber ayudado a transformar la vida de alguien.", type: "S" }, { text: "Haber creado una obra única u original.", type: "A" }] },
    { id: 12, question: "Si tuvieras que construir un negocio:", options: [{ text: "Construiría el producto con mis propias manos.", type: "R" }, { text: "Gestionaría las ventas y la expansión del mercado.", type: "E" }] }
  ]

  const handleAnswer = (type: string) => {
    setScores(prev => ({ ...prev, [type]: prev[type as keyof typeof prev] + 1 }))
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 })
    setShowResults(false)
    setHasStarted(false)
  }

  const handleDownloadPDF = () => {
    window.print()
  }

  const getFullReport = () => {
    const percentages = Object.entries(scores).map(([type, score]) => ({
      type,
      label: type === 'R' ? 'Realista' : type === 'I' ? 'Investigador' : type === 'A' ? 'Artístico' : type === 'S' ? 'Social' : type === 'E' ? 'Emprendedor' : 'Convencional',
      value: Math.round((score / 4) * 100)
    }))

    const sorted = [...percentages].sort((a, b) => b.value - a.value)
    const top2 = sorted[0].type + sorted[1].type
    const hollandCode = sorted.slice(0, 3).map(p => p.type).join('')

    const careerDatabase: Record<string, any[]> = {
      RI: [{ title: "Ingeniería Aeroespacial", match: 98, desc: "Resolución de problemas técnicos complejos mediante el método científico." }, { title: "Geología Técnica", match: 88, desc: "Análisis de suelos y materiales en entornos de campo reales." }, { title: "Cirugía Médica", match: 84, desc: "Alta destreza manual combinada con rigor investigativo biológico." }],
      RA: [{ title: "Arquitectura", match: 96, desc: "Diseño estético aplicado a estructuras físicas y materiales reales." }, { title: "Diseño Industrial", match: 92, desc: "Creación de objetos funcionales combinando arte y ergonomía técnica." }, { title: "Moda y Sastrería", match: 82, desc: "Habilidades manuales aplicadas a la expresión creativa visual." }],
      RS: [{ title: "Kinesiología", match: 95, desc: "Uso de técnicas físicas para ayudar en la rehabilitación de personas." }, { title: "Ingeniería Ambiental", match: 89, desc: "Acción técnica directa para la protección del bienestar social y natural." }, { title: "Gastronomía", match: 84, desc: "Trabajo manual de alta precisión con un fuerte componente de servicio." }],
      RE: [{ title: "Gestión de Construcción", match: 97, desc: "Liderazgo de equipos en entornos de obras y proyectos tangibles." }, { title: "Ingeniería en Logística", match: 91, desc: "Optimización de flujos físicos con visión de negocio estratégica." }, { title: "Piloto Comercial", match: 87, desc: "Operación de sistemas técnicos en entornos de alta responsabilidad." }],
      RC: [{ title: "Ingeniería Civil", match: 98, desc: "Planificación estructurada de infraestructuras con bases técnicas sólidas." }, { title: "Automatización Industrial", match: 93, desc: "Programación de sistemas físicos bajo protocolos de control estrictos." }, { title: "Técnico en Ciberseguridad", match: 86, desc: "Mantenimiento preventivo de sistemas digitales con foco en la precisión." }],
      IA: [{ title: "Psicología Forense", match: 96, desc: "Investigación del comportamiento humano con una mirada interpretativa." }, { title: "Bioinformática", match: 91, desc: "Uso de la tecnología para descubrir soluciones biológicas innovadoras." }, { title: "Antropología", match: 88, desc: "Estudio científico de la cultura con fuerte componente de abstracción." }],
      IS: [{ title: "Medicina Clínica", match: 98, desc: "Diagnóstico científico orientado exclusivamente al bienestar del paciente." }, { title: "Psiquiatría", match: 94, desc: "Análisis biológico aplicado a la salud mental y el apoyo social." }, { title: "Epidemiología", match: 89, desc: "Investigación de enfermedades para proteger a grandes comunidades." }],
      IE: [{ title: "Investigación de Mercados", match: 95, desc: "Uso de datos analíticos para la toma de decisiones corporativas." }, { title: "Gestión de Biotecnología", match: 90, desc: "Liderazgo de proyectos científicos hacia la rentabilidad comercial." }, { title: "Economía Analítica", match: 86, desc: "Modelado de datos financieros con rigor investigativo." }],
      IC: [{ title: "Ciencia de Datos", match: 99, desc: "Máximo rigor analítico aplicado a grandes volúmenes de datos estructurados." }, { title: "Astronomía", match: 92, desc: "Búsqueda de leyes universales mediante el cálculo preciso y metódico." }, { title: "Ingeniería en Software", match: 88, desc: "Desarrollo de lógica abstracta bajo sistemas de organización rigurosos." }],
      AS: [{ title: "Terapia Ocupacional", match: 97, desc: "Uso de la creatividad y actividades para la rehabilitación humana." }, { title: "Diseño Gráfico / Comunicación", match: 93, desc: "Expresión visual orientada a transmitir mensajes a la sociedad." }, { title: "Educación Artística", match: 89, desc: "Formación de otros a través de métodos pedagógicos creativos." }],
      AE: [{ title: "Dirección de Cine", match: 96, desc: "Visión creativa liderando grandes equipos y presupuestos de producción." }, { title: "Marketing Creativo", match: 92, desc: "Persuasión comercial basada en la innovación estética y narrativa." }, { title: "Publicidad", match: 88, desc: "Influencia social mediante piezas de diseño y comunicación disruptiva." }],
      AC: [{ title: "Edición Audiovisual", match: 94, desc: "Creatividad visual aplicada a procesos de post-producción metódicos." }, { title: "Maquetación Editorial", match: 89, desc: "Organización estética de información bajo reglas de diseño estrictas." }, { title: "Fotografía de Producto", match: 85, desc: "Arte visual que requiere un control técnico y ordenado del entorno." }],
      SE: [{ title: "Relaciones Internacionales", match: 98, desc: "Gestión de intereses y liderazgo con un foco en el bienestar global." }, { title: "Dirección de RRHH", match: 95, desc: "Liderazgo organizacional enfocado en el desarrollo del capital humano." }, { title: "Derecho Laboral", match: 91, desc: "Defensa de derechos de personas en marcos corporativos competitivos." }],
      SC: [{ title: "Trabajo Social / Administración", match: 96, desc: "Ayuda comunitaria gestionada a través de procesos institucionales." }, { title: "Pedagogía Escolar", match: 92, desc: "Enseñanza y apoyo estudiantil bajo estructuras curriculares claras." }, { title: "Enfermería de Gestión", match: 88, desc: "Cuidado del paciente con alta responsabilidad en protocolos clínicos." }],
      EC: [{ title: "Finanzas y Banca", match: 99, desc: "Liderazgo en mercados económicos bajo regulaciones y datos exactos." }, { title: "Auditoría Corporativa", match: 94, desc: "Control de procesos legales y contables para el éxito empresarial." }, { title: "Actuario", match: 90, desc: "Gestión de riesgos económicos basada en el cálculo y la precisión." }]
    }

    const recommendations = careerDatabase[top2] || careerDatabase[top2.split('').reverse().join('')] || careerDatabase['EC']

    return {
      hollandCode,
      dominantProfile: sorted[0].label + "-" + sorted[1].label,
      percentages: percentages,
      recommendations
    }
  }

  const report = showResults ? getFullReport() : null

  if (!hasStarted) {
    return <QuizIntroduction onStart={() => setHasStarted(true)} />
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20 transition-colors duration-500">
      <div className={`mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${showResults ? 'max-w-6xl' : 'max-w-3xl'}`}>
        {!showResults ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-amber font-bold uppercase tracking-widest text-xs">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div key={i} className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i <= currentQuestion ? 'bg-amber' : 'bg-dark-brown/10 dark:bg-white/10'}`} />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-dark-brown/5 dark:border-white/5">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-brown dark:text-white mb-10 leading-tight">
                {questions[currentQuestion].question}
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button key={index} onClick={() => handleAnswer(option.type)} className="group px-8 py-6 bg-warm-cream/50 dark:bg-[#0f0e0c] border-2 border-transparent rounded-2xl text-dark-brown dark:text-white hover:border-amber hover:bg-white dark:hover:bg-[#1a1814] transition-all text-left flex items-center justify-between">
                    <span className="text-lg font-medium">{option.text}</span>
                    <ChevronRight className="w-5 h-5 text-amber opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up space-y-8 print-container">
            <div className="bg-white dark:bg-[#1a1814] rounded-[3rem] p-12 md:p-16 shadow-2xl border border-dark-brown/5 dark:border-white/5 relative overflow-hidden text-center print-card">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-[100px] -mr-32 -mt-32 no-print"></div>
              <div className="relative z-10">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-subtle no-print">
                  <CheckCircle2 className="w-12 h-12 text-green-500" />
                </div>
                <h2 className="text-4xl md:text-6xl font-serif font-bold text-dark-brown dark:text-white mb-6">Informe Vocacional</h2>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 mb-4">
                  <div className="px-6 py-2 bg-amber text-white rounded-full text-lg font-bold uppercase tracking-[0.2em] shadow-lg shadow-amber/20">Código: {report?.hollandCode}</div>
                  <div className="text-2xl md:text-3xl text-dark-brown/80 dark:text-gray-200 font-serif italic">Perfil <span className="text-amber font-bold not-italic">{report?.dominantProfile}</span></div>
                </div>
                <p className="text-dark-brown/60 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed italic">Análisis psicométrico experto basado en el Modelo de Holland.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-8 shadow-xl border border-dark-brown/5 dark:border-white/5 print-card">
                  <h3 className="text-xl font-serif font-bold text-dark-brown dark:text-white mb-8 border-b border-dark-brown/10 dark:border-white/10 pb-4">Dimensiones RIASEC</h3>
                  <div className="space-y-8">
                    {report?.percentages.map((p, i) => (
                      <div key={p.type} className="animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                        <div className="flex justify-between items-end mb-3">
                          <span className="text-sm font-bold uppercase tracking-widest text-dark-brown dark:text-white">{p.label}</span>
                          <span className="text-2xl font-serif font-bold text-amber">{p.value}%</span>
                        </div>
                        <div className="h-3 bg-dark-brown/5 dark:bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-amber/50 to-amber transition-all duration-1000 ease-out" style={{ width: `${p.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-amber/5 dark:bg-amber/10 border border-amber/20 rounded-[2rem] p-8 print-card">
                  <h4 className="font-serif font-bold text-dark-brown dark:text-white mb-4 flex items-center gap-2"><Sparkles className="w-5 h-5 text-amber" />Consejo Profesional</h4>
                  <p className="text-dark-brown/70 dark:text-gray-300 italic leading-relaxed text-sm">"Tu perfil muestra una combinación dinámica. La clave del éxito para tu código {report?.hollandCode} radica en buscar entornos interdisciplinarios donde puedas aplicar tu rigor técnico sin sacrificar tu bienestar social o creativo."</p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-8 shadow-xl border border-dark-brown/5 dark:border-white/5 print-card">
                  <h3 className="text-xl font-serif font-bold text-dark-brown dark:text-white mb-8 border-b border-dark-brown/10 dark:border-white/10 pb-4">Carreras Recomendadas</h3>
                  <div className="grid grid-cols-1 gap-6">
                    {report?.recommendations.map((rec, index) => (
                      <div key={index} className="group bg-warm-cream/30 dark:bg-[#0f0e0c]/50 rounded-3xl p-8 border border-dark-brown/5 dark:border-white/5 hover:border-amber/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber/5 animate-fade-in" style={{ animationDelay: `${(index + 4) * 150}ms` }}>
                        <div className="flex justify-between items-center gap-4 mb-4">
                          <h4 className="text-2xl font-serif font-bold text-dark-brown dark:text-white group-hover:text-amber transition-colors">{rec.title}</h4>
                          <span className="text-amber font-serif font-bold whitespace-nowrap">{rec.match}% Afinidad</span>
                        </div>
                        <p className="text-sm text-dark-brown/60 dark:text-gray-400 leading-relaxed">{rec.desc}</p>
                        <button onClick={() => window.location.href = '/catalogo'} className="mt-6 text-amber font-bold flex items-center gap-2 group-hover:gap-4 transition-all no-print">Ver plan de estudios <ArrowRight className="w-4 h-4" /></button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 no-print">
                  <button
                    onClick={handleDownloadPDF}
                    className="flex-1 px-8 py-5 bg-warm-cream dark:bg-white/5 text-dark-brown dark:text-white border border-dark-brown/10 dark:border-white/10 rounded-2xl font-bold transition-all hover:bg-dark-brown/5 flex items-center justify-center gap-2"
                  >
                    Exportar PDF <ArrowRight className="w-4 h-4 rotate-90" />
                  </button>
                  <button onClick={handleRestart} className="flex-1 px-8 py-5 bg-dark-brown dark:bg-white dark:text-dark-brown text-white rounded-2xl font-bold transition-all hover:bg-dark-brown/90 dark:hover:bg-white/90 shadow-xl">Reiniciar Test</button>
                  <button onClick={() => window.location.href = '/catalogo'} className="flex-[2] px-8 py-5 bg-amber text-white rounded-2xl font-bold shadow-xl shadow-amber/20 transition-all hover:-translate-y-1 hover:bg-amber/90">Explorar Carreras</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
