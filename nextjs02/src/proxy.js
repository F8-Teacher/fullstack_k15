import { NextResponse } from "next/server";
import { getCurrentUser } from "./app/actions/auth.action";

export const proxy = async (request) => {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin),
    );
  }
};

export const config = {
  matcher: ["/cart/:path*"],
};
