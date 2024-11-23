import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation(); // Get the current location

  const navItems = [
    { name: 'Stuff', to: '/', matchRoutes: ['/', '/stuff'] },
    { name: 'Games', to: '/games', matchRoutes: ['/games'] },
    { name: 'Other', to: '/other', matchRoutes: ['/other'] },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 m bg-orange-100 rounded-2xl shadow-lg">
      <div className="flex flex-row text-base xsm:text-xl relative">
        {/* Highlight animation */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-orange-600 rounded-2xl transition-all duration-300"
          style={{
            transform: `translateX(${navItems.findIndex(item => item.matchRoutes.includes(location.pathname)) * 100}%)`,
            width: `${100 / navItems.length}%`,
          }}
        />
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className={`z-10 w-16 xsm:w-28 py-1 rounded-2xl text-center transition-colors duration-300 ${
              item.matchRoutes.includes(location.pathname) ? 'text-white' : 'text-orange-950'
            }`}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
