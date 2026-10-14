import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Package,
  MapPin,
  Key, ub78tgygghghghg
  nm bvgvvvgvggvgvgvgvgjjjnj
  LogOut,
  ExternalLink,
  Clock,
  CheckCircle,
  Plus,
  Edit2,
  n nbhb
  Trash2,
  Check,
  Building,
  Phone,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { api } from '../services/api';
import { IOrder, IAddress } from '../types';

export const AccountPage: React.FC = () => {
  const { user, logout, updateUser } = useAuth();
  const { success, error: toastError } = useToast();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'security'>('orders');
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [loading, setLoading] = useState(false);

  // Profile Form
  const [profileName, setProfileName] = useState(user?.name || '');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '');

  // Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Address Modal Form
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    phone: '',
    houseFlat: '',
    street: '',
    area: '',
    city: 'Hyderabad',
    state: 'Telangana',
    pinCode: '500036',
    isDefault: false,
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    setLoading(true);
    Promise.all([
      api.getMyOrders().catch(() => ({ data: [] })),
      api.getAddresses().catch(() => ({ data: [] })),
    ])
      .then(([ordersRes, addrRes]) => {
        if (ordersRes.data) setOrders(ordersRes.data);
        if (addrRes.data) setAddresses(addrRes.data);
      })
      .finally(() => setLoading(false));
  }, [user, navigate]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.updateProfile({ name: profileName, phone: profilePhone });
      if (res.success && res.data) {
        updateUser(res.data);
        success('Profile updated successfully');
      }
    } catch (err: any) {
      toastError(err.message || 'Profile update failed');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toastError('Password must be at least 6 characters');
      return;
    }
    try {
      await api.updateProfile({ password: newPassword });
      success('Password changed successfully');
      setNewPassword('');
      setCurrentPassword('');
    } catch (err: any) {
      toastError(err.message || 'Password update failed');
    }
  };

  // Open modal for Adding New Address
  const handleOpenAddAddress = () => {
    setEditingAddressId(null);
    setAddressForm({
      fullName: user?.name || '',
      phone: user?.phone || '',
      houseFlat: '',
      street: '',
      area: '',
      city: 'Hyderabad',
      state: 'Telangana',
      pinCode: '500001',
      isDefault: addresses.length === 0,
    });
    setShowAddressModal(true);
  };

  // Open modal for Editing Address
  const handleOpenEditAddress = (addr: IAddress) => {
    setEditingAddressId(addr._id || null);
    setAddressForm({
      fullName: addr.fullName,
      phone: addr.phone,
      houseFlat: addr.houseFlat,
      street: addr.street,
      area: addr.area || '',
      city: addr.city,
      state: addr.state,
      pinCode: addr.pinCode,
      isDefault: !!addr.isDefault,
    });
    setShowAddressModal(true);
  };

  // Save Address (Create or Update)
  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressForm.fullName.trim() || !addressForm.phone.trim() || !addressForm.houseFlat.trim()) {
      toastError('Please fill all required address fields');
      return;
    }

    try {
      if (editingAddressId) {
        const res = await api.updateAddress(editingAddressId, addressForm);
        const updated = res.data;
        setAddresses((prev) =>
          prev.map((a) =>
            a._id === editingAddressId
              ? updated
              : addressForm.isDefault
                ? { ...a, isDefault: false }
                : a
          )
        );
        success('Delivery address updated');
      } else {
        const res = await api.addAddress(addressForm);
        const created = res.data;
        setAddresses((prev) => [
          created,
          ...prev.map((a) => (addressForm.isDefault ? { ...a, isDefault: false } : a)),
        ]);
        success('New delivery address added');
      }
      setShowAddressModal(false);
    } catch (err: any) {
      toastError(err.message || 'Failed to save address');
    }
  };

  // Delete Address
  const handleDeleteAddress = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this delivery address?')) {
      return;
    }

    try {
      await api.deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      success('Address removed');
    } catch (err: any) {
      toastError(err.message || 'Failed to remove address');
    }
  };

  // Set Address as Default
  const handleSetDefaultAddress = async (id: string) => {
    try {
      await api.updateAddress(id, { isDefault: true });
      setAddresses((prev) =>
        prev.map((a) => ({
          ...a,
          isDefault: a._id === id,
        }))
      );
      success('Default delivery address updated');
    } catch (err: any) {
      toastError(err.message || 'Failed to update default address');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Processing':
      case 'Packed':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-purple-50 text-purple-700 border-purple-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Account Sidebar Navigation */}
        <div className="w-full md:w-72 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6 flex-shrink-0">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#FF4B6E] to-[#F59E0B] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="overflow-hidden">
              <h3 className="font-heading font-extrabold text-base text-slate-900 truncate">
                {user?.name}
              </h3>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${activeTab === 'orders'
                  ? 'bg-pink-50 text-[#FF4B6E]'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              <Package className="w-4 h-4" />
              <span>My Orders ({orders.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${activeTab === 'profile'
                  ? 'bg-pink-50 text-[#FF4B6E]'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              <User className="w-4 h-4" />
              <span>Profile Details</span>
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${activeTab === 'addresses'
                  ? 'bg-pink-50 text-[#FF4B6E]'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              <MapPin className="w-4 h-4" />
              <span>Delivery Addresses</span>
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-colors cursor-pointer ${activeTab === 'security'
                  ? 'bg-pink-50 text-[#FF4B6E]'
                  : 'text-slate-600 hover:bg-slate-50'
                }`}
            >
              <Key className="w-4 h-4" />
              <span>Security & Password</span>
            </button>
          </nav>

          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={logout}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Main Tab Content */}
        <div className="flex-1 w-full bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm min-h-[460px]">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-slate-900">Order History</h2>
                <p className="text-xs text-slate-400 mt-0.5">Track and view previous toy purchases</p>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-300 flex items-center justify-center mx-auto">
                    <Package className="w-8 h-8" />
                  </div>
                  <p className="text-slate-500 text-sm">No orders found.</p>
                  <Link
                    to="/shop"
                    className="inline-block px-5 py-2.5 rounded-full bg-[#FF4B6E] text-white text-xs font-bold hover:bg-[#E11D48] transition-colors"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 transition-all space-y-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div>
                          <span className="font-bold text-slate-800">Order #{order.orderId || order._id.slice(-8).toUpperCase()}</span>
                          <span className="text-slate-400 ml-2">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>
                      </div>

                      {/* Items Preview */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-100 text-xs"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-7 h-7 object-contain rounded"
                            />
                            <span className="font-medium text-slate-700 truncate max-w-[140px]">
                              {item.name}
                            </span>
                            <span className="text-slate-400 font-bold">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                        <span>Total Amount: <strong className="text-slate-800 text-xs">₹{order.total.toLocaleString('en-IN')}</strong></span>
                        <Link
                          to={`/account/orders/${order._id}`}
                          className="text-[#FF4B6E] hover:underline font-bold flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-md">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-slate-900">Personal Information</h2>
                <p className="text-xs text-slate-400 mt-0.5">Manage your name and phone number</p>
              </div>

              <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address</label>
                  <input
                    type="email"
                    disabled
                    value={user?.email || ''}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold transition-colors cursor-pointer"
                >
                  Save Profile
                </button>
              </form>
            </div>
          )}

          {/* TAB 3: ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h2 className="font-heading font-extrabold text-xl text-slate-900">Saved Addresses</h2>
                  <p className="text-xs text-slate-400 mt-0.5">Delivery locations for fast 1-click checkout</p>
                </div>
                <button
                  type="button"
                  onClick={handleOpenAddAddress}
                  className="px-4 py-2.5 rounded-2xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold text-xs shadow-md shadow-pink-500/20 transition-all flex items-center justify-center gap-1.5 self-start sm:self-auto cursor-pointer active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Address</span>
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-3xl bg-slate-50/60 border border-dashed border-slate-200 space-y-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-pink-50 text-[#FF4B6E] flex items-center justify-center mx-auto shadow-xs">
                    <MapPin className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-slate-800 text-base">No saved addresses yet</h3>
                    <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                      Add a shipping address to speed up order checkout and track deliveries with ease.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenAddAddress}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white text-xs font-bold transition-colors cursor-pointer shadow-sm"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Delivery Address</span>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between space-y-4 ${addr.isDefault
                          ? 'border-[#FF4B6E] bg-pink-50/20 shadow-xs'
                          : 'border-slate-100 hover:border-slate-200 bg-white'
                        }`}
                    >
                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between items-start">
                          <span className="font-heading font-extrabold text-slate-900 text-sm">
                            {addr.fullName}
                          </span>
                          {addr.isDefault ? (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              Default
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => handleSetDefaultAddress(addr._id!)}
                              className="text-[11px] font-semibold text-slate-400 hover:text-[#FF4B6E] transition-colors cursor-pointer"
                            >
                              Set as Default
                            </button>
                          )}
                        </div>

                        <p className="text-slate-600 leading-relaxed">
                          {addr.houseFlat}, {addr.street}
                          {addr.area ? `, ${addr.area}` : ''}
                          <br />
                          {addr.city}, {addr.state} - {addr.pinCode}
                        </p>

                        <p className="font-semibold text-slate-700 flex items-center gap-1.5 pt-1">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          <span>{addr.phone}</span>
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => handleOpenEditAddress(addr)}
                          className="px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#FF4B6E] text-slate-700 hover:text-[#FF4B6E] font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(addr._id!)}
                          className="px-3 py-1.5 rounded-xl border border-rose-100 hover:border-rose-200 text-rose-500 hover:bg-rose-50 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === 'security' && (
            <div className="space-y-6 max-w-md">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-slate-900">Change Password</h2>
                <p className="text-xs text-slate-400 mt-0.5">Ensure your account is protected with a secure password</p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    placeholder="Enter new password (min. 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#FF4B6E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold transition-colors cursor-pointer"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                {editingAddressId ? 'Edit Delivery Address' : 'Add New Delivery Address'}
              </h3>
            </div>

            <form onSubmit={handleSaveAddress} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Syed Sufyan Mehdi"
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={addressForm.phone}
                    onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">PIN Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="500036"
                    value={addressForm.pinCode}
                    onChange={(e) => setAddressForm({ ...addressForm, pinCode: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Flat, House no., Building *</label>
                <input
                  type="text"
                  required
                  placeholder="H.No 12-3-45, Sunshine Residency"
                  value={addressForm.houseFlat}
                  onChange={(e) => setAddressForm({ ...addressForm, houseFlat: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Area, Street, Sector *</label>
                <input
                  type="text"
                  required
                  placeholder="Akbar Bagh Road, Malakpet"
                  value={addressForm.street}
                  onChange={(e) => setAddressForm({ ...addressForm, street: e.target.value, area: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">City / Town</label>
                  <input
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">State</label>
                  <input
                    type="text"
                    value={addressForm.state}
                    onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#FF4B6E] text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-700">
                  <input
                    type="checkbox"
                    checked={addressForm.isDefault}
                    onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                    className="w-4 h-4 rounded text-[#FF4B6E] accent-[#FF4B6E] cursor-pointer"
                  />
                  <span>Make this my default delivery address</span>
                </label>
              </div>

              <div className="flex gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddressModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#FF4B6E] hover:bg-[#E11D48] text-white font-bold transition-colors cursor-pointer shadow-xs"
                >
                  {editingAddressId ? 'Update Address' : 'Save Address'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
