import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { ShieldCheck, School, Mail, Lock, CheckCircle2, XCircle, Loader2, MapPin, ArrowRight } from 'lucide-react'


interface RegisterFormProps {
  onSuccess: () => void
}

type VerificationStatus = 'IDLE' | 'VERIFYING' | 'APPROVED' | 'REJECTED' | 'PENDING'

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [status, setStatus] = useState<VerificationStatus>('IDLE')
  const [errorReason, setErrorReason] = useState('')
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    dni: '',
    fecha_nacimiento: '',
    colegio: '',
    barrio: ''
  })

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('VERIFYING')

    try {
      const { error } = await register(formData)
      if (error) throw error

      setStatus('APPROVED')
      setTimeout(() => {
        onSuccess()
        navigate('/perfil')
      }, 2000)
    } catch (err: any) {
      setStatus('REJECTED')
      setErrorReason(err.message || 'Error al procesar el registro')
    }
  }

  const handleGoogleLogin = async () => {
    setStatus('VERIFYING')
    const { error } = await loginWithGoogle()
    if (error) {
      setStatus('REJECTED')
      setErrorReason('Error al conectar con Google')
    } else {
      setStatus('APPROVED')
      setTimeout(() => {
        onSuccess()
        navigate('/perfil')
      }, 2000)
    }
  }

  if (status === 'APPROVED') {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white mb-2">¡Identidad Validada!</h3>
        <p className="text-dark-brown/60 dark:text-gray-400">Bienvenido a Ovofy. Redirigiendo a tu panel...</p>
      </div>
    )
  }

  if (status === 'REJECTED') {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="w-12 h-12 text-red-500" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-dark-brown dark:text-white mb-2">Validación Fallida</h3>
        <p className="text-red-600 dark:text-red-400 font-medium mb-6 px-4">{errorReason}</p>
        <button 
          onClick={() => setStatus('IDLE')}
          className="text-amber font-bold underline"
        >
          Intentar nuevamente con datos válidos
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Validator Header */}
      <div className="flex items-center gap-3 p-4 bg-amber/5 rounded-2xl border border-amber/10 mb-6">
        <ShieldCheck className="w-6 h-6 text-amber" />
        <div>
          <h4 className="text-sm font-bold text-dark-brown dark:text-white uppercase tracking-wider">Oficial de Admisiones Digital</h4>
          <p className="text-xs text-dark-brown/60 dark:text-gray-400 font-medium">Validación de credenciales educativas activa</p>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          disabled={status === 'VERIFYING'}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-xl text-dark-brown dark:text-[#f5f0e8] font-bold hover:bg-dark-brown/5 dark:hover:bg-white/5 transition-all shadow-sm group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Registrarse con Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-brown/10 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
            <span className="bg-white dark:bg-[#1a1814] px-3 text-dark-brown/40 dark:text-gray-500">O completá el formulario</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleVerify} className="space-y-5">
        {step === 1 && (
          <div className="space-y-4 animate-slide-in-right">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Nombre</label>
                <input
                  type="text"
                  required
                  placeholder="Juan"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Apellido</label>
                <input
                  type="text"
                  required
                  placeholder="Pérez"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.apellido}
                  onChange={e => setFormData({ ...formData, apellido: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30" />
                <input
                  type="email"
                  required
                  placeholder="usuario@email.com"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setStep(2)}
              className="w-full py-4 bg-dark-brown dark:bg-white text-white dark:text-dark-brown rounded-xl font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 group"
            >
              Siguiente Paso <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-slide-in-right">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">DNI</label>
                <input
                  type="text"
                  required
                  placeholder="12.345.678"
                  className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.dni}
                  onChange={e => setFormData({ ...formData, dni: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">F. Nacimiento</label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.fecha_nacimiento}
                  onChange={e => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Colegio / Institución</label>
              <div className="relative">
                <School className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30" />
                <input
                  type="text"
                  required
                  placeholder="Nombre de tu colegio"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.colegio}
                  onChange={e => setFormData({ ...formData, colegio: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Barrio / Ciudad</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/30" />
                <input
                  type="text"
                  required
                  placeholder="Ej: Palermo, CABA"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.barrio}
                  onChange={e => setFormData({ ...formData, barrio: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="px-6 py-4 bg-dark-brown/5 dark:bg-white/5 text-dark-brown dark:text-white rounded-xl font-bold hover:bg-dark-brown/10 transition-all"
              >
                Volver
              </button>
              <button 
                type="submit"
                disabled={status === 'VERIFYING'}
                className="flex-1 py-4 bg-amber text-white rounded-xl font-bold shadow-lg shadow-amber/20 hover:bg-amber/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {status === 'VERIFYING' ? (
                  <>Registrando... <Loader2 className="w-5 h-5 animate-spin" /></>
                ) : (
                  <>Crear Cuenta <CheckCircle2 className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}
      </form>

      <p className="text-[10px] text-center text-dark-brown/40 dark:text-gray-500 font-medium italic">
        Al registrarte, aceptas que nuestro Oficial Digital verifique tus credenciales según los criterios de seguridad escolar 2024/2025.
      </p>
    </div>
  )
}
