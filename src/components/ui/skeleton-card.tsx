
import { cn } from "@/lib/utils";

interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SkeletonCard({ className, ...props }: SkeletonCardProps) {
  return (
    <div
      className={cn("rounded-lg border bg-card p-4", className)}
      {...props}
    >
      <div className="flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-muted animate-pulse-subtle" />
        <div className="space-y-2 flex-1">
          <div className="h-4 w-[60%] bg-muted rounded animate-pulse-subtle" />
          <div className="h-4 w-[80%] bg-muted rounded animate-pulse-subtle" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 bg-muted rounded animate-pulse-subtle" />
          <div className="h-4 w-12 bg-muted rounded animate-pulse-subtle" />
        </div>
      </div>
    </div>
  );
}
