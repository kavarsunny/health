import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', productController.getProducts);
router.get('/:id', productController.getProduct);
router.post('/', protect as any, admin as any, productController.createProduct);
router.put('/:id', protect as any, admin as any, productController.updateProduct);
router.delete('/:id', protect as any, admin as any, productController.deleteProduct);

export default router;
