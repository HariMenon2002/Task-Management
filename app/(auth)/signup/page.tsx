
'use client'
import Header from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(""); // Reset error state before each submission

    const response = await fetch(`/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      router.push("/signin"); 
    } else {
      const errorData = await response.json();
      setError(errorData.message || "An error occurred. Please try again."); 
    }
  };

  return (
    <div className='w-full border-yellow-950 border-2 h-screen flex flex-col items-center bg-inherit'>
      <Header />
      <div className='w-full h-screen border-2 border-blue-700 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className='border-black rounded-lg border-4 w-11/12 sm:w-3/4 md:w-1/3 h-auto flex flex-col box-border p-6'>
          <p className='text-center font-semibold text-3xl mb-6 text-blue-700'>Sign up</p>

          <div className='flex flex-col items-center'>
            <label htmlFor="username" className='self-start mb-2'>Username</label>
            <input
              type="text"
              id="username"
              placeholder='Username'
              className='w-full h-10 border-2 border-black rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => { setUsername(e.target.value) }}
            />

            <label htmlFor="password" className='self-start mt-4 mb-2'>Password</label>
            <input
              type="password"
              id="password"
              placeholder='Password'
              className='mt-2 w-full h-10 border-2 border-black rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => { setPassword(e.target.value) }}
            />

            {error && <p className='text-red-500 mt-2'>{error}</p>} 

            <button type="submit" className='mt-6 w-full h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-600'>
              Sign Up
            </button>

            <div className='flex flex-row mt-2'>
              <p>Already have an account?&nbsp;</p>
              <Link href={"/signin"} className='text-blue-600'>Sign In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
