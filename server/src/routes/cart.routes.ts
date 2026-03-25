import { Router } from 'express';
import * as cartController from '../controllers/cart.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.use(protect as any);

router.get('/', cartController.getCart as any);
router.post('/', cartController.addToCart as any);
router.delete('/:productId', cartController.removeFromCart as any);
router.delete('/', cartController.clearCart as any);

export default router;
