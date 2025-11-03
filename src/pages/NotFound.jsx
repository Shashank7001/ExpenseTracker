import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="text-center p-8 rounded-2xl shadow-2xl bg-gray-800/60 backdrop-blur-md max-w-md w-full">
        <h1 className="text-8xl font-extrabold text-red-500 animate-bounce mb-4">
          404
        </h1>
        <p className="text-2xl font-semibold mb-2">Oops! Page Not Found</p>
        <p className="text-gray-400 mb-6">
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 transition-all duration-300 text-white font-medium py-2 px-6 rounded-full shadow-lg hover:shadow-blue-500/50"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
