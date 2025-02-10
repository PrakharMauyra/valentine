"use client";
import React, { useState, useEffect, useRef } from "react";
import { Heart } from "lucide-react";
import Image from "next/image";

// Bubble Hearts Utility
const random = {
  uniformDiscrete: (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min,
};

const TributePage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const canvasRef = useRef(null);
  const bubbleHeartsRef = useRef(null);
  const heartImageRef = useRef(null);

  useEffect(() => {
    setIsLoaded(true);
    setTimeout(() => setShowMessage(true), 1000);

    // Ensure this code runs only on the client side
    if (typeof window !== "undefined") {
      const requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        ((fn) => setTimeout(fn, 16));

      function createRender(image, canvas, context) {
        const zoomInStage = random.uniformDiscrete(89, 91) / 100;
        const zoomInRest = 1 - zoomInStage;
        const basicScale =
          (random.uniformDiscrete(45, 60) + random.uniformDiscrete(45, 60)) / 100;

        const getScale = (lifespan) => {
          if (lifespan > zoomInStage) {
            return (
              Math.max(((1 - lifespan) / zoomInRest).toFixed(2), 0.1) * basicScale
            );
          } else {
            return basicScale;
          }
        };

        const basicRotate = random.uniformDiscrete(-30, 30);
        const getRotate = () => basicRotate;

        const offset = 10;
        const basicTranslateX =
          canvas.width / 2 + random.uniformDiscrete(-offset, offset);
        const amplitude =
          (canvas.width -
            Math.sqrt(Math.pow(image.width, 2) + Math.pow(image.height, 2))) /
            2 -
          offset;
        const wave =
          random.uniformDiscrete(amplitude * 0.8, amplitude) *
          (random.uniformDiscrete(0, 1) ? 1 : -1);
        const frequency = random.uniformDiscrete(250, 400);

        const getTranslateX = (lifespan) => {
          if (lifespan > zoomInStage) {
            return basicTranslateX;
          } else {
            return (
              basicTranslateX +
              wave * Math.sin((frequency * (zoomInStage - lifespan) * Math.PI) / 180)
            );
          }
        };

        const getTranslateY = (lifespan) => {
          return image.height / 2 + (canvas.height - image.height / 2) * lifespan;
        };

        const fadeOutStage = random.uniformDiscrete(14, 18) / 100;
        const getAlpha = (lifespan) => {
          if (lifespan > fadeOutStage) {
            return 1;
          } else {
            return 1 - ((fadeOutStage - lifespan) / fadeOutStage).toFixed(2);
          }
        };

        return (lifespan) => {
          if (lifespan >= 0) {
            context.save();
            let scale = getScale(lifespan);
            let rotate = getRotate(lifespan);
            let translateX = getTranslateX(lifespan);
            let translateY = getTranslateY(lifespan);

            context.translate(translateX, translateY);
            context.scale(scale, scale);
            context.rotate((rotate * Math.PI) / 180);
            context.globalAlpha = getAlpha(lifespan);

            context.drawImage(
              image,
              -image.width / 2,
              -image.height / 2,
              image.width,
              image.height
            );

            context.restore();
          } else {
            return true;
          }
        };
      }

      class BubbleHearts {
        constructor(canvas, context) {
          this.canvas = canvas;
          this.context = context;
          this._children = [];

          const animate = () => {
            requestAnimationFrame(animate);
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            let index = 0;
            let length = this._children.length;

            while (index < length) {
              let child = this._children[index];
              if (
                child.render.call(
                  null,
                  (child.timestamp + child.duration - new Date()) / child.duration
                )
              ) {
                this._children.splice(index, 1);
                length--;
              } else {
                index++;
              }
            }
          };

          requestAnimationFrame(animate);
        }

        bubble(image, duration = random.uniformDiscrete(2400, 3600)) {
          const render = createRender(image, this.canvas, this.context);
          this._children.push({
            render,
            duration,
            timestamp: +new Date(),
          });

          return this;
        }
      }

      // Initialize canvas and BubbleHearts instance
      if (canvasRef.current && !bubbleHeartsRef.current) {
        const canvas = canvasRef.current;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "1000";
        document.body.appendChild(canvas);

        const context = canvas.getContext("2d");
        bubbleHeartsRef.current = new BubbleHearts(canvas, context);

        // Load heart image
        heartImageRef.current = new Image();
        heartImageRef.current.src =
          'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" fill="red"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
      }
    }
  }, []);

  const handleSendLove = () => {
    if (bubbleHeartsRef.current && heartImageRef.current) {
      for (let i = 0; i < 10; i++) {
        bubbleHeartsRef.current.bubble(heartImageRef.current);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <canvas ref={canvasRef} />

      <div
        className={`
          max-w-4xl w-full
          transition-all duration-1000
          ${
            isLoaded
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform translate-y-10"
          }
        `}
      >
        <div className="relative mx-auto w-64 h-64 md:w-80 md:h-80 mb-8">
          <div className="absolute inset-0 rounded-full border-4 border-pink-300 animate-spin-slow" />
          <div
            className="absolute inset-0 rounded-full border-4 border-purple-300 animate-spin-reverse-slow"
            style={{ animationDelay: "-2s" }}
          />

          <div className="absolute inset-2 rounded-full overflow-hidden bg-white shadow-xl">
            <Image
              src="/img1.jpeg"
              alt="Special Someone"
              width={320}
              height={320}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div
          className={`
            text-center space-y-6 transition-all duration-1000 delay-500
            ${
              showMessage
                ? "opacity-100 transform translate-y-0"
                : "opacity-0 transform translate-y-10"
            }
          `}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            My Treasure ✨
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            In your smile, I see everything beautiful in this world. Every
            moment with you is a treasure I hold dear to my heart.
          </p>

          <button
            onClick={handleSendLove}
            className="mt-8 px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            aria-label="Send Love"
          >
            Send Love ❤️
          </button>
        </div>
      </div>

      <div className="absolute top-0 left-0 p-8">
        <Heart className="text-red-400" size={32} />
      </div>
      <div className="absolute top-0 right-0 p-8" />
      <div className="absolute bottom-0 left-0 p-8" />
      <div className="absolute bottom-0 right-0 p-8">
        <Heart className="text-darkred-400" size={32} />
      </div>
    </div>
  );
};

export default TributePage;