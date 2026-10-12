import React, { useEffect, useState } from 'react';
import { Plus, Search, Edit2, Trash2, Check, X, Package } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { IProduct } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminProductsPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);

  const { success, error: toastError } = useToast();

  const [form, setForm] = useState({
    name: '',
    SKU: '',
    brand: 'Funskool',
    category: 'Educational Toys',
    price: 999,
    originalPrice: 1299,
    stock: 20,
    ageGroup: '3-5 Years' as any,
    description: '',
    shortDescription: '',
    thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.getProducts({ limit: 100 });
      if (res.success && res.data) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm({
      name: '',
      SKU: `TYV-${Math.floor(100 + Math.random() * 900)}`,
      brand: 'Funskool',
      category: 'Educational Toys',
      price: 999,
      originalPrice: 1299,
      stock: 20,
      ageGroup: '3-5 Years',
      description: 'Engaging and durable toy designed to spark creative thinking.',
      shortDescription: 'Safe, certified educational toy for curious children.',
      thumbnail: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: IProduct) => {
    setEditingProduct(p);
    setForm({
      name: p.name,
      SKU: p.SKU,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      stock: p.stock,
      ageGroup: p.ageGroup,
      description: p.description,
      shortDescription: p.shortDescription || '',
      thumbnail: p.thumbnail,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await api.deleteProduct(id);
      success('Product deleted successfully');
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      toastError(err.message || 'Failed to delete product');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingProduct) {
        const res = await api.updateProduct(editingProduct._id, form);
        if (res.success) {
          success('Product updated successfully');
          fetchProducts();
          setShowModal(false);
        }
      } else {
        const res = await api.createProduct({
          ...form,
          images: [form.thumbnail],
        });
        if (res.success) {
          success('Product created successfully');
          fetchProducts();
          setShowModal(false);
        }
      }
    } catch (err: any) {
      toastError(err.message || 'Operation failed');
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.SKU.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory ? p.category === selectedCategory : true;
    return matchesSearch && matchesCat;
  });

  return (
    <AdminLayout title="Products Management">
      <div className="space-y-6">
        {/* Top Controls Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 w-full sm:w-auto flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products by name, brand, SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B6E]"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={handleOpenAdd}
              className="px-5 py-2.5 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-x-auto text-left">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 px-3">Product</th>
                <th className="pb-3 px-3">SKU</th>
                <th className="pb-3 px-3">Category</th>
                <th className="pb-3 px-3">Brand</th>
                <th className="pb-3 px-3">Price</th>
                <th className="pb-3 px-3">Stock</th>
                <th className="pb-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-slate-100 p-1 flex-shrink-0">
                        <img
                          src={p.thumbnail || p.images?.[0]}
                          alt={p.name}
                          className="w-full h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 line-clamp-1 max-w-xs">{p.name}</p>
                        <span className="text-[11px] text-slate-400">★ {p.rating} ({p.reviewCount})</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{p.SKU}</td>
                  <td className="py-3 px-3 text-slate-600">{p.category}</td>
                  <td className="py-3 px-3 font-medium text-slate-700">{p.brand}</td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    ₹{p.price.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        p.stock === 0
                          ? 'bg-rose-50 text-rose-600'
                          : p.stock <= 5
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-emerald-50 text-emerald-700'
                      }`}
                    >
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto text-left">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                {editingProduct ? 'Edit Product' : 'Add New Toy Product'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Remote Control High-Speed Racing Car"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">SKU *</label>
                  <input
                    type="text"
                    required
                    value={form.SKU}
                    onChange={(e) => setForm({ ...form, SKU: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  >
                    <option value="Action Figures">Action Figures</option>
                    <option value="Educational Toys">Educational Toys</option>
                    <option value="Remote Control">Remote Control</option>
                    <option value="Dolls">Dolls</option>
                    <option value="Cars & Vehicles">Cars & Vehicles</option>
                    <option value="Board Games">Board Games</option>
                    <option value="Baby Toys">Baby Toys</option>
                    <option value="Outdoor Toys">Outdoor Toys</option>
                    <option value="Puzzles">Puzzles</option>
                    <option value="STEM Toys">STEM Toys</option>
                    <option value="Building Blocks">Building Blocks</option>
                    <option value="Arts & Crafts">Arts & Crafts</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Age Group</label>
                  <select
                    value={form.ageGroup}
                    onChange={(e) => setForm({ ...form, ageGroup: e.target.value as any })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  >
                    <option value="0-2 Years">0-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="6-8 Years">6-8 Years</option>
                    <option value="9-12 Years">9-12 Years</option>
                    <option value="12+ Years">12+ Years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Stock Count *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={form.thumbnail}
                  onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Detailed Description *</label>
                <textarea
                  rows={3}
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold transition-colors shadow-md"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
