import { Router } from 'express';
import {
  updateOrderItem,
  deleteOrderItem,
} from '../controllers/orderItem.controller';

const router = Router();

router.patch('/:id', updateOrderItem);
router.delete('/:id', deleteOrderItem);

export default router;
