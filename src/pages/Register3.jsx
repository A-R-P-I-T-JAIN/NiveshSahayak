import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const Register3 = () => {
    const [ownershipType, setOwnershipType] = useState('');
    const [partnerCount, setPartnerCount] = useState(1);
    const [partners, setPartners] = useState([{ name: '', share: '' }]);
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isAgreed, setIsAgreed] = useState(false);
    

    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = () => {
      setIsChecked(!isChecked);
    };

    const handleOwnershipChange = (e) => {
        setOwnershipType(e.target.value);
        setPartners([{ name: '', share: '' }]); // Reset partners on ownership change
        setPartnerCount(1);
    };

    const handlePartnerChange = (index, field, value) => {
        const updatedPartners = [...partners];
        updatedPartners[index][field] = value;
        setPartners(updatedPartners);
    };

    const addPartner = () => {
        setPartners([...partners, { name: '', share: '' }]);
        setPartnerCount(partnerCount + 1);
    };

    const removePartner = (index) => {
        const updatedPartners = partners.filter((_, i) => i !== index);
        setPartners(updatedPartners);
        setPartnerCount(partnerCount - 1);
    };

    const toggleTerms = () => {
        setIsTermsOpen(!isTermsOpen);
    };

    const handleAgreementChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isAgreed) {
            alert('You must agree to the terms and conditions before submitting.');
            return;
        }
        // Form submission logic here
        console.log('Form submitted:', { ownershipType, partners });
    };

    return (
        <div className="learning_main relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 gap-3">
      <div className='absolute text-5xl top-10 text-center w-full opacity-70 text-[#7673F5] py-3' >
        <h1>Let’s Personalize Your Business Journey !</h1>
        <h1 className='mt-3'> connecting You with the Right Opportunities</h1>
      </div>
            <div className="max-w-md w-full space-y-8 bg-gray-50 p-8 rounded-lg shadow-md">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">
                    Business Details
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {/* Ownership Type Dropdown */}

                    <div>
                        <label htmlFor="ownershipType" className="block text-sm font-medium text-gray-700">
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
                            <option value="Family-Owned Business">Family-Owned Business</option>
                            {/* <option value="Cooperatives & SHGs">Cooperatives & SHGs</option> */}
                        </select>
                    </div>

                    {/* Conditional Fields Based on Ownership Type */}
                    {ownershipType === 'Sole Proprietorship' && (
                        <div>
                            <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
                                Owner's Name
                            </label>
                            <input
                                type="text"
                                id="ownerName"
                                name="ownerName"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}

                    {ownershipType === 'Partnership Firms' && (
                        <div>
                            <label htmlFor="partnerCount" className="block text-sm font-medium text-gray-700">
                                Number of Partners
                            </label>
                            <input
                                type="number"
                                id="partnerCount"
                                name="partnerCount"
                                min="1"
                                value={partnerCount}
                                onChange={(e) => setPartnerCount(Number(e.target.value))}
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                            {partners.map((partner, index) => (
                                <div key={index} className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Partner {index + 1} Name
                                    </label>
                                    <input
                                        type="text"
                                        value={partner.name}
                                        onChange={(e) => handlePartnerChange(index, 'name', e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mt-2">
                                        Partner {index + 1} Percentage Share
                                    </label>
                                    <input
                                        type="number"
                                        value={partner.share}
                                        onChange={(e) => handlePartnerChange(index, 'share', e.target.value)}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {index > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => removePartner(index)}
                                            className="mt-2 text-sm text-red-500"
                                        >
                                            Remove Partner
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPartner}
                                className="mt-4 text-sm text-indigo-500"
                            >
                                Add Partner
                            </button>
                        </div>
                    )}

{ownershipType === 'Family-Owned Business' && (
            <div>
              <label htmlFor="familyRepName" className="block text-sm font-medium text-gray-700">
                Family Representative’s Name
              </label>
              <input
                type="text"
                id="familyRepName"
                name="familyRepName"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
                    )}   
 <div className="flex items-center">
      <input
        id="agree-checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 flex items-center justify-center border-2 rounded-md cursor-pointer ${
          isChecked ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
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
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <label
        htmlFor="agree-checkbox"
        className="ml-2 text-sm font-medium text-gray-900 cursor-pointer"
        onClick={handleCheckboxChange}
      >
        I agree to the terms and conditions
      </label>
    </div>        

                </form>
            </div>
        </div>
    )
}
export default Register3;

            
    
    

              
