"use client";
import React, { useState } from 'react';
import { Calendar, Heart, Coffee, Star, Music, Camera, Plane } from 'lucide-react';

const timelineEvents = [
  {
    id: 1,
    title: "First Meeting",
    date: "March 15, 2023",
    icon: Heart,
    story: "Our eyes met across the crowded café. You were reading my favorite book, and I couldn't help but start a conversation.",
    color: "bg-pink-500"
  },
  {
    id: 2,
    title: "First Date",
    date: "March 28, 2023",
    icon: Coffee,
    story: "We spent hours at that little coffee shop, talking about everything and nothing. Time seemed to stand still.",
    color: "bg-blue-500"
  },
  {
    id: 3,
    title: "First Concert Together",
    date: "April 15, 2023",
    icon: Music,
    story: "Dancing under the stars to our favorite band. I'll never forget how you knew every word to every song.",
    color: "bg-purple-500"
  },
  {
    id: 4,
    title: "Beach Trip",
    date: "June 3, 2023",
    icon: Camera,
    story: "That perfect weekend getaway. Watching the sunset together made me realize this was something special.",
    color: "bg-orange-500"
  },
  {
    id: 5,
    title: "First Vacation",
    date: "August 12, 2023",
    icon: Plane,
    story: "Exploring a new city together, getting lost in the streets, and finding the most amazing hidden restaurants.",
    color: "bg-green-500"
  },
  {
    id: 6,
    title: "The Proposal",
    date: "December 24, 2023",
    icon: Plane ,
    story: "Under the Christmas lights, with snow falling gently around us, you made me the happiest person alive.",
    color: "bg-red-500"
  }
];

const Timeline = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleEventClick = (event) => {
    setIsAnimating(true);
    setSelectedEvent(event);
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
        Our Love Story
      </h1>

      {/* Timeline */}
      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            className={`relative mb-8 ${index % 2 === 0 ? 'left-timeline' : 'right-timeline'}`}
          >
            <div 
              className={`
                flex items-center w-full cursor-pointer
                transform transition-transform duration-300 hover:scale-105
                ${index % 2 === 0 ? 'justify-end pr-8' : 'justify-start pl-8'}
              `}
              onClick={() => handleEventClick(event)}
            >
              <div className={`
                relative p-6 rounded-lg shadow-lg bg-white
                max-w-md transition-all duration-300
                ${selectedEvent?.id === event.id ? 'scale-105' : ''}
              `}>
                <div className={`
                  absolute ${index % 2 === 0 ? '-right-12' : '-left-12'}
                  top-1/2 transform -translate-y-1/2
                  w-10 h-10 rounded-full ${event.color} flex items-center justify-center
                  shadow-lg
                `}>
                  <event.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-1">{event.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{event.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Story Modal */}
      {selectedEvent && (
        <div className={`
          fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4
          transition-opacity duration-300
          ${isAnimating ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className="bg-white rounded-lg p-8 max-w-lg w-full transform transition-transform duration-300">
            <div className="flex items-center mb-4">
              <selectedEvent.icon className={`w-8 h-8 ${selectedEvent.color.replace('bg-', 'text-')}`} />
              <h3 className="text-2xl font-bold ml-3">{selectedEvent.title}</h3>
            </div>
            <p className="text-gray-600 mb-4">{selectedEvent.date}</p>
            <p className="text-gray-800 text-lg leading-relaxed mb-6">{selectedEvent.story}</p>
            <img 
              src={`/api/placeholder/400/300`}
              alt={selectedEvent.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <button 
              onClick={() => setSelectedEvent(null)}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;