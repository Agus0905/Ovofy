import { Users } from 'lucide-react'

interface CourseCardProps {
  course: {
    id: number
    title: string
    university: string
    career: string
    duration: string
    image: string
    enrolled: number
    rating: number
    trending: boolean
  }
  onEnroll: (courseId: number) => void
  enrolledCourse: number | null
}

export function CourseCard({ course, onEnroll, enrolledCourse }: CourseCardProps) {
  return (
    <div className="bg-white dark:bg-[#1a1814] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-amber font-medium">{course.university}</span>
          {course.trending && (
            <span className="text-xs bg-amber/10 text-amber px-2 py-1 rounded-full">Trending</span>
          )}
        </div>
        <h3 className="text-xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-2">
          {course.title}
        </h3>
        <p className="text-sm text-dark-brown/60 dark:text-gray-400 mb-4">{course.career}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm text-dark-brown/60 dark:text-gray-400">
            <Users className="w-4 h-4" />
            <span>{course.enrolled} inscritos</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-amber">★</span>
            <span className="text-sm text-dark-brown dark:text-[#f5f0e8]">{course.rating}</span>
          </div>
        </div>
        <button
          onClick={() => onEnroll(course.id)}
          className="btn-primary w-full"
        >
          {enrolledCourse === course.id ? '¡Inscripto!' : 'Inscribirme'}
        </button>
      </div>
    </div>
  )
}
