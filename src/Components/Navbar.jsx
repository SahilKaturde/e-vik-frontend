// src/Components/Navbar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="w-full bg-[#212529] text-white shadow-md">
      <div className="flex items-center justify-between px-6 h-[10vh]">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider">eVik</div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 text-gray-300 text-sm">
          <li>
            <Link to="/" className="hover:text-white transition">Home</Link>
          </li>
          <li>
            <Link to="/how-it-works" className="hover:text-white transition">How it works</Link>
          </li>
          <li>
            <Link to="/add-e-waste" className="hover:text-white transition">Add E-Waste</Link>
          </li>

          <li>
            <Link to='/leaderboard' className="hover:text-white transition" >leaderboard</Link>
          </li>
        </ul>

        {/* Settings Icon (hidden on small screens) */}
        <div className="hidden md:block">
          <Link to="/settings" className="text-gray-400 hover:text-white transition">
            <Settings className="w-6 h-6" />
          </Link>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden" onClick={toggleMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="flex flex-col bg-[#212529] px-6 pb-4 gap-4 text-gray-300 md:hidden text-sm">
          <li>
            <Link to="/" className="hover:text-white transition" onClick={toggleMenu}>Home</Link>
          </li>
          <li>
            <Link to="/how-it-works" className="hover:text-white transition" onClick={toggleMenu}>How it works</Link>
          </li>
          <li>
            <Link to="/add-e-waste" className="hover:text-white transition" onClick={toggleMenu}>Add E-Waste</Link>
          </li>
          <li>
            <Link to="/leaderboard" className="hover:text-white transition" onClick={toggleMenu}>Leaderboard</Link>
          </li>
          <li>
            <Link to="/settings" className="hover:text-white transition" onClick={toggleMenu}>Settings</Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
