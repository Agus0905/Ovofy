interface EnrollmentSectionProps {
  onEnroll: () => void
  isEnrolled: boolean
}

export function EnrollmentSection({ onEnroll, isEnrolled }: EnrollmentSectionProps) {
  return (
    <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg border border-dark-brown/10 dark:border-[#2a2620]">
      <h3 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
        Inscripción al Curso
      </h3>
      <p className="text-dark-brown/80 dark:text-gray-300 mb-6">
        Inscríbete ahora para comenzar tu aprendizaje. No hay costo de inscripción.
      </p>
      <button
        onClick={onEnroll}
        disabled={isEnrolled}
        className={`w-full py-4 rounded-xl font-semibold transition-colors ${
          isEnrolled
            ? 'bg-green-500 text-white cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isEnrolled ? '¡Ya estás inscripto!' : 'Inscribirme Ahora'}
      </button>
    </div>
  )
}
