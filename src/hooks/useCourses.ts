import { useState, useEffect } from 'react'

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

const MOCK_COURSES: Course[] = [
  {
    id: '1',
    university_id: 'u1',
    nombre: 'Negocios Digitales',
    carrera: 'Lic. en Negocios Digitales',
    descripcion: 'Explorá la intersección entre tecnología y negocios en el campus de la Di Tella.',
    cupos_total: 40,
    cupos_disponibles: 12,
    tendencia: true,
    image_url: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    universities: {
      id: 'u1',
      nombre: 'UTDT',
      logo_url: 'https://www.utdt.edu/imagenes/logo-utdt.png'
    }
  },
  {
    id: '2',
    university_id: 'u2',
    nombre: 'Economía & Finanzas',
    carrera: 'Lic. en Economía',
    descripcion: 'Sumergite en el mundo de las finanzas globales con expertos de la UCEMA.',
    cupos_total: 30,
    cupos_disponibles: 5,
    tendencia: true,
    image_url: 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    universities: {
      id: 'u2',
      nombre: 'UCEMA',
      logo_url: 'https://ucema.edu.ar/logo.png'
    }
  },
  {
    id: '3',
    university_id: 'u3',
    nombre: 'Ingeniería Informática',
    carrera: 'Ingeniería en Informática',
    descripcion: 'Construí el futuro de la tecnología en los laboratorios del ITBA.',
    cupos_total: 50,
    cupos_disponibles: 25,
    tendencia: false,
    image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    universities: {
      id: 'u3',
      nombre: 'ITBA',
      logo_url: 'https://www.itba.edu.ar/logo.png'
    }
  },
  {
    id: '4',
    university_id: 'u4',
    nombre: 'Diseño Global',
    carrera: 'Lic. en Diseño',
    descripcion: 'Desarrollá tu creatividad en un entorno internacional en la UdeSA.',
    cupos_total: 25,
    cupos_disponibles: 8,
    tendencia: true,
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    universities: {
      id: 'u4',
      nombre: 'UdeSA',
      logo_url: 'https://www.udesa.edu.ar/logo.png'
    }
  }
]

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API delay
    const timer = setTimeout(() => {
      setCourses(MOCK_COURSES)
      setLoading(false)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  const refetch = () => {
    setLoading(true)
    setTimeout(() => {
      setCourses(MOCK_COURSES)
      setLoading(false)
    }, 500)
  }

  return { courses, loading, error, refetch }
}
