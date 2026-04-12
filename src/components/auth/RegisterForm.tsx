import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

interface RegisterFormProps {
  onSuccess: () => void
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
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
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await register(formData)

    if (error) {
      setError(error.message || 'Error al registrarse')
      setLoading(false)
    } else {
      onSuccess()
      navigate('/perfil')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-6 text-center">
        Crear Cuenta
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
              Apellido
            </label>
            <input
              type="text"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
            required
            minLength={6}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
              DNI
            </label>
            <input
              type="text"
              value={formData.dni}
              onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
              Fecha Nacimiento
            </label>
            <input
              type="date"
              value={formData.fecha_nacimiento}
              onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
              Colegio
            </label>
            <input
              type="text"
              value={formData.colegio}
              onChange={(e) => setFormData({ ...formData, colegio: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-1">
              Barrio
            </label>
            <input
              type="text"
              value={formData.barrio}
              onChange={(e) => setFormData({ ...formData, barrio: e.target.value })}
              className="w-full px-3 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8] focus:outline-none focus:ring-2 focus:ring-amber text-sm"
              required
            />
          </div>
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
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}
