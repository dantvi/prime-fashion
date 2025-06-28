import axios, { AxiosError } from 'axios';
import { API_URL } from '../services/base-service';
import { IOrder, IOrderDetails, OrderUpdate } from '../types/Order';

export const fetchOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await axios.get<IOrder[]>(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    handleApiError(error, 'fetching orders');
    throw error;
  }
};

export const fetchOrderById = async (id: number): Promise<IOrderDetails> => {
  try {
    const response = await axios.get<IOrderDetails>(`${API_URL}/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

export const fetchOrderBySessionId = async (
  sessionId: string
): Promise<IOrderDetails> => {
  try {
    const response = await axios.get<IOrderDetails>(
      `${API_URL}/orders/payment/${sessionId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, `fetching order with session ID ${sessionId}`);
    throw error;
  }
};

export const updateOrder = async (
  id: number,
  updatedOrder: OrderUpdate
): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/orders/${id}`, updatedOrder);
  } catch (error) {
    handleApiError(error, `updating order with ID ${id}`);
    throw error;
  }
};

export const deleteOrder = async (id: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/orders/${id}`);
  } catch (error) {
    handleApiError(error, `deleting order with ID ${id}`);
    throw error;
  }
};

export const updateOrderItem = async (
  itemId: number,
  quantity: number
): Promise<void> => {
  try {
    await axios.patch(`${API_URL}/order-items/${itemId}`, { quantity });
  } catch (error) {
    handleApiError(error, `updating order item with ID ${itemId}`);
    throw error;
  }
};

export const deleteOrderItem = async (itemId: number): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/order-items/${itemId}`);
  } catch (error) {
    handleApiError(error, `deleting order item with ID ${itemId}`);
    throw error;
  }
};

const handleApiError = (error: unknown, action: string) => {
  if (error instanceof AxiosError) {
    console.error(
      `API Error while ${action}:`,
      error.response?.data || error.message
    );
  } else if (error instanceof Error) {
    console.error(`Error while ${action}:`, error.message);
  } else {
    console.error(`Unknown error while ${action}:`, error);
  }
};
