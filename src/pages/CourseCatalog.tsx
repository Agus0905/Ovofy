import { useState } from 'react'
import { Search, Users, Clock } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const universities = ["Todas", "Di Tella", "UB", "UADE", "UCEMA", "ENERC"]
const careers = ["Todas", "Medicina", "Administración", "Derecho", "Ingeniería", "Diseño"]

export function CourseCatalog() {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("Todas")
  const [selectedCareer, setSelectedCareer] = useState("Todas")
  const [showTrending, setShowTrending] = useState(false)
  const [enrolledCourse, setEnrolledCourse] = useState<number | null>(null)

  const handleEnroll = (courseId: number) => {
    if (!user) {
      alert('Por favor inicia sesión para inscribirte')
      return
    }
    setEnrolledCourse(courseId)
    setTimeout(() => setEnrolledCourse(null), 3000)
  }

  const courses = [
    {
      id: 1,
      title: "Medicina en Acción",
      university: "Universidad Austral",
      career: "Medicina",
      duration: "4 semanas",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
      enrolled: 1200,
      rating: 4.9,
      trending: true
    },
    {
      id: 2,
      title: "Negocios Digitales",
      university: "Di Tella",
      career: "Administración",
      duration: "3 semanas",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
      enrolled: 850,
      rating: 4.8,
      trending: true
    },
    {
      id: 3,
      title: "Ingeniería Industrial",
      university: "UADE",
      career: "Ingeniería",
      duration: "5 semanas",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&h=200&fit=crop",
      enrolled: 12,
      rating: 4.7,
      trending: false
    },
    {
      id: 4,
      title: "Economía y Finanzas",
      university: "UCEMA",
      career: "Economía",
      duration: "6 semanas",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=400&h=200&fit=crop",
      enrolled: 0,
      rating: 4.6,
      trending: false
    },
    {
      id: 5,
      title: "Cine y TV",
      university: "ENERC",
      career: "Cine",
      duration: "4 semanas",
      image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=200&fit=crop",
      enrolled: 5,
      rating: 4.8,
      trending: true
    },
    {
      id: 6,
      title: "Arquitectura",
      university: "Universidad Di Tella",
      career: "Arquitectura",
      duration: "5 semanas",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
      enrolled: 9,
      rating: 4.7,
      trending: false
    },
    {
      id: 7,
      title: "Marketing Digital",
      university: "UADE",
      career: "Marketing",
      duration: "6 semanas",
      image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&h=200&fit=crop",
      enrolled: 15,
      rating: 4.6,
      trending: false
    },
    {
      id: 8,
      title: "Medicina en Acción",
      university: "Universidad Austral",
      career: "Medicina",
      duration: "4 semanas",
      image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
      enrolled: 2,
      rating: 4.9,
      trending: true
    }
  ]

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.career.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUniversity = selectedUniversity === "Todas" || course.university === selectedUniversity
    const matchesCareer = selectedCareer === "Todas" || course.career === selectedCareer
    const matchesTrending = !showTrending || course.trending
    
    return matchesSearch && matchesUniversity && matchesCareer && matchesTrending
  })

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6">
            Catálogo de Cursos
          </h1>
          <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 max-w-3xl mx-auto">
            Cursos prácticos de las mejores universidades argentinas
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-dark-brown/40 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Buscar cursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-xl text-dark-brown dark:text-[#f5f0e8] placeholder-dark-brown/40 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <select
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
          >
            {universities.map(uni => (
              <option key={uni} value={uni}>{uni}</option>
            ))}
          </select>

          <select
            value={selectedCareer}
            onChange={(e) => setSelectedCareer(e.target.value)}
            className="px-4 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
          >
            {careers.map(career => (
              <option key={career} value={career}>{career}</option>
            ))}
          </select>

          <button
            onClick={() => setShowTrending(!showTrending)}
            className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
              showTrending
                ? 'bg-amber text-white border-amber'
                : 'bg-white dark:bg-[#1a1814] border-dark-brown/20 dark:border-[#2a2620] text-dark-brown dark:text-[#f5f0e8]'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Trending</span>
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-[#1a1814] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
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
                  onClick={() => handleEnroll(course.id)}
                  className="btn-primary w-full"
                >
                  {enrolledCourse === course.id ? '¡Inscripto!' : 'Inscribirme'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
