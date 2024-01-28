import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">

          {/* Left side of the footer */}
          <div>
            <h2 className="text-2xl font-bold mb-2">Footer Title</h2>
            <p className="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero in dui sollicitudin, et commodo odio venenatis.</p>
          </div>

          {/* Right side of the footer */}
          <div className="text-right">
            {/* Additional sections */}
            <div className="mb-4">
              <p className="text-sm">Some other information</p>
            </div>
          </div>

        </div>
      </div>
      <div>
        {/* Copyright notice section */}
        <div className="bg-gray-700 mt-5 py-2 rounded">
              <p className="text-sm text-center">&copy; 2024 All the rights reserved by Author</p>
            </div>
      </div>
    </footer>
  );
};

export default Footer;
