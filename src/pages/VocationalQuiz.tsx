import { useState } from 'react'
import { CheckCircle2, ChevronRight } from 'lucide-react'
import { QuizIntroduction } from '../components/quiz/QuizIntroduction'

export function VocationalQuiz() {
  const [hasStarted, setHasStarted] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)

  const questions = [
    {
      id: 1,
      question: "Si pudieras pasar un día completo haciendo lo que más te gusta, ¿qué elegirías?",
      options: ["Ayudar a resolver conflictos entre personas", "Diseñar y construir algo nuevo", "Analizar datos para encontrar patrones", "Cuidar la salud de otras personas"]
    },
    {
      id: 2,
      question: "Cuando tenés que resolver un problema complejo, ¿qué es lo primero que hacés?",
      options: ["Pienso en cómo afecta a las personas involucradas", "Busco soluciones creativas y originales", "Investigo y analizo toda la información", "Pido ayuda y trabajo en equipo"]
    },
    {
      id: 3,
      question: "¿Qué tipo de proyectos te emocionan más?",
      options: ["Los que impactan positivamente en la sociedad", "Los que requieren innovación y diseño", "Los que necesitan análisis profundo", "Los que involucran trabajo directo con gente"]
    },
    {
      id: 4,
      question: "En un grupo de trabajo, ¿qué rol solemos asignarte?",
      options: ["El mediador o líder social", "El creativo que propone ideas", "El analista que estudia los datos", "El organizador que mantiene el equipo unido"]
    },
    {
      id: 5,
      question: "¿Qué tipo de lectura o contenido te atrae más?",
      options: ["Historias sobre personas y sociedad", "Revistas de diseño y arquitectura", "Artículos científicos y técnicos", "Noticias sobre salud y bienestar"]
    },
    {
      id: 6,
      question: "Si tuvieras que explicar un tema complejo, ¿cómo lo harías?",
      options: ["Usando ejemplos de la vida real", "Con diagramas y dibujos", "Con datos y estadísticas", "Con historias y metáforas"]
    },
    {
      id: 7,
      question: "¿Qué ambiente de trabajo te imagina ideal para tu futuro?",
      options: ["Una oficina llena de gente y reuniones", "Un estudio creativo con libertad", "Un laboratorio o espacio de investigación", "Un hospital o centro de salud"]
    },
    {
      id: 8,
      question: "¿Qué te motiva más cuando enfrentás un desafío?",
      options: ["Ver que mi trabajo ayuda a otros", "Crear algo que nunca existió antes", "Encontrar la solución correcta", "Trabajar en equipo para lograr el objetivo"]
    }
  ]

  const careerRecommendations = [
    {
      title: "Negocios Digitales / Economía",
      match: "94%",
      description: "Tu perfil se destaca por la capacidad analítica y el interés en la innovación tecnológica."
    },
    {
      title: "Diseño Global / Creatividad",
      match: "88%",
      description: "Tu visión original y enfoque en el usuario son ideales para carreras creativas modernas."
    },
    {
      title: "Ingeniería / Ciencias Técnicas",
      match: "76%",
      description: "La resolución de problemas complejos y el pensamiento lógico son tus mayores fortalezas."
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
    setHasStarted(false)
  }

  if (!hasStarted) {
    return <QuizIntroduction onStart={() => setHasStarted(true)} />
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!showResults ? (
          <div className="space-y-8 animate-fade-in">
            <div className="flex items-center justify-between">
              <span className="text-amber font-bold uppercase tracking-widest text-xs">
                Pregunta {currentQuestion + 1} de {questions.length}
              </span>
              <div className="flex gap-1">
                {questions.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 w-6 rounded-full transition-all duration-500 ${
                      i <= currentQuestion ? 'bg-amber' : 'bg-dark-brown/10 dark:bg-white/10'
                    }`} 
                  />
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-10 md:p-12 shadow-xl border border-dark-brown/5 dark:border-white/5">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark-brown dark:text-white mb-10 leading-tight">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="group px-8 py-6 bg-warm-cream/50 dark:bg-[#0f0e0c] border-2 border-transparent rounded-2xl text-dark-brown dark:text-white hover:border-amber hover:bg-white dark:hover:bg-[#1a1814] transition-all text-left flex items-center justify-between"
                  >
                    <span className="text-lg font-medium">{option}</span>
                    <ChevronRight className="w-5 h-5 text-amber opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-slide-up">
            <div className="bg-white dark:bg-[#1a1814] rounded-[3rem] p-10 md:p-16 shadow-2xl text-center border border-dark-brown/5 dark:border-white/5">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <h2 className="text-4xl font-serif font-bold text-dark-brown dark:text-white mb-4">
                ¡Análisis Completado!
              </h2>
              <p className="text-lg text-dark-brown/60 dark:text-gray-400 mb-12">
                Basado en tu perfil cognitivo, estas son tus mejores coincidencias:
              </p>
              
              <div className="grid grid-cols-1 gap-6 mb-12">
                {careerRecommendations.map((rec, index) => (
                  <div key={index} className="bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-3xl p-8 border border-dark-brown/5 dark:border-white/5 flex items-center justify-between text-left hover:border-amber transition-all group">
                    <div className="max-w-[70%]">
                      <h3 className="text-xl font-bold text-dark-brown dark:text-white mb-2">{rec.title}</h3>
                      <p className="text-sm text-dark-brown/60 dark:text-gray-400 leading-relaxed">{rec.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl font-serif font-bold text-amber mb-1">{rec.match}</div>
                      <span className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Match</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleRestart}
                  className="px-10 py-4 bg-dark-brown dark:bg-white dark:text-dark-brown text-white rounded-2xl font-bold transition-all hover:opacity-90"
                >
                  Reiniciar Test
                </button>
                <button
                  onClick={() => window.location.href = '/catalogo'}
                  className="px-10 py-4 bg-amber text-white rounded-2xl font-bold shadow-lg shadow-amber/20 transition-all hover:-translate-y-1"
                >
                  Explorar Carreras
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
