// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-6">
      <div className="max-w-7xl mx-auto text-center">
        <p className="font-semibold text-xl">ZenSolve Infotech Solution</p>
        <p className="mt-2">
          At Zensolve Infotech Solution Private Limited, we are dedicated to providing employment in the private sector through training. We also offer business consultancy, IT consultancy, and admission consultancy.
        </p>
        <p className="mt-4">
          <strong>Address:</strong> 2nd floor Bhagalpur Road Godda Near Railway Station
        </p>
        <p>
          <strong>Email:</strong> <a href="mailto:support@infozensolve.in" className="text-blue-400">support@infozensolve.in</a>
        </p>
        <p>
          <strong>Call us:</strong> <a href="tel:02269622941" className="text-blue-400">02269622941</a>
        </p>
        <p className="mt-4">
          Copyright © 2024 by Zensolve Infotech Solution Private Limited. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
