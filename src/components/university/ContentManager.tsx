import React from 'react'
import { Plus, Video, FileText, Send, ChevronDown } from 'lucide-react'

export function ContentManager() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Publicando experiencia... (Frontend Only)')
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <div className="bg-white dark:bg-[#1a1814] rounded-[3rem] p-10 md:p-16 border border-dark-brown/5 dark:border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber/5 rounded-bl-[5rem]" />
        
        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 bg-amber rounded-2xl flex items-center justify-center text-white shadow-xl shadow-amber/20">
            <Plus className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-3xl font-serif font-bold text-dark-brown dark:text-white">Nueva Experiencia</h2>
            <p className="text-dark-brown/60 dark:text-gray-400 font-medium">Crea contenido interactivo para futuros estudiantes.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Nombre del curso</label>
              <input 
                type="text" 
                placeholder="Ej: Introducción al Derecho Civil"
                className="w-full bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl p-5 border border-transparent focus:border-amber outline-none transition-all font-bold text-dark-brown dark:text-white placeholder:text-dark-brown/20 dark:placeholder:text-gray-600"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Carrera</label>
              <div className="relative">
                <select className="w-full bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl p-5 border border-transparent focus:border-amber outline-none appearance-none transition-all font-bold text-dark-brown dark:text-white">
                  <option>Derecho</option>
                  <option>Medicina</option>
                  <option>Ingeniería</option>
                  <option>Economía</option>
                  <option>Diseño</option>
                </select>
                <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-brown/20" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Descripción de la experiencia</label>
            <textarea 
              rows={4}
              placeholder="Describe de qué trata esta clase práctica..."
              className="w-full bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl p-5 border border-transparent focus:border-amber outline-none transition-all font-medium text-dark-brown dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button type="button" className="group flex items-center justify-between p-6 bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl border-2 border-dashed border-dark-brown/10 dark:border-white/10 hover:border-amber transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center text-amber">
                  <Video className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-dark-brown/60 dark:text-gray-400">Subir video (.mp4)</span>
              </div>
              <Plus className="w-5 h-5 text-dark-brown/20 group-hover:text-amber transition-colors" />
            </button>

            <button type="button" className="group flex items-center justify-between p-6 bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl border-2 border-dashed border-dark-brown/10 dark:border-white/10 hover:border-amber transition-all">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-amber/10 rounded-xl flex items-center justify-center text-amber">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-sm font-bold text-dark-brown/60 dark:text-gray-400">Subir material PDF</span>
              </div>
              <Plus className="w-5 h-5 text-dark-brown/20 group-hover:text-amber transition-colors" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-widest text-dark-brown/40 dark:text-gray-500 ml-4">Consigna práctica (Auto-evaluación)</label>
            <textarea 
              rows={3}
              placeholder="¿Qué ejercicio debe realizar el alumno?"
              className="w-full bg-warm-cream/30 dark:bg-[#0f0e0c] rounded-2xl p-5 border border-transparent focus:border-amber outline-none transition-all font-medium text-dark-brown dark:text-white"
            />
          </div>

          <div className="pt-6">
            <button 
              type="submit"
              className="w-full bg-amber text-white py-6 rounded-[1.5rem] font-black uppercase tracking-[0.2em] shadow-2xl shadow-amber/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
            >
              <Send className="w-6 h-6" /> Publicar experiencia
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
