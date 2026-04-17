import { Sparkles, ArrowRight, Timer } from 'lucide-react';

interface QuizIntroProps {
  onStart: () => void;
}

export function QuizIntroduction({ onStart }: QuizIntroProps) {
  return (
    <main className="flex-grow flex flex-col items-center justify-center px-6 py-32 md:py-40 max-w-5xl mx-auto w-full relative z-10">
      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
        {/* Hero Text Column */}
        <div className="col-span-1 md:col-span-7 flex flex-col items-start space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#1a1814] outline outline-1 outline-dark-brown/10 dark:outline-white/10 text-dark-brown/60 dark:text-gray-400 font-medium text-sm mb-4">
            <Sparkles className="w-4 h-4 text-amber" />
            <span>Descubrí tu camino</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark-brown dark:text-white leading-[1.1] tracking-tight">
            Comenzá tu <br/>
            <span className="text-amber relative inline-block">
              Test Vocacional
              <svg className="absolute w-full h-3 -bottom-4 left-0 text-amber opacity-60 z-[-1]" fill="none" viewBox="0 0 200 9" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7C48.5 2 120 -1.5 198 7" stroke="currentColor" strokeLinecap="round" strokeWidth="4"></path>
              </svg>
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-dark-brown/60 dark:text-gray-400 max-w-lg leading-relaxed font-sans">
            8 preguntas, 2 minutos. Descubrí para qué estás hecho y trazá el mapa de tu futuro profesional con nuestra metodología basada en IA.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <button 
              onClick={onStart}
              className="bg-gradient-to-br from-[#845400] to-[#ffb347] text-white font-bold text-lg px-10 py-4 rounded-xl shadow-[0_12px_40px_-10px_rgba(132,84,0,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 group whitespace-nowrap min-w-fit"
            >
              <span>Comenzar Test</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <div className="flex items-center gap-4 text-sm text-dark-brown/60 dark:text-gray-400 font-medium">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <img 
                    key={i}
                    alt="Student avatar" 
                    className="w-8 h-8 rounded-full border-2 border-warm-cream dark:border-[#0f0e0c] object-cover" 
                    src={`https://i.pravatar.cc/150?u=${i + 10}`}
                  />
                ))}
              </div>
              <p>+10k estudiantes ya lo hicieron</p>
            </div>
          </div>
        </div>

        {/* Hero Graphic Column (Asymmetric) */}
        <div className="col-span-1 md:col-span-5 relative mt-12 md:mt-0">
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] bg-white dark:bg-[#1a1814] p-6 shadow-2xl outline outline-1 outline-dark-brown/5 dark:outline-white/5 flex flex-col justify-between overflow-hidden group">
            {/* Decorative subtle grid */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiNkNmMzYjAiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] opacity-50 z-0"></div>
            
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-12 h-12 rounded-xl bg-warm-cream dark:bg-[#0f0e0c] flex items-center justify-center shadow-sm border border-dark-brown/5 dark:border-white/5">
                <Sparkles className="w-6 h-6 text-amber" />
              </div>
              <span className="px-3 py-1 bg-amber/10 text-amber text-[10px] font-bold rounded-full uppercase tracking-wider">Paso 1/8</span>
            </div>

            {/* Top right blurred golden circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-amber/20 rounded-full blur-2xl pointer-events-none z-0"></div>

            <div className="relative z-10 space-y-6">
              {/* Progress Bar - Fills on hover */}
              <div className="h-2 w-1/3 bg-dark-brown/10 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-full bg-amber rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-1000 ease-in-out"></div>
              </div>
              
              <div>
                <p className="font-serif text-2xl text-dark-brown dark:text-white mb-2 leading-snug">
                  "¿Qué tipo de problemas preferís resolver?"
                </p>
                <p className="text-sm text-dark-brown/40 dark:text-gray-500 font-medium">Pregunta de ejemplo</p>
              </div>

              <div className="space-y-3">
                <div className="h-10 w-full bg-warm-cream/50 dark:bg-[#0f0e0c]/50 rounded-lg border border-dark-brown/5 dark:border-white/5 flex items-center px-4 gap-3">
                  <div className="w-3 h-3 rounded-full border-2 border-dark-brown/20 dark:border-white/20"></div>
                  <div className="h-1.5 w-1/2 bg-dark-brown/10 dark:bg-white/10 rounded"></div>
                </div>
                <div className="h-10 w-full bg-amber/10 border border-amber/30 rounded-lg flex items-center px-4 gap-3 relative overflow-hidden">
                  <div className="w-3 h-3 rounded-full bg-amber flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-white"></div>
                  </div>
                  <div className="h-1.5 w-3/4 bg-amber/30 rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Element - Bounces up and down */}
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1a1814] p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20 outline outline-1 outline-dark-brown/5 dark:outline-white/5 animate-bounce" style={{ animationDuration: '3s' }}>
            <div className="w-10 h-10 rounded-full bg-amber/10 flex items-center justify-center">
              <Timer className="w-5 h-5 text-amber" />
            </div>
            <div>
              <p className="font-serif font-bold text-dark-brown dark:text-white leading-none">2 Minutos</p>
              <p className="text-[10px] text-dark-brown/40 dark:text-gray-500 font-bold uppercase mt-1">Tiempo estimado</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
