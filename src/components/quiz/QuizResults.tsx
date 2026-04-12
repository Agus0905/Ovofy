interface Recommendation {
  category: string
  careers: string[]
}

interface QuizResultsProps {
  recommendations: Recommendation[]
  onRestart: () => void
}

export function QuizResults({ recommendations, onRestart }: QuizResultsProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-6">
        ¡Test Completado!
      </h2>
      <p className="text-lg text-dark-brown/80 dark:text-gray-300 mb-8">
        Basado en tus respuestas, te recomendamos explorar carreras en:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {recommendations.map((rec, index) => (
          <div key={index} className="bg-amber/10 rounded-xl p-4">
            <h3 className="font-semibold text-amber mb-2">{rec.category}</h3>
            <p className="text-sm text-dark-brown/80 dark:text-gray-300">{rec.careers.join(', ')}</p>
          </div>
        ))}
      </div>
      <button
        onClick={onRestart}
        className="btn-primary px-8 py-3"
      >
        Volver a hacer el test
      </button>
    </div>
  )
}
