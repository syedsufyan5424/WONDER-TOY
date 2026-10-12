import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, ArrowRight, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAuthenticated, isAdmin, loading, demoLoginAdmin } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-[#FF4B6E] animate-spin" />
        <p className="text-xs font-semibold text-slate-500">Verifying administrator credentials...</p>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    const handleQuickLogin = async () => {
      setLoggingIn(true);
      try {
        await demoLoginAdmin();
      } catch (err) {
        console.error('Failed to log in as demo admin', err);
      } finally {
        setLoggingIn(false);
      }
    };

    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FF4B6E]/20 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-purple-600/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Icon */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#FF4B6E] to-purple-600 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-pink-500/20 text-white">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl text-white tracking-tight">
            Admin Access Required
          </h2>
          <p className="text-xs text-slate-400 mt-2 leading-relaxed">
            An active administrator authorization token is required to manage coupons, products, orders, and store inventory.
          </p>

          <div className="mt-6 space-y-3">
            <button
              onClick={handleQuickLogin}
              disabled={loggingIn}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FF4B6E] to-rose-600 hover:from-[#E11D48] hover:to-rose-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all disabled:opacity-50 cursor-pointer"
            >
              {loggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Admin Token...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  ⚡ 1-Click Login as ToyVerse Admin
                </>
              )}
            </button>

            <button
              onClick={() => navigate('/login', { state: { from: location.pathname } })}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              Log in with credentials
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigate('/')}
              className="w-full py-2.5 px-4 rounded-2xl text-slate-500 hover:text-slate-400 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
