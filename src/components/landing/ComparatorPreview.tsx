import { motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'

export function ComparatorPreview() {
  const comparisonData = [
    { university: "Di Tella", cost: "$12,000/mes", duration: "4 años", ranking: "#1" },
    { university: "UBA", cost: "$2,500/mes", duration: "5-6 años", ranking: "#2" },
    { university: "Austral", cost: "$15,000/mes", duration: "4 años", ranking: "#3" }
  ]

  return (
    <section className="py-20 lg:py-32 bg-warm-cream dark:bg-[#1a1814]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6">
            Compará Universidades
          </h2>
          <p className="text-lg lg:text-xl text-dark-brown/80 dark:text-gray-300 max-w-3xl mx-auto">
            Compará costos, duración y ranking de las mejores universidades argentinas
          </p>
        </motion.div>

        {/* Comparison Table Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <table className="w-full">
            <thead className="bg-amber/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown dark:text-[#f5f0e8]">Universidad</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown dark:text-[#f5f0e8]">Costo</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown dark:text-[#f5f0e8]">Duración</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-dark-brown dark:text-[#f5f0e8]">Ranking</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((uni, index) => (
                <tr key={index} className="border-t border-dark-brown/10 dark:border-white/10">
                  <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">{uni.university}</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{uni.cost}</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{uni.duration}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 bg-amber/10 text-amber px-3 py-1 rounded-full text-sm font-medium">
                      <Check className="w-4 h-4" />
                      {uni.ranking}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="/comparar"
            className="btn-primary inline-flex items-center gap-2 text-lg px-8 py-4"
          >
            Ver Comparador Completo
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
