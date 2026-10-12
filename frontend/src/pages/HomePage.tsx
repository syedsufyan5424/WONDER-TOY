import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { WONDERTOYS_CATEGORIES } from '../services/productData';
import { WonderToysProductCard } from '../components/wondertoys/WonderToysProductCard';
import { WonderToysBenefitsStrip } from '../components/wondertoys/WonderToysBenefitsStrip';
import { api } from '../services/api';
import { IProduct } from '../types';

export const HomePage: React.FC = () => {
  const [bestSellers, setBestSellers] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchHomeProducts = async () => {
      try {
        const res = await api.getBestSellers();
        if (res?.success && res?.data) {
          setBestSellers(res.data);
        }
      } catch (err) {
        console.warn('Error fetching bestsellers', err);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeProducts();
  }, []);

  const handleScrollToBestsellers = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('trending-bestsellers');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/shop?sort=bestsellers');
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] min-h-screen flex flex-col">
      {/* 4. HERO BANNER (Exact match to Reference Design 1) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:py-6">
        <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs border border-slate-100 bg-[#FAF9F5] min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex items-center">
          {/* Background Image: Kids playing with blocks and train in sunny living room */}
          <div className="absolute inset-0 z-0">
            <img
              src="/assets/wondertoys/hero-banner.jpg"
              alt="Children playing with toys in sunny living room"
              className="w-full h-full object-cover object-[center_right] sm:object-right"
            />
            {/* Soft subtle gradient overlay on the left to ensure maximum text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent sm:via-white/60 sm:to-transparent lg:w-3/5" />
          </div>

          {/* Left Content Area */}
          <div className="relative z-10 max-w-xl pl-6 sm:pl-12 lg:pl-16 py-10 pr-4">
            <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-[46px] leading-[1.1] text-[#171717] tracking-tight uppercase mb-3 sm:mb-4">
              BRING IMAGINATION<br />
              TO LIFE.
            </h1>

            <p className="text-sm sm:text-base text-[#5F6368] font-normal leading-relaxed max-w-md mb-6 sm:mb-8">
              Thoughtfully curated premium toys designed to inspire, educate, and delight.
            </p>

            <a
              href="#trending-bestsellers"
              onClick={handleScrollToBestsellers}
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg bg-[#F45A0B] hover:bg-[#DD4D06] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 shadow-md shadow-orange-500/25 active:scale-98"
            >
              <span>SHOP BESTSELLERS</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. SHOP BY CATEGORY (Exact match to Reference Design 1: 6 Circular Image Tiles) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="mb-6 sm:mb-8">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#171717] tracking-tight">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 lg:gap-8">
          {WONDERTOYS_CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group flex flex-col items-center text-center transition-transform duration-200 hover:-translate-y-1"
            >
              {/* Circular Tile with border & subtle shadow */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden border-2 border-slate-100 group-hover:border-[#F45A0B] shadow-2xs group-hover:shadow-md transition-all duration-200 bg-[#F8FAFC] flex items-center justify-center p-2 mb-2.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover rounded-full group-hover:scale-108 transition-transform duration-300"
                />
              </div>

              {/* Category Label */}
              <span className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-[#F45A0B] transition-colors leading-tight">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. TRENDING BEST SELLERS (Exact match to Reference Design 1: 4 Cards) */}
      <section
        id="trending-bestsellers"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex-1"
      >
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#171717] tracking-tight">
            Trending Best Sellers
          </h2>
          <Link
            to="/shop?sort=bestsellers"
            className="text-xs sm:text-sm font-semibold text-[#F45A0B] hover:text-[#DD4D06] flex items-center gap-1 transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-slate-100 rounded-2xl h-80 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map((product) => (
              <WonderToysProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 7. SHARED BENEFITS STRIP (Bottom of Homepage) */}
      <WonderToysBenefitsStrip />
    </div>
  );
};
