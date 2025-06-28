import { Link } from 'react-router-dom';
import { useCart } from '../contexts/cart-context';
import CartIcon from '../components/CartIcon';
import CartDropdown from '../components/CartDropdown';
import '../styles/Navigation.css';

const Navigation = () => {
  const { isCartOpen } = useCart();

  return (
    <nav className='navigation'>
      <div className='nav-links-container'>
        <Link className='nav-link' to='/'>
          Home
        </Link>
        <Link className='nav-link' to='/shop'>
          Shop
        </Link>
        <Link className='nav-link' to='/admin'>
          Admin
        </Link>
        <CartIcon />
      </div>
      {isCartOpen && <CartDropdown />}
    </nav>
  );
};

export default Navigation;
