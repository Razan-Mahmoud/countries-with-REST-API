import { AllCountriesSkeleton } from "./components/common/all-countries-skeleton";

export default function Loading() {
  return (
    <main className="container mx-auto p-6">
      <div className="mb-8 flex justify-between">
        <div className="h-12 w-full max-w-lg animate-pulse rounded-xl bg-zinc-200" />
        <div className="h-12 w-[200px] animate-pulse rounded-xl bg-zinc-200" />
      </div>

      <AllCountriesSkeleton />
    </main>
  );
}
