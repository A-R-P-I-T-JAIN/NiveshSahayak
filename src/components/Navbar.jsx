import React, { useState, useEffect } from "react";
import { Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`w-screen flex fixed top-0 left-0 items-center justify-between px-6 py-2 text-black z-40 transition-all duration-300 ${isScrolled ? 'backdrop-blur-md bg-white/80 shadow-sm' : 'bg-transparent'}`}>
      {/* Logo */}
      <div className="text-3xl font-bold">
        <span className="text-black">Nivesh</span>
        <span className="text-black">सहायक</span>
      </div>

      {/* Navigation Menu */}
      <div className={`flex items-center ${isScrolled ? 'bg-[#645FEA]/90' : 'bg-[#645FEA]'} text-white px-4 py-1 rounded-full space-x-6 shadow-md transition-all duration-300`}>
        <button onClick={() => navigate("/")} className="px-3 py-1 hover:text-black cursor-pointer">Home</button>
        <button className="px-3 py-1 hover:text-black cursor-pointer">AI Assistance</button>
        <button onClick={() => navigate("/community")} className="px-3 py-1 hover:text-black cursor-pointer">Community</button>
        <button onClick={() => navigate("/learning")} className="px-3 py-1 hover:text-black cursor-pointer">Learning</button>
        <div className="flex items-center px-3 py-1 space-x-1 hover:text-black cursor-pointer">
          <span>En</span>
          <Globe size={18} />
        </div>
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <button className="px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition">
          Signin
        </button>
        <button className="px-4 py-1 bg-black text-white rounded-full hover:opacity-80 transition">
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;