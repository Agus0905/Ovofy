import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Search, Rocket, GraduationCap, Target, Users, Zap } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, useVelocity, MotionValue } from 'framer-motion'

const Stickman = ({ scrollY, velocity, rotation }: { scrollY: MotionValue<number>, velocity: MotionValue<number>, rotation: number }) => {
  const speed = 0.015
  
  // Calculate leg positions based on absolute scroll distance
  const walkPhase = useTransform(scrollY, y => y * speed)
  
  const leg1X = useTransform(walkPhase, phase => 50 + Math.sin(phase) * 20)
  const leg1Y = useTransform(walkPhase, phase => 130 - Math.max(0, Math.cos(phase)) * 15)
  
  const leg2X = useTransform(walkPhase, phase => 50 + Math.sin(phase + Math.PI) * 20)
  const leg2Y = useTransform(walkPhase, phase => 130 - Math.max(0, Math.cos(phase + Math.PI)) * 15)

  const arm1X = useTransform(walkPhase, phase => 50 + Math.sin(phase + Math.PI) * 15)
  const arm2X = useTransform(walkPhase, phase => 50 + Math.sin(phase) * 15)

  // Organic bounce (gravity) based on the walking cycle
  const bounce = useTransform(walkPhase, phase => Math.abs(Math.sin(phase)) * -4)
  const headBob = useTransform(walkPhase, phase => Math.sin(phase * 2) * 1.5)

  // Momentum: lean forward based on velocity
  const lean = useTransform(velocity, [-3000, 0, 3000], [-20, 0, 20])

  return (
    <motion.div 
      className="relative w-10 h-14 flex items-center justify-center"
      style={{ 
        y: bounce, 
        rotate: rotation + lean.get(), // Combine path rotation with velocity lean
        transformOrigin: "bottom center" 
      }}
    >
      <svg viewBox="0 0 100 150" className="w-full h-full text-amber fill-none stroke-current stroke-[10] stroke-linecap-round stroke-linejoin-round">
        {/* Head */}
        <motion.circle cx="50" cy={useTransform(headBob, b => 25 + b)} r="12" />
        {/* Body */}
        <line x1="50" y1="37" x2="50" y2="90" />
        {/* Arms */}
        <motion.line x1="50" y1="50" x2={arm1X} y2="80" />
        <motion.line x1="50" y1="50" x2={arm2X} y2="80" />
        {/* Legs */}
        <motion.line x1="50" y1="90" x2={leg1X} y2={leg1Y} />
        <motion.line x1="50" y1="90" x2={leg2X} y2={leg2Y} />
      </svg>
    </motion.div>
  )
}

const Checkpoint = ({ title, description, icon: Icon, active, reverse = false }: { title: string, description: string, icon: any, active: boolean, reverse?: boolean }) => {
  return (
    <div className={`flex items-center gap-4 transition-all duration-700 ${active ? 'opacity-100 translate-y-0' : 'opacity-40 -translate-y-4'} ${reverse ? 'flex-row-reverse text-right' : ''}`}>
      <div className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${active ? 'bg-amber border-amber text-white scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]' : 'border-dark-brown/20 dark:border-white/20 text-dark-brown/40 dark:text-white/40 bg-warm-cream dark:bg-[#0f0e0c]'}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="w-48">
        <h4 className={`text-lg font-bold transition-colors ${active ? 'text-dark-brown dark:text-white' : 'text-dark-brown/40 dark:text-white/40'}`}>{title}</h4>
        {active && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="text-xs text-dark-brown/60 dark:text-gray-400 mt-1 leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </div>
  )
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 50, damping: 20 })
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })

  const stickmanX = useTransform(smoothProgress, [0, 0.3333, 0.6666, 1], ["20%", "80%", "20%", "80%"])
  const stickmanY = useTransform(smoothProgress, [0, 1], ["0%", "100%"])
  
  // Calculate rotation and direction based on the zigzag segment
  const stickmanRotation = useTransform(smoothProgress, (p) => {
    if (p < 0.3333) return 90 + 20; // Walking right-down
    if (p < 0.6666) return 90 - 20; // Walking left-down (flipped)
    return 90 + 20; // Walking right-down
  })

  const direction = useTransform(smoothProgress, (p) => {
    if (p < 0.3333) return 1;
    if (p < 0.6666) return -1;
    return 1;
  })

  const pathOpacity = useTransform(scrollYProgress, [0.85, 0.95], [1, 0])
// Active section detection
const [activeStep, setActiveStep] = useState(0)
useEffect(() => {
  // Switch to .on("change", ...) to avoid deprecation warning
  return scrollYProgress.on("change", v => {
    if (v < 0.15) setActiveStep(0)
    else if (v < 0.45) setActiveStep(1)
    else if (v < 0.8) setActiveStep(2)
    else setActiveStep(3)
  })
}, [scrollYProgress])

return (
  <div ref={containerRef} className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 relative transition-colors duration-500 overflow-hidden">

      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#1a1208 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <motion.div 
        className="hidden lg:block fixed left-12 top-32 bottom-32 w-64 pointer-events-none z-20"
        style={{ opacity: pathOpacity }}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
          <motion.path
            d="M 20 0 L 80 33.33 L 20 66.66 L 80 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="8 8"
            vectorEffect="non-scaling-stroke"
            className="text-dark-brown/20 dark:text-white/20"
          />
          <motion.path
            d="M 20 0 L 80 33.33 L 20 66.66 L 80 100"
            fill="none"
            stroke="var(--amber)"
            strokeWidth="4"
            strokeDasharray="8 8"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: scrollYProgress }}
          />
        </svg>

        <motion.div 
          className="absolute z-30 flex flex-col items-center"
          style={{ 
            left: stickmanX,
            top: stickmanY,
            x: "-50%",
            y: "-50%", // Center on the line for 90deg walk
            scaleX: direction
          }}
        >
          <Stickman scrollY={scrollY} velocity={smoothVelocity} rotation={stickmanRotation.get()} />
        </motion.div>

        {/* Fixed Checkpoints alongside the path */}
        <div className="absolute inset-0 pointer-events-auto">
          <div className="absolute top-[0%] left-[20%] -translate-y-6 pl-6">
            <Checkpoint 
              title="Misión" 
              description="Nacimos para democratizar el futuro." 
              icon={Target} 
              active={activeStep >= 0}
            />
          </div>
          <div className="absolute top-[33.33%] left-[80%] -translate-x-full -translate-y-6 pr-6">
            <Checkpoint 
              title="Explorá" 
              description="Elegí tu camino entre las mejores unis." 
              icon={Search} 
              active={activeStep >= 1}
              reverse={true}
            />
          </div>
          <div className="absolute top-[66.66%] left-[20%] -translate-y-6 pl-6">
            <Checkpoint 
              title="Viví" 
              description="Experimentá la carrera antes de elegir." 
              icon={Rocket} 
              active={activeStep >= 2}
            />
          </div>
          <div className="absolute top-[100%] left-[80%] -translate-x-full -translate-y-6 pr-6">
            <Checkpoint 
              title="Decidí" 
              description="Elegí con seguridad y pasión." 
              icon={GraduationCap} 
              active={activeStep >= 3}
              reverse={true}
            />
          </div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 lg:pl-[400px]">
        
        {/* Section 1: Hero / Mission */}
        <section className="min-h-[80vh] flex flex-col justify-center py-20 animate-fade-in">
          <div className="max-w-3xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-amber font-bold tracking-[0.2em] uppercase text-xs mb-6 block"
            >
              Nuestra Misión
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark-brown dark:text-white mb-8 leading-tight">
              Democratizar el acceso a la <span className="text-amber italic">experiencia</span> universitaria.
            </h1>
            <p className="text-xl md:text-2xl text-dark-brown/60 dark:text-gray-400 leading-relaxed font-sans">
              Creemos que nadie debería elegir su carrera sin haberla vivido primero. Ovofy nace para cerrar la brecha entre el secundario y la universidad.
            </p>
          </div>
        </section>

        {/* Section 2: 3 Pasos */}
        <section className="py-32">
          <div className="mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-6">El camino Ovofy</h2>
            <div className="w-24 h-2 bg-amber rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { icon: Search, title: "Explorá", desc: "Encontrá experiencias cortas diseñadas por las mejores universidades de Argentina. Filtrá por tus intereses y curiosidades.", color: "bg-blue-500" },
              { icon: Rocket, title: "Experimentá", desc: "Participá de clases prácticas, resolvé casos reales y hablá con profesionales del mundo real.", color: "bg-amber" },
              { icon: GraduationCap, title: "Decidí", desc: "Elegí tu futuro con la tranquilidad de saber exactamente qué esperar de tu carrera.", color: "bg-green-500" }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-[#1a1814] p-10 rounded-[2.5rem] border border-dark-brown/5 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all group"
              >
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-black/10 group-hover:scale-110 transition-transform`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-dark-brown dark:text-white mb-4">{step.title}</h3>
                <p className="text-lg text-dark-brown/60 dark:text-gray-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section 3: Why Choose Us */}
        <section className="py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                <div className="aspect-[4/5] bg-amber/10 rounded-[4rem] overflow-hidden rotate-2 shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                    alt="Students collaborating" 
                    className="w-full h-full object-cover -rotate-2 hover:rotate-0 transition-transform duration-700 scale-110"
                  />
                </div>
                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  className="absolute -bottom-10 -right-10 bg-white dark:bg-[#1a1814] p-8 rounded-3xl shadow-2xl max-w-xs border border-dark-brown/5 dark:border-white/5 z-20"
                >
                  <p className="text-dark-brown dark:text-white font-bold italic text-lg mb-4">
                    "Ovofy me ayudó a darme cuenta que amaba la Economía mucho más de lo que pensaba."
                  </p>
                  <span className="text-amber font-bold">— Martina, Estudiante de UTDT</span>
                </motion.div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-dark-brown dark:text-white mb-12">
                ¿Por qué elegir <span className="text-amber italic">Ovofy</span>?
              </h2>
              <div className="space-y-10">
                {[
                  { icon: Target, title: "Enfoque Práctico", desc: "No más teoría abstracta. Meté las manos en la masa desde el primer día." },
                  { icon: Users, title: "Networking Real", desc: "Conectá con directores de carrera y alumnos de las universidades que te interesan." },
                  { icon: Zap, title: "Ahorro de Tiempo", desc: "Un curso de 4 semanas puede ahorrarte años de una carrera que no era para vos." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 bg-amber/10 rounded-2xl flex items-center justify-center group-hover:bg-amber group-hover:text-white transition-all duration-300 text-amber">
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-dark-brown dark:text-white mb-2">{item.title}</h4>
                      <p className="text-lg text-dark-brown/60 dark:text-gray-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Final CTA */}
        <section className="py-32">
          <div className="bg-dark-brown dark:bg-[#1a1814] rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-amber/10 via-transparent to-transparent opacity-50" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-serif font-bold text-white mb-10">
                El futuro empieza <span className="text-amber italic">hoy</span>.
              </h2>
              <p className="text-xl md:text-2xl text-white/70 mb-16 max-w-2xl mx-auto font-sans leading-relaxed">
                Unite a la comunidad de estudiantes que están tomando el control de su carrera universitaria con experiencias reales.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link
                  to="/catalogo"
                  className="bg-amber hover:bg-amber/90 text-white px-12 py-6 rounded-2xl text-xl font-bold shadow-2xl shadow-amber/20 hover:scale-105 transition-all flex items-center justify-center gap-3"
                >
                  Explorar Catálogo <ArrowRight className="w-6 h-6" />
                </Link>
                <Link
                  to="/quiz"
                  className="bg-white/5 hover:bg-white/10 text-white border border-white/20 px-12 py-6 rounded-2xl text-xl font-bold transition-all backdrop-blur-sm"
                >
                  Hacer el Quiz
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
