import Link from "next/link";
import DarkThemeToggle from "./dark-theme-toggle";

export default function Header() {
  return (
    <div className="sticky h-20 w-full bg-blue-300 py-5 shadow-md shadow-zinc-100 dark:bg-slate-600 dark:shadow-none lg:h-16">
      {/* bg-white */}

      <div className="flex justify-between px-14">
        <h1 className="text-xl font-bold dark:text-zinc-200">
          <Link href="/">Where in the world?</Link>
        </h1>
        <DarkThemeToggle />
      </div>
    </div>
  );
}
