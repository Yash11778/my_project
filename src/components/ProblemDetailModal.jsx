import React from "react";
import { Link } from "react-router-dom";

const ProblemDetailModal = () => {
  return (
    <div className="mt-8 flex justify-center gap-4">
      <a
        href="#"
        className="bg-gradient-to-r from-color-1 to-color-2 hover:from-color-1/90 hover:to-color-2/90 text-white font-medium py-3 px-6 rounded-full transition-colors"
      >
        Register & Choose This Problem
      </a>

      <Link
        to="/"
        className="border border-n-1/10 bg-n-8/50 hover:bg-n-7 text-n-1 font-medium py-3 px-6 rounded-full transition-colors flex items-center gap-2"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Back to Home
      </Link>
    </div>
  );
};

export default ProblemDetailModal;