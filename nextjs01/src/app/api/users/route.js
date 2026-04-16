//Các hàm tương ứng với các HTTP METHOD: GET, POST, PUT, PATCH, DELETE, OPTIONS,...

import { NextResponse } from "next/server";

export const getUsers = (request) => {
  //Response
  const s = request.nextUrl.searchParams.get("s");
  console.log(s);
  const apiKey = request.headers.get("x-api-key");
  console.log(apiKey);

  return NextResponse.json(
    [
      {
        id: 1,
        name: "User 1",
      },
      {
        id: 2,
        name: "User 2",
      },
    ],
    {
      status: 404,
      headers: {
        "x-abc": "123",
      },
    },
  );
};

export const createUser = async (request) => {
  const body = await request.json();
  return NextResponse.json({ body });
};
export const [GET, POST] = [getUsers, createUser];
