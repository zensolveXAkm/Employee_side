// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account, databases, ID } from '../AppwriteConfig';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Step 1: Create user in Appwrite authentication
      await account.create('unique()', email, password, name, phone);

      // Step 2: Create profile document in profiles collection
      const user = await account.get(); // Get current user data
      await databases.createDocument(
        'YOUR_DATABASE_ID', // Replace with your database ID
        'profiles', // Replace with your profiles collection ID
        ID.unique(), // Generate unique document ID
        {
          userId: user.$id,
          name: name,
          email: email,
          phone: phone
        }
      );

      navigate('/'); // Redirect to login page after successful registration
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleRegister} className="w-80 p-4 bg-white shadow-md rounded">
        <h2 className="text-center text-xl font-bold">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 my-2 w-full"
        />
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
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 my-2 w-full"
        />
        <button type="submit" className="bg-blue-500 w-full text-white py-2 mt-4">Register</button>
        <p className="text-center mt-2">
          Already have an account? <a href="/" className="text-blue-500">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;