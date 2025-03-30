import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Register2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    businessIdType: '',
    businessId: '',
    businessCategory: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tempUserId, setTempUserId] = useState('');

  useEffect(() => {
    if (location.state?.tempUserId) {
      setTempUserId(location.state.tempUserId);
    } else {
      navigate('/register');
    }
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.businessIdType || !formData.businessId || !formData.businessCategory) {
      setError('All fields are required');
      return;
    }
    
    setLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      navigate('/register3', { 
        state: { 
          userData: location.state?.userData,
          businessData: formData,
          tempUserId 
        } 
      });
    }, 500);
  };

  const fillDummyData = () => {
    setFormData({
      businessIdType: 'GSTIN',
      businessId: '22ABCDE1234F1Z5',
      businessCategory: 'Retail & Shops',
    });
  };

  return (
    <div className="learning_main relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"> 
      <div className='absolute text-5xl top-10 text-center w-full opacity-70 text-[#7673F5]' >
        <h1>Help Us Know Your Business Better!</h1>
        <h1 className='mt-3'>– Provide Details to Build Your Profile.</h1>
      </div>
      <div className="max-w-md mt-9 w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Setup your account</h1>
          <p>Enter your details to get started!</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <select
                id="businessIdType"
                name="businessIdType"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                value={formData.businessIdType}
                onChange={handleChange}
              >
                <option value="">Select Business ID Type</option>
                <option value="GSTIN">GSTIN</option>
                <option value="UDYAM">UDYAM</option>
                <option value="UNREGISTERED">Unregistered</option>
                <option value="OTHERS">Others</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="businessId" className="block text-gray-700 transition-all duration-300 ease-in-out">
                {formData.businessIdType === "GSTIN" ? "Enter GSTIN" :
                 formData.businessIdType === "UDYAM" ? "Enter UDYAM ID" :
                 formData.businessIdType === "UNREGISTERED" ? "Create Business ID" : "Enter Business ID"}
              </label>
              <input
                id="businessId"
                name="businessId"
                type="text"
                required
                placeholder={
                  formData.businessIdType === "GSTIN" ? "22ABCDE1234F1Z5" :
                  formData.businessIdType === "UDYAM" ? "UDYAM-UP-01-0000001" :
                  "Your Business ID"
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                value={formData.businessId}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <label htmlFor="businessCategory" className="block text-gray-700">Business Category</label>
              <select
                id="businessCategory"
                name="businessCategory"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
                value={formData.businessCategory}
                onChange={handleChange}
              >
                <option value="">Select Business Category</option>
                <option value="Manufacturing">📦 Manufacturing</option>
                <option value="Food & Beverage">🍽 Food & Beverage</option>
                <option value="Construction & Labor">🏗 Construction & Labor</option>
                <option value="Retail & Shops">🏪 Retail & Shops</option>
                <option value="Services">🏭 Services</option>
                <option value="Home-Based Businesses">🏡 Home-Based Businesses</option>
                <option value="Education & Coaching">✏️ Education & Coaching</option>
                <option value="Transport & Logistics">🚗 Transport & Logistics</option>
                <option value="Digital & IT Services">📱 Digital & IT Services</option>
                <option value="Creative & Handicrafts">🎨 Creative & Handicrafts</option>
                <option value="Healthcare & Medical">🏥 Healthcare & Medical</option>
              </select>
            </div>
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
              {loading ? "Processing..." : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register2;