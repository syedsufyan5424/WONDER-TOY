import React, { useEffect, useState } from 'react';
import { Search, Eye, Filter, RefreshCw } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { IOrder } from '../../types';
import { api } from '../../services/api';
import { useToast } from '../../context/ToastContext';

export const AdminOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const { success, error: toastError } = useToast();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.getAllOrders({ status: statusFilter, q: search });
      if (res.success && res.data) {
        setOrders(res.data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [statusFilter]);

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await api.updateOrderStatus(orderId, { orderStatus: newStatus });
      if (res.success) {
        success(`Order status updated to "${newStatus}"`);
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus as any } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder({ ...selectedOrder, orderStatus: newStatus as any });
        }
      }
    } catch (err: any) {
      toastError(err.message || 'Status update failed');
    }
  };

  const statuses = [
    'Pending',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
    'Cancelled',
  ];

  return (
    <AdminLayout title="Orders Management">
      <div className="space-y-6 text-left">
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Order # or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchOrders()}
              className="w-full pl-10 pr-4 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B6E]"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-[#FF4B6E]"
            >
              <option value="all">All Statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <button
              onClick={fetchOrders}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
              title="Refresh"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold">
                <th className="pb-3 px-3">Order #</th>
                <th className="pb-3 px-3">Customer</th>
                <th className="pb-3 px-3">Items</th>
                <th className="pb-3 px-3">Amount</th>
                <th className="pb-3 px-3">Payment</th>
                <th className="pb-3 px-3">Order Status</th>
                <th className="pb-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord._id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">
                    {ord.orderId}
                  </td>
                  <td className="py-3 px-3">
                    <p className="font-bold text-slate-800">{ord.customerDetails?.name}</p>
                    <span className="text-[11px] text-slate-400">{ord.shippingAddress?.city}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">
                    {ord.items?.length} {ord.items?.length === 1 ? 'item' : 'items'}
                  </td>
                  <td className="py-3 px-3 font-bold text-slate-900">
                    ₹{ord.total?.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${
                        ord.paymentStatus === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {ord.paymentMethod} ({ord.paymentStatus})
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    {/* Live Status Selector */}
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleUpdateStatus(ord._id, e.target.value)}
                      className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#FF4B6E] cursor-pointer"
                    >
                      {statuses.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 text-slate-400 hover:text-[#FF4B6E] hover:bg-pink-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto text-left space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900">
                  Order Details {selectedOrder.orderId}
                </h3>
                <span className="text-xs text-slate-400">
                  Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-IN')}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Customer & Shipping info */}
            <div className="bg-slate-50 p-4 rounded-2xl text-xs space-y-1">
              <p className="font-bold text-slate-800">
                Customer: {selectedOrder.customerDetails?.name} ({selectedOrder.customerDetails?.phone || selectedOrder.shippingAddress?.phone})
              </p>
              <p className="text-slate-600">
                Shipping to: {selectedOrder.shippingAddress?.houseFlat}, {selectedOrder.shippingAddress?.street},{' '}
                {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} -{' '}
                {selectedOrder.shippingAddress?.pinCode}
              </p>
            </div>

            {/* Items */}
            <div className="space-y-3 pt-2">
              <h4 className="font-bold text-sm text-slate-800">Products Ordered</h4>
              {selectedOrder.items?.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-2 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 object-contain rounded-lg bg-slate-50 border p-1"
                    />
                    <div>
                      <p className="font-bold text-slate-800">{item.name}</p>
                      <span className="text-slate-400">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-900">
                    ₹{item.subtotal?.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Total summary */}
            <div className="pt-2 text-xs space-y-1 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{selectedOrder.subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>₹{selectedOrder.shipping}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount:</span>
                  <span>-₹{selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t">
                <span>Total Paid:</span>
                <span>₹{selectedOrder.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
