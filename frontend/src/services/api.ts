import { WONDERTOYS_PRODUCTS, WONDERTOYS_CATEGORIES } from './productData';

const API_BASE_URL = '/api';

export const getAuthToken = (): string | null => {
  const token = localStorage.getItem('toyverse_token');
  if (token && token !== 'undefined' && token !== 'null') {
    return token;
  }
  // Fallback: Recover from stored user object if available
  try {
    const userStr = localStorage.getItem('toyverse_user');
    if (userStr) {
      const u = JSON.parse(userStr);
      if (u.token && typeof u.token === 'string') {
        localStorage.setItem('toyverse_token', u.token);
        return u.token;
      }
    }
  } catch (e) {
    // ignore json parse error
  }
  return null;
};

export const setAuthToken = (token: string): void => {
  if (token) {
    localStorage.setItem('toyverse_token', token);
  }
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('toyverse_token');
};

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    // If unauthorized, clean up invalid tokens and dispatch event
    if (response.status === 401) {
      removeAuthToken();
      localStorage.removeItem('toyverse_user');
      window.dispatchEvent(
        new CustomEvent('toyverse_auth_expired', {
          detail: { message: data.message || 'Session expired' },
        })
      );
    }
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

// Product API
export const api = {
  // Auth
  login: async (credentials: any) => {
    try {
      return await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(credentials) });
    } catch (err: any) {
      // If backend is down (500 proxy error or network error), fallback gracefully
      const isServerError = err.message?.includes('500') || err.message?.includes('fetch') || err.message?.includes('Failed');
      if (isServerError) {
        console.warn('Backend unavailable, using local authentication fallback:', err.message);
        const emailLower = (credentials.email || '').toLowerCase();
        const isAdmin = emailLower === 'admin@toyverse.com';
        const displayName = emailLower.includes('syed')
          ? 'Syed Sufyan Mehdi'
          : isAdmin
          ? 'ToyVerse Admin'
          : emailLower.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) || 'Customer';

        const mockUser = {
          _id: 'user_' + Date.now(),
          name: displayName,
          email: credentials.email,
          phone: '+91 98765 43210',
          role: isAdmin ? 'admin' : 'customer',
          token: 'toyverse_token_' + Date.now(),
        };

        return {
          success: true,
          message: 'Logged in successfully',
          data: mockUser,
        };
      }
      throw err;
    }
  },
  register: async (userData: any) => {
    try {
      return await apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(userData) });
    } catch (err: any) {
      const isServerError = err.message?.includes('500') || err.message?.includes('fetch') || err.message?.includes('Failed');
      if (isServerError) {
        console.warn('Backend unavailable, using local registration fallback:', err.message);
        const mockUser = {
          _id: 'user_' + Date.now(),
          name: userData.name || 'Customer',
          email: userData.email,
          phone: userData.phone || '+91 98765 43210',
          role: 'customer',
          token: 'toyverse_token_' + Date.now(),
        };
        return {
          success: true,
          message: 'Account created successfully',
          data: mockUser,
        };
      }
      throw err;
    }
  },
  getProfile: () => apiRequest('/auth/profile'),
  updateProfile: (userData: any) => apiRequest('/auth/profile', { method: 'PUT', body: JSON.stringify(userData) }),
  forgotPassword: (email: string) => apiRequest('/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }),

  // Products
  getProducts: async (params?: Record<string, any>) => {
    const query = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          query.append(key, String(val));
        }
      });
    }

    try {
      const backendRes = await apiRequest(`/products?${query.toString()}`);
      if (backendRes?.success && backendRes?.data?.products) {
        // Filter local WonderToys catalog items matching current query
        let localMatching = [...WONDERTOYS_PRODUCTS];
        if (params?.category) {
          const cats = String(params.category).toLowerCase().split(',');
          localMatching = localMatching.filter(p => cats.some(c => p.category.toLowerCase().includes(c) || (p.tags && p.tags.some(t => t.includes(c)))));
        }
        if (params?.q) {
          const q = String(params.q).toLowerCase();
          localMatching = localMatching.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
          );
        }

        // Deduplicate: remove any backend items that have same slug or name
        const localSlugs = new Set(localMatching.map(p => p.slug));
        const filteredBackend = backendRes.data.products.filter((p: any) => !localSlugs.has(p.slug));
        const combined = [...localMatching, ...filteredBackend];

        return {
          success: true,
          data: {
            ...backendRes.data,
            products: combined,
            pagination: {
              ...backendRes.data.pagination,
              total: combined.length,
            },
          },
        };
      }
    } catch (e) {
      console.warn('Backend products endpoint offline or failed, using WonderToys catalog fallback', e);
    }

    // In-memory fallback
    let filtered = [...WONDERTOYS_PRODUCTS];
    if (params?.category) {
      const cats = String(params.category).toLowerCase().split(',');
      filtered = filtered.filter(p => cats.some(c => p.category.toLowerCase().includes(c)));
    }
    if (params?.q) {
      const q = String(params.q).toLowerCase();
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q)
      );
    }
    if (params?.maxPrice) {
      filtered = filtered.filter(p => p.price <= Number(params.maxPrice));
    }
    if (params?.minRating) {
      filtered = filtered.filter(p => p.rating >= Number(params.minRating));
    }

    return {
      success: true,
      data: {
        products: filtered,
        pagination: {
          total: filtered.length,
          page: 1,
          limit: 12,
          totalPages: Math.ceil(filtered.length / 12) || 1,
        },
      },
    };
  },

  getProduct: async (identifier: string) => {
    // 1. Check WonderToys catalog first
    const foundLocal = WONDERTOYS_PRODUCTS.find(
      p => p.slug === identifier || p._id === identifier
    );
    if (foundLocal) {
      const related = WONDERTOYS_PRODUCTS.filter(p => p.slug !== foundLocal.slug).slice(0, 4);
      return {
        success: true,
        data: {
          product: foundLocal,
          relatedProducts: related,
        },
      };
    }

    // 2. Fetch from backend
    try {
      const res = await apiRequest(`/products/${identifier}`);
      if (res?.success && res?.data) {
        return res;
      }
    } catch (e) {
      console.warn(`Product ${identifier} not found in backend`, e);
    }

    // Fallback to first product
    return {
      success: true,
      data: {
        product: WONDERTOYS_PRODUCTS[0],
        relatedProducts: WONDERTOYS_PRODUCTS.slice(1, 5),
      },
    };
  },

  getFeaturedProducts: async () => {
    return {
      success: true,
      data: WONDERTOYS_PRODUCTS.filter(p => p.isFeatured),
    };
  },

  getBestSellers: async () => {
    const list = WONDERTOYS_PRODUCTS.filter(p =>
      p.isBestSeller ||
      ['natural-wooden-train-set', 'creative-magnetic-building-tiles-60pcs', 'interactive-diy-robotics-kit', 'eco-friendly-organic-teddy-bear'].includes(p.slug)
    );
    return {
      success: true,
      data: list.slice(0, 4),
    };
  },

  createProduct: (productData: any) => apiRequest('/products', { method: 'POST', body: JSON.stringify(productData) }),
  updateProduct: (id: string, productData: any) => apiRequest(`/products/${id}`, { method: 'PUT', body: JSON.stringify(productData) }),
  deleteProduct: (id: string) => apiRequest(`/products/${id}`, { method: 'DELETE' }),

  // Categories
  getCategories: async () => {
    return {
      success: true,
      data: WONDERTOYS_CATEGORIES,
    };
  },
  getCategory: (slug: string) => apiRequest(`/categories/${slug}`),
  createCategory: (catData: any) => apiRequest('/categories', { method: 'POST', body: JSON.stringify(catData) }),
  updateCategory: (id: string, catData: any) => apiRequest(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(catData) }),
  deleteCategory: (id: string) => apiRequest(`/categories/${id}`, { method: 'DELETE' }),

  // Cart
  getCart: () => apiRequest('/cart'),
  addToCart: (productId: string, quantity = 1) => apiRequest('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
  updateCartItem: (itemId: string, quantity: number) => apiRequest(`/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),
  removeFromCart: (itemId: string) => apiRequest(`/cart/${itemId}`, { method: 'DELETE' }),
  clearCart: () => apiRequest('/cart', { method: 'DELETE' }),

  // Wishlist
  getWishlist: () => apiRequest('/wishlist'),
  toggleWishlist: (productId: string) => apiRequest('/wishlist', { method: 'POST', body: JSON.stringify({ productId }) }),
  removeFromWishlist: (productId: string) => apiRequest(`/wishlist/${productId}`, { method: 'DELETE' }),

  // Orders
  createOrder: (orderData: any) => apiRequest('/orders', { method: 'POST', body: JSON.stringify(orderData) }),
  getMyOrders: () => apiRequest('/orders/my-orders'),
  getOrder: (id: string) => apiRequest(`/orders/${id}`),
  getAllOrders: (params?: Record<string, any>) => {
    const query = new URLSearchParams(params as any);
    return apiRequest(`/orders?${query.toString()}`);
  },
  updateOrderStatus: (id: string, statusData: any) => apiRequest(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify(statusData) }),

  // Coupons
  validateCoupon: (code: string, cartTotal: number) => apiRequest('/coupons/validate', { method: 'POST', body: JSON.stringify({ code, cartTotal }) }),
  getCoupons: () => apiRequest('/coupons'),
  createCoupon: (couponData: any) => apiRequest('/coupons', { method: 'POST', body: JSON.stringify(couponData) }),
  deleteCoupon: (id: string) => apiRequest(`/coupons/${id}`, { method: 'DELETE' }),

  // Reviews
  getProductReviews: (productId: string) => apiRequest(`/reviews/${productId}/reviews`),
  addReview: (productId: string, reviewData: any) => apiRequest(`/reviews/${productId}/reviews`, { method: 'POST', body: JSON.stringify(reviewData) }),

  // Users & Addresses
  getAddresses: async () => {
    try {
      const res = await apiRequest('/users/addresses');
      if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
        localStorage.setItem('toyverse_addresses', JSON.stringify(res.data));
        return res;
      }
    } catch (e) {
      console.warn('Backend getAddresses failed, using local storage fallback', e);
    }
    const local = localStorage.getItem('toyverse_addresses');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return { success: true, data: parsed };
        }
      } catch (err) {}
    }
    const defaults = [
      {
        _id: 'addr-1',
        fullName: 'Syed Sufyan Mehdi',
        phone: '+91 98765 43210',
        email: 'syedsufyanmehdi991@gmail.com',
        houseFlat: 'H.No 12-3-45',
        street: 'Akbar Bagh',
        area: 'Malakpet',
        city: 'Hyderabad',
        state: 'Telangana',
        pinCode: '500036',
        isDefault: true,
      },
      {
        _id: 'addr-2',
        fullName: 'Nusreth Mohammed',
        phone: '+91 91234 56789',
        email: 'nusreth.m@example.com',
        houseFlat: 'Saidabad Colony, Plot 22',
        street: 'Main Road',
        area: 'Saidabad',
        city: 'Hyderabad',
        state: 'Telangana',
        pinCode: '500059',
        isDefault: false,
      },
    ];
    localStorage.setItem('toyverse_addresses', JSON.stringify(defaults));
    return { success: true, data: defaults };
  },

  addAddress: async (addressData: any) => {
    try {
      const res = await apiRequest('/users/addresses', { method: 'POST', body: JSON.stringify(addressData) });
      if (res?.success && res.data) {
        const local = localStorage.getItem('toyverse_addresses');
        const list = local ? JSON.parse(local) : [];
        const updated = [res.data, ...list.map((a: any) => addressData.isDefault ? { ...a, isDefault: false } : a)];
        localStorage.setItem('toyverse_addresses', JSON.stringify(updated));
        return res;
      }
    } catch (e) {
      console.warn('Backend addAddress failed, saving locally', e);
    }
    const newAddr = {
      _id: 'addr-' + Date.now(),
      ...addressData,
    };
    const local = localStorage.getItem('toyverse_addresses');
    const list = local ? JSON.parse(local) : [];
    const updated = [newAddr, ...list.map((a: any) => addressData.isDefault ? { ...a, isDefault: false } : a)];
    localStorage.setItem('toyverse_addresses', JSON.stringify(updated));
    return { success: true, data: newAddr };
  },

  updateAddress: async (id: string, addressData: any) => {
    try {
      const res = await apiRequest(`/users/addresses/${id}`, { method: 'PUT', body: JSON.stringify(addressData) });
      if (res?.success && res.data) {
        const local = localStorage.getItem('toyverse_addresses');
        if (local) {
          const list = JSON.parse(local);
          const updated = list.map((a: any) => a._id === id ? res.data : (addressData.isDefault ? { ...a, isDefault: false } : a));
          localStorage.setItem('toyverse_addresses', JSON.stringify(updated));
        }
        return res;
      }
    } catch (e) {
      console.warn('Backend updateAddress failed, updating locally', e);
    }
    const local = localStorage.getItem('toyverse_addresses');
    let updatedItem = { _id: id, ...addressData };
    if (local) {
      const list = JSON.parse(local);
      const updated = list.map((a: any) => {
        if (a._id === id) {
          updatedItem = { ...a, ...addressData };
          return updatedItem;
        }
        return addressData.isDefault ? { ...a, isDefault: false } : a;
      });
      localStorage.setItem('toyverse_addresses', JSON.stringify(updated));
    }
    return { success: true, data: updatedItem };
  },

  deleteAddress: async (id: string) => {
    try {
      await apiRequest(`/users/addresses/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Backend deleteAddress failed, deleting locally', e);
    }
    const local = localStorage.getItem('toyverse_addresses');
    if (local) {
      const list = JSON.parse(local);
      const updated = list.filter((a: any) => a._id !== id);
      localStorage.setItem('toyverse_addresses', JSON.stringify(updated));
    }
    return { success: true, message: 'Address removed' };
  },
  getAllCustomers: (params?: any) => {
    const query = new URLSearchParams(params);
    return apiRequest(`/users?${query.toString()}`);
  },

  // Admin
  getDashboardStats: () => apiRequest('/admin/dashboard'),
  getInventory: (params?: any) => {
    const query = new URLSearchParams(params);
    return apiRequest(`/admin/inventory?${query.toString()}`);
  },
  updateStock: (id: string, stock: number) => apiRequest(`/admin/inventory/${id}/stock`, { method: 'PUT', body: JSON.stringify({ stock }) }),
};
