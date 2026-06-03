import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { CourseHero } from '../components/course/CourseHero'
import { ActivitiesList } from '../components/course/ActivitiesList'
import { ScheduleSection } from '../components/course/ScheduleSection'
import { TestimonialsSection } from '../components/course/TestimonialsSection'
import { EnrollmentSection } from '../components/course/EnrollmentSection'
import { useCourses } from '../hooks/useCourses'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import { ArrowLeft, Loader2 } from 'lucide-react'

export function CourseDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const { courses, loading: coursesLoading } = useCourses()
  const [isEnrolled, setIsEnrolled] = useState(false)
  const [course, setCourse] = useState<any>(null)
  const [encuentros, setEncuentros] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      if (!id) return
      
      try {
        setLoading(true)
        
        // Find course in already fetched courses or fetch it specifically
        const found = courses.find(c => c.id === id)
        setCourse(found)

        // Fetch encuentros
        const { data: encuentrosData } = await supabase
          .from('encuentros')
          .select('*')
          .eq('course_id', id)
          .order('numero', { ascending: true })
        
        if (encuentrosData) setEncuentros(encuentrosData)

        // Check enrollment
        if (user) {
          const { data: enrollmentData } = await supabase
            .from('enrollments')
            .select('id')
            .eq('student_id', user.id)
            .eq('course_id', id)
            .single()
          
          setIsEnrolled(!!enrollmentData)
        }
      } catch (err) {
        console.error('Error fetching course detail:', err)
      } finally {
        setLoading(false)
      }
    }

    if (!coursesLoading) {
      fetchData()
    }
  }, [id, courses, coursesLoading, user])

  if (loading || coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-cream dark:bg-[#0f0e0c]">
        <Loader2 className="w-10 h-10 text-amber animate-spin" />
      </div>
    )
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-warm-cream dark:bg-[#0f0e0c] p-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-white mb-4">Curso no encontrado</h2>
        <button onClick={() => navigate('/catalogo')} className="btn-primary flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" /> Volver al Catálogo
        </button>
      </div>
    )
  }

  const activities = [
    { id: 1, title: `Simulación de 1er año - ${course.nombre}`, description: "Experiencia real de las materias del primer año de la carrera", duration: "2 horas" },
    { id: 2, title: "Taller Práctico", description: "Resolvé un caso real diseñado por directores de carrera", duration: "3 horas" },
    { id: 3, title: "Networking con Graduados", description: "Charla abierta con profesionales del área", duration: "2 horas" }
  ]

  const schedule = encuentros.length > 0 
    ? encuentros.map(e => ({
        day: `Encuentro ${e.numero}`,
        time: new Date(e.fecha).toLocaleString('es-AR', { weekday: 'long', hour: '2-digit', minute: '2-digit' }),
        topic: e.titulo
      }))
    : [
        { day: "Encuentro 1", time: "Sábado 10:00", topic: `Simulación 1er año - ${course.nombre} Básico` },
        { day: "Encuentro 2", time: "Sábado 10:00", topic: "Simulación 2do año - Temas Avanzados" },
        { day: "Encuentro 3", time: "Sábado 10:00", topic: "Taller de Herramientas Digitales" },
        { day: "Encuentro 4", time: "Sábado 10:00", topic: "Caso de Estudio Real" },
        { day: "Encuentro 5", time: "Sábado 10:00", topic: "Charla: Salida Laboral y Futuro" },
        { day: "Encuentro 6", time: "Sábado 10:00", topic: "Tour por el Campus + Cierre" }
      ]

  const testimonials = [
    { id: 1, name: "Agustina R.", course: course.nombre, text: `Este curso de ${course.universities.nombre} me cambió la perspectiva totalmente.`, rating: 5 },
    { id: 2, name: "Federico M.", course: course.nombre, text: "La mejor inversión antes de empezar la facultad.", rating: 5 },
    { id: 3, name: "Santi K.", course: course.nombre, text: "Muy práctico, nada de teoría aburrida.", rating: 4.8 }
  ]

  const handleEnroll = async () => {
    if (!user) {
      alert('Debes iniciar sesión para inscribirte.')
      return
    }

    try {
      // 1. Create Enrollment
      const { error: enrollError } = await supabase
        .from('enrollments')
        .insert({
          student_id: user.id,
          course_id: id,
          match_score: Math.floor(Math.random() * 21) + 75 // Mock match score for now
        })
      
      if (enrollError) throw enrollError

      // 2. Update Capacity
      const { error: updateError } = await supabase
        .from('courses')
        .update({ cupos_disponibles: course.cupos_disponibles - 1 })
        .eq('id', id)
      
      if (updateError) console.error('Error updating capacity:', updateError)

      // 3. Award Achievement (if first enrollment)
      const { data: previousEnrollments } = await supabase
        .from('enrollments')
        .select('id')
        .eq('student_id', user.id)
      
      if (previousEnrollments && previousEnrollments.length === 1) {
        await supabase.from('achievements').insert({
          student_id: user.id,
          type: 'first_enrollment',
          metadata: { course_name: course.nombre }
        })
      }

      setIsEnrolled(true)
      alert(`¡Felicidades! Te inscribiste con éxito en ${course.nombre}.`)
      
    } catch (err: any) {
      console.error('Error enrolling:', err)
      alert(err.message || 'Error al inscribirse. Por favor intenta de nuevo.')
    }
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <CourseHero
        title={course.nombre}
        university={course.universities.nombre}
        career={course.carrera}
        logo={course.universities.logo_url}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-white mb-8 border-l-4 border-amber pl-6">
            Lo que vas a <span className="text-amber italic">experimentar</span>
          </h2>
          <ActivitiesList activities={activities} />
        </section>

        <section className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-10 shadow-sm border border-dark-brown/5 dark:border-white/5">
          <ScheduleSection schedule={schedule} />
        </section>

        <section>
          <TestimonialsSection testimonials={testimonials} />
        </section>

        <section>
          <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] p-10 md:p-16 shadow-2xl border border-amber/10 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-2 bg-amber"></div>
            <h3 className="text-3xl font-serif font-bold text-dark-brown dark:text-white mb-6">
              Reservá tu lugar hoy
            </h3>
            <div className="max-w-md mx-auto mb-10">
              <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-bold text-dark-brown/40 dark:text-gray-500 uppercase tracking-widest">Cupos Limitados</span>
                <span className="text-lg font-bold text-amber">{course.cupos_disponibles} de {course.cupos_total}</span>
              </div>
              <div className="w-full bg-dark-brown/5 dark:bg-white/5 rounded-full h-4 overflow-hidden p-1 border border-dark-brown/10 dark:border-white/10">
                <div
                  className="bg-amber h-full rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${(course.cupos_disponibles / course.cupos_total) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-center">
              <EnrollmentSection onEnroll={handleEnroll} isEnrolled={isEnrolled} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
