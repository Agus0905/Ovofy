import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Search, Play, CheckCircle } from 'lucide-react'

export function AnimatedPathSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  const steps = [
    {
      icon: Search,
      title: "Explorá",
      description: "Descubrí carreras que te interesan"
    },
    {
      icon: Play,
      title: "Experimentá",
      description: "Viví simulaciones reales de cada profesión"
    },
    {
      icon: CheckCircle,
      title: "Decidí",
      description: "Elegí con confianza tu camino profesional"
    }
  ]

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-warm-cream dark:bg-[#1a1814]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6">
            Tu camino hacia la vocación
          </h2>
          <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 max-w-3xl mx-auto">
            Tres simples pasos para descubrir tu verdadera pasión
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon

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
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-amber/10 rounded-2xl flex items-center justify-center mx-auto">
                    <Icon className="w-10 h-10 text-amber" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-3">
                  {step.title}
                </h3>
                <p className="text-dark-brown/80 dark:text-gray-300">
                  {step.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
