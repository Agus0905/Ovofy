import { Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "María González",
    university: "Universidad Di Tella",
    role: "Diseño Gráfico",
    text: "OVOFY me ayudó a descubrir que realmente quería estudiar diseño.",
    rating: 5
  },
  {
    id: 2,
    name: "Lucas Fernández",
    university: "UBA",
    role: "Ingeniería",
    text: "Antes de OVOFY no sabía qué estudiar. Ahora estoy en segundo año de ingeniería.",
    rating: 5
  },
  {
    id: 3,
    name: "Sofía Martínez",
    university: "UADE",
    role: "Medicina",
    text: "El curso de medicina me mostró la realidad de la carrera.",
    rating: 5
  },
  {
    id: 4,
    name: "Tomás Rodríguez",
    university: "UCEMA",
    role: "Economía",
    text: "Gracias a OVOFY descubrí mi vocación por las finanzas.",
    rating: 5
  }
]

export function Testimonials() {
  return (
    <section className="py-20 bg-warm-cream dark:bg-[#0f0e0c] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-12">
          Ellos ya pasaron por acá
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-80 snap-start bg-white dark:bg-[#1a1814] rounded-2xl p-5 shadow-lg border border-dark-brown/10 dark:border-white/10"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-amber text-sm">★</span>
                ))}
              </div>
              
              <Quote className="w-6 h-6 text-amber mb-2" />
              
              <p className="text-dark-brown/80 dark:text-gray-300 mb-4 italic text-sm">
                "{testimonial.text}"
              </p>
              
              <div>
                <p className="font-semibold text-dark-brown dark:text-[#f5f0e8] text-sm">{testimonial.name}</p>
                <p className="text-xs text-amber">{testimonial.university} · {testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
