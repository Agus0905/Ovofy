import { useState } from 'react'

export function VocationalQuiz() {
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
      title: "Derecho / Ciencias Sociales",
      description: "Tu perfil se destaca por la empatía y el interés en el impacto social"
    },
    {
      title: "Diseño / Arquitectura",
      description: "Tu creatividad y visión innovadora son tus mayores fortalezas"
    },
    {
      title: "Ingeniería / Economía",
      description: "Tu capacidad analítica y lógica te destacan en áreas técnicas"
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
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-amber font-medium">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <div className="flex-1 bg-dark-brown/10 dark:bg-white/10 rounded-full h-2 ml-4">
                  <div
                    className="bg-amber h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-8">
                {questions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="px-6 py-6 bg-warm-cream dark:bg-[#0f0e0c] border-2 border-dark-brown/20 dark:border-[#2a2620] rounded-xl text-dark-brown dark:text-[#f5f0e8] hover:border-amber transition-all text-left hover:shadow-md"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-4xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-4">
              ¡Test Completado!
            </h2>
            <p className="text-lg text-dark-brown/80 dark:text-gray-300 mb-8">
              Basado en tus respuestas, estas son las áreas que más te podrían interesar:
            </p>
            <div className="grid grid-cols-1 gap-6 mb-8">
              {careerRecommendations.map((rec, index) => (
                <div key={index} className="bg-amber/10 rounded-xl p-6 border-2 border-amber">
                  <h3 className="text-xl font-semibold text-amber mb-2">{rec.title}</h3>
                  <p className="text-dark-brown/80 dark:text-gray-300">{rec.description}</p>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              <button
                onClick={handleRestart}
                className="btn-primary px-8 py-3"
              >
                Volver a hacer el test
              </button>
              <p className="text-sm text-dark-brown/60 dark:text-gray-400">
                Recordá que este test es solo una guía. Te recomendamos probar cursos de diferentes áreas para descubrir tu verdadera vocación.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
