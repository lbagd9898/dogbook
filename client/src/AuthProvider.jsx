import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "./components/Loading";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/auth/verify", {
        method: "GET",
        credentials: "include",
      });
      if (res.status === 401 || res.status === 403) return null;
      if (!res.ok) throw new Error("verify_failed");
      const json = await res.json();
      return json.user;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  if (isLoading) return <Loading />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
