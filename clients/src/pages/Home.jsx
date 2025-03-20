import React from 'react';
import logo from '../assets/logo.png'
import { useNavigate } from 'react-router';
const WelcomePage = () => {
    
    const navigate=useNavigate()
    const started=()=>{
        navigate('/login')
    }
    return (
        <div className=" bg-white flex items-center justify-center">
            <div className="w-full max-w-4xl p-8  shadow-lg rounded-xl">
                {/* Logo Section */}
                <div className="flex items-center space-x-3 mb-6">
                    <img src={logo} alt="TSEEP Academy" className="w-[255.51px] h-[100.45px] mt-[26px] ml-[7px]" />

                </div>

                {/* Welcome Text */}
                <div className='w-[1128px] h-[135.46px] mt-[322px] ml-[92px]'>
                    <h1 className=' fw-600'>
                        Welcome to <span className="text-yellow-500">TSEEP Mastery Box</span>
                    </h1>
                    <p className="text-gray-500 text-lg ">
                        Unlock your potential with <span className="font-bold">AI inspired tool</span>
                    </p>
                </div>

                {/* Checkbox and Button Section */}
                <div className="mt-6">
                    <label className="flex items-center space-x-2 text-gray-600">
                        <input type="checkbox" className="form-checkbox" />
                        <span>
                            I confirm that I have read and accept the terms and conditions
                            and privacy policy.
                        </span>
                    </label>

                    <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700" onClick={started}>
                        Get Started
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
