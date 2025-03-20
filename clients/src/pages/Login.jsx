import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { loginAPI } from '../services/allAPI'; // Assuming loginAPI is imported properly

const Login = () => {
    const [formData, setFormData] = useState({ phone: "", password: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { phone, password } = formData;

        if (!phone || !password) {
            alert("Please fill the missing fields");
        } else {
            const result = await loginAPI(formData);
            console.log(result);
            if (result.status === 200) {
                sessionStorage.setItem('exisitingUser', JSON.stringify(result.data.exisitingUser));
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('role', result.data.userRole);

                setFormData({ phone: "", password: "" });
                navigate('/quiz');
            } else {
                alert(result.response.data);
                console.log(result);
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="bg-white shadow-lg rounded-lg p-[18px] w-[469px] h-auto space-y-6">
                <div className="flex justify-center my-6">
                    <img
                        src={logo}
                        alt="TSEEP Academy Logo"
                        className="w-24 h-auto"
                        width={200}
                        height={200}
                    />
                </div>

                <h2 className="text-center text-3xl font-semibold text-gray-800">Login</h2>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                            Mobile Number
                        </label>
                        <div className="flex items-center border-2 border-gray-300 rounded-lg mt-2">
                            <select
                                className="w-[93.12px] h-[52.45px] border-r-[1.68px] border-gray-300 rounded-l-[5.35px] 
                                            pt-[12.84px] pr-[6.42px] pb-[12.84px] pl-[6.42px] 
                                            text-gray-600 bg-transparent focus:outline-none">
                                <option>+91</option>
                            </select>

                            <input
                                type="tel"
                                id="phone"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-[332.99px] h-[52.35px] p-2 text-gray-700 focus:outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full h-[52.35px] border-[1.68px] border-gray-300 rounded-[5.35px] p-2 text-gray-700 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full h-[52.35px] bg-[#2A586F] text-white rounded-lg focus:outline-none transition duration-200">
                        Login
                    </button>
                </form>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <a href="#" className="text-teal-600 font-semibold hover:text-teal-700">
                            Register Now
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
