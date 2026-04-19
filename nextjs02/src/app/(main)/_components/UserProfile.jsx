"use client";

import { logout } from "@/app/actions/auth.action";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

export default function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth();
  return (
    <>
      {isLoading ? (
        <span>Loading...</span>
      ) : isAuthenticated ? (
        <>
          <li>Chào: {user.fullName}</li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </>
      ) : (
        <li>
          <Link href={"/auth/login"}>Login</Link>
        </li>
      )}
    </>
  );
  return null;
}
