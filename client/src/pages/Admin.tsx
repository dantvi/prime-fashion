import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>
        Welcome to the admin panel. Here you can manage customers, products, and
        orders.
      </p>

      <ul>
        <li>
          <Link to='/customers'>
            <h3>Customers</h3>
            <p>View, create, update, and delete customers.</p>
          </Link>
        </li>
        <li>
          <Link to='/products'>
            <h3>Products</h3>
            <p>View, create, update, and delete products.</p>
          </Link>
        </li>
        <li>
          <Link to='/orders'>
            <h3>Orders</h3>
            <p>View, update order status, and delete orders.</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Admin;
