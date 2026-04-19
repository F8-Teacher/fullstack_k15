import { NextResponse } from "next/server";
import { getCurrentUser, makeRefreshToken } from "./app/actions/auth.action";
const protectedUrls = ["/cart"];
const guestUrls = ["/auth/login", "/auth/register"];
export const proxy = async (request) => {
  const { pathname } = request.nextUrl;
  const user = await getCurrentUser();
  const response = NextResponse.next();
  //Check protected
  if (protectedUrls.some((url) => url.includes(pathname))) {
    if (!user) {
      //Refresh token
      const data = await makeRefreshToken();
      console.log(data);
      if (!data) {
        return NextResponse.redirect(
          new URL("/auth/login", request.nextUrl.origin),
        );
      }
      //Save token
      response.cookies.set("accessToken", data.accessToken, {
        httpOnly: true,
        maxAge: 3600,
      });
      response.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 86400,
      });
      //Tự động đính kèm cookie mới vào request header -> phục vụ cho các thành phần đứng sau: layout, page
    }
  }

  //Check guest
  if (guestUrls.includes(pathname) && user) {
    return NextResponse.redirect(new URL("/", request.nextUrl.origin));
  }

  return response;
};

export const config = {
  matcher: ["/cart/:path*", "/auth/:path*"],
};

//proxy -> layout -> page -> repsonse
