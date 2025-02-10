"use client";
import React, { useState } from 'react';

function LoveQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState(null); // To show correct/wrong feedback

  const questions = [
    {
      question: "What's your favorite memory of us?",
      options: [
        { text: "Our first date", value: 3 },
        { text: "That time we laughed until we cried", value: 5 },
        { text: "Our spontaneous road trip", value: 4 },
        { text: "Every moment with you", value: 10 },
      ],
      correctAnswer: 10, // Value of the correct answer
    },
    {
      question: "What's your ideal date night?",
      options: [
        { text: "Netflix and chill", value: 2 },
        { text: "A fancy dinner", value: 3 },
        { text: "Stargazing in the park", value: 5 },
        { text: "Anything with you", value: 10 },
      ],
      correctAnswer: 10,
    },
    {
      question: "How do you feel when we're apart?",
      options: [
        { text: "I miss you a little", value: 2 },
        { text: "I count down the minutes until we're together", value: 5 },
        { text: "I feel incomplete", value: 7 },
        { text: "I can't live without you", value: 10 },
      ],
      correctAnswer: 10,
    },
    {
      question: "What's your favorite thing about us?",
      options: [
        { text: "Our inside jokes", value: 3 },
        { text: "How we support each other", value: 5 },
        { text: "Our chemistry", value: 7 },
        { text: "Everything", value: 10 },
      ],
      correctAnswer: 10,
    },
  ];

  const handleAnswer = (value) => {
    const isCorrect = value === questions[currentQuestion].correctAnswer;
    setFeedback(isCorrect ? "Correct! 💖" : "Wrong! 😢"); // Set feedback
    setScore(score + value);

    // Move to the next question or show results
    setTimeout(() => {
      setFeedback(null); // Clear feedback after a short delay
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 1000); // 1-second delay before moving to the next question
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
  };

  const getResultMessage = () => {
    if (score <= 15) {
      return "You're still warming up to each other! Keep the love growing. 💕";
    } else if (score <= 30) {
      return "You're a great match! Your love is blooming beautifully. 🌸";
    } else if (score <= 40) {
      return "You're soulmates! Your love is pure magic. ✨";
    } else {
      return "You're a perfect match! Your love is out of this world. 🌌";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-xl border-2 border-pink-200">
        <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">💖 Love Quiz 💖</h1>

        {!showResult ? (
          <div>
            {/* Score Display */}
            <div className="text-xl font-semibold text-pink-700 mb-6">
              Score: {score} / {questions.length * 10}
            </div>

            {/* Current Question */}
            <h2 className="text-2xl font-semibold text-pink-700 mb-6">
              {questions[currentQuestion].question}
            </h2>

            {/* Feedback */}
            {feedback && (
              <div
                className={`text-2xl font-bold mb-6 text-center ${
                  feedback.includes("Correct") ? "text-green-600" : "text-red-600"
                }`}
              >
                {feedback}
              </div>
            )}

            {/* Answer Options */}
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full px-6 py-3 bg-pink-100 text-pink-700 rounded-lg shadow-md hover:bg-pink-200 transition-colors duration-300 text-left"
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Your Love Score: {score} 💝</h2>
            <p className="text-xl text-pink-700 mb-8">{getResultMessage()}</p>
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md"
            >
              Take the Quiz Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoveQuiz;