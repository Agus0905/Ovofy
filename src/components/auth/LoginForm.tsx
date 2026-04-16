import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface LoginFormProps {
  onSuccess: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
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
      navigate('/perfil')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-6 text-center">
        Iniciar Sesión
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber"
            placeholder="tu@email.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber"
            placeholder="••••••••"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full py-3"
        >
          {loading ? 'Iniciando...' : 'Iniciar Sesión'}
        </button>
      </form>
    </div>
  )
}
