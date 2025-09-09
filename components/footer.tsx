
"use client";
import React, { useEffect, useState } from "react";
import { FaLink, FaInstagram, FaDiscord } from "react-icons/fa";


const Footer = () => {
  return (
    <footer className="bg-[#1f1f1f] text-white p-6 text-center">
      <div className="container mx-auto">
        <p className="text-lg font-semibold mb-4">Connect with Us!</p>
        <div className="flex justify-center space-x-4">
          <a
            href="https://www.instagram.com/cnucdm_2029/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition duration-300"
          >
            <FaInstagram className="w-8 h-8" />
          </a>
        </div>
        <p className="text-gray-400 mt-4">
          &copy; 2029 CNUCDM
        </p>
      </div>
    </footer>
  );
};

export default Footer;
