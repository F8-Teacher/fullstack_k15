"use server";

import { CONFIG } from "@/app/constants/config.constant";
import { cookies } from "next/headers";
import { cache } from "react";
import { fetchWrapper } from "../utils/fetch";
import { redirect } from "next/navigation";

export const loginAction = async (prevState, formData) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const response = await fetch(`${CONFIG.BASE_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    return {
      success: false,
      message: "Email hoặc mật khẩu không đúng",
    };
  }
  const { accessToken, refreshToken } = await response.json();
  //Save token
  const cookieStore = await cookies();
  cookieStore.set("accessToken", accessToken, {
    httpOnly: true,
    maxAge: 3600,
  });
  cookieStore.set("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 86400,
  });
  return {
    message: "Login success",
    success: true,
  };
};

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return false;
  }
  const response = await fetch(`${CONFIG.BASE_API}/profile/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!response.ok) {
    return false;
  }
  const { user } = await response.json();
  return user;
});

export const makeRefreshToken = async () => {
  console.log("makeRefreshToken");
  const refreshToken = await getRefreshToken();
  if (!refreshToken) {
    return false;
  }
  const response = await fetch(`${CONFIG.BASE_API}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    return false;
  }
  const data = await response.json();
  //Save token
  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    maxAge: 3600,
  });
  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    maxAge: 86400,
  });
  return {
    accessToken: data.accessToken,
    refreshToken: data.refreshToken,
  };
};

export const getAccessToken = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  return accessToken;
};
export const getRefreshToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  return refreshToken;
};

export const logout = async () => {
  fetchWrapper("/auth/logout");
  const cookieStore = await cookies();
  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  redirect("/auth/login");
};
