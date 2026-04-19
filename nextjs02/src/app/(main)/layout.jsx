import Link from "next/link";
import { Toaster } from "sonner";
import UserProfile from "./_components/UserProfile";
export default function MainLayout({ children }) {
  return (
    <div>
      <header className="max-w-300 mx-auto py-3 flex justify-between">
        <h1 className="text-3xl font-medium">Logo</h1>
        <ul className="flex items-center gap-3">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/products"}>Products</Link>
          </li>
          <li>
            <Link href={"/cart"}>Cart (0)</Link>
          </li>
          <UserProfile />
        </ul>
      </header>
      <main className="max-w-300 mx-auto py-3">{children}</main>
      <Toaster />
    </div>
  );
}
