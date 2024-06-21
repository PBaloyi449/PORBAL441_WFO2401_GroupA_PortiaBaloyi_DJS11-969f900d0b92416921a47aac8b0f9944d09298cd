import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`bg-gray-200 w-48 min-h-screen relative ${isOpen ? 'block' : 'hidden'}`}>
      {/* Close button when sidebar is open */}
      {isOpen && (
        <button 
          className="absolute top-0 right-0 m-4 text-gray-600"
          onClick={toggleSidebar}
        >
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      
      {/* Sidebar content */}
      <ul className="p-4 mt-12"> {/* Add mt-12 to add margin-top */}
        <li className="mb-2">
          <Link to="/" className="text-blue-500 hover:underline" onClick={toggleSidebar}>Dashboard</Link>
        </li>
        <li className="mb-2">
          <Link to="/favorites" className="text-blue-500 hover:underline" onClick={toggleSidebar}>Favorites</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;












