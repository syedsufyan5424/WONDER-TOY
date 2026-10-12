import React from 'react';

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 p-4 shadow-sm animate-pulse flex flex-col justify-between">
      <div className="w-full aspect-square bg-slate-100 rounded-2xl mb-3.5"></div>
      <div className="space-y-2">
        <div className="h-3 bg-slate-100 rounded-full w-1/3"></div>
        <div className="h-4 bg-slate-200 rounded-full w-3/4"></div>
        <div className="h-3 bg-slate-100 rounded-full w-1/2"></div>
        <div className="h-5 bg-slate-200 rounded-full w-2/5"></div>
      </div>
      <div className="h-10 bg-slate-100 rounded-2xl w-full mt-4"></div>
    </div>
  );
};

export const CategoryCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col items-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full mb-3"></div>
      <div className="h-4 bg-slate-200 rounded-full w-20 mb-1"></div>
      <div className="h-3 bg-slate-100 rounded-full w-12"></div>
    </div>
  );
};

export const ProductDetailsSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="aspect-square bg-slate-100 rounded-3xl"></div>
        <div className="space-y-4">
          <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          <div className="h-4 bg-slate-100 rounded w-1/4"></div>
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-20 bg-slate-100 rounded"></div>
          <div className="h-12 bg-slate-200 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};
