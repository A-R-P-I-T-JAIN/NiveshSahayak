import { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FaBars, FaTimes, FaUpload } from "react-icons/fa";
import Navbar from "../components/Navbar";
import ReimbursementForm from "../components/ReimbursementForm";
import { useNavigate } from "react-router-dom";

export default function Expenses() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showReimbursementForm, setShowReimbursementForm] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleReimbursementForm = () => {
    setShowReimbursementForm(!showReimbursementForm);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Here you would typically handle the file upload to your server
      console.log("Uploading file:", selectedFile);
      alert(`File "${fileName}" uploaded successfully!`);
      
      // Reset after upload
      setSelectedFile(null);
      setFileName("No file chosen");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 mt-15">
      <Navbar />
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-16"
        } bg-white shadow-md h-screen p-4 transition-all duration-300`}
      >
        <button onClick={toggleSidebar} className="text-gray-700 mb-4">
          <FaBars size={24} />
        </button>
        <nav className="space-y-4">
          <a onClick={() => navigate('/dashboard')} className="block text-gray-700 font-medium cursor-pointer">
            Dashboard
          </a>
          <a href="#" className="block text-gray-700 font-medium">
            Reimbursement History
          </a>
          <a href="#" className="block text-gray-700 font-medium relative">
            Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Reimbursement Form Modal */}
        {showReimbursementForm && (
          <div className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl relative border-2 border-black">
              <button
                onClick={toggleReimbursementForm}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <FaTimes size={20} />
              </button>
              <h2 className="text-xl font-bold mb-4">Reimbursement Form</h2>
              <ReimbursementForm onClose={toggleReimbursementForm} />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 shadow rounded-lg">
            <p className="text-gray-600">Total Income</p>
            <h2 className="text-2xl font-bold">$45,000</h2>
          </div>
          <div className="bg-green-500 text-white p-4 shadow rounded-lg">
            <p>Total Expense</p>
            <h2 className="text-2xl font-bold">$27,450</h2>
          </div>
          <div className="bg-white p-4 shadow rounded-lg">
            <p className="text-gray-600">Total Savings</p>
            <h2 className="text-2xl font-bold">$17,550</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-bold mb-2">Category wise Expenses</h3>
            <Bar
              data={{
                labels: [
                  "Utilities",
                  "Labour",
                  "Transportation",
                  "Maintainence",
                  "Others",
                ],
                datasets: [
                  {
                    label: "Expense",
                    data: [3200, 3519, 3100, 1200, 2200],
                    backgroundColor: "#10B981",
                  },
                ],
              }}
            />
          </div>

          <div className="bg-white p-4 shadow rounded-lg">
            <h3 className="font-bold mb-4">Area of Expenditure</h3>

            {/* Manual Transaction Entry */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">
                Add Transaction Manually
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    className="w-full p-2 border border-gray-300 rounded text-sm"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Category
                  </label>
                  <select className="w-full p-2 border border-gray-300 rounded text-sm bg-white">
                    <option value="">Select category</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Labour">Labour</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Maintainence">Maintainence</option>
                    <option value="others">Others</option>
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="block text-xs text-gray-500 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded text-sm"
                  placeholder="Brief description"
                />
              </div>
              <button className="mt-3 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded">
                Add Transaction
              </button> 
            </div>

            {/* Compact Upload Section */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Upload Receipts</h4>
              <div className="flex items-center">
                <label className="cursor-pointer flex items-center">
                  <span className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-3 rounded text-xs mr-2">
                    Choose File
                  </span>
                  <span className="text-xs text-gray-500 truncate max-w-xs">
                    {fileName}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
                {selectedFile && (
                  <button
                    onClick={handleUpload}
                    className="ml-2 bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded text-xs flex items-center"
                  >
                    <FaUpload className="mr-1" size={10} />
                    Upload
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Supports PDF, JPG, PNG (max 5MB)
              </p>
            </div>

            {/* Reimbursement Form Link */}
            <div className="border-t pt-3">
              <button
                onClick={toggleReimbursementForm}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
              >
                Go to Reimbursement Form →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div> 
  );
}