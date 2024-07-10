import { useState } from "react";
import Swal from "sweetalert2";

const ReviewModal = ({ user, onClose }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const reviewData = {
      rating_number: rating,
      review_comment: comment,
      name: user.name,
      email: user.email,
      image: user.photoUrl,
    };
    console.log(reviewData);

    try {
      const response = await fetch("https://bhromonkari-server.vercel.app/reviews-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Review Submitted',
          text: 'Your review has been successfully submitted!',
          confirmButtonText: 'Ok'
        }).then(() => {
          onClose(); // Close the modal and reload the profile page
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Submission Failed',
          text: 'There was an error submitting your review. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting your review. Please try again.'
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="rating" className="block text-gray-700">
              Rating:
            </label>
            <input
              type="number"
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
