import Image from "next/image";
import Link from "next/link";
import { getCountriesByCodes, getCountryByCode } from "@yusifaliyevpro/countries";
import { countryFields } from "@/lib/fields";
import { Button } from "@/lib/components/ui/button";

export default async function CountryContent({ id }: { id: string }) {
  const country = await getCountryByCode({ code: id, fields: countryFields });
  const data = await getCountriesByCodes({
    codes: country?.borders || [],
    fields: countryFields,
  });

  return (
    <div className="flex grid-cols-2 flex-col gap-5 md:flex-row md:gap-2">
      {/* Image */}
      <div className="relative flex w-full overflow-hidden md:w-1/2">
        {country?.flags && (
          <Image
            src={country?.flags.png}
            width={500}
            height={500}
            alt={country.flags.alt ?? `Flag of ${country.name.common}`}
            className="rounded-lg object-cover"
          />
        )}
      </div>

      {/* Country Details */}
      <div className="flex w-full flex-col gap-2 md:w-1/2">
        <div className="grid grid-cols-2 gap-4 sm:flex-col md:flex-row">
          {/* First Column */}
          <div className="col-span-2 space-y-3 px-3 sm:py-3 md:col-span-1">
            {/* Native Name */}
            <h2 className="font-bold">{country?.name.common}</h2>

            <p className="font-semibold">
              Native Name:{" "}
              <span className="font-normal">
                {(country?.name.nativeName &&
                  Object.values(country.name.nativeName)[0]?.official) ||
                  "N/A"}
              </span>
            </p>

            {/* Population */}
            <p className="font-semibold">
              Population: <span className="font-normal">{country?.population}</span>
            </p>

            {/* Region */}
            <p className="font-semibold">
              Region: <span className="font-normal">{country?.region}</span>
            </p>

            {/* Sub Region */}
            <p className="font-semibold">
              Sub Region: <span className="font-normal">{country?.subregion}</span>
            </p>

            {/* Country's Capital */}
            <p className="font-semibold">
              Capital: <span className="font-normal">{country?.capital}</span>
            </p>
          </div>

          {/* Second column */}
          <div className="col-span-2 space-y-3 px-3 sm:py-3 md:col-span-1">
            {/* TLD */}
            <p className="font-semibold">
              Top Level Domain: <span className="font-normal">{country?.tld}</span>
            </p>

            {/* Currencis  */}
            <p className="font-semibold">
              Currencies:{" "}
              <span className="font-normal">
                {(country?.currencies && Object.values(country.currencies)[0]?.name) || "N/A"}
              </span>
            </p>

            {/* Languages */}
            <p className="font-semibold">
              Languages:{" "}
              <span className="font-normal">
                {country?.languages && Object.values(country.languages).join(", ")}
              </span>
            </p>
          </div>
        </div>

        {/* Borders  */}
        <div className="px-2 sm:py-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold">Border Countries:</span>
            {data && data.length > 0 ? (
              data.map((borderCountry) => (
                <Button
                  key={borderCountry.cca2}
                  asChild
                  variant="outline"
                  className="m-2 h-auto rounded-lg px-4 py-2 font-normal shadow-sm shadow-zinc-500/50 transition-transform hover:scale-105 dark:bg-slate-600 dark:shadow-slate-700"
                >
                  <Link href={`/${borderCountry.cca2}`}>{borderCountry.name.common}</Link>
                </Button>
              ))
            ) : (
              <span className="ml-2 font-normal">No neighboring countries.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
