import React, { useState } from "react";
import logo from "../assets/livco logo.png";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-blue-900 text-white">
      <div className="flex items-center justify-between px-6 py-0">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="w-16 h-20 mt-4" />
          
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-sm items-center">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Get App</a>
          <a href="#" className="hover:underline">List Property</a>
          <button className="bg-yellow-400 text-black px-4 py-1 rounded-full font-medium">Log In</button>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-yellow-400 text-2xl"
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start px-6 py-4 bg-blue-800 space-y-4 text-sm">
          <a href="#" className="hover:underline w-full">Home</a>
          <a href="#" className="hover:underline w-full">Get App</a>
          <a href="#" className="hover:underline w-full">List Property</a>
          <button className="bg-yellow-400 text-black px-4 py-1 rounded-full font-medium w-full">
            Log In
          </button>
        </div>
      )}
    </header>
  );
}
