import { motion } from 'framer-motion'
import { Video, Users, Clock } from 'lucide-react'

const features = [
  {
    icon: Video,
    title: "Simulaciones reales",
    description: "Viví la experiencia de trabajar en tu futura profesión a través de casos prácticos y proyectos reales.",
    gridClass: "col-start-1 row-start-1 row-span-2"
  },
  {
    icon: Users,
    title: "Videos de graduados",
    description: "Conocé las historias de éxito de profesionales que ya están trabajando en tu carrera de interés.",
    gridClass: "col-start-2 row-start-1"
  },
  {
    icon: Clock,
    title: "Cupos limitados",
    description: "Grupos reducidos para garantizar una experiencia personalizada y de alta calidad.",
    gridClass: "col-start-2 row-start-2"
  }
]

export function BentoGrid() {
  return (
    <section className="py-20 lg:py-32 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6">
            Por qué OVOFY
          </h2>
          <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 max-w-3xl mx-auto">
            Una experiencia única para descubrir tu verdadera vocación
          </p>
        </motion.div>

        <div className="grid grid-cols-2 grid-rows-2 gap-6 lg:gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className={`${feature.gridClass} group`}
              >
                <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 min-h-[200px] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-amber/20 transition-colors">
                    <Icon className="w-6 h-6 text-amber" />
                  </div>
                  <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-dark-brown/80 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
