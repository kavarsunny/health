import { Router } from 'express';
import * as orderController from '../controllers/order.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

router.use(protect as any);

router.post('/', orderController.createOrder as any);
router.get('/', orderController.getMyOrders as any);
router.get('/all', admin as any, orderController.getAllOrders as any);
router.get('/:id', orderController.getOrder as any);
router.put('/:id/status', admin as any, orderController.updateOrderStatus as any);

export default router;
