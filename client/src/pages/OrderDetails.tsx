import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  fetchOrderById,
  updateOrderItem,
  deleteOrderItem,
} from '../services/order-service';
import { IOrderDetails } from '../types/Order';
import '../styles/OrderDetails.css';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState<IOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [updatedQuantities, setUpdatedQuantities] = useState<{
    [key: number]: string;
  }>({});
  const [quantityErrors, setQuantityErrors] = useState<{
    [key: number]: string;
  }>({});

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (id) {
          const orderData = await fetchOrderById(parseInt(id));
          setOrder(orderData);
        }
      } catch (error) {
        console.error('Failed to fetch order details:', error);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [id]);

  const handleQuantityChange = (itemId: number, newValue: string) => {
    setUpdatedQuantities((prev) => ({ ...prev, [itemId]: newValue }));
    setQuantityErrors((prev) => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const handleUpdateQuantity = async (itemId: number) => {
    if (!order) return;

    const rawQuantity = updatedQuantities[itemId];
    const parsedQuantity = parseInt(rawQuantity, 10);

    if (isNaN(parsedQuantity) || parsedQuantity <= 0) {
      setQuantityErrors((prev) => ({
        ...prev,
        [itemId]: 'Quantity must be a positive number.',
      }));
      return;
    }

    try {
      await updateOrderItem(itemId, parsedQuantity);
      setOrder({
        ...order,
        order_items: order.order_items.map((item) =>
          item.id === itemId ? { ...item, quantity: parsedQuantity } : item
        ),
      });

      setUpdatedQuantities((prev) => {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      });

      setQuantityErrors((prev) => {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      console.error('Failed to update order item quantity:', error);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    if (!order) return;

    try {
      await deleteOrderItem(itemId);
      setOrder({
        ...order,
        order_items: order.order_items.filter((item) => item.id !== itemId),
      });
    } catch (error) {
      console.error('Failed to delete order item:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div>
      <h2>Order Details</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Status:</strong> {order.order_status}
      </p>
      <p>
        <strong>Total Price:</strong> ${order.total_price}
      </p>
      <p>
        <strong>Order Date:</strong>{' '}
        {new Date(order.created_at).toLocaleDateString()}
      </p>

      <h3>Customer Information</h3>
      <p>
        <strong>Name:</strong> {order.customer_firstname ?? 'N/A'}{' '}
        {order.customer_lastname ?? 'N/A'}
      </p>
      <p>
        <strong>Email:</strong> {order.customer_email ?? 'N/A'}
      </p>
      <p>
        <strong>Phone:</strong> {order.customer_phone ?? 'N/A'}
      </p>
      <p>
        <strong>Address:</strong> {order.customer_street_address ?? 'N/A'},{' '}
        {order.customer_postal_code ?? 'N/A'} {order.customer_city ?? 'N/A'},{' '}
        {order.customer_country ?? 'N/A'}
      </p>

      <h3>Order Items</h3>
      <div className='order-items-container'>
        {order.order_items.map((item) => (
          <div key={item.id} className='order-item'>
            <strong>{item.product_name}</strong>
            <input
              type='number'
              value={updatedQuantities[item.id] ?? String(item.quantity)}
              min='1'
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
            {quantityErrors[item.id] && (
              <span className='error'>{quantityErrors[item.id]}</span>
            )}
            <span>x ${item.unit_price}</span>
            <button
              className='btn'
              onClick={() => handleUpdateQuantity(item.id)}
            >
              Update
            </button>
            <button className='btn' onClick={() => handleDeleteItem(item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
