import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, ShoppingBag } from 'lucide-react';
import { IProduct } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  const isFavorited = isInWishlist(product._id);

  // Safe image fallback
  const fallbackImage = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80';
  const displayImage = product.thumbnail || product.images?.[0] || fallbackImage;

  return (
    <div className="group relative bg-white rounded-3xl border border-slate-100 p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Top Badges & Actions */}
      <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-2xl overflow-hidden mb-3.5 flex items-center justify-center p-3">
        {/* Sale badge */}
        {(product.isOnSale || (product.originalPrice && product.originalPrice > product.price)) && (
          <span className="absolute top-2.5 left-2.5 z-10 bg-[#FF4B6E] text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full shadow-sm">
            Sale
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isFavorited
              ? 'bg-rose-50 text-[#FF4B6E] shadow-sm'
              : 'bg-white/80 text-slate-400 hover:text-[#FF4B6E] hover:bg-white shadow-sm'
          }`}
          title={isFavorited ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#FF4B6E]' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link to={`/product/${product.slug}`} className="w-full h-full flex items-center justify-center">
          <img
            src={displayImage}
            alt={product.name}
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = fallbackImage;
            }}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span className="font-medium text-slate-500">{product.brand}</span>
            {product.ageGroup && (
              <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-full text-slate-600 font-medium">
                {product.ageGroup}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.slug}`} className="block group-hover:text-[#FF4B6E] transition-colors">
            <h3 className="font-heading font-bold text-slate-800 text-sm sm:text-base line-clamp-1 mb-1.5" title={product.name}>
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-slate-700">{product.rating.toFixed(1)}</span>
            <span className="text-slate-400">({product.reviewCount || 120})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="font-heading font-black text-slate-900 text-base sm:text-lg">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            addToCart(product, 1);
            setAdded(true);
            setTimeout(() => setAdded(false), 1200);
          }}
          className={`w-full py-2.5 px-3 rounded-2xl border-2 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-sm hover:shadow ${
            added
              ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
              : 'border-[#FF4B6E] text-[#FF4B6E] hover:bg-[#FF4B6E] hover:text-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};
