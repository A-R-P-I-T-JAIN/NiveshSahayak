import { PieChart } from "react-minimal-pie-chart";

const PersonaliseReport = () => {
  // Sample data - replace with real data
  const expenseData = [
    { title: "Salaries", value: 35, color: "#3B82F6" },
    { title: "Office", value: 20, color: "#10B981" },
    { title: "Marketing", value: 15, color: "#F59E0B" },
    { title: "Utilities", value: 10, color: "#EF4444" },
    { title: "Other", value: 20, color: "#8B5CF6" },
  ];

  const profitMargin = 18.5; // Example value
  const industryAvgMargin = 15.2; // Example value

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-blue-800">
          NiveshSahayak Financial Report
        </h1>
        <p className="text-gray-600">
          Generated on {new Date().toLocaleDateString()}
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Expense Breakdown */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Expense Breakdown
          </h2>
          <div className="h-64">
            <PieChart
              data={expenseData}
              label={({ dataEntry }) =>
                `${dataEntry.title}: ${dataEntry.value}%`
              }
              labelStyle={{ fontSize: "5px" }}
            />
          </div>
        </div>

        {/* Profitability & Benchmarking */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Profitability Analysis
          </h2>

          <div className="mb-6">
            <div className="flex justify-between mb-2">
              <span className="font-medium">Your Net Profit Margin</span>
              <span
                className={`font-bold ${
                  profitMargin >= industryAvgMargin
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {profitMargin}%
              </span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Industry Average</span>
              <span>{industryAvgMargin}%</span>
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full bg-blue-600"
                style={{ width: `${(profitMargin / 30) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-2">Break-even Analysis</h3>
            <p className="text-sm text-gray-600">
              You need <span className="font-bold">₹82,500</span> monthly
              revenue to cover expenses.
            </p>
            <div className="mt-3 bg-yellow-50 p-3 rounded text-sm">
              <span className="font-medium">Current:</span> ₹1,12,000 (+₹29,500
              above break-even)
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations Section */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          AI-Driven Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expense Optimization */}
          <div>
            <h3 className="font-medium text-blue-700 mb-2">
              Expense Optimization
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Switch to Supplier B for office supplies (12% potential savings)
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Implement LED lighting (₹2,800/month savings)
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">!</span>
                Marketing spend 22% above industry average
              </li>
            </ul>
          </div>

          {/* Growth Opportunities */}
          <div>
            <h3 className="font-medium text-blue-700 mb-2">
              Growth Opportunities
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">+</span>
                Expand to nearby cities - 78% match with your capabilities
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">+</span>
                Add premium service tier (23% clients likely to upgrade)
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mr-2">•</span>
                Partner with complementary businesses
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Reimbursements Tracker */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Reimbursements Status
        </h2>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Pending Approval</span>
          <span className="text-sm font-medium">₹12,450</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: "65%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">Approved</span>
          <span className="text-sm font-medium">₹8,200</span>
        </div>
      </div>
    </div>
  );
};

export default PersonaliseReport;
