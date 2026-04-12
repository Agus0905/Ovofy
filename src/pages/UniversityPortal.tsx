import { useState } from 'react'

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

  return (
    <div className="min-h-screen bg-warm-cream pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-dark-brown mb-2">
            Portal Universidad
          </h1>
          <p className="text-dark-brown/80">Universidad Di Tella - Gestión de Cursos</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-white p-1 rounded-lg shadow-sm">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Contenido
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Analíticas
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Configuración
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Cursos activos</p>
                  <p className="text-3xl font-bold text-amber">{analytics.activeCourses}</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Estudiantes</p>
                  <p className="text-3xl font-bold text-amber">{analytics.totalStudents}</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Completación promedio</p>
                  <p className="text-3xl font-bold text-amber">{analytics.avgCompletion}%</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Satisfacción</p>
                  <p className="text-3xl font-bold text-amber">{analytics.satisfaction}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-dark-brown mb-4">Cursos Activos</h3>
              <div className="space-y-4">
                {courses.map(course => (
                  <div key={course.id} className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-dark-brown">{course.name}</h4>
                      <span className="text-amber font-bold">{course.rating} ★</span>
                    </div>
                    <div className="flex gap-6 text-sm text-dark-brown/80">
                      <span>{course.enrolled} estudiantes</span>
                      <span>{course.completion}% completación</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Gestión de Contenido</h2>
              <div className="space-y-4">
                <div className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-dark-brown">Diseño Gráfico</h3>
                    <button className="btn-primary px-4 py-2 text-sm">Editar</button>
                  </div>
                  <p className="text-dark-brown/80 text-sm mb-2">6 encuentros programados</p>
                  <p className="text-dark-brown/60 text-sm">Última actualización: hace 2 días</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-dark-brown">Ingeniería Industrial</h3>
                    <button className="btn-primary px-4 py-2 text-sm">Editar</button>
                  </div>
                  <p className="text-dark-brown/80 text-sm mb-2">5 encuentros programados</p>
                  <p className="text-dark-brown/60 text-sm">Última actualización: hace 5 días</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Analíticas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <h3 className="font-semibold text-dark-brown mb-4">Rendimiento por Curso</h3>
                  {courses.map(course => (
                    <div key={course.id} className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-dark-brown/80">{course.name}</span>
                        <span className="text-amber">{course.completion}%</span>
                      </div>
                      <div className="w-full bg-dark-brown/10 rounded-full h-2">
                        <div className="bg-amber h-2 rounded-full" style={{ width: `${course.completion}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <h3 className="font-semibold text-dark-brown mb-4">Estadísticas</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-dark-brown/60 text-sm">Total de inscripciones</p>
                      <p className="text-2xl font-bold text-amber">{analytics.totalStudents}</p>
                    </div>
                    <div>
                      <p className="text-dark-brown/60 text-sm">Tasa de retención</p>
                      <p className="text-2xl font-bold text-amber">85%</p>
                    </div>
                    <div>
                      <p className="text-dark-brown/60 text-sm">NPS Promedio</p>
                      <p className="text-2xl font-bold text-amber">72</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Configuración</h2>
              <div className="space-y-6">
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <h3 className="font-semibold text-dark-brown mb-4">Información de la Universidad</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-dark-brown/60 text-sm">Nombre</label>
                      <p className="text-dark-brown">Universidad Di Tella</p>
                    </div>
                    <div>
                      <label className="text-dark-brown/60 text-sm">Email de contacto</label>
                      <p className="text-dark-brown">contacto@ditella.edu.ar</p>
                    </div>
                  </div>
                  <button className="btn-primary px-6 py-2 mt-4">Editar Información</button>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <h3 className="font-semibold text-dark-brown mb-4">Notificaciones</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber" />
                      <span className="text-dark-brown">Recibir notificaciones de nuevos estudiantes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber" />
                      <span className="text-dark-brown">Reporte semanal de rendimiento</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
