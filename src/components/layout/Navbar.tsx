import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { UserMenu } from './UserMenu'
import { useAuth } from '../../contexts/AuthContext'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { profile } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Catálogo', path: '/catalogo' },
    { name: 'Comparador', path: '/comparar' },
    { name: 'Quiz', path: '/quiz' },
    { name: 'Cómo Funciona', path: '/como-funciona' }
  ]

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
            <span className="text-2xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8]">OVOFY</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-amber'
                    : 'text-dark-brown dark:text-[#f5f0e8] hover:text-amber'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* User Menu / Login Button */}
          <div className="hidden md:block">
            {profile ? (
              <UserMenu />
            ) : (
              <button
                onClick={() => {/* TODO: Open auth modal */}}
                className="btn-primary text-sm px-4 py-2"
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
              {profile ? (
                <div className="pt-4 border-t border-dark-brown/10 dark:border-white/10">
                  <UserMenu />
                </div>
              ) : (
                <button className="btn-primary text-sm px-4 py-2 w-full">
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
