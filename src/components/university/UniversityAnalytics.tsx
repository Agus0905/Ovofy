import { Users, Target, BarChart3, Award, TrendingUp } from 'lucide-react'

export function UniversityAnalytics() {
  const metrics = [
    { 
      label: 'Alumnos Interesados', 
      value: '847', 
      trend: '+12% este mes', 
      icon: Users, 
      color: 'text-blue-500', 
      bg: 'bg-blue-500/10' 
    },
    { 
      label: 'Cupos Ocupados', 
      value: '71%', 
      trend: '213 de 300 totales', 
      icon: Target, 
      color: 'text-amber', 
      bg: 'bg-amber/10' 
    },
    { 
      label: 'Tasa de Completitud', 
      value: '88%', 
      trend: 'Finalización de experiencias', 
      icon: Award, 
      color: 'text-green-500', 
      bg: 'bg-green-500/10' 
    },
    { 
      label: 'Match Score Promedio', 
      value: '84/100', 
      trend: 'Afinidad con postulantes', 
      icon: BarChart3, 
      color: 'text-purple-500', 
      bg: 'bg-purple-500/10' 
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1814] p-8 rounded-[2.5rem] border border-dark-brown/5 dark:border-white/5 shadow-xl hover:scale-[1.02] transition-transform">
            <div className={`w-14 h-14 ${stat.bg} rounded-2xl flex items-center justify-center ${stat.color} mb-6`}>
              <stat.icon className="w-7 h-7" />
            </div>
            <p className="text-4xl font-serif font-bold text-dark-brown dark:text-white mb-2">{stat.value}</p>
            <p className="text-[10px] uppercase tracking-[0.2em] font-black text-dark-brown/30 dark:text-gray-500 mb-4">{stat.label}</p>
            <div className="flex items-center gap-2 text-xs font-bold text-dark-brown/60 dark:text-gray-400">
              <TrendingUp className="w-3 h-3 text-green-500" />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-dark-brown dark:bg-amber/5 p-12 rounded-[3.5rem] border border-white/10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber/10 blur-[100px] -mr-32 -mt-32" />
        <h3 className="text-2xl font-serif font-bold mb-8 relative z-10 text-white">Rendimiento Histórico</h3>
        <div className="h-64 flex items-end justify-between gap-4 relative z-10">
          {[40, 65, 45, 90, 55, 80, 71].map((h, i) => (
            <div key={i} className="flex-1 space-y-4 text-center">
              <div 
                className="w-full bg-amber/20 hover:bg-amber transition-all duration-500 rounded-t-xl cursor-help relative group"
                style={{ height: `${h}%` }}
              >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-dark-brown px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {h}% Crecmiento
                </div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Día {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
