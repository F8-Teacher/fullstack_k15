import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export const DELETE = async (request) => {
  const { type, value } = await request.json();
  if (type === "path") {
    revalidatePath(value);
  }
  if (type === "tag") {
    revalidateTag(value, {
      expire: 0, //Xóa ngay lập tức
    });
  }
  return NextResponse.json({ success: true });
};

//path
//tag
