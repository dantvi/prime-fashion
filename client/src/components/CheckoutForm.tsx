import { useState, useEffect, FormEvent } from 'react';
import { ICheckoutCustomer } from '../types/Customer';
import '../styles/CheckoutForm.css';

const CheckoutForm = ({ onValidSubmit }: { onValidSubmit: () => void }) => {
  const [customer, setCustomer] = useState<ICheckoutCustomer>({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    street_address: '',
    postal_code: '',
    city: '',
    country: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const savedCustomer = localStorage.getItem('checkoutCustomer');
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('checkoutCustomer', JSON.stringify(customer));
  }, [customer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = (): boolean => {
    let newErrors: Record<string, string> = {};

    if (!customer.firstname.trim())
      newErrors.firstname = 'First name is required';
    if (!customer.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!customer.email.trim() || !/^\S+@\S+\.\S+$/.test(customer.email))
      newErrors.email = 'Valid email is required';
    if (!customer.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!customer.street_address.trim())
      newErrors.street_address = 'Street address is required';
    if (!customer.postal_code.trim())
      newErrors.postal_code = 'Postal code is required';
    if (!customer.city.trim()) newErrors.city = 'City is required';
    if (!customer.country.trim()) newErrors.country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      onValidSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout Information</h2>

      {[
        { label: 'First Name', name: 'firstname' },
        { label: 'Last Name', name: 'lastname' },
        { label: 'Email', name: 'email', type: 'email' },
        { label: 'Phone', name: 'phone' },
        { label: 'Street Address', name: 'street_address' },
        { label: 'Postal Code', name: 'postal_code' },
        { label: 'City', name: 'city' },
        { label: 'Country', name: 'country' },
      ].map(({ label, name, type = 'text' }) => (
        <div className='input-container' key={name}>
          <label>{label}:</label>
          <input
            type={type}
            name={name}
            value={customer[name as keyof ICheckoutCustomer]}
            onChange={handleChange}
          />
          {errors[name] && <span className='error'>{errors[name]}</span>}
        </div>
      ))}

      <button className='btn' type='submit'>
        Proceed to Payment
      </button>
    </form>
  );
};

export default CheckoutForm;
