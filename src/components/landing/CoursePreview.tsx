import { useState } from 'react'
import { Search, Clock } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const universities = ["Todas", "Di Tella", "UB", "UADE", "UCEMA", "ENERC", "Austral"]
const careers = ["Todas", "Diseño", "Derecho", "Ingeniería", "Economía", "Cine", "Arquitectura", "Marketing", "Medicina"]

const sampleCourses = [
  {
    id: 1,
    title: "Diseño Gráfico",
    university: "Universidad Di Tella",
    career: "Diseño",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=200&fit=crop",
    enrolled: 7,
    totalSpots: 20,
    rating: 4.8,
    trending: true,
    tags: ["Creatividad", "Diseño"]
  },
  {
    id: 2,
    title: "Derecho Corporativo",
    university: "Universidad de Buenos Aires",
    career: "Derecho",
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=200&fit=crop",
    enrolled: 3,
    totalSpots: 20,
    rating: 4.9,
    trending: true,
    tags: ["Derecho", "Negocios"]
  },
  {
    id: 3,
    title: "Ingeniería Industrial",
    university: "UADE",
    career: "Ingeniería",
    image: "https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=400&h=200&fit=crop",
    enrolled: 12,
    totalSpots: 20,
    rating: 4.7,
    trending: false,
    tags: ["Ingeniería", "Industria"]
  }
]

export function CoursePreview({ openAuthModal }: { openAuthModal: (mode: 'login' | 'register') => void }) {
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("Todas")
  const [selectedCareer, setSelectedCareer] = useState("Todas")
  const [showTrending, setShowTrending] = useState(false)
  const [enrolledCourse, setEnrolledCourse] = useState<number | null>(null)

  const filteredCourses = sampleCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUniversity = selectedUniversity === "Todas" || course.university.includes(selectedUniversity)
    const matchesCareer = selectedCareer === "Todas" || course.career === selectedCareer
    const matchesTrending = !showTrending || course.trending
    return matchesSearch && matchesUniversity && matchesCareer && matchesTrending
  })

  const handleEnroll = (courseId: number) => {
    if (!user) {
      openAuthModal('register')
      return
    }
    setEnrolledCourse(courseId)
  }

  return (
    <section id="catalog-section" className="py-20 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-12">
          Catálogo de Cursos
        </h2>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/40" />
          <input
            type="text"
            placeholder="Buscar cursos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-xl text-dark-brown dark:text-[#f5f0e8] placeholder-dark-brown/40 dark:placeholder-gray-400"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
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
            <span>Tendencia</span>
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredCourses.map(course => (
            <div key={course.id} className="bg-white dark:bg-[#1a1814] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-amber font-medium">{course.university}</span>
                  {course.trending && (
                    <span className="text-xs bg-amber/10 text-amber px-2 py-1 rounded-full">En tendencia</span>
                  )}
                </div>
                <h3 className="text-lg font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-2">
                  {course.title}
                </h3>
                <p className="text-sm text-dark-brown/60 dark:text-gray-400 mb-3">{course.career}</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {course.tags.map((tag: string) => (
                    <span key={tag} className="text-xs bg-dark-brown/10 dark:bg-white/10 text-dark-brown dark:text-[#f5f0e8] px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Spots */}
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-dark-brown/80 dark:text-gray-300">{course.enrolled} de {course.totalSpots} cupos</span>
                  </div>
                  <div className="w-full bg-dark-brown/10 dark:bg-white/10 rounded-full h-2">
                    <div
                      className="bg-amber h-2 rounded-full transition-all"
                      style={{ width: `${(course.enrolled / course.totalSpots) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-dark-brown/60 dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>6 encuentros</span>
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

        <div className="text-center">
          <button className="btn-outline px-8 py-3">
            Ver todos →
          </button>
        </div>
      </div>
    </section>
  )
}
