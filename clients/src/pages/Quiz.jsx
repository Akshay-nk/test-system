// import { useState, useEffect } from "react";
// import { Bookmark, Clock, Menu, X } from "lucide-react";

// const Quiz = () => {
//   const totalQuestions = 10;
//   const [questionIndex, setQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState(null);
//   const [progress, setProgress] = useState(10);
//   const [timeLeft, setTimeLeft] = useState(300);
//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
//   const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

//   const questions = [
//     {
//       question: 'Which of the following words is a synonym for "exhilarating"?',
//       options: ["Exciting", "Boring", "Tiresome", "Frightening", "Confusing"],
//       correct: 0,
//     },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const handleOptionSelect = (index) => {
//     setSelectedOption(index);
//     setAnsweredQuestions((prev) => new Set(prev).add(questionIndex));
//   };

//   const handleNext = () => {
//     if (questionIndex < totalQuestions - 1) {
//       setQuestionIndex(questionIndex + 1);
//       setSelectedOption(null);
//       setProgress(((questionIndex + 2) / totalQuestions) * 100);
//     }
//   };

//   const handlePrevious = () => {
//     if (questionIndex > 0) {
//       setQuestionIndex(questionIndex - 1);
//       setSelectedOption(null);
//       setProgress(((questionIndex) / totalQuestions) * 100);
//     }
//   };

//   const toggleBookmark = () => {
//     setIsBookmarked(!isBookmarked);
//   };

//   return (
//     <div className="relative max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <div className="flex items-center mb-4 relative">
//         <button
//           className="bg-gray-200 p-2 rounded-md shadow-md hover:bg-gray-300"
//           onClick={() => setIsSidePanelOpen(true)}
//         >
//           <Menu size={20} />
//         </button>

//         <div className="flex-grow mx-4 relative flex items-center">
//           <div className="w-full bg-gray-300 h-2 rounded-full relative">
//             <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
//           </div>
//           <div className="absolute right-0 flex items-center space-x-3">
//             <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-md">
//               <Clock size={18} className="text-yellow-500" />
//               <span className="text-sm font-semibold">
//                 {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
//               </span>
//             </div>
//             <span className="text-sm font-semibold">{`${questionIndex + 1}/${totalQuestions}`}</span>
//           </div>
//         </div>
//       </div>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold">{questions[0].question}</h2>
//       </div>

//       <div className="space-y-2">
//         {questions[questionIndex].options.map((option, index) => (
//           <label
//             key={index}
//             className={`flex items-center p-3 border rounded-lg cursor-pointer ${
//               selectedOption === index ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
//             }`}
//           >
//             <input
//               type="radio"
//               name="option"
//               value={index}
//               className="hidden"
//               onChange={() => handleOptionSelect(index)}
//             />
//             <span
//               className={`w-5 h-5 flex justify-center items-center rounded-full border mr-3 ${
//                 selectedOption === index ? "border-green-500" : "border-gray-400"
//               }`}
//             >
//               {selectedOption === index && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
//             </span>
//             {option}
//           </label>
//         ))}
//       </div>

//       <div className="flex justify-between mt-6">
//         <button
//           className={`p-2 rounded-md ${isBookmarked ? "text-yellow-500" : "text-gray-500"}`}
//           onClick={toggleBookmark}
//         >
//           <Bookmark size={22} />
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={questionIndex === totalQuestions - 1}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Quiz;
import { useState, useEffect } from "react";
import { Bookmark, Clock, Menu, X } from "lucide-react";

const Quiz = () => {
  const totalQuestions = 10;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [progress, setProgress] = useState(10);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());

  const questions = [
    {
      question: 'Which of the following words is a synonym for "exhilarating"?',
      options: ["Exciting", "Boring", "Tiresome", "Frightening", "Confusing"],
      correct: 0,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
    setAnsweredQuestions((prev) => new Set(prev).add(questionIndex));
  };

  const handleNext = () => {
    if (questionIndex < totalQuestions - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setProgress(((questionIndex + 2) / totalQuestions) * 100);
    }
  };

  const handlePrevious = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setSelectedOption(null);
      setProgress(((questionIndex) / totalQuestions) * 100);
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="relative max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="flex items-center mb-4 relative">
        <button
          className="bg-gray-200 p-2 rounded-md shadow-md hover:bg-gray-300"
          onClick={() => setIsSidePanelOpen(true)}
        >
          <Menu size={20} />
        </button>

        <div className="flex-grow mx-4 relative flex items-center">
          <div className="w-full bg-gray-300 h-2 rounded-full relative">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="absolute right-0 flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-md">
              <Clock size={18} className="text-yellow-500" />
              <span className="text-sm font-semibold">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </span>
            </div>
            <span className="text-sm font-semibold">{`${questionIndex + 1}/${totalQuestions}`}</span>
          </div>
        </div>
      </div>

      {isSidePanelOpen && (
        <div className="absolute top-0 left-0 w-48 h-full bg-gray-100 shadow-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold">Questions</h3>
            <button onClick={() => setIsSidePanelOpen(false)} className="text-gray-600 hover:text-gray-800">
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {[...Array(totalQuestions)].map((_, index) => {
              let statusClass =
                answeredQuestions.has(index) ? "bg-green-500 text-white" : "bg-gray-200";

              return (
                <button
                  key={index}
                  className={`w-8 h-8 flex items-center justify-center border rounded-md ${statusClass} hover:bg-blue-300`}
                  onClick={() => setQuestionIndex(index)}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-semibold">{questions[0].question}</h2>
      </div>

      <div className="space-y-2">
        {questions[questionIndex].options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-3 border rounded-lg cursor-pointer ${
              selectedOption === index ? "bg-green-100 border-green-500" : "hover:bg-gray-100"
            }`}
          >
            <input
              type="radio"
              name="option"
              value={index}
              className="hidden"
              onChange={() => handleOptionSelect(index)}
            />
            <span
              className={`w-5 h-5 flex justify-center items-center rounded-full border mr-3 ${
                selectedOption === index ? "border-green-500" : "border-gray-400"
              }`}
            >
              {selectedOption === index && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
            </span>
            {option}
          </label>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <button
          className={`p-2 rounded-md ${isBookmarked ? "text-yellow-500" : "text-gray-500"}`}
          onClick={toggleBookmark}
        >
          <Bookmark size={22} />
        </button>

        <button
          onClick={handleNext}
          disabled={questionIndex === totalQuestions - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;