interface QuizIntroProps {
  onStart: () => void
}

export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-4">
        Test Vocacional
      </h2>
      <p className="text-lg text-dark-brown/80 dark:text-gray-300 mb-8">
        Descubrí qué carrera es ideal para vos respondiendo algunas preguntas sobre tus intereses y preferencias.
      </p>
      <button
        onClick={onStart}
        className="btn-primary px-8 py-4 text-lg"
      >
        Comenzar Test
      </button>
    </div>
  )
}
