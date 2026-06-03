import { useState } from 'react'
import { Send, Star, ChevronDown, MessageSquare, Info } from 'lucide-react'

const MOCK_STUDENTS = [
  'Camila F.', 
  'Lucas P.', 
  'Valentina T.', 
  'Martín R.', 
  'Sofia L.'
]

export function FeedbackManager() {
  const [selectedStudent, setSelectedStudent] = useState('')
  const [feedback, setFeedback] = useState('')
  const [ratings, setRatings] = useState({
    participacion: 5,
    trabajos: 5,
    actitud: 5
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedStudent) {
      alert('Por favor selecciona un estudiante.')
      return
    }
    alert(`Feedback enviado para ${selectedStudent}.`)
    setFeedback('')
    setSelectedStudent('')
  }

  const handleRating = (key: keyof typeof ratings, val: number) => {
    setRatings(prev => ({ ...prev, [key]: val }))
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white dark:bg-[#1a1814] rounded-[3rem] p-10 md:p-16 border border-dark-brown/5 dark:border-white/5 shadow-2xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-amber rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber/20">
            <MessageSquare className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-white">Gestión de Feedback</h2>
            <p className="text-dark-brown/60 dark:text-gray-400 font-medium">Envía devoluciones personalizadas y privadas.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Seleccionar Estudiante</label>
            <div className="relative">
              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl p-5 border border-transparent focus:border-amber outline-none appearance-none transition-all font-bold text-dark-brown dark:text-white"
              >
                <option value="">Elegir alumno...</option>
                {MOCK_STUDENTS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/20" />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Devolución del curso</label>
            <textarea 
              rows={5}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Escribe aquí tu análisis sobre el desempeño del alumno..."
              className="w-full bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl p-6 border border-transparent focus:border-amber outline-none transition-all font-medium text-dark-brown dark:text-white leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(['participacion', 'trabajos', 'actitud'] as const).map((key) => (
              <div key={key} className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 text-center block">{key}</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRating(key, star)}
                      className={`transition-all ${star <= ratings[key] ? 'text-amber scale-110' : 'text-dark-brown/10 dark:text-white/10 hover:text-amber/40'}`}
                    >
                      <Star className={`w-6 h-6 ${star <= ratings[key] ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber/5 p-6 rounded-2xl border border-amber/10 flex items-start gap-4">
            <Info className="w-5 h-5 text-amber shrink-0 mt-0.5" />
            <p className="text-xs font-bold text-amber/80 leading-relaxed">
              Nota: Esta devolución es estrictamente privada. Solo es visible para la institución universitaria y el equipo de Ovofy para el seguimiento académico.
            </p>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full bg-amber text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Send className="w-6 h-6" /> Enviar devolución privada
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
