import { useState } from 'react'
import { LayoutDashboard, Users, MessageSquare, Calendar } from 'lucide-react'

export function ProfessorPortal() {
  const [activeTab, setActiveTab] = useState('overview')

  const students = [
    { id: 1, name: 'María González', attendance: 95, grade: 9 },
    { id: 2, name: 'Lucas Fernández', attendance: 88, grade: 8 },
    { id: 3, name: 'Sofía Martínez', attendance: 92, grade: 9 },
    { id: 4, name: 'Tomás Rodríguez', attendance: 78, grade: 7 }
  ]

  const schedule = [
    { id: 1, course: 'Diseño Gráfico', day: 'Sábado', time: '10:00 AM', location: 'Aula 3' },
    { id: 2, course: 'Ingeniería Industrial', day: 'Miércoles', time: '4:00 PM', location: 'Laboratorio 2' }
  ]

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'attendance', label: 'Asistencia', icon: Users },
    { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    { id: 'schedule', label: 'Horarios', icon: Calendar },
  ]

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center md:text-left">
          <span className="text-amber font-bold tracking-widest uppercase text-xs mb-2 block">Portal del Docente</span>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-2">
            ¡Hola, Carlos!
          </h1>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400 font-medium">Gestioná tus clases y el progreso de tus alumnos.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-[#1a1814] rounded-3xl p-4 shadow-sm border border-dark-brown/5 dark:border-white/5 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-amber text-white shadow-lg shadow-amber/20 scale-[1.02]'
                      : 'text-dark-brown/60 dark:text-gray-400 hover:bg-dark-brown/5 dark:hover:bg-white/5'
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
            <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-dark-brown/5 dark:border-white/5">
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-6 text-center border border-dark-brown/5 dark:border-white/5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500 mb-1">Clases</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">08</p>
                    </div>
                    <div className="bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-6 text-center border border-dark-brown/5 dark:border-white/5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500 mb-1">Alumnos</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">24</p>
                    </div>
                    <div className="bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-6 text-center border border-dark-brown/5 dark:border-white/5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500 mb-1">Asistencia</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">88%</p>
                    </div>
                    <div className="bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-6 text-center border border-dark-brown/5 dark:border-white/5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500 mb-1">Promedio</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">8.2</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white">Próxima Clase</h3>
                    <div className="bg-amber text-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl shadow-amber/20">
                      <div>
                        <h4 className="text-2xl font-bold mb-2">Diseño Gráfico - Encuentro 4</h4>
                        <p className="opacity-90 font-medium">Sábado 10:00 AM • Aula Virtual 3</p>
                      </div>
                      <button className="bg-white text-amber px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">Iniciar Sesión</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'attendance' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white">Listado de Alumnos</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-dark-brown/10 dark:border-white/10">
                          <th className="px-4 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Estudiante</th>
                          <th className="px-4 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Asistencia</th>
                          <th className="px-4 py-4 text-left text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Nota</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-dark-brown/5 dark:divide-white/5">
                        {students.map(student => (
                          <tr key={student.id} className="group hover:bg-dark-brown/5 dark:hover:bg-white/5 transition-colors">
                            <td className="px-4 py-5 font-bold text-dark-brown dark:text-white">{student.name}</td>
                            <td className="px-4 py-5">
                              <div className="flex items-center gap-2">
                                <div className="w-24 h-1.5 bg-dark-brown/10 dark:bg-white/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-amber" style={{ width: `${student.attendance}%` }}></div>
                                </div>
                                <span className="text-xs font-bold text-dark-brown/60 dark:text-gray-400">{student.attendance}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-5">
                              <span className="bg-amber/10 text-amber px-3 py-1 rounded-full text-xs font-bold">{student.grade}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'feedback' && <div className="text-center py-20 text-gray-500">Módulo de Feedback en Desarrollo</div>}
              {activeTab === 'schedule' && <div className="text-center py-20 text-gray-500">Calendario de Clases</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
