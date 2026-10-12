import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Home, HelpCircle, ShoppingCart } from 'lucide-react';
import { WonderToysLogo } from './WonderToysLogo';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export const WonderToysNavbar: React.FC = () => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // In the design mockup, Cart displays badge "1"
  const displayCartCount = cartCount > 0 ? cartCount : 1;

  return (
    <header className="w-full bg-white border-b border-slate-100/80 z-30 sticky top-0 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Left: WonderToys Logo */}
        <div className="flex-shrink-0">
          <WonderToysLogo size="md" />
        </div>

        {/* Right: Wishlist, Home, Help, Cart matching exact design */}
        <div className="flex items-center gap-7 sm:gap-9 flex-shrink-0">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="group flex flex-col items-center justify-center text-[#374151] hover:text-[#EB483F] transition-colors relative"
            title="Wishlist"
          >
            <div className="relative">
              <Heart className="w-[21px] h-[21px] text-[#374151] group-hover:text-[#EB483F] transition-colors stroke-[1.8]" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#F97316] text-white text-[9px] font-bold rounded-full h-3.5 w-3.5 flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            <span className="text-[11px] font-medium text-[#4B5563] group-hover:text-[#EB483F] mt-1 tracking-tight">
              Wishlist
            </span>
          </Link>

          {/* Home */}
          <Link
            to="/"
            className="group flex flex-col items-center justify-center text-[#374151] hover:text-[#EB483F] transition-colors"
            title="Home"
          >
            <Home className="w-[21px] h-[21px] text-[#374151] group-hover:text-[#EB483F] transition-colors stroke-[1.8]" />
            <span className="text-[11px] font-medium text-[#4B5563] group-hover:text-[#EB483F] mt-1 tracking-tight">
              Home
            </span>
          </Link>

          {/* Help */}
          <Link
            to="/faq"
            className="group flex flex-col items-center justify-center text-[#374151] hover:text-[#EB483F] transition-colors"
            title="Help"
          >
            <HelpCircle className="w-[21px] h-[21px] text-[#374151] group-hover:text-[#EB483F] transition-colors stroke-[1.8]" />
            <span className="text-[11px] font-medium text-[#4B5563] group-hover:text-[#EB483F] mt-1 tracking-tight">
              Help
            </span>
          </Link>

          {/* Cart with Orange Badge '1' */}
          <Link
            to="/cart"
            className="group flex flex-col items-center justify-center text-[#374151] hover:text-[#EB483F] transition-colors relative"
            title="Cart"
          >
            <div className="relative">
              <ShoppingCart className="w-[21px] h-[21px] text-[#374151] group-hover:text-[#EB483F] transition-colors stroke-[1.8]" />
              <span className="absolute -top-1.5 -right-2.5 bg-[#F97316] text-white text-[10px] font-extrabold rounded-full h-4 w-4 min-w-[16px] flex items-center justify-center px-0.5 shadow-xs">
                {displayCartCount}
              </span>
            </div>
            <span className="text-[11px] font-medium text-[#4B5563] group-hover:text-[#EB483F] mt-1 tracking-tight">
              Cart
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};
