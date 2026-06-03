import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { GraduationCap, UserCog, ShieldCheck, Loader2 } from 'lucide-react'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState<string | null>(null)
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await login(email, password)

    if (error) {
      setError(error.message || 'Error al iniciar sesión')
      setLoading(false)
    } else {
      onSuccess()
      navigate('/dashboard')
    }
  }

  const handleDemoLogin = async (role: 'university' | 'professor' | 'admin') => {
    setError('')
    setDemoLoading(role)
    const demoEmail = `demo-${role}@ovofy.com`
    const demoPassword = 'demo123456'

    const { error } = await login(demoEmail, demoPassword)

    if (error) {
      setError(`Error en demo: ${error.message}`)
      setDemoLoading(null)
    } else {
      onSuccess()
      navigate('/dashboard')
    }
  }

  const handleGoogleLogin = async () => {
    setError('')
    setLoading(true)
    const { error } = await loginWithGoogle()
    if (error) {
      setError('Error al conectar con Google')
      setLoading(false)
    } else {
      onSuccess()
      navigate('/perfil')
    }
  }

  return (
    <div className="space-y-6">
      {/* Demo Access Section */}
      <div className="bg-amber/5 border border-amber/10 rounded-2xl p-4 space-y-3">
        <p className="text-[10px] uppercase tracking-widest font-black text-amber text-center mb-1">Acceso Rápido (Demo)</p>
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleDemoLogin('university')}
            disabled={!!demoLoading}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white dark:bg-white/5 border border-dark-brown/5 hover:border-amber/50 transition-all group"
          >
            {demoLoading === 'university' ? <Loader2 className="w-4 h-4 animate-spin text-amber" /> : <GraduationCap className="w-4 h-4 text-dark-brown/40 group-hover:text-amber" />}
            <span className="text-[9px] font-bold text-dark-brown/60 dark:text-gray-400">Universidad</span>
          </button>
          <button
            onClick={() => handleDemoLogin('professor')}
            disabled={!!demoLoading}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white dark:bg-white/5 border border-dark-brown/5 hover:border-amber/50 transition-all group"
          >
            {demoLoading === 'professor' ? <Loader2 className="w-4 h-4 animate-spin text-amber" /> : <UserCog className="w-4 h-4 text-dark-brown/40 group-hover:text-amber" />}
            <span className="text-[9px] font-bold text-dark-brown/60 dark:text-gray-400">Profesor</span>
          </button>
          <button
            onClick={() => handleDemoLogin('admin')}
            disabled={!!demoLoading}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white dark:bg-white/5 border border-dark-brown/5 hover:border-amber/50 transition-all group"
          >
            {demoLoading === 'admin' ? <Loader2 className="w-4 h-4 animate-spin text-amber" /> : <ShieldCheck className="w-4 h-4 text-dark-brown/40 group-hover:text-amber" />}
            <span className="text-[9px] font-bold text-dark-brown/60 dark:text-gray-400">Admin</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleGoogleLogin}
          disabled={loading || !!demoLoading}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-xl text-dark-brown dark:text-[#f5f0e8] font-bold hover:bg-dark-brown/5 dark:hover:bg-white/5 transition-all shadow-sm group"
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continuar con Google
        </button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-dark-brown/10 dark:border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
            <span className="bg-white dark:bg-[#1a1814] px-3 text-dark-brown/40 dark:text-gray-500">O ingresá con email</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-xs font-bold">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading || !!demoLoading}
          className="w-full py-4 bg-amber text-white rounded-xl font-bold shadow-lg shadow-amber/20 hover:bg-amber/90 transition-all flex items-center justify-center disabled:opacity-50"
        >
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}
