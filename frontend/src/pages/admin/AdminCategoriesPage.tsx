import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Layers, Check } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { ICategory } from '../../types';
import { useToast } from '../../context/ToastContext';

export const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { success, error: toastError } = useToast();

  const fetchCats = async () => {
    try {
      setLoading(true);
      const res = await api.getCategories();
      if (res.success && res.data) {
        setCategories(res.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <AdminLayout title="Categories Management">
      <div className="space-y-6 text-left">
        <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div>
            <h3 className="font-heading font-bold text-base text-slate-800">Product Categories</h3>
            <p className="text-xs text-slate-400">Total {categories.length} active toy departments</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((c) => (
            <div
              key={c._id}
              className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-pink-50 p-1.5 flex items-center justify-center flex-shrink-0">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">{c.name}</h4>
                  <span className="text-xs text-slate-400 font-medium">{c.productCount || 0} toys</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 mt-3 line-clamp-2 leading-relaxed">
                {c.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};
