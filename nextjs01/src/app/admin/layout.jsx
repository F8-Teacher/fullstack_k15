import Link from "next/link";
import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div>
      <header className="flex justify-between items-center max-w-300 mx-auto py-3">
        <span className="text-3xl font-medium">Admin F8</span>
        <ul className="flex gap-3 items-center">
          <li>
            <Link href={"/admin"}>Dashboard</Link>
          </li>
          <li>
            {" "}
            <Link href={"/admin/users"}>Users</Link>
          </li>
        </ul>
      </header>
      <main className="mx-auto max-w-300 py-3">{children}</main>
    </div>
  );
}
