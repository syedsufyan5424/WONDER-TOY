import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/common/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#FF4B6E]">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="font-heading font-black text-2xl text-slate-900 mb-2">Your Wishlist is Empty</h2>
        <p className="text-slate-500 text-sm max-w-sm mx-auto mb-6">
          Save items you love by tapping the heart icon on any toy card.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm shadow-md transition-all"
        >
          Explore Toys
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-8">
        <div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
            My Wishlist
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {wishlist.length} {wishlist.length === 1 ? 'item saved' : 'items saved'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((prod) => (
          <div key={prod._id} className="relative group flex flex-col justify-between">
            <ProductCard product={prod} />
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => {
                  addToCart(prod, 1);
                  removeFromWishlist(prod._id);
                }}
                className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
