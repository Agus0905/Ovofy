interface ComparisonData {
  criterion: string
  uni1Value: string
  uni2Value: string
}

interface ComparisonTableProps {
  university1: string
  university2: string
  data: ComparisonData[]
}

export function ComparisonTable({ university1, university2, data }: ComparisonTableProps) {
  return (
    <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-6">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-brown/10 dark:border-white/10">
            <th className="px-6 py-3 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">Criterio</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">{university1}</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-dark-brown dark:text-[#f5f0e8]">{university2}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="border-b border-dark-brown/10 dark:border-white/10">
              <td className="px-6 py-4 font-medium text-dark-brown dark:text-[#f5f0e8]">{row.criterion}</td>
              <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{row.uni1Value}</td>
              <td className="px-6 py-4 text-dark-brown/80 dark:text-gray-300">{row.uni2Value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
