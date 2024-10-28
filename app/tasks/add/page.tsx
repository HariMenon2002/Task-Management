
'use client'
import React, { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';
import { useRouter } from 'next/navigation';


const AddTask = () => {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to signin if no token is found
      router.push('/signin');
      return; 
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return null; 
  }

  return (
    <div>
      <TaskForm type1="Add Task" />
    </div>
  );
};

export default AddTask;
