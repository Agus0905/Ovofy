interface Testimonial {
  id: number
  name: string
  course: string
  text: string
  rating: number
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
}

export function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <div>
      <h3 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-6">
        Lo que dicen los estudiantes
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white dark:bg-[#1a1814] rounded-xl p-6 shadow-md border border-dark-brown/10 dark:border-[#2a2620]"
          >
            <div className="flex items-center gap-1 mb-3">
              {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                <span key={i} className="text-amber">★</span>
              ))}
              {testimonial.rating % 1 !== 0 && (
                <span className="text-amber/50">★</span>
              )}
            </div>
            <p className="text-dark-brown/80 dark:text-gray-300 mb-4 italic">
              "{testimonial.text}"
            </p>
            <div>
              <p className="font-medium text-dark-brown dark:text-[#f5f0e8]">{testimonial.name}</p>
              <p className="text-sm text-dark-brown/60 dark:text-gray-400">{testimonial.course}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
