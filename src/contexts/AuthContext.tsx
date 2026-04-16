import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  user: any
  profile: any
  login: (email: string, password: string) => Promise<{ error: any }>
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

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedProfile = localStorage.getItem('ovofy_mock_profile')
    if (savedProfile) {
      const p = JSON.parse(savedProfile)
      setUser({ id: p.id, email: p.email })
      setProfile(p)
    }
    setLoading(false)
  }, [])

  const mockLogin = (role: 'student' | 'university' | 'professor' | 'admin') => {
    const p = MOCK_PROFILES[role]
    setUser({ id: p.id, email: p.email })
    setProfile(p)
    localStorage.setItem('ovofy_mock_profile', JSON.stringify(p))
  }

  const login = async (email: string, _password: string) => {
    // Short-circuit: if email matches a mock, use it, else return error or mock student
    if (email.includes('admin')) mockLogin('admin')
    else if (email.includes('university') || email.includes('ditella')) mockLogin('university')
    else if (email.includes('professor')) mockLogin('professor')
    else mockLogin('student')
    
    return { error: null }
  }

  const register = async (data: RegisterData) => {
    const p = {
      id: 'new-user-' + Math.random(),
      email: data.email,
      nombre: data.nombre,
      apellido: data.apellido,
      role: 'student',
      dni: data.dni,
      colegio: data.colegio,
      barrio: data.barrio
    }
    setUser({ id: p.id, email: p.email })
    setProfile(p)
    localStorage.setItem('ovofy_mock_profile', JSON.stringify(p))
    return { error: null }
  }

  const logout = async () => {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('ovofy_mock_profile')
    return { error: null }
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, mockLogin, register, logout, loading }}>
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
