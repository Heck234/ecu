import React, { useRef, useState, useEffect } from 'react';

const LightbulbRope = () => {
  const bulbRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [y, setY] = useState(50); // vertical position
  const [darkMode, setDarkMode] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  const threshold = 100; // how far to pull down before theme toggles
  const topOffset = 50;  // resting Y position
  const xOffset = 24;    // distance from right edge

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!dragging) return;

      const newY = Math.min(e.clientY, 300);
      setY(newY);
    };

    const handleMouseUp = () => {
      if (dragging) {
        setDragging(false);

        if (y - topOffset > threshold) {
          toggleTheme();
        }

        // Bounce effect
        setIsBouncing(true);
        setY(topOffset);
        setTimeout(() => setIsBouncing(false), 300);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, y]);

  const right = 24;

  return (
    <>
      {/* Rope with realistic pattern */}
      <svg className="fixed top-0 left-0 pointer-events-none z-10" width="100%" height="100%">
        <defs>
          <pattern id="rope-pattern" width="6" height="6" patternUnits="userSpaceOnUse">
            <path d="M 0 6 Q 3 0 6 6" stroke="#888" strokeWidth="1" fill="none" />
          </pattern>
        </defs>

        <path
          d={`M ${window.innerWidth - right} 0 Q ${window.innerWidth - right + 20} ${y / 2}, ${window.innerWidth - right} ${y + 24}`}
          stroke="url(#rope-pattern)"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          filter="drop-shadow(0 0 2px rgba(0,0,0,0.2))"
        />
      </svg>

      {/* Bulb */}
      <div
        ref={bulbRef}
        onMouseDown={() => setDragging(true)}
        onClick={() => {
          if (!dragging) toggleTheme();
        }}
        className={`fixed z-50 cursor-pointer select-none transition-transform duration-300 ease-out ${
          isBouncing ? 'animate-bounce' : ''
        }`}
        style={{
          top: y,
          right: right,
        }}
      >
        <div
          className={`w-12 h-12 rounded-full border-4 flex items-center justify-center text-2xl transition-all shadow-md
            ${darkMode
              ? 'bg-yellow-400 border-yellow-600'
              : 'bg-gray-300 border-gray-500'
            }`}
        >
          💡
        </div>
      </div>
    </>
  );
};

export default LightbulbRope;
