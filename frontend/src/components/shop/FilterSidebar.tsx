import React from 'react';
import { Star, RotateCcw } from 'lucide-react';

export interface FilterState {
  category: string[];
  ageGroup: string[];
  brand: string[];
  priceMax: number;
  minRating: number;
  inStock: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  availableBrands?: string[];
  availableCategories?: string[];
}

const allCategories = [
  { name: 'Action Figures', count: 12 },
  { name: 'Educational Toys', count: 20 },
  { name: 'Remote Control', count: 15 },
  { name: 'Dolls', count: 18 },
  { name: 'Cars & Vehicles', count: 16 },
  { name: 'Board Games', count: 10 },
  { name: 'Baby Toys', count: 14 },
  { name: 'Outdoor Toys', count: 12 },
  { name: 'Puzzles', count: 15 },
  { name: 'STEM Toys', count: 16 },
  { name: 'Building Blocks', count: 22 },
  { name: 'Arts & Crafts', count: 14 },
];

const ageGroups = ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years', '12+ Years'];

const standardBrands = ['LEGO', 'Mattel', 'Hot Wheels', 'Hasbro', 'Funskool', 'Fisher-Price', 'Make Believe', 'Play-Doh', 'Nerf'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onReset,
}) => {
  const toggleCategory = (cat: string) => {
    const next = filters.category.includes(cat)
      ? filters.category.filter((c) => c !== cat)
      : [...filters.category, cat];
    onFilterChange({ ...filters, category: next });
  };

  const toggleAgeGroup = (age: string) => {
    const next = filters.ageGroup.includes(age)
      ? filters.ageGroup.filter((a) => a !== age)
      : [...filters.ageGroup, age];
    onFilterChange({ ...filters, ageGroup: next });
  };

  const toggleBrand = (b: string) => {
    const next = filters.brand.includes(b)
      ? filters.brand.filter((item) => item !== b)
      : [...filters.brand, b];
    onFilterChange({ ...filters, brand: next });
  };

  return (
    <aside className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 text-left">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <h3 className="font-heading font-bold text-lg text-slate-900">Filters</h3>
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#FF4B6E] hover:text-[#E11D48] flex items-center gap-1 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      {/* Category Filter matching Reference Image */}
      <div>
        <h4 className="font-heading font-bold text-sm text-slate-800 mb-3">Category</h4>
        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {allCategories.map((cat) => {
            const isChecked = filters.category.includes(cat.name);
            return (
              <label
                key={cat.name}
                className="flex items-center justify-between text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.name)}
                    className="w-4 h-4 rounded text-[#FF4B6E] focus:ring-[#FF4B6E] border-slate-300 cursor-pointer accent-[#FF4B6E]"
                  />
                  <span className={isChecked ? 'font-bold text-[#FF4B6E]' : ''}>{cat.name}</span>
                </div>
                <span className="text-[11px] text-slate-400">({cat.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Age Group */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="font-heading font-bold text-sm text-slate-800 mb-3">Age Group</h4>
        <div className="space-y-2">
          {ageGroups.map((age) => {
            const isChecked = filters.ageGroup.includes(age);
            return (
              <label
                key={age}
                className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleAgeGroup(age)}
                  className="w-4 h-4 rounded text-[#FF4B6E] focus:ring-[#FF4B6E] border-slate-300 cursor-pointer accent-[#FF4B6E]"
                />
                <span className={isChecked ? 'font-bold text-[#FF4B6E]' : ''}>{age}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Brand */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="font-heading font-bold text-sm text-slate-800 mb-3">Brand</h4>
        <div className="space-y-2">
          {standardBrands.map((brand) => {
            const isChecked = filters.brand.includes(brand);
            return (
              <label
                key={brand}
                className="flex items-center gap-2.5 text-xs text-slate-600 hover:text-slate-900 cursor-pointer select-none py-0.5"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBrand(brand)}
                  className="w-4 h-4 rounded text-[#FF4B6E] focus:ring-[#FF4B6E] border-slate-300 cursor-pointer accent-[#FF4B6E]"
                />
                <span className={isChecked ? 'font-bold text-[#FF4B6E]' : ''}>{brand}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="pt-4 border-t border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-heading font-bold text-sm text-slate-800">Price Range</h4>
          <span className="text-xs font-bold text-[#FF4B6E]">₹0 - ₹{filters.priceMax.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="200"
          max="5000"
          step="100"
          value={filters.priceMax}
          onChange={(e) => onFilterChange({ ...filters, priceMax: Number(e.target.value) })}
          className="w-full accent-[#FF4B6E] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-slate-400 mt-1">
          <span>₹200</span>
          <span>₹5,000</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="pt-4 border-t border-slate-100">
        <h4 className="font-heading font-bold text-sm text-slate-800 mb-3">Rating</h4>
        <div className="space-y-2">
          {[5, 4, 3].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() =>
                onFilterChange({
                  ...filters,
                  minRating: filters.minRating === star ? 0 : star,
                })
              }
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs transition-colors ${
                filters.minRating === star ? 'bg-pink-50 text-[#FF4B6E] font-bold' : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${i < star ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
                  />
                ))}
                <span className="text-slate-700 font-medium ml-1.5">& Up</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* In Stock Only */}
      <div className="pt-4 border-t border-slate-100">
        <label className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer font-medium">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => onFilterChange({ ...filters, inStock: e.target.checked })}
            className="w-4 h-4 rounded text-[#FF4B6E] focus:ring-[#FF4B6E] border-slate-300 cursor-pointer accent-[#FF4B6E]"
          />
          In Stock Only
        </label>
      </div>
    </aside>
  );
};
