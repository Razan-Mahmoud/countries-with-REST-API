import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 px-4 py-16 text-center">
      <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-500 md:text-3xl">
        Not Found!
      </h2>
      <p className="text-xl md:text-2xl">Could not find requested page.</p>
      <button className="rounded-md bg-orange-300 px-2 py-3 text-slate-700 transition-all ease-in-out hover:bg-orange-200 dark:bg-orange-400 dark:text-slate-50 dark:hover:bg-orange-300">
        <Link href="/" className="text-xl">
          Return Home?
        </Link>
      </button>
    </div>
  );
}
