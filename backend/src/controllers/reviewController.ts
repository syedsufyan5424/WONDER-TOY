import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { Review } from '../models/Review';
import { Product } from '../models/Product';

export const getProductReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addReview = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { rating, title, comment } = req.body;
    const userId = req.user?._id;
    const userName = req.user?.name || 'Happy Parent';

    if (!rating || !comment) {
      res.status(400).json({ success: false, message: 'Please provide rating and comment' });
      return;
    }

    const review = await Review.create({
      product: productId,
      user: userId,
      userName,
      rating: Number(rating),
      title: title || '',
      comment,
      verifiedPurchase: true,
    });

    // Update product average rating and count
    const allReviews = await Review.find({ product: productId });
    const avgRating =
      allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: parseFloat(avgRating.toFixed(1)),
      reviewCount: allReviews.length,
    });

    res.status(201).json({
      success: true,
      message: 'Review submitted successfully',
      data: review,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
