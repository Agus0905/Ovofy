import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'student' | 'university' | 'professor' | 'admin'
          nombre: string
          apellido: string
          email: string
          dni: string
          fecha_nacimiento: string
          colegio: string
          barrio: string
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          role: 'student' | 'university' | 'professor' | 'admin'
          nombre: string
          apellido: string
          email: string
          dni: string
          fecha_nacimiento: string
          colegio: string
          barrio: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          role?: 'student' | 'university' | 'professor' | 'admin'
          nombre?: string
          apellido?: string
          email?: string
          dni?: string
          fecha_nacimiento?: string
          colegio?: string
          barrio?: string
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      universities: {
        Row: {
          id: string
          nombre: string
          location: string
          cost_range: string
          duration: string
          modality: string
          ranking: number
          scholarships: string
          strengths: string
          logo_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nombre: string
          location: string
          cost_range: string
          duration: string
          modality: string
          ranking: number
          scholarships: string
          strengths: string
          logo_url: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nombre?: string
          location?: string
          cost_range?: string
          duration?: string
          modality?: string
          ranking?: number
          scholarships?: string
          strengths?: string
          logo_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
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
        }
        Insert: {
          id?: string
          university_id: string
          nombre: string
          carrera: string
          descripcion: string
          cupos_total: number
          cupos_disponibles: number
          tendencia?: boolean
          image_url: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          university_id?: string
          nombre?: string
          carrera?: string
          descripcion?: string
          cupos_total?: number
          cupos_disponibles?: number
          tendencia?: boolean
          image_url?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      enrollments: {
        Row: {
          id: string
          student_id: string
          course_id: string
          created_at: string
          completed: boolean
        }
        Insert: {
          id?: string
          student_id: string
          course_id: string
          created_at?: string
          completed?: boolean
        }
        Update: {
          id?: string
          student_id?: string
          course_id?: string
          created_at?: string
          completed?: boolean
        }
      }
      encuentros: {
        Row: {
          id: string
          course_id: string
          numero: number
          titulo: string
          descripcion: string
          fecha: string
          recording_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          course_id: string
          numero: number
          titulo: string
          descripcion: string
          fecha: string
          recording_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          numero?: number
          titulo?: string
          descripcion?: string
          fecha?: string
          recording_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      attendance: {
        Row: {
          id: string
          enrollment_id: string
          encuentro_id: string
          present: boolean
          created_at: string
        }
        Insert: {
          id?: string
          enrollment_id: string
          encuentro_id: string
          present: boolean
          created_at?: string
        }
        Update: {
          id?: string
          enrollment_id?: string
          encuentro_id?: string
          present?: boolean
          created_at?: string
        }
      }
      materials: {
        Row: {
          id: string
          course_id: string
          titulo: string
          url: string
          tipo: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          titulo: string
          url: string
          tipo: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          titulo?: string
          url?: string
          tipo?: string
          created_at?: string
        }
      }
      forum_posts: {
        Row: {
          id: string
          course_id: string
          user_id: string
          contenido: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          user_id: string
          contenido: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          user_id?: string
          contenido?: string
          created_at?: string
        }
      }
      professor_feedback: {
        Row: {
          id: string
          course_id: string
          student_id: string
          professor_id: string
          feedback: string
          private: boolean
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          student_id: string
          professor_id: string
          feedback: string
          private: boolean
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          student_id?: string
          professor_id?: string
          feedback?: string
          private?: boolean
          created_at?: string
        }
      }
      student_feedback: {
        Row: {
          id: string
          course_id: string
          rating: number
          liked_most: string
          liked_least: string
          professor_rating: number
          improvements: string
          created_at: string
        }
        Insert: {
          id?: string
          course_id: string
          rating: number
          liked_most: string
          liked_least: string
          professor_rating: number
          improvements: string
          created_at?: string
        }
        Update: {
          id?: string
          course_id?: string
          rating?: number
          liked_most?: string
          liked_least?: string
          professor_rating?: number
          improvements?: string
          created_at?: string
        }
      }
    }
  }
}
