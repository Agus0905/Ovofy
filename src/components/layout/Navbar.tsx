import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserMenu } from './UserMenu'
import { Sun, Moon, Search } from 'lucide-react'
import { SearchModal } from '../ui/SearchModal'

export function Navbar({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'register') => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [hoveredRect, setHoveredRect] = useState<{ x: number, width: number } | null>(null)
  const { profile } = useAuth()
  const location = useLocation()

  // Determine if the current page has a dark background by default
  const isDarkPage = location.pathname === '/perfil' || location.pathname === '/admin'

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    const saved = localStorage.getItem('ovofy_theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefersDark)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect()
    if (parentRect) {
      setHoveredRect({
        x: rect.left - parentRect.left,
        width: rect.width
      })
    }
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('ovofy_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('ovofy_theme', 'light')
    }
  }

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Comparador', path: '/comparar' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Mentorías', path: '/mentorias' },
    { name: 'Cómo Funciona', path: '/como-funciona' }
  ]

  const textClass = isScrolled 
    ? 'text-dark-brown dark:text-[#f5f0e8]' 
    : isDarkPage 
      ? 'text-white' 
      : 'text-dark-brown dark:text-[#f5f0e8]'

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-warm-cream/90 dark:bg-[#0f0e0c]/90 backdrop-blur-md shadow-xl py-2' 
          : 'bg-transparent py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-amber rounded-xl flex items-center justify-center shadow-lg shadow-amber/20 group-hover:rotate-12 transition-transform duration-300">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className={`text-2xl font-serif font-extrabold tracking-tight ${textClass} transition-colors`}>
                OVOFY
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 relative bg-dark-brown/5 dark:bg-white/5 p-1 rounded-2xl border border-dark-brown/5 dark:border-white/5" onMouseLeave={() => setHoveredRect(null)}>
              {/* Sliding Background Pill */}
              {hoveredRect && (
                <div 
                  className="absolute h-full top-0 bg-white dark:bg-[#1a1814] rounded-xl shadow-sm border border-dark-brown/10 dark:border-white/10 transition-all duration-300 ease-out z-0"
                  style={{ 
                    left: `${hoveredRect.x}px`,
                    width: `${hoveredRect.width}px`
                  }}
                />
              )}

              {navLinks.map((link) => {
                const isActive = location.pathname === link.path
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onMouseEnter={handleMouseEnter}
                    className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all duration-300 relative z-10 flex flex-col items-center ${
                      isActive
                        ? 'text-amber'
                        : `${textClass} hover:text-dark-brown dark:hover:text-white`
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute -bottom-1 w-1 h-1 bg-amber rounded-full shadow-[0_0_8px_#EF9F27]" />
                    )}
                  </Link>
                )
              })}
              
              <div className="w-[1px] h-6 bg-dark-brown/10 dark:bg-white/10 mx-2" />
              
              <button
                onClick={() => setIsSearchOpen(true)}
                className={`p-2 rounded-xl transition-all ${textClass} hover:bg-white dark:hover:bg-[#1a1814] hover:shadow-sm flex items-center gap-2`}
                title="Buscar (Ctrl+K)"
              >
                <Search className="w-5 h-5" />
                <span className="text-[10px] font-bold opacity-40 border border-current px-1 rounded hidden lg:block">⌘K</span>
              </button>

              <button
                onClick={toggleDarkMode}
                className={`p-2 rounded-xl transition-all ${textClass} hover:bg-white dark:hover:bg-[#1a1814] hover:shadow-sm`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>

            {/* User Menu / Login Button */}
            <div className="hidden md:block">
              {profile ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => onOpenAuth('login')}
                  className="bg-amber text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-amber/20 hover:bg-amber/90 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  Iniciar Sesión
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg text-dark-brown dark:text-[#f5f0e8]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-dark-brown/10 dark:border-white/10">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname === link.path
                        ? 'text-amber'
                        : 'text-dark-brown dark:text-[#f5f0e8]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsSearchOpen(true)
                  }}
                  className="flex items-center gap-2 text-sm font-medium text-dark-brown dark:text-[#f5f0e8]"
                >
                  <Search className="w-5 h-5" /> Buscar
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 text-sm font-medium text-dark-brown dark:text-[#f5f0e8]"
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
                </button>
                {profile ? (
                  <div className="pt-4 border-t border-dark-brown/10 dark:border-white/10">
                    <UserMenu />
                  </div>
                ) : (
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      onOpenAuth('login')
                    }}
                    className="bg-amber text-white px-6 py-2.5 rounded-xl font-bold text-sm w-full"
                  >
                    Iniciar Sesión
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
