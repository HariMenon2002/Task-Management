'use client'
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

type Task = {
    title: string;
    description: string;
    completed: boolean;
};
  

const TaskInfo = () => {
  const [task, setTask] = useState<Task | null>(null);
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`../../api/tasks/${id}`, {
          method: "GET",
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

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center p-5 bg-black min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">{task.title}</h1>
        <p className="text-gray-600 mb-4">{task.description}</p>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-md text-sm font-semibold ${task.completed ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
            {task.completed ? 'Completed' : 'Not Completed'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
