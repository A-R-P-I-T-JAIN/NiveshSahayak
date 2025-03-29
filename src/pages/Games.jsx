import React from "react";
import { Link } from "react-router-dom";

const Games = () => {
  const financialGames = [
    {
      id: 1,
      title: "Scam Spotter",
      description: "Test your ability to identify financial scams and frauds",
      icon: "🕵️‍♂️",
      path: "/learning/games/scamspotter",
      color: "bg-purple-100 hover:bg-purple-200",
    },
    {
      id: 2,
      title: "Daily Money Manager",
      description:
        "Manage your daily earnings and expenses for 7 days. Try to save at least ₹200 by the end!",
      icon: "💰",
      path: "/learning/games/dailymoneymanager",
      color: "bg-green-100 hover:bg-green-200",
    },
    {
      id: 3,
      title: "Investment Simulator",
      description:
        "Practice investing with virtual money in a simulated market",
      icon: "📈",
      path: "/investment-simulator",
      color: "bg-blue-100 hover:bg-blue-200",
    },
    {
      id: 4,
      title: "Debt Payoff Strategist",
      description: "Learn different strategies to pay off debts efficiently",
      icon: "🏦",
      path: "/debt-strategist",
      color: "bg-yellow-100 hover:bg-yellow-200",
    },
  ];

  return (
    <div className="learning_main min-h-screen bg-gray-50 p-6 ">
      <div className="max-w-6xl mx-auto ">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Financial Education Games
        </h1>
        <p className="text-center mb-12 text-gray-600 max-w-2xl mx-auto">
          Learn important financial concepts through interactive games. Build
          skills that will help you manage money in real life!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {financialGames.map((game) => (
            <Link
              to={game.path}
              key={game.id}
              className={`${game.color} rounded-xl p-6 shadow-md transition-all duration-300 transform hover:scale-105 flex flex-col items-center text-center`}
            >
              <div className="text-4xl mb-4">{game.icon}</div>
              <h2 className="text-xl font-bold mb-2 text-gray-800">
                {game.title}
              </h2>
              <p className="text-gray-600">{game.description}</p>
              <button className="mt-4 px-4 py-2 bg-white rounded-lg text-sm font-medium shadow-sm">
                Play Now →
              </button>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Why Learn Through Games?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-indigo-800">
                🏆 Engaging Learning
              </h3>
              <p>
                Games make complex financial concepts easier to understand and
                remember.
              </p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-teal-800">
                💡 Risk-Free Practice
              </h3>
              <p>
                Make financial decisions in a safe environment without real
                consequences.
              </p>
            </div>
            <div className="bg-amber-50 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-amber-800">
                📈 Build Confidence
              </h3>
              <p>
                Gain experience that will help you make better real-world
                financial choices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
