import { useState, useEffect } from 'react'
import { Clock, Wallet, Briefcase, Sparkles, CheckCircle2, Award, BookOpen, Globe } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { universities as localUniData, careerComparisons as localCareerData } from '../data/universities'

export function UniversityComparator() {
  const [comparisonMode, setComparisonMode] = useState<'universidades' | 'carreras'>('universidades')
  
  // Initialize with local data for instant load
  const mappedLocal = localUniData.map(u => ({ ...u, nombre: u.name }))
  const [dbUniversities, setDbUniversities] = useState<any[]>(mappedLocal)
  const [selectedEntityA, setSelectedEntityA] = useState(mappedLocal[0]?.nombre || '')
  const [selectedEntityB, setSelectedEntityB] = useState(mappedLocal[1]?.nombre || '')
  
  const [selectedCareer, setSelectedCareer] = useState('Derecho')

  useEffect(() => {
    async function fetchUniversities() {
      try {
        console.log('Comparator: Background sync starting...')
        
        // Use a 3-second timeout for the database fetch
        const fetchPromise = supabase
          .from('universities')
          .select('*')
          .order('ranking', { ascending: true })

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Sync timeout')), 3000)
        )

        const { data, error: dbError } = await Promise.race([
          fetchPromise,
          timeoutPromise
        ]) as any
        
        if (dbError) throw dbError

        if (data && data.length > 0) {
          console.log('Comparator: Data received from DB:', data.length)
          setDbUniversities(data)
          // Only update selections if they haven't been touched or are default
          if (selectedEntityA === mappedLocal[0]?.nombre) setSelectedEntityA(data[0].nombre)
          if (selectedEntityB === mappedLocal[1]?.nombre) setSelectedEntityB(data[1].nombre)
        }
      } catch (err: any) {
        console.info('Comparator: Sync timed out or failed, using local fallback data.', err.message)
      }
    }
    fetchUniversities()
  }, [])

  const isUniMode = comparisonMode === 'universidades'
  
  const uniA = dbUniversities.find(u => u.nombre === selectedEntityA) || dbUniversities[0]
  const uniB = dbUniversities.find(u => u.nombre === selectedEntityB) || dbUniversities[1]

  const getScholarships = (uni: any) => {
    if (!uni?.scholarships) return []
    if (Array.isArray(uni.scholarships)) return uni.scholarships
    return uni.scholarships.split(',').map((s: string) => s.trim())
  }

  const getStrengths = (uni: any) => {
    if (!uni?.strengths) return ''
    if (Array.isArray(uni.strengths)) return uni.strengths.join(', ')
    return uni.strengths
  }

  const getRanking = (ranking: any) => {
    if (!ranking) return ''
    const str = String(ranking)
    return str.startsWith('#') ? str : `#${str}`
  }

  // Find career data based on selected university and career
  const careerDataA = localCareerData.find(c => (c.university.includes(selectedEntityA) || selectedEntityA.includes(c.university)) && c.career === selectedCareer) || localCareerData.find(c => c.career === selectedCareer)
  const careerDataB = localCareerData.find(c => (c.university.includes(selectedEntityB) || selectedEntityB.includes(c.university)) && c.career === selectedCareer) || localCareerData.find(c => c.career === selectedCareer)

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-24 pb-20 relative overflow-hidden transition-colors duration-500">
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#1a1208 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

      <main className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-dark-brown dark:text-white tracking-tight mb-8 relative inline-block">
            Comparador Real 2026
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-amber to-transparent rounded-full" />
          </h1>
          <p className="text-lg text-dark-brown/60 dark:text-gray-400 font-sans leading-relaxed max-w-2xl mx-auto">
            Información oficial y actualizada para el ciclo lectivo 2026. Datos del ranking QS y aranceles vigentes.
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex p-1.5 bg-dark-brown/5 dark:bg-white/5 rounded-full mb-16 shadow-inner relative max-w-md w-full animate-slide-up">
          <button 
            onClick={() => setComparisonMode('universidades')}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
              isUniMode ? 'bg-amber text-white shadow-lg' : 'text-dark-brown/60'
            }`}
          >
            Instituciones
          </button>
          <button 
            onClick={() => setComparisonMode('carreras')}
            className={`flex-1 py-3 px-6 rounded-full font-bold text-sm transition-all duration-300 ${
              !isUniMode ? 'bg-amber text-white shadow-lg' : 'text-dark-brown/60'
            }`}
          >
            Por Carrera
          </button>
        </div>

        {/* Selection Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mb-16 relative z-10 animate-fade-in">
          {!isUniMode && (
            <div className="md:col-span-2 lg:col-span-1">
              <label className="block text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 mb-2 ml-4 uppercase tracking-[0.2em]">Carrera a comparar</label>
              <select 
                value={selectedCareer}
                onChange={(e) => setSelectedCareer(e.target.value)}
                className="w-full bg-white dark:bg-[#1a1814] rounded-2xl p-4 pl-12 font-serif text-xl border border-dark-brown/5 outline-none appearance-none"
              >
                {Array.from(new Set(localCareerData.map(c => c.career))).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          )}

          <div className={`${isUniMode ? 'md:col-span-1' : ''}`}>
            <label className="block text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 mb-2 ml-4 uppercase tracking-[0.2em]">Institución A</label>
            <select 
              value={selectedEntityA}
              onChange={(e) => setSelectedEntityA(e.target.value)}
              className="w-full bg-white dark:bg-[#1a1814] rounded-2xl p-4 pl-12 font-serif text-xl border border-dark-brown/5 outline-none appearance-none"
            >
              {dbUniversities.map(u => <option key={u.nombre} value={u.nombre}>{u.nombre}</option>)}
            </select>
          </div>

          <div className={`${isUniMode ? 'md:col-span-1' : ''}`}>
            <label className="block text-[10px] font-bold text-dark-brown/40 dark:text-gray-500 mb-2 ml-4 uppercase tracking-[0.2em]">Institución B</label>
            <select 
              value={selectedEntityB}
              onChange={(e) => setSelectedEntityB(e.target.value)}
              className="w-full bg-white dark:bg-[#1a1814] rounded-2xl p-4 pl-12 font-serif text-xl border border-dark-brown/5 outline-none appearance-none"
            >
              {dbUniversities.map(u => <option key={u.nombre} value={u.nombre}>{u.nombre}</option>)}
            </select>
          </div>
        </div>

        {/* Comparison Matrix */}
        <div className="w-full max-w-6xl bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 border border-white/20 dark:border-white/10 shadow-2xl animate-slide-up mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Criteria Column */}
            <div className="hidden md:block space-y-12">
              <div className="h-20 flex items-center"><span className="text-xs font-black uppercase tracking-[0.2em] text-amber">Criterios 2026</span></div>
              <div className="flex items-center gap-4 text-dark-brown dark:text-white font-bold h-12"><Award className="w-5 h-5 text-amber" /> Ranking</div>
              <div className="flex items-center gap-4 text-dark-brown dark:text-white font-bold h-12"><Wallet className="w-5 h-5 text-amber" /> Arancel Mensual</div>
              <div className="flex items-center gap-4 text-dark-brown dark:text-white font-bold h-12"><Clock className="w-5 h-5 text-amber" /> Duración Plan</div>
              <div className="flex items-center gap-4 text-dark-brown dark:text-white font-bold h-12"><Globe className="w-5 h-5 text-amber" /> Modalidad</div>
              {!isUniMode && <div className="flex items-center gap-4 text-dark-brown dark:text-white font-bold h-12"><Briefcase className="w-5 h-5 text-amber" /> Salida Laboral</div>}
              <div className="flex items-center gap-4 text-dark-brown dark:text-white font-bold h-12"><Sparkles className="w-5 h-5 text-amber" /> Diferenciador</div>
            </div>

            {/* University A Column */}
            <div className="text-center space-y-12 bg-white/30 dark:bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-lg">
              <div className="h-20 flex flex-col items-center justify-center">
                <img src={uniA?.logo_url} alt="" className="h-12 object-contain mb-2" />
                <h3 className="font-serif font-bold text-lg truncate w-full">{uniA?.nombre}</h3>
              </div>
              <div className="h-12 flex items-center justify-center text-2xl font-black text-amber">{getRanking(uniA?.ranking)}</div>
              <div className="h-12 flex items-center justify-center text-sm font-medium">{uniA?.cost_range}</div>
              <div className="h-12 flex items-center justify-center text-sm font-medium">{isUniMode ? uniA?.duration : careerDataA?.duration}</div>
              <div className="h-12 flex items-center justify-center text-sm font-medium">{uniA?.modality}</div>
              {!isUniMode && (
                <div className="h-12 flex items-center justify-center text-[10px] font-bold uppercase leading-tight px-2">
                  {careerDataA?.job_prospects?.slice(0, 2).join(", ")}
                </div>
              )}
              <div className="h-12 flex items-center justify-center text-[10px] font-bold text-dark-brown/60 dark:text-gray-400 uppercase leading-relaxed px-4">
                {isUniMode ? getStrengths(uniA) : careerDataA?.advantages?.slice(0, 2).join(". ")}
              </div>
            </div>

            {/* University B Column */}
            <div className="text-center space-y-12 bg-white/30 dark:bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-lg">
              <div className="h-20 flex flex-col items-center justify-center">
                <img src={uniB?.logo_url} alt="" className="h-12 object-contain mb-2" />
                <h3 className="font-serif font-bold text-lg truncate w-full">{uniB?.nombre}</h3>
              </div>
              <div className="h-12 flex items-center justify-center text-2xl font-black text-amber">{getRanking(uniB?.ranking)}</div>
              <div className="h-12 flex items-center justify-center text-sm font-medium">{uniB?.cost_range}</div>
              <div className="h-12 flex items-center justify-center text-sm font-medium">{isUniMode ? uniB?.duration : careerDataB?.duration}</div>
              <div className="h-12 flex items-center justify-center text-sm font-medium">{uniB?.modality}</div>
              {!isUniMode && (
                <div className="h-12 flex items-center justify-center text-[10px] font-bold uppercase leading-tight px-2">
                  {careerDataB?.job_prospects?.slice(0, 2).join(", ")}
                </div>
              )}
              <div className="h-12 flex items-center justify-center text-[10px] font-bold text-dark-brown/60 dark:text-gray-400 uppercase leading-relaxed px-4">
                {isUniMode ? getStrengths(uniB) : careerDataB?.advantages?.slice(0, 2).join(". ")}
              </div>
            </div>
          </div>
        </div>

        {/* Scholarships & Requirements Section */}
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-amber/5 border border-amber/10 p-10 rounded-[3rem]">
            <h4 className="font-serif font-bold text-2xl text-amber mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6" /> {isUniMode ? 'Becas Disponibles' : 'Requisitos de Ingreso'}
            </h4>
            <div className="space-y-4">
              {isUniMode ? (
                getScholarships(uniA).map((s: string) => (
                  <div key={s} className="flex items-center gap-3 text-sm font-bold text-dark-brown/70 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-amber" /> {s}
                  </div>
                ))
              ) : (
                careerDataA?.requirements.map((r: string) => (
                  <div key={r} className="flex items-center gap-3 text-sm font-bold text-dark-brown/70 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-amber" /> {r}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="bg-amber/5 border border-amber/10 p-10 rounded-[3rem]">
            <h4 className="font-serif font-bold text-2xl text-amber mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6" /> {isUniMode ? 'Becas Disponibles' : 'Requisitos de Ingreso'}
            </h4>
            <div className="space-y-4">
              {isUniMode ? (
                getScholarships(uniB).map((s: string) => (
                  <div key={s} className="flex items-center gap-3 text-sm font-bold text-dark-brown/70 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-amber" /> {s}
                  </div>
                ))
              ) : (
                careerDataB?.requirements.map((r: string) => (
                  <div key={r} className="flex items-center gap-3 text-sm font-bold text-dark-brown/70 dark:text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-amber" /> {r}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
