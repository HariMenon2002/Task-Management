// /app/components/TaskForm.tsx
"use client";
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';


interface DecodedToken {
  id: string; // Ensure this matches the property holding the user ID in the JWT payload
}

export default function TaskForm() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  
  const router = useRouter();

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const method = id ? 'PUT' : 'POST';
    const endpoint = id ? `/api/tasks/${id}` : '/api/tasks';

    await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ title, description, completed, id }), // Send all necessary fields
    });

    router.push('/tasks');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        Completed
      </label>
      <button type="submit">{id ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
}
