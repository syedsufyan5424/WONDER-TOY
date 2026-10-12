import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search,
  Heart,
  User as UserIcon,
  ShoppingCart,
  MapPin,
  Phone,
  Sparkles,
  ChevronDown,
  LogOut,
  Package,
  ShieldCheck,
  Menu,
  X,
} from 'lucide-react';
import { WonderToysLogo } from './WonderToysLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';

export const WonderToysStoreHeader: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pinModalOpen, setPinModalOpen] = useState(false);
  const [deliveryLocation, setDeliveryLocation] = useState('Mumbai, 400001');

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Explore', href: '/shop' },
    { label: 'STEM & Discovery', href: '/shop?category=STEM%20Toys' },
    { label: 'Outdoor & Active', href: '/shop?category=Outdoor%20Toys' },
    { label: 'Offers', href: '/shop?filter=deals' },
  ];

  return (
    <div className="w-full bg-white z-40 sticky top-0 shadow-2xs">
      {/* 1. TOP ANNOUNCEMENT STRIP (Exact match to Reference 1, 2, 3) */}
      <div className="w-full bg-[#F4F6F8] border-b border-slate-200/80 text-[11px] sm:text-xs text-[#5F6368] py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 flex-wrap">
          {/* Left: Free Shipping Notice */}
          <div className="flex items-center gap-1.5 font-medium text-slate-700">
            <span role="img" aria-label="party">🎉</span>
            <span className="font-semibold tracking-tight text-slate-800">FREE SHIPPING ON ORDERS OVER ₹999</span>
          </div>

          {/* Right: Location & Phone */}
          <div className="flex items-center gap-4 sm:gap-6 text-slate-600 font-medium ml-auto">
            <button
              onClick={() => setPinModalOpen(!pinModalOpen)}
              className="flex items-center gap-1 hover:text-[#F45A0B] transition-colors"
              title="Change Delivery Location"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F45A0B]" />
              <span>Deliver to: <strong className="text-slate-800 font-semibold">{deliveryLocation}</strong></span>
            </button>

            <a
              href="tel:18008695263"
              className="hidden sm:flex items-center gap-1 hover:text-[#F45A0B] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-slate-500" />
              <span>Call Us: <strong className="text-slate-800 font-semibold">1800-TOY-LAND</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER BAR */}
      <header className="w-full bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4 sm:gap-8">
          {/* Left: WonderToys Colorful Text Logo */}
          <div className="flex-shrink-0">
            <WonderToysLogo size="md" />
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-xl mx-2 hidden md:block">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search by age, brand, category, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-5 pr-12 rounded-full bg-white border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F45A0B] focus:ring-1 focus:ring-[#F45A0B] transition-all shadow-2xs"
              />
              <button
                type="submit"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#F45A0B] transition-colors p-1"
                title="Search toys"
              >
                <Search className="w-4 h-4 stroke-[2.2]" />
              </button>
            </form>
          </div>

          {/* Right: Wishlist, Account, Shopping Cart */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="relative p-2 text-slate-700 hover:text-[#F45A0B] hover:bg-orange-50/60 rounded-full transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5 stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute 1 top-0.5 right-0.5 bg-[#F45A0B] text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account Icon / Dropdown */}
            <div className="relative">
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="p-2 text-slate-700 hover:text-[#F45A0B] hover:bg-orange-50/60 rounded-full transition-colors flex items-center gap-1"
                title="Account"
              >
                <UserIcon className="w-5 h-5 stroke-[1.8]" />
              </button>

              {accountDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  {isAuthenticated && user ? (
                    <>
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-xs text-slate-400">Signed in as</p>
                        <p className="text-sm font-bold text-slate-800 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <Link
                        to="/account"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F45A0B] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/account/orders"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-orange-50 hover:text-[#F45A0B] transition-colors"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setAccountDropdownOpen(false)}
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-purple-600 bg-purple-50/60 hover:bg-purple-100 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-slate-100 my-1" />
                      <button
                        onClick={() => {
                          setAccountDropdownOpen(false);
                          logout();
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="p-3">
                      <Link
                        to="/login"
                        onClick={() => setAccountDropdownOpen(false)}
                        className="block w-full py-2.5 px-4 text-center rounded-full bg-[#F45A0B] hover:bg-[#DD4D06] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-colors mb-2"
                      >
                        Log In / Register
                      </Link>
                      <p className="text-[11px] text-center text-slate-400">Welcome to WonderToys</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart Icon with Orange Badge */}
            <Link
              to="/cart"
              className="relative p-2 text-slate-700 hover:text-[#F45A0B] hover:bg-orange-50/60 rounded-full transition-colors flex items-center justify-center"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-5 h-5 stroke-[1.8]" />
              <span className="absolute -top-0.5 -right-1 bg-[#F45A0B] text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 min-w-[18px] flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-700 hover:text-[#F45A0B] transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search by age, brand, category, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-4 pr-10 rounded-full bg-white border border-slate-300 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#F45A0B]"
            />
            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      </header>

      {/* 3. SECONDARY HORIZONTAL NAVIGATION BAR */}
      <nav className="w-full bg-white border-b border-slate-100/90 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center gap-6 lg:gap-10 h-11 text-xs lg:text-[13px] font-semibold text-slate-700">
            {navLinks.map((item) => {
              const isActive = item.href === '/'
                ? location.pathname === '/'
                : location.pathname + location.search === item.href;
              return (
                <li key={item.label}>
                  <Link
                    to={item.href}
                    className={`transition-colors tracking-tight whitespace-nowrap py-2 ${
                      isActive ? 'text-[#F45A0B] font-bold' : 'hover:text-[#F45A0B]'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white border-b border-slate-200 px-5 py-4 space-y-3 animate-in fade-in duration-150">
          {navLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-sm font-semibold text-slate-700 hover:text-[#F45A0B]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
