import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

interface AuthContextType {
  user: any
  profile: any
  login: (email: string, password: string) => Promise<{ error: any }>
  register: (data: RegisterData) => Promise<{ error: any }>
  logout: () => Promise<{ error: any }>
  loading: boolean
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
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null)
        if (session?.user) {
          await fetchProfile(session.user.id)
        } else {
          setProfile(null)
        }
        setLoading(false)
      }
    )

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false))
      } else {
        setLoading(false)
      }
    })

    return () => {
      authListener?.subscription.unsubscribe()
    }
  }, [])

  const fetchProfile = async (userId: string) => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 3000)
      )
      
      const profilePromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      
      const result = await Promise.race([profilePromise, timeoutPromise]) as any
      
      if (result.data) {
        setProfile(result.data)
      } else if (result.error?.message === 'timeout') {
        // Use basic profile from user if timeout
        setProfile({
          id: userId,
          email: user?.email,
          nombre: user?.user_metadata?.nombre || 'Usuario',
          apellido: user?.user_metadata?.apellido || '',
          role: 'student'
        })
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile({
        id: userId,
        email: user?.email,
        nombre: 'Usuario',
        apellido: '',
        role: 'student'
      })
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 3000)
      )
      
      const loginPromise = supabase.auth.signInWithPassword({ email, password })
      
      const result = await Promise.race([loginPromise, timeoutPromise]) as any
      
      if (result.error) {
        return { error: result.error }
      }
      
      // Redirect immediately, profile fetch happens in background
      return { error: null }
    } catch (error: any) {
      if (error.message === 'timeout') {
        return { error: new Error('Login timeout') }
      }
      return { error }
    }
  }

  const register = async (data: RegisterData) => {
    try {
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('timeout')), 3000)
      )
      
      const signUpPromise = supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            nombre: data.nombre,
            apellido: data.apellido
          }
        }
      })
      
      const result = await Promise.race([signUpPromise, timeoutPromise]) as any
      
      if (result.error) {
        return { error: result.error }
      }
      
      if (result.data.user) {
        // Insert into profiles table with timeout
        const insertPromise = supabase.from('profiles').insert({
          id: result.data.user.id,
          email: data.email,
          nombre: data.nombre,
          apellido: data.apellido,
          dni: data.dni,
          fecha_nacimiento: data.fecha_nacimiento,
          colegio: data.colegio,
          barrio: data.barrio,
          role: 'student'
        })
        
        await Promise.race([insertPromise, timeoutPromise])
      }
      
      return { error: null }
    } catch (error: any) {
      if (error.message === 'timeout') {
        return { error: new Error('Registration timeout') }
      }
      return { error }
    }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    setUser(null)
    setProfile(null)
    return { error }
  }

  return (
    <AuthContext.Provider value={{ user, profile, login, register, logout, loading }}>
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
