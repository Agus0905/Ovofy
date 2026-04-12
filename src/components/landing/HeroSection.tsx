import { ArrowRight } from 'lucide-react'

interface HeroSectionProps {
  openAuthModal: (mode: 'login' | 'register') => void
}

export function HeroSection({ openAuthModal }: HeroSectionProps) {
  const scrollToCatalog = () => {
    const catalogSection = document.getElementById('catalog-section')
    if (catalogSection) {
      catalogSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-7xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] leading-tight">
              Descubrí tu carrera{' '}
              <span className="text-amber">antes de elegirla</span>
            </h1>
            <p className="text-xl text-dark-brown/80 dark:text-gray-300 max-w-lg">
              Experimentá carreras reales en las mejores universidades de Argentina.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => openAuthModal('register')}
                className="btn-primary px-8 py-4 text-lg flex items-center gap-2"
              >
                Inscribirme <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={scrollToCatalog}
                className="btn-outline px-8 py-4 text-lg"
              >
                Ver Cursos
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-xl border-l-4 border-amber">
            <div className="text-7xl font-serif font-bold text-amber mb-4">40%</div>
            <p className="text-xl text-dark-brown dark:text-[#f5f0e8] mb-6">
              de los estudiantes abandona su carrera antes de terminar el primer año
            </p>
            <p className="text-dark-brown/60 dark:text-gray-400">
              1 de cada 3 estudiantes tarda más de 2 años en decidir su carrera
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
