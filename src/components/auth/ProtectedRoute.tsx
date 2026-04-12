import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: string
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { profile, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-cream dark:bg-[#0f0e0c]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber"></div>
      </div>
    )
  }

  if (!profile) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

  if (requiredRole && profile.role !== requiredRole) {
    // Redirect to appropriate dashboard based on role
    if (profile.role === 'student') return <Navigate to="/perfil" replace />
    if (profile.role === 'university') return <Navigate to="/universidad" replace />
    if (profile.role === 'professor') return <Navigate to="/profesor" replace />
    if (profile.role === 'admin') return <Navigate to="/admin" replace />
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}
