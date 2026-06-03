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
  register: (data: RegisterData) => Promise<{ error: any }>
  logout: () => Promise<{ error: any }>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async (userId: string) => {
    console.log('AuthContext: Iniciando fetchProfile para:', userId)
    let isMounted = true
    const timeout = setTimeout(() => {
      if (isMounted) {
        console.info('AuthContext: fetchProfile timed out after 5s')
        setLoading(false)
      }
    }, 5000)

    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle()

      if (error) {
        console.error('AuthContext: Error en query de perfil:', error)
        throw error
      }
      
      if (isMounted) {
        console.log('AuthContext: Perfil recibido:', data?.nombre || 'null')
        setProfile(data)
      }
    } catch (error) {
      console.error('AuthContext: Excepción en fetchProfile:', error)
      if (isMounted) setProfile(null)
    } finally {
      clearTimeout(timeout)
      if (isMounted) setLoading(false)
    }
    return () => { isMounted = false }
  }

  useEffect(() => {
    // Check active sessions
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user)
        fetchProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setLoading(false)
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        setUser(session.user)
        // If it's a sign in or initial session, fetch profile
        await fetchProfile(session.user.id)
      } else {
        setUser(null)
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/perfil`
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
    return { error: null }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, loginWithGoogle, register, logout, loading }}>
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
