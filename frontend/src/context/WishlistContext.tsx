import React, { createContext, useContext, useState, useEffect } from 'react';
import { IProduct } from '../types';
import { api } from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface WishlistContextType {
  wishlist: IProduct[];
  wishlistCount: number;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: IProduct) => void;
  removeFromWishlist: (productId: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { success, info } = useToast();

  const [wishlist, setWishlist] = useState<IProduct[]>(() => {
    const saved = localStorage.getItem('toyverse_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('toyverse_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync with server if logged in
  useEffect(() => {
    if (isAuthenticated) {
      api.getWishlist()
        .then((res) => {
          if (res.success && res.data && res.data.products) {
            setWishlist(res.data.products);
          }
        })
        .catch(() => {});
    }
  }, [isAuthenticated]);

  const isInWishlist = (productId: string): boolean => {
    return wishlist.some(
      (item) => item._id === productId || (item as any).id === productId
    );
  };

  const toggleWishlist = (product: IProduct) => {
    const isCurrentlyIn = isInWishlist(product._id);

    if (isCurrentlyIn) {
      setWishlist((prev) =>
        prev.filter((i) => i._id !== product._id && (i as any).id !== product._id)
      );
      info(`${product.name} removed from Wishlist`);
    } else {
      setWishlist((prev) => [...prev, product]);
      success(`${product.name} saved to Wishlist`);
    }

    if (isAuthenticated) {
      api.toggleWishlist(product._id).catch(() => {});
    }
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.filter((i) => i._id !== productId && (i as any).id !== productId)
    );
    info('Removed from Wishlist');

    if (isAuthenticated) {
      api.removeFromWishlist(productId).catch(() => {});
    }
  };

  const value: WishlistContextType = {
    wishlist,
    wishlistCount: wishlist.length,
    isInWishlist,
    toggleWishlist,
    removeFromWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
