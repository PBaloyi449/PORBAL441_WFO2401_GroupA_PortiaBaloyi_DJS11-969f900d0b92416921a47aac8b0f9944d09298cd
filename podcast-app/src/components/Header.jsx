import React, { useState } from 'react';
import '../index.css'; // Ensure you import your CSS here as well

const Header = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Pass the search query to the parent component via props
    onSearch(query);
  };

  return (
    <div className="header bg-black text-black p-0 flex justify-between items-center">
      <img src='../assets/logo dark.png' alt='logo' className='h-32 w-32' />
      <input
        type="text"
        className="border border-gray-800 p-2 mr-2 rounded-lg"
        placeholder="Search 🔍"
        value={searchQuery}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Header;

