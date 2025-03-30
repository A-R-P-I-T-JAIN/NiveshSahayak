import { useState } from "react";
import {
  FiSearch,
  FiCalendar,
  FiDollarSign,
  FiFileText,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const ReceiptHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const navigate = useNavigate();

  // Mock history data
  const [receipts] = useState([
    {
      id: 1,
      store: "Fresh Grocery Mart",
      date: "2023-08-15",
      total: 45.99,
      items: 12,
      status: "processed",
      textPreview: "Milk $3.99 | Bread $2.50 | Apples $4.25...",
    },
    {
      id: 2,
      store: "Tech World Store",
      date: "2023-08-14",
      total: 899.99,
      items: 3,
      status: "archived",
      textPreview: "Wireless Headphones $299.99 | Laptop $599...",
    },
    // Add more mock entries
  ]);

  const filteredReceipts = receipts.filter((receipt) => {
    const matchesSearch = receipt.store
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDate = selectedDate ? receipt.date === selectedDate : true;
    return matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Receipt History
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <FiFileText className="text-blue-500" />
            <span>{receipts.length} processed receipts</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by store name..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative flex items-center">
            <FiCalendar className="absolute left-3 text-gray-400" />
            <input
              type="date"
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
        </div>

        {/* Receipts List */}
        <div className="space-y-4">
          {filteredReceipts.map((receipt) => (
            <div
              key={receipt.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <div className="flex items-start gap-4">
                {/* Receipt Icon */}
                <div className="bg-blue-50 p-3 rounded-lg">
                  <FiFileText className="text-blue-500 text-2xl" />
                </div>

                {/* Main Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {receipt.store}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        receipt.status === "processed"
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {receipt.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FiCalendar />
                      <span>{new Date(receipt.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiDollarSign />
                      <span>${receipt.total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📦</span>
                      <span>{receipt.items} items</span>
                    </div>
                  </div>

                  <div className="mt-2 text-sm text-gray-500">
                    {receipt.textPreview}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end gap-2">
                  <button className="text-gray-400 hover:text-red-500">
                    <FiTrash2 />
                  </button>
                  <button
                    onClick={() => navigate("/singlerecipt")}
                    className="text-sm text-blue-500 hover:underline"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredReceipts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg">No receipts found in your history</p>
            <p className="mt-2">Try adjusting your search filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReceiptHistory;
