import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavLink from "./NavLink";

const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className='grid grid-cols-6 items-center bg-gray-800 text-white p-4'>
      <div className='flex col-span-1 items-center'>
        <h2 className='text-2xl font-bold'>BHROMONKARI</h2>
      </div>

      {/* Mobile Hamburger Menu */}
      <div className='col-span-1 flex justify-end items-center md:hidden'>
        <button onClick={toggleMobileMenu} className='text-white focus:outline-none'>
          <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
          </svg>
        </button>
      </div>

      {/* Regular Navigation */}
      <div className={`col-span-4 md:col-span-3 flex justify-center space-x-4 ${mobileMenuOpen ? 'hidden' : 'block'}`}>
        <NavLink to='/' label='Home' isActive={isActive} onClick={closeMobileMenu} />
        <NavLink to='/tour-plan' label='Tour Plan' isActive={isActive} onClick={closeMobileMenu} />
        <NavLink to='/bookings' label='Bookings' isActive={isActive} onClick={closeMobileMenu} />
        <NavLink to='/dashboard' label='Dashboard' isActive={isActive} onClick={closeMobileMenu} />
      </div>

      {/* Mobile Menu Items */}
      {mobileMenuOpen && (
        <div className='col-span-6 md:hidden'>
          <NavLink to='/' label='Home' isActive={isActive} onClick={closeMobileMenu} />
          <NavLink to='/tour-plan' label='Tour Plan' isActive={isActive} onClick={closeMobileMenu} />
          <NavLink to='/bookings' label='Bookings' isActive={isActive} onClick={closeMobileMenu} />
          <NavLink to='/dashboard' label='Dashboard' isActive={isActive} onClick={closeMobileMenu} />
        </div>
      )}

      <div className='col-span-2 flex justify-end items-center gap-5'>
        {/* Add your login and registration components here */}
        <Link><button>Login</button></Link>
        <Link><button>Registration</button></Link>
      </div>
    </div>
  );
};

export default Header;
