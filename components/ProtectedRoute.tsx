// components/ProtectedRoute.tsx
"use client"; // Ensure it's a client component

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token"); // Adjust the key as necessary

    if (!token) {
      router.push("/signin"); // Redirect to sign-in page
    }
    else{
        router.push("/tasks")
    }
  }, [router]);
  
  return <>{children}</>; // Render children if token exists
};

export default ProtectedRoute;
