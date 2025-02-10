"use client";
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import Confetti from 'react-confetti';

const MissYouPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [isHeartBeating, setIsHeartBeating] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track if the component is on the client

  const message = "II miss your smile, your voice, your presence. Every moment apart feels incomplete. I can't wait to meet you again.";

  // Typewriter effect
  useEffect(() => {
    setIsVisible(true);
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length-1) {
        setTypedText((prev) => prev + message[index]);
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, [message]);

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const future = new Date(now.getTime() + (7 * 24 * 60 * 60 * 1000));
      const diff = future - now;

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle heart click
  const handleHeartClick = () => {
    setIsHeartBeating(true);
    setShowConfetti(true);
    setTimeout(() => setIsHeartBeating(false), 2000);
    setTimeout(() => setShowConfetti(false), 5000);
    setShowMessage(true);
  };

  // Set isClient to true after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-red-900 text-white relative overflow-hidden">
      {/* Confetti (only render on client) */}
      {isClient && showConfetti && <Confetti />}

      {/* Falling Hearts Background (only render on client) */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            >
              <Heart
                className="text-pink-500 opacity-30"
                size={16 + Math.random() * 16}
                style={{
                  color: `rgba(255, ${Math.random() * 100}, ${Math.random() * 100}, 0.7)`
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className={`
        max-w-2xl mx-auto p-8 pt-16
        transition-opacity duration-1000
        ${isVisible ? 'opacity-100' : 'opacity-0'}
      `}>
        {/* Opening Text */}
        <h1 className="text-3xl md:text-4xl text-center font-light mb-12 animate-pulse">
          Every second without you feels like a lifetime...
        </h1>

        {/* Typed Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <p className="text-lg md:text-xl leading-relaxed">
            {typedText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* Interactive Heart */}
        <div className="text-center mb-8">
          <button
            onClick={handleHeartClick}
            className="relative inline-block"
          >
            <Heart
              className={`
                w-24 h-24 text-red-500
                transition-transform duration-200
                ${isHeartBeating ? 'scale-150' : 'hover:scale-110'}
              `}
              fill="currentColor"
            />
            <span className="block mt-2 text-sm">Touch to Feel My Heartbeat</span>
          </button>
          {showMessage && (
            <p className="mt-4 text-lg animate-fade-in">
              This is how my heart feels when I think of you.
            </p>
          )}
        </div>

        {/* Reply Button */}
        <div className="text-center">
          <button
            onClick={() => {
              const phoneNumber = '9517190601'; // Replace with the recipient's phone number
              window.open(`https://web.whatsapp.com/send/?phone=${phoneNumber}&text=I+miss+you+too&type=phone_number&app_absent=0`, '_blank');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full transition-colors duration-300"
          >
            Send Me a Message ✉️
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissYouPage;