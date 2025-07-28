import React, { useEffect, useState } from 'react';
import SampleImage from './assets/gg.png';
import { ShoppingCart, DownloadCloud, Send } from 'lucide-react';
import { Link } from 'react-scroll';

const navItems = [
  { name: 'Home', id: 'home' },
  { name: 'About', id: 'about' },
  { name: 'Downloads', id: 'downloads' },
  { name: 'Contact', id: 'contact' },
  { name: 'Guide', id: 'guide' },
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [fade, setFade] = useState(false);

  const slides = [
    { image: '/images/login.png', caption: 'Step 1: Open the ECU App and Log In' },
    { image: '/images/main.png', caption: 'Step 2: Rename the dancer, right click for renaming' },
    { image: '/images/copy.png', caption: 'Click copy link icon and enter it in tiktok studio via (Link)' },
    { image: '/images/link.png', caption: 'Step 4: Connect now to live without (@) username only' },
  ];

  const nextSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setFade(false);
    }, 300);
  };

  const prevSlide = () => {
    setFade(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setFade(false);
    }, 300);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      const current = navItems.find(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return false;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        return scrollY >= top && scrollY < top + height;
      });
      if (current) setActiveSection(current.id);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden scroll-smooth">
      <style>
        {`body::-webkit-scrollbar { display: none; } body { scrollbar-width: none; }`}
      </style>

      <nav className="fixed top-4 left-4 z-50 flex gap-3 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full shadow-xl border border-white/10 text-xs sm:text-sm md:text-base">
        {navItems.map(({ name, id }) => (
          <Link
            key={id}
            to={id}
            smooth
            duration={600}
            className={`relative font-medium cursor-pointer transition group capitalize whitespace-nowrap ${
              activeSection === id ? 'text-indigo-400' : 'text-white'
            }`}
          >
            {name}
            <span className="absolute left-1/2 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-pink-400 transition-all duration-300 group-hover:w-full group-hover:left-0 rounded-full"></span>
          </Link>
        ))}
      </nav>

      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-full shadow-xl border border-white/10">
        <ShoppingCart className="w-5 h-5 text-white" />
        <button className="text-white font-medium hover:text-indigo-400 transition text-sm sm:text-base">Shop</button>
      </div>

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

      {navItems.map(({ id, name }) => (
        <section
          key={id}
          id={id}
          className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 scroll-mt-20"
        >
          {id === 'home' ? (
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
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
          ) : id === 'guide' ? (
            <div className="w-full max-w-5xl mx-auto text-center relative px-4 sm:px-6 py-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-indigo-400 mb-8">App Guide</h2>
              <div className="relative h-[32rem] sm:h-[36rem] md:h-[40rem] flex items-center justify-center">
                <button
                  onClick={prevSlide}
                  className="absolute left-0 -translate-x-full z-10 bg-black/60 text-white p-2 sm:p-3 rounded-full hover:bg-black/80 transition"
                >
                  ◀
                </button>
                <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                  <img
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].caption}
                    className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-2xl ${fade ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setFade(false)}
                  />
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/60 px-4 py-2 rounded-full text-sm">
                    {slides[currentSlide].caption}
                  </div>
                </div>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 translate-x-full z-10 bg-black/60 text-white p-2 sm:p-3 rounded-full hover:bg-black/80 transition"
                >
                  ▶
                </button>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                {slides.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      currentSlide === i ? 'bg-pink-500 scale-125' : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          ) : id === 'about' ? (
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
          ) : id === 'downloads' ? (
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
          ) : id === 'contact' ? (
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
          ) : (
            <h2 className="text-3xl sm:text-4xl font-bold text-white">Welcome to {name} tab</h2>
          )}
        </section>
      ))}

      <footer className="py-10 text-center text-gray-600 text-xs sm:text-sm">
        © 2025 ECU App. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
