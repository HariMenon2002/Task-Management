
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); 

    if (!token) {
      router.push("/signin"); // Reroute to sign-in page
    }
    else{
        router.push("/tasks")
    }
  }, [router]);
  
  return <>{children}</>; //children if token exists
};

export default ProtectedRoute;
