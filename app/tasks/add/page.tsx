// import React from 'react';
// import TaskForm from '@/components/TaskForm';

// const AddTask = () => {
//   return (
//     <div>
//       <TaskForm type1="Add Task"/>
//     </div>
//   );
// };

// export default AddTask;


// 'use client'
// import React, { useEffect } from 'react';
// import TaskForm from '@/components/TaskForm';
// import { useRouter } from 'next/navigation';

// const AddTask = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       // Redirect to signin if no token is found
//       router.push('/signin');
//     }
//   }, [router]);

//   return (
//     <div>
//       <TaskForm type1="Add Task" />
//     </div>
//   );
// };

// export default AddTask;


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
      return; // Exit early
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return null; // Don't render if unauthorized
  }

  return (
    <div>
      <TaskForm type1="Add Task" />
    </div>
  );
};

export default AddTask;
