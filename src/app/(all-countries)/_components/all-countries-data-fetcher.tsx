import { getCountries, getCountriesByName, getCountriesByRegion } from "@yusifaliyevpro/countries";
import { Country, Region } from "@yusifaliyevpro/countries/types";
import Image from "next/image";
import Link from "next/link";

// Types
type CountrySubset = {
  name: Country["name"];
  capital?: Country["capital"];
  flags: Country["flags"];
  population: Country["population"];
  region: Country["region"];
  cca2: Country["cca2"];
};

export default async function CountryDataFetcher({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    data?: string;
    page?: string;
  };
}) {
  // Variables
  const query = searchParams?.query || "";
  const data = searchParams?.data ?? "";

  // main fetch function to avoid creating a waterfall
  const [all, search, filtered] = await Promise.all([
    getCountries({ fields: ["name", "capital", "flags", "population", "region", "cca2"] }),

    query
      ? getCountriesByName({
          name: query,
          fields: ["name", "capital", "flags", "population", "region", "cca2"],
        })
      : Promise.resolve([]),

    data && data !== "all"
      ? getCountriesByRegion({
          region: data as Region,
          fields: ["name", "capital", "flags", "population", "region", "cca2"],
        })
      : Promise.resolve([]),
  ]);

  // Variable and if statement to see whether to show the search, filter or main fetch results
  let countriesToRender: CountrySubset[] | null = null;

  if (query) {
    countriesToRender = search as CountrySubset[];
  } else if (data && data !== "all") {
    countriesToRender = filtered as CountrySubset[];
  } else {
    countriesToRender = all as CountrySubset[];
  }

  // Main HTML for all countries, search and filter results
  const CountryList = ({ countries }: { countries: CountrySubset[] | null }) => (
    <div className="grid w-full grid-cols-1 gap-12 py-4 md:grid-cols-4">
      {countries && countries.length > 0 ? (
        countries?.map((country) => (
          // List of all countries
          <div
            key={country.name.common}
            className="rounded-lg bg-white shadow-sm shadow-zinc-100 dark:bg-slate-600 dark:shadow-none"
          >
            {/* Link to id/specific country page */}
            <Link href={`/${country.cca2}`}>
              {/*  Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={country.flags.png}
                  alt={country.flags.alt ?? `Flag of ${country.name.common}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="rounded-lg object-cover"
                />
              </div>

              {/* Country details */}
              <div className="px-5 py-3">
                {/* Country official name */}
                <h3 className="pb-2 font-bold">{country.name.official}</h3>

                {/* Population */}
                <p className="font-semibold">
                  Population:{" "}
                  <span className="font-normal">{country.population.toLocaleString()}</span>
                </p>

                {/* Region */}
                <p className="font-semibold">
                  Region: <span className="font-normal">{country.region}</span>
                </p>

                {/* Capital */}
                <p className="font-semibold">
                  Capital: <span className="font-normal">{country.capital}</span>
                </p>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="col-span-4 text-xl">No countries found for this input.</p>
      )}
    </div>
  );
  return <CountryList countries={countriesToRender} />;
}
