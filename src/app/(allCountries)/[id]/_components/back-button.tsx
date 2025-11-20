"use client";

import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/lib/components/ui/button";

export default function BackButton() {
  const router = useRouter();

  function handleClickBack() {
    router.back();
  }
  return (
    <Button
      className="mb-6 flex rounded-lg px-7 py-2 shadow-md shadow-zinc-500/50 dark:bg-slate-600 dark:shadow-slate-700"
      variant={"default"}
      onClick={handleClickBack}
    >
      <MoveLeft size={20} strokeWidth={1.5} />
      <p>Back</p>
    </Button>
  );
}
