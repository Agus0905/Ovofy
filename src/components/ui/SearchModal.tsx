import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, GraduationCap, Landmark, BookOpen, X, Command } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  id: string
  title: string
  category: 'universidad' | 'carrera' | 'curso'
  path: string
}

const MOCK_DATA: SearchResult[] = [
  { id: '1', title: 'Universidad Di Tella', category: 'universidad', path: '/comparar' },
  { id: '2', title: 'UCEMA', category: 'universidad', path: '/comparar' },
  { id: '3', title: 'Ingeniería en Software', category: 'carrera', path: '/comparar' },
  { id: '4', title: 'Medicina', category: 'carrera', path: '/comparar' },
  { id: '5', title: 'Introducción a la IA', category: 'curso', path: '/curso/1' },
  { id: '6', title: 'Marketing Digital', category: 'curso', path: '/curso/2' },
  { id: '7', title: 'ITBA', category: 'universidad', path: '/comparar' },
  { id: '8', title: 'Economía', category: 'carrera', path: '/comparar' },
]

export function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    } else {
      setQuery('')
      setResults([])
    }
  }, [isOpen])

  useEffect(() => {
    if (query.length > 1) {
      const filtered = MOCK_DATA.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [query])

  const handleSelect = (path: string) => {
    navigate(path)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[10vh] px-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-dark-brown/40 backdrop-blur-sm" 
        />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#1a1814] rounded-2xl shadow-2xl border border-dark-brown/10 dark:border-white/10 overflow-hidden"
        >
          <div className="flex items-center p-4 border-b border-dark-brown/5 dark:border-white/5">
            <Search className="w-5 h-5 text-dark-brown/40 dark:text-gray-500" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Busca carreras, universidades o cursos..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-lg text-dark-brown dark:text-white placeholder:text-dark-brown/30"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="flex items-center gap-1 px-2 py-1 bg-dark-brown/5 dark:bg-white/5 rounded-md text-[10px] font-bold text-dark-brown/40 dark:text-gray-500">
              <span className="text-xs">ESC</span>
            </div>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {query.length <= 1 ? (
              <div className="p-8 text-center">
                <Command className="w-12 h-12 text-dark-brown/10 dark:text-white/10 mx-auto mb-4" />
                <p className="text-dark-brown/40 dark:text-gray-500 font-medium">Escribe algo para empezar a buscar</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleSelect(result.path)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-amber/5 dark:hover:bg-amber/10 transition-colors text-left group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-warm-cream dark:bg-[#0f0e0c] flex items-center justify-center text-amber group-hover:bg-amber group-hover:text-white transition-colors">
                      {result.category === 'universidad' && <Landmark className="w-5 h-5" />}
                      {result.category === 'carrera' && <GraduationCap className="w-5 h-5" />}
                      {result.category === 'curso' && <BookOpen className="w-5 h-5" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-dark-brown dark:text-white">{result.title}</p>
                      <p className="text-xs text-dark-brown/40 dark:text-gray-500 uppercase tracking-widest font-bold">{result.category}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <X className="w-12 h-12 text-red-500/20 mx-auto mb-4" />
                <p className="text-dark-brown/40 dark:text-gray-500">No encontramos resultados para "{query}"</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-warm-cream/30 dark:bg-white/5 border-t border-dark-brown/5 dark:border-white/5 flex justify-between items-center text-[10px] font-bold text-dark-brown/30 dark:text-gray-500 uppercase tracking-widest">
            <div className="flex gap-4">
              <span className="flex items-center gap-1"><span className="p-1 bg-white dark:bg-[#1a1814] rounded shadow-sm border border-dark-brown/5">↑↓</span> Navegar</span>
              <span className="flex items-center gap-1"><span className="p-1 bg-white dark:bg-[#1a1814] rounded shadow-sm border border-dark-brown/5">ENTER</span> Seleccionar</span>
            </div>
            <span>OVOFY SEARCH v1.0</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
