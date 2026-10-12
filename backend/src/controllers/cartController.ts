import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    let cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
    }

    res.json({ success: true, data: cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({ success: false, message: 'Requested quantity exceeds available stock' });
      return;
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += Number(quantity);
      cart.items[itemIndex].price = product.price;
    } else {
      cart.items.push({
        product: product._id as any,
        quantity: Number(quantity),
        price: product.price,
      });
    }

    await cart.save();
    const populatedCart = await Cart.findById(cart._id).populate('items.product');

    res.json({
      success: true,
      message: `${product.name} added to cart`,
      data: populatedCart,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { itemId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
      return;
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ success: false, message: 'Cart not found' });
      return;
    }

    const item = cart.items.find((i: any) => i._id.toString() === itemId);
    if (!item) {
      res.status(404).json({ success: false, message: 'Item not found in cart' });
      return;
    }

    const product = await Product.findById(item.product);
    if (product && product.stock < quantity) {
      res.status(400).json({ success: false, message: `Only ${product.stock} items in stock` });
      return;
    }

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json({ success: true, data: populatedCart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { itemId } = req.params;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      res.status(404).json({ success: false, message: 'Cart not found' });
      return;
    }

    cart.items = cart.items.filter((i: any) => i._id.toString() !== itemId);
    await cart.save();

    const populatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json({
      success: true,
      message: 'Product removed from cart',
      data: populatedCart,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      cart.items = [];
      cart.couponCode = '';
      cart.discount = 0;
      await cart.save();
    }
    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
