import React, { useEffect, useState, useRef } from 'react';
import SampleImage from './assets/gg.png';
import loginImg from './assets/login.png';
import mainImg from './assets/main.png';
import copyImg from './assets/copy.png';
import linkImg from './assets/link.png';
import { ShoppingCart, DownloadCloud, Send } from 'lucide-react';


const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Downloads', id: 'downloads' },
  { name: 'Contact', id: 'contact' },
  { name: 'Guide', id: 'guide' },
];


function App() {
  // --- Authentication State ---
  const [user, setUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'
  const [authError, setAuthError] = useState('');
  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authConfirm, setAuthConfirm] = useState('');

  // Simple in-memory user store for demo
  const usersRef = useRef({});

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    const username = authUsername.trim();
    const password = authPassword;
    if (!username || !password) {
      setAuthError('Please enter username and password.');
      return;
    }
    if (!usersRef.current[username]) {
      setAuthError('User not found. Please register.');
      return;
    }
    if (usersRef.current[username] !== password) {
      setAuthError('Incorrect password.');
      return;
    }
    setUser({ username });
    setAuthModalOpen(false);
    setAuthError('');
    setAuthUsername('');
    setAuthPassword('');
    setAuthConfirm('');
  };

  // Handle signup
  const handleSignup = (e) => {
    e.preventDefault();
    const username = authUsername.trim();
    const password = authPassword;
    const confirm = authConfirm;
    if (!username || !password || !confirm) {
      setAuthError('Please fill all fields.');
      return;
    }
    if (password !== confirm) {
      setAuthError('Passwords do not match.');
      return;
    }
    if (usersRef.current[username]) {
      setAuthError('Username already exists.');
      return;
    }
    usersRef.current[username] = password;
    setAuthError('Account created! You can now login.');
    setAuthMode('login');
    setAuthPassword('');
    setAuthConfirm('');
  };

  // Optional: handle logout (if you want to add a logout button)
  const handleLogout = () => {
    setUser(null);
  };
  // Refs for each section
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSubscription, setShowSubscription] = useState(false);
  const features = [
    'Responsive UI',
    'Easy to use',
    'Real-time analytics',
    'Priority support',
    'Secure & Reliable',
    'Regular updates',
  ];

  const subscriptions = [
    {
      duration: 'Basic',
      months: '1 Month',
      price: '$4.99',
      color: 'bg-white text-gray-900',
      btn: 'bg-blue-500 hover:bg-blue-600 text-white',
      badge: null,
    },
    {
      duration: 'Standard',
      months: '3 Months',
      price: '$12.99',
      color: 'bg-blue-500 text-white',
      btn: 'bg-white text-blue-600 hover:bg-blue-100',
      badge: 'Best Value',
    },
    {
      duration: 'Premium',
      months: '6 Months',
      price: '$22.99',
      color: 'bg-blue-900 text-white',
      btn: 'bg-blue-500 hover:bg-blue-600 text-white',
      badge: null,
    },
    {
      duration: 'Gold Premier',
      months: '1 Year',
      price: '$39.99',
      color: 'bg-yellow-400 text-gray-900',
      btn: 'bg-gray-900 text-yellow-400 hover:bg-yellow-300',
      badge: null,
    },
  ];

  const slides = [
    { image: loginImg, caption: 'Step 1: Open the ECU App and Log In' },
    { image: mainImg, caption: 'Step 2: Rename the dancer, right click for renaming' },
    { image: copyImg, caption: 'Click copy link icon and enter it in tiktok studio via (Link)' },
    { image: linkImg, caption: 'Step 4: Connect now to live without (@) username only' },
    { image: linkImg, caption: 'Step 4: Connect now to live without (@) username only' },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Track current section index for fullpage scroll
  const [sectionIndex, setSectionIndex] = useState(0);

  // Scroll to section when sectionIndex changes
  useEffect(() => {
    if (sectionRefs.current[sectionIndex]) {
      sectionRefs.current[sectionIndex].scrollIntoView({ behavior: 'auto' });
    }
    setActiveSection(navItems[sectionIndex].id);
  }, [sectionIndex]);

  // Wheel/touch event handler for fullpage scroll
  useEffect(() => {
    let lastScroll = 0;
    let touchStartY = null;
    const handleWheel = (e) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScroll < 700) return; // debounce
      lastScroll = now;
      if (e.deltaY > 0 && sectionIndex < navItems.length - 1) {
        setSectionIndex((i) => Math.min(i + 1, navItems.length - 1));
      } else if (e.deltaY < 0 && sectionIndex > 0) {
        setSectionIndex((i) => Math.max(i - 1, 0));
      }
    };
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e) => {
      if (touchStartY === null) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) < 50) return;
      if (diff > 0 && sectionIndex < navItems.length - 1) {
        setSectionIndex((i) => Math.min(i + 1, navItems.length - 1));
      } else if (diff < 0 && sectionIndex > 0) {
        setSectionIndex((i) => Math.max(i - 1, 0));
      }
      touchStartY = null;
    };
    const container = document.getElementById('fullpage-container');
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [sectionIndex]);

  return (
    <div id="fullpage-container" className="min-h-screen bg-gray-950 text-white relative overflow-hidden scroll-smooth" style={{ height: '100vh', scrollbarWidth: 'none', msOverflowStyle: 'none', overscrollBehavior: 'none' }}>
      {/* Custom animation CSS moved to App.css */}

      <nav className="fixed top-4 left-4 z-50 flex gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full shadow-xl border border-white/10 text-xs sm:text-sm md:text-base">
        {navItems.map(({ name, id }, idx) => (
          <button
            key={id}
            onClick={() => setSectionIndex(idx)}
            className={`relative font-medium cursor-pointer transition group capitalize whitespace-nowrap bg-transparent border-none outline-none p-0 ${
              activeSection === id ? 'text-indigo-400' : 'text-white'
            }`}
            style={{ background: 'none' }}
          >
            {name}
            <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
          </button>
        ))}
      </nav>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl border border-white/10">
        {/* Login/Register or Profile */}
        {user ? (
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-md hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400"
              onClick={() => alert(`Profile: ${user.username}`)}
              title={user.username}
            >
              <span className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-lg font-extrabold shadow border-2 border-white/20 animate-bounce">
                {user.username.slice(0,2).toUpperCase()}
              </span>
              <span className="hidden sm:inline-block font-semibold tracking-wide animate-fadeInUp">{user.username}</span>
            </button>
          </div>
        ) : (
          <>
            <button
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold shadow-md hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-pink-400 animate-popIn"
              onClick={() => { setAuthModalOpen(true); setAuthMode('login'); }}
            >
              Login
            </button>
            <button
              className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold shadow-md hover:scale-105 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 animate-popIn"
              onClick={() => { setAuthModalOpen(true); setAuthMode('signup'); }}
            >
              Register
            </button>
          </>
        )}
        <ShoppingCart className="w-5 h-5 text-white animate-bounce" />
        <button
          className="text-white font-medium hover:text-pink-400 transition text-sm sm:text-base px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-pink-400"
          onClick={() => setShowSubscription(true)}
        >
          Shop
        </button>
      </div>
      {/* Subscription Modal */}
      {showSubscription && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="relative bg-black rounded-2xl shadow-2xl border border-gray-800 p-8 w-full max-w-6xl mx-4 animate-popIn">
            {/* ...existing subscription modal content... */}
          </div>
        </div>
      )}
      {/* Auth Modal */}
      {authModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-indigo-900/90 via-pink-900/80 to-purple-900/90 animate-fadeIn">
          <div className="relative bg-gradient-to-br from-gray-900 via-indigo-900 to-pink-900 rounded-3xl shadow-2xl border-4 border-pink-400/30 p-10 w-full max-w-md mx-4 animate-popIn flex flex-col items-center">
            <button
              className="absolute top-4 right-4 text-white bg-pink-500 hover:bg-pink-700 rounded-full p-2 shadow-lg transition"
              onClick={() => { setAuthModalOpen(false); setAuthError(''); setAuthUsername(''); setAuthPassword(''); setAuthConfirm(''); setAuthMode('login'); }}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-3xl font-extrabold text-white mb-6 text-center tracking-wider animate-bounce">
              {authMode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </h2>
            <form onSubmit={authMode === 'login' ? handleLogin : handleSignup} className="space-y-5 w-full">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-pink-300 font-semibold">Username</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg bg-gray-800 border-2 border-pink-400/30 text-white focus:ring-2 focus:ring-pink-400 transition-all" value={authUsername} onChange={e => setAuthUsername(e.target.value)} autoFocus />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-pink-300 font-semibold">Password</label>
                <input type="password" className="w-full px-4 py-2 rounded-lg bg-gray-800 border-2 border-pink-400/30 text-white focus:ring-2 focus:ring-pink-400 transition-all" value={authPassword} onChange={e => setAuthPassword(e.target.value)} />
              </div>
              {authMode === 'signup' && (
                <div className="flex flex-col gap-1">
                  <label className="text-sm text-pink-300 font-semibold">Confirm Password</label>
                  <input type="password" className="w-full px-4 py-2 rounded-lg bg-gray-800 border-2 border-pink-400/30 text-white focus:ring-2 focus:ring-pink-400 transition-all" value={authConfirm} onChange={e => setAuthConfirm(e.target.value)} />
                </div>
              )}
              {authError && <div className="text-pink-400 text-sm text-center animate-pulse">{authError}</div>}
              <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 hover:from-indigo-500 hover:to-pink-500 text-white font-extrabold shadow-lg transition-all text-lg tracking-wider animate-fadeInUp">
                {authMode === 'login' ? 'Login' : 'Register'}
              </button>
            </form>
            <div className="mt-6 text-center">
              {authMode === 'login' ? (
                <span className="text-pink-200 text-sm">Don't have an account?{' '}
                  <button className="text-pink-400 hover:underline font-bold animate-bounce" onClick={() => { setAuthMode('signup'); setAuthError(''); setAuthPassword(''); setAuthConfirm(''); }}>Register</button>
                </span>
              ) : (
                <span className="text-indigo-200 text-sm">Already have an account?{' '}
                  <button className="text-indigo-400 hover:underline font-bold animate-bounce" onClick={() => { setAuthMode('login'); setAuthError(''); setAuthPassword(''); setAuthConfirm(''); }}>Login</button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Animation CSS removed from JSX. Add to App.css instead. */}

      <div className="fixed right-2 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3">
        {navItems.map(({ id }) => (
          <div
            key={id}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              activeSection === id ? 'bg-indigo-400 scale-125 shadow-lg animate-pulse' : 'bg-gray-600'
            }`}
          ></div>
        ))}
      </div>

      {navItems.map(({ id, name }, idx) => {
        let sectionContent;
        if (id === 'home') {
          sectionContent = (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
              <div className="flex flex-col justify-center max-w-lg text-center md:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white whitespace-nowrap overflow-hidden border-r-2 border-white animate-typing">
                  Welcome to ECU
                </h1>
                <p className="text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed">
                  This app is for TikTok live counter and many featured tools to help creators monitor engagement, track performance, and enhance their live streaming experience in real-time.
                </p>
              </div>
              <div className="w-full max-w-sm sm:max-w-md md:max-w-xl">
                <img
                  src={SampleImage}
                  alt="ECU App"
                  className="w-full h-auto object-contain rounded-2xl shadow-2xl border border-gray-800"
                />
              </div>
            </div>
          );
        } else if (id === 'guide') {
          sectionContent = (
            <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 px-4 sm:px-8 py-12" style={{minHeight:'70vh'}}>
              {/* Left: Image slider with border */}
              <div className="flex flex-col items-center justify-center flex-1">
                <div className="relative" style={{width:'480px',height:'320px',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-indigo-100 text-indigo-500 rounded-full shadow p-2 transition border border-indigo-200"
                    style={{left:'-36px'}}
                    aria-label="Previous"
                  >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
                  </button>
                  <div className="rounded-2xl shadow-xl p-2 w-full h-full flex items-center justify-center bg-transparent">
                    <img
                      src={slides[currentSlide].image}
                      alt={slides[currentSlide].caption}
                      className="w-full h-full object-contain rounded-xl transition-all duration-700"
                    />
                  </div>
                  <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-indigo-100 text-indigo-500 rounded-full shadow p-2 transition border border-indigo-200"
                    style={{right:'-36px'}}
                    aria-label="Next"
                  >
                    <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
                <div className="mt-4 flex justify-center gap-2">
                  {slides.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === i ? 'bg-pink-500 scale-125' : 'bg-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
              {/* Right: Headline and subheadline, white background, shadow, rounded */}
              <div className="flex-1 flex flex-col items-center md:items-start justify-center">
                <div className="w-full rounded-2xl px-8 py-10 md:px-12 md:py-16 bg-transparent shadow-xl">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 leading-tight text-left md:text-left drop-shadow-md">
                    Convenient operation,<br/>accurate statistics, and fast response
                  </h2>
                  <div className="text-lg sm:text-xl text-white font-medium mt-2 text-left md:text-left drop-shadow">
                  </div>
                </div>
              </div>
            </div>
          );
        } else if (id === 'about') {
          sectionContent = (
            <div className="max-w-3xl text-center space-y-6 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400">About the ECU App</h2>
              <p className="text-gray-300 text-base sm:text-lg">
                ECU App is your all-in-one dashboard for monitoring TikTok Live performance. Designed for creators, by creators — we believe in real-time insights that are beautiful, powerful, and easy to use.
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                Whether you're hosting a live stream, tracking your followers, or analyzing your engagement, ECU gives you intuitive tools to see it all happen live.
              </p>
              <p className="text-gray-400 text-sm sm:text-base">
                With sleek visuals, live updates, and a smooth experience across devices, ECU App helps you level up your livestream strategy and connect better with your fans.
              </p>
            </div>
          );
        } else if (id === 'downloads') {
          sectionContent = (
            <div className="max-w-3xl text-center space-y-8 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-pink-400">Download ECU App</h2>
              <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto">
                Ready to take control of your TikTok live experience? Download the ECU App now and elevate your stream!
              </p>
              <a
                href="/ECU App Setup 1.0.0.exe"
                download
                className="inline-flex items-center gap-3 px-6 py-3 sm:px-8 sm:py-3 bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-semibold rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-all text-sm sm:text-base"
              >
                <DownloadCloud className="w-5 h-5" />
                Download Now
              </a>
              <p className="text-xs sm:text-sm text-gray-500">Version 1.0.0 • Windows Installer</p>
            </div>
          );
        } else if (id === 'contact') {
          sectionContent = (
            <div className="w-full max-w-xl mx-auto text-center space-y-8 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400">Get in Touch</h2>
              <form
                action="https://formspree.io/f/xqkrvopv"
                method="POST"
                className="space-y-6 text-left bg-white/5 p-6 rounded-xl shadow-xl border border-white/10 backdrop-blur"
              >
                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">Your Name</label>
                  <input type="text" name="name" required className="px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white" />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">Your Email</label>
                  <input type="email" name="email" required className="px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white" />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm text-gray-300 mb-1">Message</label>
                  <textarea name="message" rows="4" required className="px-4 py-2 rounded-md bg-gray-900 border border-gray-700 text-white" />
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-full transition-all"
                >
                  <Send className="w-4 h-4" />
                  Send Message
                </button>
              </form>
            </div>
          );
        } else {
          sectionContent = (
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Welcome to {name} tab</h2>
          );
        }
        return (
          <section
            key={id}
            id={id}
            ref={el => sectionRefs.current[idx] = el}
            className={`min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 scroll-mt-20 relative overflow-hidden`}
            style={{ height: '100vh' }}
          >
            {/* Section radiant background */}
            <div
              className={
                `absolute inset-0 w-full h-full z-0 pointer-events-none select-none transition-all duration-700` +
                (id === 'home'
                  ? ' bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900'
                  : id === 'about'
                  ? ' bg-gradient-to-tr from-gray-900 via-gray-800 to-pink-900'
                  : id === 'downloads'
                  ? ' bg-gradient-to-tl from-gray-900 via-gray-800 to-blue-900'
                  : id === 'contact'
                  ? ' bg-gradient-to-bl from-gray-900 via-gray-800 to-green-900'
                  : id === 'guide'
                  ? ' bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900'
                  : ' bg-gray-950')
              }
              aria-hidden="true"
            ></div>
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
              {sectionContent}
            </div>
          </section>
        );
      })}

      <footer className="py-10 text-center text-gray-600 text-xs sm:text-sm">
        © 2025 ECU App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
