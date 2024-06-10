import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { BACKEND_HOST, BACKEND_PORT } from '../consts';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://${BACKEND_HOST}:${BACKEND_PORT}/api/user/login`, { "email": email, "password": password });
      // Assuming your API responds with a token upon successful login
      const token = response.data.token;
      // Save the token to local storage or session storage
      document.cookie = `token=${token}; path=/`;
      // Reset form fields
      setEmail('');
      setPassword('');
      // Navigate to tasks page after successful login
      navigate('/tasks');
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl mb-4 text-center font-semibold text-gray-800">Login</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 mr-2"
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => navigate('/signup')}
          className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition duration-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Login;
