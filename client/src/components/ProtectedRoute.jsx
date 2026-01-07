import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      console.log("protected route reached");
      try {
        const res = await fetch("http://localhost:3000/auth/verify", {
          method: "GET",
          credentials: "include", // important to send cookies
        });

        if (res.ok) {
          console.log("okay response");
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthorized === null) return <p>Loading...</p>;
  if (!isAuthorized) return <Navigate to="/" replace />;

  if (isAuthorized === true) return <Outlet />;
}
