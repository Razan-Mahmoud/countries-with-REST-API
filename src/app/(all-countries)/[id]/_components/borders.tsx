import { Alpha_3Code } from "@yusifaliyevpro/countries/types";
import Link from "next/link";
import { restCountries } from "@/lib/countries";
import { Button } from "@/lib/components/ui/button";

type BordersProps = {
  countryBorders: Alpha_3Code[];
};

export default async function Borders({ countryBorders }: BordersProps) {
  // fetch each border country individually
  const borderCountries = await Promise.all(
    countryBorders.map((code) =>
      restCountries.getCountryByCode({
        alpha_3: code,
        fields: ["names", "flag", "codes"],
      }),
    ),
  );

  //   validate results:
  const validBorders = borderCountries
    .filter((result) => result.success)
    .map((result) => result.country);

  return (
    <div className="px-2 sm:py-2">
      {/* Borders  */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-semibold">Border Countries:</span>
        {validBorders.length > 0 ? (
          validBorders.map((borderCountry) => (
            <Button
              key={borderCountry?.codes.alpha_2}
              asChild
              variant="outline"
              className="m-2 h-auto rounded-lg px-4 py-2 font-normal shadow-sm shadow-zinc-500/50 transition-transform hover:scale-105 dark:bg-slate-600 dark:shadow-slate-700"
            >
              <Link href={`/${borderCountry?.codes.alpha_2}`}>{borderCountry?.names.common}</Link>
            </Button>
          ))
        ) : (
          <span className="ml-2 font-normal">No neighboring countries.</span>
        )}
      </div>
    </div>
  );
}
