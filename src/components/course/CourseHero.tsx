import { getUniversityStyle } from '../../utils/universityStyles'

interface CourseHeroProps {
  title: string
  university: string
  career: string
  logo: string
}

export function CourseHero({ title, university, career, logo }: CourseHeroProps) {
  const uniStyle = getUniversityStyle(university)

  return (
    <div className={`relative h-[32rem] ${uniStyle.bg} overflow-hidden transition-colors duration-500 flex items-center`}>
      {/* Artistic Background Design */}
      <div 
        className="absolute inset-0 opacity-40 dark:opacity-20"
        style={{ 
          backgroundImage: uniStyle.pattern,
          backgroundSize: '60px 60px'
        }} 
      />

      {/* Large Floating Logo Background */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 opacity-10 dark:opacity-5 transform rotate-12">
        <img src={logo} alt="" className="w-[40rem] h-[40rem] object-contain grayscale" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="animate-fade-in">
          <div className="inline-block px-4 py-1.5 bg-amber/10 rounded-full mb-6 border border-amber/20">
            <span className="text-amber font-bold text-xs uppercase tracking-widest">{university}</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-dark-brown dark:text-white mb-6 leading-[1.1]">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-dark-brown/60 dark:text-gray-400 font-sans leading-relaxed">
            {career}
          </p>
        </div>

        <div className="hidden lg:flex justify-center items-center animate-slide-up">
          <div className="relative">
            <div className="absolute inset-0 bg-amber/20 blur-[100px] rounded-full" />
            <img 
              src={logo} 
              alt={university} 
              className="relative z-10 w-64 h-64 object-contain opacity-80 dark:opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 hover:scale-105" 
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-warm-cream dark:from-[#0f0e0c] to-transparent" />
    </div>
  )
}
