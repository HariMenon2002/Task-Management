"use client";
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Clear the JWT token
    router.push('/signin'); // Redirect to the login page
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
}