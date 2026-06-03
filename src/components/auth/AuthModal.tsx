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

  if (!isOpen) return null

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
          <div className="text-center mb-8">
            <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white mb-2">
              {mode === 'login' ? 'Bienvenido de nuevo' : 'Creá tu cuenta'}
            </h3>
            <p className="text-sm text-dark-brown/60 dark:text-gray-400">
              {mode === 'login' 
                ? 'Ingresá para continuar tu camino universitario.' 
                : 'Empezá a experimentar tu futuro hoy mismo.'}
            </p>
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
