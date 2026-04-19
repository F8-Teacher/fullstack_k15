"use client";

import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

export default function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth();
  useAuth();
  useAuth();
  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : isAuthenticated ? (
        <>
          <li>Chào: {user.fullName}</li>
          <li>
            <button>Logout</button>
          </li>
        </>
      ) : (
        <li>
          <Link href={"/auth/login"}>Login</Link>
        </li>
      )}
    </>
  );
}
