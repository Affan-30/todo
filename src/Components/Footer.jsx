import React from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Left side - Name */}
        <div className="text-lg font-semibold">
          © 2025 <span className="font-bold">affan.dev</span>
        </div>

        {/* Right side - Social Icons */}
        <div className="flex space-x-6 mt-4 md:mt-0 text-2xl">
          {/* GitHub */}
          <a
            href="https://github.com/Affan-30"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <FaGithub />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/affan3006"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <FaLinkedin />
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/_affan30_"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-200 transition"
          >
            <FaInstagram />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
