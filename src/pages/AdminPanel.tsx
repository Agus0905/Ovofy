import { useState } from 'react'

export function AdminPanel() {
  const [activeTab, setActiveTab] = useState('overview')

  const users = [
    { id: 1, name: 'Juan Smith', email: 'juan@email.com', role: 'Estudiante', status: 'Activo' },
    { id: 2, name: 'María García', email: 'maria@email.com', role: 'Estudiante', status: 'Activo' },
    { id: 3, name: 'Carlos Pérez', email: 'carlos@ditella.edu.ar', role: 'Profesor', status: 'Activo' },
    { id: 4, name: 'Ana López', email: 'ana@ditella.edu.ar', role: 'Universidad', status: 'Activo' }
  ]

  const systemStats = {
    totalUsers: 5432,
    universities: 16,
    activeCourses: 89,
    todayEnrollments: 47
  }

  const logs = [
    { id: 1, action: 'Nuevo usuario registrado', user: 'María García', time: '10:30 AM' },
    { id: 2, action: 'Curso actualizado', user: 'Carlos Pérez', time: '10:15 AM' },
    { id: 3, action: 'Inscripción completada', user: 'Juan Smith', time: '10:00 AM' }
  ]

  return (
    <div className="min-h-screen bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-bold text-white mb-2">
            Panel de Administración
          </h1>
          <p className="text-gray-400">Gestión del sistema y usuarios</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-8 bg-[#1a1814] p-1 rounded-lg">
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
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'logs'
                ? 'bg-amber text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Logs
          </button>
        </div>

        {/* Content */}
        <div className="bg-[#1a1814] rounded-2xl p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-white mb-6">Resumen del Sistema</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Usuarios totales</p>
                  <p className="text-3xl font-bold text-amber">{systemStats.totalUsers}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Universidades</p>
                  <p className="text-3xl font-bold text-amber">{systemStats.universities}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Cursos activos</p>
                  <p className="text-3xl font-bold text-amber">{systemStats.activeCourses}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <p className="text-gray-400 text-sm mb-2">Inscripciones hoy</p>
                  <p className="text-3xl font-bold text-amber">{systemStats.todayEnrollments}</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-white mb-4">Actividad Reciente</h3>
              <div className="space-y-3">
                {logs.map(log => (
                  <div key={log.id} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-white">{log.action}</p>
                      <p className="text-gray-400 text-sm">por {log.user}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-white mb-6">Gestión de Usuarios</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-sm font-medium text-white">Nombre</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white">Email</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white">Rol</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white">Estado</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-white">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-white/10">
                        <td className="px-4 py-3 text-white">{user.name}</td>
                        <td className="px-4 py-3 text-gray-400">{user.email}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-amber/20 text-amber">{user.role}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-500/20 text-green-400">{user.status}</span>
                        </td>
                        <td className="px-4 py-3">
                          <button className="text-amber hover:text-amber/80 text-sm">Editar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-white mb-6">Configuración del Sistema</h2>
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4">Configuración General</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-400 text-sm">Nombre del sistema</label>
                      <p className="text-white">OVOFY</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Email de soporte</label>
                      <p className="text-white">soporte@ovofy.com</p>
                    </div>
                  </div>
                  <button className="btn-primary px-6 py-2 mt-4">Editar Configuración</button>
                </div>
                <div className="bg-white/5 rounded-xl p-6">
                  <h3 className="font-semibold text-white mb-4">Control de Acceso</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber" />
                      <span className="text-white">Registro de estudiantes habilitado</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber" />
                      <span className="text-white">Registro de universidades habilitado</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked className="w-4 h-4 accent-amber" />
                      <span className="text-white">Modo mantenimiento</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'logs' && (
            <div>
              <h2 className="text-2xl font-serif font-semibold text-white mb-6">Logs del Sistema</h2>
              <div className="space-y-3">
                {logs.map(log => (
                  <div key={log.id} className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="text-white">{log.action}</p>
                      <p className="text-gray-400 text-sm">por {log.user}</p>
                    </div>
                    <span className="text-gray-400 text-sm">{log.time}</span>
                  </div>
                ))}
                <div className="bg-white/5 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-white">Sistema iniciado</p>
                    <p className="text-gray-400 text-sm">por System</p>
                  </div>
                  <span className="text-gray-400 text-sm">09:00 AM</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
