import { useState } from 'react'
import { Search, Clock, Sparkles } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getUniversityStyle } from '../../utils/universityStyles'

const universities = ["Todas", "Di Tella", "UB", "UADE", "UCEMA", "ENERC", "Austral"]
const careers = ["Todas", "Diseño", "Derecho", "Ingeniería", "Economía", "Cine", "Arquitectura", "Marketing", "Medicina"]

const sampleCourses = [
  {
    id: 1,
    title: "Diseño Gráfico",
    university: "Universidad Di Tella",
    career: "Diseño",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Torcuato_di_tella_logo.jpg",
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Logo_UCEMA.svg/1200px-Logo_UCEMA.svg.png", // Using UCEMA as fallback for reliable logo
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
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Logo_ITBA.svg/1024px-Logo_ITBA.svg.png", // Using ITBA as fallback for reliable logo
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
    <section id="catalog-section" className="py-24 bg-warm-cream dark:bg-[#0f0e0c] relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-6">
            Catálogo de Cursos
          </h2>
          <p className="text-dark-brown/60 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            Experimentá tu futura carrera antes de elegirla. Cursos prácticos dictados por las mejores universidades.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-12 max-w-2xl mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30 group-focus-within:text-amber transition-colors" />
          <input
            type="text"
            placeholder="Buscar por carrera, universidad o habilidad..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-white dark:bg-[#1a1814] border border-dark-brown/10 dark:border-white/10 rounded-2xl text-dark-brown dark:text-white placeholder-dark-brown/30 shadow-xl focus:ring-2 focus:ring-amber/20 outline-none transition-all"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#1a1814] rounded-xl shadow-sm border border-dark-brown/5">
            <span className="text-[10px] font-bold text-dark-brown/40 uppercase tracking-widest">Uni</span>
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="bg-transparent text-sm font-bold text-dark-brown dark:text-white outline-none cursor-pointer"
            >
              {universities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-white dark:bg-[#1a1814] rounded-xl shadow-sm border border-dark-brown/5">
            <span className="text-[10px] font-bold text-dark-brown/40 uppercase tracking-widest">Área</span>
            <select
              value={selectedCareer}
              onChange={(e) => setSelectedCareer(e.target.value)}
              className="bg-transparent text-sm font-bold text-dark-brown dark:text-white outline-none cursor-pointer"
            >
              {careers.map(career => (
                <option key={career} value={career}>{career}</option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setShowTrending(!showTrending)}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all flex items-center gap-2 border ${
              showTrending
                ? 'bg-amber text-white border-amber shadow-lg shadow-amber/20'
                : 'bg-white dark:bg-[#1a1814] border-dark-brown/10 text-dark-brown dark:text-white hover:border-amber/50'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Tendencia
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredCourses.map(course => {
            const uniStyle = getUniversityStyle(course.university)
            return (
              <div key={course.id} className="bg-white dark:bg-[#1a1814] rounded-[2rem] overflow-hidden shadow-sm border border-dark-brown/5 dark:border-white/5 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                {/* Artistic Background Design */}
                <div className={`relative h-48 ${uniStyle.bg} flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-105`}>
                  <div 
                    className="absolute inset-0 opacity-40 dark:opacity-20"
                    style={{ 
                      backgroundImage: uniStyle.pattern,
                      backgroundSize: '40px 40px'
                    }} 
                  />
                  
                  {/* University Logo (Medium Light) */}
                  <div className="relative z-10 p-6 transform group-hover:scale-110 transition-transform duration-700">
                    <img 
                      src={course.logo} 
                      alt={course.university} 
                      className="w-24 h-24 object-contain opacity-60 dark:opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" 
                    />
                  </div>

                  {course.trending && (
                    <div className="absolute top-4 right-4 bg-amber text-white p-2 rounded-full shadow-lg">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}
                </div>

                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-amber/10 flex items-center justify-center text-amber">
                      <Clock className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 uppercase tracking-[0.2em]">{course.university}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-dark-brown dark:text-white mb-3 group-hover:text-amber transition-colors">
                    {course.title}
                  </h3>
                  
                  <p className="text-sm text-dark-brown/60 dark:text-gray-400 mb-6 line-clamp-2">
                    {course.career} • Explorá esta carrera a través de 6 encuentros intensivos y prácticos.
                  </p>

                  {/* Spots */}
                  <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 uppercase tracking-widest">Cupos Disponibles</span>
                      <span className="text-xs font-bold text-dark-brown dark:text-white">{course.enrolled} de {course.totalSpots}</span>
                    </div>
                    <div className="w-full h-1.5 bg-dark-brown/5 dark:bg-white/5 rounded-full overflow-hidden">
                      <div
                        className="bg-amber h-full rounded-full transition-all duration-1000"
                        style={{ width: `${(course.enrolled / course.totalSpots) * 100}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => handleEnroll(course.id)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all shadow-md active:scale-[0.98] ${
                      enrolledCourse === course.id 
                        ? 'bg-green-500 text-white' 
                        : 'bg-amber text-white hover:bg-amber/90 hover:shadow-amber/20'
                    }`}
                  >
                    {enrolledCourse === course.id ? '¡Inscripto!' : 'Reservar Lugar'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <button className="px-12 py-4 bg-dark-brown/5 dark:bg-white/5 rounded-2xl font-bold text-dark-brown dark:text-white hover:bg-dark-brown/10 transition-all border border-dark-brown/10">
            Explorar Catálogo Completo →
          </button>
        </div>
      </div>
    </section>
  )
}
