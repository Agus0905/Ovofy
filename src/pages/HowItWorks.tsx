export function HowItWorks() {
  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6 text-center">
          Cómo Funciona
        </h1>
        <p className="text-lg text-dark-brown/80 dark:text-gray-300 text-center mb-12">
          Descubrí cómo OVOFY te ayuda a encontrar tu vocación
        </p>

        <div className="space-y-8">
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
              1. Explorá
            </h2>
            <p className="text-dark-brown/80 dark:text-gray-300">
              Navegá por nuestro catálogo de cursos de diferentes universidades y carreras.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
              2. Experimentá
            </h2>
            <p className="text-dark-brown/80 dark:text-gray-300">
              Inscribite en cursos prácticos que simulan la experiencia real de cada profesión.
            </p>
          </div>

          <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
              3. Decidí
            </h2>
            <p className="text-dark-brown/80 dark:text-gray-300">
              Con información real, tomá la mejor decisión sobre tu futuro profesional.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
