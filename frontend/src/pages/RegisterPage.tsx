import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { WonderToysNavbar } from '../components/wondertoys/WonderToysNavbar';
import { WonderToysPromoPanel } from '../components/wondertoys/WonderToysPromoPanel';
import { OtpModal } from '../components/wondertoys/OtpModal';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);

  const { isAuthenticated, register } = useAuth();
  const { error: toastError, info } = useToast();
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

    if (!name.trim()) {
      toastError('Please enter your full name');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      toastError('Please enter a valid email address');
      return;
    }
    if (password.length < 6) {
      toastError('Password must be at least 6 characters long');
      return;
    }
    if (!agreeTerms) {
      toastError('Please accept the Terms & Conditions to proceed');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800">
      {/* 1. TOP NAVBAR (Logo on Left, Wishlist | Home | Help | Cart on Right) */}
      <WonderToysNavbar />

      {/* 2. TWO-COLUMN SPLIT SECTION (50% MINT / 50% WARM WOODGRAIN) */}
      <main className="flex-1 w-full flex flex-col lg:flex-row">
        {/* LEFT COLUMN: Mint Pastel Enchanted Promo Panel (~50%) */}
        <section className="w-full lg:w-1/2 flex">
          <WonderToysPromoPanel
            headlineLine1="WELCOME TO THE"
            headlineLine2="ENCHANTED WORLD OF PLAY!"
            supportingText="Join our magical community to explore the newest toy wonders, track orders, and celebrate endless moments of play."
          />
        </section>

        {/* RIGHT COLUMN: Warm Cream Woodgrain Background with Floating Signup Card (~50%) */}
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

          {/* FLOATING SIGNUP CARD */}
          <div className="w-full max-w-[430px] bg-[#FAF7F2] rounded-[30px] p-7 sm:p-9 shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#ECE3D5]/80 relative z-10">
            {/* Heading: Sign Up */}
            <div className="mb-5">
              <h1 className="font-heading font-bold text-2xl sm:text-[28px] text-[#111827] tracking-tight">
                Sign Up
              </h1>
            </div>

            {/* Contextual Notice if redirected from checkout */}
            {isFromCheckout && (
              <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
                <span className="text-base">🛒</span>
                <div>
                  <p className="font-bold text-slate-800">Create an account to checkout</p>
                  <p className="text-[11px] text-amber-700">Your items are waiting in the cart.</p>
                </div>
              </div>
            )}

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Field 1: Full Name */}
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-[#374151] text-[13px] font-medium mb-1"
                >
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  placeholder="e.g. Syed Sufyan Mehdi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-[#C5D5E8] bg-[#E8F0FE] text-[#1E293B] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#94A3B8] transition-all"
                  autoComplete="name"
                />
              </div>

              {/* Field 2: Email Address */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-[#374151] text-[13px] font-medium mb-1"
                >
                  Email Address
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-[#C5D5E8] bg-[#E8F0FE] text-[#1E293B] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#94A3B8] transition-all"
                  autoComplete="email"
                />
              </div>

              {/* Field 3: Mobile Number (Optional) */}
              <div>
                <label
                  htmlFor="signup-phone"
                  className="block text-[#374151] text-[13px] font-medium mb-1"
                >
                  Mobile Number
                </label>
                <input
                  id="signup-phone"
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-4 rounded-full border border-[#C5D5E8] bg-[#E8F0FE] text-[#1E293B] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#94A3B8] transition-all"
                  autoComplete="tel"
                />
              </div>

              {/* Field 4: Password with Eye Toggle */}
              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-[#374151] text-[13px] font-medium mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 px-4 pr-11 rounded-full border border-[#C5D5E8] bg-[#E8F0FE] text-[#1E293B] placeholder-[#94A3B8] text-sm focus:outline-none focus:border-[#94A3B8] transition-all"
                    autoComplete="new-password"
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

              {/* Terms & Conditions Checkbox */}
              <div className="pt-1 text-[13px]">
                <label className="flex items-start gap-2 cursor-pointer select-none text-[#374151]">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-slate-300 text-[#C34923] accent-[#C34923] cursor-pointer"
                  />
                  <span className="text-xs sm:text-[13px]">
                    I agree to the{' '}
                    <Link to="/policy/terms" className="text-[#1E293B] hover:text-black underline font-medium">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link to="/policy/privacy" className="text-[#1E293B] hover:text-black underline font-medium">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Primary Action Button: SIGN UP */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-full bg-[#C34923] hover:bg-[#B03E1B] active:bg-[#9E3414] text-white font-bold text-sm tracking-wider uppercase transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  {submitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>CREATING ACCOUNT...</span>
                    </>
                  ) : (
                    'SIGN UP'
                  )}
                </button>
              </div>
            </form>

            {/* Divider: or sign up with */}
            <div className="relative my-5 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D1D5DB]" />
              </div>
              <span className="relative bg-[#FAF7F2] px-3.5 text-xs sm:text-[13px] text-[#4B5563] font-normal">
                or sign up with
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

            {/* Existing Account Link */}
            <p className="mt-6 text-center text-[13px] text-[#374151]">
              Already have an account?{' '}
              <Link
                to="/login"
                state={{ from: redirectPath }}
                className="font-bold text-[#111827] hover:underline transition-colors"
              >
                Log In
              </Link>
            </p>
          </div>
        </section>
      </main>

      {/* OTP Verification Modal */}
      <OtpModal
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSuccess={() => navigate(redirectPath)}
      />
    </div>
  );
};
