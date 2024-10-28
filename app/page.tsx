import ProtectedRoute from "@/components/ProtectedRoute";
import SignOut from "@/components/SignOut";
import Spinner from "@/components/Spinner";
import Image from "next/image";

export default function Home() {
  return (
    <ProtectedRoute>
      <Spinner></Spinner>
    </ProtectedRoute>
  );
}
