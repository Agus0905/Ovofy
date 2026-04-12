import { useState } from 'react'

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-[#0f0e0c]/80 backdrop-blur-sm border-b border-white/10 mb-8 pb-6">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-400">Gestión del sistema y usuarios</p>
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
            onClick={() => setActiveTab('users')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'users'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'settings'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Configuración
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#0f0e0c]/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Resumen del Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Usuarios totales</p>
                  <p className="text-3xl font-bold text-white">5,432</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Universidades</p>
                  <p className="text-3xl font-bold text-white">16</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Cursos activos</p>
                  <p className="text-3xl font-bold text-white">89</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Inscripciones hoy</p>
                  <p className="text-3xl font-bold text-white">47</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Gestión de Usuarios</h2>
              <p className="text-gray-400">Lista de usuarios y roles...</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-semibold text-white mb-6">Configuración del Sistema</h2>
              <p className="text-gray-400">Ajustes generales...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
