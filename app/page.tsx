import ProtectedRoute from "@/components/ProtectedRoute";
import SignOut from "@/components/SignOut";
import Image from "next/image";

export default function Home() {
  return (
    <ProtectedRoute>
      hi guys
      <SignOut></SignOut>
    </ProtectedRoute>
  );
}
