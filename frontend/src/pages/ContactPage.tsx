import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ContactPage: React.FC = () => {
  const { success } = useToast();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    success('Message dispatched to ToyVerse support team! We reply within 24 hours.');
    setSent(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left space-y-10">
      <div className="text-center max-w-xl mx-auto">
        <span className="text-xs font-bold text-[#FF4B6E] uppercase tracking-wider">Help & Support</span>
        <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 mt-1">
          We’d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">Questions about an order, toy safety, or partnership?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-lg text-slate-900">ToyVerse Customer Care</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our support team is available Monday to Saturday, 9:00 AM to 7:00 PM IST.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3 text-slate-700">
              <Phone className="w-4 h-4 text-[#FF4B6E] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Toll Free Phone</strong>
                <span>+91 (080) 4123-8899 / 1800-TOY-VERSE</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700">
              <Mail className="w-4 h-4 text-[#FF4B6E] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Email Address</strong>
                <span>support@toyverse.com</span>
              </div>
            </div>

            <div className="flex items-start gap-3 text-slate-700">
              <MapPin className="w-4 h-4 text-[#FF4B6E] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Headquarters</strong>
                <span>Tower 4, Mindspace Tech Park, HITEC City, Hyderabad, Telangana - 500081</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you for reaching out. One of our toy specialists will respond to your email shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syed Ahmed"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="text"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Message *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="How can we assist you with toys or your order?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
