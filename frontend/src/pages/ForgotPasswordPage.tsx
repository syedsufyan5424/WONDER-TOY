import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Mail, Send } from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';
import { WonderToysNavbar } from '../components/wondertoys/WonderToysNavbar';
import { WonderToysPromoPanel } from '../components/wondertoys/WonderToysPromoPanel';

export const ForgotPasswordPage: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const { success, error: toastError } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      toastError('Please enter your email or mobile number');
      return;
    }

    setSubmitting(true);
    try {
      const res = await api.forgotPassword(emailOrPhone.trim());
      success(res.message || 'Password reset link sent to your registered contact.');
      setSentSuccess(true);
    } catch (err: any) {
      toastError(err.message || 'Error sending reset instructions. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* 1. TOP ANNOUNCEMENT BAR & MAIN NAVIGATION BAR */}
      <WonderToysNavbar />

      {/* 2. TWO-COLUMN AUTHENTICATION SECTION */}
      <main className="flex-1 w-full flex flex-col lg:flex-row">
        {/* LEFT COLUMN: Promotional Artwork Panel */}
        <section className="w-full lg:w-1/2 flex">
          <WonderToysPromoPanel
            headlineLine1="WELCOME BACK TO"
            headlineLine2="THE WORLD OF PLAY!"
            supportingText="Log in to track your orders, view saved favorites, and explore the latest magical toy arrivals."
          />
        </section>

        {/* RIGHT COLUMN: Pure White Background Forgot Password Form */}
        <section className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white">
          <div className="w-full max-w-[380px] sm:max-w-[400px]">
            {/* Form Heading & Subheading */}
            <div className="mb-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-[32px] text-[#0F2444] tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-slate-500 text-xs sm:text-[13px] mt-1.5 font-normal">
                Enter your registered email address or mobile number below, and we'll send you instructions to reset your password.
              </p>
            </div>

            {sentSuccess ? (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm space-y-2.5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Instructions Sent!</span>
                  </div>
                  <p className="text-emerald-800/90 leading-relaxed">
                    We've sent password reset instructions to <strong>{emailOrPhone}</strong>. Please check your inbox or SMS messages.
                  </p>
                  <p className="text-xs text-emerald-700 pt-1">
                    Demo credentials you can also use immediately:<br />
                    <span className="font-mono font-semibold bg-white/80 px-2 py-0.5 rounded border border-emerald-200">
                      customer@toyverse.com / Customer@12345
                    </span>
                  </p>
                </div>

                <Link
                  to="/login"
                  className="w-full h-11 rounded-full bg-[#FF5500] hover:bg-[#E64A00] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all"
                >
                  Return to Log In
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Field: Email or Mobile Number */}
                <div>
                  <label
                    htmlFor="forgot-email"
                    className="block text-slate-800 text-[13px] font-semibold mb-1.5"
                  >
                    Email or Mobile Number
                  </label>
                  <input
                    id="forgot-email"
                    type="text"
                    required
                    placeholder="e.g., alex@example.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:border-[#0F2444] focus:ring-1 focus:ring-[#0F2444] transition-all"
                    autoComplete="username"
                  />
                </div>

                {/* Primary Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full h-11 rounded-full bg-[#FF5500] hover:bg-[#E64A00] text-white font-bold text-xs sm:text-[13px] tracking-wider uppercase shadow-md shadow-orange-500/25 hover:shadow-lg transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>SENDING LINK...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SEND RESET LINK</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Back to Login link */}
            <div className="mt-8 text-center">
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs sm:text-[13px] font-semibold text-slate-600 hover:text-[#0F2444] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Log In</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
