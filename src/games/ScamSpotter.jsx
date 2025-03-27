import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";

const questions = [
  {
    id: 1,
    question: "You receive an email claiming you won ₹10,00,000 in a lottery you never entered. It asks for a small 'processing fee' to claim the prize. What do you do?",
    options: ["Pay the fee and claim the prize", "Ignore it", "Reply to confirm the win", "Ask for more details"],
    correct: 1,
    explanation: "🏆 This is a common lottery scam! Legitimate lotteries never ask for upfront payments. You just saved yourself ₹10,000 in 'fees'!",
    feedback: ["Oh no! You just got scammed! 💸", "Smart move! 🧠", "Replying just confirms your email is active for more scams! 📧", "Asking for details gives scammers more chances to trick you!"]
  },
  {
    id: 2,
    question: "A stockbroker on WhatsApp guarantees 100% profit in just 1 week. Should you trust them?",
    options: ["Yes, sounds like a great opportunity!", "No, it's too good to be true", "Invest a small amount first", "Ask them for their license"],
    correct: 1,
    explanation: "📉 No investment can guarantee profits! This is a typical pump-and-dump scam. You avoided losing your hard-earned money!",
    feedback: ["Boom! Your money just disappeared! 💥", "Exactly right! If it sounds too good to be true... 🚩", "Even small amounts add up when scammers target thousands!", "Licenses can be faked - good thought but still risky!"]
  },
  {
    id: 3,
    question: "A bank sends an SMS asking you to click a link to verify your account details. What should you do?",
    options: ["Click the link and enter details", "Call the bank's official number to verify", "Reply with your details", "Ignore it"],
    correct: 1,
    explanation: "🏦 Banks never ask for sensitive details via SMS! You prevented potential identity theft!",
    feedback: ["Oh dear... your account just got emptied! 🏃‍♂️💨", "Perfect! Always verify through official channels! ☎️", "Replying gives scammers what they need! 😱", "Ignoring is safer, but verifying is best!"]
  }
];

const playSound = (correct) => {
  const audio = new Audio(correct ? 
    "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3" : 
    "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3");
  audio.play();
};

const ScamSpotter = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [timer, setTimer] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted && !showResult && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0 && !showResult) {
      handleAnswer(-1); // -1 indicates time out
    }
  }, [timer, gameStarted, showResult]);

  useEffect(() => {
    if (gameStarted) {
      // Shuffle options when question changes
      const options = [...questions[currentQuestion].options];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
      setTimer(10);
    }
  }, [currentQuestion, gameStarted]);

  const handleAnswer = (index) => {
    const isCorrect = index === questions[currentQuestion].correct;
    
    if (isCorrect) {
      playSound(true);
      setScore(score + 1);
    } else if (index !== -1) {
      playSound(false);
    }

    setSelectedOption(index);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        if (score + (isCorrect ? 1 : 0) === questions.length) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
        setShowResult(true);
      }
    }, 2000);
  };

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setTimer(10);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="bg-white p-6 rounded-xl shadow-2xl max-w-lg w-full text-center border-4 border-purple-200">
        {!gameStarted ? (
          <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-purple-600 mb-4">🕵️‍♂️ Scam Spotter Challenge</h1>
            <p className="text-lg mb-6">Test your scam detection skills and protect yourself from fraud!</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 text-left">
              <p className="font-semibold">⚠️ How to play:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Answer 3 scam scenarios</li>
                <li>You have 10 seconds per question</li>
                <li>Get instant feedback on your choices</li>
              </ul>
            </div>
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:scale-105"
            >
              Start Game!
            </button>
          </div>
        ) : !showResult ? (
          <div className="animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold">Question {currentQuestion + 1}/{questions.length}</span>
              <div className="relative w-1/2 bg-gray-200 rounded-full h-4">
                <div 
                  className="absolute top-0 left-0 bg-purple-500 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${(timer/10)*100}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold">{timer}s</span>
            </div>
            
            <h2 className="text-xl font-bold mb-6 text-gray-800">{questions[currentQuestion].question}</h2>
            
            <div className="grid grid-cols-1 gap-3 mb-6">
              {shuffledOptions.map((option, index) => {
                const originalIndex = questions[currentQuestion].options.indexOf(option);
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(originalIndex)}
                    className={`py-3 px-4 rounded-xl text-white font-medium transition-all transform hover:scale-102 ${
                      selectedOption !== null
                        ? originalIndex === questions[currentQuestion].correct
                          ? "bg-green-500 animate-bounce"
                          : originalIndex === selectedOption
                          ? "bg-red-500 animate-shake"
                          : "bg-gray-300"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            
            {selectedOption !== null && (
              <div className={`p-4 rounded-lg mb-4 ${
                selectedOption === questions[currentQuestion].correct 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                <p className="font-bold">
                  {selectedOption === questions[currentQuestion].correct ? "✅ Correct!" : "❌ Oops!"}
                </p>
                <p className="mt-1">{questions[currentQuestion].feedback[selectedOption]}</p>
                <p className="mt-2 text-sm">{questions[currentQuestion].explanation}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-3xl font-bold mb-4 text-purple-600">
              {score === questions.length ? "🎉 Scam Detection Master! 🎉" : score > questions.length/2 ? "👍 Good Job!" : "🛑 Stay Vigilant!"}
            </h2>
            
            <div className="relative w-full h-8 bg-gray-200 rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                style={{ width: `${(score/questions.length)*100}%` }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-white">
                {score}/{questions.length} Correct
              </div>
            </div>
            
            {score === questions.length ? (
              <p className="mb-4 text-lg">Perfect score! You're a scam-spotting expert! 👏</p>
            ) : score > questions.length/2 ? (
              <p className="mb-4 text-lg">Good job! You caught most scams, but stay alert! 🧐</p>
            ) : (
              <p className="mb-4 text-lg">Scammers might trick you - review these common scams to stay safe! 📚</p>
            )}
            
            <button
              onClick={startGame}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full text-lg font-bold hover:from-purple-600 hover:to-blue-600 transition-all shadow-lg hover:scale-105 mt-4"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
      
      <div className="mt-6 text-sm text-gray-500">
        Remember: Always verify unexpected requests for money or information!
      </div>
    </div>
  );
};

export default ScamSpotter;