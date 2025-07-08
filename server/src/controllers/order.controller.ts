import { Request, Response } from 'express';
import * as orderService from '../services/order.service';
import { OrderInput, OrderUpdate } from '../types/order.type';

export const getOrders = async (_req: Request, res: Response) => {
  try {
    const orders = await orderService.findAllOrders();
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ message: 'Server error while fetching orders' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const order = await orderService.findOrderById(id);
    order
      ? res.json(order)
      : res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    console.error(`Error fetching order ID ${id}:`, error);
    res.status(500).json({ message: 'Server error while fetching order' });
  }
};

export const getOrderByPaymentId = async (req: Request, res: Response) => {
  const payment_id = req.params.payment_id;
  try {
    const order = await orderService.findOrderByPaymentId(payment_id);
    order
      ? res.json(order)
      : res.status(404).json({ message: 'Order not found for payment ID' });
  } catch (error) {
    console.error(`Error fetching order by payment ID ${payment_id}:`, error);
    res
      .status(500)
      .json({ message: 'Server error while fetching order by payment ID' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const input: OrderInput = req.body;
  try {
    const order_id = await orderService.createOrderFromInput(input);
    res.status(201).json({ message: 'Order created', order_id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error while creating order' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updates: OrderUpdate = req.body;

  try {
    const success = await orderService.updateOrder(id, updates);
    success
      ? res.json({ message: 'Order updated' })
      : res
          .status(404)
          .json({ message: 'Order not found or no fields updated' });
  } catch (error) {
    console.error(`Error updating order ID ${id}:`, error);
    res.status(500).json({ message: 'Server error while updating order' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const success = await orderService.deleteOrder(id);
    success
      ? res.json({ message: 'Order deleted' })
      : res.status(404).json({ message: 'Order not found' });
  } catch (error) {
    console.error(`Error deleting order ID ${id}:`, error);
    res.status(500).json({ message: 'Server error while deleting order' });
  }
};
