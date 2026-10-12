import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Heart,
  Plus,
  Minus,
  CheckCircle2,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PackageX,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { api } from '../services/api';
import { IProduct } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { useAuth } from '../context/AuthContext';
import { WonderToysProductCard } from '../components/wondertoys/WonderToysProductCard';
import { WonderToysBenefitsStrip } from '../components/wondertoys/WonderToysBenefitsStrip';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Gallery state
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Purchase state
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  // PIN code checker state
  const [pinCode, setPinCode] = useState('');
  const [pinChecked, setPinChecked] = useState(false);
  const [pinError, setPinError] = useState('');

  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProductDetails = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const res = await api.getProduct(slug);
        if (res?.success && res?.data?.product) {
          const prod = res.data.product;
          setProduct(prod);
          setSelectedImage(prod.images?.[0] || prod.thumbnail);
          setRelatedProducts(res.data.relatedProducts || []);
        }
      } catch (err) {
        console.error('Error loading product details', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-96 bg-slate-100 rounded-3xl" />
          <div className="space-y-4">
            <div className="h-8 bg-slate-200 rounded w-3/4" />
            <div className="h-6 bg-slate-200 rounded w-1/3" />
            <div className="h-24 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <PackageX className="w-12 h-12 text-[#F45A0B] mx-auto mb-3" />
        <h2 className="font-heading font-black text-2xl text-slate-800">
          Product Not Found
        </h2>
        <p className="text-slate-500 text-sm mt-1 mb-6">
          The toy you are looking for may have been moved or is currently unavailable.
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#F45A0B] text-white text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Shop All Toys
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product._id);
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.thumbnail];

  const handlePinCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError('');
    const clean = pinCode.replace(/\D/g, '');
    if (clean.length !== 6) {
      setPinError('Please enter a valid 6-digit Indian PIN code');
      setPinChecked(false);
      return;
    }
    setPinChecked(true);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (!isAuthenticated) {
      toastError('Please log in or sign up to place your order');
      navigate('/login', { state: { from: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const isBestSeller =
    product.isBestSeller || product.slug === 'natural-wooden-train-set';

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 w-full">
        {/* 1. DYNAMIC BREADCRUMB (Exact match to Reference Design 3) */}
        <nav className="flex items-center gap-1.5 text-xs text-[#5F6368] mb-5 select-none flex-wrap">
          <Link to="/" className="hover:text-[#F45A0B] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <Link to="/shop" className="hover:text-[#F45A0B] transition-colors">
            Toys
          </Link>
          <span>&gt;</span>
          <Link
            to={`/shop?category=${encodeURIComponent(product.category)}`}
            className="hover:text-[#F45A0B] transition-colors"
          >
            {product.category}
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* 2. MAIN TWO-COLUMN DETAILS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
          {/* ========================================================
              LEFT COLUMN: PRODUCT IMAGE GALLERY (5 or 6 Cols)
              ======================================================== */}
          <div className="lg:col-span-6 flex flex-col">
            {/* Primary Main Image Container */}
            <div className="relative w-full aspect-[4/3] bg-[#FAF9F5] rounded-2xl overflow-hidden border border-slate-200/80 mb-3 flex items-center justify-center p-4">
              {/* BEST SELLER Badge at top-left */}
              {isBestSeller && (
                <span className="absolute top-4 left-4 z-10 bg-[#F59E0B] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded shadow-xs">
                  BEST SELLER
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative w-20 h-20 sm:w-22 sm:h-22 rounded-xl border-2 overflow-hidden flex-shrink-0 bg-[#FAF9F5] p-1 transition-all ${
                    selectedImage === img
                      ? 'border-[#F45A0B] shadow-xs'
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover mix-blend-multiply"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* ========================================================
              RIGHT COLUMN: PRODUCT INFORMATION & ACTIONS (6 or 7 Cols)
              ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-start">
            {/* Title */}
            <h1 className="font-heading font-black text-xl sm:text-2xl lg:text-[26px] leading-snug text-[#171717] tracking-tight mb-2">
              {product.name}
            </h1>

            {/* Age Badge */}
            <div className="mb-2.5">
              <span className="inline-block px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                Age: {product.ageGroup || '3+ Years'}
              </span>
            </div>

            {/* Star Rating & Review Count */}
            <div className="flex items-center gap-2 text-xs text-[#5F6368] mb-4">
              <span className="font-bold text-slate-800 text-sm">{product.rating.toFixed(1)}</span>
              <div className="flex items-center text-[#F59E0B]">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                  />
                ))}
              </div>
              <span>({product.reviewCount || 282} Customer Reviews)</span>
            </div>

            {/* Price Row matching Reference Design 3 */}
            <div className="flex items-baseline gap-2.5 mb-1 flex-wrap">
              <span className="font-heading font-black text-2xl sm:text-3xl text-slate-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-slate-400 line-through">
                  MRP ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
                  {product.discountPercentage}% OFF
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 mb-4 font-medium">
              Inclusive of all taxes
            </p>

            {/* Trust Badges Row */}
            <div className="flex items-center gap-4 sm:gap-6 py-2.5 px-3 bg-[#F8FAFC] rounded-xl border border-slate-100 mb-5 text-[11px] sm:text-xs font-semibold text-slate-700 flex-wrap">
              <div className="flex items-center gap-1.5">
                <span>🌿</span>
                <span>100% Non-Toxic Natural Wood</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🇮🇳</span>
                <span>Made in India</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>🛡️</span>
                <span>BIS Certified</span>
              </div>
            </div>

            {/* Delivery & Services Card (Compact card with PIN code check) */}
            <div className="p-3.5 bg-[#FAF9F5] rounded-xl border border-slate-200/90 mb-5 max-w-md">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                Delivery & Services
              </h3>
              <form onSubmit={handlePinCheck} className="flex gap-2 mb-2">
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter PIN Code"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="flex-1 h-9 px-3 rounded-lg border border-slate-300 text-xs text-slate-800 placeholder-slate-400 bg-white focus:outline-none focus:border-[#F45A0B]"
                />
                <button
                  type="submit"
                  className="h-9 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 uppercase transition-colors"
                >
                  CHECK
                </button>
              </form>

              {pinError && (
                <p className="text-[11px] text-red-500 font-medium mb-1.5">{pinError}</p>
              )}

              {pinChecked ? (
                <div className="space-y-1 text-xs text-emerald-800 font-medium pt-1">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Free delivery by Tuesday, 13 Oct</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>Cash on Delivery Available</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-1 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Free delivery on orders over ₹999</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Cash on Delivery available on eligible pin codes</span>
                  </div>
                </div>
              )}
            </div>

            {/* Quantity Selector + Add to Cart + Buy Now + Wishlist Row */}
            <div className="space-y-3 mb-6 max-w-lg">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-300 rounded-lg h-11 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(q - 1, 1))}
                    className="w-9 h-full flex items-center justify-center text-slate-600 hover:text-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center font-bold text-sm text-slate-800 select-none">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.min(q + 1, product.stock || 20))}
                    className="w-9 h-full flex items-center justify-center text-slate-600 hover:text-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* ADD TO CART Button */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`flex-1 h-11 rounded-lg text-white font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 ${
                    added ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-[#F45A0B] hover:bg-[#DD4D06]'
                  }`}
                >
                  {added ? 'ADDED TO CART ✓' : 'ADD TO CART'}
                </button>

                {/* BUY NOW Button */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="h-11 px-5 rounded-lg border-2 border-slate-300 hover:border-slate-400 bg-white text-slate-800 font-bold text-xs sm:text-sm uppercase tracking-wider transition-colors active:scale-98"
                >
                  BUY NOW
                </button>
              </div>

              {/* Wishlist Button */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg border transition-colors ${
                    isFavorited
                      ? 'border-rose-200 bg-rose-50 text-rose-600'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
                  <span>{isFavorited ? 'Added to Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>

            {/* Product Feature Bullets */}
            <div className="pt-4 border-t border-slate-100">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                Key Features & Highlights
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.features && product.features.length > 0 ? (
                  product.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F45A0B] mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F45A0B] mt-0.5">•</span>
                      <span>Contains 80 pieces of high-quality, sustainably sourced wood</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F45A0B] mt-0.5">•</span>
                      <span>Encourages motor skills, hand-eye coordination, and spatial imagination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F45A0B] mt-0.5">•</span>
                      <span>Compatible with other major wooden railway brands</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#F45A0B] mt-0.5">•</span>
                      <span>100% natural birchwood with child-safe, non-toxic water-based paints</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. CUSTOMERS ALSO VIEWED CAROUSEL (4 Product Cards) */}
        <section className="pt-8 sm:pt-10 pb-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#171717] tracking-tight">
              Customers Also Viewed
            </h2>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('related-products-grid');
                  if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
                }}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4 text-slate-600" />
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('related-products-grid');
                  if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
                }}
                className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4 text-slate-600" />
              </button>
            </div>
          </div>

          <div
            id="related-products-grid"
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto scrollbar-none pb-2"
          >
            {relatedProducts.slice(0, 4).map((rel) => (
              <WonderToysProductCard key={rel._id} product={rel} />
            ))}
          </div>
        </section>
      </div>

      {/* 4. SHARED BENEFITS STRIP */}
      <WonderToysBenefitsStrip />
    </div>
  );
};
