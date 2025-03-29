import { useState } from "react";

const AiGrowthAssistant = () => {
  const [businessInsights] = useState({
    summary: {
      status: "High Growth Potential",
      trend: "35% faster than industry average",
      opportunity:
        "Untapped market: 18-25 age group (42% engagement potential)",
    },
    keyAreas: [
      {
        title: "Customer Retention",
        icon: "👥",
        status: "Needs Improvement",
        insight:
          "23% churn rate • Implement loyalty program (+15% retention potential)",
      },
      {
        title: "Digital Presence",
        icon: "🌐",
        status: "Strong Foundation",
        insight: "Optimize mobile experience → +30% conversion boost",
      },
      {
        title: "Operational Efficiency",
        icon: "⚙️",
        status: "Moderate",
        insight: "Automate inventory management → Save 18hrs/week",
      },
    ],
    actionPlan: [
      {
        step: 1,
        action: "Launch Referral Program",
        impact: "🏆 +50 New Customers/Month",
      },
      { step: 2, action: "Optimize Ad Spend", impact: "💰 Save ₹25k/Month" },
      { step: 3, action: "Staff Training", impact: "📈 +35% Service Quality" },
    ],
  });

  // Initialize chat messages with some default content
  const [chatMessages, setChatMessages] = useState([
    { sender: "ai", message: "Hello! How can I assist you today?" },
    {
      sender: "user",
      message: "Can you provide insights into customer retention?",
    },
    {
      sender: "ai",
      message:
        "Sure! Your current churn rate is 23%. Implementing a loyalty program could improve retention by 15%.",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSendMessage = () => {
    if (userInput.trim() === "") return;

    // Simulate AI response
    const aiResponse = `AI: Thank you for asking about "${userInput}". How can I assist further?`;

    // Update chat messages
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", message: userInput },
      { sender: "ai", message: aiResponse },
    ]);

    // Clear input field
    setUserInput("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex mt-15">
      {/* Left Section: Existing Content */}
      <div className="w-3/5 pr-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🤖 AI Business Accelerator
            </h1>
            <p className="text-gray-600">
              Real-time Growth Strategy • {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Growth Snapshot */}
          <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
            <div className="flex items-center mb-4">
              <div className="text-4xl mr-4">🚀</div>
              <div>
                <h2 className="text-xl font-semibold">Current Growth Status</h2>
                <p className="text-emerald-600 font-medium">
                  {businessInsights.summary.status}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <span className="mr-2">📈</span>
                <span>{businessInsights.summary.trend}</span>
              </div>
              <div className="flex items-center">
                <span className="mr-2">🎯</span>
                <span>{businessInsights.summary.opportunity}</span>
              </div>
            </div>
          </div>

          {/* Key Focus Areas */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {businessInsights.keyAreas.map((area, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-3">
                  <div className="text-3xl mr-3">{area.icon}</div>
                  <div>
                    <h3 className="font-semibold">{area.title}</h3>
                    <span
                      className={`text-sm ${
                        area.status === "Needs Improvement"
                          ? "text-red-500"
                          : area.status === "Strong Foundation"
                          ? "text-green-500"
                          : "text-amber-500"
                      }`}
                    >
                      {area.status}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{area.insight}</p>
                <button className="mt-3 text-indigo-600 hover:underline flex items-center">
                  View Action Plan <span className="ml-1">→</span>
                </button>
              </div>
            ))}
          </div>

          {/* Visual Action Plan */}
          <div className="bg-indigo-50 p-6 rounded-2xl shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">
              📋 90-Day Growth Roadmap
            </h2>
            <div className="space-y-4">
              {businessInsights.actionPlan.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start p-4 bg-white rounded-lg"
                >
                  <div className="mr-4 text-2xl">
                    {index === 0 ? "①" : index === 1 ? "②" : "③"}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{step.action}</p>
                        <p className="text-gray-600 text-sm mt-1">
                          {step.impact}
                        </p>
                      </div>
                      <button className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm hover:bg-indigo-200">
                        Start
                      </button>
                    </div>
                    {index < 2 && <div className="mt-3 h-px bg-gray-100"></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth Potential Meter */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold">Growth Potential Meter</h2>
                <p className="opacity-90">Current Utilization: 65%</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
              <div
                className="h-3 rounded-full bg-white"
                style={{ width: "65%" }}
              ></div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm opacity-90">Immediate</p>
                <p className="font-medium">+₹1.2L/Mo</p>
              </div>
              <div>
                <p className="text-sm opacity-90">6-Month</p>
                <p className="font-medium">+₹8.5L/Mo</p>
              </div>
              <div>
                <p className="text-sm opacity-90">1-Year</p>
                <p className="font-medium">+₹25L/Mo</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Fixed AI Chat Assistant */}
      <div
        className="fixed bottom-1 right-6 w-2/5 bg-white rounded-2xl shadow-md p-6 
      h-[calc(100vh-48px)] mt-15"
      >
        <h2 className="text-xl font-semibold mb-4">AI Chat Assistant</h2>
        <div className="h-[calc(100%-120px)] overflow-y-auto mb-4">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.sender === "user" ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block p-2 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {msg.message}
              </p>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-500 text-white px-4 py-2 rounded-r-lg hover:bg-indigo-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiGrowthAssistant;
