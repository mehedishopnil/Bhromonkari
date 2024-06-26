import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const Reviews = ({ reviewsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const reviewsToShow = showAll ? reviewsData : reviewsData.slice(0, 10);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % reviewsToShow.length);
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval);
  }, [reviewsToShow.length]);

  return (
    <div className="container bg-slate-100 mx-auto py-10">
      <h1 className="text-center text-3xl font-semibold mb-7">Our Satisfied Tourist's reviews</h1>
      <div className="carousel w-full flex justify-center">
        <div className="flex flex-wrap justify-center -mx-4">
          {reviewsToShow.slice(currentIndex, currentIndex + 2).map((review) => (
            <div key={review.id} className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
              <div className="card bg-base-100 shadow-xl flex flex-col items-center">
                <figure className="pt-4">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="rounded-lg h-40 w-40 object-cover"
                  />
                </figure>
                <div className="card-body items-center text-center p-4">
                  <h2 className="card-title text-lg font-bold">
                    {review.name}
                  </h2>
                  <div className="rating rating-sm mb-2">
                    {[...Array(5)].map((star, index) => (
                      <input
                        key={index}
                        type="radio"
                        name={`rating-${review.id}`}
                        className="mask mask-star-2 bg-orange-400"
                        checked={index < review.rating}
                        readOnly
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">
                    {review.review_comment}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!showAll && reviewsData.length > 10 && (
        <div className="text-center mt-4">
          <button className="btn btn-primary" onClick={() => setShowAll(true)}>
            Show All Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
