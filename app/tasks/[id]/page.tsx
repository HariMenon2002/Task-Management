
'use client'
import React, { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';
import { useRouter, useParams } from 'next/navigation';
import Spinner from '@/components/Spinner';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { id } = useParams();
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

    if (id) {
      const fetchTask = async () => {
        const response = await fetch(`/api/tasks/${id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          alert('Your session has expired. Please log in again.');
          localStorage.removeItem('token'); 
          router.push("/signin");
          return;
        }
        const data = await response.json();
        setTask(data);
      };
      fetchTask();
    }
  }, [id, router]);

  if (!isAuthorized) {
    return null; 
  }


  return (
    <div>
      {task ? <TaskForm type1="Modify Task" /> : <Spinner></Spinner>}
    </div>
  );
};

export default TaskDetails;
