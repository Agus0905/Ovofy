import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-cream dark:bg-[#0f0e0c]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber"></div>
      </div>
    )
  }

  // If not even logged in to Supabase
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // If student but missing critical info (like from a Google login)
  // We check 'user' exists but 'profile' is missing DNI
  if (!profile || (profile.role === 'student' && !profile.dni)) {
    if (location.pathname !== '/completar-perfil') {
      return <Navigate to="/completar-perfil" replace />
    }
  }

  if (requiredRole && profile?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (profile?.role === 'student') return <Navigate to="/perfil" replace />
    if (profile?.role === 'university') return <Navigate to="/universidad" replace />
    if (profile?.role === 'professor') return <Navigate to="/profesor" replace />
    if (profile?.role === 'admin') return <Navigate to="/admin" replace />
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
