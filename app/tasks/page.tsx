// 'use client'
// import SignOut from '@/components/SignOut'
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';



// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   const fetchTasks = async () => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`api/tasks`, {
//         method:"GET",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
        
//     });

//     const data = await response.json();
//     console.log(data);
//     setTasks(data);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, []);

//   const handleDelete = async (id:any) => {
//     const token = localStorage.getItem('token');
//     await fetch(`/api/tasks/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     fetchTasks();
//   };


//   return (
    
//     <div>
//       <SignOut></SignOut>
//       <h1>Task List</h1>
//       <Link href="/tasks/add">Add New Task</Link>
//       <ul>
//         {tasks.map((task:any) => (
//           <li key={task._id}>
//             <Link href={`/tasks/${task._id}`}>{task.title}</Link>
//             <button onClick={() => handleDelete(task._id)}> Delete</button>
//           </li>
//         ))}
//       </ul>
      
//     </div> 
    
//   );
// };

// export default TaskList;

// 'use client'
// import SignOut from '@/components/SignOut';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import Spinner from '@/components/Spinner';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);
//   const router=useRouter();
//   const [isAuthorized, setIsAuthorized] = useState(false);

//   const fetchTasks = async () => {
//     const token = localStorage.getItem('token');
//     const response = await fetch(`api/tasks`, {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });

//     const data = await response.json();
//     console.log(data);
//     setTasks(data);
//   };

//   useEffect(() => {
//     // Check token presence on component mount
//     const token = localStorage.getItem('token');
//     if (!token) {
//       router.push('/signin');
//     } else {
//       setIsAuthorized(true);
//       fetchTasks();
//     }
//   }, []);

//   if (!isAuthorized) {
//     return null; // Don't render if unauthorized
//   }

//   const handleDelete = async (id:any) => {
//     const token = localStorage.getItem('token');
//     await fetch(`/api/tasks/${id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`,
//       },
//     });
//     fetchTasks();
//   };

//   return (
//     <div className="flex flex-col items-center p-5 bg-black min-h-screen">
//       <div className="flex justify-between w-full max-w-2xl items-center mb-5">
//         <h1 className="text-3xl font-semibold text-[#8349e7]">Task List</h1>
//         <SignOut  />
//       </div>
//       <Link href="/tasks/add" className="mb-10 py-2 px-4 text-white bg-[#167c75] rounded-md hover:bg-yellow-600 transition-colors">
//         Add New Task
//       </Link>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
//         {tasks?tasks.map((task:any) => (
//           <div key={task._id} className="bg-[#eff0d1] bg-opacity-5 p-5 rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105">
//             <Link href={`/tasks/${task._id}/info`} className="text-xl font-medium text-[#eeeeab] hover:underline text-center">
//               {task.title}
//             </Link>
//             <div className="flex justify-between items-center mt-3">
//               <button className="bg-[#36a958] text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition-colors" onClick={() => router.push(`/tasks/${task._id}`)}>
//                 Edit
//               </button>
//               <button
//                 className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors"
//                 onClick={() => handleDelete(task._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         )):<></>}
//       </div>
//     </div>
//   );
// };

// export default TaskList;

'use client';
import SignOut from '@/components/SignOut';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loadingId, setLoadingId] = useState<string | null>(null); // Track loading state by task ID

  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`api/tasks`, {
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
    console.log(data);
    setTasks(data);
  };

  useEffect(() => {
    // Check token presence on component mount
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/signin');
    } else {
      setIsAuthorized(true);
      fetchTasks();
    }
  }, []);

  if (!isAuthorized) {
    return null; 
  }

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    setLoadingId(id); // Set loading state for the current task
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    setLoadingId(null); // Reset loading state
    fetchTasks();
  };

  const handleEdit = (id: string) => {
    setLoadingId(id); // Set loading state for the current task
    router.push(`/tasks/${id}`); 
    setLoadingId(null); // Reset loading state 
  };

  // Inline spinner component
  const Spinner = () => (
    <div className="animate-spin inline-block w-5 h-5 border-4 border-t-4 border-t-transparent rounded-full border-blue-500"></div>
  );

  return (
    <div className="flex flex-col items-center p-5 bg-black min-h-screen">
      <div className="flex justify-between w-full max-w-2xl items-center mb-5">
        <h1 className="text-3xl font-semibold text-[#8349e7]">Task List</h1>
        <SignOut />
      </div>
      <Link href="/tasks/add" className="mb-10 py-2 px-4 text-white bg-[#167c75] rounded-md hover:bg-yellow-600 transition-colors">
        Add New Task
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {tasks.length > 0 ? tasks.map((task: any) => (
          <div key={task._id} className="bg-[#eff0d1] bg-opacity-5 p-5 rounded-lg shadow-md border border-gray-200 transition-transform transform hover:scale-105">
            <Link href={`/tasks/${task._id}/info`} className="text-xl font-medium text-[#eeeeab] hover:underline text-center">
              {task.title}
            </Link>
            <div className="flex justify-between items-center mt-3">
              <button
                className="bg-[#36a958] text-white py-1 px-3 rounded-md hover:bg-yellow-500 transition-colors flex items-center"
                onClick={() => handleEdit(task._id)}
                disabled={loadingId === task._id} // Disable while loading
              >
                {loadingId === task._id ? (
                  <Spinner />
                ) : (
                  'Edit'
                )}
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors flex items-center"
                onClick={() => handleDelete(task._id)}
                disabled={loadingId === task._id} // Disable while loading
              >
                {loadingId === task._id ? (
                  <Spinner />
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        )) : <p className="text-white">No tasks available.</p>}
      </div>
    </div>
  );
};

export default TaskList;
