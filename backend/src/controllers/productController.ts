import { Request, Response } from 'express';
import { Product } from '../models/Product';
import slugify from 'slugify';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      q,
      category,
      brand,
      ageGroup,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      isFeatured,
      isBestSeller,
      isOnSale,
      sort,
      page = '1',
      limit = '12',
    } = req.query;

    const query: any = {};

    // Search query
    if (q && typeof q === 'string' && q.trim()) {
      const searchRegex = new RegExp(q.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { brand: searchRegex },
        { category: searchRegex },
        { SKU: searchRegex },
        { tags: searchRegex },
        { shortDescription: searchRegex },
      ];
    }

    // Category filter (handles single or comma-separated)
    if (category && typeof category === 'string') {
      const categories = category.split(',').map((c) => c.trim());
      if (categories.length === 1) {
        query.category = new RegExp(`^${categories[0]}$`, 'i');
      } else {
        query.category = { $in: categories.map((c) => new RegExp(`^${c}$`, 'i')) };
      }
    }

    // Brand filter (handles single or comma-separated)
    if (brand && typeof brand === 'string') {
      const brands = brand.split(',').map((b) => b.trim());
      query.brand = { $in: brands.map((b) => new RegExp(`^${b}$`, 'i')) };
    }

    // Age Group filter
    if (ageGroup && typeof ageGroup === 'string') {
      const ageGroups = ageGroup.split(',').map((a) => a.trim());
      query.ageGroup = { $in: ageGroups };
    }

    // Price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Min Rating
    if (minRating) {
      query.rating = { $gte: Number(minRating) };
    }

    // Stock
    if (inStock === 'true') {
      query.stock = { $gt: 0 };
    } else if (inStock === 'false') {
      query.stock = 0;
    }

    if (isFeatured === 'true') query.isFeatured = true;
    if (isBestSeller === 'true') query.isBestSeller = true;
    if (isOnSale === 'true') query.isOnSale = true;

    // Sorting
    let sortOptions: any = { createdAt: -1 };
    switch (sort) {
      case 'popularity':
        sortOptions = { isBestSeller: -1, reviewCount: -1 };
        break;
      case 'price-asc':
        sortOptions = { price: 1 };
        break;
      case 'price-desc':
        sortOptions = { price: -1 };
        break;
      case 'newest':
        sortOptions = { createdAt: -1 };
        break;
      case 'rating':
        sortOptions = { rating: -1 };
        break;
      case 'discount':
        sortOptions = { discountPercentage: -1 };
        break;
      default:
        sortOptions = { createdAt: -1 };
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 12;
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query).sort(sortOptions).skip(skip).limit(limitNum);

    // Get aggregated filter counts for sidebar
    const brandsList = await Product.distinct('brand');
    const categoriesList = await Product.distinct('category');

    res.json({
      success: true,
      data: {
        products,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
          hasNext: pageNum < Math.ceil(total / limitNum),
          hasPrev: pageNum > 1,
        },
        filters: {
          brands: brandsList,
          categories: categoriesList,
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductBySlugOrId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params;

    let product = await Product.findOne({ slug: identifier });
    if (!product && identifier.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(identifier);
    }

    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    // Get related products in the same category
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .select('name slug price originalPrice discountPercentage thumbnail rating reviewCount images');

    res.json({
      success: true,
      data: {
        product,
        relatedProducts,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const productData = req.body;

    if (!productData.slug && productData.name) {
      productData.slug = slugify(productData.name, { lower: true, strict: true });
    }

    // Calculate discount percentage if not provided
    if (productData.originalPrice && productData.price) {
      productData.discountPercentage = Math.round(
        ((productData.originalPrice - productData.price) / productData.originalPrice) * 100
      );
      if (productData.discountPercentage > 0) {
        productData.isOnSale = true;
      }
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name, { lower: true, strict: true });
    }

    if (updates.originalPrice && updates.price) {
      updates.discountPercentage = Math.round(
        ((updates.originalPrice - updates.price) / updates.originalPrice) * 100
      );
    }

    const updated = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updated,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFeaturedProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ isFeatured: true }).limit(8);
    res.json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getBestSellers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const products = await Product.find({ isBestSeller: true }).limit(8);
    res.json({ success: true, data: products });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
