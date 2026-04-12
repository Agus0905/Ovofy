export function SystemOverview() {
  return (
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
  )
}
