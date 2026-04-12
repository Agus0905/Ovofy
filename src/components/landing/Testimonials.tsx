import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Sofía Martínez",
    university: "Universidad Austral",
    career: "Medicina",
    job: "Médica Residente",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    quote: "OVOFY me ayudó a confirmar que la medicina era mi verdadera vocación. Las simulaciones de emergencias me dieron una perspectiva real de la carrera.",
    rating: 5,
    videoUrl: "https://example.com/video1"
  },
  {
    id: 2,
    name: "Tomás Rodríguez",
    university: "Di Tella",
    career: "Administración",
    job: "CEO de Startup",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    quote: "Gracias al curso de Negocios Digitales pude lanzar mi propio e-commerce antes de terminar el secundario. Hoy tengo una empresa con 10 empleados.",
    rating: 5,
    videoUrl: "https://example.com/video2"
  },
  {
    id: 3,
    name: "Camila Gómez",
    university: "UBA",
    career: "Derecho",
    job: "Abogada Penalista",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    quote: "Los juicios simulados me prepararon mejor que cualquier clase teórica. Supe exactamente lo que me esperaba en la facultad.",
    rating: 5,
    videoUrl: "https://example.com/video3"
  },
  {
    id: 4,
    name: "Lucas Fernández",
    university: "ITBA",
    career: "Ingeniería",
    job: "Ingeniero en IA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    quote: "El curso de mecatrónica me abrió las puertas a becas internacionales. Hoy trabajo en una empresa de robotics en Silicon Valley.",
    rating: 5,
    videoUrl: "https://example.com/video4"
  },
  {
    id: 5,
    name: "Valentina López",
    university: "UADE",
    career: "Diseño",
    job: "Fashion Designer",
    avatar: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=face",
    quote: "Crear mi propia colección en el curso de diseño de moda fue la mejor experiencia. Me ayudó a construir mi portfolio profesional.",
    rating: 5,
    videoUrl: "https://example.com/video5"
  }
]

export function Testimonials() {
  return (
    <section className="py-20 lg:py-32 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6">
            Ellos ya pasaron por acá
          </h2>
          <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 max-w-3xl mx-auto">
            Conocé las experiencias de estudiantes que encontraron su vocación a través de OVOFY
          </p>
        </motion.div>

        {/* Horizontal Scroll Container */}
        <div className="relative">
          <div className="overflow-x-auto pb-6">
            <div className="flex gap-6 min-w-max px-4">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  className="flex-none w-80"
                >
                  <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 h-full">
                    {/* Photo at top */}
                    <div className="mb-4">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mx-auto"
                      />
                    </div>

                    {/* University Badge */}
                    <div className="text-center mb-3">
                      <span className="inline-block px-3 py-1 bg-amber/10 text-amber text-xs font-medium rounded-full">
                        {testimonial.university}
                      </span>
                    </div>

                    {/* Quote */}
                    <div className="mb-3">
                      <p className="text-dark-brown/80 dark:text-gray-300 text-sm italic leading-relaxed text-center">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center gap-1 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber text-amber" />
                      ))}
                    </div>

                    {/* Name and Role */}
                    <div className="text-center">
                      <h4 className="font-semibold text-dark-brown dark:text-[#f5f0e8] text-sm mb-1">{testimonial.name}</h4>
                      <p className="text-xs text-amber font-medium">{testimonial.job}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="w-8 h-1 bg-amber rounded-full"></div>
            <div className="w-8 h-1 bg-dark-brown/20 dark:bg-white/10 rounded-full"></div>
            <div className="w-8 h-1 bg-dark-brown/20 dark:bg-white/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
