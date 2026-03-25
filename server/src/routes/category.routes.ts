import { Router } from 'express';
import * as categoryController from '../controllers/category.controller';
import { protect, admin } from '../middleware/auth.middleware';

const router = Router();

router.get('/', categoryController.getCategories);
router.post('/', protect as any, admin as any, categoryController.createCategory);
router.delete('/:id', protect as any, admin as any, categoryController.deleteCategory);

export default router;
