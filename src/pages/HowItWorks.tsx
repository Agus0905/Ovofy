import { Link } from 'react-router-dom'
import { ArrowRight, Search, Rocket, GraduationCap, Target, Users, Zap } from 'lucide-react'

export function HowItWorks() {
  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24">
      {/* Hero / Mission */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-amber font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Misión</span>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-dark-brown dark:text-white mb-8 leading-tight">
            Democratizar el acceso a la <span className="text-amber italic">experiencia</span> universitaria.
          </h1>
          <p className="text-xl lg:text-2xl text-dark-brown/60 dark:text-gray-400 leading-relaxed">
            Creemos que nadie debería elegir su carrera sin haberla vivido primero. Ovofy nace para cerrar la brecha entre el secundario y la universidad.
          </p>
        </div>
      </section>

      {/* 3 Pasos */}
      <section className="py-24 bg-white dark:bg-[#1a1814]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif font-bold text-dark-brown dark:text-white mb-4">El camino Ovofy</h2>
            <div className="w-24 h-1.5 bg-amber mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { icon: Search, title: "Explorá", desc: "Encontrá experiencias cortas diseñadas por las mejores universidades de Argentina." },
              { icon: Rocket, title: "Experimentá", desc: "Participá de clases prácticas, resolvé casos reales y hablá con profesionales." },
              { icon: GraduationCap, title: "Decidí", desc: "Elegí tu futuro con la tranquilidad de saber exactamente qué esperar." }
            ].map((step, i) => (
              <div key={i} className="group text-center">
                <div className="w-20 h-20 bg-amber rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-xl shadow-amber/20 group-hover:rotate-6 transition-transform">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-brown dark:text-white mb-4">{step.title}</h3>
                <p className="text-lg text-dark-brown/60 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-8">
                ¿Por qué elegir <span className="text-amber">Ovofy</span>?
              </h2>
              <div className="space-y-8">
                {[
                  { icon: Target, title: "Enfoque Práctico", desc: "No más teoría abstracta. Meté las manos en la masa desde el primer día." },
                  { icon: Users, title: "Networking Real", desc: "Conectá con directores de carrera y alumnos de las universidades que te interesan." },
                  { icon: Zap, title: "Ahorro de Tiempo", desc: "Un curso de 4 semanas puede ahorrarte años de una carrera que no era para vos." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-amber" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-dark-brown dark:text-white mb-2">{item.title}</h4>
                      <p className="text-dark-brown/60 dark:text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-amber/10 rounded-[3rem] overflow-hidden rotate-3">
                <img 
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                  alt="Students collaborating" 
                  className="w-full h-full object-cover -rotate-3 hover:rotate-0 transition-transform duration-700 scale-110"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white dark:bg-[#1a1814] p-8 rounded-3xl shadow-2xl max-w-xs border border-dark-brown/5 dark:border-white/5">
                <p className="text-dark-brown dark:text-white font-bold italic text-lg mb-4">
                  "Ovofy me ayudó a darme cuenta que amaba la Economía mucho más de lo que pensaba."
                </p>
                <span className="text-amber font-bold">— Martina, Estudiante de UTDT</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-dark-brown dark:bg-[#080808]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-6xl font-serif font-bold text-white mb-8">
            El futuro empieza <span className="text-amber italic">hoy</span>.
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Unite a la comunidad de estudiantes que están tomando el control de su carrera universitaria.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/catalogo"
              className="bg-amber hover:bg-amber/90 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-xl shadow-amber/20 transition-all flex items-center justify-center gap-3"
            >
              Explorar Catálogo <ArrowRight className="w-6 h-6" />
            </Link>
            <Link
              to="/quiz"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-10 py-5 rounded-2xl text-lg font-bold transition-all"
            >
              Hacer el Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
