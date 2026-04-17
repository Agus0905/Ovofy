import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface RegisterData {
  nombre: string
  apellido: string
  email: string
  password: string
  dni: string
  fecha_nacimiento: string
  colegio: string
  barrio: string
}

interface AuthContextType {
  user: any
  profile: any
  login: (email: string, password: string) => Promise<{ error: any }>
  loginWithGoogle: () => Promise<{ error: any }>
  mockLogin: (role: 'student' | 'university' | 'professor' | 'admin') => void
  register: (data: RegisterData) => Promise<{ error: any }>
  logout: () => Promise<{ error: any }>
  loading: boolean
}

const MOCK_PROFILES = {
  student: {
    id: 'mock-student-id',
    email: 'estudiante@demo.com',
    nombre: 'Agustín',
    apellido: 'Perez',
    role: 'student',
    dni: '12345678',
    colegio: 'Nacional Buenos Aires',
    barrio: 'Palermo'
  },
  university: {
    id: 'mock-university-id',
    email: 'admisiones@ditella.edu',
    nombre: 'UTDT',
    apellido: 'Admisiones',
    role: 'university'
  },
  professor: {
    id: 'mock-professor-id',
    email: 'j.garcia@uade.edu.ar',
    nombre: 'Juan',
    apellido: 'García',
    role: 'professor'
  },
  admin: {
    id: 'mock-admin-id',
    email: 'admin@ovofy.com',
    nombre: 'Admin',
    apellido: 'Sistema',
    role: 'admin'
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Check active sessions and sets up listener
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else {
        const savedProfile = localStorage.getItem('ovofy_mock_profile')
        if (savedProfile) {
          const p = JSON.parse(savedProfile)
          setUser({ id: p.id, email: p.email })
          setProfile(p)
        }
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id)
      } else if (!localStorage.getItem('ovofy_mock_profile')) {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const mockLogin = (role: 'student' | 'university' | 'professor' | 'admin') => {
    const p = MOCK_PROFILES[role]
    setUser({ id: p.id, email: p.email })
    setProfile(p)
    localStorage.setItem('ovofy_mock_profile', JSON.stringify(p))
  }

  const login = async (email: string, password: string) => {
    // If it's a mock email, use mockLogin
    if (email.includes('admin') && password === 'admin') {
      mockLogin('admin')
      return { error: null }
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (!error) localStorage.removeItem('ovofy_mock_profile')
    return { error }
  }

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin
      }
    })
    return { error }
  }

  const register = async (data: RegisterData) => {
    const { error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          colegio: data.colegio,
          barrio: data.barrio,
          dni: data.dni,
          fecha_nacimiento: data.fecha_nacimiento
        }
      }
    })

    if (authError) return { error: authError }
    localStorage.removeItem('ovofy_mock_profile')
    return { error: null }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    localStorage.removeItem('ovofy_mock_profile')
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, loginWithGoogle, mockLogin, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
