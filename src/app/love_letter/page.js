"use client";
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'

function LoveLetter() {
  const [isUnwrapped, setIsUnwrapped] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const audioRef = useRef(null); // Ref for the audio element

  const letterContent = `AAs the stars light up the night sky, my thoughts are drawn to you, the brightest light in my life. Though miles may stretch between us, my heart knows no distance. Every beat whispers your name, a constant reminder of the love that binds us.

Your smile is my sunrise, your laughter my favorite melody. Even in your absence, I feel your presence in the quiet moments, as if the universe conspires to keep you close to me. I cherish the memories we’ve made and dream of the moments yet to come.

No matter where life takes us, know this: my love for you is unwavering, a flame that distance cannot dim. You are my forever, my always, and my everything.`;

  // Typing effect
  useEffect(() => {
    if (isUnwrapped && !isTyping) {
      setIsTyping(true);
      let index = 0;
      const timer = setInterval(() => {
        if (index < letterContent.length) {
          setDisplayedText((prev) => prev + letterContent.charAt(index));
          index++;
        } else {
          clearInterval(timer);
          setIsTyping(false);
          if (audioRef.current) {
            audioRef.current.pause(); // Stop the audio when typing is done
          }
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [isUnwrapped]);

  // Play sound effect when letter is opened
  useEffect(() => {
    if (isUnwrapped) {
      const audio = new Audio('/letter_opening.mp3'); // Add a sound file
      audio.play();

      // Start the typing sound loop
      if (audioRef.current) {
        audioRef.current.loop = true; // Loop the audio
        audioRef.current.play();
      }
    }
  }, [isUnwrapped]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-red-50 flex items-center justify-center p-4">
      {/* Audio element for the typing sound */}
      <audio ref={audioRef} src="/typewriter.mp3" preload="auto" />

      <div className="max-w-2xl w-full">
        {!isUnwrapped ? (
          // Unopened letter (folded paper effect)
          <div
            className="bg-red-100 p-8 rounded-lg shadow-lg cursor-pointer transform transition-transform hover:scale-105 relative"
            onClick={() => setIsUnwrapped(true)}
          >
            <div className="absolute -top-4 -left-4 text-4xl text-pink-600">💌</div>
            <div className="absolute -bottom-4 -right-4 text-4xl text-pink-600">💖</div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-red-600 mb-4">💌 A Special Letter For You</h2>
              <p className="text-pink-700">Click to unwrap</p>
            </div>
          </div>
        ) : (
          // Opened letter
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 text-4xl text-pink-600 animate-float">💝</div>
            <div className="absolute -bottom-6 -right-6 text-4xl text-pink-600 animate-float-delay">💕</div>

            {/* Letter content */}
            <div className="bg-white p-8 rounded-lg shadow-xl border-2 border-pink-200 transform transition-transform duration-500 ease-in-out">
              <div className="font-handwriting text-lg text-pink-900 min-h-[400px] leading-relaxed">
                {displayedText}
                {isTyping && (
                  <span className="ml-1 animate-pulse">|</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Return button */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors duration-300 shadow-md"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoveLetter;