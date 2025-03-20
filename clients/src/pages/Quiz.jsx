


import { useState, useEffect } from 'react';
import { getAllQuestionsAPI } from '../services/allAPI';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); 

  const navigate = useNavigate();

  const getAllQuestions = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      };
      const result = await getAllQuestionsAPI(reqHeader);
      if (result.status === 200) {
        const shuffledQuestions = result.data.sort(() => Math.random() - 0.5).slice(0, 10);
        setQuestions(shuffledQuestions);
      } else {
        console.log(result);
      }
    }
  };

  useEffect(() => {
    getAllQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit();
    }
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleAnswer = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    setAnswers({ ...answers, [currentQuestion]: option });
    if (isCorrect) {
      setScore((prevScore) => prevScore + 3);
    }
  };

  const goToQuestion = (index) => setCurrentQuestion(index);

  const handleSubmit = () => {
    const totalScore = Object.keys(answers).reduce((total, key) => {
      const selectedAnswer = answers[key];
      const correctAnswer = questions[key].answer;
      return total + (selectedAnswer === correctAnswer ? 3 : 0);
    }, 0);

    navigate('/result', { state: { totalScore } });
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  return (
    <div className="container-fluid bg-light min-vh-100 p-4">
      {/* Sidebar Toggle Button */}
      <button
        className="btn btn-dark position-fixed top-3 start-3 z-3"
        style={{ zIndex: 1000 }}
        onClick={() => setIsSidebarOpen(true)}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`position-fixed top-0 start-0 h-100 bg-white shadow-lg p-3 overflow-auto ${
          isSidebarOpen ? 'w-25' : 'w-0'
        }`}
        style={{
          transition: 'width 0.3s ease-in-out',
          overflow: isSidebarOpen ? 'auto' : 'hidden'
        }}
      >
        {isSidebarOpen && (
          <>
            <div className="d-flex justify-content-between align-items-center bg-secondary text-white p-3">
              <h5 className="m-0">Quiz Navigation</h5>
              <button className="btn btn-light" onClick={() => setIsSidebarOpen(false)}>
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-3">
              <div className="row g-2">
                {questions.map((q, index) => (
                  <button
                    key={index}
                    className={`col-2 btn ${answers[index] ? 'btn-success' : 'btn-outline-secondary'}`}
                    onClick={() => {
                      goToQuestion(index);
                      setIsSidebarOpen(false);
                    }}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Main Content */}
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {questions.length > 0 && (
              <div className="card shadow-lg p-4">
                {/* Timer and Question Count */}
                <div className="d-flex justify-content-between mb-3">
                  <h5 className="text-muted">{`Question ${currentQuestion + 1} / ${questions.length}`}</h5>
                  <h5 className="text-danger">Time Left: {formatTime(timeLeft)}</h5>
                </div>

                {/* Question */}
                <h3 className="text-dark text-center mb-4">
                  {questions[currentQuestion].question}
                </h3>

                {/* Options */}
                <div className="list-group">
                  {questions[currentQuestion].options.map((option) => (
                    <label key={option} className="list-group-item d-flex align-items-center">
                      <input
                        type="radio"
                        className="form-check-input me-2"
                        name={`question-${currentQuestion}`}
                        checked={answers[currentQuestion] === option}
                        onChange={() => handleAnswer(option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                className="btn btn-outline-dark"
                onClick={() => goToQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
              >
                Previous
              </button>
              {currentQuestion === questions.length - 1 ? (
                <button className="btn btn-success" onClick={handleSubmit}>
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-dark"
                  onClick={() => goToQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
