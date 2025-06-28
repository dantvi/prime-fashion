import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  updateCustomer,
  fetchCustomerById,
} from '../services/customer-service';
import { CustomerUpdate } from '../types/Customer';

const UpdateCustomerForm = () => {
  const [customer, setCustomer] = useState<CustomerUpdate | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getCustomer = async () => {
      try {
        if (id) {
          const existingCustomer = await fetchCustomerById(parseInt(id));
          setCustomer(existingCustomer);
        }
      } catch (error) {
        console.error('Failed to fetch customer:', error);
      } finally {
        setLoading(false);
      }
    };
    getCustomer();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!customer) return;
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!customer || !id) return;

    try {
      await updateCustomer(parseInt(id), customer);
      navigate('/customers');
    } catch (error) {
      console.error('Failed to update customer:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!customer) return <p>Customer not found.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Customer</h2>

      <label>
        First Name:
        <input
          type='text'
          name='firstname'
          value={customer.firstname}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Last Name:
        <input
          type='text'
          name='lastname'
          value={customer.lastname}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Email:
        <input
          type='email'
          name='email'
          value={customer.email}
          onChange={handleChange}
          required
        />
      </label>

      {/* This is for demonstration only – password should be handled securely in production */}
      <label>
        Password:
        <input
          type='password'
          name='password'
          value={customer.password}
          onChange={handleChange}
        />
      </label>

      <label>
        Phone:
        <input
          type='text'
          name='phone'
          value={customer.phone}
          onChange={handleChange}
        />
      </label>

      <label>
        Street Address:
        <input
          type='text'
          name='street_address'
          value={customer.street_address}
          onChange={handleChange}
        />
      </label>

      <label>
        Postal Code:
        <input
          type='text'
          name='postal_code'
          value={customer.postal_code}
          onChange={handleChange}
        />
      </label>

      <label>
        City:
        <input
          type='text'
          name='city'
          value={customer.city}
          onChange={handleChange}
        />
      </label>

      <label>
        Country:
        <input
          type='text'
          name='country'
          value={customer.country}
          onChange={handleChange}
        />
      </label>

      <button className='btn' type='submit'>
        Update Customer
      </button>
    </form>
  );
};

export default UpdateCustomerForm;
