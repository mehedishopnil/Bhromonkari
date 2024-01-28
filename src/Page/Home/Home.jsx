import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShop, AiOutlineHome, AiOutlineCar, AiOutlineBank, AiOutlineCompass, AiOutlineHeatMap } from 'react-icons/ai';
import { FaMountainCity } from "react-icons/fa6";
import { GiCargoShip } from "react-icons/gi";
import { GiMountedKnight } from "react-icons/gi";
import { GiForest } from "react-icons/gi";
import { LuSchool } from "react-icons/lu";
import bannerImg from '../../assets/Images/banner.jpg';
import { GiFarmTractor } from "react-icons/gi";

const categoryIcons = {
  Dhaka: AiOutlineShop,
  Chattagram: GiCargoShip ,
  Khulna: GiForest ,
  Rajshahi: GiMountedKnight ,
  Sylhet: FaMountainCity,
  Rangpur: GiFarmTractor ,
  Mymensingh: LuSchool,
};

const Home = () => {
  return (
    <div className="relative h-screen">
      {/* Banner with dark overlay */}
      <div className="relative h-full bg-cover bg-center" style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

          {/* Text in the middle of the banner */}
          <div className='space-y-3'>
            <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-center">
              Confused?
            </p>
            <p className="text-4xl md:text-5xl lg:text-6xl text-center text-[#e0a352]">
              Need Guide For Tour?
            </p>
            <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">
              Here We Are!
            </p>
          </div>

          {/* Choose tour place section */}
          <p className="mt-10 text-3xl md:text-4xl lg:text-6xl pb-5"><span className='font-semibold text-[#e0a352]'>Choose</span> tour place</p>

          {/* Slidable category buttons */}
          <div className="flex flex-wrap mt-2 space-x-4 justify-center">
            {['Dhaka', 'Chattagram', 'Khulna', 'Rajshahi', 'Sylhet', 'Rangpur', 'Mymensingh'].map(category => (
              <Link to={`/${category.toLowerCase()}`} key={category}>
                <button className="flex items-center px-8 py-4 bg-white text-black rounded-full hover:text-[#e0a352] mb-2">
                  {/* Use the icon based on the category */}
                  {React.createElement(categoryIcons[category], { size: 24, className: 'mr-2' })}
                  <span>{category}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
