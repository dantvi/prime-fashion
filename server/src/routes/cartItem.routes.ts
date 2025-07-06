import express from 'express';
import {
  getAllCartItems,
  getCartItemById,
  getCartItemsByCartId,
  createCartItem,
  updateCartItem,
  deleteCartItem,
} from '../controllers/cartItem.controller';

const router = express.Router();

router.get('/', getAllCartItems);
router.get('/cart/:id', getCartItemsByCartId);
router.get('/:id', getCartItemById);
router.post('/', createCartItem);
router.patch('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

export default router;
