import { useState } from 'react'
import { Search, SlidersHorizontal, TrendingUp } from 'lucide-react'
import { useCourses } from '../hooks/useCourses'
import { CourseCard } from '../components/catalog/CourseCard'
import { CourseCardSkeleton } from '../components/ui/Skeleton'

const universities = ["Todas", "UTDT", "UCEMA", "ITBA", "UdeSA"]
const categories = ["Todas", "Negocios", "Economía", "Tecnología", "Diseño"]

export function CourseCatalog() {
  const { courses, loading } = useCourses()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUniversity, setSelectedUniversity] = useState("Todas")
  const [selectedCategory, setSelectedCategory] = useState("Todas")
  const [showTrending, setShowTrending] = useState(false)

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesUniversity = selectedUniversity === "Todas" || course.universities.nombre === selectedUniversity
    const matchesCategory = selectedCategory === "Todas" || course.nombre.includes(selectedCategory) || course.descripcion.includes(selectedCategory)
    const matchesTrending = !showTrending || course.tendencia
    
    return matchesSearch && matchesUniversity && matchesCategory && matchesTrending
  })

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-4">
              Explorá tu <span className="text-amber">futuro</span>
            </h1>
            <p className="text-lg text-dark-brown/60 dark:text-gray-400">
              Descubrí carreras universitarias a través de experiencias prácticas diseñadas por las mejores instituciones.
            </p>
          </div>
          
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30 dark:text-gray-500 group-focus-within:text-amber transition-colors" />
            <input
              type="text"
              placeholder="¿Qué te gustaría probar?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-6 py-4 bg-white dark:bg-[#1a1814] border border-dark-brown/10 dark:border-white/10 rounded-2xl w-full md:w-80 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber/20 focus:border-amber transition-all dark:text-white"
            />
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-6 border-b border-dark-brown/5 dark:border-white/5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-dark-brown/5 dark:bg-white/5 rounded-xl text-dark-brown/60 dark:text-gray-400">
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Filtros</span>
            </div>
            
            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/10 dark:border-white/10 rounded-xl text-sm font-medium text-dark-brown dark:text-gray-300 focus:outline-none focus:border-amber"
            >
              {universities.map(uni => (
                <option key={uni} value={uni}>{uni === 'Todas' ? 'Todas las Universidades' : uni}</option>
              ))}
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/10 dark:border-white/10 rounded-xl text-sm font-medium text-dark-brown dark:text-gray-300 focus:outline-none focus:border-amber"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'Todas' ? 'Todas las Categorías' : cat}</option>
              ))}
            </select>

            <button
              onClick={() => setShowTrending(!showTrending)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                showTrending 
                  ? 'bg-amber text-white shadow-md' 
                  : 'bg-white dark:bg-[#1a1814] border border-dark-brown/10 dark:border-white/10 text-dark-brown/60 dark:text-gray-400 hover:border-amber hover:text-amber'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Populares
            </button>
          </div>

          <div className="text-sm text-dark-brown/40 dark:text-gray-500 font-medium">
            Mostrando {filteredCourses.length} cursos
          </div>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <CourseCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-dark-brown/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-dark-brown/20 dark:text-gray-600" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white mb-2">No encontramos resultados</h3>
            <p className="text-dark-brown/60 dark:text-gray-400">Intentá ajustando los filtros o buscando otra cosa.</p>
          </div>
        )}
      </div>
    </div>
  )
}
