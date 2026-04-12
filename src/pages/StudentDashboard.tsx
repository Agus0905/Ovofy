import { useState } from 'react'

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Mi Dashboard
          </h1>
          <p className="text-gray-400">Bienvenido a tu espacio de aprendizaje</p>
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
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'courses'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Mis Cursos
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'skills'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Habilidades
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0f0e0c]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Cursos en progreso</p>
                  <p className="text-3xl font-bold text-white">3</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Horas completadas</p>
                  <p className="text-3xl font-bold text-white">24</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Certificados</p>
                  <p className="text-3xl font-bold text-white">1</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'courses' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Mis Cursos</h2>
              <p className="text-gray-400">Contenido de cursos en progreso...</p>
            </div>
          )}
          {activeTab === 'skills' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Mis Habilidades</h2>
              <p className="text-gray-400">Mapa de habilidades...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
