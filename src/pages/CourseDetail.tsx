import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { CourseHero } from '../components/course/CourseHero'
import { ActivitiesList } from '../components/course/ActivitiesList'
import { ScheduleSection } from '../components/course/ScheduleSection'
import { TestimonialsSection } from '../components/course/TestimonialsSection'
import { EnrollmentSection } from '../components/course/EnrollmentSection'

export function CourseDetail() {
  const { id: _id } = useParams()
  const [isEnrolled, setIsEnrolled] = useState(false)

  const courseData = {
    title: "Diseño Gráfico",
    university: "Universidad Di Tella",
    career: "Diseño",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=1200&h=400&fit=crop",
    enrolled: 7,
    totalSpots: 20
  }

  const activities = [
    { id: 1, title: "Simulación de 1er año", description: "Experiencia real de las materias del primer año de la carrera", duration: "2 horas" },
    { id: 2, title: "Taller de branding", description: "Crea tu propia marca desde cero", duration: "3 horas" },
    { id: 3, title: "Proyecto final", description: "Desarrolla un proyecto completo de diseño", duration: "4 horas" }
  ]

  const schedule = [
    { day: "Encuentro 1", time: "Sábado 10:00", topic: "Simulación 1er año - Diseño Básico" },
    { day: "Encuentro 2", time: "Sábado 10:00", topic: "Simulación 2do año - Tipografía" },
    { day: "Encuentro 3", time: "Sábado 10:00", topic: "Simulación 3er año - Branding" },
    { day: "Encuentro 4", time: "Sábado 10:00", topic: "Simulación 4to año - Portfolio" },
    { day: "Encuentro 5", time: "Sábado 10:00", topic: "Mercado laboral y herramientas" },
    { day: "Encuentro 6", time: "Sábado 10:00", topic: "Tour universitario + charla con 5 graduados" }
  ]

  const testimonials = [
    { id: 1, name: "María González", course: "Diseño Gráfico", text: "Este curso me ayudó a confirmar que el diseño era mi pasión", rating: 5 },
    { id: 2, name: "Lucas Fernández", course: "Diseño Gráfico", text: "La mejor forma de saber si esta carrera es para vos", rating: 5 },
    { id: 3, name: "Sofía Martínez", course: "Diseño Gráfico", text: "Las simulaciones son muy realistas y útiles", rating: 5 }
  ]

  const handleEnroll = () => {
    setIsEnrolled(true)
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <CourseHero
        title={courseData.title}
        university={courseData.university}
        career={courseData.career}
        image={courseData.image}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <h2 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-6">
            Lo que vas a hacer
          </h2>
          <ActivitiesList activities={activities} />
        </section>

        <section>
          <ScheduleSection schedule={schedule} />
        </section>

        <section>
          <TestimonialsSection testimonials={testimonials} />
        </section>

        <section>
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl p-8 shadow-lg border border-dark-brown/10 dark:border-[#2a2620]">
            <h3 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-4">
              Cupos disponibles
            </h3>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-dark-brown/80 dark:text-gray-300">{courseData.enrolled} de {courseData.totalSpots} cupos</span>
              </div>
              <div className="w-full bg-dark-brown/10 dark:bg-white/10 rounded-full h-3">
                <div
                  className="bg-amber h-3 rounded-full transition-all"
                  style={{ width: `${(courseData.enrolled / courseData.totalSpots) * 100}%` }}
                />
              </div>
            </div>
            <EnrollmentSection onEnroll={handleEnroll} isEnrolled={isEnrolled} />
          </div>
        </section>
      </div>
    </div>
  )
}
