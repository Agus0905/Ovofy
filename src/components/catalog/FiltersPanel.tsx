import { Clock } from 'lucide-react'

interface FiltersPanelProps {
  selectedUniversity: string
  setSelectedUniversity: (value: string) => void
  selectedCareer: string
  setSelectedCareer: (value: string) => void
  showTrending: boolean
  setShowTrending: (value: boolean) => void
  universities: string[]
  careers: string[]
}

export function FiltersPanel({
  selectedUniversity,
  setSelectedUniversity,
  selectedCareer,
  setSelectedCareer,
  showTrending,
  setShowTrending,
  universities,
  careers
}: FiltersPanelProps) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <select
        value={selectedUniversity}
        onChange={(e) => setSelectedUniversity(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
      >
        {universities.map(uni => (
          <option key={uni} value={uni}>{uni}</option>
        ))}
      </select>

      <select
        value={selectedCareer}
        onChange={(e) => setSelectedCareer(e.target.value)}
        className="px-4 py-2 bg-white dark:bg-[#1a1814] border border-dark-brown/20 dark:border-[#2a2620] rounded-lg text-dark-brown dark:text-[#f5f0e8]"
      >
        {careers.map(career => (
          <option key={career} value={career}>{career}</option>
        ))}
      </select>

      <button
        onClick={() => setShowTrending(!showTrending)}
        className={`px-4 py-2 rounded-lg border transition-colors flex items-center gap-2 ${
          showTrending
            ? 'bg-amber text-white border-amber'
            : 'bg-white dark:bg-[#1a1814] border-dark-brown/20 dark:border-[#2a2620] text-dark-brown dark:text-[#f5f0e8]'
        }`}
      >
        <Clock className="w-4 h-4" />
        <span>Trending</span>
      </button>
    </div>
  )
}
