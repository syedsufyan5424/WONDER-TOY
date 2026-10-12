import React, { useEffect, useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  ChevronDown,
  ChevronUp,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Search,
  X,
  SlidersHorizontal,
  PackageX,
} from 'lucide-react';
import { api } from '../services/api';
import { IProduct } from '../types';
import { WonderToysProductCard } from '../components/wondertoys/WonderToysProductCard';
import { WonderToysBenefitsStrip } from '../components/wondertoys/WonderToysBenefitsStrip';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryQ = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialSort = searchParams.get('sort') || 'popular';

  // Products and states
  const [allProducts, setAllProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState(initialSort);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Filter States
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedAges, setSelectedAges] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [priceSlider, setPriceSlider] = useState<number>(7000);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDiscounts, setSelectedDiscounts] = useState<number[]>([]);

  // Collapsible accordion states
  const [openSections, setOpenSections] = useState({
    category: true,
    age: true,
    price: true,
    rating: true,
    discount: true,
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync category param from URL
  useEffect(() => {
    if (initialCategory && !selectedCategories.includes(initialCategory)) {
      setSelectedCategories([initialCategory]);
    }
  }, [initialCategory]);

  // Fetch catalog products
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const res = await api.getProducts({ limit: 100 });
        if (res?.success && res?.data?.products) {
          setAllProducts(res.data.products);
        }
      } catch (err) {
        console.error('Error loading products', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // 1. Search Query
    if (queryQ.trim()) {
      const q = queryQ.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand?.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // 2. Categories
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.some((cat) => {
          const cLower = cat.toLowerCase();
          return (
            p.category.toLowerCase().includes(cLower) ||
            (cLower.includes('plush') && p.category.toLowerCase().includes('doll')) ||
            (cLower.includes('stem') && p.category.toLowerCase().includes('stem')) ||
            (cLower.includes('block') && p.category.toLowerCase().includes('block'))
          );
        })
      );
    }

    // 3. Age Recommendation
    if (selectedAges.length > 0) {
      result = result.filter((p) => {
        if (!p.ageGroup) return false;
        return selectedAges.some((age) => {
          if (age === '0-2 Years') return p.ageGroup.includes('0-2');
          if (age === '3-4 Years') return p.ageGroup.includes('3-5') || p.ageGroup.includes('3-4');
          if (age === '5-7 Years') return p.ageGroup.includes('3-5') || p.ageGroup.includes('6-8');
          if (age === '8-11 Years') return p.ageGroup.includes('6-8') || p.ageGroup.includes('9-12');
          if (age === '12+ Years') return p.ageGroup.includes('12+');
          return false;
        });
      });
    }

    // 4. Price Ranges & Slider
    if (priceSlider < 7000) {
      result = result.filter((p) => p.price <= priceSlider);
    }

    if (selectedPriceRanges.length > 0) {
      result = result.filter((p) =>
        selectedPriceRanges.some((range) => {
          if (range === 'under500') return p.price < 500;
          if (range === '500-999') return p.price >= 500 && p.price <= 999;
          if (range === '1000-1999') return p.price >= 1000 && p.price <= 1999;
          if (range === '2000-4999') return p.price >= 2000 && p.price <= 4999;
          if (range === '5000+') return p.price >= 5000;
          return true;
        })
      );
    }

    // 5. Rating
    if (selectedRating !== null) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // 6. Discount
    if (selectedDiscounts.length > 0) {
      const minDiscount = Math.min(...selectedDiscounts);
      result = result.filter((p) => p.discountPercentage >= minDiscount);
    }

    // 7. Sorting
    switch (sortBy) {
      case 'popular':
      case 'bestsellers':
        result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || (b.reviewCount || 0) - (a.reviewCount || 0));
        break;
      case 'newest':
        result.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'discount':
        result.sort((a, b) => b.discountPercentage - a.discountPercentage);
        break;
      default:
        break;
    }

    return result;
  }, [
    allProducts,
    queryQ,
    selectedCategories,
    selectedAges,
    selectedPriceRanges,
    priceSlider,
    selectedRating,
    selectedDiscounts,
    sortBy,
  ]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [
    queryQ,
    selectedCategories,
    selectedAges,
    selectedPriceRanges,
    priceSlider,
    selectedRating,
    selectedDiscounts,
    sortBy,
  ]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedAges([]);
    setSelectedPriceRanges([]);
    setPriceSlider(7000);
    setSelectedRating(null);
    setSelectedDiscounts([]);
    if (queryQ) {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedAges.length > 0 ||
    selectedPriceRanges.length > 0 ||
    priceSlider < 7000 ||
    selectedRating !== null ||
    selectedDiscounts.length > 0 ||
    !!queryQ;

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className="w-full bg-white min-h-screen flex flex-col">
      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex-1 w-full">
        {/* 1. BREADCRUMB (Home > Shop All Toys) */}
        <nav className="flex items-center gap-1.5 text-xs text-[#5F6368] mb-3 select-none">
          <Link to="/" className="hover:text-[#F45A0B] transition-colors">
            Home
          </Link>
          <span>&gt;</span>
          <span className="text-slate-800 font-medium">Shop All Toys</span>
        </nav>

        {/* 2. PAGE HEADER ROW: Heading + Product Count + Sorting Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h1 className="font-heading font-black text-2xl sm:text-[28px] text-[#171717] tracking-tight">
              Shop All Toys{' '}
              <span className="text-sm sm:text-base font-normal text-[#5F6368]">
                ({filteredProducts.length} products)
              </span>
            </h1>
          </div>

          {/* Right Controls: Sort Dropdown & Grid/List View Toggles */}
          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 py-1.5 px-3 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-2">
              <span className="text-xs font-medium text-[#5F6368] hidden md:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 pl-3 pr-8 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:border-[#F45A0B] cursor-pointer shadow-2xs appearance-none"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="discount">Biggest Discount</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 pointer-events-none" />
            </div>

            {/* Grid / List View Toggle Buttons */}
            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#F45A0B] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#F45A0B] shadow-2xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Search & Filter Tag Bar */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-5 pb-3">
            <span className="text-xs font-medium text-slate-400">Active Filters:</span>
            {queryQ && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-xs text-[#F45A0B] font-semibold">
                Search: "{queryQ}"
                <button
                  onClick={() => {
                    searchParams.delete('q');
                    setSearchParams(searchParams);
                  }}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategories.map((c) => (
              <span
                key={c}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium"
              >
                {c}
                <button
                  onClick={() =>
                    setSelectedCategories((prev) => prev.filter((item) => item !== c))
                  }
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedAges.map((a) => (
              <span
                key={a}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-700 font-medium"
              >
                Age: {a}
                <button
                  onClick={() => setSelectedAges((prev) => prev.filter((item) => item !== a))}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearAllFilters}
              className="text-xs text-[#F45A0B] hover:underline font-semibold ml-2 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              Clear All
            </button>
          </div>
        )}

        {/* 3. MAIN CATALOG LAYOUT: Left Filter Sidebar + Right Product Grid */}
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* ========================================================
              LEFT FILTER SIDEBAR (~200px - 220px)
              ======================================================== */}
          <aside className="w-full lg:w-56 flex-shrink-0 hidden lg:block select-none">
            <div className="space-y-5 pr-2">
              {/* Category Filter */}
              <div className="pb-4 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleSection('category')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2"
                >
                  <span>Category</span>
                  {openSections.category ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {openSections.category && (
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {[
                      'Wooden Toys',
                      'STEM & Learning',
                      'Dolls & Plush',
                      'Building Blocks',
                      'Outdoor & Active',
                      'Art & Craft',
                    ].map((cat) => {
                      const checked = selectedCategories.includes(cat);
                      return (
                        <label
                          key={cat}
                          className="flex items-center gap-2 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedCategories((prev) => [...prev, cat]);
                              } else {
                                setSelectedCategories((prev) =>
                                  prev.filter((c) => c !== cat)
                                );
                              }
                            }}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#F45A0B] focus:ring-[#F45A0B] accent-[#F45A0B]"
                          />
                          <span>{cat}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Age Filter */}
              <div className="pb-4 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleSection('age')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2"
                >
                  <span>Age</span>
                  {openSections.age ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {openSections.age && (
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {[
                      '0-2 Years',
                      '3-4 Years',
                      '5-7 Years',
                      '8-11 Years',
                      '12+ Years',
                    ].map((age) => {
                      const checked = selectedAges.includes(age);
                      return (
                        <label
                          key={age}
                          className="flex items-center gap-2 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedAges((prev) => [...prev, age]);
                              } else {
                                setSelectedAges((prev) =>
                                  prev.filter((a) => a !== age)
                                );
                              }
                            }}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#F45A0B] focus:ring-[#F45A0B] accent-[#F45A0B]"
                          />
                          <span>{age}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Price Filter & Range Slider */}
              <div className="pb-4 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleSection('price')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2"
                >
                  <span>Price</span>
                  {openSections.price ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {openSections.price && (
                  <div className="space-y-2 text-xs text-slate-600 pt-1">
                    {[
                      { label: 'under ₹500', value: 'under500' },
                      { label: '₹500 - ₹999', value: '500-999' },
                      { label: '₹1,000 - ₹1,999', value: '1000-1999' },
                      { label: '₹2,000 - ₹4,999', value: '2000-4999' },
                      { label: '₹5,000+', value: '5000+' },
                    ].map((item) => {
                      const checked = selectedPriceRanges.includes(item.value);
                      return (
                        <label
                          key={item.value}
                          className="flex items-center gap-2 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPriceRanges((prev) => [
                                  ...prev,
                                  item.value,
                                ]);
                              } else {
                                setSelectedPriceRanges((prev) =>
                                  prev.filter((p) => p !== item.value)
                                );
                              }
                            }}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#F45A0B] focus:ring-[#F45A0B] accent-[#F45A0B]"
                          />
                          <span>{item.label}</span>
                        </label>
                      );
                    })}

                    {/* Price Range Slider */}
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                        <span>Price Range</span>
                        <span className="font-semibold text-slate-800">
                          ₹{priceSlider >= 7000 ? '7,000+' : priceSlider.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="7000"
                        step="250"
                        value={priceSlider}
                        onChange={(e) => setPriceSlider(Number(e.target.value))}
                        className="w-full accent-[#F45A0B] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>₹500</span>
                        <span>₹5,000+</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Rating Filter */}
              <div className="pb-4 border-b border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleSection('rating')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2"
                >
                  <span>Rating</span>
                  {openSections.rating ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {openSections.rating && (
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {[4, 3, 2, 1].map((stars) => {
                      const checked = selectedRating === stars;
                      return (
                        <label
                          key={stars}
                          className="flex items-center gap-2 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => {
                              setSelectedRating(checked ? null : stars);
                            }}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#F45A0B] focus:ring-[#F45A0B] accent-[#F45A0B]"
                          />
                          <span>{stars}★ & above</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Discount Filter */}
              <div className="pb-4">
                <button
                  type="button"
                  onClick={() => toggleSection('discount')}
                  className="w-full flex items-center justify-between text-xs font-bold text-slate-800 uppercase tracking-wider mb-2"
                >
                  <span>Discount</span>
                  {openSections.discount ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {openSections.discount && (
                  <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                    {[10, 20, 30, 40].map((disc) => {
                      const checked = selectedDiscounts.includes(disc);
                      return (
                        <label
                          key={disc}
                          className="flex items-center gap-2 cursor-pointer hover:text-slate-900"
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedDiscounts((prev) => [...prev, disc]);
                              } else {
                                setSelectedDiscounts((prev) =>
                                  prev.filter((d) => d !== disc)
                                );
                              }
                            }}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#F45A0B] focus:ring-[#F45A0B] accent-[#F45A0B]"
                          />
                          <span>{disc}% off & more</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* ========================================================
              RIGHT PRODUCT LISTING (4 Cards per row on desktop)
              ======================================================== */}
          <div className="flex-1 w-full">
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="bg-slate-100 rounded-2xl h-80 w-full" />
                ))}
              </div>
            ) : currentProducts.length === 0 ? (
              <div className="text-center py-16 px-4 bg-slate-50/60 rounded-2xl border border-slate-100">
                <PackageX className="w-12 h-12 text-slate-400 mx-auto mb-3" />
                <h3 className="font-heading font-bold text-lg text-slate-800">
                  No Matching Toys Found
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-5 max-w-sm mx-auto">
                  We couldn't find any products matching your selected filter criteria. Try clearing some filters.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 rounded-lg bg-[#F45A0B] text-white text-xs font-bold uppercase tracking-wider"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 sm:gap-4'
                    : 'space-y-4'
                }
              >
                {currentProducts.map((product) => (
                  <WonderToysProductCard
                    key={product._id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}

            {/* 8. PAGINATION (< Prev 1 2 3 4 5 ... Next >) */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-10 pt-6 border-t border-slate-100 text-xs font-semibold select-none">
                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? 'bg-[#F45A0B] text-white font-bold shadow-xs'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 9. SHARED BENEFITS STRIP */}
      <WonderToysBenefitsStrip />
    </div>
  );
};
