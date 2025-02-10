"use client";
import React, { useState, useRef, useEffect } from 'react';

function HomePage() {
  const [isPlaying, setIsPlaying] = useState(false); // Start with music paused
  const [hoveredSection, setHoveredSection] = useState(null);
  const audioRef = useRef(null); // Reference to the audio element
  const [isFirstInteraction, setIsFirstInteraction] = useState(true); // Track first interaction

  // Handle play/pause logic
  const toggleMusic = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause(); // Pause the music
      } else {
        try {
          await audioRef.current.play(); // Play the music
        } catch (error) {
          console.error("Error playing audio:", error);
        }
      }
      setIsPlaying(!isPlaying); // Toggle the state
    }
  };

  // Handle first user interaction
  const handleFirstInteraction = async () => {
    if (isFirstInteraction) {
      try {
        await audioRef.current.play(); // Play the music on first interaction
        setIsPlaying(true);
        setIsFirstInteraction(false); // Mark that the first interaction has happened
      } catch (error) {
        console.error("Error playing audio on first interaction:", error);
      }
    }
  };

  // Ensure audio is loaded and ready
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load(); // Preload the audio
    }
  }, []);

  const specialNavItems = [
    { href: '/love_letter', text: 'Love Letter', icon: '✍️' },
    { href: '/miss_u', text: 'Miss You', icon: '🥹' },
    { href: '/special', text: 'Another message', icon: '🎁' },
    { href: '/forever', text: 'Forever Yours', icon: '🌙' },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-100 flex flex-col items-center justify-center p-8 cursor-heart"
      onClick={handleFirstInteraction} // Trigger on any click in the container
    >
      {/* Welcome Message */}
      <div className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-red-600 mb-6">
          Happy Valentine&apos;s Day! 💝
        </h1>
        <p className="text-2xl md:text-3xl text-pink-700 font-light">
          To our love and friendship
        </p>
      </div>

      {/* Special Features Navigation */}
      <div
        className="w-full max-w-5xl transition-transform duration-300"
        onMouseEnter={() => setHoveredSection('special')}
        onMouseLeave={() => setHoveredSection(null)}
      >
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
          Card made with ❤️
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specialNavItems.map((item, index) => (
            <NavButton
              key={`special-${index}`}
              href={item.href}
              text={item.text}
              icon={item.icon}
              delay={(specialNavItems.length + index) * 0.1}
              special={true}
              dimmed={hoveredSection === 'main'}
            />
          ))}
        </div>
      </div>

      {/* Music Toggle */}
      <button
        onClick={toggleMusic}
        className="fixed bottom-8 right-8 p-5 rounded-full bg-white/90 backdrop-blur-sm 
          shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        aria-label="Toggle Music"
      >
        <span className="text-3xl">{isPlaying ? '🎵' : '🔇'}</span>
      </button>

      {/* Audio Element */}
      <audio ref={audioRef} loop>
        <source src="/love_song.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

function NavButton({ href, text, icon, delay, special, dimmed }) {
  return (
    <a
      href={href}
      className={`
        p-8 rounded-2xl shadow-md hover:shadow-xl
        transform hover:-translate-y-2 transition-all duration-300
        text-lg font-semibold text-center
        flex flex-col items-center justify-center gap-4
        ${special 
          ? 'bg-gradient-to-br from-red-50 to-pink-50 hover:from-red-100 hover:to-pink-100 border-2 border-red-200'
          : 'bg-white hover:bg-pink-50 border-2 border-pink-200'
        }
        ${dimmed ? 'opacity-50' : 'opacity-100'}
        animate-fade-in-up
      `}
      style={{
        animationDelay: `${delay}s`,
        animationFillMode: 'forwards'
      }}
    >
      <span className="text-4xl">{icon}</span>
      <span className={`${special ? 'text-red-600' : 'text-pink-600'}`}>{text}</span>
    </a>
  );
}

export default HomePage;