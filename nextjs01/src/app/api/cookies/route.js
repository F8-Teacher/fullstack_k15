import { cookies } from "next/headers";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  const { name, value } = await request.json();
  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    httpOnly: true,
    maxAge: 3600,
  });
  return NextResponse.json({ success: true });
};
