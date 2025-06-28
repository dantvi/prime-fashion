import { db } from "../config/db";

export const updateProductStockForOrder = async (
  orderId: number
): Promise<void> => {
  try {
    const [items] = await db.query<any[]>(
      `SELECT product_id, quantity FROM order_items WHERE order_id = ?`,
      [orderId]
    );

    if (!items.length) {
      console.warn(`No order items found for order ID ${orderId}`);
      return;
    }

    for (const item of items) {
      await db.query(`UPDATE products SET stock = stock - ? WHERE id = ?`, [
        item.quantity,
        item.product_id,
      ]);
    }

    console.log(`Stock updated for order ID ${orderId}`);
  } catch (error) {
    console.error("Error updating product stock:", error);
    throw error;
  }
};
