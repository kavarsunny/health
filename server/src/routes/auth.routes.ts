import { Router } from 'express';
import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import { protect, admin } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';

const router = Router();

router.post(
  '/register',
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ]),
  authController.register
);

router.post(
  '/login',
  validate([
    body('password').notEmpty().withMessage('Password is required'),
  ]),
  authController.login
);

router.post(
  '/register-farmer',
  validate([
    body('name').notEmpty().withMessage('Name is required'),
    body('farmerType').isIn(['Individual Farmer', 'FPO/Organization']).withMessage('Valid Farmer Type is required'),
    body('state').notEmpty().withMessage('State is required'),
    body('district').notEmpty().withMessage('District is required'),
  ]),
  authController.registerFarmer
);

router.get('/profile', protect as any, authController.getProfile as any);

// Admin Routes
router.get('/users', protect as any, admin as any, authController.getAllUsers as any);
router.get('/farmers', protect as any, admin as any, authController.getAllFarmers as any);
router.get('/farmers/pending', protect as any, admin as any, authController.getPendingFarmers as any);
router.patch('/farmers/:id/approve', protect as any, admin as any, authController.approveFarmer as any);
router.patch('/users/:id/role', protect as any, admin as any, authController.updateUserRole as any);
router.delete('/users/:id', protect as any, admin as any, authController.deleteUser as any);

export default router;
