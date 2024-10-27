'use client'
import SignOut from '@/components/SignOut'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';



const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`api/tasks`, {
        method:"GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        
    });

    const data = await response.json();
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id:any) => {
    const token = localStorage.getItem('token');
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    fetchTasks();
  };


  return (
    
    <div>
      <SignOut></SignOut>
      <h1>Task List</h1>
      <Link href="/tasks/add">Add New Task</Link>
      <ul>
        {tasks.map((task:any) => (
          <li key={task._id}>
            <Link href={`/tasks/${task._id}`}>{task.title}</Link>
            <button onClick={() => handleDelete(task._id)}> Delete</button>
          </li>
        ))}
      </ul>
      
    </div> 
    
  );
};

export default TaskList;

