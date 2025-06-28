import { useCart } from '../contexts/cart-context';
import ShoppingIcon from '../assets/shopping-bag.svg';
import '../styles/CartIcon.css';

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartCount } = useCart();

  const toggleCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className='cart-icon-container' onClick={toggleCartOpen}>
      <img src={ShoppingIcon} alt='Shopping Cart' className='shopping-icon' />
      <span className='item-count'>{cartCount}</span>
    </div>
  );
};

export default CartIcon;
