import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ICategory } from '../../types';
import { api } from '../../services/api';
import { CategoryCardSkeleton } from '../common/LoadingSkeleton';

const fallbackCategoryImages: Record<string, string> = {
  'Action Figures': 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=300&q=80',
  'Educational Toys': 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=300&q=80',
  'Remote Control': 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&q=80',
  'Dolls': 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?auto=format&fit=crop&w=300&q=80',
  'Cars & Vehicles': 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?auto=format&fit=crop&w=300&q=80',
  'Board Games': 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=300&q=80',
  'Baby Toys': 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=300&q=80',
  'Outdoor Toys': 'https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?auto=format&fit=crop&w=300&q=80',
  'Puzzles': 'https://images.unsplash.com/photo-1591991731833-b4807cf7ef94?auto=format&fit=crop&w=300&q=80',
  'STEM Toys': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=300&q=80',
  'Building Blocks': 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=300&q=80',
  'Arts & Crafts': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=300&q=80',
};

export const CategoryGrid: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCategories()
      .then((res) => {
        if (res.success && res.data) {
          setCategories(res.data);
        }
      })
      .catch((err) => console.error('Error fetching categories:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header with Title and "View All ->" */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
            Shop by Category
          </h2>
          <p className="text-sm text-slate-500 mt-1">Explore toys curated for every smile and imagination</p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[#FF4B6E] hover:text-[#E11D48] hover:translate-x-1 transition-all"
        >
          View All
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Categories Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {[...Array(12)].map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {categories.map((cat) => (
            <Link
              key={cat._id}
              to={`/category/${cat.slug}`}
              className="group bg-white rounded-3xl p-4 border border-slate-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 flex flex-col items-center text-center transform hover:-translate-y-1"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FFF5F7] group-hover:bg-[#FFE4E8] flex items-center justify-center p-2 mb-3 transition-colors overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      fallbackCategoryImages[cat.name] ||
                      'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=300&q=80';
                  }}
                />
              </div>
              <h3 className="font-heading font-bold text-xs sm:text-sm text-slate-800 group-hover:text-[#FF4B6E] line-clamp-1 transition-colors">
                {cat.name}
              </h3>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {cat.productCount ? `${cat.productCount} items` : 'Explore'}
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
