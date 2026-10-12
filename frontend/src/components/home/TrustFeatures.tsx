import React from 'react';
import { Truck, RotateCcw, ShieldCheck, Award } from 'lucide-react';

const trustItems = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders above ₹999',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '7-day return policy',
    bgColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: '100% secure checkout',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
  },
  {
    icon: Award,
    title: 'Best Quality',
    description: 'Trusted & Safe Toys',
    bgColor: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
];

export const TrustFeatures: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {trustItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
            >
              <div
                className={`w-12 h-12 rounded-2xl ${item.bgColor} ${item.iconColor} flex items-center justify-center flex-shrink-0 shadow-inner`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-slate-800 text-sm sm:text-base leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
