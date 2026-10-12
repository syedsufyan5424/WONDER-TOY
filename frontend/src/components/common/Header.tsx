import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User as UserIcon, Menu, X, Sparkles, LogOut, Package, ShieldCheck, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { WonderToysLogo } from '../wondertoys/WonderToysLogo';

export const Header: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountDropdownOpen, setAccountDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setAccountDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountDropdownOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchFocused(false);
    }
  };

  const popularSearches = ['Remote Control Car', 'Building Blocks', 'Teddy Bear', 'Barbie Doll', 'Hot Wheels', 'Puzzles'];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 sm:gap-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <WonderToysLogo size="md" />
          </div>

          {/* Central Search Bar */}
          <div className="flex-1 max-w-xl hidden md:block relative">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Search for toys, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setTimeout(() => setSearchFocused(false), 250)}
                className="w-full pl-11 pr-12 py-3 rounded-full bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4B6E]/30 focus:border-[#FF4B6E] transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#FF4B6E] text-white rounded-full hover:bg-[#E11D48] transition-colors"
                title="Search"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Live Search Quick Suggestions Dropdown */}
            {searchFocused && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Popular Toy Searches</p>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onMouseDown={() => {
                        setSearchQuery(item);
                        navigate(`/shop?q=${encodeURIComponent(item)}`);
                      }}
                      className="text-xs bg-slate-100 hover:bg-pink-50 hover:text-[#FF4B6E] text-slate-700 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5"
                    >
                      <Search className="w-3 h-3 text-slate-400" />
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <Link
              to="/"
              className={`hover:text-[#FF4B6E] transition-colors ${location.pathname === '/' ? 'text-[#FF4B6E]' : ''}`}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className={`hover:text-[#FF4B6E] transition-colors ${location.pathname === '/shop' ? 'text-[#FF4B6E]' : ''}`}
            >
              Shop
            </Link>
            <Link
              to="/shop?filter=categories"
              className="hover:text-[#FF4B6E] transition-colors"
            >
              Categories
            </Link>
            <Link
              to="/shop?filter=deals"
              className="hover:text-[#FF4B6E] text-[#FF4B6E] font-bold flex items-center gap-1 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF4B6E] animate-pulse"></span>
              Deals
            </Link>
            <Link
              to="/about"
              className={`hover:text-[#FF4B6E] transition-colors ${location.pathname === '/about' ? 'text-[#FF4B6E]' : ''}`}
            >
              About
            </Link>
          </nav>

          {/* Right Action Icons: Wishlist, Cart, Account */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Wishlist Button */}
            <Link
              to="/wishlist"
              className="relative p-2.5 text-slate-700 hover:text-[#FF4B6E] hover:bg-pink-50 rounded-full transition-colors"
              title="My Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF4B6E] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 text-slate-700 hover:text-[#FF4B6E] hover:bg-pink-50 rounded-full transition-colors"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#FF4B6E] text-white text-[11px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm animate-subtle-pulse">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Account Icon / Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setAccountDropdownOpen(!accountDropdownOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors"
                title="Account"
              >
                <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 overflow-hidden">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-4 h-4" />
                  )}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
              </button>

              {/* Account Dropdown Menu */}
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
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-pink-50 hover:text-[#FF4B6E] transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/account/orders"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-700 hover:bg-pink-50 hover:text-[#FF4B6E] transition-colors"
                      >
                        <Package className="w-4 h-4 text-slate-400" />
                        My Orders
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-purple-600 bg-purple-50/60 hover:bg-purple-100 transition-colors"
                        >
                          <ShieldCheck className="w-4 h-4 text-purple-600" />
                          Admin Dashboard
                        </Link>
                      )}
                      <div className="border-t border-slate-100 my-1"></div>
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
                        className="block w-full py-2.5 px-4 text-center rounded-xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white text-sm font-bold shadow-sm transition-colors mb-2"
                      >
                        Login / Sign Up
                      </Link>
                      <div className="text-center">
                        <span className="text-xs text-slate-400">Demo Accounts Available</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#FF4B6E] lg:hidden rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar (visible on small devices) */}
        <div className="pb-3 md:hidden">
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search toys, brands, or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4B6E]/30 focus:border-[#FF4B6E]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </form>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <Link
            to="/"
            className="block py-2 text-base font-semibold text-slate-700 hover:text-[#FF4B6E]"
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="block py-2 text-base font-semibold text-slate-700 hover:text-[#FF4B6E]"
          >
            Shop All Toys
          </Link>
          <Link
            to="/shop?filter=categories"
            className="block py-2 text-base font-semibold text-slate-700 hover:text-[#FF4B6E]"
          >
            Categories
          </Link>
          <Link
            to="/shop?filter=deals"
            className="block py-2 text-base font-semibold text-[#FF4B6E]"
          >
            Flat 30% Off Deals
          </Link>
          <Link
            to="/about"
            className="block py-2 text-base font-semibold text-slate-700 hover:text-[#FF4B6E]"
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-base font-semibold text-slate-700 hover:text-[#FF4B6E]"
          >
            Contact
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="block py-2 text-base font-semibold text-purple-600"
            >
              Admin Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
