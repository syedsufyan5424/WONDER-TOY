import { Router } from 'express';
import { getProductReviews, addReview } from '../controllers/reviewController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/:productId/reviews', getProductReviews);
router.post('/:productId/reviews', protect, addReview);

export default router;
