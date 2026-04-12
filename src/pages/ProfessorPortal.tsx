import { useState } from 'react'

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

  return (
    <div className="min-h-screen bg-warm-cream pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-dark-brown mb-2">
            Portal Profesor
          </h1>
          <p className="text-dark-brown/80">Prof. Carlos Pérez - Universidad Di Tella</p>
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
            onClick={() => setActiveTab('attendance')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'attendance'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Asistencia
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'feedback'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'schedule'
                ? 'bg-amber text-white'
                : 'text-dark-brown hover:text-amber'
            }`}
          >
            Horarios
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Clases este mes</p>
                  <p className="text-3xl font-bold text-amber">8</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Estudiantes</p>
                  <p className="text-3xl font-bold text-amber">24</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Asistencia promedio</p>
                  <p className="text-3xl font-bold text-amber">88%</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-6 border border-dark-brown/10">
                  <p className="text-dark-brown/60 text-sm mb-2">Calificación promedio</p>
                  <p className="text-3xl font-bold text-amber">8.2</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-dark-brown mb-4">Próxima Clase</h3>
              <div className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-dark-brown">Diseño Gráfico - Encuentro 4</h4>
                    <p className="text-dark-brown/80 text-sm">Sábado 10:00 AM - Aula 3</p>
                  </div>
                  <button className="btn-primary px-4 py-2 text-sm">Ver Detalles</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Control de Asistencia</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-dark-brown/10">
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-brown">Estudiante</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-brown">Asistencia</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-brown">Calificación</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-dark-brown">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id} className="border-b border-dark-brown/10">
                        <td className="px-4 py-3 text-dark-brown">{student.name}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            student.attendance >= 90 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.attendance}%
                          </span>
                        </td>
                        <td className="px-4 py-3 text-amber font-bold">{student.grade}</td>
                        <td className="px-4 py-3">
                          <button className="text-amber hover:text-amber/80 text-sm">Ver detalles</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Feedback de Estudiantes</h2>
              <div className="space-y-4">
                <div className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-dark-brown">María González</h4>
                    <span className="text-amber">★★★★★</span>
                  </div>
                  <p className="text-dark-brown/80 text-sm">"Las clases son muy claras y prácticas. Me ayudó mucho a entender la carrera."</p>
                </div>
                <div className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-dark-brown">Lucas Fernández</h4>
                    <span className="text-amber">★★★★☆</span>
                  </div>
                  <p className="text-dark-brown/80 text-sm">"Buen contenido, pero a veces el ritmo es un poco rápido."</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'schedule' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-dark-brown mb-6">Horarios de Clases</h2>
              <div className="space-y-4">
                {schedule.map(item => (
                  <div key={item.id} className="bg-warm-cream rounded-xl p-4 border border-dark-brown/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-dark-brown">{item.course}</h4>
                        <p className="text-dark-brown/80 text-sm">{item.day} {item.time} - {item.location}</p>
                      </div>
                      <button className="btn-primary px-4 py-2 text-sm">Gestionar</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
