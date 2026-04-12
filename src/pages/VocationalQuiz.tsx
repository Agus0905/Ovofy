import { useState } from 'react'

export function VocationalQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])

  const questions = [
    {
      id: 1,
      question: "¿Qué tipo de actividades disfrutás más?",
      options: ["Trabajar con personas", "Resolver problemas lógicos", "Crear cosas nuevas", "Analizar datos"]
    },
    {
      id: 2,
      question: "¿Qué materia te interesa más?",
      options: ["Ciencias Sociales", "Matemática", "Arte", "Biología"]
    },
    {
      id: 3,
      question: "¿Cómo preferís trabajar?",
      options: ["En equipo", "Solo", "Liderando grupos", "Con orientación clara"]
    }
  ]

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6 text-center">
          Test Vocacional
        </h1>
        <p className="text-lg text-dark-brown/80 dark:text-gray-300 text-center mb-12">
          Descubrí qué carrera es ideal para vos
        </p>

        {currentQuestion < questions.length ? (
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-8">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-amber font-medium">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <div className="w-full bg-dark-brown/10 dark:bg-white/10 rounded-full h-2 ml-4">
                  <div
                    className="bg-amber h-2 rounded-full transition-all"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8]">
                {questions[currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full px-6 py-4 bg-warm-cream dark:bg-[#0f0e0c] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] hover:border-amber hover:amber transition-colors text-left"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-8 text-center">
            <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-6">
              ¡Test Completado!
            </h2>
            <p className="text-lg text-dark-brown/80 dark:text-gray-300 mb-8">
              Basado en tus respuestas, te recomendamos explorar carreras en:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-amber/10 rounded-xl p-4">
                <h3 className="font-semibold text-amber mb-2">Ciencias Sociales</h3>
                <p className="text-sm text-dark-brown/80 dark:text-gray-300">Derecho, Economía, Psicología</p>
              </div>
              <div className="bg-amber/10 rounded-xl p-4">
                <h3 className="font-semibold text-amber mb-2">Tecnología</h3>
                <p className="text-sm text-dark-brown/80 dark:text-gray-300">Ingeniería, Ciencias de Datos</p>
              </div>
              <div className="bg-amber/10 rounded-xl p-4">
                <h3 className="font-semibold text-amber mb-2">Salud</h3>
                <p className="text-sm text-dark-brown/80 dark:text-gray-300">Medicina, Enfermería</p>
              </div>
            </div>
            <button
              onClick={() => { setCurrentQuestion(0); setAnswers([]) }}
              className="btn-primary px-8 py-3"
            >
              Volver a hacer el test
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
