import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

export const PromoBanner: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="relative rounded-4xl bg-gradient-to-r from-sky-100 via-pink-100 to-amber-100 p-8 sm:p-12 overflow-hidden border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Floating playful shapes */}
        <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-pink-200/40 blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-44 h-44 rounded-full bg-blue-200/40 blur-2xl pointer-events-none"></div>

        {/* Content */}
        <div className="relative z-10 max-w-xl text-left space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 text-xs font-bold text-[#FF4B6E]">
            <Sparkles className="w-3.5 h-3.5" />
            Special Weekly Highlight
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
            Flat <span className="text-[#FF4B6E]">30% Off</span> on Educational Toys
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Power their curious minds with hands-on STEM challenges, magnetic puzzles, and interactive problem-solving kits.
          </p>
          <div className="pt-2">
            <Link
              to="/shop?category=Educational Toys"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-md shadow-pink-500/25 hover:shadow-lg transition-all"
            >
              Shop Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Visual Image */}
        <div className="relative z-10 w-64 sm:w-80 aspect-video rounded-3xl overflow-hidden shadow-lg border-2 border-white flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80"
            alt="Educational toys discount"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};
