import { useState } from 'react'

export function UniversityComparator() {
  const [university1, setUniversity1] = useState('')
  const [university2, setUniversity2] = useState('')
  const [career, setCareer] = useState('')

  const universities = [
    'Universidad Austral', 'Di Tella', 'San Andrés', 'UCEMA', 'UADE', 
    'UB', 'UP', 'UCA', 'ITBA', 'FUCE', 'UBA', 'UTN', 'Siglo 21', 'USAL', 'UCES', 'UAI'
  ]

  const careers = ['Derecho', 'Medicina', 'Ingeniería', 'Economía', 'Diseño', 'Psicología']

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6 text-center">
          Comparador de Universidades
        </h1>
        <p className="text-lg text-dark-brown/80 dark:text-gray-300 text-center mb-12">
          Compará costos, duración y ranking de las mejores universidades argentinas
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
              Universidad 1
            </label>
            <select
              value={university1}
              onChange={(e) => setUniversity1(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
            >
              <option value="">Seleccionar...</option>
              {universities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
              Universidad 2
            </label>
            <select
              value={university2}
              onChange={(e) => setUniversity2(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
            >
              <option value="">Seleccionar...</option>
              {universities.map(uni => (
                <option key={uni} value={uni}>{uni}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
              Carrera
            </label>
            <select
              value={career}
              onChange={(e) => setCareer(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
            >
              <option value="">Seleccionar...</option>
              {careers.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {university1 && university2 && career && (
          <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-6">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-brown/10 dark:border-white/10">
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">Criterio</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">{university1}</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">{university2}</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-dark-brown/10 dark:border-white/10">
                  <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Costo anual</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">$12,000</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">$15,000</td>
                </tr>
                <tr className="border-b border-dark-brown/10 dark:border-white/10">
                  <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Duración</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">4 años</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">5 años</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Ranking</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">#1</td>
                  <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">#3</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
