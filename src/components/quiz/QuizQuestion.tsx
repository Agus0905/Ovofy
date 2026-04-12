interface QuizQuestionProps {
  question: string
  options: string[]
  onAnswer: (answer: string) => void
  current: number
  total: number
}

export function QuizQuestion({ question, options, onAnswer, current, total }: QuizQuestionProps) {
  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-amber font-medium">
            Pregunta {current} de {total}
          </span>
          <div className="w-full bg-dark-brown/10 dark:bg-white/10 rounded-full h-2 ml-4">
            <div
              className="bg-amber h-2 rounded-full transition-all"
              style={{ width: `${(current / total) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8]">
          {question}
        </h2>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="w-full px-6 py-4 bg-warm-cream dark:bg-[#0f0e0c] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] hover:border-amber hover:amber transition-colors text-left"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
