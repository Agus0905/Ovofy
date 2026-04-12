import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export interface Course {
  id: string
  university_id: string
  nombre: string
  carrera: string
  descripcion: string
  cupos_total: number
  cupos_disponibles: number
  tendencia: boolean
  image_url: string
  is_active: boolean
  created_at: string
  updated_at: string
  universities: {
    id: string
    nombre: string
    logo_url: string
  }
}

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          universities (
            id,
            nombre,
            logo_url
          )
        `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

      if (error) throw error

      setCourses(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar cursos')
    } finally {
      setLoading(false)
    }
  }

  const refetch = () => {
    fetchCourses()
  }

  return { courses, loading, error, refetch }
}
