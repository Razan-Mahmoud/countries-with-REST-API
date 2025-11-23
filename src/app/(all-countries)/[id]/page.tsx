/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { getCountriesByCodes, getCountryByCode } from "@yusifaliyevpro/countries";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { countryFields } from "@/lib/fields";
import { Button } from "@/lib/components/ui/button";
import BackButton from "./_components/back-button";

type Props = {
  params: {
    id: string;
  };
};
export default async function CountryIdPage({ params }: Props) {
  // Fetch Country Card Info
  const country = await getCountryByCode({ code: `${params?.id}`, fields: countryFields });

  const data = await getCountriesByCodes({
    codes: country?.borders || [],
    fields: countryFields,
  });

  return (
    <div className="m-8 dark:bg-gray-700 dark:text-zinc-300">
      {/* Back button */}
      <BackButton />

      {/* Country Card */}
      <Suspense fallback={<p>Loading...</p>}>
        <div className="flex grid-cols-2 gap-1 md:flex-col lg:flex-row">
          {/* Image */}
          <div className="relative flex w-1/2 items-center justify-center overflow-hidden">
            {country?.flags && (
              <Image
                src={country?.flags.png}
                width={500}
                height={500}
                alt={country.flags.alt ?? `Flag of ${country.name.common}`}
                className="rounded-xl object-cover"
              />
            )}
          </div>

          {/* Country Details */}
          <div className="flex w-1/2 flex-col">
            <div className="flex grid-cols-2 md:flex-col lg:flex-row">
              <div className="grid-cols-1 space-y-3 px-3 md:py-3">
                {/* Country Name */}
                <h2 className="font-bold">{country?.name.common}</h2>
                <p className="font-semibold">
                  Native Name:{" "}
                  <span className="font-normal">
                    {country?.name.nativeName &&
                      (() => {
                        const [code, nativeName] =
                          Object.entries(country?.name.nativeName)[0] || [];
                        return nativeName?.official || "N/A";
                      })()}
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

              <div className="grid-cols-1 space-y-3 px-3 md:py-3">
                {/* TLD */}
                <p className="font-semibold">
                  Top Level Domain: <span className="font-normal">{country?.tld}</span>
                </p>

                {/* Currencis  */}
                <p className="font-semibold">
                  Currencies:{" "}
                  <span className="font-normal">
                    {country?.currencies &&
                      (() => {
                        const [code, currency] = Object.entries(country.currencies)[0] || [];
                        return currency?.name || "N/A";
                      })()}
                  </span>
                </p>

                {/* Lamguages */}
                <p className="font-semibold">
                  Languages:{" "}
                  <span className="font-normal">
                    {country?.languages && Object.values(country.languages).join(", ")}
                  </span>
                </p>
              </div>
            </div>

            {/* Borders */}
            <div className="px-2 md:py-2">
              <p className="font-semibold">
                Border Countries:{" "}
                {country?.borders?.length !== 0 ? (
                  <span className="font-normal">
                    {data?.map((e, i) => (
                      <Button
                        key={i}
                        variant={"link"}
                        className="m-2 rounded-lg px-6 py-2 shadow-md shadow-zinc-500/50 dark:bg-slate-600 dark:shadow-slate-700"
                      >
                        <Link href={`/${e.cca2}`}>{e.name.common}</Link>
                      </Button>
                    ))}
                  </span>
                ) : (
                  <span className="font-normal">No neighboring countries.</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
