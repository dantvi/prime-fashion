import { useEffect, useState } from 'react';
import { fetchCustomers, deleteCustomer } from '../services/customer-service';
import { ICustomer } from '../types/Customer';
import { Link } from 'react-router-dom';
import CreateCustomerForm from '../components/CreateCustomerForm';

const Customers = () => {
  const [customers, setCustomers] = useState<ICustomer[]>([]);

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to fetch customers:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCustomer(id);
      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete customer:', error);
    }
  };

  const handleCustomerCreated = async () => {
    await getCustomers();
  };

  return (
    <div>
      <CreateCustomerForm onCustomerCreated={handleCustomerCreated} />
      <h2>Customers</h2>
      <ul>
        {customers.length === 0 ? (
          <p>No customers found.</p>
        ) : (
          customers.map((customer) => (
            <li key={customer.id}>
              <h3>
                {customer.firstname} {customer.lastname}
              </h3>
              <p>Email: {customer.email}</p>
              <p>Phone: {customer.phone}</p>
              <p>
                Address: {customer.street_address}, {customer.city},{' '}
                {customer.country}
              </p>
              <div className='button-group'>
                <Link to={`/update-customer/${customer.id}`}>
                  <button className='btn'>Update</button>
                </Link>
                <button
                  className='btn'
                  onClick={() => handleDelete(customer.id)}
                >
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

export default Customers;
