import { Video, Users, Clock } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: "Simulaciones reales",
    description: "Viví la experiencia de trabajar en tu futura profesión a través de casos prácticos y proyectos reales.",
    span: 2
  },
  {
    icon: Users,
    title: "Videos de graduados",
    description: "Conocé las historias de éxito de profesionales que ya están trabajando en tu carrera de interés.",
    span: 1
  },
  {
    icon: Clock,
    title: "Cupos limitados",
    description: "Grupos reducidos para garantizar una experiencia personalizada y de alta calidad.",
    span: 1
  }
]

export function BentoGrid() {
  return (
    <section className="py-20 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-12">
          Por qué elegir OVOFY
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ gridTemplateColumns: '2fr 1fr' }}>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className={`${feature.span === 2 ? 'md:col-span-2' : ''} bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg border border-dark-brown/10 dark:border-white/10`}>
                <div className="w-12 h-12 bg-amber/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber" />
                </div>
                <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-2">{feature.title}</h3>
                <p className="text-dark-brown/80 dark:text-gray-300">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
