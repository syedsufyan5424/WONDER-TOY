import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { Wishlist } from '../models/Wishlist';

export const getWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    let wishlist = await Wishlist.findOne({ user: userId }).populate('products');

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: userId, products: [] });
    }

    res.json({ success: true, data: wishlist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { productId } = req.body;

    let wishlist = await Wishlist.findOne({ user: userId });
    if (!wishlist) {
      wishlist = new Wishlist({ user: userId, products: [] });
    }

    const index = wishlist.products.findIndex(
      (p) => p.toString() === productId
    );

    let added = false;
    if (index > -1) {
      wishlist.products.splice(index, 1);
      added = false;
    } else {
      wishlist.products.push(productId as any);
      added = true;
    }

    await wishlist.save();
    const populated = await Wishlist.findById(wishlist._id).populate('products');

    res.json({
      success: true,
      message: added ? 'Product added to wishlist' : 'Product removed from wishlist',
      data: {
        wishlist: populated,
        isWishlisted: added,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ user: userId });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (p) => p.toString() !== productId
      );
      await wishlist.save();
    }

    const populated = await Wishlist.findOne({ user: userId }).populate('products');
    res.json({
      success: true,
      message: 'Product removed from wishlist',
      data: populated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
