import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Feedback from './Feedback'

function Result() {
    const location = useLocation();
    const navigate = useNavigate();

    const totalScore = location.state?.totalScore || 0;

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-50 to-green-100 p-6">
            

<Feedback/>                

                <button
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-all"
                    onClick={() => navigate('/')}
                >
                    Go Home
                </button>
            </div>
       
    );
}

export default Result;
