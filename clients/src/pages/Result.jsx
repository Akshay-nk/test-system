

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Feedback from './Feedback';
import 'bootstrap/dist/css/bootstrap.min.css';

function Result() {
    const location = useLocation();
    const navigate = useNavigate();
    const totalScore = location.state?.totalScore || 0;

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow-lg text-center p-4" style={{ maxWidth: '1000px', width: '100%' }}>
                <h2 className="text-success fw-bold">Quiz Completed!</h2>
                <p className="fs-4 text-dark">Your Total Score: <span className="fw-bold text-primary">{totalScore}</span></p>
                
                <Feedback />

                <button 
                    className="btn btn-dark mt-3 w-100" 
                    onClick={() => navigate('/')}
                >
                    Go Home
                </button>
            </div>
        </div>
    );
}

export default Result;
