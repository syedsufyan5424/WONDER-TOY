import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    q: 'How long does delivery take across India?',
    a: 'We ship all orders via BlueDart, Delhivery, and India Post Speed Post. Metros (Mumbai, Delhi, Bengaluru, Hyderabad, Chennai) typically receive delivery in 2-3 business days. Tier 2 and Tier 3 cities receive orders in 4-6 business days.',
  },
  {
    q: 'What is the minimum order for Free Shipping?',
    a: 'All orders with a subtotal value of ₹999 and above qualify for Free Express Shipping. For orders below ₹999, a flat delivery fee of ₹99 applies.',
  },
  {
    q: 'What is your 7-Day Return & Replacement policy?',
    a: 'If your toy arrives damaged, defective, or with missing parts, simply initiate a return from your account within 7 days of delivery. We provide hassle-free doorstep pickup and free replacement or instant refund.',
  },
  {
    q: 'Are all toys safe and non-toxic?',
    a: 'Yes, 100%. All toys in our catalog strictly comply with BIS (IS 9873) and EN71 safety regulations, ensuring BPA-free plastics, lead-free non-toxic paints, and smooth child-safe finishes.',
  },
  {
    q: 'What payment options are supported?',
    a: 'We support all major payment modes including Razorpay, UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).',
  },
  {
    q: 'How do I use promo coupons like TOY20 or WELCOME10?',
    a: 'During checkout on the Cart or Checkout page, type your coupon code into the "Enter coupon code" field and click "Apply". The discount is immediately deducted from your subtotal.',
  },
];

export const FAQPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-8">
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-[#FF4B6E] uppercase tracking-wider">Help Center</span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Everything you need to know about ToyVerse orders, returns, and delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden transition-all"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 flex items-center justify-between text-left font-heading font-bold text-sm sm:text-base text-slate-900 hover:text-[#FF4B6E] transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#FF4B6E]' : ''}`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 pt-2">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
