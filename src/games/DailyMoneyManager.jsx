import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DailyMoneyManager = () => {
  const [currentDay, setCurrentDay] = useState(1);
  const [balance, setBalance] = useState(500); // Starting balance
  const [savings, setSavings] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [showTutorial, setShowTutorial] = useState(true);
  const navigate = useNavigate();

  // Available in multiple languages as per Nivesh High's feature
  const languages = {
    english: {
      title: "Daily Money Manager",
      tutorial: "Manage your daily earnings and expenses for 7 days. Try to save at least ₹200 by the end!",
      income: "Daily Income",
      save: "Save",
      spend: "Spend",
      amount: "Amount",
      category: "Category",
      remaining: "Remaining Balance",
      totalSavings: "Total Savings",
      nextDay: "Next Day",
      categories: ["Food", "Transport", "Utilities", "Healthcare", "Other"],
      feedback: {
        good: "Great job! You're managing your money wisely.",
        warning: "Be careful! You're spending too much.",
        excellent: "Excellent! You saved more than expected!",
        poor: "You're spending more than you earn. Try to cut expenses."
      },
      day: "Day",
      complete: "Game Complete!",
      restart: "Play Again",
      back: "Back to Learning Hub"
    },
    hindi: {
      title: "दैनिक धन प्रबंधक",
      tutorial: "7 दिनों के लिए अपनी दैनिक कमाई और खर्च का प्रबंधन करें। अंत तक कम से कम ₹200 बचाने का प्रयास करें!",
      income: "दैनिक आय",
      save: "बचत",
      spend: "खर्च",
      amount: "राशि",
      category: "श्रेणी",
      remaining: "शेष राशि",
      totalSavings: "कुल बचत",
      nextDay: "अगला दिन",
      categories: ["भोजन", "यातायात", "उपयोगिताएँ", "स्वास्थ्य सेवा", "अन्य"],
      feedback: {
        good: "बहुत बढ़िया! आप अपने पैसे का समझदारी से प्रबंधन कर रहे हैं।",
        warning: "सावधान! आप बहुत अधिक खर्च कर रहे हैं।",
        excellent: "उत्कृष्ट! आपने अपेक्षा से अधिक बचत की!",
        poor: "आप जितना कमाते हैं उससे अधिक खर्च कर रहे हैं। खर्च कम करने का प्रयास करें।"
      },
      day: "दिन",
      complete: "खेल पूरा!",
      restart: "फिर से खेलें",
      back: "सीखने के केंद्र पर वापस जाएं"
    }
  };

  const [dailyIncome, setDailyIncome] = useState(() => {
    // Simulate irregular income (200-600) like real laborers
    return Math.floor(Math.random() * 400) + 200;
  });

  const [spendAmount, setSpendAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Food');

  const handleSpend = () => {
    const amount = parseInt(spendAmount);
    if (isNaN(amount)) {
      setFeedback(languages[selectedLanguage].feedback.warning);
      return;
    }

    if (amount > balance) {
      setFeedback(languages[selectedLanguage].feedback.poor);
      return;
    }

    setBalance(balance - amount);
    setExpenses([...expenses, { category: selectedCategory, amount }]);
    setSpendAmount('');
    
    if (balance - amount < dailyIncome * 0.3) {
      setFeedback(languages[selectedLanguage].feedback.warning);
    } else {
      setFeedback(languages[selectedLanguage].feedback.good);
    }
  };

  const handleSave = () => {
    const amount = parseInt(spendAmount);
    if (isNaN(amount)) {
      setFeedback(languages[selectedLanguage].feedback.warning);
      return;
    }

    if (amount > balance) {
      setFeedback(languages[selectedLanguage].feedback.poor);
      return;
    }

    setBalance(balance - amount);
    setSavings(savings + amount);
    setSpendAmount('');
    setFeedback(languages[selectedLanguage].feedback.good);
  };

  const handleNextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
      setDailyIncome(Math.floor(Math.random() * 400) + 200); // New random income
      setBalance(balance + dailyIncome);
      setExpenses([]);
      setFeedback('');
    } else {
      setGameCompleted(true);
      if (savings >= 200) {
        setFeedback(languages[selectedLanguage].feedback.excellent);
      }
    }
  };

  const restartGame = () => {
    setCurrentDay(1);
    setBalance(500);
    setSavings(0);
    setExpenses([]);
    setGameCompleted(false);
    setFeedback('');
    setDailyIncome(Math.floor(Math.random() * 400) + 200);
  };

  if (showTutorial) {
    return (
      <div className="fixed inset-0 bg-gray-200 bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4">{languages[selectedLanguage].title}</h2>
          <p className="mb-4">{languages[selectedLanguage].tutorial}</p>
          <div className="mb-4">
            <label className="block mb-2">Language:</label>
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="english">English</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>
          <button 
            onClick={() => setShowTutorial(false)}
            className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameCompleted) {
    return (
      <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{languages[selectedLanguage].complete}</h1>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">{languages[selectedLanguage].totalSavings}: ₹{savings}</h2>
          {feedback && <p className="text-green-700">{feedback}</p>}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={restartGame}
            className="flex-1 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {languages[selectedLanguage].restart}
          </button>
          <button 
            onClick={() => navigate('/learning-hub')}
            className="flex-1 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            {languages[selectedLanguage].back}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">{languages[selectedLanguage].title}</h1>
        <select 
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="p-1 border rounded text-sm"
        >
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
        </select>
      </div>

      <div className="mb-6 bg-blue-50 p-3 rounded-lg">
        <h2 className="font-semibold">{languages[selectedLanguage].day} {currentDay}/7</h2>
        <p>{languages[selectedLanguage].income}: ₹{dailyIncome}</p>
        <p>{languages[selectedLanguage].remaining}: ₹{balance}</p>
        <p>{languages[selectedLanguage].totalSavings}: ₹{savings}</p>
      </div>

      <div className="mb-4">
        <label className="block mb-1">{languages[selectedLanguage].amount} (₹):</label>
        <input
          type="number"
          value={spendAmount}
          onChange={(e) => setSpendAmount(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter amount"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">{languages[selectedLanguage].category}:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full p-2 border rounded"
        >
          {languages[selectedLanguage].categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleSpend}
          className="flex-1 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          {languages[selectedLanguage].spend}
        </button>
        <button
          onClick={handleSave}
          className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {languages[selectedLanguage].save}
        </button>
      </div>

      {feedback && (
        <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
          <p>{feedback}</p>
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Today's Expenses:</h3>
        {expenses.length === 0 ? (
          <p>No expenses today</p>
        ) : (
          <ul className="space-y-1">
            {expenses.map((expense, index) => (
              <li key={index} className="flex justify-between">
                <span>{expense.category}:</span>
                <span>₹{expense.amount}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={handleNextDay}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {languages[selectedLanguage].nextDay}
      </button>
    </div>
  );
};

export default DailyMoneyManager;