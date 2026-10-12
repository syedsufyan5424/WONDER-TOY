import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Heart, Star, Sparkles } from 'lucide-react';

export const WonderToysBenefitsStrip: React.FC = () => {
  const benefits = [
    {
      icon: <span className="text-lg">🌱</span>,
      lucideIcon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      title: '100% Safe & Non-Toxic',
      subtitle: 'Certified child-safe materials',
    },
    {
      icon: <span className="text-lg">🚚</span>,
      lucideIcon: <Truck className="w-4 h-4 text-[#F45A0B]" />,
      title: 'Fast Delivery',
      subtitle: 'Free shipping over ₹999',
    },
    {
      icon: <span className="text-lg">🔄</span>,
      lucideIcon: <RotateCcw className="w-4 h-4 text-blue-600" />,
      title: 'Easy 30-Day Returns',
      subtitle: 'Hassle-free guarantee',
    },
    {
      icon: <span className="text-lg">⭐</span>,
      lucideIcon: <Star className="w-4 h-4 text-amber-500 fill-amber-400" />,
      title: 'Loved by Parents',
      subtitle: 'Rated 4.8/5 across India',
    },
  ];

  return (
    <div className="w-full bg-white border-t border-slate-100 py-4 sm:py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-center gap-2 text-slate-800 text-xs sm:text-sm font-semibold select-none"
            >
              <div className="flex-shrink-0 flex items-center justify-center">
                {item.icon}
              </div>
              <span className="tracking-tight whitespace-nowrap text-slate-800">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
