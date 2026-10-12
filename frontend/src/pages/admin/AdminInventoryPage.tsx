import React, { useEffect, useState } from 'react';
import { Search, AlertTriangle, Check, RefreshCw } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminInventoryPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const { success, error: toastError } = useToast();

  const fetchInventory = async () => {
    try {
      setLoading(true);
      const res = await api.getInventory({ status: filterStatus === 'all' ? undefined : filterStatus, q: search });
      if (res.success && res.data) {
        setProducts(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, [filterStatus]);

  const handleUpdateStock = async (id: string, newStock: number) => {
    if (newStock < 0) return;
    setUpdatingId(id);
    try {
      const res = await api.updateStock(id, newStock);
      if (res.success) {
        success('Stock quantity updated');
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, stock: newStock } : p))
        );
      }
    } catch (err: any) {
      toastError(err.message || 'Failed to update stock');
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminLayout title="Inventory & Stock Tracking">
      <div className="space-y-6 text-left">
        {/* Controls */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by SKU, product name, or brand..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchInventory()}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B6E]"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B6E]"
            >
              <option value="all">All Inventory</option>
              <option value="low">Low Stock (≤ 5 units)</option>
              <option value="out">Out of Stock (0 units)</option>
              <option value="in">In Stock (&gt; 5 units)</option>
            </select>
            <button
              onClick={fetchInventory}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Inventory Table matching Section 23 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 px-3">Product</th>
                <th className="pb-3 px-3">SKU</th>
                <th className="pb-3 px-3">Brand</th>
                <th className="pb-3 px-3">Price</th>
                <th className="pb-3 px-3">Stock Units</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => {
                const isOutOfStock = p.stock === 0;
                const isLowStock = p.stock > 0 && p.stock <= 5;

                return (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 border p-1 flex-shrink-0">
                          <img
                            src={p.thumbnail}
                            alt={p.name}
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <span className="font-bold text-slate-800 line-clamp-1 max-w-xs">{p.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600">{p.SKU}</td>
                    <td className="py-3 px-3 text-slate-600">{p.brand}</td>
                    <td className="py-3 px-3 font-bold text-slate-900">₹{p.price.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-3 font-bold text-slate-800">{p.stock}</td>
                    <td className="py-3 px-3">
                      {isOutOfStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          <AlertTriangle className="w-3 h-3" />
                          Out of Stock
                        </span>
                      ) : isLowStock ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <AlertTriangle className="w-3 h-3" />
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <Check className="w-3 h-3" />
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleUpdateStock(p._id, p.stock + 5)}
                          disabled={updatingId === p._id}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#FF4B6E] hover:text-white text-slate-700 font-bold text-xs transition-colors"
                        >
                          +5
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStock(p._id, p.stock + 20)}
                          disabled={updatingId === p._id}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#FF4B6E] hover:text-white text-slate-700 font-bold text-xs transition-colors"
                        >
                          +20
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
