import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  Plus,
  Edit2,
  CreditCard,
  Smartphone,
  Banknote,
  Sparkles,
  Lock,
  LogIn,
  UserPlus,
  ArrowRight,
  ChevronLeft,
  MapPin,
  Building2,
  Wallet,
  ShieldCheck,
  Calendar,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { IAddress } from '../types';
import { api } from '../services/api';

/* --- Razorpay & UPI Vector Assets --- */
const RazorpayLogo: React.FC = () => (
  <div className="flex items-center gap-1 select-none flex-shrink-0">
    <svg className="w-4 h-4 text-[#0C8CE9]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M14.5 2L6 13.5h5.5L8.5 22 18 10.5h-5.5L14.5 2z" />
    </svg>
    <div className="flex items-baseline font-black italic tracking-tight text-sm">
      <span className="text-[#0C2340]">Razor</span>
      <span className="text-[#0C8CE9]">pay</span>
    </div>
  </div>
);

const UpiLogo: React.FC = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M6 18l6-12h4l-6 12H6z" fill="#097939" />
    <path d="M12 18l6-12h4l-6 12h-4z" fill="#ED7D31" />
  </svg>
);

const GooglePayLogo: React.FC = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

const PhonePeLogo: React.FC = () => (
  <div className="w-6 h-6 rounded-full bg-[#5F259F] flex items-center justify-center text-white font-bold text-xs leading-none shadow-xs">
    पे
  </div>
);

const PaytmLogo: React.FC = () => (
  <div className="px-1.5 py-0.5 rounded bg-[#002970] text-[#00BAF2] font-black text-[10px] tracking-tight leading-none">
    Paytm
  </div>
);

const QRCodeSVG: React.FC = () => (
  <svg viewBox="0 0 110 110" className="w-28 h-28 text-slate-900" fill="currentColor">
    {/* Top Left Finder Pattern */}
    <rect x="5" y="5" width="28" height="28" rx="3" fill="currentColor" />
    <rect x="9" y="9" width="20" height="20" rx="2" fill="white" />
    <rect x="13" y="13" width="12" height="12" rx="1.5" fill="currentColor" />

    {/* Top Right Finder Pattern */}
    <rect x="77" y="5" width="28" height="28" rx="3" fill="currentColor" />
    <rect x="81" y="9" width="20" height="20" rx="2" fill="white" />
    <rect x="85" y="13" width="12" height="12" rx="1.5" fill="currentColor" />

    {/* Bottom Left Finder Pattern */}
    <rect x="5" y="77" width="28" height="28" rx="3" fill="currentColor" />
    <rect x="9" y="81" width="20" height="20" rx="2" fill="white" />
    <rect x="13" y="85" width="12" height="12" rx="1.5" fill="currentColor" />

    {/* Timing Patterns */}
    <rect x="37" y="9" width="4" height="4" />
    <rect x="45" y="9" width="4" height="4" />
    <rect x="53" y="9" width="4" height="4" />
    <rect x="61" y="9" width="4" height="4" />
    <rect x="69" y="9" width="4" height="4" />

    <rect x="9" y="37" width="4" height="4" />
    <rect x="9" y="45" width="4" height="4" />
    <rect x="9" y="53" width="4" height="4" />
    <rect x="9" y="61" width="4" height="4" />
    <rect x="9" y="69" width="4" height="4" />

    {/* Data Cells */}
    <rect x="37" y="17" width="4" height="4" />
    <rect x="45" y="17" width="8" height="4" />
    <rect x="57" y="17" width="4" height="4" />
    <rect x="65" y="17" width="4" height="4" />

    <rect x="37" y="25" width="8" height="4" />
    <rect x="49" y="25" width="4" height="4" />
    <rect x="61" y="25" width="8" height="4" />

    <rect x="37" y="33" width="4" height="4" />
    <rect x="45" y="33" width="4" height="4" />
    <rect x="53" y="33" width="8" height="4" />
    <rect x="65" y="33" width="4" height="4" />

    <rect x="17" y="41" width="4" height="4" />
    <rect x="25" y="41" width="8" height="4" />
    <rect x="37" y="41" width="8" height="4" />
    <rect x="49" y="41" width="4" height="4" />
    <rect x="57" y="41" width="8" height="4" />
    <rect x="69" y="41" width="4" height="4" />
    <rect x="77" y="41" width="8" height="4" />
    <rect x="89" y="41" width="4" height="4" />
    <rect x="97" y="41" width="4" height="4" />

    <rect x="17" y="49" width="8" height="4" />
    <rect x="29" y="49" width="4" height="4" />
    <rect x="37" y="49" width="4" height="4" />
    <rect x="49" y="49" width="8" height="4" />
    <rect x="61" y="49" width="4" height="4" />
    <rect x="73" y="49" width="4" height="4" />
    <rect x="81" y="49" width="8" height="4" />
    <rect x="93" y="49" width="8" height="4" />

    <rect x="17" y="57" width="4" height="4" />
    <rect x="25" y="57" width="4" height="4" />
    <rect x="37" y="57" width="8" height="4" />
    <rect x="49" y="57" width="4" height="4" />
    <rect x="57" y="57" width="4" height="4" />
    <rect x="65" y="57" width="8" height="4" />
    <rect x="77" y="57" width="4" height="4" />
    <rect x="89" y="57" width="8" height="4" />

    <rect x="17" y="65" width="8" height="4" />
    <rect x="29" y="65" width="4" height="4" />
    <rect x="41" y="65" width="4" height="4" />
    <rect x="49" y="65" width="4" height="4" />
    <rect x="61" y="65" width="8" height="4" />
    <rect x="73" y="65" width="8" height="4" />
    <rect x="85" y="65" width="4" height="4" />
    <rect x="97" y="65" width="4" height="4" />

    {/* Bottom Right Alignment Area */}
    <rect x="73" y="73" width="16" height="16" rx="2" fill="currentColor" />
    <rect x="76" y="76" width="10" height="10" rx="1.5" fill="white" />
    <rect x="79" y="79" width="4" height="4" fill="currentColor" />

    <rect x="37" y="77" width="8" height="4" />
    <rect x="49" y="77" width="4" height="4" />
    <rect x="57" y="77" width="8" height="4" />
    <rect x="97" y="77" width="4" height="4" />

    <rect x="37" y="85" width="4" height="4" />
    <rect x="45" y="85" width="8" height="4" />
    <rect x="61" y="85" width="4" height="4" />
    <rect x="93" y="85" width="8" height="4" />

    <rect x="37" y="93" width="8" height="4" />
    <rect x="49" y="93" width="4" height="4" />
    <rect x="57" y="93" width="4" height="4" />
    <rect x="65" y="93" width="4" height="4" />
    <rect x="81" y="93" width="8" height="4" />
    <rect x="97" y="93" width="4" height="4" />

    <rect x="17" y="97" width="4" height="4" />
    <rect x="25" y="97" width="4" height="4" />
    <rect x="45" y="97" width="4" height="4" />
    <rect x="53" y="97" width="8" height="4" />
    <rect x="69" y="97" width="4" height="4" />
    <rect x="89" y="97" width="4" height="4" />
  </svg>
);

// Fallback sample items matching the checkout reference
const sampleCheckoutItems = [
  {
    product: {
      _id: 'sample-car',
      name: 'Remote Control Car',
      price: 1299,
      thumbnail: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80',
      features: ['Red, 1 unit'],
    },
    quantity: 1,
  },
  {
    product: {
      _id: 'sample-blocks',
      name: 'Building Blocks Set',
      price: 799,
      thumbnail: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&q=80',
      features: ['100 Pieces'],
    },
    quantity: 1,
  },
  {
    product: {
      _id: 'sample-bear',
      name: 'Teddy Bear',
      price: 399,
      thumbnail: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=300&q=80',
      features: ['Soft Plush, 40 cm'],
    },
    quantity: 1,
  },
];

const defaultIndianAddresses: IAddress[] = [
  {
    _id: 'addr-1',
    fullName: 'Syed Ahmed',
    phone: '+91 98765 43210',
    email: 'syed.ahmed@example.com',
    houseFlat: 'H.No 12-3-45',
    street: 'Akbar Bagh',
    area: 'Malakpet',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500036',
    isDefault: true,
  },
  {
    _id: 'addr-2',
    fullName: 'Nusreth Mohammed',
    phone: '+91 91234 56789',
    email: 'nusreth.m@example.com',
    houseFlat: 'Saidabad Colony, Plot 22',
    street: 'Main Road',
    area: 'Saidabad',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500059',
    isDefault: false,
  },
];

export const CheckoutPage: React.FC = () => {
  const { items, subtotal, shipping, discount, total, couponCode, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  // Multi-step checkout state: 'address' -> 'payment'
  const [checkoutStep, setCheckoutStep] = useState<'address' | 'payment'>('address');

  const [addresses, setAddresses] = useState<IAddress[]>(defaultIndianAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState<string>(defaultIndianAddresses[0]._id!);
  const [paymentMethod, setPaymentMethod] = useState<string>('Razorpay');
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Razorpay subtabs and payment inputs
  const [razorpaySubTab, setRazorpaySubTab] = useState<'upi' | 'cards' | 'netbanking' | 'wallets'>('upi');
  const [selectedUpiApp, setSelectedUpiApp] = useState<'gpay' | 'phonepe' | 'paytm' | 'other' | null>(null);
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [selectedWallet, setSelectedWallet] = useState('Paytm Wallet');
  const [saveCard, setSaveCard] = useState(false);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)} / ${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    setCardCvv(raw);
  };

  // Display items fallback matching the checkout reference
  const displayItems = items.length > 0 ? items : sampleCheckoutItems;
  const displaySubtotal = items.length > 0 ? subtotal : 2497;
  const displayShipping = items.length > 0 ? shipping : 0;
  const displayDiscount = items.length > 0 ? discount : 0;
  const displayTotal = items.length > 0 ? total : 2499;

  // Address modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [newAddr, setNewAddr] = useState({
    fullName: '',
    phone: '',
    houseFlat: '',
    street: '',
    area: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500001',
  });

  // Load saved addresses from server if logged in
  useEffect(() => {
    api.getAddresses()
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          setAddresses(res.data);
          const defaultAddr = res.data.find((a: any) => a.isDefault);
          setSelectedAddressId(defaultAddr?._id || res.data[0]._id);
        }
      })
      .catch(() => {});
  }, [isAuthenticated]);

  const currentAddress = addresses.find((a) => a._id === selectedAddressId) || addresses[0];

  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setNewAddr({
      fullName: user?.name || '',
      phone: user?.phone || '',
      houseFlat: '',
      street: '',
      area: '',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001',
    });
    setShowAddressModal(true);
  };

  const handleOpenEditAddress = (addr: IAddress) => {
    setEditingAddressId(addr._id || null);
    setNewAddr({
      fullName: addr.fullName,
      phone: addr.phone,
      houseFlat: addr.houseFlat,
      street: addr.street,
      area: addr.area || '',
      city: addr.city,
      state: addr.state,
      pinCode: addr.pinCode,
    });
    setShowAddressModal(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddr.fullName.trim() || !newAddr.phone.trim() || !newAddr.houseFlat.trim()) {
      toastError('Please fill all required address fields');
      return;
    }

    try {
      if (editingAddressId) {
        const res = await api.updateAddress(editingAddressId, newAddr);
        const updated = res.data;
        setAddresses((prev) =>
          prev.map((a) => (a._id === editingAddressId ? updated : a))
        );
        setSelectedAddressId(editingAddressId);
        success('Delivery address updated');
      } else {
        const res = await api.addAddress(newAddr);
        const created = res.data;
        setAddresses((prev) => [created, ...prev]);
        setSelectedAddressId(created._id);
        success('Delivery address added');
      }
      setShowAddressModal(false);
    } catch (err: any) {
      toastError(err.message || 'Failed to save address');
    }
  };

  // Step 1 -> Step 2 validation
  const handleProceedToPayment = () => {
    if (!isAuthenticated) {
      toastError('Please log in or sign up to continue checkout');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (!currentAddress) {
      toastError('Please select a delivery address');
      return;
    }

    setCheckoutStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlaceOrder = async () => {
    if (!isAuthenticated) {
      toastError('Please log in or sign up to place your order');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }

    if (!termsAgreed) {
      toastError('Please agree to the Terms & Conditions');
      return;
    }

    if (!currentAddress) {
      toastError('Please select a delivery address');
      setCheckoutStep('address');
      return;
    }

    setSubmitting(true);

    try {
      const activeItemsToSubmit = items.length > 0 ? items : sampleCheckoutItems;
      const orderPayload = {
        items: activeItemsToSubmit.map((i: any) => ({
          product: i.product._id,
          name: i.product.name,
          image: i.product.thumbnail || i.product.images?.[0],
          price: i.product.price,
          quantity: i.quantity,
          subtotal: i.product.price * i.quantity,
        })),
        shippingAddress: currentAddress,
        paymentMethod,
        paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending' : 'Paid',
        subtotal: displaySubtotal,
        shipping: displayShipping,
        discount: displayDiscount,
        couponCode,
        tax: 0,
        total: displayTotal,
      };

      const res = await api.createOrder(orderPayload);

      // Trigger Celebration Confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
      });

      clearCart();
      success('🎉 Order placed successfully!');

      setTimeout(() => {
        navigate(`/account/orders`);
      }, 1500);
    } catch (err: any) {
      toastError(err.message || 'Error processing order');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      {/* 4-Step Checkout Stepper */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-slate-200 z-0"></div>

          {/* Step 1: Cart */}
          <button
            type="button"
            onClick={() => navigate('/cart')}
            className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
            title="Return to Cart"
          >
            <div className="w-9 h-9 rounded-full bg-[#FF4B6E] text-white flex items-center justify-center font-bold text-xs shadow-md transition-transform group-hover:scale-105">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-slate-800 mt-1.5 group-hover:text-[#FF4B6E] transition-colors">
              Cart
            </span>
          </button>

          {/* Step 2: Address */}
          <button
            type="button"
            onClick={() => setCheckoutStep('address')}
            className="relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none"
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                checkoutStep === 'address'
                  ? 'bg-[#FF4B6E] text-white ring-4 ring-pink-100 scale-105'
                  : 'bg-[#FF4B6E] text-white'
              }`}
            >
              {checkoutStep === 'payment' ? <Check className="w-4 h-4" /> : '2'}
            </div>
            <span
              className={`text-xs font-bold mt-1.5 transition-colors ${
                checkoutStep === 'address' ? 'text-[#FF4B6E]' : 'text-slate-800'
              }`}
            >
              Address
            </span>
          </button>

          {/* Step 3: Payment */}
          <button
            type="button"
            onClick={() => {
              if (currentAddress) setCheckoutStep('payment');
            }}
            className={`relative z-10 flex flex-col items-center focus:outline-none ${
              checkoutStep === 'payment' ? 'cursor-pointer' : 'cursor-default'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                checkoutStep === 'payment'
                  ? 'bg-[#FF4B6E] text-white ring-4 ring-pink-100 shadow-md scale-105'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              3
            </div>
            <span
              className={`text-xs font-medium mt-1.5 transition-colors ${
                checkoutStep === 'payment' ? 'text-[#FF4B6E] font-bold' : 'text-slate-400'
              }`}
            >
              Payment
            </span>
          </button>

          {/* Step 4: Confirm */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
              4
            </div>
            <span className="text-xs font-medium text-slate-400 mt-1.5">Confirm</span>
          </div>
        </div>
      </div>

      {/* Guest Authentication Required Notice */}
      {!isAuthenticated && (
        <div className="max-w-7xl mx-auto mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center flex-shrink-0 font-bold">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm sm:text-base">
                Sign In Required to Place Order
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                You must be logged in to complete your checkout and place an order.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              type="button"
              onClick={() => navigate('/login', { state: { from: '/checkout' } })}
              className="px-4 py-2.5 rounded-xl bg-[#0F2444] hover:bg-[#1a365d] text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <LogIn className="w-4 h-4" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/register', { state: { from: '/checkout' } })}
              className="px-4 py-2.5 rounded-xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-xs sm:text-sm shadow-sm shadow-pink-500/20 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <UserPlus className="w-4 h-4" />
              <span>Sign Up</span>
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* ========================================================
            LEFT COLUMN: EITHER ADDRESS OR PAYMENT (NEVER BOTH TOGETHER)
            ======================================================== */}
        <div className="lg:col-span-8 space-y-6">
          {/* STEP 2: ADDRESS SECTION ONLY */}
          {checkoutStep === 'address' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h2 className="font-heading font-extrabold text-lg text-slate-900">
                    Delivery Address
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Select where you would like your toys delivered
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddAddress}
                  className="text-xs font-bold text-[#FF4B6E] hover:text-[#E11D48] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add New Address
                </button>
              </div>

              {/* Saved Address Cards */}
              <div className="space-y-3">
                {addresses.map((addr) => {
                  const isSelected = selectedAddressId === addr._id;
                  return (
                    <label
                      key={addr._id}
                      className={`block p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#FF4B6E] bg-pink-50/30 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="delivery_address"
                            checked={isSelected}
                            onChange={() => setSelectedAddressId(addr._id!)}
                            className="mt-1 w-4 h-4 text-[#FF4B6E] accent-[#FF4B6E] cursor-pointer"
                          />
                          <div>
                            <p className="font-heading font-bold text-slate-800 text-sm">
                              {addr.fullName}
                            </p>
                            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                              {addr.houseFlat}, {addr.street}, {addr.area}
                              <br />
                              {addr.city}, {addr.state} - {addr.pinCode}
                            </p>
                            <p className="text-xs font-medium text-slate-500 mt-1">{addr.phone}</p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenEditAddress(addr);
                          }}
                          className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          Edit
                        </button>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* Proceed to Payment Button inside Address Card */}
              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => navigate('/cart')}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Return to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToPayment}
                  className="px-6 py-3 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-md shadow-pink-500/20 transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PAYMENT SECTION ONLY */}
          {checkoutStep === 'payment' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Selected Address Summary Bar with Change Address button */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 text-[#FF4B6E] flex items-center justify-center flex-shrink-0 font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#FF4B6E] bg-pink-50 px-2 py-0.5 rounded-md">
                        Delivering To
                      </span>
                      <p className="font-heading font-bold text-slate-900 text-sm">
                        {currentAddress?.fullName}
                      </p>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {currentAddress?.houseFlat}, {currentAddress?.street}, {currentAddress?.area},{' '}
                      {currentAddress?.city}, {currentAddress?.state} - {currentAddress?.pinCode}
                    </p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">
                      Phone: {currentAddress?.phone}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setCheckoutStep('address');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:border-[#FF4B6E] text-slate-700 hover:text-[#FF4B6E] text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-center cursor-pointer flex-shrink-0"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Change Address</span>
                </button>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-4">
                {/* Breadcrumb matching reference screenshot */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <button
                    type="button"
                    onClick={() => navigate('/cart')}
                    className="hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Cart
                  </button>
                  <span className="text-slate-400 font-normal">&gt;</span>
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('address')}
                    className="hover:text-slate-800 transition-colors cursor-pointer"
                  >
                    Checkout
                  </button>
                  <span className="text-slate-400 font-normal">&gt;</span>
                  <span className="text-[#FF3366] font-bold">Payment</span>
                </div>

                <div className="flex items-center justify-between pb-1">
                  <div>
                    <h2 className="font-heading font-extrabold text-xl text-slate-900">
                      Select Payment Method
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose your preferred payment method
                    </p>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Secure Checkout</span>
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Razorpay Option */}
                  {paymentMethod === 'Razorpay' ? (
                    /* EXPANDED RAZORPAY CARD */
                    <div className="border-2 border-[#FF3366] rounded-3xl bg-white p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-[#FF3366] flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                              Razorpay (UPI, Cards, NetBanking)
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                              Supports GPay, PhonePe, Paytm, All Banks
                            </p>
                          </div>
                        </div>

                        <RazorpayLogo />
                      </div>

                      {/* Subtabs Navigation */}
                      <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                        {/* UPI Subtab */}
                        <button
                          type="button"
                          onClick={() => setRazorpaySubTab('upi')}
                          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            razorpaySubTab === 'upi'
                              ? 'bg-[#FFF0F3] text-[#FF3366] border border-[#FFCCD6] shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <svg
                            viewBox="0 0 24 24"
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          <span>UPI</span>
                        </button>

                        {/* Cards Subtab */}
                        <button
                          type="button"
                          onClick={() => setRazorpaySubTab('cards')}
                          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            razorpaySubTab === 'cards'
                              ? 'bg-[#FFF0F3] text-[#FF3366] border border-[#FFCCD6] shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Cards</span>
                        </button>

                        {/* NetBanking Subtab */}
                        <button
                          type="button"
                          onClick={() => setRazorpaySubTab('netbanking')}
                          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            razorpaySubTab === 'netbanking'
                              ? 'bg-[#FFF0F3] text-[#FF3366] border border-[#FFCCD6] shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <Building2 className="w-3.5 h-3.5" />
                          <span>NetBanking</span>
                        </button>

                        {/* Wallets Subtab */}
                        <button
                          type="button"
                          onClick={() => setRazorpaySubTab('wallets')}
                          className={`py-2 px-2 sm:px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                            razorpaySubTab === 'wallets'
                              ? 'bg-[#FFF0F3] text-[#FF3366] border border-[#FFCCD6] shadow-xs'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                          }`}
                        >
                          <Wallet className="w-3.5 h-3.5" />
                          <span>Wallets</span>
                        </button>
                      </div>

                      {/* Subtab Content: UPI */}
                      {razorpaySubTab === 'upi' && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pt-1">
                          {/* Left Column: Input + Popular Apps */}
                          <div className="md:col-span-7 space-y-4">
                            <div>
                              <h4 className="font-heading font-bold text-sm text-slate-900">
                                Pay using UPI
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                Enter your UPI ID or scan QR code to pay securely with Razorpay
                              </p>

                              {/* UPI ID Input with UPI Icon Badge */}
                              <div className="mt-3 flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#FF3366] focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                                <div className="mr-2.5 flex-shrink-0">
                                  <UpiLogo />
                                </div>
                                <input
                                  type="text"
                                  placeholder="name@upi"
                                  value={upiId}
                                  onChange={(e) => setUpiId(e.target.value)}
                                  className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
                                />
                              </div>
                            </div>

                            {/* Popular UPI Apps */}
                            <div>
                              <p className="text-xs font-semibold text-slate-700 mb-2">
                                Popular UPI Apps
                              </p>
                              <div className="grid grid-cols-4 gap-2">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedUpiApp('gpay');
                                    if (!upiId) setUpiId('username@okhdfcbank');
                                  }}
                                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                    selectedUpiApp === 'gpay'
                                      ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                                      : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <GooglePayLogo />
                                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700">
                                    Google Pay
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedUpiApp('phonepe');
                                    if (!upiId) setUpiId('username@ybl');
                                  }}
                                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                    selectedUpiApp === 'phonepe'
                                      ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                                      : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <PhonePeLogo />
                                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700">
                                    PhonePe
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedUpiApp('paytm');
                                    if (!upiId) setUpiId('username@paytm');
                                  }}
                                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                    selectedUpiApp === 'paytm'
                                      ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                                      : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <PaytmLogo />
                                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700">
                                    Paytm
                                  </span>
                                </button>

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedUpiApp('other');
                                    if (!upiId) setUpiId('username@upi');
                                  }}
                                  className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
                                    selectedUpiApp === 'other'
                                      ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                                      : 'border-slate-200 hover:border-slate-300 bg-white'
                                  }`}
                                >
                                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs tracking-widest">
                                    •••
                                  </div>
                                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-700">
                                    Other UPI
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Right Column: QR Code */}
                          <div className="md:col-span-5 flex flex-col items-center justify-center pt-2 md:pt-0">
                            <p className="text-xs font-bold text-slate-800 text-center mb-2">
                              Or scan QR code
                            </p>
                            <div className="p-2.5 rounded-2xl border border-slate-200 bg-white shadow-xs">
                              <QRCodeSVG />
                            </div>
                            <p className="text-[11px] text-slate-500 text-center mt-2 font-medium">
                              Scan with any UPI app
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Subtab Content: Cards */}
                      {razorpaySubTab === 'cards' && (
                        <div className="space-y-3 pt-1 animate-in fade-in duration-150">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                              className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#FF3366] focus:ring-2 focus:ring-pink-100"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                placeholder="MM / YY"
                                value={cardExpiry}
                                onChange={handleExpiryChange}
                                maxLength={7}
                                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#FF3366] focus:ring-2 focus:ring-pink-100"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                maxLength={4}
                                placeholder="123"
                                value={cardCvv}
                                onChange={handleCvvChange}
                                className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#FF3366] focus:ring-2 focus:ring-pink-100"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              placeholder="Name as on card"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value)}
                              className="w-full text-xs sm:text-sm border border-slate-200 rounded-xl px-3 py-2.5 outline-none focus:border-[#FF3366] focus:ring-2 focus:ring-pink-100"
                            />
                          </div>
                        </div>
                      )}

                      {/* Subtab Content: NetBanking */}
                      {razorpaySubTab === 'netbanking' && (
                        <div className="space-y-3 pt-1 animate-in fade-in duration-150">
                          <p className="text-xs font-semibold text-slate-700">Popular Banks</p>
                          <div className="grid grid-cols-3 gap-2">
                            {['HDFC Bank', 'SBI', 'ICICI Bank', 'Axis Bank', 'Kotak', 'PNB'].map((bank) => (
                              <button
                                key={bank}
                                type="button"
                                onClick={() => setSelectedBank(bank)}
                                className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                  selectedBank === bank
                                    ? 'border-[#FF3366] bg-pink-50/50 text-[#FF3366]'
                                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                                }`}
                              >
                                {bank}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Subtab Content: Wallets */}
                      {razorpaySubTab === 'wallets' && (
                        <div className="space-y-3 pt-1 animate-in fade-in duration-150">
                          <p className="text-xs font-semibold text-slate-700">Select Wallet</p>
                          <div className="grid grid-cols-2 gap-2.5">
                            {['Paytm Wallet', 'PhonePe Wallet', 'Amazon Pay', 'MobiKwik'].map((wallet) => (
                              <button
                                key={wallet}
                                type="button"
                                onClick={() => setSelectedWallet(wallet)}
                                className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${
                                  selectedWallet === wallet
                                    ? 'border-[#FF3366] bg-pink-50/50 text-[#FF3366]'
                                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                                }`}
                              >
                                {wallet}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Pay Button inside Razorpay */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          disabled={submitting}
                          className="w-full py-3.5 rounded-2xl bg-[#FF3366] hover:bg-[#E11D48] text-white font-bold text-sm sm:text-base shadow-md shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                        >
                          {submitting ? (
                            <span>Processing Payment...</span>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              <span>Pay ₹{displayTotal.toLocaleString('en-IN')}</span>
                            </>
                          )}
                        </button>
                        <p className="text-center text-xs text-slate-400 font-medium mt-2">
                          Secured by Razorpay
                        </p>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED RAZORPAY CARD */
                    <label
                      onClick={() => setPaymentMethod('Razorpay')}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0" />
                        <span className="font-heading font-bold text-sm text-slate-800">
                          Razorpay (UPI, Cards, NetBanking)
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </label>
                  )}

                  {/* Credit / Debit Card Option */}
                  {paymentMethod === 'Credit/Debit Card' ? (
                    /* EXPANDED CREDIT / DEBIT CARD (Direct Match to Reference Screenshot) */
                    <div className="border-2 border-[#FF3366] rounded-3xl bg-white p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-[#FF3366] flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
                          </div>
                          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                            Credit / Debit Card
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                          <CreditCard className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Pay with Credit or Debit Card Title + Brand Logos */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-slate-900">
                            Pay with Credit or Debit Card
                          </h4>
                          <p className="text-xs text-slate-500 mt-0.5">
                            All transactions are secure and encrypted
                          </p>
                        </div>

                        {/* VISA, Mastercard, RuPay Logos */}
                        <div className="flex items-center gap-3 bg-slate-50/80 px-3 py-1.5 rounded-xl border border-slate-100">
                          <span className="font-serif font-black italic tracking-wider text-[#1A1F71] text-sm leading-none">
                            VISA
                          </span>
                          <div className="flex items-center -space-x-1.5">
                            <div className="w-4 h-4 rounded-full bg-[#EB001B]" />
                            <div className="w-4 h-4 rounded-full bg-[#F79E1B] opacity-90" />
                          </div>
                          <div className="flex items-center gap-0.5">
                            <span className="font-extrabold text-[#092651] tracking-tight text-xs">
                              RuPay
                            </span>
                            <span className="text-[#F37021] font-black text-xs leading-none">
                              ❯
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="space-y-3.5 pt-1">
                        {/* Row 1: Card Number & Cardholder Name */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Card Number
                            </label>
                            <div className="relative flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#FF3366] focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                              <CreditCard className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                              <input
                                type="text"
                                placeholder="1234 5678 9012 3456"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                maxLength={19}
                                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium tracking-wide"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Cardholder Name
                            </label>
                            <div className="relative flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#FF3366] focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                              <input
                                type="text"
                                placeholder="Name on card"
                                value={cardName}
                                onChange={(e) => setCardName(e.target.value)}
                                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Row 2: Expiry Date & CVV */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              Expiry Date
                            </label>
                            <div className="relative flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#FF3366] focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                              <Calendar className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                              <input
                                type="text"
                                placeholder="MM / YY"
                                value={cardExpiry}
                                onChange={handleExpiryChange}
                                maxLength={7}
                                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                              CVV
                            </label>
                            <div className="relative flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#FF3366] focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                              <Lock className="w-4 h-4 text-slate-400 mr-2 flex-shrink-0" />
                              <input
                                type="password"
                                placeholder=""
                                value={cardCvv}
                                onChange={handleCvvChange}
                                maxLength={4}
                                className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium tracking-widest"
                              />
                              <HelpCircle
                                className="w-4 h-4 text-slate-400 ml-2 flex-shrink-0 cursor-pointer hover:text-slate-600 transition-colors"
                                title="3 or 4 digit security code on the back of your card"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Save Card Checkbox */}
                        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-1 select-none">
                          <input
                            type="checkbox"
                            checked={saveCard}
                            onChange={(e) => setSaveCard(e.target.checked)}
                            className="w-4 h-4 rounded text-[#FF3366] accent-[#FF3366] cursor-pointer"
                          />
                          <span>Save this card for faster checkout next time</span>
                        </label>

                        {/* Pay Button */}
                        <div className="pt-2">
                          <button
                            type="button"
                            onClick={handlePlaceOrder}
                            disabled={submitting}
                            className="w-full py-3.5 rounded-2xl bg-[#FF3366] hover:bg-[#E11D48] text-white font-bold text-sm sm:text-base shadow-md shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                          >
                            {submitting ? (
                              <span>Processing Payment...</span>
                            ) : (
                              <>
                                <Lock className="w-4 h-4" />
                                <span>Pay ₹{displayTotal.toLocaleString('en-IN')}</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED CREDIT / DEBIT CARD */
                    <label
                      onClick={() => setPaymentMethod('Credit/Debit Card')}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0" />
                        <span className="font-heading font-bold text-sm text-slate-800">
                          Credit / Debit Card
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                    </label>
                  )}

                  {/* UPI Instant Pay Option */}
                  {paymentMethod === 'UPI' ? (
                    /* EXPANDED UPI INSTANT PAY (Direct Match to Reference Screenshot) */
                    <div className="border-2 border-[#FF3366] rounded-3xl bg-white p-5 sm:p-6 shadow-sm space-y-5 animate-in fade-in duration-150">
                      {/* Header */}
                      <div className="flex items-center justify-between pb-1">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 border-[#FF3366] flex items-center justify-center flex-shrink-0">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
                          </div>
                          <h3 className="font-heading font-bold text-sm sm:text-base text-slate-900">
                            UPI Instant Pay
                          </h3>
                        </div>
                        <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                          <Smartphone className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Pay using UPI Instant Pay Title */}
                      <div className="pt-1">
                        <h4 className="font-heading font-bold text-sm text-slate-900">
                          Pay using UPI Instant Pay
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Choose your preferred UPI app or enter UPI ID
                        </p>
                      </div>

                      {/* 4 App Cards Grid */}
                      <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
                        {/* Google Pay */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUpiApp('gpay');
                            if (!upiId) setUpiId('username@okhdfcbank');
                          }}
                          className={`py-4 px-2 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            selectedUpiApp === 'gpay'
                              ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <GooglePayLogo />
                          <span className="text-[11px] font-semibold text-slate-700">
                            Google Pay
                          </span>
                        </button>

                        {/* PhonePe */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUpiApp('phonepe');
                            if (!upiId) setUpiId('username@ybl');
                          }}
                          className={`py-4 px-2 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            selectedUpiApp === 'phonepe'
                              ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <PhonePeLogo />
                          <span className="text-[11px] font-semibold text-slate-700">
                            PhonePe
                          </span>
                        </button>

                        {/* Paytm */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUpiApp('paytm');
                            if (!upiId) setUpiId('username@paytm');
                          }}
                          className={`py-4 px-2 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            selectedUpiApp === 'paytm'
                              ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <PaytmLogo />
                          <span className="text-[11px] font-semibold text-slate-700">
                            Paytm
                          </span>
                        </button>

                        {/* Other UPI */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedUpiApp('other');
                            if (!upiId) setUpiId('username@upi');
                          }}
                          className={`py-4 px-2 rounded-2xl border flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                            selectedUpiApp === 'other'
                              ? 'border-[#FF3366] bg-pink-50/40 shadow-xs'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs tracking-widest">
                            •••
                          </div>
                          <span className="text-[11px] font-semibold text-slate-700">
                            Other UPI
                          </span>
                        </button>
                      </div>

                      {/* Lower Section: Or enter your UPI ID vs Or scan QR code */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-1">
                        {/* Left: Input */}
                        <div className="md:col-span-7 space-y-1.5">
                          <label className="block text-xs font-medium text-slate-600">
                            Or enter your UPI ID
                          </label>
                          <div className="flex items-center border border-slate-200 rounded-xl px-3 py-2.5 bg-white focus-within:border-[#FF3366] focus-within:ring-2 focus-within:ring-pink-100 transition-all">
                            <div className="mr-2.5 flex-shrink-0">
                              <UpiLogo />
                            </div>
                            <input
                              type="text"
                              placeholder="name@upi"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              className="w-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none bg-transparent font-medium"
                            />
                          </div>
                        </div>

                        {/* Right: QR Code */}
                        <div className="md:col-span-5 flex flex-col items-center justify-center pt-2 md:pt-0">
                          <p className="text-xs font-bold text-slate-800 text-center mb-1.5">
                            Or scan QR code
                          </p>
                          <div className="p-2 rounded-2xl border border-slate-200 bg-white shadow-xs">
                            <QRCodeSVG />
                          </div>
                          <p className="text-[11px] text-slate-400 text-center mt-1.5 font-medium">
                            Scan with any UPI app
                          </p>
                        </div>
                      </div>

                      {/* Button: Verify & Pay ₹... */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={handlePlaceOrder}
                          disabled={submitting}
                          className="w-full py-3.5 rounded-2xl bg-[#FF3366] hover:bg-[#E11D48] text-white font-bold text-sm sm:text-base shadow-md shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                        >
                          {submitting ? (
                            <span>Verifying & Paying...</span>
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              <span>Verify & Pay ₹{displayTotal.toLocaleString('en-IN')}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED UPI INSTANT PAY */
                    <label
                      onClick={() => setPaymentMethod('UPI')}
                      className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 hover:border-slate-300 bg-white cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center flex-shrink-0" />
                        <span className="font-heading font-bold text-sm text-slate-800">
                          UPI Instant Pay
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                        <Smartphone className="w-4 h-4" />
                      </div>
                    </label>
                  )}

                  {/* Cash on Delivery (COD) */}
                  <label
                    onClick={() => setPaymentMethod('Cash on Delivery')}
                    className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${
                      paymentMethod === 'Cash on Delivery'
                        ? 'border-[#FF3366] bg-pink-50/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === 'Cash on Delivery'
                            ? 'border-[#FF3366]'
                            : 'border-slate-300'
                        }`}
                      >
                        {paymentMethod === 'Cash on Delivery' && (
                          <div className="w-2.5 h-2.5 rounded-full bg-[#FF3366]" />
                        )}
                      </div>
                      <span className="font-heading font-bold text-sm text-slate-800">
                        Cash on Delivery (COD)
                      </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400">
                      <Banknote className="w-4 h-4" />
                    </div>
                  </label>

                  {/* If COD is selected, show Place Order button */}
                  {paymentMethod === 'Cash on Delivery' && (
                    <div className="pt-2 animate-in fade-in duration-150">
                      <button
                        type="button"
                        onClick={handlePlaceOrder}
                        disabled={submitting}
                        className="w-full py-3.5 rounded-2xl bg-[#FF3366] hover:bg-[#E11D48] text-white font-bold text-sm sm:text-base shadow-md shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] disabled:opacity-60"
                      >
                        {submitting ? (
                          <span>Placing Order...</span>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" />
                            <span>
                              Place Order (Cash on Delivery) • ₹{displayTotal.toLocaleString('en-IN')}
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Back to Address Selection */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutStep('address');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back to Address Selection</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            RIGHT COLUMN: ORDER SUMMARY (Matches Reference Screenshot)
            ======================================================== */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-heading font-extrabold text-base sm:text-lg text-slate-900">
              Order Summary <span className="text-slate-500 font-semibold text-sm">({displayItems.length} items)</span>
            </h3>
          </div>

          {/* Items List */}
          <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
            {displayItems.map((item: any) => (
              <div key={item.product._id} className="flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={item.product.thumbnail || item.product.images?.[0]}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 line-clamp-1 text-sm">{item.product.name}</p>
                    <p className="text-slate-400 font-medium text-xs mt-0.5">
                      {item.product.features?.[0] || `${item.product.category || 'Toy'}, ${item.quantity} unit`}
                    </p>
                  </div>
                </div>
                <span className="font-bold text-slate-800 text-sm whitespace-nowrap">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Cost breakdown */}
          <div className="space-y-2.5 pt-3 border-t border-slate-100 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span className="font-bold text-slate-800">₹{displaySubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              {displayShipping === 0 ? (
                <span className="font-bold text-emerald-500">FREE</span>
              ) : (
                <span className="font-bold text-slate-800">₹{displayShipping}</span>
              )}
            </div>
            <div className="flex justify-between">
              <span>Discount</span>
              <span className="font-bold text-slate-700">-₹{displayDiscount.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Highlighted Pink Total Amount Box (Exact match to screenshot) */}
          <div className="bg-[#FFF0F3] p-4 rounded-2xl flex items-center justify-between">
            <span className="font-bold text-base text-[#FF3366]">Total Amount</span>
            <span className="font-black text-2xl text-[#FF3366]">
              ₹{displayTotal.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Green Secure Checkout Trust Box (Exact match to screenshot) */}
          <div className="bg-[#E8F8F0] border border-[#C2EED8] p-3.5 rounded-2xl flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div>
              <h5 className="font-bold text-xs text-emerald-900">Secure Checkout</h5>
              <p className="text-[11px] text-emerald-700 mt-0.5 leading-snug">
                Your payment information is encrypted and 100% secure.
              </p>
            </div>
          </div>

          {/* If on Address Step, show Proceed to Payment Button */}
          {checkoutStep === 'address' && (
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="w-full py-4 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer mt-2"
            >
              <span>Proceed to Payment</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}

          {!isAuthenticated && (
            <p className="text-[11px] text-center text-amber-700 font-medium pt-1">
              * Please sign in or create an account to finalize your order.
            </p>
          )}
        </div>
      </div>

      {/* Add New Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <h3 className="font-heading font-bold text-lg text-slate-900 mb-4">
              {editingAddressId ? 'Edit Delivery Address' : 'Add Shipping Address'}
            </h3>
            <form onSubmit={handleSaveAddress} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-600 font-medium mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syed Ahmed"
                  value={newAddr.fullName}
                  onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">Mobile Number *</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98765 43210"
                    value={newAddr.phone}
                    onChange={(e) => setNewAddr({ ...newAddr, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="500036"
                    value={newAddr.pinCode}
                    onChange={(e) => setNewAddr({ ...newAddr, pinCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">House / Flat / Building *</label>
                <input
                  type="text"
                  required
                  placeholder="H.No 12-3-45, Green Meadows"
                  value={newAddr.houseFlat}
                  onChange={(e) => setNewAddr({ ...newAddr, houseFlat: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>
              <div>
                <label className="block text-slate-600 font-medium mb-1">Street & Area *</label>
                <input
                  type="text"
                  required
                  placeholder="Akbar Bagh Road, Malakpet"
                  value={newAddr.street}
                  onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-600 font-medium mb-1">City</label>
                  <input
                    type="text"
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 font-medium mb-1">State</label>
                  <input
                    type="text"
                    value={newAddr.state}
                    onChange={(e) => setNewAddr({ ...newAddr, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold transition-colors cursor-pointer"
                >
                  {editingAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
