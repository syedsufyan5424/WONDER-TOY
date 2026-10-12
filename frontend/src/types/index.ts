export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  token?: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon?: string;
  productCount: number;
  featured: boolean;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  SKU: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stock: number;
  lowStockThreshold?: number;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  ageGroup: '0-2 Years' | '3-5 Years' | '6-8 Years' | '9-12 Years' | '12+ Years';
  gender?: 'All' | 'Boys' | 'Girls';
  material?: string;
  color?: string;
  weight?: string;
  dimensions?: string;
  tags?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
  createdAt?: string;
}

export interface ICartItem {
  _id?: string;
  product: IProduct;
  quantity: number;
  price: number;
}

export interface ICart {
  _id?: string;
  items: ICartItem[];
  couponCode?: string;
  discount: number;
}

export interface IAddress {
  _id?: string;
  user?: string;
  fullName: string;
  phone: string;
  email?: string;
  houseFlat: string;
  street: string;
  area: string;
  city: string;
  state: string;
  pinCode: string;
  isDefault?: boolean;
}

export interface IOrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface IOrderStatusHistory {
  status: string;
  date: string;
  note?: string;
}

export interface IOrder {
  _id: string;
  orderId: string;
  customer?: string;
  customerDetails: {
    name: string;
    email: string;
    phone: string;
  };
  items: IOrderItem[];
  shippingAddress: IAddress;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  orderStatus:
    | 'Pending'
    | 'Confirmed'
    | 'Processing'
    | 'Packed'
    | 'Shipped'
    | 'Out for Delivery'
    | 'Delivered'
    | 'Cancelled';
  subtotal: number;
  shipping: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  statusHistory: IOrderStatusHistory[];
  createdAt: string;
}

export interface ICoupon {
  _id: string;
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
}

export interface IReview {
  _id: string;
  product: string;
  user: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  verifiedPurchase: boolean;
  createdAt: string;
}
