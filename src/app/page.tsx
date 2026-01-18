import { Region } from "@yusifaliyevpro/countries/types";
import { Suspense } from "react";
import SearchInput from "./(all-countries)/_components/search-input";
import FilterByRegion from "./(all-countries)/_components/filter-by-region";
import { AllCountriesSkeleton } from "./components/common/all-countries-skeleton";
import CountryDataFetcher from "./(all-countries)/_components/all-countries-data-fetcher";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    data?: Region;
    page?: string;
  };
}) {
  return (
    <main className="h-auto bg-zinc-100 px-8 py-4 dark:bg-slate-700 dark:text-zinc-200">
      <div className="my-6 flex flex-col gap-5 md:flex-row md:justify-between">
        <SearchInput />

        <FilterByRegion />
      </div>

      <Suspense fallback={<AllCountriesSkeleton />}>
        <CountryDataFetcher searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
