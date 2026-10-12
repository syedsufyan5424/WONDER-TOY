import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { Address } from '../models/Address';
import { User } from '../models/User';
import { Order } from '../models/Order';

export const getAddresses = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    let addresses = await Address.find({ user: userId }).sort({ isDefault: -1, createdAt: -1 });

    if (addresses.length === 0 && userId) {
      // Auto-provision demo addresses for user
      const defaultAddr1 = await Address.create({
        user: userId,
        fullName: req.user?.name || 'Syed Sufyan Mehdi',
        phone: req.user?.phone || '+91 98765 43210',
        email: req.user?.email,
        houseFlat: 'H.No 12-3-45',
        street: 'Akbar Bagh',
        area: 'Malakpet',
        city: 'Hyderabad',
        state: 'Telangana',
        pinCode: '500036',
        isDefault: true,
      });

      const defaultAddr2 = await Address.create({
        user: userId,
        fullName: 'Nusreth Mohammed',
        phone: '+91 91234 56789',
        email: req.user?.email,
        houseFlat: 'Saidabad Colony, Plot 22',
        street: 'Main Road',
        area: 'Saidabad',
        city: 'Hyderabad',
        state: 'Telangana',
        pinCode: '500059',
        isDefault: false,
      });

      addresses = [defaultAddr1, defaultAddr2];
    }

    res.json({ success: true, data: addresses });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addAddress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?._id;
    const { fullName, phone, email, houseFlat, street, area, city, state, pinCode, isDefault } = req.body;

    if (isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const count = await Address.countDocuments({ user: userId });
    const address = await Address.create({
      user: userId,
      fullName,
      phone,
      email: email || req.user?.email,
      houseFlat,
      street,
      area,
      city,
      state,
      pinCode,
      isDefault: isDefault || count === 0,
    });

    res.status(201).json({ success: true, data: address });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const updateAddress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (req.body.isDefault) {
      await Address.updateMany({ user: userId }, { isDefault: false });
    }

    const address = await Address.findOneAndUpdate(
      { _id: id, user: userId },
      req.body,
      { new: true }
    );

    if (!address) {
      res.status(404).json({ success: false, message: 'Address not found' });
      return;
    }

    res.json({ success: true, data: address });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteAddress = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    const address = await Address.findOneAndDelete({ _id: id, user: userId });
    if (!address) {
      res.status(404).json({ success: false, message: 'Address not found' });
      return;
    }

    res.json({ success: true, message: 'Address deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q } = req.query;
    const query: any = { role: 'customer' };

    if (q && typeof q === 'string') {
      const regex = new RegExp(q.trim(), 'i');
      query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const customers = await User.find(query).select('-password').sort({ createdAt: -1 });

    // Populate order count and total spend for each customer
    const customerStats = await Promise.all(
      customers.map(async (customer) => {
        const orders = await Order.find({ customer: customer._id });
        const totalSpending = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.total : 0), 0);
        return {
          ...customer.toObject(),
          orderCount: orders.length,
          totalSpending,
        };
      })
    );

    res.json({ success: true, data: customerStats });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCustomerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const customer = await User.findById(id).select('-password');
    if (!customer) {
      res.status(404).json({ success: false, message: 'Customer not found' });
      return;
    }

    const orders = await Order.find({ customer: id }).sort({ createdAt: -1 });
    const addresses = await Address.find({ user: id });

    res.json({
      success: true,
      data: {
        customer,
        orders,
        addresses,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
