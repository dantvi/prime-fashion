import * as orderItemModel from '../models/orderItem.model';

export const editOrderItem = async (
  order_item_id: number,
  quantity: number
): Promise<boolean> => {
  if (quantity <= 0) {
    console.warn(`Invalid quantity (${quantity})`);
    return false;
  }

  const existing = await orderItemModel.findOrderItemById(order_item_id);
  if (!existing) {
    console.warn(`Order item not found with ID: ${order_item_id}`);
    return false;
  }

  const updated = await orderItemModel.updateOrderItem(order_item_id, quantity);
  if (!updated) return false;

  await orderItemModel.updateOrderTotalPrice(existing.order_id);
  return true;
};

export const removeOrderItem = async (
  order_item_id: number
): Promise<boolean> => {
  const existing = await orderItemModel.findOrderItemById(order_item_id);
  if (!existing) {
    console.warn(`Order item not found with ID: ${order_item_id}`);
    return false;
  }

  const deleted = await orderItemModel.deleteOrderItem(order_item_id);
  if (!deleted) return false;

  await orderItemModel.updateOrderTotalPrice(existing.order_id);
  return true;
};
