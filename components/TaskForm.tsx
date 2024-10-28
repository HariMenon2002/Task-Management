
'use client'
import Header from '@/components/Header';
import { useRouter, useParams } from 'next/navigation';
import React, { useState } from 'react';

const TaskForm = ({ type1 }: { type1: string }) => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    const token = localStorage.getItem('token');
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/api/tasks/${id}` : '/api/tasks';

    await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, completed, id }), 
    });

    setLoading(false); // Reset loading state after submission
    router.push('/tasks');
  };

  //spinner for loading
  const LoadingSpinner = ({ size = 24 }) => {
    return (
      <div
        className="animate-spin rounded-full border-4 border-t-4 border-t-blue-600 border-gray-300"
        style={{ width: size, height: size }}
      />
    );
  };

  return (
    <div className='w-full border-yellow-950 border-2 h-screen flex flex-col items-center bg-black'>
      <Header />
      <div className='w-full h-screen border-2 border-blue-700 flex flex-col justify-center items-center'>
        <form onSubmit={handleSubmit} className='border-black rounded-lg border-4 w-11/12 sm:w-3/4 md:w-1/3 h-auto flex flex-col box-border p-6 bg-white'>
          <p className='text-center font-semibold text-3xl mb-6 text-blue-700'>{type1}</p>

          <div className='flex flex-col items-center'>
            <label htmlFor="title" className='self-start mb-2'>Title</label>
            <input
              type="text"
              id="title"
              placeholder='Title'
              className='w-full h-10 border-2 border-black rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => { setTitle(e.target.value); }}
            />

            <label htmlFor="description" className='self-start mt-4 mb-2'>Description</label>
            <input
              type="text"
              id="description"
              placeholder='About the Task'
              className='mt-2 w-full h-10 border-2 border-black rounded-lg pl-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              onChange={(e) => { setDescription(e.target.value); }}
            />

            <div className='flex flex-row'>
              <label htmlFor="complete" className='self-start mt-4 mb-2 mr-2'>Completed</label>
              <input
                type="checkbox"
                id="complete"
                className='mt-4 mb-2'
                onChange={(e) => { setCompleted(e.target.checked); }}
              />
            </div>

            <button type="submit" className='mt-6 w-full h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center'>
              {loading ? ( // Show loading spinner while loading
                <>
                  <LoadingSpinner size={24} />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;
