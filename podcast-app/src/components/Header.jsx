import React from 'react';
import '../index.css'; // Ensure you import your CSS here as well

const Header = () => {
  return (
    <div className="header bg-black text-white p-0 flex justify-between items-center">
      <img src='../assets/logo dark.png' alt='logo' className='h-32 w-32' />
      <input type="text" className="border border-gray-800 p-2 mr-2 rounded-lg" placeholder="Search 🔍" />
    </div>
  );
};

export default Header;
