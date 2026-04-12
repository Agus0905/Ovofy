interface University {
  name: string
  location: string
  ranking: number
}

interface UniversityCardProps {
  university: University
  onSelect: () => void
  isSelected: boolean
}

export function UniversityCard({ university, onSelect, isSelected }: UniversityCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'bg-amber/10 border-amber'
          : 'bg-white dark:bg-[#1a1814] border-dark-brown/20 dark:border-[#2a2620] hover:border-amber'
      }`}
    >
      <h3 className="font-semibold text-dark-brown dark:text-[#f5f0e8]">{university.name}</h3>
      <p className="text-sm text-dark-brown/60 dark:text-gray-400">{university.location}</p>
      <p className="text-sm text-amber">Ranking #{university.ranking}</p>
    </div>
  )
}
