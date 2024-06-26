import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa'; // Import icons from react-icons library

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* Section 1: Logo and description */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold mb-2 uppercase">Bhoromonkari</h2>
            <p className="text-sm">Here you can find all the information you need to make your tour easy. Our resources provide detailed guides and tips for various destinations. We offer personalized recommendations based on your preferences. Plan your trip effortlessly with our comprehensive travel tools.</p>
          </div>

          {/* Section 2: Navigation links */}
          <div className="md:col-span-1">
            <div className="mb-4">
              <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
              <ul>
                <li><a href="/about-us" className="text-gray-300 hover:text-white">About Us</a></li>
                <li><a href="/contact-us" className="text-gray-300 hover:text-white">Contact Us</a></li>
                <li><a href="/terms-and-conditions" className="text-gray-300 hover:text-white">Terms and Conditions</a></li>
                <li><a href="/help" className="text-gray-300 hover:text-white">Help</a></li>
                {/* Add more navigation links as needed */}
              </ul>
            </div>
          </div>

          {/* Section 3: Social media icons */}
          <div className="md:col-span-1">
            <div>
              <h3 className="text-sm font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><FaFacebook /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><FaInstagram /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><FaLinkedin /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white"><FaYoutube /></a>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Copyright notice section */}
      <div className="bg-gray-700 mt-5 py-2 rounded">
        <p className="text-sm text-center">&copy; 2024 All rights reserved by Author</p>
      </div>
    </footer>
  );
};

export default Footer;
