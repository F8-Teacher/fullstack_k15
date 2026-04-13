"use client";

import { useRouter } from "next/navigation";

export default function Button() {
  const router = useRouter();
  return (
    <div>
      <button onClick={() => router.push("/contact")}>Detail</button>
    </div>
  );
}
