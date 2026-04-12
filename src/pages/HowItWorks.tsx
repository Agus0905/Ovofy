import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c]">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl lg:text-6xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-6">
            Cómo Funciona
          </h1>
          <p className="text-xl text-dark-brown/80 dark:text-gray-300">
            Tu camino hacia la decisión correcta, en 3 simples pasos
          </p>
        </div>
      </section>

      {/* Tu Camino en 3 Pasos */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-16">
            Tu Camino en 3 Pasos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
                Explorá
              </h3>
              <p className="text-dark-brown/80 dark:text-gray-300">
                Navegá por nuestro catálogo de cursos de diferentes universidades y carreras.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
                Experimentá
              </h3>
              <p className="text-dark-brown/80 dark:text-gray-300">
                Inscribite en cursos prácticos que simulan la experiencia real de cada profesión.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-amber rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
                Decidí
              </h3>
              <p className="text-dark-brown/80 dark:text-gray-300">
                Con información real, tomá la mejor decisión sobre tu futuro profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Por qué elegir OVOFY? */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-12">
            ¿Por qué elegir OVOFY?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg border border-dark-brown/10 dark:border-white/10">
              <div className="w-12 h-12 bg-amber/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-amber">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-2">
                Simulaciones Reales
              </h3>
              <p className="text-dark-brown/80 dark:text-gray-300">
                Experimentá la carrera antes de elegir con actividades prácticas y proyectos reales.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg border border-dark-brown/10 dark:border-white/10">
              <div className="w-12 h-12 bg-amber/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-amber">🎓</span>
              </div>
              <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-2">
                Videos de Graduados
              </h3>
              <p className="text-dark-brown/80 dark:text-gray-300">
                Aprendé de quienes ya pasaron por acá y están trabajando en lo que estudiaron.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg border border-dark-brown/10 dark:border-white/10">
              <div className="w-12 h-12 bg-amber/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl text-amber">⏰</span>
              </div>
              <h3 className="text-xl font-semibold text-dark-brown dark:text-[#f5f0e8] mb-2">
                Cupos Limitados
              </h3>
              <p className="text-dark-brown/80 dark:text-gray-300">
                Experiencia personalizada y de calidad con grupos reducidos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0f0e0c]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#f5f0e8] mb-6">
            ¿Listo para descubrir tu vocación?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Inscribite ahora y comenzá a experimentar diferentes carreras antes de elegir.
          </p>
          <Link
            to="/catalogo"
            className="btn-primary px-8 py-4 text-lg inline-flex items-center gap-2"
          >
            Ver Cursos <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
