interface Course {
  id: number
  title: string
  progress: number
  university: string
}

interface CourseProgressProps {
  courses: Course[]
}

export function CourseProgress({ courses }: CourseProgressProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Mis Cursos</h2>
      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h3 className="text-lg font-semibold text-white">{course.title}</h3>
                <p className="text-sm text-gray-400">{course.university}</p>
              </div>
              <span className="text-amber font-medium">{course.progress}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-amber h-2 rounded-full transition-all"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
