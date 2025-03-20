import React, { useState, useEffect } from 'react';
import { addFeedbackAPI } from '../services/allAPI';
import { useNavigate, useLocation } from 'react-router-dom';

function Feedback() {
  const [rating, setRating] = useState(0);
  const [emoji, setEmoji] = useState(''); // NEW: Emoji state
  const [feedbackText, setFeedbackText] = useState('');
  const [token, setToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    setToken(storedToken || '');
  }, []);

  const handleReview = async (e) => {
    e.preventDefault();

    if (!feedbackText || rating === 0) {
      alert('Please fill out all fields.');
      return;
    }

    const reqBody = new FormData();
    reqBody.append('rating', rating);
    reqBody.append('emoji', emoji); // Include emoji
    reqBody.append('feedbackText', feedbackText);
    reqBody.append('doctor', '784962'); // Sample doctor ID for reference

    if (token) {
      const reqHeader = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const result = await addFeedbackAPI(reqBody, reqHeader);
      if (result.status === 200) {
        console.log('Feedback submitted successfully:', result.data);
        alert('Feedback submitted successfully!');
        navigate('/home');
      } else {
        console.log('Error submitting feedback:', result);
        alert('Failed to submit feedback. Try again.');
      }
    }
  };

  const emojiList = ['😡', '😞', '😐', '😊', '😁'];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">TSEEP Academy</h1>
        <h2 className="text-xl font-semibold mb-2">Congratulations! You have Successfully Completed The Test</h2>
        <p className="text-lg font-medium">
          Score : <span className="bg-yellow-400 px-2 py-1 rounded-lg">{location.state?.totalScore}/50</span>
        </p>
        <p className="mt-4 text-lg text-blue-700">Your ID : 784962</p>

        <div className="mt-6 text-left">
          <h3 className="font-bold mb-2">Feedback</h3>
          <p className="text-sm mb-4">Your input is important for us. We take customer feedback very seriously.</p>

          {/* Emoji Rating System */}
          <div className="flex space-x-2 justify-center mb-4">
            {emojiList.map((emojiIcon, index) => (
              <span
                key={index}
                className={`text-3xl cursor-pointer ${
                  rating === index + 1 ? 'text-yellow-500' : 'text-gray-400'
                }`}
                onClick={() => {
                  setRating(index + 1);
                  setEmoji(emojiIcon); // Store emoji in state
                }}
              >
                {emojiIcon}
              </span>
            ))}
          </div>

          <textarea
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Add a comment"
            className="w-full border rounded-md p-2 mb-4"
          ></textarea>

          <button
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
            onClick={handleReview}
          >
            Submit Feedback
          </button>
        </div>

        <button
          className="mt-4 text-sm text-gray-500 hover:text-blue-600"
          onClick={() => navigate('/home')}
        >
          ⬅️ Back to home
        </button>
      </div>
    </div>
  );
}

export default Feedback;
