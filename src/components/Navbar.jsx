import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full glass z-50">
      <div className="flex justify-between items-center px-6 md:px-12 py-4">
        <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-blue-300">
          Xpert<span className="text-blue-500">Strikes</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 text-lg font-medium">
          <li className="text-gray-200 hover:text-blue-400 transition duration-300"><a href="#home">Home</a></li>
          <li className="text-gray-200 hover:text-blue-400 transition duration-300"><a href="#about">About</a></li>
          <li className="text-gray-200 hover:text-blue-400 transition duration-300"><a href="#services">Services</a></li>
          <li className="text-gray-200 hover:text-blue-400 transition duration-300"><a href="#members">Members</a></li>
          <li className="text-gray-200 hover:text-blue-400 transition duration-300"><a href="#contact">Contact</a></li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-blue-400 border border-blue-400 px-3 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition"
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-400/70 mx-6 my-2 p-4 rounded-lg flex flex-col space-y-3 text-center">
          <a href="#home" className="text-blue-300 hover:text-blue-500 transition duration-300" onClick={() => setOpen(false)}>Home</a>
          <a href="#about" className="text-blue-300 hover:text-blue-500 transition duration-300" onClick={() => setOpen(false)}>About</a>
          <a href="#services" className="text-blue-300 hover:text-blue-500 transition duration-300" onClick={() => setOpen(false)}>Services</a>
          <a href="#members" className="text-blue-300 hover:text-blue-500 transition duration-300" onClick={() => setOpen(false)}>Members</a>
          <a href="#contact" className="text-blue-300 hover:text-blue-500 transition duration-300" onClick={() => setOpen(false)}>Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
