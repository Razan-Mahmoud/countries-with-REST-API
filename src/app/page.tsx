import { Country, Region } from "@yusifaliyevpro/countries/types";
import { getCountries, getCountriesByName, getCountriesByRegion } from "@yusifaliyevpro/countries";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import SearchInput from "./(all-countries)/_components/search-input";
import FilterByRegion from "./(all-countries)/_components/filter-by-region";

type CountrySubset = {
  name: Country["name"];
  capital?: Country["capital"];
  flags: Country["flags"];
  population: Country["population"];
  region: Country["region"];
  cca2: Country["cca2"];
};

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

  // Main function
  const countries = await getCountries({
    fields: ["name", "capital", "flags", "population", "region", "cca2"],
  });

  // Search function
  const searchResult = await getCountriesByName({
    name: `${query}`,
    fields: ["name", "capital", "flags", "population", "region", "cca2"],
  });

  // Filter function
  const filteredResults = await getCountriesByRegion({
    region: `${data}`,
    fields: ["name", "capital", "flags", "population", "region", "cca2"],
  });

  // Determine which list to render based on the props
  const isFiltering = !!data;
  const isSearching = query && query.length > 0;

  let countriesToRender = countries;
  // PRIORITY 1: Search is always first
  if (isSearching) {
    countriesToRender = searchResult as CountrySubset[] | null;
  }
  // PRIORITY 2: Filter is applied only if there is NO search query
  else if (isFiltering) {
    countriesToRender = filteredResults as CountrySubset[] | null;
  }
  // PRIORITY 3: Show all countries
  else {
    countriesToRender = countries as CountrySubset[] | null;
  }

  // A reusable component to render the list (improves readability)
  const CountryList = ({ countries }: { countries: CountrySubset[] | null }) => (
    <div className="grid w-full grid-cols-1 gap-12 py-4 lg:grid-cols-4">
      {countries && countries.length > 0 ? (
        countries?.map((country) => (
          <div
            key={country.name.common}
            className="rounded-lg bg-white shadow-sm shadow-zinc-100 dark:bg-slate-600 dark:shadow-none"
          >
            <Link href={`/${country.cca2}`}>
              <div className="w-full">
                <Image
                  src={country.flags.png}
                  alt={country.flags.alt ?? `Flag of ${country.name.common}`}
                  width={300}
                  height={300}
                />
              </div>
              <div className="px-5 py-3">
                <h3 className="pb-2 font-bold">{country.name.official}</h3>
                <p className="font-semibold">
                  Population: <span className="font-normal">{country.population}</span>
                </p>
                <p className="font-semibold">
                  Region: <span className="font-normal">{country.region}</span>
                </p>
                <p className="font-semibold">
                  Capital: <span className="font-normal">{country.capital}</span>
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="col-span-4 text-xl">No countries found for this criteria.</p>
      )}
    </div>
  );
  return (
    <main className="h-auto bg-zinc-100 px-8 py-4 dark:bg-slate-700 dark:text-zinc-200">
      <div className="my-6 flex justify-between">
        <SearchInput />

        <FilterByRegion />
      </div>
      <Suspense fallback={<>Loading...</>}>
        <CountryList countries={countriesToRender} />
      </Suspense>
      {/* <AllCountriesPage query={query} data={data} /> */}
    </main>
  );
}
