import Link from "next/link";
import DarkThemeToggle from "./dark-theme-toggle";

export default function Header() {
  return (
    <div className="sticky h-20 w-full bg-white py-5 pb-4 shadow-md shadow-zinc-100 dark:bg-slate-600 dark:shadow-none lg:h-16">
      {/* logo/website title */}
      <div className="flex justify-between px-10 lg:px-14">
        <h1 className="text-xl font-bold dark:text-zinc-200">
          <Link href="/">Where in the world?</Link>
        </h1>
        <DarkThemeToggle />
      </div>
    </div>
  );
}
