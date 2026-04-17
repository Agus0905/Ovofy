import { useState } from 'react'
import { LayoutDashboard, BookOpen, BarChart3, Settings } from 'lucide-react'

export function UniversityPortal() {
  const [activeTab, setActiveTab] = useState('overview')

  const courses = [
    { id: 1, name: 'Diseño Gráfico', enrolled: 45, completion: 78, rating: 4.8 },
    { id: 2, name: 'Ingeniería Industrial', enrolled: 32, completion: 65, rating: 4.6 },
    { id: 3, name: 'Derecho Corporativo', enrolled: 28, completion: 82, rating: 4.9 }
  ]

  const analytics = {
    totalStudents: 105,
    activeCourses: 3,
    avgCompletion: 75,
    satisfaction: 4.7
  }

  const tabs = [
    { id: 'overview', label: 'Resumen', icon: LayoutDashboard },
    { id: 'content', label: 'Contenido', icon: BookOpen },
    { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
    { id: 'settings', label: 'Configuración', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <span className="text-amber font-bold tracking-widest uppercase text-xs mb-2 block">Panel Institucional</span>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-2">
            Universidad Di Tella
          </h1>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400 font-medium">Gestión de experiencias y analíticas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Navigation Sidebar */}
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

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-dark-brown/5 dark:border-white/5">
              {activeTab === 'overview' && (
                <div className="space-y-10">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Activos</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">{analytics.activeCourses}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Alumnos</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">{analytics.totalStudents}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Progreso</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">{analytics.avgCompletion}%</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Feedback</p>
                      <p className="text-3xl font-serif font-bold text-dark-brown dark:text-white">{analytics.satisfaction}★</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white">Cursos en Curso</h3>
                    <div className="grid grid-cols-1 gap-4">
                      {courses.map(course => (
                        <div key={course.id} className="bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-6 flex items-center justify-between group hover:bg-white dark:hover:bg-[#1a1814] hover:shadow-xl transition-all border border-transparent hover:border-amber/20">
                          <div>
                            <h4 className="font-bold text-lg text-dark-brown dark:text-white mb-1">{course.name}</h4>
                            <p className="text-sm text-dark-brown/60 dark:text-gray-400">{course.enrolled} estudiantes inscriptos</p>
                          </div>
                          <div className="text-right">
                            <span className="text-amber font-bold text-xl block">{course.completion}%</span>
                            <span className="text-[10px] uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500">Completion</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white">Editor de Experiencias</h3>
                    <button className="bg-amber text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-amber/20">Nuevo Curso</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map(course => (
                      <div key={course.id} className="border border-dark-brown/10 dark:border-white/10 rounded-3xl p-6 space-y-4">
                        <div className="w-full h-32 bg-dark-brown/5 dark:bg-white/5 rounded-2xl"></div>
                        <h4 className="font-bold text-lg text-dark-brown dark:text-white">{course.name}</h4>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2 bg-dark-brown/5 dark:bg-white/5 rounded-xl text-xs font-bold text-dark-brown dark:text-white">Editar Syllabus</button>
                          <button className="flex-1 py-2 bg-dark-brown/5 dark:bg-white/5 rounded-xl text-xs font-bold text-dark-brown dark:text-white">Multimedia</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ... other tabs would be similarly styled ... */}
              {activeTab === 'analytics' && <div className="text-center py-20 text-gray-500">Módulo de Analíticas Avanzadas en Desarrollo</div>}
              {activeTab === 'settings' && <div className="text-center py-20 text-gray-500">Configuración de la Institución</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
