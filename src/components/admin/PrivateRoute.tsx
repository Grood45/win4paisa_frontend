// components/PrivateRoute.tsx
"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/app/redux-arch/adminauth/auth.slice";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux-arch/store";

interface PrivateRouteProps {
  children: React.ReactNode;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useSelector((state: RootState) => state);
  const router = useRouter();

  // Simulate authentication (replace this with your actual authentication logic)
  const isAuthenticated = auth?.combineR?.auth?.token||null

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/signin");
    }
  }, [router, auth]); // Empty dependency array ensures this effect runs once after initial render

  return isAuthenticated ? <>{children}</> : null;
};

export default PrivateRoute;
