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
      if (!res.ok) return null;
      const json = await res.json();
      return json.user;
    },
  });

  if (isLoading) return <Loading />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
