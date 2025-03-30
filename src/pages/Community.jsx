import { useState } from "react";
import SocialFeed from "../components/SocialFeed";
import BissiBanking from "../components/BissiBanking";
import B2B from "../components/B2BLoan"; // Add new component import
import Navbar from "../components/Navbar";

function Community() {
  const [activeTab, setActiveTab] = useState("social");

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Enhanced Tab Navigation */}
      <div className="bg-white shadow-sm mt-15">
        <div className="container mx-auto">
          <nav className="flex">
            <button
              onClick={() => setActiveTab("social")}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-all duration-200
                ${
                  activeTab === "social"
                    ? "text-indigo-700 border-b-4 border-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Social Feed</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("banking")}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-all duration-200
                ${
                  activeTab === "banking"
                    ? "text-indigo-700 border-b-4 border-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Bissi Banking</span>
              </div>
            </button>
            {/* New B2B Loan Tab */}
            <button
              onClick={() => setActiveTab("b2b")}
              className={`flex-1 py-5 text-center font-semibold text-lg transition-all duration-200
                ${
                  activeTab === "b2b"
                    ? "text-indigo-700 border-b-4 border-indigo-600 bg-indigo-50"
                    : "text-gray-600 hover:text-indigo-600 hover:bg-gray-50"
                }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                  />
                </svg>
                <span>Loan Support</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      <main className="container mx-auto p-4 md:p-6">
        {activeTab === "social" ? (
          <SocialFeed />
        ) : activeTab === "banking" ? (
          <BissiBanking />
        ) : (
          <B2B />
        )}
      </main>

      <footer className="bg-gray-800 text-white p-6 text-center mt-8">
        <p className="text-lg">© 2023 Community Hub. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Community;
