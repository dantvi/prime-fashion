import { useState, FormEvent } from 'react';
import { createCustomer } from '../services/customer-service';
import { CustomerCreate } from '../types/Customer';
import { useNavigate } from 'react-router-dom';

interface ICreateCustomerFormProps {
  onCustomerCreated: () => Promise<void>;
}

const CreateCustomerForm = ({
  onCustomerCreated,
}: ICreateCustomerFormProps) => {
  const [customer, setCustomer] = useState<CustomerCreate>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    street_address: '',
    postal_code: '',
    city: '',
    country: '',
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createCustomer(customer);
      setCustomer({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        street_address: '',
        postal_code: '',
        city: '',
        country: '',
      });

      await onCustomerCreated();
      navigate('/customers');
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Customer</h2>

      <div className='input-container'>
        <label>First Name:</label>
        <input
          type='text'
          name='firstname'
          value={customer.firstname}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Last Name:</label>
        <input
          type='text'
          name='lastname'
          value={customer.lastname}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Email:</label>
        <input
          type='email'
          name='email'
          value={customer.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={customer.password}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Phone:</label>
        <input
          type='text'
          name='phone'
          value={customer.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Street Address:</label>
        <input
          type='text'
          name='street_address'
          value={customer.street_address}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Postal Code:</label>
        <input
          type='text'
          name='postal_code'
          value={customer.postal_code}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>City:</label>
        <input
          type='text'
          name='city'
          value={customer.city}
          onChange={handleChange}
          required
        />
      </div>

      <div className='input-container'>
        <label>Country:</label>
        <input
          type='text'
          name='country'
          value={customer.country}
          onChange={handleChange}
          required
        />
      </div>

      <button className='btn' type='submit'>
        Create Customer
      </button>
    </form>
  );
};

export default CreateCustomerForm;
