import { Region } from "@yusifaliyevpro/countries/types";
import FilterByRegion from "./(allCountries)/_components/filter-by-region";
import SearchInput from "./(allCountries)/_components/search-input";
import AllCountriesPage from "./(allCountries)/page";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    data?: Region;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const data = searchParams?.data ?? "Africa";

  return (
    <main className="h-auto bg-zinc-100 px-8 py-4 dark:bg-slate-700 dark:text-zinc-200">
      <div className="my-6 flex justify-between">
        <SearchInput />

        <FilterByRegion />
      </div>

      <AllCountriesPage query={query} data={data} />
    </main>
  );
}
