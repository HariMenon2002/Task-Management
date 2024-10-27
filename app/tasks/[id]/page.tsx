'use client'
import React, { useEffect, useState } from 'react';
import TaskForm from '@/components/TaskForm';
import { useRouter,useParams } from 'next/navigation';

const TaskDetails = () => {
  const [task, setTask] = useState(null);
  const router = useRouter();
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`../api/tasks/${id}`, {
            method:"GET",
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            
        });
        const data = await response.json();
        
        setTask(data);
      };
      fetchTask();
    }
  }, [id]); 

  const handleSave = () => {
    router.push('/tasks');
  };

  return (
    <div>
    
      {task && <TaskForm type1="Modify Task"/>}
    </div>
  );
};

export default TaskDetails;
