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
    <div className='bg-gray-800 text-white p-4'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center'>
          <h2 className='text-2xl font-bold'>BHROMONKARI</h2>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex md:items-center md:space-x-10'>
          <NavLink to='/' label='Home' isActive={isActive} />
          <NavLink to='/tour-plan' label='Tour Plan' isActive={isActive} />
          <NavLink to='/bookings' label='Bookings' isActive={isActive} />
          <NavLink to='/dashboard' label='Dashboard' isActive={isActive} />
        </div>

        {/* Login and Registration */}
        <div className='hidden md:flex md:justify-end md:items-center gap-5'>
          <Link><button>Login</button></Link>
          <Link><button>Registration</button></Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className='md:hidden'>
          <button onClick={toggleMobileMenu} className='text-white focus:outline-none'>
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className='md:hidden mt-4'>
          <ul className='space-y-4'>
            <li><NavLink to='/' label='Home' isActive={isActive} onClick={closeMobileMenu} /></li>
            <li><NavLink to='/tour-plan' label='Tour Plan' isActive={isActive} onClick={closeMobileMenu} /></li>
            <li><NavLink to='/bookings' label='Bookings' isActive={isActive} onClick={closeMobileMenu} /></li>
            <li><NavLink to='/dashboard' label='Dashboard' isActive={isActive} onClick={closeMobileMenu} /></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;
