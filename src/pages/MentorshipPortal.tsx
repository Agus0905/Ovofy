import { useState } from 'react'
import { Video, Star, CheckCircle2, ChevronRight, Search, GraduationCap } from 'lucide-react'
import { motion } from 'framer-motion'

const MOCK_MENTORS = [
  {
    id: '1',
    name: 'Sofía Martínez',
    university: 'UTDT',
    career: 'Negocios Digitales',
    year: '4º Año',
    rating: 4.9,
    sessions: 24,
    avatar: 'https://i.pravatar.cc/150?u=sofia',
    status: 'online',
    tags: ['Emprendimiento', 'Tech', 'Becas']
  },
  {
    id: '2',
    name: 'Lucas Benítez',
    university: 'ITBA',
    career: 'Ingeniería en Software',
    year: '3º Año',
    rating: 4.8,
    sessions: 15,
    avatar: 'https://i.pravatar.cc/150?u=lucas',
    status: 'busy',
    tags: ['Coding', 'Algoritmos', 'Matemáticas']
  },
  {
    id: '3',
    name: 'Valentina Rossi',
    university: 'UBA',
    career: 'Medicina',
    year: '5º Año',
    rating: 5.0,
    sessions: 42,
    avatar: 'https://i.pravatar.cc/150?u=valentina',
    status: 'online',
    tags: ['Residencia', 'Biología', 'Estudio']
  },
  {
    id: '4',
    name: 'Mateo Gómez',
    university: 'UCEMA',
    career: 'Economía',
    year: '2º Año',
    rating: 4.7,
    sessions: 8,
    avatar: 'https://i.pravatar.cc/150?u=mateo',
    status: 'offline',
    tags: ['Finanzas', 'Macroeconomía']
  }
]

export function MentorshipPortal() {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-4">
              Mentorías <span className="text-amber">Flash</span>
            </h1>
            <p className="text-lg text-dark-brown/60 dark:text-gray-400 leading-relaxed">
              Hablá 15 minutos con estudiantes universitarios reales. Despejá tus dudas sobre la carrera, el campus y el futuro profesional.
            </p>
          </div>

          <div className="relative group min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Busca por carrera o uni..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white dark:bg-[#1a1814] border border-dark-brown/10 dark:border-white/10 rounded-2xl shadow-sm focus:ring-2 focus:ring-amber/20 outline-none transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_MENTORS.map((mentor) => (
            <motion.div
              key={mentor.id}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-8 shadow-xl border border-dark-brown/5 dark:border-white/5 relative overflow-hidden group"
            >
              {/* Status Indicator */}
              <div className="absolute top-6 right-8 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  mentor.status === 'online' ? 'bg-green-500 animate-pulse' : 
                  mentor.status === 'busy' ? 'bg-amber' : 'bg-gray-400'
                }`} />
                <span className="text-[10px] font-bold uppercase tracking-widest text-dark-brown/40 dark:text-gray-500">
                  {mentor.status}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="relative">
                  <img src={mentor.avatar} alt={mentor.name} className="w-20 h-20 rounded-3xl object-cover" />
                  <div className="absolute -bottom-2 -right-2 bg-amber text-white p-1.5 rounded-xl shadow-lg">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif font-bold text-dark-brown dark:text-white mb-1 group-hover:text-amber transition-colors">
                    {mentor.name}
                  </h3>
                  <p className="text-sm font-bold text-amber uppercase tracking-widest">{mentor.university}</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-dark-brown/70 dark:text-gray-300">
                  <GraduationCap className="w-4 h-4 text-amber" />
                  <span>{mentor.career} • {mentor.year}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-dark-brown/70 dark:text-gray-300">
                  <Video className="w-4 h-4 text-amber" />
                  <span>{mentor.sessions} mentorías realizadas</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {mentor.tags.map(tag => (
                  <span key={tag} className="text-[10px] font-bold bg-dark-brown/5 dark:bg-white/5 px-3 py-1 rounded-full text-dark-brown/60 dark:text-gray-400 uppercase tracking-tighter">
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {}}
                className="w-full py-4 bg-dark-brown dark:bg-white text-white dark:text-dark-brown rounded-2xl font-bold hover:bg-amber hover:text-white dark:hover:bg-amber dark:hover:text-white transition-all flex items-center justify-center gap-2 group/btn"
              >
                Agendar 15 min <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-16 bg-amber/5 dark:bg-amber/10 border border-amber/20 rounded-[2rem] p-8 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-amber" />
            <h4 className="font-serif font-bold text-dark-brown dark:text-white text-xl">¿Sos estudiante universitario?</h4>
          </div>
          <p className="text-dark-brown/70 dark:text-gray-300 mb-6">
            Sumate como mentor, ayudá a otros a encontrar su camino y ganá beneficios exclusivos en programas de posgrado.
          </p>
          <button className="text-amber font-bold underline hover:no-underline transition-all">
            Postularme como Mentor
          </button>
        </div>

      </div>
    </div>
  )
}
