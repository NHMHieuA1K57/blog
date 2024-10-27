import React from "react";

const LoadingSpinner = ({ size = 7, color = "text-indigo-500", text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <svg
        className={`animate-spin h-${size} w-${size} ${color} mb-3`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="text-gray-600 text-sm font-medium">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
