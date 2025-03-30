import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const Register3 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ownershipType, setOwnershipType] = useState("");
  const [partnerCount, setPartnerCount] = useState(1);
  const [partners, setPartners] = useState([{ name: "", share: "" }]);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tempUserId, setTempUserId] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [familyRepName, setFamilyRepName] = useState("");

  useEffect(() => {
    if (location.state?.tempUserId) {
      setTempUserId(location.state.tempUserId);
    } else {
      // Redirect if no tempUserId (direct access)
      navigate('/register');
    }
  }, [location, navigate]);

  const handleOwnershipChange = (e) => {
    setOwnershipType(e.target.value);
    setPartners([{ name: "", share: "" }]);
    setPartnerCount(1);
  };

  const handlePartnerChange = (index, field, value) => {
    const updatedPartners = [...partners];
    updatedPartners[index][field] = value;
    setPartners(updatedPartners);
  };

  const addPartner = () => {
    setPartners([...partners, { name: "", share: "" }]);
    setPartnerCount(partnerCount + 1);
  };

  const removePartner = (index) => {
    const updatedPartners = partners.filter((_, i) => i !== index);
    setPartners(updatedPartners);
    setPartnerCount(partnerCount - 1);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isChecked) {
      setError("You must agree to the terms and conditions");
      return;
    }
    
    // Validate based on ownership type
    if (ownershipType === "Sole Proprietorship" && !ownerName) {
      setError("Owner name is required");
      return;
    }
    
    if (ownershipType === "Partnership Firms") {
      const invalidPartner = partners.some(p => !p.name || !p.share);
      const totalShare = partners.reduce((sum, p) => sum + Number(p.share || 0), 0);
      
      if (invalidPartner) {
        setError("All partners must have name and share percentage");
        return;
      }
      
      if (totalShare !== 100) {
        setError("Total share percentage must equal 100%");
        return;
      }
    }
    
    if (ownershipType === "Family-Owned Business" && !familyRepName) {
      setError("Family representative name is required");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post('http://localhost:5000/api/register/step3', {
        tempUserId,
        ownershipType,
        ownerName,
        partners: ownershipType === "Partnership Firms" ? partners : undefined,
        familyRepName: ownershipType === "Family-Owned Business" ? familyRepName : undefined,
        agreedToTerms: isChecked
      });

      // Store auth token in localStorage
      localStorage.setItem('authToken', response.data.token);
      
      // Registration complete, redirect to dashboard or home
      navigate("/", { state: { registrationComplete: true,userData: response.data.user  } });
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fillDummyData = () => {
    setOwnershipType("Partnership Firms");
    setPartners([
      { name: "Rajesh Kumar", share: "60" },
      { name: "Priya Sharma", share: "40" }
    ]);
    setPartnerCount(2);
    setIsChecked(true);
  };

  return (
    <div className="learning_main relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 gap-3">
      <div className="absolute text-5xl top-10 text-center w-full opacity-70 text-[#7673F5] py-3">
        <h1>Let's Personalize Your Business Journey!</h1>
        <h1 className="mt-3">Connecting You with the Right Opportunities</h1>
      </div>
      <div className="max-w-md w-full space-y-8 bg-gray-50 p-8 rounded-lg shadow-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Business Details
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Ownership Type Dropdown */}
          <div>
            <label
              htmlFor="ownershipType"
              className="block text-sm font-medium text-gray-700"
            >
              Ownership Type
            </label>
            <select
              id="ownershipType"
              name="ownershipType"
              required
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={ownershipType}
              onChange={handleOwnershipChange}
            >
              <option value="">Select Ownership Type</option>
              <option value="Sole Proprietorship">Sole Proprietorship</option>
              <option value="Partnership Firms">Partnership Firms</option>
              <option value="Family-Owned Business">
                Family-Owned Business
              </option>
            </select>
          </div>

          {/* Conditional Fields Based on Ownership Type */}
          {ownershipType === "Sole Proprietorship" && (
            <div>
              <label
                htmlFor="ownerName"
                className="block text-sm font-medium text-gray-700"
              >
                Owner's Name
              </label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
            </div>
          )}

          {ownershipType === "Partnership Firms" && (
            <div>
              <label
                htmlFor="partnerCount"
                className="block text-sm font-medium text-gray-700"
              >
                Number of Partners: {partnerCount}
              </label>
              <input
                type="range"
                id="partnerCount"
                name="partnerCount"
                min="1"
                max="10"
                value={partnerCount}
                onChange={(e) => {
                  const count = Number(e.target.value);
                  setPartnerCount(count);
                  
                  // Adjust partners array
                  if (count > partners.length) {
                    // Add new partners
                    const newPartners = [...partners];
                    while (newPartners.length < count) {
                      newPartners.push({ name: "", share: "" });
                    }
                    setPartners(newPartners);
                  } else if (count < partners.length) {
                    // Remove extra partners (from end)
                    setPartners(partners.slice(0, count));
                  }
                }}
                className="mt-1 block w-full"
              />
              
              {partners.map((partner, index) => (
                <div key={index} className="mt-4 space-y-2 p-3 border rounded-md">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Partner {index + 1} Name
                    </label>
                    <input
                      type="text"
                      value={partner.name}
                      onChange={(e) =>
                        handlePartnerChange(index, "name", e.target.value)
                      }
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Partner {index + 1} Percentage Share
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={partner.share}
                      onChange={(e) =>
                        handlePartnerChange(index, "share", e.target.value)
                      }
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {ownershipType === "Family-Owned Business" && (
            <div>
              <label
                htmlFor="familyRepName"
                className="block text-sm font-medium text-gray-700"
              >
                Family Representative's Name
              </label>
              <input
                type="text"
                id="familyRepName"
                name="familyRepName"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={familyRepName}
                onChange={(e) => setFamilyRepName(e.target.value)}
              />
            </div>
          )}
          
          <div className="flex items-center">
            <div
              className={`w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer ${
                isChecked
                  ? "bg-green-500 border-green-500"
                  : "bg-white border-gray-300"
              }`}
              onClick={handleCheckboxChange}
            >
              {isChecked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <label
              className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
              onClick={handleCheckboxChange}
            >
              I agree to the terms and conditions
            </label>
          </div>
          
          <div className="flex justify-between">
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
              {loading ? "Processing..." : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register3;