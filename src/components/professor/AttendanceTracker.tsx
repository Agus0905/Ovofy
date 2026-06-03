import { useState } from 'react'
import { Save, Check, X, Users } from 'lucide-react'

const MOCK_STUDENTS = [
  'Camila F.', 
  'Lucas P.', 
  'Valentina T.', 
  'Martín R.', 
  'Sofia L.'
]

export function AttendanceTracker() {
  const [attendance, setAttendance] = useState<Record<string, boolean[]>>(() => {
    const initial: Record<string, boolean[]> = {}
    MOCK_STUDENTS.forEach(student => {
      initial[student] = new Array(6).fill(true)
    })
    return initial
  })

  const toggleAttendance = (student: string, index: number) => {
    setAttendance(prev => ({
      ...prev,
      [student]: prev[student].map((val, i) => i === index ? !val : val)
    }))
  }

  const handleSave = () => {
    alert('Asistencia guardada correctamente.')
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] border border-dark-brown/5 dark:border-white/5 shadow-2xl overflow-hidden">
        <div className="p-8 border-b border-dark-brown/5 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber/10 rounded-2xl flex items-center justify-center text-amber">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-serif font-bold text-dark-brown dark:text-white">Control de Asistencia</h2>
              <p className="text-xs font-black uppercase tracking-widest text-dark-brown/30 dark:text-gray-500">Cohorte 2026 - Introducción al Diseño</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-warm-cream/30 dark:bg-white/5">
                <th className="p-6 text-left text-[10px] uppercase tracking-widest font-black text-dark-brown/30 dark:text-gray-500">Estudiante</th>
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <th key={num} className="p-6 text-center text-[10px] uppercase tracking-widest font-black text-dark-brown/30 dark:text-gray-500">Encuentro {num}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-brown/5 dark:divide-white/5">
              {MOCK_STUDENTS.map((student) => (
                <tr key={student} className="hover:bg-amber/5 transition-colors">
                  <td className="p-6 font-bold text-dark-brown dark:text-white">{student}</td>
                  {attendance[student].map((isPresent, i) => (
                    <td key={i} className="p-6 text-center">
                      <button
                        onClick={() => toggleAttendance(student, i)}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                          isPresent 
                            ? 'bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white shadow-lg shadow-green-500/20' 
                            : 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white shadow-lg shadow-red-500/20'
                        }`}
                      >
                        {isPresent ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                      </button>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-8 bg-warm-cream/20 dark:bg-white/5 border-t border-dark-brown/5 dark:border-white/5 flex justify-end">
          <button 
            onClick={handleSave}
            className="bg-amber text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-amber/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <Save className="w-5 h-5" /> Guardar asistencia
          </button>
        </div>
      </div>
    </div>
  )
}
