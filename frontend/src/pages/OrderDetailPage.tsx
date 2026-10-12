import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { IOrder } from '../types';
import { Check, ArrowLeft, Package, Truck, ShieldCheck, MapPin } from 'lucide-react';

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    api.getOrder(id)
      .then((res) => {
        if (res.success && res.data) {
          setOrder(res.data);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mx-auto mb-4"></div>
        <div className="h-40 bg-slate-100 rounded-3xl"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-heading font-black text-xl text-slate-800">Order Not Found</h2>
        <Link to="/account/orders" className="text-[#FF4B6E] font-bold text-xs mt-2 inline-block">
          Return to Orders
        </Link>
      </div>
    );
  }

  const steps = ['Pending', 'Confirmed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const currentStepIdx = steps.indexOf(order.orderStatus);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left space-y-6">
      <Link
        to="/account"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#FF4B6E] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to My Account
      </Link>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-[#FF4B6E] uppercase tracking-wider">Order Status</span>
            <h1 className="font-heading font-black text-2xl text-slate-900 mt-1">
              {order.orderId}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Placed on {new Date(order.createdAt).toLocaleString('en-IN')}
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Total Amount</span>
            <span className="font-heading font-black text-2xl text-slate-900">
              ₹{order.total?.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Visual Order Tracking Timeline */}
        <div className="space-y-4">
          <h3 className="font-heading font-bold text-base text-slate-900">Shipment Timeline</h3>
          <div className="relative flex items-center justify-between max-w-2xl mx-auto py-4">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0"></div>

            {['Confirmed', 'Packed', 'Shipped', 'Delivered'].map((step, idx) => {
              const stepIdxInAll = steps.indexOf(step);
              const isDone = currentStepIdx >= stepIdxInAll;
              const isCurrent = currentStepIdx === stepIdxInAll;

              return (
                <div key={step} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                      isDone
                        ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/25 ring-4 ring-emerald-50'
                        : isCurrent
                        ? 'bg-[#FF4B6E] text-white shadow-md ring-4 ring-pink-50'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isDone ? <Check className="w-4 h-4" /> : idx + 1}
                  </div>
                  <span
                    className={`text-[11px] font-bold mt-2 ${
                      isDone ? 'text-emerald-700' : isCurrent ? 'text-[#FF4B6E]' : 'text-slate-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Items List */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <h3 className="font-heading font-bold text-base text-slate-900">Items Ordered</h3>
          <div className="space-y-3">
            {order.items?.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded-xl bg-white border p-1"
                  />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                    <span className="text-slate-500">Qty: {item.quantity} × ₹{item.price}</span>
                  </div>
                </div>
                <span className="font-bold text-slate-900 text-sm">
                  ₹{item.subtotal?.toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Address & Payment Breakdown */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 text-xs">
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-sm mb-2">
              <MapPin className="w-4 h-4 text-[#FF4B6E]" />
              Delivery Address
            </h4>
            <p className="font-bold text-slate-700">{order.shippingAddress?.fullName}</p>
            <p className="text-slate-500 leading-relaxed">
              {order.shippingAddress?.houseFlat}, {order.shippingAddress?.street}, {order.shippingAddress?.area}
              <br />
              {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pinCode}
            </p>
            <p className="text-slate-500 font-medium">Contact: {order.shippingAddress?.phone}</p>
          </div>

          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl">
            <h4 className="font-bold text-slate-800 text-sm mb-2">Payment Details</h4>
            <div className="flex justify-between text-slate-600">
              <span>Method:</span>
              <span className="font-bold text-slate-800">{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Payment Status:</span>
              <span className="font-bold text-emerald-600">{order.paymentStatus}</span>
            </div>
            {order.couponCode && (
              <div className="flex justify-between text-slate-600">
                <span>Coupon Applied:</span>
                <span className="font-bold text-[#FF4B6E]">{order.couponCode}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Delivery Fee:</span>
              <span>{order.shipping === 0 ? 'Free' : `₹${order.shipping}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
