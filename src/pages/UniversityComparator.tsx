import { useState } from 'react'

const universities = [
  'Universidad Austral', 'Di Tella', 'San Andrés', 'UCEMA', 'UADE', 
  'UB', 'UP', 'UCA', 'ITBA', 'FUCE', 'UBA', 'UTN', 'Siglo 21', 'USAL', 'UCES', 'UAI'
]

const universityData: Record<string, {
  location: string
  cost_range: string
  duration: string
  modality: string
  ranking: string
  scholarships: string[]
  strengths: string[]
}> = {
  'Universidad Austral': {
    location: 'Pilar, Buenos Aires',
    cost_range: '$12,000 - $15,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#1 Nacional',
    scholarships: ['Beca Excelencia', 'Beca Deportiva', 'Beca Social'],
    strengths: ['Investigación', 'Internacionales', 'Campus']
  },
  'Di Tella': {
    location: 'Buenos Aires',
    cost_range: '$15,000 - $18,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#2 Nacional',
    scholarships: ['Beca Meritocracia', 'Beca Alumni'],
    strengths: ['Académica', 'Red de Contactos', 'Posgrados']
  },
  'San Andrés': {
    location: 'Buenos Aires',
    cost_range: '$14,000 - $16,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#3 Nacional',
    scholarships: ['Beca Santander', 'Beca Excelencia'],
    strengths: ['Humanidades', 'Negocios', 'Idiomas']
  },
  'UCEMA': {
    location: 'Buenos Aires',
    cost_range: '$8,000 - $10,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#5 Nacional',
    scholarships: ['Beca Rendimiento'],
    strengths: ['Economía', 'Finanzas', 'Pragmática']
  },
  'UADE': {
    location: 'Buenos Aires',
    cost_range: '$7,000 - $9,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#6 Nacional',
    scholarships: ['Beca Académica', 'Beca Deportiva'],
    strengths: ['Emprendimiento', 'Negocios', 'Tecnología']
  },
  'UB': {
    location: 'Buenos Aires',
    cost_range: '$3,000 - $5,000 USD/año',
    duration: '5-6 años',
    modality: 'Presencial',
    ranking: '#4 Nacional',
    scholarships: ['Beca UBA', 'Beca Provincial'],
    strengths: ['Prestigio', 'Gratuidad', 'Investigación']
  },
  'UP': {
    location: 'Buenos Aires',
    cost_range: '$6,000 - $8,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#7 Nacional',
    scholarships: ['Beca UP', 'Beca Hermanamiento'],
    strengths: ['Ingeniería', 'Tecnología', 'Laboratorios']
  },
  'UCA': {
    location: 'Buenos Aires',
    cost_range: '$8,000 - $11,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#8 Nacional',
    scholarships: ['Beca UCA', 'Beca Familiar'],
    strengths: ['Derecho', 'Ciencias Sociales', 'Ética']
  },
  'ITBA': {
    location: 'Buenos Aires',
    cost_range: '$10,000 - $12,000 USD/año',
    duration: '5 años',
    modality: 'Presencial',
    ranking: '#9 Nacional',
    scholarships: ['Beca ITBA', 'Beca Ingenio'],
    strengths: ['Ingeniería', 'Industria', 'Conexiones']
  },
  'FUCE': {
    location: 'Córdoba',
    cost_range: '$5,000 - $7,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#10 Nacional',
    scholarships: ['Beca FUCE', 'Beca Regional'],
    strengths: ['Economía', 'Regional', 'Costo']
  },
  'UTN': {
    location: 'Múltiples sedes',
    cost_range: '$2,000 - $4,000 USD/año',
    duration: '5-6 años',
    modality: 'Presencial',
    ranking: '#11 Nacional',
    scholarships: ['Beca UTN', 'Beca Social'],
    strengths: ['Ingeniería', 'Federal', 'Empleabilidad']
  },
  'Siglo 21': {
    location: 'Córdoba',
    cost_range: '$4,000 - $6,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#12 Nacional',
    scholarships: ['Beca Siglo 21', 'Beca Mérito'],
    strengths: ['Innovación', 'Tecnología', 'Emprendimiento']
  },
  'USAL': {
    location: 'Buenos Aires',
    cost_range: '$3,000 - $5,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#13 Nacional',
    scholarships: ['Beca USAL', 'Beca Eclesiástica'],
    strengths: ['Filosofía', 'Derecho', 'Humanidades']
  },
  'UCES': {
    location: 'Buenos Aires',
    cost_range: '$4,000 - $6,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#14 Nacional',
    scholarships: ['Beca UCES', 'Beca Estímulo'],
    strengths: ['Economía', 'Salud', 'Psicología']
  },
  'UAI': {
    location: 'Buenos Aires',
    cost_range: '$5,000 - $7,000 USD/año',
    duration: '4-5 años',
    modality: 'Presencial',
    ranking: '#15 Nacional',
    scholarships: ['Beca UAI', 'Beca Excelencia'],
    strengths: ['Negocios', 'Marketing', 'Arquitectura']
  },
  'UNLP': {
    location: 'La Plata',
    cost_range: '$1,000 - $2,000 USD/año',
    duration: '5-6 años',
    modality: 'Presencial',
    ranking: '#16 Nacional',
    scholarships: ['Beca UNLP', 'Beca Provincial'],
    strengths: ['Gratuidad', 'Prestigio', 'Investigación']
  }
}

const careers = ['Derecho', 'Medicina', 'Ingeniería', 'Economía', 'Diseño', 'Psicología', 'Marketing', 'Arquitectura']

export function UniversityComparator() {
  const [activeTab, setActiveTab] = useState<'universities' | 'career'>('universities')
  const [uni1, setUni1] = useState('Di Tella')
  const [uni2, setUni2] = useState('UBA')
  const [career, setCareer] = useState('Derecho')

  const data1 = universityData[uni1]
  const data2 = universityData[uni2]

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl lg:text-5xl font-serif text-dark-brown dark:text-[#f5f0e8] mb-6 text-center">
          Comparador de Universidades
        </h1>
        <p className="text-lg text-dark-brown/80 dark:text-gray-300 text-center mb-12">
          Compará costos, duración y ranking de las mejores universidades argentinas
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white dark:bg-[#1a1814] rounded-lg p-1 flex gap-1">
            <button
              onClick={() => setActiveTab('universities')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'universities'
                  ? 'bg-amber text-white'
                  : 'text-dark-brown dark:text-[#f5f0e8] hover:bg-dark-brown/10'
              }`}
            >
              Comparar Universidades
            </button>
            <button
              onClick={() => setActiveTab('career')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'career'
                  ? 'bg-amber text-white'
                  : 'text-dark-brown dark:text-[#f5f0e8] hover:bg-dark-brown/10'
              }`}
            >
              Comparar Carrera
            </button>
          </div>
        </div>

        {activeTab === 'universities' ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
                  Universidad 1
                </label>
                <select
                  value={uni1}
                  onChange={(e) => setUni1(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
                >
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
                  value={uni2}
                  onChange={(e) => setUni2(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
                >
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>

            {data1 && data2 && (
              <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-brown/5 dark:bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">Criterio</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-amber">{uni1}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-amber">{uni2}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Ubicación</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.location}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.location}</td>
                    </tr>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Costo anual</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.cost_range}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.cost_range}</td>
                    </tr>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Duración</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.duration}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.duration}</td>
                    </tr>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Modalidad</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.modality}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.modality}</td>
                    </tr>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Ranking</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.ranking}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.ranking}</td>
                    </tr>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Becas</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.scholarships.join(', ')}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.scholarships.join(', ')}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Fortalezas</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.strengths.join(', ')}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.strengths.join(', ')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
                  Carrera
                </label>
                <select
                  value={career}
                  onChange={(e) => setCareer(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
                >
                  {careers.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-dark-brown dark:text-[#f5f0e8] mb-2">
                  Universidad 1
                </label>
                <select
                  value={uni1}
                  onChange={(e) => setUni1(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
                >
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
                  value={uni2}
                  onChange={(e) => setUni2(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
                >
                  {universities.map(uni => (
                    <option key={uni} value={uni}>{uni}</option>
                  ))}
                </select>
              </div>
            </div>

            {data1 && data2 && (
              <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-dark-brown/5 dark:bg-white/5">
                      <th className="px-6 py-4 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">{career}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-amber">{uni1}</th>
                      <th className="px-6 py-4 text-left text-sm font-medium text-amber">{uni2}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Costo anual</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.cost_range}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.cost_range}</td>
                    </tr>
                    <tr className="border-t border-dark-brown/10 dark:border-white/10">
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Duración</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.duration}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.duration}</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">Ranking en {career}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data1.ranking}</td>
                      <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{data2.ranking}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
