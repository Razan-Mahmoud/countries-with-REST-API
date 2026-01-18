import { Suspense } from "react";
import BackButton from "./_components/back-button";
import CountryContent from "./_components/country-component";

type Props = {
  params: {
    id: string;
  };
};
export default function CountryIdPage({ params }: Props) {
  return (
    <div className="m-8 dark:bg-gray-700 dark:text-zinc-300">
      {/* Back button */}
      <div className="mb-8">
        <BackButton />
      </div>

      {/* Country Card */}
      <Suspense fallback={<CountrySkeleton />}>
        <CountryContent id={params.id} />
      </Suspense>
    </div>
  );
}

function CountrySkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-5 md:flex-row">
      <div className="h-52 w-full rounded-lg bg-zinc-200 dark:bg-zinc-600 md:w-1/2" />
      <div className="flex-1 space-y-4 py-1">
        <div className="h-10 w-1/2 rounded-lg bg-zinc-200 dark:bg-zinc-600" />
        <div className="h-4 w-full rounded-lg bg-zinc-200 dark:bg-zinc-600" />
        <div className="h-4 w-5/6 rounded-lg bg-zinc-200 dark:bg-zinc-600" />
      </div>
    </div>
  );
}
