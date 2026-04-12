import { Search, Play, Check } from 'lucide-react'

export function AnimatedPathSection() {
  return (
    <section className="py-20 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-16">
          Tu camino hacia la decisión correcta
        </h2>
        <div className="relative">
          {/* Amber connecting line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-amber hidden md:block" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              { num: 1, title: 'Elegís carrera', icon: Search },
              { num: 2, title: 'Vivís la experiencia', icon: Play },
              { num: 3, title: 'Tomás tu decisión', icon: Check },
            ].map((step) => (
              <div key={step.num} className="text-center relative">
                <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-2xl font-bold text-white">{step.num}</span>
                </div>
                <div className="w-12 h-12 bg-amber rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8]">{step.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
