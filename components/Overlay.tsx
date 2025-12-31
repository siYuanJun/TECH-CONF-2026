
import React from 'react';

const Overlay: React.FC = () => {
  return (
    <div className="absolute inset-0 z-10 flex flex-col pointer-events-none text-white select-none">
      {/* Header */}
      <header className="p-8 flex justify-between items-center w-full">
        <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-full blur-sm animate-pulse" />
          NEXUS 2026
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium tracking-widest pointer-events-auto uppercase text-blue-200/60">
          <a href="#" className="hover:text-blue-400 transition-colors">Vision</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Speakers</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Tickets</a>
          <a href="#" className="hover:text-blue-400 transition-colors">Log In</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col justify-center items-center px-8 text-center">
        <div className="max-w-4xl">
          <h2 className="text-blue-400 text-xs md:text-sm font-bold tracking-[0.3em] uppercase mb-4 animate-fade-in">
            Infinite Connectivity • Intelligent Future
          </h2>
          <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
            THE NEXT <br /> <span className="text-blue-500">DIMENSION</span>
          </h1>
          <p className="text-blue-100/40 max-w-lg mx-auto mb-12 text-sm md:text-base leading-relaxed">
            Join 5,000+ developers, designers, and visionaries for the most significant 
            technological shift of the decade. Live in Tokyo & Virtual.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center pointer-events-auto">
            <button className="px-8 py-4 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-blue-400 hover:text-white transition-all duration-300">
              Register Now
            </button>
            <button className="px-8 py-4 border border-white/20 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300">
              Explore Agenda
            </button>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      <footer className="p-8 flex flex-col md:flex-row justify-between items-end md:items-center gap-4 text-[10px] tracking-widest uppercase text-white/30">
        <div>
          SEPTEMBER 12-14, 2026 / SHIBUYA DIVE, TOKYO
        </div>
        <div className="flex gap-8">
          <span>TICKETS REMAINING: 412</span>
          <span>EST. 2026</span>
        </div>
      </footer>
    </div>
  );
};

export default Overlay;
