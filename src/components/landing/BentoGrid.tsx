import { Video, Users, Clock, Sparkles } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: "Simulaciones reales",
    description: "Viví la experiencia de trabajar en tu futura profesión a través de casos prácticos diseñados por las mejores universidades.",
    span: "md:col-span-2",
    bg: "bg-white dark:bg-[#1a1814]"
  },
  {
    icon: Sparkles,
    title: "IA Vocacional",
    description: "Algoritmos avanzados que conectan tus intereses con las carreras con mayor potencial.",
    span: "md:col-span-1",
    bg: "bg-amber text-white"
  },
  {
    icon: Users,
    title: "Red de Graduados",
    description: "Conectá con profesionales que ya están trabajando en las empresas que soñás.",
    span: "md:col-span-1",
    bg: "bg-white dark:bg-[#1a1814]"
  },
  {
    icon: Clock,
    title: "Experiencias Cortas",
    description: "Cursos intensivos de 3 a 5 semanas para que no pierdas tiempo y tomes acción hoy mismo.",
    span: "md:col-span-2",
    bg: "bg-white dark:bg-[#1a1814]"
  }
]

export function BentoGrid() {
  return (
    <section className="py-24 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-4">
            Mucho más que <span className="text-amber italic">orientación</span>
          </h2>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400">
            Reinventamos la forma en que elegís tu carrera universitaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isAmber = feature.bg.includes('bg-amber')
            return (
              <div 
                key={index} 
                className={`${feature.span} ${feature.bg} rounded-[2rem] p-10 shadow-sm border border-dark-brown/5 dark:border-white/5 hover:shadow-xl transition-all duration-500 group`}
              >
                <div className={`w-14 h-14 ${isAmber ? 'bg-white/20' : 'bg-amber/10'} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-7 h-7 ${isAmber ? 'text-white' : 'text-amber'}`} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${isAmber ? 'text-white' : 'text-dark-brown dark:text-white'}`}>
                  {feature.title}
                </h3>
                <p className={`text-lg leading-relaxed ${isAmber ? 'text-white/90' : 'text-dark-brown/60 dark:text-gray-400'}`}>
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
