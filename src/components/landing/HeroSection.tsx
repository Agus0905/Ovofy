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
    <section className="relative min-h-screen flex items-center bg-warm-cream dark:bg-[#0f0e0c] pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <h1 className="text-6xl lg:text-8xl font-serif font-bold text-dark-brown dark:text-white leading-[1.1]">
              Descubrí tu carrera <br />
              <span className="text-amber">antes</span> de elegirla
            </h1>
            <p className="text-xl lg:text-2xl text-dark-brown/60 dark:text-gray-400 max-w-lg leading-relaxed">
              Experimentá el mundo universitario real antes de tomar la decisión más importante de tu vida.
            </p>
            <div className="flex flex-wrap gap-5">
              <button
                onClick={() => openAuthModal('register')}
                className="bg-amber hover:bg-amber/90 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-amber/20 transition-all hover:-translate-y-1 active:scale-95 flex items-center gap-3"
              >
                Empezar ahora <ArrowRight className="w-6 h-6" />
              </button>
              <button 
                onClick={scrollToCatalog}
                className="bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-dark-brown/10 dark:border-white/10 text-dark-brown dark:text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all hover:bg-white dark:hover:bg-white/10"
              >
                Ver Catálogo
              </button>
            </div>
          </div>

          {/* Right Card */}
          <div className="relative">
            <div className="absolute -inset-4 bg-amber/10 blur-3xl rounded-full"></div>
            <div className="relative bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-12 shadow-2xl border-l-[12px] border-amber transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="text-8xl lg:text-9xl font-serif font-bold text-amber mb-6 leading-none">40%</div>
              <p className="text-2xl lg:text-3xl font-bold text-dark-brown dark:text-white mb-8 leading-tight">
                de los estudiantes abandona su carrera en el primer año.
              </p>
              <p className="text-lg text-dark-brown/50 dark:text-gray-400 font-medium italic">
                "No era lo que yo esperaba" es la razón principal.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
