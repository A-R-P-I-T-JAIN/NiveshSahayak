import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNo: "",
    otp: "",
    password: "",
  });
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempUserId, setTempUserId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    if (!formData.mobileNo) {
      setError("Mobile number is required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post('http://localhost:5000/api/register/step1', {
        mobileNo: formData.mobileNo
      });
      
      setTempUserId(response.data.tempUserId);
      setOtpSent(true);
      alert(`OTP sent (for demo: check server console)`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!formData.otp) {
      setError("OTP is required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      await axios.post('http://localhost:5000/api/register/verify-otp', {
        mobileNo: formData.mobileNo,
        otp: formData.otp
      });
      
      // OTP verified, proceed to next step
      handleSubmit();
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    
    if (!formData.fullName || !formData.password) {
      setError("All fields are required");
      return;
    }
    
    // In a real app, you'd save this data along with the tempUserId
    navigate('/register2', { 
      state: { 
        userData: formData,
        tempUserId 
      } 
    });
  };

  const fillDummyData = () => {
    setFormData({
      fullName: "Rajesh Kumar",
      mobileNo: "9876543210",
      otp: "1234", // For testing, since we're not actually sending OTPs
      password: "Test@123",
    });
    setOtpSent(true);
  };

  return (
    <div className="learning_main relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute text-5xl top-10 text-center w-full opacity-70 text-[#7673F5]">
        <h1 className="">Empowering Small Businesses</h1>
        <h1 className="mt-3">– One Step at a Time. Sign in to Continue</h1>
      </div>
      <div className="max-w-md mt-9 w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Setup your account
          </h1>
          <p className="text-gray-600">Enter your details to get started!</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="flex space-x-2">
              <div className="flex-grow">
                <label htmlFor="mobileNo" className="sr-only">
                  Mobile No.
                </label>
                <input
                  id="mobileNo"
                  name="mobileNo"
                  type="tel"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mobile No."
                  value={formData.mobileNo}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={!formData.mobileNo || otpSent || loading}
                className={`px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !formData.mobileNo || otpSent || loading
                    ? "bg-indigo-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
              </button>
            </div>
            {otpSent && (
              <div>
                <label htmlFor="otp" className="sr-only">
                  Verify OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Verify OTP"
                  value={formData.otp}
                  onChange={handleChange}
                />
              </div>
            )}
            <div>
              <label htmlFor="password" className="sr-only">
                Create Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Create Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              Already have an account? Login
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
                type={otpSent ? "button" : "submit"}
                onClick={otpSent ? verifyOtp : undefined}
                disabled={loading}
                className="group relative flex justify-center py-2 px-10 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {loading ? "Processing..." : "Next"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;