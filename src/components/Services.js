// src/pages/Services.js
import React from 'react';
import { FaUserCheck, FaClipboardList, FaChartLine, FaHeadset } from 'react-icons/fa';
import Footer from './Footer';
import Navbar from './Navbar';

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Our Services</h1>
        
        {/* Introduction */}
        <p className="text-center text-gray-600 max-w-2xl mb-8">
          We provide a comprehensive suite of services designed to enhance productivity, streamline management, and improve team performance. Explore our services to see how we can support your organization’s goals.
        </p>
        
        {/* Services Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
          
          {/* Attendance Tracking */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaUserCheck className="text-blue-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Attendance Tracking</h3>
            <p className="text-gray-600 text-center mt-2">
              Reliable attendance monitoring to ensure timely records and manage workforce attendance effectively.
            </p>
          </div>
          
          {/* Task Management */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaClipboardList className="text-green-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Task Management</h3>
            <p className="text-gray-600 text-center mt-2">
              Efficiently assign, track, and prioritize tasks to maintain project timelines and keep teams aligned.
            </p>
          </div>
          
          {/* Performance Analytics */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaChartLine className="text-purple-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Performance Analytics</h3>
            <p className="text-gray-600 text-center mt-2">
              Analyze productivity and performance data to make informed decisions and optimize workflows.
            </p>
          </div>
          
          {/* Customer Support */}
          <div className="flex flex-col items-center bg-white shadow-lg rounded-lg p-6 transition duration-300 transform hover:scale-105">
            <FaHeadset className="text-red-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Customer Support</h3>
            <p className="text-gray-600 text-center mt-2">
              Dedicated support services to assist with setup, troubleshooting, and continuous guidance.
            </p>
          </div>
        </div>

        {/* Closing Statement */}
        <p className="text-center text-gray-600 max-w-2xl mt-12">
          Our services are tailored to support organizations in achieving a high-performance culture, ensuring your team’s productivity and satisfaction.
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Services;
