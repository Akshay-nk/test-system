

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { loginAPI } from '../services/allAPI';

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
            if (result.status === 200) {
                sessionStorage.setItem('exisitingUser', JSON.stringify(result.data.exisitingUser));
                sessionStorage.setItem('token', result.data.token);
                sessionStorage.setItem('role', result.data.userRole);

                setFormData({ phone: "", password: "" });
                navigate('/quiz');
            } else {
                alert(result.response.data);
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: '400px' }}>
                <div className="text-center">
                    <img src={logo} alt="TSEEP Academy Logo" className="img-fluid mb-3" style={{ width: '100px' }} />
                    <h2 className="fw-bold text-secondary">Login</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Mobile Number</label>
                        <div className="input-group">
                            <span className="input-group-text">+91</span>
                            <input
                                type="tel"
                                id="phone"
                                className="form-control"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>
                    <button type="submit" className="btn btn-secondary w-100">Login</button>
                </form>
                <div className="text-center mt-3">
                    <p className="text-secondary">Don't have an account? <a href="/register" className="text-dark fw-bold">Register Now</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
