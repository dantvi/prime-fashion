import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateOrder, fetchOrderById } from '../services/order-service';
import { IOrder, OrderUpdate } from '../types/Order';

const UpdateOrderStatusForm = () => {
  const [order, setOrder] = useState<IOrder | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getOrder = async () => {
      try {
        if (id) {
          const existingOrder = await fetchOrderById(parseInt(id));
          setOrder(existingOrder);
        }
      } catch (error) {
        console.error('Failed to fetch order:', error);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!order) return;
    setOrder((prev) => ({
      ...prev!,
      order_status: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!order || !id) return;
    const payload: OrderUpdate = { order_status: order.order_status };

    try {
      await updateOrder(parseInt(id), payload);
      navigate('/orders');
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Order Status</h2>

      <label>
        Status:
        <select value={order.order_status} onChange={handleChange}>
          <option value='Pending'>Pending</option>
          <option value='Processing'>Processing</option>
          <option value='Shipped'>Shipped</option>
          <option value='Delivered'>Delivered</option>
          <option value='Cancelled'>Cancelled</option>
        </select>
      </label>

      <button className='btn' type='submit'>
        Update Status
      </button>
    </form>
  );
};

export default UpdateOrderStatusForm;
