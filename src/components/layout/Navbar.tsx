import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { UserMenu } from './UserMenu'
import { Sun, Moon } from 'lucide-react'

export function Navbar({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'register') => void }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { profile } = useAuth()
  const location = useLocation()

  // Determine if the current page has a dark background by default
  const isDarkPage = location.pathname === '/perfil' || location.pathname === '/admin'

  useEffect(() => {
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
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    { name: 'Cómo Funciona', path: '/como-funciona' }
  ]

  const textClass = isScrolled 
    ? 'text-dark-brown dark:text-[#f5f0e8]' 
    : isDarkPage 
      ? 'text-white' 
      : 'text-dark-brown dark:text-[#f5f0e8]'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-warm-cream/95 dark:bg-[#0f0e0c]/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">O</span>
            </div>
            <span className={`text-2xl font-serif font-bold ${textClass}`}>OVOFY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber'
                    : `${textClass} hover:text-amber`
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${textClass} hover:bg-white/10`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* User Menu / Login Button */}
          <div className="hidden md:block">
            {profile ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="btn-outline text-sm px-4 py-2"
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
                <button className="btn-outline text-sm px-4 py-2 w-full">
                  Iniciar Sesión
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
