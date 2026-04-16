import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function ComparatorPreview() {
  const navigate = useNavigate()

  const comparisonData = [
    { 
      label: "Enfoque Académico", 
      ditella: "Práctico / Investigación", 
      ucema: "Finanzas / Mercado", 
      match: true 
    },
    { 
      label: "Vida Estudiantil", 
      ditella: "Campus Integrado", 
      ucema: "Networking Corporativo", 
      match: true 
    },
    { 
      label: "Intercambio", 
      ditella: "+100 Convenios", 
      ucema: "+50 Convenios", 
      match: true 
    },
    { 
      label: "Beca Máxima", 
      ditella: "100%", 
      ucema: "50%", 
      match: false 
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-serif font-bold text-dark-brown dark:text-white mb-4">
            No elijas a <span className="text-amber italic">ciegas</span>
          </h2>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400">
            Compará programas, campus y salidas laborales lado a lado.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-warm-cream dark:bg-[#1a1814] rounded-[2.5rem] p-8 md:p-12 shadow-inner border border-dark-brown/5 dark:border-white/5">
            {/* Headers */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              <div className="text-xs uppercase tracking-widest font-bold text-dark-brown/30 dark:text-gray-500 flex items-center">
                Comparativa
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-white dark:bg-[#0f0e0c] rounded-xl mx-auto flex items-center justify-center shadow-sm border border-dark-brown/5 dark:border-white/5">
                  <span className="font-bold text-amber">DT</span>
                </div>
                <div className="font-serif font-bold text-dark-brown dark:text-white">Di Tella</div>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-white dark:bg-[#0f0e0c] rounded-xl mx-auto flex items-center justify-center shadow-sm border border-dark-brown/5 dark:border-white/5">
                  <span className="font-bold text-amber">UC</span>
                </div>
                <div className="font-serif font-bold text-dark-brown dark:text-white">UCEMA</div>
              </div>
            </div>

            {/* Rows */}
            <div className="space-y-4">
              {comparisonData.map((row, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 py-4 border-b border-dark-brown/5 dark:border-white/5 last:border-0">
                  <div className="text-sm font-bold text-dark-brown/60 dark:text-gray-400 flex items-center">
                    {row.label}
                  </div>
                  <div className="text-sm text-center font-medium text-dark-brown dark:text-white bg-white/40 dark:bg-white/5 py-3 rounded-xl">
                    {row.ditella}
                  </div>
                  <div className="text-sm text-center font-medium text-dark-brown dark:text-white bg-white/40 dark:bg-white/5 py-3 rounded-xl">
                    {row.ucema}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/comparar')}
                className="inline-flex items-center gap-2 text-amber font-bold hover:gap-4 transition-all group"
              >
                Abrir comparador completo <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
