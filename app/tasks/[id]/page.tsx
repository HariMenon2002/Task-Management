// 'use client'
// import React, { useEffect, useState } from 'react';
// import TaskForm from '@/components/TaskForm';
// import { useRouter,useParams } from 'next/navigation';

// const TaskDetails = () => {
//   const [task, setTask] = useState(null);
//   const router = useRouter();
//   const { id } = useParams();
//   console.log(id);
//   useEffect(() => {
//     if (id) {
//       const fetchTask = async () => {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`../api/tasks/${id}`, {
//             method:"GET",
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${token}`,
//             },
            
//         });
//         const data = await response.json();
        
//         setTask(data);
//       };
//       fetchTask();
//     }
//   }, [id]); 

//   const handleSave = () => {
//     router.push('/tasks');
//   };

//   return (
//     <div>
    
//       {task && <TaskForm type1="Modify Task"/>}
//     </div>
//   );
// };

// export default TaskDetails;

// 'use client'
// import React, { useEffect, useState } from 'react';
// import TaskForm from '@/components/TaskForm';
// import { useRouter, useParams } from 'next/navigation';

// const TaskDetails = () => {
//   const [task, setTask] = useState(null);
//   const router = useRouter();
//   const { id } = useParams();

//   useEffect(() => {
//     const fetchTask = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         // Redirect to login if no token is found
//         router.push('/login');
//         return;
//       }

//       const response = await fetch(`../api/tasks/${id}`, {
//         method: "GET",
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
//       setTask(data);
//     };

//     if (id) {
//       fetchTask();
//     }
//   }, [id, router]);

//   const handleSave = () => {
//     router.push('/tasks');
//   };

//   return (
//     <div>
//       {task ? <TaskForm type1="Modify Task" /> : <p>Loading...</p>}
//     </div>
//   );
// };

// export default TaskDetails;

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
      return; // Exit early
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
    return null; // Don't render if unauthorized
  }

  const handleSave = () => {
    router.push('/tasks');
  };

  return (
    <div>
      {task ? <TaskForm type1="Modify Task" /> : <Spinner></Spinner>}
    </div>
  );
};

export default TaskDetails;
