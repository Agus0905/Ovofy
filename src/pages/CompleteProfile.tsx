import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ShieldCheck, User, School, MapPin, Loader2, CheckCircle2 } from 'lucide-react'

export function CompleteProfile() {
  const { user, profile } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nombre: profile?.nombre || '',
    apellido: profile?.apellido || '',
    dni: '',
    fecha_nacimiento: '',
    colegio: '',
    barrio: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      console.error('No hay usuario autenticado')
      return
    }

    console.log('Iniciando upsert de perfil para:', user.id)
    setLoading(true)
    
    try {
      const payload = {
        id: user.id,
        email: user.email,
        role: 'student',
        nombre: formData.nombre,
        apellido: formData.apellido,
        dni: formData.dni,
        fecha_nacimiento: formData.fecha_nacimiento,
        colegio: formData.colegio,
        barrio: formData.barrio
      }

      console.log('Payload enviado:', payload)

      // 1. Update Profile in DB
      const { data, error: upsertError } = await supabase
        .from('profiles')
        .upsert(payload, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
        .select()

      if (upsertError) {
        console.error('Error de Supabase (upsertError):', upsertError)
        throw upsertError
      }

      // 2. Award Achievement
      await supabase.from('achievements').insert({
        student_id: user.id,
        type: 'profile_completed'
      })

      // 3. Update Auth Metadata for instant UI update
      await supabase.auth.updateUser({
        data: {
          nombre: formData.nombre,
          apellido: formData.apellido,
          colegio: formData.colegio,
          barrio: formData.barrio
        }
      })

      console.log('Upsert exitoso, datos recibidos:', data)
      
      // Navigate to dashboard
      window.location.href = '/perfil'

    } catch (err: any) {
      console.error('Excepción capturada en handleSubmit:', err)
      alert(`Error al completar el perfil: ${err.message || 'Error desconocido'}`)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-32 pb-20 flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white dark:bg-[#1a1814] rounded-[2.5rem] shadow-2xl border border-dark-brown/5 dark:border-white/5 overflow-hidden">
        <div className="bg-amber p-8 text-white text-center">
          <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold">Completá tu Perfil</h2>
          <p className="opacity-90 mt-2 font-medium">Necesitamos estos datos para validar tu identidad estudiantil.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-10 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Nombre</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-brown/30" />
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                  value={formData.nombre}
                  onChange={e => setFormData({ ...formData, nombre: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Apellido</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                value={formData.apellido}
                onChange={e => setFormData({ ...formData, apellido: e.target.value })}
              />
            </div>
          </div>

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
              <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-brown/30" />
              <input
                type="text"
                required
                placeholder="Nombre de tu colegio"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                value={formData.colegio}
                onChange={e => setFormData({ ...formData, colegio: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-dark-brown/70 dark:text-gray-300 mb-1.5 ml-1">Barrio / Ciudad</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-brown/30" />
              <input
                type="text"
                required
                placeholder="Ej: Palermo, CABA"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0f0e0c] border border-dark-brown/10 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-amber outline-none transition-all"
                value={formData.barrio}
                onChange={e => setFormData({ ...formData, barrio: e.target.value })}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-amber text-white rounded-2xl font-bold shadow-xl shadow-amber/20 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <>Guardando... <Loader2 className="w-5 h-5 animate-spin" /></>
            ) : (
              <>Finalizar y Entrar <CheckCircle2 className="w-5 h-5" /></>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
