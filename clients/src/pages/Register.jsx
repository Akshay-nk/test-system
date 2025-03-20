import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { registerAPI } from '../services/allAPI';

const Register = () => {
    
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        photo: "",
        status: "",
        phone: ""
    });
    const navigate = useNavigate();
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const { name, email, password, status, phone } = formData;

        if (!name || !email || !password || !status || !phone) {
            alert("Please fill the missing fields");
        } else {
            const result = await registerAPI(formData);
            console.log(result);
            if (result.status === 200) {
                alert(`${result.data.name} has registered successfully`);
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    status: "",
                    phone: ""
                });
                navigate('/login');
            } else {
               
                console.log(result);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-white">
            <div className="flex justify-start p-6">
                <img
                    src={logo}
                    alt="TSEEP Academy Logo"
                    className="w-24 h-auto"
                    width={200}
                    height={200}
                />
            </div>

            <div className="flex items-center justify-center flex-grow">
                <div className="bg-white shadow-lg rounded-lg p-[40px] w-[1005px] h-auto space-y-10 border-[1.68px] border-gray-300">
                    <h2 className="text-center text-3xl font-semibold text-gray-800 relative after:content-[''] after:absolute after:w-16 after:h-1 after:bg-yellow-500 after:bottom-[-6px] after:left-1/2 after:-translate-x-1/2">
                        Register
                    </h2>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div className="space-y-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-600">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full h-[52.35px] border-[1.68px] border-gray-300 rounded-[5.35px] p-2 text-gray-700 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full h-[52.35px] border-[1.68px] border-gray-300 rounded-[5.35px] p-2 text-gray-700 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-600">Phone Number</label>
                            <input
                                type="tel"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Enter your phone number"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                                className="w-full h-[52.35px] border-[1.68px] border-gray-300 rounded-[5.35px] p-2 text-gray-700 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-600">Current Status</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input type="radio" name="status" value="Student" checked={formData.status === 'Student'} onChange={handleInputChange} className="mr-2" /> Student
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="status" value="Employee" checked={formData.status === 'Employee'} onChange={handleInputChange} className="mr-2" /> Employee
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full h-[52.35px] border-[1.68px] border-gray-300 rounded-[5.35px] p-2 text-gray-700 focus:outline-none"
                            />
                        </div>

                        <div className="space-y-4">
                            <button
                                type="submit"
                                className="w-full h-[52.35px] bg-[#2A586F] text-white rounded-lg focus:outline-none transition duration-200">
                                Save
                            </button>
                        </div>
                    </form>

                    <div className="text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <a href="#" className="text-teal-600 font-semibold hover:text-teal-700">
                                Login Now
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
