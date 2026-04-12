interface Skill {
  name: string
  level: number
}

interface SkillMapProps {
  skills: Skill[]
}

export function SkillMap({ skills }: SkillMapProps) {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-white mb-6">Mis Habilidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => (
          <div key={skill.name} className="bg-white/5 rounded-xl p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
              <span className="text-amber font-medium">{skill.level}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-3">
              <div
                className="bg-amber h-3 rounded-full transition-all"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
