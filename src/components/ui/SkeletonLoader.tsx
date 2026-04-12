interface SkeletonLoaderProps {
  className?: string
}

export function SkeletonLoader({ className = '' }: SkeletonLoaderProps) {
  return (
    <div className={`animate-pulse bg-dark-brown/20 dark:bg-white/10 rounded ${className}`} />
  )
}
