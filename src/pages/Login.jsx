import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mobileNo: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUsingDummyData, setIsUsingDummyData] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsUsingDummyData(false); // Reset if user modifies the fields
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.mobileNo || !formData.password) {
      setError("All fields are required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Bypass backend check if using dummy data
      if (isUsingDummyData && formData.mobileNo === "9876543210" && formData.password === "Test@123") {
        // Generate a mock token (in production, use proper JWT)
        const mockToken = "dummy-auth-token-" + Math.random().toString(36).substring(2);
        localStorage.setItem('authToken', mockToken);
        navigate("/");
        return;
      }

      // Normal login flow for non-dummy data
      const response = await axios.post('http://localhost:5000/api/login', {
        mobileNo: formData.mobileNo,
        password: formData.password
      });
      
      localStorage.setItem('authToken', response.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDummyData = () => {
    setFormData({
      mobileNo: "9876543210",
      password: "Test@123",
    });
    setIsUsingDummyData(true);
  };

  return (
    <div className="learning_main relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute text-5xl top-10 text-center w-full opacity-70 text-[#7673F5]">
        <h1 className="">Empowering Small Businesses</h1>
        <h1 className="mt-3">– Welcome Back! Sign in to Continue</h1>
      </div>
      <div className="max-w-md mt-9 w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Login to your account
          </h1>
          <p className="text-gray-600">Enter your credentials to continue</p>
          {isUsingDummyData && (
            <div className="mt-2 text-sm text-green-600">
              Using demo credentials - you'll be automatically logged in
            </div>
          )}
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="mobileNo" className="sr-only">
                Mobile No.
              </label>
              <input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Mobile No."
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </button>
            <div className="space-x-2">
              <button
                type="button"
                onClick={fillDummyData}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Fill Dummy Data
              </button>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/register')}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Don't have an account? Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;