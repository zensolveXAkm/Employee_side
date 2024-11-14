// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useUser } from './user'; // Adjust the path if needed
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, current } = useUser(); // Get login and current user from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to dashboard if user is already logged in
    if (current) {
      navigate('/dashboard');
    }
  }, [current, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password); // Login the user
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (error) {
      console.error("Login failed:", error.message);
      alert("Invalid credentials or an error occurred during login.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleLogin} className="w-80 p-4 bg-white shadow-md rounded">
        <h2 className="text-center text-xl font-bold">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 my-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 my-2 w-full"
        />
        <button type="submit" className="bg-blue-500 w-full text-white py-2 mt-4">Login</button>
        <p className="text-center mt-2">
          Don’t have an account? <a href="/register" className="text-blue-500">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
