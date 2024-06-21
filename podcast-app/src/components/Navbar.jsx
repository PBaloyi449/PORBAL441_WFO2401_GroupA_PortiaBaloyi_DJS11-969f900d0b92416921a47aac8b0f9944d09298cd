import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { genres } from './genre.js'; // Assuming genres are imported from a file

const Navbar = ({ setFilter }) => {
  const location = useLocation();
  const isFavoritesPage = location.pathname === '/favorites';

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  return (
    <nav className="navbar bg-white p-4 flex justify-between items-center">
      <ul className="list-none flex m-0 p-0">
        {isFavoritesPage ? (
          <>
            <li className="px-4">
              <a href="#" className="text-gray-800" onClick={() => handleFilterChange('Favorites A-Z')}>A-Z</a>
            </li>
            <li className="px-4">
              <a href="#" className="text-gray-800" onClick={() => handleFilterChange('Favorites Z-A')}>Z-A</a>
            </li>
            <li className="px-4">
              <a href="#" className="text-gray-800" onClick={() => handleFilterChange('Newest Favorites')}>Newest</a>
            </li>
            <li className="px-4">
              <a href="#" className="text-gray-800" onClick={() => handleFilterChange('Oldest Favorites')}>Oldest</a>
            </li>
            <li className="px-4">
              <a href="#" className="text-gray-800" onClick={() => handleFilterChange('Delete All')}>Delete All</a>
            </li>
          </>
        ) : (
          <>
            <li className="px-4">
              <NavLink to="/" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('A-Z')}>A-Z</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Z-A')}>Z-A</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Newest')}>Newest</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Oldest')}>Oldest</NavLink>
            </li>
            <li className="relative px-4 group">
              <button className="text-gray-800 focus:outline-none">
                Genres
              </button>
              <ul className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg hidden group-hover:block">
                {Object.keys(genres).map(key => (
                  <li key={key}>
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                      onClick={() => handleFilterChange(genres[key])}
                    >
                      {genres[key]}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


