"use client";
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear the JWT token
    router.push('/signin'); // Redirect to the login page
  };

  return <button className="bg-[#8349e7] text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors" onClick={handleSignOut}>Sign Out</button>;
}