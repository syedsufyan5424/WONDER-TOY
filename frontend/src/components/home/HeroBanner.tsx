import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';

interface BannerSlide {
  id: number;
  word1: string;
  word1Color: string;
  word2: string;
  word2Color: string;
  word3: string;
  word3Color: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  tagline: string;
  bgGradient: string;
  imageUrl: string;
}

const slides: BannerSlide[] = [
  {
    id: 1,
    word1: 'Play.',
    word1Color: 'text-[#8B5CF6]', // Purple
    word2: 'Learn.',
    word2Color: 'text-[#F59E0B]', // Amber/Yellow
    word3: 'Grow.',
    word3Color: 'text-[#10B981]', // Teal/Green
    subtitle: 'Discover the best toys for every age. Fun, safe and educational.',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    tagline: '★ Top Rated by 50,000+ Indian Parents',
    bgGradient: 'from-purple-50 via-pink-50 to-amber-50/40',
    // Happy young kid hugging golden teddy bear and car matching reference image 1
    imageUrl: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    word1: 'Flat 30% Off',
    word1Color: 'text-[#FF4B6E]',
    word2: 'Educational',
    word2Color: 'text-[#0284C7]',
    word3: 'Toys.',
    word3Color: 'text-[#F59E0B]',
    subtitle: 'Build brilliant problem solvers with robotics, puzzles & STEM learning kits.',
    ctaText: 'Explore Deals',
    ctaLink: '/shop?category=Educational Toys',
    tagline: 'Limited Time Festival Offer',
    bgGradient: 'from-amber-50 via-rose-50 to-blue-50',
    imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 3,
    word1: 'Fast & Furious',
    word1Color: 'text-[#EF4444]',
    word2: 'Remote',
    word2Color: 'text-[#8B5CF6]',
    word3: 'Control Cars.',
    word3Color: 'text-[#0284C7]',
    subtitle: 'High speed monster trucks, drift racers & stunt vehicles starting at just ₹899.',
    ctaText: 'View RC Collection',
    ctaLink: '/shop?category=Remote Control',
    tagline: 'Up to 40% Off on Top RC Models',
    bgGradient: 'from-blue-50 via-indigo-50 to-pink-50',
    imageUrl: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=1000&q=80',
  },
];

export const HeroBanner: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-8">
      {/* Hero Card Container matching Reference Image Screen 1 */}
      <div className={`relative rounded-4xl bg-gradient-to-r ${slide.bgGradient} overflow-hidden border border-slate-100 shadow-sm transition-all duration-700 min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] flex items-center`}>
        {/* Playful Floating Shapes / Stars */}
        <div className="absolute top-8 left-12 text-amber-300 opacity-70 animate-bounce pointer-events-none">
          <Star className="w-6 h-6 fill-amber-300 text-amber-300" />
        </div>
        <div className="absolute top-20 right-1/2 text-pink-300 opacity-60 pointer-events-none">
          <Sparkles className="w-5 h-5 text-pink-400" />
        </div>
        <div className="absolute bottom-12 left-1/3 text-purple-300 opacity-50 pointer-events-none">
          <Star className="w-4 h-4 fill-purple-300 text-purple-300" />
        </div>

        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 lg:p-14 z-10">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-5 text-left">
            {/* Tagline pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-slate-200/60 text-xs font-bold text-slate-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#FF4B6E] animate-ping"></span>
              {slide.tagline}
            </div>

            {/* Bouncy colorful heading matching reference */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight">
              <span className={`${slide.word1Color} mr-2.5`}>{slide.word1}</span>
              <span className={`${slide.word2Color} mr-2.5`}>{slide.word2}</span>
              <br className="hidden sm:inline" />
              <span className={`${slide.word3Color}`}>{slide.word3}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-600 text-base sm:text-lg max-w-lg leading-relaxed">
              {slide.subtitle}
            </p>

            {/* CTA Button */}
            <div className="pt-2">
              <Link
                to={slide.ctaLink}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-base shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/35 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
              >
                {slide.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Hero Image (kid with teddy and toy) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-64 sm:w-80 lg:w-96 aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform hover:scale-[1.02] transition-transform">
              <img
                src={slide.imageUrl}
                alt="Happy kid playing with toys"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Carousel Next/Prev Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-105 z-20"
          aria-label="Previous banner"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md backdrop-blur-sm transition-all hover:scale-105 z-20"
          aria-label="Next banner"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Dots Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === idx ? 'w-8 bg-[#FF4B6E]' : 'w-2.5 bg-slate-300/80 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
