import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserService from './../service/UserService';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill out the fields!');
            return;
        }

        if (!validateEmail(email)) {
            toast.error('Invalid email!');
            return;
        }

        try {
            await UserService.login(email, password);
            toast.success('Login success!');
            setTimeout(() => {
                navigate('/sidebar');
            }, 3000);
        } catch (error) {
            if (error.response && error.response.status === 422) {
                const errors = error.response.data.errors;
                Object.keys(errors).forEach((field) => {
                    toast.error(`${field}: ${errors[field][0]}`);
                });
            } else {
                toast.error('Something went wrong!');
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-full max-w-lg overflow-hidden bg-white shadow-2xl rounded-xl">
                <div className="p-8 sm:p-12">
                    <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-800">Login_Admin</h2>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                        </div>

                        <div>
                        <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 mt-4 transition duration-300 ease-in-out delay-150 bg-blue-500 bg-gradient-to-r hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                        >
                            Login
                        </button>
                    </form>

                    
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}

export default Login;
