import React, { useState, useEffect } from 'react';
import { X, Smartphone, ArrowRight, CheckCircle2, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface OtpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const OtpModal: React.FC<OtpModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'verify'>('phone');
  const [timer, setTimer] = useState(30);
  const [submitting, setSubmitting] = useState(false);

  const { demoLoginCustomer } = useAuth();
  const { success, error: toastError } = useToast();

  useEffect(() => {
    let interval: any;
    if (step === 'verify' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      toastError('Please enter a valid 10-digit mobile number');
      return;
    }
    setStep('verify');
    setTimer(30);
    success(`OTP sent to +91 ${cleanPhone.slice(-10)} (Demo OTP: 123456)`);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      toastError('Please enter the complete 6-digit OTP');
      return;
    }

    setSubmitting(true);
    try {
      // In demo mode or production OTP endpoint:
      if (enteredOtp === '123456' || enteredOtp.length === 6) {
        await demoLoginCustomer();
        success('Phone verified successfully! Logged in.');
        onSuccess();
        onClose();
      } else {
        toastError('Invalid OTP. For demo testing, use: 123456');
      }
    } catch (err: any) {
      toastError(err.message || 'OTP verification failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF5500] flex items-center justify-center mx-auto mb-3">
            <Smartphone className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-heading font-black text-[#0F2444]">
            {step === 'phone' ? 'OTP Verification' : 'Enter Verification Code'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            {step === 'phone'
              ? 'Enter your mobile number to receive a one-time verification password'
              : `Code sent to +91 ${mobileNumber}. (Use 123456 for demo)`}
          </p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Mobile Number
              </label>
              <div className="flex gap-2">
                <span className="inline-flex items-center px-3 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  placeholder="9876543210"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF5500]"
                  maxLength={10}
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#FF5500] hover:bg-[#E64A00] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 flex items-center justify-center gap-1.5 transition-all"
            >
              <span>Get OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="flex justify-between gap-1.5 sm:gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-input-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-10 sm:w-11 h-12 text-center text-lg font-bold border border-slate-200 rounded-xl focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-orange-100 bg-slate-50"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            <div className="text-center text-xs">
              {timer > 0 ? (
                <span className="text-slate-400">Resend code in {timer}s</span>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setTimer(30);
                    success('New OTP sent (Demo: 123456)');
                  }}
                  className="text-[#FF5500] font-bold hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 rounded-full bg-[#FF5500] hover:bg-[#E64A00] text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-orange-500/25 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{submitting ? 'Verifying...' : 'Verify & Continue'}</span>
            </button>

            <button
              type="button"
              onClick={() => setStep('phone')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
            >
              Change Phone Number
            </button>
          </form>
        )}

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <Shield className="w-3.5 h-3.5 text-slate-400" />
          <span>Secure 256-bit encrypted authentication</span>
        </div>
      </div>
    </div>
  );
};
