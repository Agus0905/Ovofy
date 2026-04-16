import { Search, Rocket, GraduationCap } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: "Explorá",
    description: "Navegá por nuestro catálogo y elegí los cursos que más te llamen la atención."
  },
  {
    icon: Rocket,
    title: "Experimentá",
    description: "Viví la carrera desde adentro con clases prácticas y proyectos reales."
  },
  {
    icon: GraduationCap,
    title: "Decidí",
    description: "Elegí tu futuro con la seguridad de haberlo probado antes."
  }
]

export function AnimatedPathSection() {
  return (
    <section className="py-24 bg-white dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-4">
            Tu camino al <span className="text-amber italic">éxito</span>
          </h2>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400">
            Tres pasos simples para encontrar tu verdadera vocación.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-amber/20 -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <div key={index} className="text-center group">
                  <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 bg-amber rounded-full flex items-center justify-center shadow-xl shadow-amber/30 group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 bg-dark-brown dark:bg-white rounded-full flex items-center justify-center text-white dark:text-dark-brown font-bold text-lg border-4 border-white dark:border-[#0f0e0c]">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-brown dark:text-white mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-dark-brown/60 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
