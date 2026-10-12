import { Router } from 'express';
import {
  getDashboardStats,
  getInventory,
  updateStock,
} from '../controllers/adminController';
import { protect, adminOnly } from '../middleware/authMiddleware';

const router = Router();

router.use(protect, adminOnly);

router.get('/dashboard', getDashboardStats);
router.get('/inventory', getInventory);
router.put('/inventory/:id/stock', updateStock);

export default router;
