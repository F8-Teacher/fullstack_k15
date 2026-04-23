"use client";

import { useSearchParams } from "next/navigation";

export default function Title() {
  const searchParams = useSearchParams();
  return <h1 className="text-3xl mb-3">Posts: {searchParams.get("q")}</h1>;
}
