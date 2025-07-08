import * as orderModel from '../models/order.model';
import * as orderItemModel from '../models/orderItem.model';

import {
  Order,
  OrderDetails,
  OrderInput,
  OrderUpdate,
  OrderSummary,
} from '../types/order.type';
import { OrderItemInput, OrderItem } from '../types/orderItem.type';

const calculateTotalPrice = (items: OrderItemInput[]): number => {
  return items.reduce((sum, item) => sum + item.quantity * item.price_each, 0);
};

export const createOrderFromInput = async (
  data: OrderInput
): Promise<number> => {
  const total_price = calculateTotalPrice(data.order_items);

  const newOrder: Omit<Order, 'order_id' | 'created_at' | 'updated_at'> = {
    customer_id: data.customer_id,
    total_price,
    payment_id: data.payment_id ?? null,
    payment_status: data.payment_status ?? 'Unpaid',
    order_status: data.order_status ?? 'Pending',
  };

  const order_id = await orderModel.createOrder(newOrder);

  for (const item of data.order_items) {
    await orderItemModel.createOrderItem({
      ...item,
      order_id,
    });
  }

  return order_id;
};

export const findAllOrders = async (): Promise<OrderSummary[]> => {
  const rows = await orderModel.findAllOrders();
  return rows.map((row: any) => ({
    order_id: row.order_id,
    customer_id: row.customer_id,
    total_price: Number(row.total_price),
    payment_status: row.payment_status,
    order_status: row.order_status,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
};

export const findOrderById = async (
  id: number
): Promise<OrderDetails | null> => {
  const rows = await orderModel.findOrderById(id);
  return rows.length > 0 ? formatOrderDetails(rows) : null;
};

export const findOrderByPaymentId = async (
  payment_id: string
): Promise<OrderDetails | null> => {
  const rows = await orderModel.findOrderByPaymentId(payment_id);
  return rows.length > 0 ? formatOrderDetails(rows) : null;
};

export const updateOrder = async (
  id: number,
  updates: OrderUpdate
): Promise<boolean> => {
  return await orderModel.updateOrder(id, updates);
};

export const deleteOrder = async (id: number): Promise<boolean> => {
  return await orderModel.deleteOrder(id);
};

const formatOrderDetails = (rows: any[]): OrderDetails => {
  const base = rows[0];

  const order_items: OrderItem[] = rows
    .filter((row) => row.order_item_id)
    .map((row) => ({
      order_item_id: row.order_item_id,
      order_id: row.order_id,
      product_id: row.product_id,
      quantity: row.quantity,
      price_each: row.price_each,
    }));

  return {
    order_id: base.order_id,
    customer_id: base.customer_id,
    total_price: base.total_price,
    payment_id: base.payment_id,
    payment_status: base.payment_status,
    order_status: base.order_status,
    created_at: base.created_at,
    updated_at: base.updated_at,

    customer_firstname: base.customer_firstname,
    customer_lastname: base.customer_lastname,
    customer_email: base.customer_email,
    customer_phone: base.customer_phone,
    customer_street_address: base.customer_street_address,
    customer_postal_code: base.customer_postal_code,
    customer_city: base.customer_city,
    customer_country: base.customer_country,

    order_items,
  };
};
