export function StudentOverview() {
  return (
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
  )
}
