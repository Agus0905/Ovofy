import { useState } from 'react'

export function UniversityPortal() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-[#0f0e0c]/80 backdrop-blur-sm border-b border-white/10 mb-8 pb-6">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Portal Universidad
          </h1>
          <p className="text-gray-400">Gestioná tus cursos y analiza el rendimiento de estudiantes</p>
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
            onClick={() => setActiveTab('content')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Contenido
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'analytics'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Analíticas
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0f0e0c]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Resumen General</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Cursos activos</p>
                  <p className="text-3xl font-bold text-white">12</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Estudiantes</p>
                  <p className="text-3xl font-bold text-white">1,234</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Tasa de completación</p>
                  <p className="text-3xl font-bold text-white">78%</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Satisfacción</p>
                  <p className="text-3xl font-bold text-white">4.8</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'content' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Gestión de Contenido</h2>
              <p className="text-gray-400">Gestión de cursos y materiales...</p>
            </div>
          )}
          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Analíticas</h2>
              <p className="text-gray-400">Métricas y reportes...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
