import { getCountries, getCountriesByName, getCountriesByRegion } from "@yusifaliyevpro/countries";
import { Region } from "@yusifaliyevpro/countries/types";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

export default async function AllCountriesPage({ query, data }: { query: string; data: Region }) {
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
  const filterResults = await getCountriesByRegion({
    region: `${data}`,
    fields: ["name", "capital", "flags", "population", "region", "cca2"],
  });

  return (
    <>
      <Suspense fallback={<>Loading...</>}>
        {filterResults && (
          <div className="grid w-full grid-cols-1 gap-12 py-4 lg:grid-cols-4">
            {filterResults
              ? filterResults.map((country) => (
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
              : ""}
          </div>
        )}
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        {searchResult && (
          <div className="grid w-full grid-cols-1 gap-12 py-4 lg:grid-cols-4">
            {searchResult
              ? searchResult.map((country) => (
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
              : ""}
          </div>
        )}
      </Suspense>
      <div className="grid w-full grid-cols-1 gap-12 py-4 lg:grid-cols-4">
        {countries?.map((country) => (
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
        ))}
      </div>
    </>
  );
}
