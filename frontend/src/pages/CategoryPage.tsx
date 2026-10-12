import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { ICategory, IProduct } from '../types';
import { WonderToysProductCard } from '../components/wondertoys/WonderToysProductCard';
import { ProductCardSkeleton } from '../components/common/LoadingSkeleton';
import { ArrowLeft } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [category, setCategory] = useState<ICategory | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryData = async () => {
      setLoading(true);
      try {
        if (categorySlug) {
          const catRes = await api.getCategory(categorySlug);
          if (catRes.success && catRes.data) {
            setCategory(catRes.data);
            const prodRes = await api.getProducts({ category: catRes.data.name });
            if (prodRes.success && prodRes.data) {
              setProducts(prodRes.data.products);
            }
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCategoryData();
  }, [categorySlug]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <Link
        to="/shop"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#F45A0B] mb-6 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to All Toys
      </Link>

      {/* Category Header Banner */}
      {category && (
        <div className="bg-[#FAF9F5] rounded-3xl p-6 sm:p-10 border border-slate-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold text-[#F45A0B] uppercase tracking-wider">Toy Category</span>
            <h1 className="font-heading font-black text-3xl sm:text-4xl text-slate-900 tracking-tight">
              {category.name}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">{category.description}</p>
          </div>
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shadow-md border-2 border-white flex-shrink-0">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[...Array(8)].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border">
          <p className="text-slate-500 text-sm">No toys currently available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((p) => (
            <WonderToysProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};
