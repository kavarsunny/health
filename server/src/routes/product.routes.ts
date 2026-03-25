import { Router } from 'express';
import * as productController from '../controllers/product.controller';
import { protect, admin } from '../middleware/auth.middleware';

// Middleware that allows farmer, admin, and superadmin roles
import { Request, Response, NextFunction } from 'express';
import { AuthRequest } from '../types';

const farmerOrAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const role = req.user?.role;
  if (role === 'farmer' || role === 'admin' || role === 'superadmin') {
    next();
  } else {
    res.status(403).json({ success: false, message: 'Not authorized' });
  }
};

const router = Router();

router.get('/',    productController.getProducts);
router.get('/:id', productController.getProduct);

// Farmers can create/update/delete their own products; admins can do anything
router.post('/',    protect as any, farmerOrAdmin as any, productController.createProduct);
router.put('/:id',  protect as any, farmerOrAdmin as any, productController.updateProduct);
router.delete('/:id', protect as any, farmerOrAdmin as any, productController.deleteProduct);

export default router;
