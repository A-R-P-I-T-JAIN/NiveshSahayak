import { useState } from 'react';
import { FaFileUpload } from 'react-icons/fa';

export default function ReimbursementForm({ onClose }) {
  const [formData, setFormData] = useState({
    category: '',
    amount: '',
    date: '',
    description: '',
    receipt: null,
    receiptName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFormData({ 
        ...formData, 
        receipt: e.target.files[0],
        receiptName: e.target.files[0].name
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    onClose(); // Close the modal after submission
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Expense Category*</label>
            <select 
              name="category" 
              onChange={handleChange} 
              value={formData.category}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Travel">Travel</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Meals">Meals</option>
              <option value="Transportation">Transportation</option>
              <option value="Lodging">Lodging</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount (₹)*</label>
            <input 
              type="number" 
              name="amount" 
              onChange={handleChange}
              value={formData.amount}
              required
              min="0"
              step="0.01"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date*</label>
          <input 
            type="date" 
            name="date" 
            onChange={handleChange}
            value={formData.date}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description*</label>
          <textarea 
            name="description" 
            onChange={handleChange}
            value={formData.description}
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500" 
            rows="3"
            placeholder="Provide details about the expense"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upload Receipt*</label>
          <div className="flex items-center">
            <label className="flex flex-col items-center px-4 py-6 bg-white rounded-lg border border-dashed border-gray-300 cursor-pointer hover:bg-gray-50">
              <FaFileUpload className="text-blue-500 text-xl mb-2" />
              <span className="text-sm text-gray-600">
                {formData.receiptName || 'Click to upload receipt'}
              </span>
              <input 
                type="file" 
                accept="image/*,.pdf" 
                onChange={handleFileChange} 
                className="hidden" 
                required
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">Supports JPG, PNG, PDF (Max 5MB)</p>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );
}