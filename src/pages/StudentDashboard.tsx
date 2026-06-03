import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, BookOpen, User, Trophy, Star, Target, Zap, Clock, CheckCircle2, Loader2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

export function StudentDashboard() {
  const { profile, user } = useAuth()
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboardData() {
      if (!user) return
      
      try {
        setLoading(true)
        
        // Use a 3-second timeout for the database fetch
        const fetchPromise = supabase
          .from('enrollments')
          .select(`
            *,
            courses (
              id,
              nombre,
              universities (
                nombre
              )
            )
          `)
          .eq('student_id', user.id)

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Dashboard sync timeout')), 3000)
        )

        const { data, error } = await Promise.race([
          fetchPromise,
          timeoutPromise
        ]) as any
        
        if (error) throw error
        setEnrolledCourses(data || [])
      } catch (err: any) {
        console.warn('StudentDashboard: Sync failed or timed out.', err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDashboardData()
  }, [user])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f0e0c]">
        <Loader2 className="w-10 h-10 text-amber animate-spin" />
      </div>
    )
  }

  const profileCompleteness = profile?.dni && profile?.fecha_nacimiento ? 100 : 75

  const medals = [
    { icon: Trophy, color: 'text-amber', bg: 'bg-amber/10', label: 'Pionero', desc: 'Completaste el Test Vocacional' },
    { icon: Star, color: 'text-blue-400', bg: 'bg-blue-400/10', label: 'Analista', desc: 'Comparaste 3 universidades' },
    { icon: Target, color: 'text-green-400', bg: 'bg-green-400/10', label: 'Enrolado', desc: 'Te inscribiste a tu primer curso' },
    { icon: Zap, color: 'text-purple-400', bg: 'bg-purple-400/10', label: 'Estratega', desc: 'Definiste tu plan de carrera' },
  ]

  const agenda = [
    { title: 'Próximo Encuentro', time: 'En 3 días', date: 'Sábado 10:00', type: 'Live' },
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
                <h3 className="text-2xl font-serif font-bold mb-1 text-white">{profile?.nombre} {profile?.apellido}</h3>
                <p className="text-amber text-sm font-bold uppercase tracking-widest mb-6">Nivel 4 Explorador</p>
                
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <BookOpen className="w-4 h-4 text-amber" />
                    <span>{profile?.colegio}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <User className="w-4 h-4 text-amber" />
                    <span>{profile?.barrio}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Medals Grid (Quick View) */}
            <div className="bg-[#1a1814] rounded-3xl p-6 border border-white/5">
              <h4 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4">Medallas Ganadas</h4>
              <div className="grid grid-cols-2 gap-3">
                {medals.map((medal, i) => (
                  <div key={i} className={`${medal.bg} rounded-2xl p-4 flex flex-col items-center gap-2 group hover:scale-105 transition-transform cursor-pointer`}>
                    <medal.icon className={`w-8 h-8 ${medal.color}`} />
                    <span className="text-[10px] font-bold uppercase text-white">{medal.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* Profile Completeness Bar */}
            <div className="bg-[#1a1814] p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="w-24 h-24 text-amber" />
              </div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-serif font-bold text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber animate-pulse" /> Completitud del Perfil
                  </h3>
                  <span className="text-2xl font-serif font-bold text-amber">{profileCompleteness}%</span>
                </div>
                <div className="w-full h-4 bg-[#0f0e0c] rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-amber/50 to-amber transition-all duration-1500 ease-out shadow-[0_0_20px_#EF9F27]"
                    style={{ width: `${profileCompleteness}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-400 mt-4 font-medium italic">
                  "¡Casi listo! Completá tu información académica para desbloquear recomendaciones personalizadas por IA."
                </p>
              </div>
            </div>

            {/* Header Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Cursos', value: enrolledCourses.length.toString().padStart(2, '0'), icon: BookOpen },
                { label: 'Encuentros', value: (enrolledCourses.length * 6).toString().padStart(2, '0'), icon: Calendar },
                { label: 'Proyectos', value: '01', icon: Target },
                { label: 'Horas', value: (enrolledCourses.length * 12).toString().padStart(2, '0'), icon: Clock },
              ].map((stat, i) => (
                <div key={i} className="bg-[#1a1814] p-6 rounded-3xl border border-white/5 flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber/10 rounded-2xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-amber" />
                  </div>
                  <div>
                    <div className="text-2xl font-serif font-bold text-white">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Medals Details ... (unchanged) */}
              <div className="bg-[#1a1814] rounded-3xl p-8 border border-white/5">
                <h3 className="text-xl font-serif font-bold mb-8 flex items-center gap-2 text-white">
                  <Star className="w-5 h-5 text-amber" /> Mis Logros Académicos
                </h3>
                <div className="space-y-4">
                  {medals.map((medal, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                      <div className={`${medal.bg} p-3 rounded-xl group-hover:scale-110 transition-transform`}>
                        <medal.icon className={`w-6 h-6 ${medal.color}`} />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">{medal.label}</p>
                        <p className="text-xs text-gray-500">{medal.desc}</p>
                      </div>
                      <div className="ml-auto">
                        <CheckCircle2 className="w-5 h-5 text-amber opacity-40" />
                      </div>
                    </div>
                  ))}
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
                  {enrolledCourses.length === 0 && (
                    <p className="text-sm text-gray-500 text-center py-4 italic">No tienes encuentros programados.</p>
                  )}
                </div>
              </div>
            </div>

            {/* Enrolled Courses with Progress */}
            <div className="bg-[#1a1814] rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-serif font-bold mb-8">Mis Experiencias</h3>
              <div className="space-y-8">
                {enrolledCourses.map((enrollment, i) => {
                  const progress = enrollment.completed ? 100 : 25 // Mock progress for now
                  return (
                    <div key={i} className="space-y-3">
                      <div className="flex justify-between items-end">
                        <div>
                          <h4 className="font-bold text-lg">{enrollment.courses.nombre}</h4>
                          <p className="text-xs text-gray-500 uppercase font-bold tracking-widest">
                            {enrollment.courses.universities.nombre}
                          </p>
                        </div>
                        <span className="text-sm font-bold text-amber">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#0f0e0c] rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${progress === 100 ? 'bg-green-500' : 'bg-amber'} transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(239,159,39,0.3)]`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )
                })}
                {enrolledCourses.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-gray-500 mb-6 italic">Aún no te has inscripto a ninguna experiencia.</p>
                    <Link to="/catalogo" className="text-amber font-bold hover:underline">Explorar Catálogo →</Link>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
