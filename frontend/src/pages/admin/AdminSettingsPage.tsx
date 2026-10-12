import React, { useState } from 'react';
import { Save, Store, ShieldCheck, CreditCard, Mail } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useToast } from '../../context/ToastContext';

export const AdminSettingsPage: React.FC = () => {
  const { success } = useToast();
  const [storeName, setStoreName] = useState('ToyVerse India');
  const [currency, setCurrency] = useState('INR (₹)');
  const [shippingThreshold, setShippingThreshold] = useState('999');
  const [razorpayKey, setRazorpayKey] = useState('rzp_test_placeholder_key_id');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    success('Store settings updated successfully');
  };

  return (
    <AdminLayout title="Store Settings">
      <div className="max-w-3xl text-left bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm">
        <form onSubmit={handleSave} className="space-y-6 text-xs sm:text-sm">
          <div className="space-y-4">
            <h3 className="font-heading font-extrabold text-base text-slate-900 border-b pb-2 flex items-center gap-2">
              <Store className="w-4 h-4 text-[#FF4B6E]" />
              General Brand Configuration
            </h3>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Store / Business Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Currency</label>
                <input
                  type="text"
                  disabled
                  value={currency}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Free Shipping Order Threshold (₹)</label>
                <input
                  type="number"
                  value={shippingThreshold}
                  onChange={(e) => setShippingThreshold(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-heading font-extrabold text-base text-slate-900 border-b pb-2 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              Payment Gateway Credentials
            </h3>
            <div>
              <label className="block text-slate-700 font-bold mb-1">Razorpay API Key ID</label>
              <input
                type="text"
                value={razorpayKey}
                onChange={(e) => setRazorpayKey(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 font-mono text-xs"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                Razorpay keys are securely managed via backend .env. (RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET)
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold transition-colors flex items-center gap-2 shadow-md"
          >
            <Save className="w-4 h-4" />
            Save Configuration
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};
