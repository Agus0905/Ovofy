import { useState } from 'react'

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('panel')

  return (
    <div className="min-h-screen bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#1a1814] rounded-2xl p-6 sticky top-24">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-amber rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl font-bold text-white">JS</span>
                </div>
                <h3 className="text-xl font-semibold text-white">Juan Smith</h3>
                <p className="text-gray-400 text-sm">Colegio Nacional Buenos Aires</p>
                <p className="text-gray-400 text-sm">Palermo</p>
              </div>

              {/* Medals */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Medallas</h4>
                <div className="flex flex-wrap gap-2">
                  <div className="w-8 h-8 bg-amber/20 rounded-full flex items-center justify-center">
                    <span className="text-amber">🏆</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400">⭐</span>
                  </div>
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-400">🎯</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-[#1a1814] p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('panel')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'panel'
                    ? 'bg-amber text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mi Panel
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
                onClick={() => setActiveTab('data')}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'data'
                    ? 'bg-amber text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Mis Datos
              </button>
            </div>

            {/* Tab Content */}
            <div className="bg-[#1a1814] rounded-2xl p-6">
              {activeTab === 'panel' && (
                <div className="space-y-8">
                  <section>
                    <h2 className="text-2xl font-serif font-semibold text-white mb-4">Pasaporte de Carreras</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-amber text-2xl font-bold">3</p>
                        <p className="text-gray-400 text-sm">Cursos completados</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-amber text-2xl font-bold">2</p>
                        <p className="text-gray-400 text-sm">En progreso</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-amber text-2xl font-bold">5</p>
                        <p className="text-gray-400 text-sm">Carreras exploradas</p>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 text-center">
                        <p className="text-amber text-2xl font-bold">24</p>
                        <p className="text-gray-400 text-sm">Horas totales</p>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-serif font-semibold text-white mb-4">Tu Agenda</h2>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-2 h-12 bg-amber rounded-full" />
                        <div>
                          <p className="text-white font-medium">Diseño Gráfico - Encuentro 3</p>
                          <p className="text-gray-400 text-sm">Sábado 10:00 AM</p>
                        </div>
                      </div>
                      <div className="bg-white/5 rounded-xl p-4 flex items-center gap-4">
                        <div className="w-2 h-12 bg-blue-500 rounded-full" />
                        <div>
                          <p className="text-white font-medium">Ingeniería Industrial - Encuentro 2</p>
                          <p className="text-gray-400 text-sm">Miércoles 4:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-serif font-semibold text-white mb-4">Tu Mapa Vocacional</h2>
                    <div className="bg-white/5 rounded-xl p-6">
                      <div className="aspect-square max-w-md mx-auto relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-32 h-32 bg-amber/20 rounded-full flex items-center justify-center">
                            <span className="text-amber font-bold">Perfil</span>
                          </div>
                        </div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2">
                          <div className="bg-amber/30 rounded-lg px-3 py-1 text-center">
                            <p className="text-white text-xs">Creatividad</p>
                            <p className="text-amber font-bold">85%</p>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2">
                          <div className="bg-blue-500/30 rounded-lg px-3 py-1 text-center">
                            <p className="text-white text-xs">Lógica</p>
                            <p className="text-blue-400 font-bold">70%</p>
                          </div>
                        </div>
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2">
                          <div className="bg-green-500/30 rounded-lg px-3 py-1 text-center">
                            <p className="text-white text-xs">Social</p>
                            <p className="text-green-400 font-bold">90%</p>
                          </div>
                        </div>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2">
                          <div className="bg-purple-500/30 rounded-lg px-3 py-1 text-center">
                            <p className="text-white text-xs">Análisis</p>
                            <p className="text-purple-400 font-bold">75%</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-2xl font-serif font-semibold text-white mb-4">Tus Fortalezas</h2>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Creatividad</span>
                          <span className="text-amber">85%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-amber h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Trabajo en equipo</span>
                          <span className="text-amber">90%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-amber h-2 rounded-full" style={{ width: '90%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-white">Resolución de problemas</span>
                          <span className="text-amber">75%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div className="bg-amber h-2 rounded-full" style={{ width: '75%' }} />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === 'courses' && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Diseño Gráfico</h3>
                        <p className="text-gray-400 text-sm">Universidad Di Tella</p>
                      </div>
                      <span className="bg-amber/20 text-amber px-3 py-1 rounded-full text-sm">En progreso</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-amber">50%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-amber h-2 rounded-full" style={{ width: '50%' }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-amber text-white px-4 py-2 rounded-lg text-sm">Descargar Certificado</button>
                      <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm">Mis Notas</button>
                      <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm">Agregar a Google Calendar</button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Ingeniería Industrial</h3>
                        <p className="text-gray-400 text-sm">UADE</p>
                      </div>
                      <span className="bg-amber/20 text-amber px-3 py-1 rounded-full text-sm">En progreso</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-amber">33%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-amber h-2 rounded-full" style={{ width: '33%' }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm">Mis Notas</button>
                      <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm">Agregar a Google Calendar</button>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">Derecho Corporativo</h3>
                        <p className="text-gray-400 text-sm">UBA</p>
                      </div>
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">Completado</span>
                    </div>
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-400">Progreso</span>
                        <span className="text-green-400">100%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }} />
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-amber text-white px-4 py-2 rounded-lg text-sm">Descargar Certificado</button>
                      <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm">Mis Notas</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'data' && (
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-xl p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Información Personal</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-gray-400 text-sm">Nombre</label>
                        <p className="text-white">Juan</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Apellido</label>
                        <p className="text-white">Smith</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Email</label>
                        <p className="text-white">juan.smith@email.com</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">DNI</label>
                        <p className="text-white">12345678</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Fecha de Nacimiento</label>
                        <p className="text-white">15/05/2007</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Colegio</label>
                        <p className="text-white">Colegio Nacional Buenos Aires</p>
                      </div>
                      <div>
                        <label className="text-gray-400 text-sm">Barrio</label>
                        <p className="text-white">Palermo</p>
                      </div>
                    </div>
                    <button className="btn-primary px-6 py-2">Editar Datos</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
