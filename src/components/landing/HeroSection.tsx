import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  openAuthModal: (mode: 'login' | 'register') => void
}

export function HeroSection({ openAuthModal }: HeroSectionProps) {
  const { scrollY } = useScroll()
  const pathLength = useTransform(scrollY, [0, 500], [0, 1])

  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog-section')
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative overflow-hidden bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Animated SVG Path */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-full hidden lg:block">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M 50 0 Q 30 25 50 50 Q 70 75 50 100"
                stroke="#EF9F27"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength, opacity: pathLength }}
              />
            </svg>
          </div>

          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-serif text-dark-brown dark:text-[#f5f0e8] leading-tight mb-6">
              Descubrí tu carrera
              <span className="block text-amber">antes de elegirla</span>
            </h1>
            <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0">
              Experimentá carreras reales en las mejores universidades de Argentina. Tomá decisiones informadas sobre tu futuro profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => openAuthModal('register')}
                className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
              >
                Inscribirme
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollToCatalog}
                className="btn-secondary text-lg px-8 py-4"
              >
                Ver Cursos
              </button>
            </div>
          </motion.div>

          {/* Right Content - 40% Stat */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white dark:bg-[#1a1814] rounded-3xl shadow-2xl p-8 lg:p-12 border-l-4 border-[#EF9F27]">
              <div className="text-center">
                <div className="text-6xl lg:text-7xl font-serif text-amber font-bold mb-4">
                  40%
                </div>
                <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 font-medium mb-6">
                  de los estudiantes cambian de carrera al menos una vez
                </p>
                <p className="text-sm text-dark-brown/60 dark:text-gray-400">
                  1 de cada 3 estudiantes tarda más de 2 años en decidir su carrera
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
