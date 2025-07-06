import express from 'express';
import {
  getAllCarts,
  getCartById,
  createCart,
  updateCart,
  deleteCart,
} from '../controllers/cart.controller';

const router = express.Router();

router.get('/', getAllCarts);
router.get('/:id', getCartById);
router.post('/', createCart);
router.patch('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;
