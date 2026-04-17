import { useState } from 'react'
import { Landmark, ChevronDown, GraduationCap, Clock, Wallet, Briefcase, Map as MapIcon, FileText, Sparkles, Loader2, CheckCircle2 } from 'lucide-react'
import { motion } from 'framer-motion'

const universities = [
  'Universidad Austral', 'Di Tella', 'San Andrés', 'UCEMA', 'UADE', 
  'UB', 'UP', 'UCA', 'ITBA', 'UBA', 'UTN', 'Siglo 21', 'USAL', 'UCES', 'UAI'
]

const careers = [
  'Ingeniería en Software', 'Medicina', 'Abogacía', 'Psicología', 'Administración de Empresas', 'Diseño Multimedia', 'Economía', 'Arquitectura'
]

const universityData: Record<string, {
  cost: string
  duration: string
  focus: string
  aiAnalysis?: {
    pillars: string[]
    methodology: string
    advantage: string
  }
}> = {
  'Universidad Austral': { 
    cost: '$12k - $15k USD', duration: '5 Años', focus: 'Investigación y Empresa',
    aiAnalysis: {
      pillars: ['Gestión Directiva', 'Ética', 'Casos Reales'],
      methodology: 'Método del Caso (Harvard Style)',
      advantage: 'Fuerte conexión con el ecosistema empresarial del IAE.'
    }
  },
  'Di Tella': { 
    cost: '$15k - $18k USD', duration: '4-5 Años', focus: 'Investigación y Teoría',
    aiAnalysis: {
      pillars: ['Abstracción', 'Rigor Matemático', 'Pluralismo'],
      methodology: 'Seminarios de Investigación Avanzada',
      advantage: 'Formación académica de élite orientada a posgrados en el exterior.'
    }
  },
  'UCEMA': { 
    cost: '$10k - $15k USD', duration: '4 Años', focus: 'Práctico y Negocios',
    aiAnalysis: {
      pillars: ['Libre Mercado', 'Finanzas Quant', 'Networking'],
      methodology: 'Enfoque Proyectual y Ejecutivo',
      advantage: 'Inserción inmediata en el sector financiero y consultoría.'
    }
  },
  'ITBA': { 
    cost: '$10k - $12k USD', duration: '5 Años', focus: 'Tecnología e Innovación',
    aiAnalysis: {
      pillars: ['Hard Tech', 'Entrepreneurship', 'Laboratorios'],
      methodology: 'Hands-on Engineering',
      advantage: 'Referente regional en innovación tecnológica y patentes.'
    }
  }
}

interface CareerInfo {
  salary: string
  demand: string
  skills: string
  regionalDemand: {
    caba: number
    gba: number
    centro: number
    patagonia: number
    norte: number
  }
}

const careerData: Record<string, CareerInfo> = {
  'Ingeniería en Software': { 
    salary: '$1.5M - $4M ARS', 
    demand: 'Crítica / Global', 
    skills: 'Lógica, Algoritmos, Inglés',
    regionalDemand: { caba: 10, gba: 9, centro: 8, patagonia: 6, norte: 5 }
  },
  'Economía': { 
    salary: '$1M - $2.5M ARS', 
    demand: 'Alta / Analítica', 
    skills: 'Matemáticas, Estadística, Macro',
    regionalDemand: { caba: 10, gba: 7, centro: 6, patagonia: 5, norte: 4 }
  }
}

export function UniversityComparator() {
  const [comparisonMode, setComparisonMode] = useState<'universidades' | 'carreras'>('universidades')
  const [selectedEntityA, setSelectedEntityA] = useState('Di Tella')
  const [selectedEntityB, setSelectedEntityB] = useState('UCEMA')
  const [selectedCareerA, setSelectedCareerA] = useState('Ingeniería en Software')
  const [selectedCareerB, setSelectedCareerB] = useState('Economía')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showAIReport, setShowAIAnalysis] = useState(false)

  const isUniMode = comparisonMode === 'universidades'
  
  const dataA = isUniMode 
    ? (universityData[selectedEntityA] || { cost: 'N/A', duration: 'N/A', focus: 'N/A' })
    : (careerData[selectedCareerA] || { salary: 'N/A', demand: 'N/A', skills: 'N/A', regionalDemand: { caba: 0, gba: 0, centro: 0, patagonia: 0, norte: 0 } })
    
  const dataB = isUniMode 
    ? (universityData[selectedEntityB] || { cost: 'N/A', duration: 'N/A', focus: 'N/A' })
    : (careerData[selectedCareerB] || { salary: 'N/A', demand: 'N/A', skills: 'N/A', regionalDemand: { caba: 0, gba: 0, centro: 0, patagonia: 0, norte: 0 } })

  const regions = [
    { id: 'caba', name: 'CABA / Centro Fin.' },
    { id: 'gba', name: 'GBA / Industrial' },
    { id: 'centro', name: 'Región Centro / Agro' },
    { id: 'norte', name: 'Norte / Minería/Turismo' },
    { id: 'patagonia', name: 'Patagonia / Energía' },
  ]

  const handleRunAIAnalysis = () => {
    setIsAnalyzing(true)
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowAIAnalysis(true)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20 relative overflow-hidden transition-colors duration-500">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#1a1208 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <main className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-dark-brown dark:text-white tracking-tight mb-8 relative inline-block">
            Comparador Inteligente
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber to-transparent rounded-full" />
          </h1>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
            {isUniMode 
              ? "Analiza y contrasta instituciones académicas con precisión técnica. Descubre qué universidad se alinea mejor con tu futuro."
              : "Compara el panorama profesional de diferentes carreras. Salarios, demanda laboral y habilidades críticas del mercado actual."
            }
          </p>
        </div>

        {/* Segmented Control */}
        <div className="flex p-1.5 bg-dark-brown/5 dark:bg-white/5 rounded-full mb-16 shadow-inner relative max-w-md w-full animate-slide-up">
          <button 
            onClick={() => { setComparisonMode('universidades'); setShowAIAnalysis(false); }}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
              isUniMode 
                ? 'bg-amber text-white shadow-lg shadow-amber/20' 
                : 'text-dark-brown/60 dark:text-gray-400 hover:text-dark-brown dark:hover:text-white'
            }`}
          >
            Universidades
          </button>
          <button 
            onClick={() => { setComparisonMode('carreras'); setShowAIAnalysis(false); }}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
              !isUniMode 
                ? 'bg-amber text-white shadow-lg shadow-amber/20' 
                : 'text-dark-brown/60 dark:text-gray-400 hover:text-dark-brown dark:hover:text-white'
            }`}
          >
            Carreras
          </button>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl mb-16 relative z-10 animate-fade-in">
          {/* Selector A */}
          <div className="relative group">
            <label className="block text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 mb-2 ml-4 uppercase tracking-[0.2em]">
              {isUniMode ? 'Institución A' : 'Carrera A'}
            </label>
            <div className="relative">
              <select 
                value={isUniMode ? selectedEntityA : selectedCareerA}
                onChange={(e) => isUniMode ? setSelectedEntityA(e.target.value) : setSelectedCareerA(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1814] rounded-2xl p-4 pl-14 font-serif text-xl text-dark-brown dark:text-white cursor-pointer shadow-xl border border-dark-brown/5 dark:border-white/5 outline-none appearance-none hover:border-amber/30 transition-all"
              >
                {isUniMode 
                  ? universities.map(u => <option key={u} value={u}>{u}</option>)
                  : careers.map(c => <option key={c} value={c}>{c}</option>)
                }
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-cream dark:bg-[#0f0e0c] flex items-center justify-center text-amber">
                {isUniMode ? <Landmark className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
              </div>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/20 dark:text-white/20 pointer-events-none" />
            </div>
          </div>

          {/* Selector B */}
          <div className="relative group">
            <label className="block text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 mb-2 ml-4 uppercase tracking-[0.2em]">
              {isUniMode ? 'Institución B' : 'Carrera B'}
            </label>
            <div className="relative">
              <select 
                value={isUniMode ? selectedEntityB : selectedCareerB}
                onChange={(e) => isUniMode ? setSelectedEntityB(e.target.value) : setSelectedCareerB(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1814] rounded-2xl p-4 pl-14 font-serif text-xl text-dark-brown dark:text-white cursor-pointer shadow-xl border border-dark-brown/5 dark:border-white/5 outline-none appearance-none hover:border-amber/30 transition-all"
              >
                {isUniMode 
                  ? universities.map(u => <option key={u} value={u}>{u}</option>)
                  : careers.map(c => <option key={c} value={c}>{c}</option>)
                }
              </select>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-warm-cream dark:bg-[#0f0e0c] flex items-center justify-center text-amber">
                {isUniMode ? <Landmark className="w-4 h-4" /> : <GraduationCap className="w-4 h-4" />}
              </div>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/20 dark:text-white/20 pointer-events-none" />
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-warm-cream dark:bg-[#0f0e0c] rounded-full w-12 h-12 flex items-center justify-center shadow-xl z-20 border-4 border-white dark:border-[#1a1814] hidden md:flex mt-3">
            <span className="font-serif text-sm font-black text-amber">VS</span>
          </div>
        </div>

        {/* Main Matrix */}
        <div className="w-full max-w-5xl bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl animate-slide-up mb-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber/5 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="relative z-10">
            <div className="grid grid-cols-3 gap-8 mb-12 items-end border-b border-dark-brown/10 dark:border-white/10 pb-8">
              <div className="col-span-1">
                <span className="text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 uppercase tracking-[0.2em]">Criterios Base</span>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark-brown dark:text-white truncate px-2">{isUniMode ? selectedEntityA : selectedCareerA}</h3>
              </div>
              <div className="col-span-1 text-center">
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-dark-brown dark:text-white truncate px-2">{isUniMode ? selectedEntityB : selectedCareerB}</h3>
              </div>
            </div>

            <div className="space-y-10">
              {isUniMode ? (
                <>
                  <div className="grid grid-cols-3 gap-8 items-center group">
                    <div className="col-span-1 flex items-center gap-4">
                      <div className="p-2 bg-amber/10 rounded-lg text-amber"><Wallet className="w-5 h-5" /></div>
                      <span className="font-bold text-sm text-dark-brown/70 dark:text-gray-300">Costo Anual</span>
                    </div>
                    <div className="col-span-1 text-center"><div className="bg-white dark:bg-[#1a1814] py-5 px-6 rounded-2xl shadow-sm border border-dark-brown/5 group-hover:scale-105 transition-all"><span className="font-serif font-bold text-xl">{(dataA as any).cost}</span></div></div>
                    <div className="col-span-1 text-center"><div className="bg-white dark:bg-[#1a1814] py-5 px-6 rounded-2xl shadow-sm border border-dark-brown/5 group-hover:scale-105 transition-all"><span className="font-serif font-bold text-xl">{(dataB as any).cost}</span></div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-8 items-center group">
                    <div className="col-span-1 flex items-center gap-4">
                      <div className="p-2 bg-amber/10 rounded-lg text-amber"><Clock className="w-5 h-5" /></div>
                      <span className="font-bold text-sm text-dark-brown/70 dark:text-gray-300">Duración</span>
                    </div>
                    <div className="col-span-1 text-center"><div className="bg-white dark:bg-[#1a1814] py-5 px-6 rounded-2xl shadow-sm border border-dark-brown/5 group-hover:scale-105 transition-all"><span className="font-serif font-bold text-xl">{(dataA as any).duration}</span></div></div>
                    <div className="col-span-1 text-center"><div className="bg-white dark:bg-[#1a1814] py-5 px-6 rounded-2xl shadow-sm border border-dark-brown/5 group-hover:scale-105 transition-all"><span className="font-serif font-bold text-xl">{(dataB as any).duration}</span></div></div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-3 gap-8 items-center group">
                    <div className="col-span-1 flex items-center gap-4">
                      <div className="p-2 bg-amber/10 rounded-lg text-amber"><Briefcase className="w-5 h-5" /></div>
                      <span className="font-bold text-sm text-dark-brown/70 dark:text-gray-300">Salario Promedio</span>
                    </div>
                    <div className="col-span-1 text-center"><div className="bg-white dark:bg-[#1a1814] py-5 px-6 rounded-2xl shadow-sm border border-dark-brown/5 group-hover:scale-105 transition-all"><span className="font-serif font-bold text-xl">{(dataA as any).salary}</span></div></div>
                    <div className="col-span-1 text-center"><div className="bg-white dark:bg-[#1a1814] py-5 px-6 rounded-2xl shadow-sm border border-dark-brown/5 group-hover:scale-105 transition-all"><span className="font-serif font-bold text-xl">{(dataB as any).salary}</span></div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-8 items-start group">
                    <div className="col-span-1 flex items-center gap-4 pt-4">
                      <div className="p-2 bg-amber/10 rounded-lg text-amber"><MapIcon className="w-5 h-5" /></div>
                      <span className="font-bold text-sm text-dark-brown/70 dark:text-gray-300">Mapa de Empleabilidad</span>
                    </div>
                    <div className="col-span-2 grid grid-cols-2 gap-4">
                      <div className="bg-white dark:bg-[#1a1814] p-6 rounded-3xl border border-dark-brown/5 space-y-3">
                        {regions.slice(0,3).map(r => (
                          <div key={r.id} className="h-1 bg-dark-brown/5 rounded-full overflow-hidden"><div className="h-full bg-amber" style={{ width: `${(dataA as any).regionalDemand[r.id]*10}%` }} /></div>
                        ))}
                      </div>
                      <div className="bg-white dark:bg-[#1a1814] p-6 rounded-3xl border border-dark-brown/5 space-y-3">
                        {regions.slice(0,3).map(r => (
                          <div key={r.id} className="h-1 bg-dark-brown/5 rounded-full overflow-hidden"><div className="h-full bg-amber" style={{ width: `${(dataB as any).regionalDemand[r.id]*10}%` }} /></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* AI Study Plan Analyzer */}
        {isUniMode && (
          <div className="w-full max-w-5xl">
            <div className="bg-dark-brown dark:bg-[#1a1814] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber to-transparent opacity-50" />
              <div className="relative z-10">
                {!showAIReport ? (
                  <>
                    <div className="w-20 h-20 bg-amber/10 rounded-3xl flex items-center justify-center mx-auto mb-8">
                      <Sparkles className="w-10 h-10 text-amber animate-pulse" />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Comparador de Planes (IA)</h2>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
                      Nuestro motor de IA analiza los programas de estudio para detectar diferencias en metodología, carga horaria y enfoque profesional.
                    </p>
                    
                    <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                      <div className="w-full md:w-64 border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-amber/50 transition-colors cursor-pointer group">
                        <FileText className="w-8 h-8 text-gray-500 mb-2 mx-auto group-hover:text-amber" />
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Plan {selectedEntityA}</p>
                      </div>
                      <div className="text-amber font-serif italic font-bold">vs</div>
                      <div className="w-full md:w-64 border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-amber/50 transition-colors cursor-pointer group">
                        <FileText className="w-8 h-8 text-gray-500 mb-2 mx-auto group-hover:text-amber" />
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Plan {selectedEntityB}</p>
                      </div>
                    </div>

                    <button 
                      onClick={handleRunAIAnalysis}
                      disabled={isAnalyzing}
                      className="mt-12 bg-amber text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-xl shadow-amber/20 hover:scale-105 transition-all flex items-center justify-center gap-3 mx-auto disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <>Analizando mallas curriculares... <Loader2 className="w-6 h-6 animate-spin" /></>
                      ) : (
                        <>Iniciar Análisis con IA <Sparkles className="w-6 h-6" /></>
                      )}
                    </button>
                  </>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-left space-y-12">
                    <div className="flex items-center justify-between border-b border-white/10 pb-8">
                      <h2 className="text-3xl font-serif font-bold text-white flex items-center gap-3">
                        <CheckCircle2 className="text-green-500 w-8 h-8" /> Informe Comparativo IA
                      </h2>
                      <button onClick={() => setShowAIAnalysis(false)} className="text-gray-500 hover:text-white transition-colors uppercase text-[10px] font-bold tracking-widest">Cerrar Informe</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {/* Analysis Column A */}
                      <div className="space-y-8">
                        <div className="px-4 py-1 bg-amber/10 text-amber inline-block rounded-full text-xs font-bold uppercase tracking-widest">{selectedEntityA}</div>
                        <div className="space-y-6">
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Pilares Académicos</p>
                            <div className="flex flex-wrap gap-2">
                              {(dataA as any).aiAnalysis?.pillars.map((p: string) => (
                                <span key={p} className="bg-white/5 px-3 py-1 rounded-lg text-sm border border-white/5">{p}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Metodología Detectada</p>
                            <p className="text-white">{(dataA as any).aiAnalysis?.methodology}</p>
                          </div>
                        </div>
                      </div>

                      {/* Analysis Column B */}
                      <div className="space-y-8">
                        <div className="px-4 py-1 bg-amber/10 text-amber inline-block rounded-full text-xs font-bold uppercase tracking-widest">{selectedEntityB}</div>
                        <div className="space-y-6">
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Pilares Académicos</p>
                            <div className="flex flex-wrap gap-2">
                              {(dataB as any).aiAnalysis?.pillars.map((p: string) => (
                                <span key={p} className="bg-white/5 px-3 py-1 rounded-lg text-sm border border-white/5">{p}</span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-2">Metodología Detectada</p>
                            <p className="text-white">{(dataB as any).aiAnalysis?.methodology}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-amber/10 border border-amber/20 rounded-3xl p-8 mt-12">
                      <h4 className="text-amber font-serif font-bold text-xl mb-4">Diferenciador Clave Detectado</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <p className="text-gray-300 text-sm border-l-2 border-amber/30 pl-4 leading-relaxed">
                          <strong className="text-white block mb-1">{selectedEntityA}:</strong> {(dataA as any).aiAnalysis?.advantage}
                        </p>
                        <p className="text-gray-300 text-sm border-l-2 border-amber/30 pl-4 leading-relaxed">
                          <strong className="text-white block mb-1">{selectedEntityB}:</strong> {(dataB as any).aiAnalysis?.advantage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
