import { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import {  Transition } from "@headlessui/react";
import { MdUpdate } from "react-icons/md";
import { FaHome, FaUser, FaUsers } from "react-icons/fa";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";

const AdminPanel = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div>
      <div className="lg:flex h-screen">
        {/* Sidebar for LG screens */}
        <div className="h-[240px] lg:w-64 lg:flex-shrink-0 bg-slate-200 h-screen md:h-auto">
          <ul className="menu p-4 text-gray-700 font-bold text-lg">
            <li>
              <Link to="admin-overview">
                <HiOutlineHomeModern /> Admin Overview
              </Link>
            </li>
            <li>
              <Link to="expanse">
              <FaUsers /> All Users
              </Link>
            </li>
            <li>
              <Link to="budget-plan">
              <MdUpdate /> Update Users
              </Link>
            </li>

            <li>
              <Link to="../tour-plan">
              <MdAdminPanelSettings /> Admin Control
              </Link>
            </li>

            <div className="border border-gray-400"></div>

            <li>
              <Link to="/">
                <FaHome /> Home
              </Link>
            </li>
            <li>
              <Link to="../dashboard/profile">
                <FaUser /> Profile
              </Link>
            </li>
          </ul>
        </div>

        {/* Content area */}
        <div className="lg:flex-grow">
          {/* Page content here */}
          <Outlet />
        </div>
      </div>

      {/* Mobile navigation */}
      <div className="lg:hidden">
      <button onClick={toggleMobileMenu} className="text-white focus:outline-none">
          Toggle Mobile Menu
        </button>

        <Transition
          show={mobileMenuOpen}
          enter="transition-transform duration-300"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-transform duration-300"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="bg-gray-200 p-4 ">
            {/* 56px is the approximate height of your button or header */}
            <ul className="menu text-gray-700 font-bold text-xl">
              <li>
                <button onClick={() => handleMenuItemClick("/overview")}>
                  Overview
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/expanse")}>
                  Expanse
                </button>
              </li>
              <li>
                <button onClick={() => handleMenuItemClick("/budget-plan")}>
                  Budget Plan
                </button>
              </li>
              {/* ... other menu items ... */}
            </ul>
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default AdminPanel;
