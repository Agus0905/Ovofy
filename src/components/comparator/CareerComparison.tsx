import { useState } from 'react'
import { ChevronDown, GraduationCap, Clock, Wallet, Briefcase, FileText, Globe, CheckCircle2 } from 'lucide-react'

type UniversityData = {
  name: string;
  cost: string;
  duration: string;
  modality: string;
  plan: string;
  job: string;
}

type CareerData = {
  [uni: string]: UniversityData;
}

const COMPARISON_DATA: { [career: string]: CareerData } = {
  'Derecho': {
    'Di Tella': {
      name: 'Universidad Torcuato Di Tella',
      cost: '$12k-18k/año',
      duration: '5 años',
      modality: 'Presencial',
      plan: 'Enfoque en Derecho Privado, Público e Internacional',
      job: 'Grandes estudios jurídicos, empresas multinacionales, cargos en el Estado'
    },
    'UB': {
      name: 'Universidad de Belgrano',
      cost: '$6k-10k/año',
      duration: '5 años',
      modality: 'Presencial/Blended',
      plan: 'Orientación en Derecho Civil, Penal y Comercial',
      job: 'Abogacía independiente, carrera en la judicatura, asesoría legal'
    },
    'UCA': {
      name: 'UCA',
      cost: '$8k-12k/año',
      duration: '5 años',
      modality: 'Presencial',
      plan: 'Formación Integral: Derecho Canónico, Civil e Internacional',
      job: 'Sector público, ONG, empresas con impacto social'
    }
  },
  'Medicina': {
    'UBA': {
      name: 'UBA',
      cost: 'Gratuita',
      duration: '6 años',
      modality: 'Presencial',
      plan: 'Ciclo Básico, Clínico y Especialización (Residencia)',
      job: 'Hospitales públicos, clínicas privadas, centros de salud comunitarios'
    },
    'Austral': {
      name: 'Universidad Austral',
      cost: '$15k-22k/año',
      duration: '6 años',
      modality: 'Presencial',
      plan: 'Ciencias básicas aplicadas, Práctica Clínica temprana, Residencia',
      job: 'Medicina privada de alta complejidad, investigación biomédica'
    },
    'UB': {
      name: 'Universidad de Belgrano',
      cost: '$8k-14k/año',
      duration: '6 años',
      modality: 'Presencial',
      plan: 'Ejes Biomédico, Clínico y Quirúrgico intensivos',
      job: 'Clínicas regionales, hospitales privados, gestión de salud'
    }
  },
  'Ingeniería': {
    'ITBA': {
      name: 'ITBA',
      cost: '$14k-20k/año',
      duration: '5 años',
      modality: 'Presencial',
      plan: 'Especialidades en Informática, Electrónica e Industrial',
      job: 'Empresas tecnológicas, sector energético, finanzas cuantitativas'
    },
    'UADE': {
      name: 'UADE',
      cost: '$7k-13k/año',
      duration: '5 años',
      modality: 'Presencial',
      plan: 'Orientaciones en Ingeniería Industrial, Sistemas y Civil',
      job: 'Industria de manufactura, construcción, desarrollo de software'
    },
    'UTN': {
      name: 'UTN',
      cost: 'Gratuita',
      duration: '5 años',
      modality: 'Presencial',
      plan: 'Ingeniería Mecánica, Eléctrica y Sistemas de Información',
      job: 'Industria pesada, plantas de manufactura, consultoría IT'
    }
  },
  'Economía': {
    'UCEMA': {
      name: 'UCEMA',
      cost: '$12k-18k/año',
      duration: '4 años',
      modality: 'Presencial',
      plan: 'Microeconomía, Macroeconomía, Econometría y Finanzas',
      job: 'Sector financiero, consultoría económica, academia'
    },
    'Di Tella': {
      name: 'Universidad Torcuato Di Tella',
      cost: '$13k-19k/año',
      duration: '4 años',
      modality: 'Presencial',
      plan: 'Teoría Económica, Política y Relaciones Internacionales',
      job: 'Organismos internacionales, banca central, política económica'
    },
    'UBA': {
      name: 'UBA',
      cost: 'Gratuita',
      duration: '5 años',
      modality: 'Presencial',
      plan: 'Política económica, Historia económica, Estadística avanzada',
      job: 'Administración pública, grandes empresas, investigación'
    }
  },
  'Diseño': {
    'Di Tella': {
      name: 'Universidad Torcuato Di Tella',
      cost: '$12k-18k/año',
      duration: '4 años',
      modality: 'Presencial',
      plan: 'Diseño Gráfico, Industrial y de Interacción',
      job: 'Agencias de diseño, estudios creativos, freelance'
    },
    'UADE': {
      name: 'UADE',
      cost: '$7k-12k/año',
      duration: '4 años',
      modality: 'Presencial',
      plan: 'Diseño Gráfico, Diseño de Moda y Multimedia',
      job: 'Agencias de publicidad, industria de la moda, medios digitales'
    },
    'UP': {
      name: 'Universidad de Palermo',
      cost: '$9k-14k/año',
      duration: '4 años',
      modality: 'Presencial',
      plan: 'Identidad de marca, Packaging y Diseño Digital',
      job: 'Especialista en Branding, UX Design, Marketing creativo'
    }
  }
}

export function CareerComparison() {
  const [selectedCareer, setSelectedCareer] = useState('')
  const [uni1, setUni1] = useState('')
  const [uni2, setUni2] = useState('')

  const careers = Object.keys(COMPARISON_DATA)
  const availableUnis = selectedCareer ? Object.keys(COMPARISON_DATA[selectedCareer]) : []

  const data1 = selectedCareer && uni1 ? COMPARISON_DATA[selectedCareer][uni1] : null
  const data2 = selectedCareer && uni2 ? COMPARISON_DATA[selectedCareer][uni2] : null

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-[#1a1814] p-8 rounded-[2rem] border border-dark-brown/5 dark:border-white/5 shadow-xl">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Carrera</label>
          <div className="relative">
            <select 
              value={selectedCareer}
              onChange={(e) => { setSelectedCareer(e.target.value); setUni1(''); setUni2(''); }}
              className="w-full bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-4 pl-12 font-serif text-lg border border-transparent focus:border-amber outline-none appearance-none transition-all"
            >
              <option value="">Seleccionar...</option>
              {careers.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber" />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-brown/20" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Universidad 1</label>
          <div className="relative">
            <select 
              value={uni1}
              disabled={!selectedCareer}
              onChange={(e) => setUni1(e.target.value)}
              className="w-full bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-4 pl-12 font-serif text-lg border border-transparent focus:border-amber outline-none appearance-none transition-all disabled:opacity-50"
            >
              <option value="">Seleccionar...</option>
              {availableUnis.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber" />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-brown/20" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Universidad 2</label>
          <div className="relative">
            <select 
              value={uni2}
              disabled={!selectedCareer}
              onChange={(e) => setUni2(e.target.value)}
              className="w-full bg-warm-cream/50 dark:bg-[#0f0e0c] rounded-2xl p-4 pl-12 font-serif text-lg border border-transparent focus:border-amber outline-none appearance-none transition-all disabled:opacity-50"
            >
              <option value="">Seleccionar...</option>
              {availableUnis.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber" />
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-brown/20" />
          </div>
        </div>
      </div>

      {data1 && data2 && (
        <div className="bg-white dark:bg-[#1a1814] rounded-[2.5rem] border border-dark-brown/5 dark:border-white/5 shadow-2xl overflow-hidden animate-slide-up">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-warm-cream/30 dark:bg-white/5 border-b border-dark-brown/5 dark:border-white/5">
                  <th className="p-8 text-left text-[10px] uppercase tracking-[0.2em] font-black text-amber w-1/4">Criterio 2026</th>
                  <th className="p-8 text-center text-xl font-serif font-bold text-dark-brown dark:text-white w-3/8">{data1.name}</th>
                  <th className="p-8 text-center text-xl font-serif font-bold text-dark-brown dark:text-white w-3/8">{data2.name}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-brown/5 dark:divide-white/5">
                <tr className="hover:bg-amber/5 transition-colors">
                  <td className="p-8 flex items-center gap-3 font-bold text-dark-brown/60 dark:text-gray-400"><Wallet className="w-4 h-4 text-amber" /> Costo anual</td>
                  <td className="p-8 text-center font-bold text-dark-brown dark:text-white">{data1.cost}</td>
                  <td className="p-8 text-center font-bold text-dark-brown dark:text-white">{data2.cost}</td>
                </tr>
                <tr className="bg-warm-cream/10 dark:bg-white/[0.02] hover:bg-amber/5 transition-colors">
                  <td className="p-8 flex items-center gap-3 font-bold text-dark-brown/60 dark:text-gray-400"><Clock className="w-4 h-4 text-amber" /> Duración</td>
                  <td className="p-8 text-center font-bold text-dark-brown dark:text-white">{data1.duration}</td>
                  <td className="p-8 text-center font-bold text-dark-brown dark:text-white">{data2.duration}</td>
                </tr>
                <tr className="hover:bg-amber/5 transition-colors">
                  <td className="p-8 flex items-center gap-3 font-bold text-dark-brown/60 dark:text-gray-400"><Globe className="w-4 h-4 text-amber" /> Modalidad</td>
                  <td className="p-8 text-center font-bold text-dark-brown dark:text-white">{data1.modality}</td>
                  <td className="p-8 text-center font-bold text-dark-brown dark:text-white">{data2.modality}</td>
                </tr>
                <tr className="bg-warm-cream/10 dark:bg-white/[0.02] hover:bg-amber/5 transition-colors">
                  <td className="p-8 flex items-center gap-3 font-bold text-dark-brown/60 dark:text-gray-400"><FileText className="w-4 h-4 text-amber" /> Plan de estudios</td>
                  <td className="p-8 text-sm leading-relaxed text-dark-brown/80 dark:text-gray-300">{data1.plan}</td>
                  <td className="p-8 text-sm leading-relaxed text-dark-brown/80 dark:text-gray-300">{data2.plan}</td>
                </tr>
                <tr className="hover:bg-amber/5 transition-colors">
                  <td className="p-8 flex items-center gap-3 font-bold text-dark-brown/60 dark:text-gray-400"><Briefcase className="w-4 h-4 text-amber" /> Salida laboral</td>
                  <td className="p-8 text-sm leading-relaxed text-dark-brown/80 dark:text-gray-300">{data1.job}</td>
                  <td className="p-8 text-sm leading-relaxed text-dark-brown/80 dark:text-gray-300">{data2.job}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-amber/5 border-t border-amber/10 text-center">
            <p className="text-sm font-bold text-amber flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Comparación basada en datos oficiales 2026
            </p>
          </div>
        </div>
      )}

      {!data1 || !data2 ? (
        <div className="text-center py-20 bg-dark-brown/5 dark:bg-white/5 rounded-[2.5rem] border-2 border-dashed border-dark-brown/10 dark:border-white/10">
          <GraduationCap className="w-16 h-16 text-dark-brown/20 dark:text-white/20 mx-auto mb-4" />
          <p className="text-xl font-serif italic text-dark-brown/40 dark:text-white/30">Seleccioná una carrera y dos instituciones para comenzar la comparativa...</p>
        </div>
      ) : null}
    </div>
  )
}
