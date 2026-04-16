import { NextResponse } from "next/server";

const isAuth = false;
export const proxy = (request) => {
  // if (!isAuth) {
  //   return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  // }
};

export const config = {
  matcher: [`/products/:path*`],
};
