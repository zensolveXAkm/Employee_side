// src/pages/Dashboard.js
import React, { useState } from 'react';
import { useUser } from './user'; // Update path as needed
import { useNavigate } from 'react-router-dom';
import { databases, ID } from '../AppwriteConfig';
import Footer from './Footer';
import Navbar from './Navbar';
import { FaSignOutAlt, FaCheckCircle, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const { current, logout } = useUser();
  const [workDetails, setWorkDetails] = useState('');
  const [status, setStatus] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [timeSpent, setTimeSpent] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [progress, setProgress] = useState('');
  const [issues, setIssues] = useState('');
  const [achievements, setAchievements] = useState('');
  const navigate = useNavigate();

  const handleAttendance = async () => {
    try {
      await databases.createDocument(
        '6730c1950007c16da598',
        'attendance',
        ID.unique(),
        { employeeId: current.email, timestamp: new Date().toISOString() }
      );
      alert('Attendance marked!');
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance.');
    }
  };

  const handleSubmitWork = async () => {
    const progressValue = parseFloat(progress);
    if (isNaN(progressValue)) {
      alert('Please enter a valid number for progress.');
      return;
    }

    try {
      await databases.createDocument(
        '6730c1950007c16da598',
        'workdetailscollection',
        ID.unique(),
        {
          employeeId: current.email,
          date: new Date().toDateString(),
          taskDescription,
          timeSpent,
          priority,
          progress: progressValue,
          issues,
          achievements,
          workDetails
        }
      );
      setStatus('Work details submitted successfully!');
      setTaskDescription('');
      setTimeSpent('');
      setPriority('Medium');
      setProgress('');
      setIssues('');
      setAchievements('');
      setWorkDetails('');
    } catch (error) {
      console.error('Error submitting work details:', error);
      alert('Failed to submit work details.');
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Navbar />
      <h2 className="text-xl font-bold animate-fade-in">Welcome, {current?.name || "User"}!</h2>

      <button 
        onClick={handleAttendance} 
        className="flex items-center bg-blue-500 text-white py-2 px-4 rounded transition duration-300 transform hover:scale-105 hover:bg-blue-600">
        <FaCheckCircle className="mr-2" /> Mark Attendance
      </button>

      <div className="w-full max-w-lg space-y-2">
        {/* Work Details */}
        <label className="block text-gray-700">Work Details</label>
        <textarea
          placeholder="Enter today's work details"
          value={workDetails}
          onChange={(e) => setWorkDetails(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Task Description */}
        <label className="block text-gray-700">Task Description</label>
        <input
          type="text"
          placeholder="Task Description"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Time Spent */}
        <label className="block text-gray-700">Time Spent</label>
        <input
          type="text"
          placeholder="Time Spent (e.g., 2 hours)"
          value={timeSpent}
          onChange={(e) => setTimeSpent(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Priority */}
        <label className="block text-gray-700">Priority</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Progress */}
        <label className="block text-gray-700">Task Progress (%)</label>
        <input
          type="number"
          placeholder="Task Progress (%)"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Issues */}
        <label className="block text-gray-700">Issues Faced</label>
        <textarea
          placeholder="Issues faced during the day"
          value={issues}
          onChange={(e) => setIssues(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        />

        {/* Achievements */}
        <label className="block text-gray-700">Achievements</label>
        <textarea
          placeholder="Achievements of the day"
          value={achievements}
          onChange={(e) => setAchievements(e.target.value)}
          className="border p-2 w-full transition duration-300 hover:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <button 
        onClick={handleSubmitWork} 
        className="flex items-center bg-green-500 text-white py-2 px-4 rounded mt-4 transition duration-300 transform hover:scale-105 hover:bg-green-600">
        <FaClock className="mr-2" /> Submit Work Details
      </button>

      <button 
        onClick={handleLogout} 
        className="flex items-center bg-red-500 text-white py-2 px-4 rounded mt-4 transition duration-300 transform hover:scale-105 hover:bg-red-600">
        <FaSignOutAlt className="mr-2" /> Logout
      </button>

      {status && <p className="text-green-500 font-semibold mt-2">{status}</p>}

      <Footer />
    </div>
  );
};

export default Dashboard;
