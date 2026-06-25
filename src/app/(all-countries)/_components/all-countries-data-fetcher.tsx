import Image from "next/image";
import Link from "next/link";
import { CountryPicker, Region } from "@yusifaliyevpro/countries/types";
import { RestCountries } from "@yusifaliyevpro/countries";
import { notFound } from "next/navigation";
import globePic from "@/assets/globe.jpg";
import { shuffleArray } from "@/lib/utils/shuffle";

// Types
type CountrySubset = CountryPicker<["names", "capitals", "flag", "population", "region", "codes"]>;

export default async function CountryDataFetcher({
  searchParams,
}: {
  searchParams?: {
    searchQuery?: string;
    filterData?: string;
    page?: string;
  };
}) {
  // main function with API key
  const restCountries = new RestCountries({ apiKey: process.env.REST_COUNTRIES_API_KEY! });

  // Variables
  const searchResult = searchParams?.searchQuery || "";
  const filterdData = searchParams?.filterData ?? "";

  // one single function in order not to create a waterfall
  const [all, search, filter] = await Promise.all([
    // 1- fetch all countries
    restCountries.getCountries({
      fields: ["names", "capitals", "flag", "population", "region", "codes"],
      filters: { classification: { sovereign: true, un_member: true } },
    }),

    searchResult
      ? // 2- search - skip if no search query
        restCountries.getCountriesByName({
          name: searchResult,
          fields: ["names", "capitals", "flag", "population", "region", "codes"],
        })
      : Promise.resolve(null),

    // 3- filter by region

    filterdData && filterdData !== "all"
      ? restCountries.getCountriesByRegion({
          region: filterdData as Region,
          fields: ["names", "capitals", "flag", "population", "region", "codes"],
        })
      : Promise.resolve(null),
  ]);

  // handle error on the main fetch
  if (!all.success) {
    return notFound();
  }

  // variable and chain if statements to see what to show: search, filter or all results.

  let countriesToRender: CountrySubset[] | null = null;
  // shuffleArray(all.countries).slice(0, 16);
  if (search) {
    countriesToRender = search.countries as CountrySubset[];
  } else if (filter && filterdData !== "all") {
    countriesToRender = filter.countries as CountrySubset[];
  } else {
    //   shuffle to get different results each hit
    countriesToRender = shuffleArray(all.countries).slice(0, 16);
  }

  // Main HTML for all countries, search and filter results
  const CountryList = ({ countries }: { countries: CountrySubset[] | null }) => (
    <div className="grid w-full grid-cols-1 gap-12 py-4 md:grid-cols-4">
      {countries && countries.length > 0 ? (
        countries?.map((country) => (
          // List of all countries
          <div
            key={country.names.common}
            className="rounded-lg bg-white shadow-sm shadow-zinc-100 dark:bg-slate-600 dark:shadow-none"
          >
            {/* Link to id/specific country page */}
            <Link href={`/${country.codes.alpha_2}`}>
              {/*  Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={country.flag.url_png || globePic}
                  alt={country.flag.description ?? `Flag of ${country.names.common}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="rounded-lg object-cover"
                  priority
                />
              </div>

              {/* Country details */}
              <div className="px-5 py-3">
                {/* Country official name */}
                <h3 className="pb-2 font-bold">{country.names.official}</h3>

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
                  Capital:{" "}
                  <span className="font-normal">
                    {country.capitals.map((caiptal) => {
                      return <span key={caiptal.name}>{caiptal.name}</span>;
                    })}
                  </span>
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
