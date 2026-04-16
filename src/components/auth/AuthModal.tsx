import { useState } from 'react'
import { X, User, GraduationCap, School, ShieldCheck } from 'lucide-react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import { useAuth } from '../../contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'register'
}

export function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)
  const { mockLogin } = useAuth()

  if (!isOpen) return null

  const handleMockLogin = (role: 'student' | 'university' | 'professor' | 'admin') => {
    mockLogin(role)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-[#1a1814] rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-dark-brown dark:text-gray-400 hover:text-amber transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          <div className="mb-8">
            <h3 className="text-xl font-serif font-bold text-dark-brown dark:text-white mb-4 text-center">
              Acceso Rápido (Demo)
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleMockLogin('student')}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dark-brown/10 dark:border-white/10 hover:border-amber hover:bg-amber/5 transition-all group"
              >
                <User className="w-6 h-6 text-amber" />
                <span className="text-xs font-medium dark:text-gray-300">Estudiante</span>
              </button>
              <button
                onClick={() => handleMockLogin('university')}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dark-brown/10 dark:border-white/10 hover:border-amber hover:bg-amber/5 transition-all group"
              >
                <School className="w-6 h-6 text-amber" />
                <span className="text-xs font-medium dark:text-gray-300">Universidad</span>
              </button>
              <button
                onClick={() => handleMockLogin('professor')}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dark-brown/10 dark:border-white/10 hover:border-amber hover:bg-amber/5 transition-all group"
              >
                <GraduationCap className="w-6 h-6 text-amber" />
                <span className="text-xs font-medium dark:text-gray-300">Profesor</span>
              </button>
              <button
                onClick={() => handleMockLogin('admin')}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-dark-brown/10 dark:border-white/10 hover:border-amber hover:bg-amber/5 transition-all group"
              >
                <ShieldCheck className="w-6 h-6 text-amber" />
                <span className="text-xs font-medium dark:text-gray-300">Admin</span>
              </button>
            </div>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-dark-brown/10 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-[#1a1814] px-2 text-dark-brown/40 dark:text-gray-500">O ingresá con tus datos</span>
            </div>
          </div>

          {mode === 'login' ? (
            <>
              <LoginForm onSuccess={onClose} />
              <p className="text-center mt-6 text-sm text-dark-brown/60 dark:text-gray-400">
                ¿No tenés cuenta?{' '}
                <button
                  onClick={() => setMode('register')}
                  className="text-amber font-medium hover:underline"
                >
                  Registrarte
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onSuccess={onClose} />
              <p className="text-center mt-6 text-sm text-dark-brown/60 dark:text-gray-400">
                ¿Ya tenés cuenta?{' '}
                <button
                  onClick={() => setMode('login')}
                  className="text-amber font-medium hover:underline"
                >
                  Iniciar sesión
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
