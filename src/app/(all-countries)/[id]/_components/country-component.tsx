import Image from "next/image";
import { notFound } from "next/navigation";
import { restCountries } from "@/lib/countries";
import Borders from "./borders";

export default async function CountryContent({ id }: { id: string }) {
  // Fetch a single country
  const { success, country } = await restCountries.getCountryByCode({
    alpha_2: id,
    fields: [
      "names",
      "capitals",
      "flag",
      "population",
      "region",
      "subregion",
      "tlds",
      "currencies",
      "languages",
      "borders",
    ],
  });

  if (!success) {
    return notFound();
  }

  return (
    <div className="flex grid-cols-2 flex-col gap-5 md:flex-row md:gap-2">
      {/* Image */}
      <div className="relative flex w-full overflow-hidden md:w-1/2">
        {country?.flag && (
          <Image
            src={country?.flag.url_png}
            width={500}
            height={500}
            alt={country.flag.description ?? `Flag of ${country.names.common}`}
            className="rounded-lg object-cover"
            priority
          />
        )}
      </div>

      {/* Country Details */}
      <div className="flex w-full flex-col gap-2 md:w-1/2">
        <div className="grid grid-cols-2 gap-4 sm:flex-col md:flex-row">
          {/* First Column */}
          <div className="col-span-2 space-y-3 px-3 sm:py-3 md:col-span-1">
            {/* Native Name */}
            <h2 className="font-bold">{country?.names.common}</h2>

            <p className="font-semibold">
              Native Name:{" "}
              <span className="font-normal">
                {(country?.names.native && Object.values(country.names.native)[0]?.official) ||
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
              Capital:{" "}
              <span className="font-normal">
                {country?.capitals.map((capital) => capital.name)}
              </span>
            </p>
          </div>

          {/* Second column */}
          <div className="col-span-2 space-y-3 px-3 sm:py-3 md:col-span-1">
            {/* TLD */}
            <p className="font-semibold">
              Top Level Domain: <span className="font-normal">{country?.tlds}</span>
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
                {country?.languages.map((lang) => lang.name).join(", ")}
              </span>
            </p>
          </div>
        </div>

        {/* Borders  */}
        <div className="px-2 sm:py-2">
          <Borders countryBorders={country.borders} />
        </div>
      </div>
    </div>
  );
}
