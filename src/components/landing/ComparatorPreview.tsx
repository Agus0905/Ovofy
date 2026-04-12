import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function ComparatorPreview() {
  const navigate = useNavigate()

  return (
    <section className="py-20 bg-warm-cream dark:bg-[#0f0e0c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-serif text-center text-dark-brown dark:text-[#f5f0e8] mb-12">
          Compará universidades lado a lado
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <select className="px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]">
            <option>Universidad Di Tella</option>
            <option>Universidad de Buenos Aires</option>
            <option>UADE</option>
            <option>UCEMA</option>
          </select>

          <select className="px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]">
            <option>Universidad de Buenos Aires</option>
            <option>Universidad Di Tella</option>
            <option>UADE</option>
            <option>UCEMA</option>
          </select>
        </div>

        <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="bg-dark-brown/5 dark:bg-white/5">
                <th className="px-6 py-4 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">Criterio</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">Di Tella</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">UBA</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-dark-brown/10 dark:border-white/10">
                <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Ubicación</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">Buenos Aires</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">Buenos Aires</td>
              </tr>
              <tr className="border-t border-dark-brown/10 dark:border-white/10">
                <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Costo anual</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">$15,000 USD</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">Gratuito</td>
              </tr>
              <tr className="border-t border-dark-brown/10 dark:border-white/10">
                <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Duración</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">5 años</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">5-6 años</td>
              </tr>
              <tr className="border-t border-dark-brown/10 dark:border-white/10">
                <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Ranking</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">#1 Nacional</td>
                <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">#2 Nacional</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate('/comparar')}
            className="btn-primary px-8 py-3 flex items-center gap-2 mx-auto"
          >
            Ver comparación completa <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}
