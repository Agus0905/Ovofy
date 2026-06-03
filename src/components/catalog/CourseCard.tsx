import { TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { Course } from '../../hooks/useCourses'
import { getUniversityStyle } from '../../utils/universityStyles'

interface CourseCardProps {
  course: Course
}

export function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate()
  const cuposOcupados = course.cupos_total - course.cupos_disponibles
  const progressPercent = (cuposOcupados / course.cupos_total) * 100
  const uniStyle = getUniversityStyle(course.universities.nombre)

  return (
    <div className="bg-white dark:bg-[#1a1814] rounded-2xl overflow-hidden shadow-sm border border-dark-brown/5 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
      <div className={`relative h-56 overflow-hidden ${uniStyle.bg} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
        {/* Artistic Background Design */}
        <div 
          className="absolute inset-0 opacity-40 dark:opacity-20"
          style={{ 
            backgroundImage: uniStyle.pattern,
            backgroundSize: '40px 40px'
          }} 
        />
        
        {/* University Logo (Medium Light) */}
        <div className="relative z-10 p-8 transform group-hover:scale-110 transition-transform duration-700">
          <img 
            src={course.universities.logo_url} 
            alt={course.universities.nombre} 
            className="w-32 h-32 object-contain opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                const fallback = document.createElement('div');
                fallback.className = 'text-2xl font-serif font-bold text-dark-brown/20 dark:text-white/20 uppercase text-center';
                fallback.innerText = course.universities.nombre;
                parent.appendChild(fallback);
              }
            }}
          />
        </div>

        <div className="absolute top-4 left-4">
          <div className="bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-sm border border-dark-brown/5 dark:border-white/5">
            <img src={course.universities.logo_url} alt={course.universities.nombre} className="w-5 h-5 object-contain" />
            <span className="text-[10px] font-bold tracking-wider uppercase text-dark-brown dark:text-white">
              {course.universities.nombre}
            </span>
          </div>
        </div>
        {course.tendencia && (
          <div className="absolute top-4 right-4 bg-amber text-white p-2 rounded-full shadow-lg">
            <TrendingUp className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-2 leading-tight">
          {course.nombre}
        </h3>
        <p className="text-sm text-dark-brown/60 dark:text-gray-400 mb-6 line-clamp-2">
          {course.descripcion}
        </p>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 font-bold">
                Cupos Disponibles
              </span>
              <span className="text-xs font-bold text-dark-brown dark:text-white">
                {course.cupos_disponibles} de {course.cupos_total}
              </span>
            </div>
            <div className="w-full h-1.5 bg-dark-brown/5 dark:bg-white/5 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${
                  progressPercent > 80 ? 'bg-red-500' : 'bg-amber'
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <button 
            onClick={() => navigate(`/curso/${course.id}`)}
            className="w-full py-3 bg-amber hover:bg-amber/90 text-white rounded-xl font-bold text-sm transition-all shadow-md hover:shadow-amber/20 active:scale-[0.98]"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  )
}
