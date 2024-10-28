import ProtectedRoute from "@/components/ProtectedRoute";
import Spinner from "@/components/Spinner";


export default function Home() {
  return (
    <ProtectedRoute>
      <Spinner></Spinner>
    </ProtectedRoute>
  );
}

/* ProtectedRoute is a component to check if user is signed in or not 
*/
