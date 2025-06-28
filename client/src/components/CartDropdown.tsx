import { useCart } from '../contexts/cart-context';
import { useNavigate } from 'react-router-dom';
import '../styles/CartDropdown.css';

const CartDropdown = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout');
  };

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((item) => (
            <div key={item.id} className='cart-item'>
              <img
                src={item.image}
                alt={item.name}
                className='cart-item-image'
              />
              <div className='cart-item-details'>
                <h4>{item.name}</h4>
                <p>
                  {item.quantity} x ${item.price}
                </p>
              </div>
            </div>
          ))
        ) : (
          <span className='empty-message'>Your cart is empty</span>
        )}
      </div>
      <button className='btn btn-wide' onClick={goToCheckoutHandler}>
        GO TO CHECKOUT
      </button>
    </div>
  );
};

export default CartDropdown;
