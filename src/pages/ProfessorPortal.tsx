import { useState } from 'react'

export function ProfessorPortal() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-[#0f0e0c]/80 backdrop-blur-sm border-b border-white/10 mb-8 pb-6">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Portal Profesor
          </h1>
          <p className="text-gray-400">Gestioná tus clases y el seguimiento de estudiantes</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-white/10 p-1 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'overview'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Resumen
          </button>
          <button
            onClick={() => setActiveTab('attendance')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'attendance'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Asistencia
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'feedback'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Feedback
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0f0e0c]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Clases este mes</p>
                  <p className="text-3xl font-bold text-white">24</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Estudiantes</p>
                  <p className="text-3xl font-bold text-white">156</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Asistencia promedio</p>
                  <p className="text-3xl font-bold text-white">92%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Calificación promedio</p>
                  <p className="text-3xl font-bold text-white">8.5</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'attendance' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Control de Asistencia</h2>
              <p className="text-gray-400">Registro de asistencia...</p>
            </div>
          )}
          {activeTab === 'feedback' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Feedback</h2>
              <p className="text-gray-400">Comentarios y evaluaciones...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
