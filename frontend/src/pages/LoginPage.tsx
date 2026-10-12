import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { WonderToysNavbar } from '../components/wondertoys/WonderToysNavbar';
import { WonderToysPromoPanel } from '../components/wondertoys/WonderToysPromoPanel';
import { OtpModal } from '../components/wondertoys/OtpModal';

export const LoginPage: React.FC = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('syedsufyanmehdi991@gmail.com');
  const [password, setPassword] = useState('Syed@123');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showDemoCredentials, setShowDemoCredentials] = useState(false);

  const { isAuthenticated, login } = useAuth();
  const { success, error: toastError, info } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirectParam = searchParams.get('redirect');
  const redirectPath = (location.state as any)?.from || redirectParam || '/';
  const isFromCheckout = redirectPath.includes('checkout');

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, redirectPath, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      toastError('Please enter your email or mobile number');
      return;
    }
    if (!password) {
      toastError('Please enter your password');
      return;
    }

    setSubmitting(true);
    try {
      await login({
        email: emailOrPhone.trim(),
        password,
      });
      navigate(redirectPath);
    } catch (err: any) {
      // toast error is dispatched in AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleClick = () => {
    info('Google OAuth provider: Please configure GOOGLE_CLIENT_ID in .env for live OAuth.');
  };

  const handleFacebookClick = () => {
    info('Facebook Login provider: Please configure FACEBOOK_APP_ID in .env for live OAuth.');
  };

  const fillCustomerDemo = () => {
    setEmailOrPhone('customer@toyverse.com');
    setPassword('Customer@12345');
    success('Filled demo customer credentials');
  };

  const fillAdminDemo = () => {
    setEmailOrPhone('admin@toyverse.com');
    setPassword('Admin@12345');
    success('Filled demo admin credentials');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* 1. TOP NAVBAR (Logo on Left, Wishlist | Home | Help | Cart on Right) */}
      <WonderToysNavbar />

      {/* 2. TWO-COLUMN SPLIT SECTION (50% MINT / 50% WARM WOODGRAIN) */}
      <main className="flex-1 w-full flex flex-col lg:flex-row">
        {/* LEFT COLUMN: Mint Pastel Enchanted Promo Panel (~50%) */}
        <section className="w-full lg:w-1/2 flex">
          <WonderToysPromoPanel
            headlineLine1="WELCOME BACK TO THE"
            headlineLine2="ENCHANTED WORLD OF PLAY!"
            supportingText="Start your journey back to the enchanted toys and action, representing all connected to the short, thoughts and moments of play."
          />
        </section>

        {/* RIGHT COLUMN: Warm Cream Woodgrain Background with Floating Login Card (~50%) */}
        <section
          className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-10 lg:p-12 relative overflow-hidden"
          style={{
            backgroundColor: '#F6EFE6',
          }}
        >
          {/* Subtle Vertical Wood Grain Texture Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.16]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 600 800"
            preserveAspectRatio="none"
          >
            <g stroke="#9C7A5B" strokeWidth="1" fill="none">
              <path d="M 40 0 C 45 250, 35 550, 42 800" />
              <path d="M 90 0 C 85 200, 95 600, 88 800" />
              <path d="M 140 0 C 145 300, 138 500, 142 800" />
              <path d="M 190 0 C 188 180, 192 620, 190 800" />
              <path d="M 240 0 C 244 260, 236 540, 242 800" />
              <path d="M 290 0 C 286 210, 294 590, 290 800" />
              <path d="M 340 0 C 345 320, 338 520, 342 800" />
              <path d="M 390 0 C 388 190, 392 610, 390 800" />
              <path d="M 440 0 C 445 270, 436 530, 442 800" />
              <path d="M 490 0 C 486 220, 494 580, 490 800" />
              <path d="M 540 0 C 544 310, 538 510, 542 800" />
            </g>
          </svg>

          {/* FLOATING LOGIN CARD */}
          <div className="w-full max-w-[430px] bg-[#FAF7F2] rounded-[30px] p-8 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#ECE3D5]/80 relative z-10">
            {/* Heading: Log In */}
            <div className="mb-6">
              <h1 className="font-heading font-bold text-2xl sm:text-[28px] text-[#111827] tracking-tight">
                Log In
              </h1>
            </div>

            {/* Contextual Notice if redirected from checkout */}
            {isFromCheckout && (
              <div className="mb-5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
                <span className="text-base">🛒</span>
                <div>
                  <p className="font-bold text-slate-800">Sign in to complete checkout</p>
                  <p className="text-[11px] text-amber-700">Your items are safe in the cart.</p>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Field 1: Email or Mobile Number */}
              <div>
                <label
                  htmlFor="emailOrPhone"
                  className="block text-[#374151] text-[13px] font-medium mb-1.5"
                >
                  Email or Mobile Number
                </label>
                <input
                  id="emailOrPhone"
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-[#C5D5E8] bg-[#E8F0FE] text-[#1E293B] placeholder-slate-400 text-sm focus:outline-none focus:border-[#94A3B8] transition-all"
                  autoComplete="username"
                />
              </div>

              {/* Field 2: Password with Eye Toggle */}
              <div>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-4 pr-11 rounded-full border border-[#C5D5E8] bg-[#E8F0FE] text-[#1E293B] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#94A3B8] transition-all"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#64748B] hover:text-[#334155] p-1 focus:outline-none cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me and Forgot Password Row */}
              <div className="flex items-center justify-between pt-1 text-[13px]">
                <label className="flex items-center gap-2 cursor-pointer select-none text-[#374151]">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-[#C34923] accent-[#C34923] cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>

                <Link
                  to="/forgot-password"
                  className="text-[#1E293B] hover:text-black underline font-medium transition-colors"
                >
                  Forgot Password
                </Link>
              </div>

              {/* Primary Action Button: LOG IN */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-full bg-[#C34923] hover:bg-[#B03E1B] active:bg-[#9E3414] text-white font-bold text-sm tracking-wider uppercase transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>LOGGING IN...</span>
                    </>
                  ) : (
                    'LOG IN'
                  )}
                </button>
              </div>
            </form>

            {/* Divider: or sign in with */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D1D5DB]" />
              </div>
              <span className="relative bg-[#FAF7F2] px-3.5 text-xs sm:text-[13px] text-[#4B5563] font-normal">
                or sign in with
              </span>
            </div>

            {/* Social Buttons: Google, Facebook, OTP */}
            <div className="grid grid-cols-3 gap-2.5">
              {/* Google Button */}
              <button
                type="button"
                onClick={handleGoogleClick}
                className="h-10 px-3 rounded-full border border-[#4B5563]/70 hover:border-[#1F2937] bg-transparent hover:bg-white text-[#1F2937] text-[13px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                Google
              </button>

              {/* Facebook Button */}
              <button
                type="button"
                onClick={handleFacebookClick}
                className="h-10 px-3 rounded-full border border-[#4B5563]/70 hover:border-[#1F2937] bg-transparent hover:bg-white text-[#1F2937] text-[13px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                Facebook
              </button>

              {/* OTP Button */}
              <button
                type="button"
                onClick={() => setShowOtpModal(true)}
                className="h-10 px-3 rounded-full border border-[#4B5563]/70 hover:border-[#1F2937] bg-transparent hover:bg-white text-[#1F2937] text-[13px] font-semibold flex items-center justify-center transition-colors cursor-pointer"
              >
                OTP
              </button>
            </div>

            {/* Signup Link */}
            <p className="mt-7 text-center text-[13px] text-[#374151]">
              New to WonderToys?{' '}
              <Link
                to="/register"
                state={{ from: redirectPath }}
                className="font-bold text-[#111827] hover:underline transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>

          {/* Quick Demo Credentials for Developer Testing */}
          <div className="mt-4 text-center z-10">
            <button
              type="button"
              onClick={() => setShowDemoCredentials(!showDemoCredentials)}
              className="text-[11px] text-stone-500 hover:text-stone-700 transition-colors cursor-pointer"
            >
              🔑 Demo test accounts
            </button>

            {showDemoCredentials && (
              <div className="mt-2 p-3 rounded-xl bg-white/80 border border-stone-200 text-left space-y-2 text-xs shadow-xs max-w-[360px]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-700">Customer Account</p>
                    <p className="text-[11px] text-slate-500">customer@toyverse.com / Customer@12345</p>
                  </div>
                  <button
                    type="button"
                    onClick={fillCustomerDemo}
                    className="px-2 py-0.5 rounded bg-orange-100 hover:bg-orange-200 text-[#C34923] text-[11px] font-bold"
                  >
                    Fill
                  </button>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-stone-200">
                  <div>
                    <p className="font-bold text-slate-700">Admin Account</p>
                    <p className="text-[11px] text-slate-500">admin@toyverse.com / Admin@12345</p>
                  </div>
                  <button
                    type="button"
                    onClick={fillAdminDemo}
                    className="px-2 py-0.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-700 text-[11px] font-bold"
                  >
                    Fill
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* OTP Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSuccess={() => navigate(redirectPath)}
      />
    </div>
  );
};
