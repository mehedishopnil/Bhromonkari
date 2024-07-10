import React, { useState, useEffect, useRef } from "react";
import "tailwindcss/tailwind.css";

const Reviews = ({ reviewsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const reviewsToShow = showAll ? reviewsData : reviewsData.slice(0, 10);

  const containerRef = useRef(null);
  const [startX, setStartX] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 2) % reviewsToShow.length);
    }, 10000); // Change slide every 10 seconds
    return () => clearInterval(interval);
  }, [reviewsToShow.length]);

  const handleTouchStart = (event) => {
    setStartX(event.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (event) => {
    if (!isDragging) return;
    const currentX = event.touches[0].clientX;
    const diff = startX - currentX;
    if (diff > 5) {
      nextSlide();
    } else if (diff < -5) {
      prevSlide();
    }
    setIsDragging(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 2) % reviewsToShow.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviewsToShow.length - 2 : prevIndex - 2
    );
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating - fullStars >= 0.5; // Check for half star

    return (
      <>
        {[...Array(fullStars)].map((_, index) => (
          <svg
            key={index}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current text-yellow-400"
          >
            <path d="M12 1l2.4 7.4H22l-6.1 4.6L17.6 23 12 19.5 6.4 23l1.7-5.1L2 8.4h7.6L12 1z" />
          </svg>
        ))}
        {hasHalfStar && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-current text-yellow-400"
          >
            <path d="M12 1l2.4 7.4H22l-6.1 4.6L17.6 23 12 19.5V1z" />
          </svg>
        )}
      </>
    );
  };

  return (
    <div className="container bg-slate-100 mx-auto py-10">
      <h1 className="text-center text-3xl font-semibold mb-7">
        Our Satisfied Tourist's reviews
      </h1>
      <div
        ref={containerRef}
        className="carousel w-full flex justify-center"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsDragging(false)}
      >
        <div className="flex flex-wrap justify-center -mx-4">
          {reviewsToShow.slice(currentIndex, currentIndex + 2).map((review) => (
            <div
              key={review.id}
              className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8 transition-transform duration-300 ease-in-out"
            >
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
                    {renderStars(review.rating_number)}
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
        <div className="relative mt-4">
          <button
            className="absolute left-[18%]  btn bg-transparent text-gray-600 border-gray-400 border-[2px] hover:bg-gray-200"
            onClick={() => setShowAll(true)}
          >
            Show All Reviews
          </button>
        </div>
      )}
      {/* Navigation Indicators */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: Math.ceil(reviewsToShow.length / 2) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 2)}
              className={`w-4 h-4 rounded-full bg-gray-300 ${
                index * 2 === currentIndex ? "bg-gray-500" : ""
              }`}
            ></button>
          )
        )}
      </div>
    </div>
  );
};

export default Reviews;
