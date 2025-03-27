import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Learning = () => {
  const navigate = useNavigate();
  return (
    <div className="learning_main flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      {/* Tagline */}
      <h1 className="text-6xl md:text-7xl font-bold text-[#7673F5] opacity-50 mb-10">
        "Invest Smarter, Learn Faster
      </h1>
      <h1 className="text-3xl md:text-7xl font-bold text-[#7673F5] opacity-50 mb-10">
        – Master Finance the Fun Way!"
      </h1>

      {/* Circular buttons container */}
      <div className="flex flex-col md:flex-row gap-6 mt-10">
        {["Modules", "Games", "Quizzes"].map((item) => (
          <div
          onClick={() => navigate(`/learning/${item.toLowerCase()}`)}
            key={item}
            className="w-32 h-32 md:w-64 md:h-64 flex items-center justify-center text-white text-3xl font-semibold mx-20  
            bg-gradient-to-b from-indigo-600 to-indigo-400 rounded-full shadow-lg 
            hover:scale-105 transition-transform cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;
