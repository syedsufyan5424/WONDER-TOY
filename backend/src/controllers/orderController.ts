import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { Cart } from '../models/Cart';

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const {
      items,
      shippingAddress,
      paymentMethod,
      subtotal,
      shipping,
      discount,
      couponCode,
      tax,
      total,
      paymentStatus = 'Paid', // demo test flow defaults to Paid or Pending
    } = req.body;

    if (!items || items.length === 0) {
      res.status(400).json({ success: false, message: 'No items in order' });
      return;
    }

    if (!shippingAddress) {
      res.status(400).json({ success: false, message: 'Shipping address is required' });
      return;
    }

    // Generate unique order ID like ORD-1025
    const count = await Order.countDocuments();
    const orderId = `#${1001 + count}`;

    // Verify stock and update inventory
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (product) {
        if (product.stock < item.quantity) {
          res.status(400).json({
            success: false,
            message: `Product ${product.name} is out of stock or does not have enough quantity.`,
          });
          return;
        }
        product.stock -= item.quantity;
        await product.save();
      }
    }

    const order = await Order.create({
      orderId,
      customer: userId,
      customerDetails: {
        name: req.user?.name || shippingAddress.fullName,
        email: req.user?.email || shippingAddress.email || '',
        phone: req.user?.phone || shippingAddress.phone || '',
      },
      items,
      shippingAddress,
      paymentMethod,
      paymentStatus,
      orderStatus: 'Confirmed',
      subtotal,
      shipping: shipping || 0,
      discount: discount || 0,
      couponCode: couponCode || '',
      tax: tax || 0,
      total,
      statusHistory: [
        { status: 'Order Placed', date: new Date(), note: 'Order successfully created.' },
        { status: 'Confirmed', date: new Date(), note: 'Payment verified and order confirmed.' },
      ],
    });

    // Clear user's cart after successful order
    if (userId) {
      await Cart.findOneAndUpdate({ user: userId }, { items: [], couponCode: '', discount: 0 });
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const orders = await Order.find({ customer: userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    let order = await Order.findOne({ orderId: id });
    if (!order && id.match(/^[0-9a-fA-F]{24}$/)) {
      order = await Order.findById(id);
    }

    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    res.json({ success: true, data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status, q, page = '1', limit = '15' } = req.query;
    const query: any = {};

    if (status && status !== 'all') {
      query.orderStatus = status;
    }

    if (q && typeof q === 'string') {
      const regex = new RegExp(q.trim(), 'i');
      query.$or = [
        { orderId: regex },
        { 'customerDetails.name': regex },
        { 'customerDetails.email': regex },
        { 'shippingAddress.phone': regex },
      ];
    }

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 15;
    const skip = (pageNum - 1) * limitNum;

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum);

    res.json({
      success: true,
      data: {
        orders,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { orderStatus, paymentStatus, note } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      res.status(404).json({ success: false, message: 'Order not found' });
      return;
    }

    if (orderStatus && orderStatus !== order.orderStatus) {
      order.orderStatus = orderStatus;
      order.statusHistory.push({
        status: orderStatus,
        date: new Date(),
        note: note || `Status updated to ${orderStatus}`,
      });
    }

    if (paymentStatus) {
      order.paymentStatus = paymentStatus;
    }

    await order.save();
    res.json({ success: true, message: 'Order updated successfully', data: order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
