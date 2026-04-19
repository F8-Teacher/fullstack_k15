import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { axiosInstance } from "../libs/axios";

export const useAuth = () => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const refetchUser = async () => {
      try {
        const response = await axiosInstance.get("/profile/me");
        const { user } = response.data;
        setUser(user);
        setAuthenticated(true);
      } catch {
        setUser({});
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    refetchUser();
  }, [pathname]);
  return { user, isLoading, isAuthenticated };
};
