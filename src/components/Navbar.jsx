import React, { useState, useEffect, useRef } from "react";
import { Globe, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Enhanced auth check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };
    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`w-screen flex fixed top-0 left-0 items-center justify-between px-6 py-2 text-black z-40 transition-all duration-300 ${
        isScrolled ? "backdrop-blur-md bg-white/80 shadow-sm" : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="text-3xl font-bold">
        <span className="text-black">Nivesh</span>
        <span className="text-black">सहायक</span>
      </div>

      {/* Navigation Menu */}
      <div
        className={`flex items-center ${
          isScrolled ? "bg-[#645FEA]/90" : "bg-[#645FEA]"
        } text-white px-4 py-1 rounded-full space-x-6 shadow-md transition-all duration-300`}
      >
        <button onClick={() => navigate("/")} className="px-3 py-1 hover:text-black cursor-pointer">
          Home
        </button>
        <button onClick={() => navigate("/aiassistance")} className="px-3 py-1 hover:text-black cursor-pointer">
          AI Assistance
        </button>
        <button onClick={() => navigate("/community")} className="px-3 py-1 hover:text-black cursor-pointer">
          Community
        </button>
        <button onClick={() => navigate("/expenses")} className="px-3 py-1 hover:text-black cursor-pointer">
          Expenses
        </button>
        <button onClick={() => navigate("/learning")} className="px-3 py-1 hover:text-black cursor-pointer">
          Learning
        </button>
        <div className="flex items-center px-3 py-1 space-x-1 hover:text-black cursor-pointer">
          <span>En</span>
          <Globe size={18} />
        </div>
      </div>

      {/* Auth Buttons or Profile */}
      <div className="flex items-center space-x-4" ref={dropdownRef}>
        {isLoggedIn ? (
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-1 px-3 py-1 rounded-full hover:bg-gray-100 transition"
            >
              <User size={20} />
              <span>Profile</span>
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                <button
                  onClick={() => {
                    navigate("/profile");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    navigate("/settings");
                    setIsDropdownOpen(false);
                  }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Settings
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button 
              onClick={() => navigate("/login")}
              className="px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition"
            >
              Signin
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-4 py-1 bg-black text-white rounded-full hover:opacity-80 transition"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;