interface CourseHeroProps {
  title: string
  university: string
  career: string
  image: string
}

export function CourseHero({ title, university, career, image }: CourseHeroProps) {
  return (
    <div className="relative h-96 bg-gradient-to-r from-amber to-orange-500">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="text-white">
          <p className="text-amber-200 font-medium mb-2">{university}</p>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-4">{title}</h1>
          <p className="text-xl text-white/90">{career}</p>
        </div>
      </div>
    </div>
  )
}
