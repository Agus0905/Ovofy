interface Activity {
  id: number
  title: string
  description: string
  duration: string
}

interface ActivitiesListProps {
  activities: Activity[]
}

export function ActivitiesList({ activities }: ActivitiesListProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-serif font-semibold text-dark-brown dark:text-[#f5f0e8] mb-6">
        Actividades del Curso
      </h3>
      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white dark:bg-[#1a1814] rounded-xl p-6 shadow-md border border-dark-brown/10 dark:border-[#2a2620]"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-semibold text-dark-brown dark:text-[#f5f0e8]">
              {activity.title}
            </h4>
            <span className="text-sm text-amber font-medium">{activity.duration}</span>
          </div>
          <p className="text-dark-brown/80 dark:text-gray-300">{activity.description}</p>
        </div>
      ))}
    </div>
  )
}
