import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement } from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale, // Register CategoryScale
  LinearScale,   // Register LinearScale
  PointElement,  // Register PointElement (for Line chart)
  LineElement    // Register LineElement (for Line chart)
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Stocks", "Bonds", "Cash", "Real Estate"],
    datasets: [
      {
        label: "Portfolio Allocation",
        data: [40, 30, 20, 10],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Revenue",
        data: [5000, 7000, 9000, 11000, 13000, 15000, 17000],
        borderColor: "#36A2EB",
        fill: false,
      },
      {
        label: "Expenses",
        data: [3000, 4000, 5000, 6000, 7000, 8000, 9000],
        borderColor: "#FF6384",
        fill: false,
      },
    ],
  };

  return (
    // <div className="flex justify-center items-center h-screen bg-gray-100">
      <div
        className="flex bg-white shadow-lg rounded-lg overflow-hidden z-40"
        style={{ width: "65vw", height: "75vh" }}
      >
        {/* Sidebar */}
        <aside
          className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-200 ease-in-out`}
        >
          <nav>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
            >
              Overview
            </a>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
            >
              Investments
            </a>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
            >
              Transactions
            </a>
            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
            >
              Reports
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Navbar */}
          <nav className="bg-blue-600 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold">Finance Dashboard</h1>
              <button onClick={toggleSidebar} className="md:hidden">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
            </div>
          </nav>

          {/* Dashboard Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Revenue</h2>
                <p className="text-2xl font-bold">$12,345</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Total Expenses</h2>
                <p className="text-2xl font-bold">$8,765</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">Net Profit</h2>
                <p className="text-2xl font-bold">$3,580</p>
              </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Line Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Revenue vs Expenses</h2>
                <Line data={lineData} />
              </div>

              {/* Doughnut Chart */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Portfolio Allocation</h2>
                <Doughnut data={doughnutData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default Dashboard;