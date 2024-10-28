'use client'
import Header from '@/components/Header';
import Spinner from '@/components/Spinner';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const SignIn = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const[loading,setLoading]=useState(false);
  const router=useRouter();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setLoading(true);
    //const router=useRouter();
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store JWT token
      router.push("/tasks"); // Redirect to task list
      
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
  };

  
  return (
    <div className='w-full border-yellow-950 border-2 h-screen flex flex-col items-center bg-inherit'>
      <Header />
      <div className='w-full h-screen border-2 border-blue-700 flex flex-col justify-center items-center'>
        {loading?(<Spinner/>):
        <form onSubmit={handleSubmit} className='border-black rounded-lg border-4 w-11/12 sm:w-3/4 md:w-1/3 h-auto flex flex-col box-border p-6'>
          <p className='text-center font-semibold text-3xl mb-6 text-blue-700'>Sign in</p>

          <div className='flex flex-col items-center'>
            
            <label htmlFor="username" className='self-start mb-2'>Username</label>
            <input type="text" id="username" placeholder='Username' className='w-full h-10 border-2 border-black rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e)=>{setUsername(e.target.value)}}
            />


            <label htmlFor="password" className='self-start mt-4 mb-2'>Password</label>
            <input type="password" id="password" placeholder='Password' className='mt-2 w-full h-10 border-2 border-black rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                onChange={(e)=>{setPassword(e.target.value)}}
            />


            <button type="submit" className='mt-6 w-full h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-600'>
              Sign In
            </button>
            
            <div className='flex flex-row mt-2'>
              <p>New User?&nbsp;</p>
              <Link href={"/signup"} className='text-blue-600'>SignUp</Link>
            </div>

            
            
          </div>
        </form>
        }
      </div>
    </div>
  );
}

export default SignIn;
