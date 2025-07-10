import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  NavbarContainer,
  LogoContainer,
  LogoImage,
  LinksContainer,
  NavList,
  NavItem,
  IconContainer,
  MobileNav,
  MobileMenuButton,
  MobileMenu,
  MobileMenuList,
  MobileMenuItem,
} from '../styles/Navbar.styles';
import { FiSearch, FiHeart } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { RiShoppingBagLine, RiMenu2Line } from 'react-icons/ri';
import { MdOutlineClose } from 'react-icons/md';
import Badge from '@mui/material/Badge';
import logo from '../assets/prime-fashion.jpg';

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
      <NavbarContainer>
        <LogoContainer>
          <Link to='/'>
            <LogoImage src={logo} alt='Prime Fashion Logo' />
          </Link>
        </LogoContainer>

        <LinksContainer>
          <NavList>
            {navLinks.map(({ path, label }) => (
              <NavItem key={path}>
                <Link to={path}>{label}</Link>
              </NavItem>
            ))}
          </NavList>
        </LinksContainer>

        <IconContainer>
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
        </IconContainer>
      </NavbarContainer>

      {/* Mobile Nav */}
      <MobileNav>
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <MdOutlineClose size={24} />
          ) : (
            <RiMenu2Line size={24} />
          )}
        </MobileMenuButton>

        <LogoContainer>
          <Link to='/'>
            <LogoImage src={logo} alt='Prime Fashion Logo' />
          </Link>
        </LogoContainer>

        <Link to='/cart'>
          <Badge badgeContent={2} color='primary'>
            <RiShoppingBagLine size={22} />
          </Badge>
        </Link>
      </MobileNav>

      {/* Mobile Menu List */}
      <MobileMenu className={mobileMenuOpen ? 'open' : ''}>
        <MobileMenuList>
          {navLinks.map(({ path, label }) => (
            <MobileMenuItem key={path}>
              <Link to={path} onClick={toggleMobileMenu}>
                {label}
              </Link>
            </MobileMenuItem>
          ))}
        </MobileMenuList>
      </MobileMenu>
    </>
  );
};

export default Navbar;
