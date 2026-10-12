import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const CartPage: React.FC = () => {
  const {
    items,
    cartCount,
    subtotal,
    shipping,
    discount,
    total,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { error: toastError } = useToast();
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!isAuthenticated) {
      toastError('Please log in or sign up to place your order');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    setCouponLoading(true);
    await applyCoupon(inputCoupon);
    setCouponLoading(false);
    setInputCoupon('');
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF4B6E]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="font-heading font-black text-2xl text-slate-900 mb-2">Your Cart is Empty</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
          Looks like you haven't added any playful toys to your cart yet. Discover our bestsellers!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-md transition-all"
        >
          Start Shopping
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mb-8">
        My Cart <span className="text-slate-400 font-normal text-lg">({cartCount} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Cart Items List matching Reference Screen 4 */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            {items.map((item) => {
              const prod = item.product;
              return (
                <div
                  key={prod._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    {/* Item checkbox */}
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded text-[#FF4B6E] accent-[#FF4B6E] cursor-pointer"
                    />

                    {/* Thumbnail */}
                    <div className="w-20 h-20 rounded-2xl bg-[#F8FAFC] border border-slate-100 p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={prod.thumbnail || prod.images?.[0]}
                        alt={prod.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Name & price */}
                    <div>
                      <Link
                        to={`/product/${prod.slug}`}
                        className="font-heading font-bold text-sm sm:text-base text-slate-800 hover:text-[#FF4B6E] transition-colors line-clamp-1"
                      >
                        {prod.name}
                      </Link>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-bold text-slate-900 text-sm">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        {prod.originalPrice && prod.originalPrice > prod.price && (
                          <span className="text-xs text-slate-400 line-through">
                            ₹{prod.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and Actions */}
                  <div className="flex items-center gap-6 self-end sm:self-center">
                    {/* Quantity Stepper */}
                    <div className="flex items-center rounded-2xl border border-slate-200 bg-white shadow-sm p-1">
                      <button
                        type="button"
                        onClick={() => updateQuantity(prod._id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-bold text-xs text-slate-800">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(prod._id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => removeFromCart(prod._id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-colors"
                      title="Remove product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coupon Code Input matching Reference Screen 4 */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <Tag className="w-4 h-4 text-[#FF4B6E]" />
              <span>Available coupons: <strong>WELCOME10</strong> (10% off), <strong>TOY20</strong> (20% off), <strong>SAVE500</strong></span>
            </div>
            {appliedCoupon ? (
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
                <span>Coupon "{appliedCoupon}" applied</span>
                <button onClick={removeCoupon} className="hover:text-emerald-950">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  className="px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#FF4B6E] uppercase font-mono"
                />
                <button
                  type="submit"
                  disabled={couponLoading}
                  className="px-5 py-2 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white text-xs font-bold transition-colors disabled:opacity-50"
                >
                  {couponLoading ? 'Checking...' : 'Apply'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Order Summary Box matching Reference Screen 4 */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
          <h3 className="font-heading font-extrabold text-lg text-slate-900 pb-3 border-b border-slate-100">
            Order Summary
          </h3>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              {shipping === 0 ? (
                <span className="font-bold text-emerald-600">Free</span>
              ) : (
                <span className="font-bold text-slate-800">₹{shipping}</span>
              )}
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-bold">-₹{discount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-between text-base">
              <span className="font-bold text-slate-900">Total</span>
              <span className="font-heading font-black text-xl text-slate-900">
                ₹{total.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <button
            onClick={handleProceedToCheckout}
            className="w-full py-4 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-lg shadow-pink-500/25 transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
          >
            {isAuthenticated ? 'Proceed to Checkout' : 'Log In to Checkout'}
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Safe & Secure Checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
