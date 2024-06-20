import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
              <NavLink to="/favorites" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('All Favorites')}>All Favorites</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/favorites" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Favorites A-Z')}>A-Z</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/favorites" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Favorites Z-A')}>Z-A</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/favorites" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Newest Favorites')}>Newest</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/favorites" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Oldest Favorites')}>Oldest</NavLink>
            </li>
            <li className="px-4">
              <NavLink to="/favorites" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('Delete All')}>Delete All</NavLink>
            </li>
          </>
        ) : (
          <>
            <li className="px-4">
              <NavLink to="/" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('All')}>All</NavLink>
            </li>
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
            <li className="px-4">
              <NavLink to="/" className="text-gray-800" activeClassName="font-bold" onClick={() => handleFilterChange('All Genres')}>All Genres</NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


