import express from 'express';
import { createGuestOrder, getAllGuestOrders, getGuestOrderById } from '../controller/guestOrderController.js';
import { verifyUserAuth, roleBasedAccess } from '../middleware/userAuth.js';

const router = express.Router();

// Create guest order (no login required)
router.route('/guest/order').post(createGuestOrder);

// Get all guest orders (admin only)
router.route('/admin/guest/orders')
    .get(verifyUserAuth, roleBasedAccess('admin'), getAllGuestOrders);

// Get single guest order (admin only)
router.route('/admin/guest/order/:id')
    .get(verifyUserAuth, roleBasedAccess('admin'), getGuestOrderById);

export default router;
