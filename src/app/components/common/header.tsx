import Link from "next/link";
import { ThemeToggleButton } from "./dark-theme-button";

export default function Header() {
  return (
    <div className="sticky h-20 w-full bg-white py-5 pb-4 shadow-md shadow-zinc-100 dark:bg-slate-600 dark:shadow-none">
      {/* logo/website title */}
      <div className="flex justify-between gap-4 px-8 md:px-14">
        <h1 className="py-2 text-xl font-bold dark:text-zinc-200">
          <Link href="/">Where in the world?</Link>
        </h1>
        <ThemeToggleButton />
      </div>
    </div>
  );
}
