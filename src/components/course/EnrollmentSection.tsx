import { useAuth } from '../../contexts/AuthContext'
import { useState } from 'react'
import { AuthModal } from '../auth/AuthModal'

interface EnrollmentSectionProps {
  onEnroll: () => void
  isEnrolled: boolean
}

export function EnrollmentSection({ onEnroll, isEnrolled }: EnrollmentSectionProps) {
  const { user } = useAuth()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)

  if (!user) {
    return (
      <div className="w-full max-w-sm">
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="w-full py-4 bg-dark-brown dark:bg-white text-white dark:text-dark-brown rounded-xl font-bold hover:opacity-90 transition-all shadow-lg"
        >
          Iniciá sesión para inscribirte
        </button>
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)} 
          initialMode="login"
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm">
      <button
        onClick={onEnroll}
        disabled={isEnrolled}
        className={`w-full py-4 rounded-xl font-bold transition-all shadow-lg active:scale-[0.98] ${
          isEnrolled
            ? 'bg-green-500 text-white cursor-not-allowed'
            : 'bg-amber text-white hover:bg-amber/90 hover:shadow-amber/20'
        }`}
      >
        {isEnrolled ? '¡Ya estás inscripto!' : 'Confirmar Inscripción Gratis'}
      </button>
      {!isEnrolled && (
        <p className="text-[10px] text-dark-brown/40 dark:text-gray-500 font-bold uppercase tracking-widest mt-4">
          Al hacer clic confirmas tu asistencia a los 6 encuentros.
        </p>
      )}
    </div>
  )
}
