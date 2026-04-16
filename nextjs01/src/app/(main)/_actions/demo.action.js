"use server";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

//Kích hoạt server action cho cả file
export const handleClick = async (value) => {
  //   console.log("ok chưa?");
  //   console.log(value);
  const cookieStore = await cookies();
  cookieStore.delete("token");
  try {
    redirect("/contact"); //throw NEXT_REDIRECT
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    //Lỗi khác
  }
};
