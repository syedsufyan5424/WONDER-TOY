import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Mail, Phone, MapPin, Heart, ArrowRight } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

import { WonderToysLogo } from '../wondertoys/WonderToysLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const { success } = useToast();

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      success('Thank you for subscribing to WonderToys deals!');
      setEmail('');
    }
  };

  return (
    <footer className="bg-white border-t border-slate-200 mt-16 pt-14 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <WonderToysLogo size="md" />
            <p className="text-sm text-slate-500 leading-relaxed pr-6">
              WonderToys is India's premier online toy destination. Thoughtfully curated premium toys designed to inspire, educate, and delight children of all ages.
            </p>

            <div className="pt-2">
              <p className="text-sm font-bold text-slate-800 mb-2">Get toy deals & new arrivals</p>
              <form onSubmit={handleNewsletter} className="flex gap-2 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:border-[#F45A0B]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#F45A0B] hover:bg-[#DD4D06] text-white rounded-full text-sm font-bold transition-colors flex items-center gap-1 shadow-sm"
                >
                  Subscribe
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Column 1: Shop */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-base mb-4">Shop By</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=Action Figures" className="hover:text-[#FF4B6E] transition-colors">
                  Action Figures
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Educational Toys" className="hover:text-[#FF4B6E] transition-colors">
                  Educational Toys
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Remote Control" className="hover:text-[#FF4B6E] transition-colors">
                  Remote Control Cars
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Dolls" className="hover:text-[#FF4B6E] transition-colors">
                  Fashion Dolls
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Building Blocks" className="hover:text-[#FF4B6E] transition-colors">
                  Building Blocks
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Baby Toys" className="hover:text-[#FF4B6E] transition-colors">
                  Baby & Toddler Toys
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-base mb-4">Customer Care</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/faq" className="hover:text-[#FF4B6E] transition-colors">
                  Help & FAQs
                </Link>
              </li>
              <li>
                <Link to="/account/orders" className="hover:text-[#FF4B6E] transition-colors">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-[#FF4B6E] transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-[#FF4B6E] transition-colors">
                  7-Day Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FF4B6E] transition-colors">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company & Policies */}
          <div>
            <h4 className="font-heading font-bold text-slate-900 text-base mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#FF4B6E] transition-colors">
                  About ToyVerse
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-[#FF4B6E] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-[#FF4B6E] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#FF4B6E]" />
                  +91 (080) 4123-8899
                </span>
                <span className="flex items-center gap-1.5 text-slate-600 font-medium mt-1">
                  <Mail className="w-3.5 h-3.5 text-[#FF4B6E]" />
                  support@toyverse.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} ToyVerse India Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>🇮🇳 All prices in Indian Rupees (INR ₹)</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-[#FF4B6E] fill-[#FF4B6E]" /> for Happy Childhoods
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
