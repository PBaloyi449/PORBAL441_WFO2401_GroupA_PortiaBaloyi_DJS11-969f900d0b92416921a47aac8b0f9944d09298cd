import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = ({ setFilter }) => {
  return (
    <nav className="navbar bg-white p-4 flex justify-between items-center">
      <ul className="list-none flex m-0 p-0">
        <li className="px-4">
          <NavLink to="/" exact className="text-gray-800" activeClassName="font-bold" onClick={() => setFilter('All')}>All</NavLink>
        </li>
        <li className="px-4">
          <NavLink to="/" exact className="text-gray-800" activeClassName="font-bold" onClick={() => setFilter('A-Z')}>A-Z</NavLink>
        </li>
        <li className="px-4">
          <NavLink to="/" exact className="text-gray-800" activeClassName="font-bold" onClick={() => setFilter('Z-A')}>Z-A</NavLink>
        </li>
        <li className="px-4">
          <NavLink to="/" exact className="text-gray-800" activeClassName="font-bold" onClick={() => setFilter('Newest')}>Newest</NavLink>
        </li>
        <li className="px-4">
          <NavLink to="/" exact className="text-gray-800" activeClassName="font-bold" onClick={() => setFilter('Oldest')}>Oldest</NavLink>
        </li>
        <li className="px-4">
          <NavLink to="/" exact className="text-gray-800" activeClassName="font-bold" onClick={() => setFilter('All Genres')}>All Genres</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

