import { useState, useEffect } from 'react'
import { LayoutDashboard, BookOpen, BarChart3, Settings, Plus, Loader2, Save, Trash2, Users, MapPin, GraduationCap, RefreshCw } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { Link } from 'react-router-dom'

export function UniversityPortal() {
  const { user, profile, loading: authLoading } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [courses, setCourses] = useState<any[]>([])
  const [uniData, setUniData] = useState<any>(null)
  const [error, setError] = useState('')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [debugLog, setDebugLog] = useState<string[]>([])

  const addLog = (msg: string) => {
    console.log(`UniversityPortal: ${msg}`)
    setDebugLog(prev => [...prev.slice(-4), msg])
  }
  
  const [newCourse, setNewCourse] = useState({
    nombre: '',
    carrera: '',
    descripcion: '',
    cupos_total: 20,
    image_url: 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800'
  })

  const fetchData = async () => {
    if (!user || !profile) {
      addLog('Esperando perfil...')
      return
    }

    if (profile.role !== 'university') {
      addLog('Error: El usuario no tiene rol de universidad')
      setError('Tu cuenta no tiene permisos de Universidad.')
      setLoading(false)
      return
    }
    
    addLog(`Iniciando búsqueda para: ${profile.nombre}`)
    setLoading(true)
    setError('')
    
    try {
      // 1. Traemos todas las universidades para comparar flexiblemente
      const { data: allUnis, error: uniError } = await supabase
        .from('universities')
        .select('*')
      
      if (uniError) throw uniError

      // Buscamos coincidencia (que el nombre de la uni esté en el nombre del perfil o viceversa)
      const myName = (profile.nombre || '').toLowerCase()
      const found = allUnis?.find(u => {
        const uName = u.nombre.toLowerCase()
        return myName.includes(uName) || uName.includes(myName)
      })

      if (!found) {
        addLog('No se encontró coincidencia en la tabla universities')
        setUniData(null)
        setLoading(false)
        return
      }

      addLog(`Institución vinculada: ${found.nombre}`)
      setUniData(found)
      
      // 2. Cargar cursos
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          enrollments (
            id,
            profiles (
              barrio,
              colegio
            )
          )
        `)
        .eq('university_id', found.id)
      
      if (coursesError) throw coursesError
      
      addLog(`Cursos cargados: ${coursesData?.length || 0}`)
      setCourses(coursesData || [])

    } catch (err: any) {
      addLog(`Error fatal: ${err.message}`)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Reduced from 8s to 3s for better UX, will show error if not loaded
    const timer = setTimeout(() => {
      if (loading) setLoading(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [user, profile])

  // PANTALLA DE CARGA CON DEBUG
  if (loading || (authLoading && !error)) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-warm-cream dark:bg-[#0f0e0c] p-6 text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-amber/10 border-t-amber rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-serif text-2xl font-bold text-amber text-white">O</div>
        </div>
        <h2 className="text-xl font-serif font-bold text-dark-brown dark:text-white mb-2">Sincronizando Dashboard</h2>
        <div className="max-w-xs w-full bg-black/5 dark:bg-white/5 p-4 rounded-2xl space-y-2">
          {debugLog.map((log, i) => (
            <p key={i} className="text-[10px] font-mono text-dark-brown/40 dark:text-gray-500 uppercase tracking-widest">{log}</p>
          ))}
        </div>
        <button 
          onClick={() => fetchData()}
          className="mt-8 flex items-center gap-2 text-amber font-bold text-sm hover:underline"
        >
          <RefreshCw className="w-4 h-4" /> Forzar Re-intento
        </button>
      </div>
    )
  }

  // ERROR DE ROL O PERFIL
  if (!uniData && !loading) {
    return (
      <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-32 px-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#1a1814] p-12 rounded-[3rem] text-center border border-amber-500/20 shadow-2xl">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-8 text-amber-500">
            <Settings className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-white mb-4">
            {error ? 'Acceso Denegado' : 'Institución No Vinculada'}
          </h2>
          <p className="text-dark-brown/60 dark:text-gray-400 mb-8 leading-relaxed">
            {error || `No encontramos una universidad llamada exactamente "${profile?.nombre}" en nuestra base de datos institucional.`}
          </p>
          {!error && (
            <div className="bg-amber/5 p-8 rounded-3xl mb-10 text-left border border-amber/10 text-sm">
              <p className="font-bold text-amber mb-4 uppercase tracking-widest">Solución Rápida:</p>
              <p className="mb-4 dark:text-gray-300 text-dark-brown/70">Asegúrate de que en la tabla <code className="bg-amber/20 px-1 rounded">universities</code> de Supabase exista una fila donde el nombre sea exactamente:</p>
              <code className="block bg-amber text-white p-3 rounded-xl text-center font-bold text-lg mb-4">{profile?.nombre}</code>
            </div>
          )}
          <div className="flex gap-4">
            <Link to="/" className="flex-1 px-8 py-4 bg-dark-brown/5 dark:bg-white/5 text-dark-brown dark:text-white rounded-xl font-bold hover:bg-dark-brown/10 transition-all">Inicio</Link>
            <button onClick={() => fetchData()} className="flex-1 bg-amber text-white px-8 py-4 rounded-xl font-bold hover:bg-amber/90 shadow-lg transition-all">Reintentar</button>
          </div>
        </div>
      </div>
    )
  }

  // --- RESTO DEL DASHBOARD IGUAL QUE ANTES PERO CON MÁS SEGURIDAD ---
  const totalEnrollments = courses.reduce((acc, c) => acc + (c.enrollments?.length || 0), 0)
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'content', label: 'Gestión de Cursos', icon: BookOpen },
    { id: 'analytics', label: 'Data Intelligence', icon: BarChart3 },
    { id: 'settings', label: 'Perfil Institucional', icon: Settings },
  ]

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!uniData) return
    setIsSubmitting(true)
    try {
      const { error } = await supabase.from('courses').insert({
        ...newCourse,
        university_id: uniData.id,
        cupos_disponibles: newCourse.cupos_total,
        is_active: true
      })
      if (error) throw error
      setShowCreateModal(false)
      fetchData()
    } catch (err: any) { alert('Error: ' + err.message) }
    finally { setIsSubmitting(false) }
  }

  const handleDeleteCourse = async (id: string) => {
    if (!confirm('¿Eliminar esta experiencia?')) return
    await supabase.from('courses').delete().eq('id', id)
    fetchData()
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Institutional Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in">
          <div>
            <div className="flex items-center gap-5 mb-4">
              <div className="w-20 h-20 bg-white rounded-3xl p-3 shadow-2xl border border-dark-brown/5 overflow-hidden flex items-center justify-center">
                {uniData?.logo_url ? (
                  <img src={uniData.logo_url} alt="Logo" className="w-full h-full object-contain" />
                ) : (
                  <GraduationCap className="w-10 h-10 text-amber" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-amber/10 text-amber text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-amber/20 text-white">Partner Verificado</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown dark:text-white leading-none">
                  {uniData?.nombre}
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-dark-brown/40 dark:text-gray-500 font-bold">
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber" /> {uniData?.location || 'Sin ubicación'}</span>
              <span className="flex items-center gap-2"><BookOpen className="w-4 h-4 text-amber" /> {courses.length} Cursos</span>
              <span className="flex items-center gap-2"><Users className="w-4 h-4 text-amber" /> {totalEnrollments} Leads</span>
            </div>
          </div>

          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-amber text-white px-10 py-5 rounded-[1.5rem] font-bold flex items-center gap-3 shadow-2xl shadow-amber/20 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-6 h-6" /> Nueva Experiencia
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-white/70 dark:bg-white/5 backdrop-blur-xl rounded-[2.5rem] p-5 border border-white/20 dark:border-white/10 space-y-2 sticky top-28 shadow-2xl text-white">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-amber text-white shadow-xl shadow-amber/20 translate-x-2'
                      : 'text-dark-brown/40 dark:text-gray-400 hover:bg-dark-brown/5 dark:hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-9">
            {activeTab === 'overview' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'Leads Totales', value: totalEnrollments, icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                    { label: 'Conversion', value: '84%', icon: BarChart3, color: 'text-amber', bg: 'bg-amber/10' },
                    { label: 'Satisfacción', value: '4.9★', icon: Save, color: 'text-green-500', bg: 'bg-green-500/10' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-[#1a1814] p-8 rounded-[2.5rem] border border-dark-brown/5 dark:border-white/5 shadow-xl">
                      <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-6`}>
                        <stat.icon className="w-7 h-7" />
                      </div>
                      <p className="text-4xl font-serif font-bold text-dark-brown dark:text-white mb-1">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-brown/30 dark:text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-white dark:bg-[#1a1814] p-10 rounded-[3rem] border border-dark-brown/5 dark:border-white/5 shadow-2xl relative overflow-hidden">
                  <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white mb-10">Estado de Cupos</h3>
                  <div className="space-y-10">
                    {courses.map(course => {
                      const percentage = (course.enrollments?.length / course.cupos_total * 100) || 0
                      return (
                        <div key={course.id} className="space-y-4">
                          <div className="flex justify-between items-end">
                            <h4 className="font-bold text-xl text-dark-brown dark:text-white">{course.nombre}</h4>
                            <span className="text-amber font-black">{percentage.toFixed(0)}%</span>
                          </div>
                          <div className="w-full h-3 bg-dark-brown/5 dark:bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-amber transition-all duration-1000" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in">
                {courses.map(course => (
                  <div key={course.id} className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-6 border border-dark-brown/5 dark:border-white/5 shadow-xl group">
                    <div className="relative h-48 bg-dark-brown/5 dark:bg-white/5 rounded-3xl mb-6 overflow-hidden">
                      <img src={course.image_url} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000" />
                    </div>
                    <h4 className="font-bold text-2xl text-dark-brown dark:text-white mb-2">{course.nombre}</h4>
                    <p className="text-sm text-dark-brown/60 dark:text-gray-400 line-clamp-3 mb-8">{course.descripcion}</p>
                    <div className="flex gap-3">
                      <button className="flex-1 py-4 bg-dark-brown/5 dark:bg-white/5 rounded-2xl text-xs font-black uppercase text-dark-brown dark:text-white hover:bg-amber hover:text-white transition-all">Editar</button>
                      <button onClick={() => handleDeleteCourse(course.id)} className="p-4 bg-red-500/5 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="animate-fade-in">
                <div className="bg-dark-brown dark:bg-amber/5 p-12 rounded-[3.5rem] border border-white/10 text-white">
                  <h3 className="text-3xl font-serif font-bold mb-10 text-center">Data Intelligence</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5">
                      <h4 className="text-amber text-xs font-black uppercase tracking-widest mb-8 text-white">Colegios con más Leads</h4>
                      <div className="space-y-6">
                        {(() => {
                          const counts: Record<string, number> = {}
                          courses.forEach(c => c.enrollments?.forEach((e: any) => {
                            const s = e.profiles?.colegio || 'Otro'
                            counts[s] = (counts[s] || 0) + 1
                          }))
                          return Object.entries(counts).sort((a,b) => b[1]-a[1]).map(([s, c]) => (
                            <div key={s} className="flex justify-between items-center text-sm">
                              <span className="opacity-80">{s}</span>
                              <span className="font-bold text-amber">{c}</span>
                            </div>
                          ))
                        })()}
                      </div>
                    </div>
                    <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/5 text-white">
                      <h4 className="text-amber text-xs font-black uppercase tracking-widest mb-8">Zonas Geográficas</h4>
                      <div className="space-y-6">
                        {(() => {
                          const counts: Record<string, number> = {}
                          courses.forEach(c => c.enrollments?.forEach((e: any) => {
                            const b = e.profiles?.barrio || 'Otro'
                            counts[b] = (counts[b] || 0) + 1
                          }))
                          return Object.entries(counts).map(([b, c]) => (
                            <div key={b} className="flex justify-between items-center text-sm">
                              <span className="opacity-80">{b}</span>
                              <span className="font-bold text-amber">{((c/totalEnrollments)*100).toFixed(0)}%</span>
                            </div>
                          ))
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal Nueva Experiencia */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowCreateModal(false)} />
          <div className="relative bg-white dark:bg-[#1a1814] rounded-[3rem] shadow-2xl max-w-2xl w-full p-12 animate-slide-up text-white">
            <h2 className="text-4xl font-serif font-bold text-dark-brown dark:text-white mb-8">Nueva Experiencia</h2>
            <form onSubmit={handleCreateCourse} className="space-y-6">
              <div className="grid grid-cols-2 gap-6 text-white">
                <input type="text" placeholder="Nombre del curso" required className="w-full px-6 py-4 bg-dark-brown/5 dark:bg-[#0f0e0c] rounded-2xl border-2 border-transparent focus:border-amber outline-none transition-all font-bold" value={newCourse.nombre} onChange={e => setNewCourse({...newCourse, nombre: e.target.value})} />
                <input type="text" placeholder="Carrera" required className="w-full px-6 py-4 bg-dark-brown/5 dark:bg-[#0f0e0c] rounded-2xl border-2 border-transparent focus:border-amber outline-none transition-all font-bold" value={newCourse.carrera} onChange={e => setNewCourse({...newCourse, carrera: e.target.value})} />
              </div>
              <textarea placeholder="Descripción" rows={4} required className="w-full px-6 py-4 bg-dark-brown/5 dark:bg-[#0f0e0c] rounded-2xl border-2 border-transparent focus:border-amber outline-none transition-all font-medium text-white" value={newCourse.descripcion} onChange={e => setNewCourse({...newCourse, descripcion: e.target.value})} />
              <div className="grid grid-cols-2 gap-6 text-white">
                <input type="number" placeholder="Cupos" required className="w-full px-6 py-4 bg-dark-brown/5 dark:bg-[#0f0e0c] rounded-2xl border-2 border-transparent focus:border-amber outline-none transition-all font-bold" value={newCourse.cupos_total} onChange={e => setNewCourse({...newCourse, cupos_total: parseInt(e.target.value)})} />
                <input type="text" placeholder="URL Imagen" required className="w-full px-6 py-4 bg-dark-brown/5 dark:bg-[#0f0e0c] rounded-2xl border-2 border-transparent focus:border-amber outline-none transition-all font-bold" value={newCourse.image_url} onChange={e => setNewCourse({...newCourse, image_url: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-5 bg-dark-brown/5 dark:bg-white/5 rounded-2xl font-black uppercase text-dark-brown/40 dark:text-gray-400">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 py-5 bg-amber text-white rounded-2xl font-black uppercase shadow-xl flex items-center justify-center gap-3">
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Publicar Ahora'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
