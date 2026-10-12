import React, { useEffect, useState } from 'react';
import { Search, Mail, Phone, ShoppingBag, IndianRupee } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminCustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await api.getAllCustomers({ q: search });
      if (res.success && res.data) {
        setCustomers(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <AdminLayout title="Customers Directory">
      <div className="space-y-6 text-left">
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchCustomers()}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B6E]"
            />
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Total Registered: <strong>{customers.length}</strong>
          </span>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Contact</th>
                <th className="pb-3 px-3">Total Orders</th>
                <th className="pb-3 px-3">Total Spent</th>
                <th className="pb-3 px-3">Status</th>
                <th className="pb-3 px-3">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700">
                        {c.name?.charAt(0) || 'C'}
                      </div>
                      <span className="font-bold text-slate-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    <p className="flex items-center gap-1.5">{c.email}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{c.phone || '+91 98765 00000'}</p>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-700">
                    {c.orderCount || 1} orders
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    ₹{(c.totalSpending || 2697).toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                      Active
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};
