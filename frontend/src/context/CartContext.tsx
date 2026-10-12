import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { IProduct, ICartItem } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface CartContextType {
  items: ICartItem[];
  cartCount: number;
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  couponCode: string;
  appliedCoupon: string | null;
  addToCart: (product: IProduct, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<boolean>;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { success, error, info } = useToast();

  const [items, setItems] = useState<ICartItem[]>(() => {
    const saved = localStorage.getItem('toyverse_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(() => {
    return localStorage.getItem('toyverse_coupon') || null;
  });
  const [couponDiscount, setCouponDiscount] = useState<number>(() => {
    const saved = localStorage.getItem('toyverse_discount');
    return saved ? Number(saved) : 0;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('toyverse_cart', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('toyverse_coupon', appliedCoupon);
      localStorage.setItem('toyverse_discount', String(couponDiscount));
    } else {
      localStorage.removeItem('toyverse_coupon');
      localStorage.removeItem('toyverse_discount');
    }
  }, [appliedCoupon, couponDiscount]);

  // If authenticated, sync with server cart on mount
  useEffect(() => {
    if (isAuthenticated) {
      api.getCart()
        .then((res) => {
          if (res.success && res.data && res.data.items && res.data.items.length > 0) {
            const formatted = res.data.items
              .filter((item: any) => item.product)
              .map((item: any) => ({
                _id: item._id,
                product: item.product,
                quantity: item.quantity,
                price: item.price,
              }));
            if (formatted.length > 0) {
              setItems(formatted);
            }
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const addToCart = (product: IProduct, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.product._id === product._id || (i.product as any).id === product._id
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        if (product.stock && newQty > product.stock) {
          info(`Only ${product.stock} units available in stock!`);
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
        }
        return updated;
      } else {
        return [...prevItems, { product, quantity, price: product.price }];
      }
    });

    // Sync to backend if logged in
    if (isAuthenticated) {
      api.addToCart(product._id, quantity).catch(() => {});
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.product._id === productId || (item.product as any).id === productId) {
          if (item.product.stock && quantity > item.product.stock) {
            info(`Only ${item.product.stock} units available in stock`);
            return { ...item, quantity: item.product.stock };
          }
          return { ...item, quantity };
        }
        return item;
      })
    );

    if (isAuthenticated) {
      const item = items.find((i) => i.product._id === productId);
      if (item && item._id) {
        api.updateCartItem(item._id, quantity).catch(() => {});
      }
    }
  };

  const removeFromCart = (productId: string) => {
    const itemToRemove = items.find(
      (i) => i.product._id === productId || (i.product as any).id === productId
    );

    setItems((prev) =>
      prev.filter((i) => i.product._id !== productId && (i.product as any).id !== productId)
    );

    if (itemToRemove) {
      success('Product removed from cart');
      if (isAuthenticated && itemToRemove._id) {
        api.removeFromCart(itemToRemove._id).catch(() => {});
      }
    }
  };

  const clearCart = () => {
    setItems([]);
    setAppliedCoupon(null);
    setCouponDiscount(0);
    if (isAuthenticated) {
      api.clearCart().catch(() => {});
    }
  };

  const cartCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  // Free shipping on orders above ₹999
  const shipping = useMemo(() => {
    if (subtotal === 0) return 0;
    return subtotal >= 999 ? 0 : 99;
  }, [subtotal]);

  const discount = couponDiscount;

  const total = useMemo(() => {
    const val = subtotal + shipping - discount;
    return Math.max(0, val);
  }, [subtotal, shipping, discount]);

  const applyCoupon = async (code: string): Promise<boolean> => {
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      error('Please enter a coupon code');
      return false;
    }

    try {
      const res = await api.validateCoupon(cleanCode, subtotal);
      if (res.success && res.data) {
        setAppliedCoupon(res.data.code);
        setCouponDiscount(res.data.discountAmount);
        success(`Coupon "${res.data.code}" applied successfully! You saved ₹${res.data.discountAmount}`);
        return true;
      }
      return false;
    } catch (err: any) {
      error(err.message || 'Invalid coupon code');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    info('Coupon removed');
  };

  const value: CartContextType = {
    items,
    cartCount,
    subtotal,
    shipping,
    discount,
    total,
    couponCode: appliedCoupon || '',
    appliedCoupon,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
