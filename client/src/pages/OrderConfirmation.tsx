import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { fetchOrderBySessionId } from '../services/order-service';
import { IOrderDetails } from '../types/Order';
import { useCart } from '../contexts/cart-context';
import '../styles/OrderConfirmation.css';

const OrderConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();
  const [order, setOrder] = useState<IOrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getOrder = async () => {
      if (!sessionId) {
        setError('No session ID provided.');
        setLoading(false);
        return;
      }

      let attempts = 0;
      const maxAttempts = 5;
      const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

      while (attempts < maxAttempts) {
        try {
          const orderData = await fetchOrderBySessionId(sessionId);
          setOrder(orderData);
          clearCart();
          localStorage.removeItem('checkoutCustomer');
          setLoading(false);
          return;
        } catch (err) {
          attempts++;
          console.warn(`Attempt ${attempts} failed, retrying...`);
          await delay(1000);
        }
      }

      setError('Could not fetch order details.');
      setLoading(false);
    };

    getOrder();
  }, [sessionId, clearCart]);

  if (loading) return <p className='order-confirmation-loading'>Loading...</p>;
  if (error) return <p className='order-confirmation-error'>{error}</p>;
  if (!order)
    return <p className='order-confirmation-error'>Order not found.</p>;

  return (
    <div className='order-confirmation-container'>
      <h2>Thank you for your order!</h2>
      <p>
        <strong>Order ID:</strong> {order.id}
      </p>
      <p>
        <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {order.order_status}
      </p>

      <h3>Customer Information</h3>
      <p>
        {order.customer_firstname} {order.customer_lastname}
      </p>
      <p>{order.customer_email}</p>
      <p>
        {order.customer_street_address}, {order.customer_postal_code}{' '}
        {order.customer_city}, {order.customer_country}
      </p>

      <h3>Items</h3>
      <ul className='order-items-list'>
        {order.order_items.map((item) => (
          <li key={item.id} className='order-item'>
            {item.product_name} — {item.quantity} x ${item.unit_price}
          </li>
        ))}
      </ul>

      <p className='order-total'>
        <strong>Total:</strong> ${order.total_price}
      </p>

      <button className='btn' onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default OrderConfirmation;
