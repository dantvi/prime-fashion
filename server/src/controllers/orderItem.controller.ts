import { Request, Response } from 'express';
import * as orderItemService from '../services/orderItem.service';

export const updateOrderItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { quantity } = req.body;

  if (!Number.isInteger(id) || !Number.isFinite(quantity)) {
    return res
      .status(400)
      .json({ message: 'Invalid order item ID or quantity' });
  }

  try {
    const updated = await orderItemService.editOrderItem(id, quantity);

    if (!updated) {
      return res.status(quantity <= 0 ? 400 : 404).json({
        message:
          quantity <= 0
            ? 'Quantity must be greater than 0'
            : 'Order item not found',
      });
    }

    res.status(200).json({ message: 'Order item updated' });
  } catch (error) {
    console.error('Failed to update order item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteOrderItem = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({ message: 'Invalid order item ID' });
  }

  try {
    const deleted = await orderItemService.removeOrderItem(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Order item not found' });
    }

    res.status(200).json({ message: 'Order item deleted' });
  } catch (error) {
    console.error('Failed to delete order item:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
