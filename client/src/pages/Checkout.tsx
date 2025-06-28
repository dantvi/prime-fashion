import { useCart } from '../contexts/cart-context';
import CheckoutForm from '../components/CheckoutForm';
import CheckoutItem from '../components/CheckoutItem';
import '../styles/Checkout.css';

const Checkout = () => {
  const { cartItems, cartTotal } = useCart();

  const handlePayment = async () => {
    try {
      const customer = JSON.parse(
        localStorage.getItem('checkoutCustomer') || '{}'
      );

      const customerRes = await fetch(
        `http://localhost:3000/customers/email/${customer.email}`
      );

      let customerData;
      if (customerRes.status === 200) {
        customerData = await customerRes.json();
      } else {
        const createRes = await fetch('http://localhost:3000/customers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(customer),
        });
        customerData = await createRes.json();
      }

      const customerId = customerData.id;

      const orderBody = {
        customer_id: customerId,
        payment_status: 'unpaid',
        payment_id: '',
        order_status: 'pending',
        order_items: cartItems.map((item) => ({
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
        })),
      };

      const orderRes = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderBody),
      });

      const orderData = await orderRes.json();

      const checkoutRes = await fetch(
        'http://localhost:3000/stripe/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            cartItems,
            orderId: orderData.id,
          }),
        }
      );

      const { url } = await checkoutRes.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error during payment initiation:', error);
    }
  };

  return (
    <div className='checkout-container'>
      <h2>Checkout</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. Add some items before proceeding.</p>
      ) : (
        <>
          <div className='checkout-header'>
            <div className='header-block'>
              <span>Product</span>
            </div>
            <div className='header-block'>
              <span>Description</span>
            </div>
            <div className='header-block'>
              <span>Quantity</span>
            </div>
            <div className='header-block'>
              <span>Price</span>
            </div>
            <div className='header-block'>
              <span>Remove</span>
            </div>
          </div>

          {cartItems.map((cartItem) => (
            <CheckoutItem key={cartItem.id} cartItem={cartItem} />
          ))}

          <span className='total'>Total: ${cartTotal}</span>

          <CheckoutForm onValidSubmit={handlePayment} />
        </>
      )}
    </div>
  );
};

export default Checkout;
