import { Router } from 'express';
import {
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress,
  getAllCustomers,
  getCustomerById,
} from '../controllers/userController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = Router();

// Customer address routes
router.get('/addresses', protect, getAddresses);
router.post('/addresses', protect, addAddress);
router.put('/addresses/:id', protect, updateAddress);
router.delete('/addresses/:id', protect, deleteAddress);

// Admin customer management routes
router.get('/', protect, adminOnly, getAllCustomers);
router.get('/:id', protect, adminOnly, getCustomerById);

export default router;
