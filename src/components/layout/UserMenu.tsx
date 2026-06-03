import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { profile, logout } = useAuth()
  const navigate = useNavigate()

  const getInitials = () => {
    if (!profile) return 'U'
    const nombre = profile.nombre || ''
    const apellido = profile.apellido || ''
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase()
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
    setIsOpen(false)
  }

  const getDashboardPath = () => {
    if (profile?.role === 'university') return '/universidad'
    if (profile?.role === 'professor') return '/profesor'
    if (profile?.role === 'admin') return '/admin'
    return '/perfil'
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-amber text-white flex items-center justify-center font-semibold hover:bg-amber/90 transition-colors"
      >
        {getInitials()}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1814] rounded-xl shadow-lg border border-dark-brown/10 dark:border-[#2a2620] py-2 z-50">
            <div className="px-4 py-2 border-b border-dark-brown/10 dark:border-white/10 mb-2">
              <p className="text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">
                {profile?.nombre} {profile?.apellido}
              </p>
              <p className="text-xs text-dark-brown/60 dark:text-gray-400 capitalize">
                Rol: {profile?.role}
              </p>
            </div>
            <Link
              to={getDashboardPath()}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-sm text-dark-brown dark:text-[#f5f0e8] hover:bg-dark-brown/5 dark:hover:bg-white/5 font-bold"
            >
              Ir al Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10"
            >
              Cerrar Sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}
