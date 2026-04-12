interface TimedLoadingProps {
  message?: string
}

export function TimedLoading({ message = 'Cargando...' }: TimedLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber mb-4" />
      <p className="text-dark-brown/80 dark:text-gray-300">{message}</p>
    </div>
  )
}
