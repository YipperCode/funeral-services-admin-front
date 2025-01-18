import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold"><Link to="/Dashboard">Funeral Services Admin</Link></h1>
        <nav className="flex space-x-4">
          {['users', 'locations', 'plans', 'sales'].map((item) => (
            <NavLink
              key={item}
              to={`/${item}`}
              className={({ isActive }) =>
                isActive
                  ? 'text-gray-200 border-b-2 border-red-500 pb-1'
                  : 'text-gray-400 hover:text-white'
              }
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
