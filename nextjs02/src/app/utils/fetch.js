import "server-only";
import { getAccessToken } from "../actions/auth.action";
import { CONFIG } from "../constants/config.constant";
export const fetchWrapper = async (url, options = {}) => {
  url = `${CONFIG.BASE_API}${url}`;
  const accessToken = await getAccessToken();
  const allHeaders = new Headers(options.headers || {});
  if (accessToken) {
    allHeaders.set("Authorization", `Bearer ${accessToken}`);
  }
  return fetch(url, {
    ...options,
    headers: allHeaders,
  });
};
