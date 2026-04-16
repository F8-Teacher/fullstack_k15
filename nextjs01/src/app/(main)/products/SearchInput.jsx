"use client";

import { useRouter } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  return (
    <input
      type="search"
      className="px-3 py-1 outline-0 border border-[#ccc] w-full"
      onChange={(e) => router.push(`?q=${e.target.value}`)}
    />
  );
}
