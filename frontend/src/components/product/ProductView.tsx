import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, ShoppingBag, Zap, ShieldCheck, RotateCcw, Truck, Check, Plus, Minus, Share2 } from 'lucide-react';
import { IProduct, IReview } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../../context/ToastContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { ProductCard } from '../common/ProductCard';

interface ProductViewProps {
  product: IProduct;
  relatedProducts?: IProduct[];
}

export const ProductView: React.FC<ProductViewProps> = ({ product, relatedProducts = [] }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success, error: toastError } = useToast();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState<string>(
    product.images?.[0] || product.thumbnail
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');

  // Review state
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const isFavorited = isInWishlist(product._id);

  const fallbackImage = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=800&q=80';
  const gallery = product.images && product.images.length > 0 ? product.images : [product.thumbnail || fallbackImage];

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (!isAuthenticated) {
      toastError('Please log in or sign up to place your order');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const loadReviews = async () => {
    try {
      const res = await api.getProductReviews(product._id);
      if (res.success && res.data) {
        setReviews(res.data);
      }
    } catch (e) {
      console.warn('Reviews error', e);
    } finally {
      setReviewsLoaded(true);
    }
  };

  const handleTabChange = (tab: 'description' | 'specifications' | 'reviews') => {
    setActiveTab(tab);
    if (tab === 'reviews' && !reviewsLoaded) {
      loadReviews();
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await api.addReview(product._id, {
        rating: newRating,
        comment: newComment,
      });
      if (res.success) {
        success('Review submitted successfully!');
        setNewComment('');
        loadReviews();
      }
    } catch (err: any) {
      toastError(err.message || 'Please log in to submit a review');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 font-medium">
        <button onClick={() => navigate('/')} className="hover:text-slate-700">Home</button>
        <span>/</span>
        <button onClick={() => navigate('/shop')} className="hover:text-slate-700">Shop</button>
        <span>/</span>
        <button onClick={() => navigate(`/shop?category=${product.category}`)} className="hover:text-slate-700">{product.category}</button>
        <span>/</span>
        <span className="text-slate-800 font-bold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main 2-Column Product Detail Layout matching Reference Screen 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left: Gallery (Thumbnails + Main Image) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          {/* Vertical Thumbnail Strip */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[500px] flex-shrink-0">
            {gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl p-1.5 border-2 bg-[#F8FAFC] transition-all flex items-center justify-center overflow-hidden flex-shrink-0 ${
                  selectedImage === img ? 'border-[#FF4B6E] shadow-md scale-102' : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = fallbackImage;
                  }}
                />
              </button>
            ))}
          </div>

          {/* Main Large Image Box */}
          <div className="relative flex-1 aspect-square sm:aspect-auto sm:h-[500px] bg-[#F8FAFC] rounded-3xl p-6 border border-slate-100 flex items-center justify-center overflow-hidden">
            {/* Sale Badge */}
            {(product.isOnSale || (product.originalPrice && product.originalPrice > product.price)) && (
              <span className="absolute top-4 left-4 z-10 bg-[#FF4B6E] text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-sm">
                Sale
              </span>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product)}
              className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all ${
                isFavorited ? 'bg-rose-50 text-[#FF4B6E]' : 'bg-white text-slate-400 hover:text-[#FF4B6E]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#FF4B6E]' : ''}`} />
            </button>

            {/* Product Picture with Smooth Hover Zoom */}
            <img
              src={selectedImage || fallbackImage}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply hover:scale-108 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src = fallbackImage;
              }}
            />
          </div>
        </div>

        {/* Right: Product Info & CTAs */}
        <div className="lg:col-span-5 text-left space-y-5">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{product.brand}</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  success('Link copied to clipboard!');
                }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-full"
                title="Share product"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 mt-1 leading-snug">
              {product.name}
            </h1>

            {/* Star Rating & Review Count */}
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              </div>
              <span className="font-bold text-slate-800 text-sm">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-slate-400">({product.reviewCount || 320} reviews)</span>
            </div>
          </div>

          {/* Pricing Row matching Reference */}
          <div className="flex items-baseline gap-3 py-2 border-y border-slate-100">
            <span className="font-heading font-black text-3xl text-slate-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {product.discountPercentage > 0 && (
              <span className="text-xs font-bold text-[#FF4B6E] bg-rose-50 px-2.5 py-1 rounded-full">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Short Description */}
          <p className="text-sm text-slate-600 leading-relaxed">
            {product.shortDescription || product.description.substring(0, 160)}
          </p>

          {/* Attributes Grid (Age Group, Brand, Availability) */}
          <div className="grid grid-cols-2 gap-4 py-3 bg-slate-50/70 rounded-2xl p-4 border border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Age Group</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5 inline-block">
                {product.ageGroup || '3-5 Years'}
              </span>
            </div>
            <div>
              <span className="text-xs text-slate-400 block font-medium">Brand</span>
              <span className="text-sm font-bold text-slate-800 mt-0.5 inline-block">
                {product.brand}
              </span>
            </div>
            <div className="col-span-2 flex items-center justify-between pt-2 border-t border-slate-200/60">
              <span className="text-xs text-slate-400 font-medium">Availability</span>
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  <Check className="w-3.5 h-3.5" />
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full">
                  Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Quantity Selector matching Reference: Quantity  [-] 1 [+] */}
          <div className="flex items-center gap-4 pt-2">
            <span className="text-sm font-bold text-slate-700">Quantity</span>
            <div className="flex items-center rounded-2xl border border-slate-200 bg-white shadow-sm p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                disabled={quantity <= 1}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-bold text-sm text-slate-800">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                disabled={quantity >= product.stock}
                className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-40 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart (outline) & Buy Now (solid pink) */}
          <div className="grid grid-cols-2 gap-3 pt-3">
            <button
              onClick={() => {
                addToCart(product, quantity);
                setAdded(true);
                setTimeout(() => setAdded(false), 1200);
              }}
              className={`py-3.5 px-4 rounded-2xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 ${
                added
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-[#FF4B6E] text-[#FF4B6E] hover:bg-pink-50'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              {added ? 'Added to Cart ✓' : 'Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3.5 px-4 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 fill-white" />
              Buy Now
            </button>
          </div>

          {/* Trust Badges matching Reference */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-purple-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-700">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center">
              <RotateCcw className="w-5 h-5 text-emerald-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-700">Easy Returns</span>
            </div>
            <div className="flex flex-col items-center">
              <Truck className="w-5 h-5 text-blue-600 mb-1" />
              <span className="text-[11px] font-bold text-slate-700">Free Shipping</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Navigation: Description, Specifications, Reviews */}
      <div className="mt-16 pt-8 border-t border-slate-200">
        <div className="flex items-center gap-8 border-b border-slate-200 pb-4">
          <button
            onClick={() => handleTabChange('description')}
            className={`font-heading font-bold text-base pb-2 relative transition-colors ${
              activeTab === 'description' ? 'text-[#FF4B6E]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Description
            {activeTab === 'description' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4B6E] -mb-4"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange('specifications')}
            className={`font-heading font-bold text-base pb-2 relative transition-colors ${
              activeTab === 'specifications' ? 'text-[#FF4B6E]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Specifications
            {activeTab === 'specifications' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4B6E] -mb-4"></span>
            )}
          </button>
          <button
            onClick={() => handleTabChange('reviews')}
            className={`font-heading font-bold text-base pb-2 relative transition-colors ${
              activeTab === 'reviews' ? 'text-[#FF4B6E]' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Reviews ({product.reviewCount || 320})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF4B6E] -mb-4"></span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="py-8 text-left">
          {activeTab === 'description' && (
            <div className="space-y-6 max-w-4xl">
              <p className="text-slate-700 leading-relaxed text-base">{product.description}</p>
              {product.features && product.features.length > 0 && (
                <div>
                  <h4 className="font-heading font-bold text-slate-900 text-lg mb-3">Key Features</h4>
                  <ul className="space-y-2.5">
                    {product.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B6E] mt-2 flex-shrink-0"></span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="max-w-2xl bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
              <table className="w-full text-left text-sm">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-5 font-semibold text-slate-500 bg-slate-50 w-1/3">SKU</td>
                    <td className="py-3 px-5 text-slate-800 font-mono">{product.SKU}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-5 font-semibold text-slate-500 bg-slate-50">Material</td>
                    <td className="py-3 px-5 text-slate-800">{product.material || 'Non-toxic ABS Plastic'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-5 font-semibold text-slate-500 bg-slate-50">Weight</td>
                    <td className="py-3 px-5 text-slate-800">{product.weight || '450g'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 px-5 font-semibold text-slate-500 bg-slate-50">Dimensions</td>
                    <td className="py-3 px-5 text-slate-800">{product.dimensions || '25 x 15 x 10 cm'}</td>
                  </tr>
                  {product.specifications &&
                    Object.entries(product.specifications).map(([key, val]) => (
                      <tr key={key} className="border-b border-slate-100">
                        <td className="py-3 px-5 font-semibold text-slate-500 bg-slate-50">{key}</td>
                        <td className="py-3 px-5 text-slate-800">{val}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8 max-w-4xl">
              {/* Write Review Form */}
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <h4 className="font-heading font-bold text-slate-900 text-base mb-3">Share Your Feedback</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-600">Rating:</span>
                    <div className="flex gap-1 text-amber-400 cursor-pointer">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewRating(star)}
                          className="p-0.5 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-5 h-5 ${star <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell other parents about the toy quality, kid enjoyment, and durability..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full p-3.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF4B6E]/30 focus:border-[#FF4B6E]"
                  />
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="px-6 py-2.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-xs shadow-sm transition-colors disabled:opacity-50"
                  >
                    {submittingReview ? 'Submitting...' : 'Submit Review'}
                  </button>
                </form>
              </div>

              {/* Review List */}
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev._id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-slate-800 text-sm">{rev.userName}</span>
                      <div className="flex items-center text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                    </div>
                    {rev.title && <h5 className="font-bold text-xs text-slate-700 mb-1">{rev.title}</h5>}
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-16 text-left">
          <h3 className="font-heading font-extrabold text-2xl text-slate-900 mb-6">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.slice(0, 4).map((rel) => (
              <ProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
