import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/tourPlaceData.json');
        // Filter data based on the category
        const filteredData = response.data.filter(item => item.category.toLowerCase() === category.toLowerCase());
        setCategoryData(filteredData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-center text-2xl font-bold py-5 uppercase">The Beautiful Place of <span className="text-[#e0a352] uppercase">{category}</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categoryData.map((item) => (
          <div key={item.id} className="border p-4 rounded-md mb-4">
            <img src={item.image} alt={item.name} className="w-full h-[300px] mb-2" />
            <h3 className="text-xl font-bold mb-2">{item.name}</h3>
            <p className="mb-2">Location: {item.location}</p>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
