import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiHeart, FiMenu } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { RiShoppingBagLine } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';
import Badge from '@mui/material/Badge';
import logo from '../assets/prime-fashion-logo.jpg';
import '../styles/Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = mobileMenuOpen ? 'auto' : 'hidden';
  };

  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/shop', label: 'SHOP' },
    { path: '/blog', label: 'BLOG' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' },
    { path: '/admin', label: 'ADMIN' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className='navbar'>
        <div className='logo-container'>
          <Link to='/'>
            <img src={logo} alt='Prime Fashion Logo' className='logo-image' />
          </Link>
        </div>

        <div className='links-container'>
          <ul className='nav-list'>
            {navLinks.map(({ path, label }) => (
              <li key={path} className='nav-item'>
                <Link to={path}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='icon-container'>
          <FiSearch size={22} />
          <Link to='/login'>
            <FaRegUser size={22} />
          </Link>
          <Link to='/cart'>
            <Badge badgeContent={2} color='primary'>
              <RiShoppingBagLine size={22} />
            </Badge>
          </Link>
          <FiHeart size={22} />
        </div>
      </nav>

      {/* Mobile Nav */}
      <div className='mobile-nav'>
        <div className='mobile-menu-wrapper'>
          <button className='mobile-menu-button' onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <MdOutlineClose size={24} />
            ) : (
              <FiMenu size={24} />
            )}
          </button>
        </div>

        <div className='logo-container'>
          <Link to='/'>
            <img src={logo} alt='Prime Fashion Logo' className='logo-image' />
          </Link>
        </div>

        <Link to='/cart'>
          <Badge badgeContent={2} color='primary'>
            <RiShoppingBagLine size={22} />
          </Badge>
        </Link>
      </div>

      {/* Mobile Menu List */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className='mobile-menu-list'>
          {navLinks.map(({ path, label }) => (
            <li key={path} className='mobile-menu-item'>
              <Link to={path} onClick={toggleMobileMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
