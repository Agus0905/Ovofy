import { cn } from "../../lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-dark-brown/5 dark:bg-white/5",
        className
      )}
      {...props}
    />
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1a1814] rounded-2xl overflow-hidden shadow-md border border-dark-brown/5 dark:border-white/5 p-4 space-y-4">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-8 w-1/3 rounded-lg" />
      </div>
    </div>
  )
}

export function ComparisonSkeleton() {
  return (
    <div className="w-full max-w-5xl bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-12 border border-white/20 dark:border-white/10 shadow-2xl space-y-12">
      <div className="grid grid-cols-3 gap-8 items-end border-b border-dark-brown/10 dark:border-white/10 pb-8">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-8 w-32 mx-auto" />
        <Skeleton className="h-8 w-32 mx-auto" />
      </div>
      <div className="space-y-10">
        {[1, 2, 3].map((i) => (
          <div key={i} className="grid grid-cols-3 gap-8 items-center">
            <div className="flex items-center gap-4">
              <Skeleton className="w-10 h-10 rounded-lg" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-16 w-full rounded-2xl" />
            <Skeleton className="h-16 w-full rounded-2xl" />
          </div>
        ))}
      </div>
    </div>
  )
}
