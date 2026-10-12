import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  SKU: string;
  brand: string;
  category: string;
  subcategory: string;
  price: number;
  originalPrice: number;
  discountPercentage: number;
  stock: number;
  lowStockThreshold: number;
  images: string[];
  thumbnail: string;
  rating: number;
  reviewCount: number;
  ageGroup: '0-2 Years' | '3-5 Years' | '6-8 Years' | '9-12 Years' | '12+ Years';
  gender: 'All' | 'Boys' | 'Girls';
  material: string;
  color: string;
  weight: string;
  dimensions: string;
  tags: string[];
  features: string[];
  specifications: Record<string, string>;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  isOnSale: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true, index: true },
    slug: { type: String, required: true, unique: true, lowercase: true, index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, default: '' },
    SKU: { type: String, required: true, unique: true, uppercase: true, trim: true, index: true },
    brand: { type: String, required: true, trim: true, index: true },
    category: { type: String, required: true, trim: true, index: true },
    subcategory: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    discountPercentage: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 10, min: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    images: { type: [String], default: [] },
    thumbnail: { type: String, required: true },
    rating: { type: Number, default: 4.5, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
    ageGroup: {
      type: String,
      enum: ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years', '12+ Years'],
      default: '3-5 Years',
    },
    gender: {
      type: String,
      enum: ['All', 'Boys', 'Girls'],
      default: 'All',
    },
    material: { type: String, default: 'Non-toxic ABS Plastic' },
    color: { type: String, default: 'Multi-color' },
    weight: { type: String, default: '450g' },
    dimensions: { type: String, default: '25 x 15 x 10 cm' },
    tags: { type: [String], default: [] },
    features: { type: [String], default: [] },
    specifications: { type: Map, of: String, default: {} },
    isFeatured: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
    isNewArrival: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual('isNew').get(function () {
  return this.isNewArrival;
});


// Compound text index for search
productSchema.index({
  name: 'text',
  brand: 'text',
  category: 'text',
  SKU: 'text',
  tags: 'text',
});

export const Product = mongoose.model<IProduct>('Product', productSchema);
