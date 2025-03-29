import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = () => {
  const barData = Array.from({ length: 10 }, (_, i) => ({
    name: i + 1,
    Achieved: Math.random() * 100,
    Target: Math.random() * 80,
  }));

  const lineData = [
    { day: "M", value: 50 },
    { day: "T", value: 80 },
    { day: "W", value: 45 },
    { day: "T", value: 67 },
    { day: "F", value: 90 },
  ];

  const investmentData = [
    { name: "Marketing", value: 4000 },
    { name: "Inventory", value: 3000 },
    { name: "Equipment", value: 2000 },
    { name: "Staffing", value: 1000 },
  ];

  // Profit is 50% of each investment (Example Calculation)
  const profitData = investmentData.map((item) => ({
    name: item.name,
    value: item.value * 0.5,
  }));

  const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];
  const COLORS1 = ["#3B5249", "#519872", "#A4B494", "#D9BF77"];

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col justify-between border border-red-500">
        <div className="w-full">
          <h1 className="text-2xl font-bold">Qaisar</h1>
          <nav className="mt-6 space-y-4">
            <a href="#" className="block py-2 px-4 rounded bg-blue-700">
              Dashboard
            </a>
            <a href="#" className="block py-2 px-4">
              Profile
            </a>
            <a href="#" className="block py-2 px-4">
              Feedback
            </a>
            <a href="#" className="block py-2 px-4">
              Reports
            </a>
          </nav>
        </div>
        <a href="#" className="block py-2 px-4 bg-red-500 rounded-[10px]">
          Logout
        </a>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="grid grid-cols-4 gap-4">
          {[
            "Number of Sales",
            "Sales Revenue",
            "Average Price",
            "Operations",
          ].map((item, index) => (
            <div key={index} className="p-4 bg-white shadow rounded">
              <h2 className="text-gray-600">{item}</h2>
              <p className="text-2xl font-semibold mt-2">
                {(Math.random() * 10000).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className=" p-6 bg-white shadow rounded my-6">
          <div className="flex gap-4 items-center mb-4">
            <h2 className="text-xl font-bold ">Market Overview</h2>
            <div className="w-[100px] h-[20px] bg-[#4F46E5] rounded-full"></div>
            <p>Achieved</p>
            <div className="w-[100px] h-[20px] bg-[#60A5FA] rounded-full"></div>
            <p>Target</p>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Achieved" fill="#4F46E5" />
              <Bar dataKey="Target" fill="#60A5FA" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Investment & Profit Pie Charts */}
        <div className="grid grid-cols-2 gap-6">
          {/* Investment Chart */}
          <div className="px-6 bg-white shadow-md rounded pb-5">
            <h2 className="text-xl font-semibold mt-2">
              Investment Distribution
            </h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={investmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {investmentData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Profit Chart */}
          <div className="px-6 bg-white shadow-md rounded">
            <h2 className="text-xl font-semibold mt-2">Profit Distribution</h2>
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={profitData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {profitData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS1[index % COLORS1.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
