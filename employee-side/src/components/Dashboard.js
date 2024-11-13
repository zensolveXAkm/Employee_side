// src/pages/Dashboard.js
import React, { useState } from 'react';
import { useUser } from './user'; // Update path as needed
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirect
import { databases, ID } from '../AppwriteConfig'; // Import ID for unique document IDs
import Profile from './Profile';
import Footer from './Footer';
import Navbar from './Navbar';

const Dashboard = () => {
  const { current, logout } = useUser(); // Get user data and logout function from context
  const [workDetails, setWorkDetails] = useState(''); // Work details input state
  const [status, setStatus] = useState(''); // Submission status
  const [taskDescription, setTaskDescription] = useState(''); // Task description
  const [timeSpent, setTimeSpent] = useState(''); // Time spent on tasks
  const [priority, setPriority] = useState('Medium'); // Task priority
  const [progress, setProgress] = useState(''); // Task progress (should be a number)
  const [issues, setIssues] = useState(''); // Issues faced during the day
  const [achievements, setAchievements] = useState(''); // Achievements of the day
  const navigate = useNavigate(); // Hook to navigate to different routes

  // Handle attendance marking
  const handleAttendance = async () => {
    try {
      await databases.createDocument(
        '6730c1950007c16da598', // Replace with your database ID
        'attendance', // Replace with your attendance collection ID
        ID.unique(), // Generate unique document ID
        { employeeId: current.email, timestamp: new Date().toISOString() } // Use email instead of ID
      );
      alert('Attendance marked!');
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance.');
    }
  };

  // Handle work details submission
  const handleSubmitWork = async () => {
    // Convert progress to a float, and check if it's a valid number
    const progressValue = parseFloat(progress);
    if (isNaN(progressValue)) {
      alert('Please enter a valid number for progress.');
      return;
    }

    try {
      await databases.createDocument(
        '6730c1950007c16da598', // Replace with your database ID
        'workdetailscollection', // Replace with your work details collection ID
        ID.unique(),
        {
          employeeId: current.email, // Correct attribute: employeeId
          date: new Date().toDateString(),
          taskDescription: taskDescription,
          timeSpent: timeSpent,
          priority: priority,
          progress: progressValue, // Ensure this is a valid float
          issues: issues,
          achievements: achievements,
          workDetails: workDetails, // Ensure this matches the field name in Appwrite schema
        }
      );
      setStatus('Work details submitted successfully!');
      // Reset the form fields after submission
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

  // Handle user logout
  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from context
      navigate('/'); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <Navbar />
      <Profile />
      {/* Welcome Message */}
      <h2 className="text-xl font-bold">Welcome, {current?.name || "User"}!</h2>

      {/* Mark Attendance Button */}
      <button onClick={handleAttendance} className="bg-blue-500 text-white py-2 px-4 rounded">
        Mark Attendance
      </button>

      {/* Textarea for work details */}
      <textarea
        placeholder="Enter today's work details"
        value={workDetails}
        onChange={(e) => setWorkDetails(e.target.value)}
        className="border p-2 w-full max-w-lg"
      />

      {/* Task Description */}
      <input
        type="text"
        placeholder="Task Description"
        value={taskDescription}
        onChange={(e) => setTaskDescription(e.target.value)}
        className="border p-2 w-full max-w-lg mt-2"
      />

      {/* Time Spent on Task */}
      <input
        type="text"
        placeholder="Time Spent (e.g., 2 hours)"
        value={timeSpent}
        onChange={(e) => setTimeSpent(e.target.value)}
        className="border p-2 w-full max-w-lg mt-2"
      />

      {/* Task Priority */}
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        className="border p-2 w-full max-w-lg mt-2"
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* Task Progress */}
      <input
        type="number"
        placeholder="Task Progress (%)"
        value={progress}
        onChange={(e) => setProgress(e.target.value)}
        className="border p-2 w-full max-w-lg mt-2"
      />

      {/* Issues Faced */}
      <textarea
        placeholder="Issues faced during the day"
        value={issues}
        onChange={(e) => setIssues(e.target.value)}
        className="border p-2 w-full max-w-lg mt-2"
      />

      {/* Achievements */}
      <textarea
        placeholder="Achievements of the day"
        value={achievements}
        onChange={(e) => setAchievements(e.target.value)}
        className="border p-2 w-full max-w-lg mt-2"
      />

      {/* Submit Work Details Button */}
      <button onClick={handleSubmitWork} className="bg-green-500 text-white py-2 px-4 rounded mt-4">
        Submit Work Details
      </button>

      {/* Logout Button */}
      <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
        Logout
      </button>

      {status && <p>{status}</p>}

      <Footer />
    </div>
  );
};

export default Dashboard;
