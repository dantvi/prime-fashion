import { useEffect, useState } from 'react';
import { fetchOrders, deleteOrder } from '../services/order-service';
import { IOrder } from '../types/Order';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteOrder(id);
      setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          orders.map((order) => (
            <li key={order.id}>
              <h3>Order #{order.id}</h3>
              <p>Total Price: ${order.total_price}</p>
              <p>
                Order Date: {new Date(order.created_at).toLocaleDateString()}
              </p>
              <p>Status: {order.order_status}</p>
              <div className='button-group'>
                <Link to={`/order-details/${order.id}`}>
                  <button className='btn'>View Details</button>
                </Link>
                <Link to={`/update-order/${order.id}`}>
                  <button className='btn'>Update Status</button>
                </Link>
                <button className='btn' onClick={() => handleDelete(order.id)}>
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Orders;
