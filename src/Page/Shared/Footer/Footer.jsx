import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 gap-4">

          {/* Left side of the footer */}
          <div>
            <h2 className="text-2xl font-bold mb-2 uppercase">Bhoromonkari</h2>
            <p className="text-sm">Here you can find all the information you need to make your tour easy. Our resources provide detailed guides and tips for various destinations. We offer personalized recommendations based on your preferences. Plan your trip effortlessly with our comprehensive travel tools.</p>
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
