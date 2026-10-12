import React from 'react';
import { Sparkles, ShieldCheck, Heart, Award, Users } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="text-xs font-bold text-[#FF4B6E] uppercase tracking-wider">Our Story</span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Inspiring Play, Learning & Endless Joy
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          ToyVerse was founded with a singular conviction: toys aren’t just entertainment — they are the building blocks of childhood imagination, problem solving, and confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-50 text-[#FF4B6E] flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Child-Safe Materials</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Every toy sold on ToyVerse conforms to BIS (Bureau of Indian Standards) and international EN71 non-toxic certifications.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Curated STEM Focus</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            From early cognitive puzzles to robotics engineering, our toys promote real-world analytical and creative milestones.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-heading font-bold text-lg text-slate-900">Loved by 50,000+ Families</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Delivering across 19,000+ Indian pin codes with express packaging, quick 7-day returns, and friendly support.
          </p>
        </div>
      </div>
    </div>
  );
};
