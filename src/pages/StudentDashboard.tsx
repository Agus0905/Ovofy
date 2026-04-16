import { Calendar, BookOpen, User, Hexagon, Trophy, Star, Target, Zap, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function StudentDashboard() {
  const { profile } = useAuth()

  const medals = [
    { icon: Trophy, color: 'text-amber', bg: 'bg-amber/10', label: 'Primer Paso' },
    { icon: Star, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Explorador' },
    { icon: Target, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Decidido' },
    { icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Rápido' },
  ]

  const agenda = [
    { title: 'Clase Magistral: Negocios', time: 'En 2 días', date: 'Sábado 10:00', type: 'Live' },
    { title: 'Taller de Diseño Global', time: 'En 5 días', date: 'Martes 18:30', type: 'Workshop' },
  ]

  return (
    <div className="min-h-screen bg-[#0f0e0c] text-white pt-24 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar - Profile Info */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-[#1a1814] rounded-3xl p-8 border border-white/5 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-amber/10"></div>
              <div className="relative">
                <div className="w-24 h-24 bg-amber rounded-[2rem] flex items-center justify-center mx-auto mb-4 shadow-xl shadow-amber/20">
                  <span className="text-3xl font-serif font-bold text-white">
                    {profile?.nombre?.[0]}{profile?.apellido?.[0]}
                  </span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-1">{profile?.nombre} {profile?.apellido}</h3>
                <p className="text-amber text-sm font-bold uppercase tracking-widest mb-6">Nivel 4 Explorador</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <BookOpen className="w-4 h-4 text-amber" />
                    <span>{profile?.colegio}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400">
                    <User className="w-4 h-4 text-amber" />
                    <span>{profile?.barrio}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medals Grid */}
            <div className="bg-[#1a1814] rounded-3xl p-6 border border-white/5">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-500 mb-4">Medallas Ganadas</h4>
              <div className="grid grid-cols-2 gap-3">
                {medals.map((medal, i) => (
                  <div key={i} className={`${medal.bg} rounded-2xl p-4 flex flex-col items-center gap-2 group hover:scale-105 transition-transform cursor-pointer`}>
                    <medal.icon className={`w-8 h-8 ${medal.color}`} />
                    <span className="text-[10px] font-bold uppercase text-white/70">{medal.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Cursos', value: '03', icon: BookOpen },
                { label: 'Encuentros', value: '12', icon: Calendar },
                { label: 'Proyectos', value: '05', icon: Target },
                { label: 'Horas', value: '24', icon: Clock },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1a1814] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber/10 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Skill Map - Hexagonal representation */}
              <div className="bg-[#1a1814] rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-2">
                  <Hexagon className="w-5 h-5 text-amber" /> Mi Mapa de Skills
                </h3>
                <div className="relative h-64 flex items-center justify-center">
                  <div className="absolute inset-0 border-[1px] border-white/5 rounded-full scale-100"></div>
                  <div className="absolute inset-0 border-[1px] border-white/5 rounded-full scale-75"></div>
                  <div className="absolute inset-0 border-[1px] border-white/5 rounded-full scale-50"></div>
                  
                  {/* Hexagon Placeholder / Skill Map */}
                  <div className="relative w-40 h-40 bg-amber/20 flex items-center justify-center" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                    <div className="w-24 h-24 bg-amber/40" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                  </div>
                  
                  {/* Labels */}
                  <div className="absolute top-0 font-bold text-[10px] text-amber uppercase">Creatividad</div>
                  <div className="absolute bottom-0 font-bold text-[10px] text-blue-400 uppercase">Lógica</div>
                  <div className="absolute left-0 font-bold text-[10px] text-green-400 uppercase">Social</div>
                  <div className="absolute right-0 font-bold text-[10px] text-purple-400 uppercase">Análisis</div>
                </div>
              </div>

              {/* Countdown Agenda */}
              <div className="bg-[#1a1814] rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-amber" /> Próximos Pasos
                </h3>
                <div className="space-y-6">
                  {agenda.map((item, i) => (
                    <div key={i} className="flex gap-4 group cursor-pointer">
                      <div className="flex-shrink-0 w-16 h-16 bg-[#0f0e0c] rounded-2xl flex flex-col items-center justify-center border border-white/10 group-hover:border-amber transition-colors">
                        <span className="text-amber font-bold text-lg leading-none">{item.time.split(' ')[1]}</span>
                        <span className="text-[8px] uppercase font-bold text-gray-500">{item.time.split(' ')[2] || 'DÍAS'}</span>
                      </div>
                      <div className="flex-grow pt-1">
                        <h4 className="font-bold text-sm mb-1 group-hover:text-amber transition-colors">{item.title}</h4>
                        <p className="text-xs text-gray-500 mb-2">{item.date}</p>
                        <span className="bg-amber/10 text-amber text-[8px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">{item.type}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Enrolled Courses with Progress */}
            <div className="bg-[#1a1814] rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-serif font-bold mb-8">Mis Experiencias</h3>
              <div className="space-y-8">
                {[
                  { name: 'Negocios Digitales', uni: 'UTDT', progress: 65, color: 'bg-amber' },
                  { name: 'Diseño Global', uni: 'UdeSA', progress: 40, color: 'bg-amber' },
                  { name: 'Economía & Finanzas', uni: 'UCEMA', progress: 100, color: 'bg-green-500' },
                ].map((course, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <div>
                        <h4 className="font-bold text-lg">{course.name}</h4>
                        <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">{course.uni}</p>
                      </div>
                      <span className="text-sm font-bold text-amber">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#0f0e0c] rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${course.color} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(239,159,39,0.3)]`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
