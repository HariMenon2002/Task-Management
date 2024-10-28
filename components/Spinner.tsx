
'use client'
import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="loader"></div>
      <style jsx>{`
        .loader {
          border: 8px solid rgb(0, 60, 216);
          border-left-color: #ffffff; /* Customize color */
          border-radius: 50%;
          width: 60px; /* Size of the spinner */
          height: 60px; /* Size of the spinner */
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spinner;
