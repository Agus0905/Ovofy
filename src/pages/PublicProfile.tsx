import { useParams } from 'react-router-dom'

export function PublicProfile() {
  const { userId } = useParams()

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0f0e0c] pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-[#1a1814] rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-serif font-bold text-dark-brown dark:text-[#f5f0e8] mb-4">
            Perfil Público {userId}
          </h1>
          <p className="text-dark-brown/80 dark:text-gray-300">
            Perfil público del usuario...
          </p>
        </div>
      </div>
    </div>
  )
}
