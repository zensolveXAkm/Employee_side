// src/pages/About.js
import React from 'react';
import { FaUsers, FaCheckCircle, FaTasks, FaBriefcase } from 'react-icons/fa';
import Footer from './Footer';
import Navbar from './Navbar';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About Our Platform</h1>
        
        {/* Intro Section */}
        <p className="text-center text-gray-600 max-w-2xl mb-8">
          Welcome to our Employee Management System, a tool designed to simplify daily work tracking, attendance management, and productivity monitoring. Our platform empowers employees and managers with streamlined workflows and insightful data.
        </p>
        
        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
          
          {/* Attendance Management */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaCheckCircle className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Attendance Management</h3>
            <p className="text-gray-600 text-center mt-2">
              Easily mark attendance with a single click, ensuring timely records for all employees.
            </p>
          </div>
          
          {/* Task Tracking */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaTasks className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Task Tracking</h3>
            <p className="text-gray-600 text-center mt-2">
              Log daily work details, track task progress, and stay updated on project timelines.
            </p>
          </div>
          
          {/* Employee Profiles */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaUsers className="text-purple-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Employee Profiles</h3>
            <p className="text-gray-600 text-center mt-2">
              Each employee can personalize their profile, making it easy for managers to know their team.
            </p>
          </div>
          
          {/* Reporting */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaBriefcase className="text-red-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Reporting & Analytics</h3>
            <p className="text-gray-600 text-center mt-2">
              Gain insights into productivity and performance through data and analytics.
            </p>
          </div>
        </div>
        
        {/* Closing Statement */}
        <p className="text-center text-gray-600 max-w-2xl mt-12">
          Our goal is to create a seamless, transparent, and efficient workspace for everyone. We are constantly working to improve and add new features, making sure our platform is a valuable asset for teams of all sizes.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default About;
