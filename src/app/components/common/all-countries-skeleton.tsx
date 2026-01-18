import { Skeleton } from "@/lib/components/ui/skeleton";

export function AllCountriesSkeleton() {
  return (
    <div className="grid w-full grid-cols-1 gap-12 py-4 md:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="overflow-hidden rounded-lg bg-white p-0 dark:bg-slate-600">
          <Skeleton className="h-[125px] w-[250px] rounded-xl bg-neutral-200 dark:bg-slate-500" />
          <div className="space-y-3 px-5 py-6">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}
