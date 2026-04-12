interface ScheduleItem {
  day: string
  time: string
  topic: string
}

interface ScheduleSectionProps {
  schedule: ScheduleItem[]
}

export function ScheduleSection({ schedule }: ScheduleSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-6">
        Cronograma
      </h3>
      <div className="bg-white dark:bg-[#1a1814] rounded-xl overflow-hidden shadow-md border border-dark-brown/10 dark:border-[#2a2620]">
        {schedule.map((item, index) => (
          <div
            key={index}
            className={`flex p-4 ${
              index !== schedule.length - 1 ? 'border-b border-dark-brown/10 dark:border-[#2a2620]' : ''
            }`}
          >
            <div className="w-24 flex-shrink-0">
              <p className="font-medium text-amber">{item.day}</p>
              <p className="text-sm text-dark-brown/60 dark:text-gray-400">{item.time}</p>
            </div>
            <div className="flex-1">
              <p className="text-dark-brown dark:text-[#f5f0e8]">{item.topic}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
