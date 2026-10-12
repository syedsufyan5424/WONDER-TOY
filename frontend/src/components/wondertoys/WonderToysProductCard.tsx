import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingCart, Check } from 'lucide-react';
import { IProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';

interface WonderToysProductCardProps {
  product: IProduct;
  viewMode?: 'grid' | 'list';
}

export const WonderToysProductCard: React.FC<WonderToysProductCardProps> = ({
  product,
  viewMode = 'grid',
}) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success } = useToast();

  const isFavorited = isInWishlist(product._id);

  const fallbackImage =
    'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80';
  const displayImage = product.thumbnail || product.images?.[0] || fallbackImage;

  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  // Badge determination matching Reference Images 1 & 2
  const isBestSellerBadge =
    product.isBestSeller ||
    ['natural-wooden-train-set', 'creative-magnetic-building-tiles-60pcs'].includes(product.slug);

  const isNewBadge =
    product.isNewArrival ||
    [
      'interactive-diy-robotics-kit',
      'eco-friendly-organic-teddy-bear',
      'solar-power-science-kit',
      'modern-wooden-dollhouse',
      'vintage-classic-metal-pedal-car',
      'educational-coding-robot',
    ].includes(product.slug);

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-4 hover:shadow-md transition-shadow flex flex-col sm:flex-row items-center gap-5">
        {/* Product Image */}
        <div className="relative w-full sm:w-48 h-44 bg-[#F8FAFC] rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-3">
          {/* Badge */}
          {isBestSellerBadge ? (
            <span className="absolute top-2.5 left-2.5 z-10 bg-[#F59E0B] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
              BEST SELLER
            </span>
          ) : isNewBadge ? (
            <span className="absolute top-2.5 left-2.5 z-10 bg-[#0EA5E9] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
              NEW
            </span>
          ) : null}

          <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
            <img
              src={displayImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply hover:scale-105 transition-transform"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          </Link>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="text-xs text-slate-400 font-medium">{product.category}</span>
              <button
                type="button"
                onClick={handleWishlist}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors"
                title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            <Link to={`/product/${product.slug}`} className="hover:text-[#F45A0B] transition-colors">
              <h3 className="font-heading font-bold text-slate-900 text-base mb-1.5">
                {product.name}
              </h3>
            </Link>

            <p className="text-xs text-slate-500 line-clamp-2 mb-3">
              {product.shortDescription || product.description}
            </p>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-3">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="font-bold text-slate-800">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400">({product.reviewCount || 45})</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-2 border-t border-slate-100">
            <div className="flex items-baseline gap-2">
              <span className="font-heading font-black text-slate-900 text-lg">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-emerald-600">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`py-2.5 px-6 rounded-lg text-white text-xs font-bold uppercase tracking-wider transition-all shadow-xs active:scale-98 ${
                added ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#F45A0B] hover:bg-[#DD4D06]'
              }`}
            >
              {added ? 'ADDED ✓' : 'ADD TO CART'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View Layout (Exact match to Reference 1 & 2 cards)
  return (
    <div className="bg-white border border-[#E5E7EB] rounded-2xl p-3.5 hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Top Image Box */}
      <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-xl overflow-hidden mb-3 flex items-center justify-center p-3 select-none">
        {/* Badges at top left */}
        {isBestSellerBadge ? (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#F59E0B] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
            BEST SELLER
          </span>
        ) : isNewBadge ? (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#0EA5E9] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm shadow-xs">
            NEW
          </span>
        ) : null}

        {/* Wishlist Heart at top right */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all bg-white/90 shadow-2xs hover:scale-110 ${
            isFavorited ? 'text-rose-500' : 'text-slate-400 hover:text-rose-500'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link
          to={`/product/${product.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-106 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Title */}
          <Link
            to={`/product/${product.slug}`}
            className="block font-semibold text-slate-800 hover:text-[#F45A0B] transition-colors text-[13px] sm:text-sm line-clamp-1 mb-1.5 leading-snug"
            title={product.name}
          >
            {product.name}
          </Link>

          {/* Star Rating & Review Count */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <div className="flex items-center">
              <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" />
            </div>
            <span className="font-bold text-slate-800 text-[12px]">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-[#5F6368] text-[12px]">
              ({product.reviewCount || 112})
            </span>
          </div>

          {/* Price & Discount */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mb-3 flex-wrap">
            <span className="font-heading font-black text-slate-900 text-sm sm:text-base">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Orange ADD TO CART Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`w-full h-9 sm:h-10 rounded-lg text-white font-bold text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-150 active:scale-98 shadow-xs hover:shadow flex items-center justify-center gap-1.5 ${
            added ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#F45A0B] hover:bg-[#DD4D06]'
          }`}
        >
          {added ? 'ADDED ✓' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};
