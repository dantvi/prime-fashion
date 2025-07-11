import styled from 'styled-components';

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 10px 33px rgba(0, 0, 0, 0.1);

  @media (max-width: 1210px) {
    display: none;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoImage = styled.img`
  height: 40px;
  object-fit: contain;
  border-radius: 5px;
`;

export const LinksContainer = styled.div``;

export const NavList = styled.ul`
  display: flex;
  align-items: center;
  gap: 40px;
  list-style: none;
`;

export const NavItem = styled.li`
  a {
    text-decoration: none;
    color: #1b1b1b;
    font-size: 14px;
    font-weight: 600;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #1b1b1b;
      transition: width 0.3s ease-out;
    }

    &:hover::after {
      width: 60%;
    }
  }
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;

  a {
    display: flex;
    align-items: center;
    color: black;
    text-decoration: none;
  }

  svg {
    cursor: pointer;
  }
`;

// Mobile Navigation
export const MobileNav = styled.div`
  display: none;

  @media (max-width: 1210px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 60px;
    background-color: white;
    z-index: 10;

    @media (max-width: 450px) {
      padding: 20px 15px;
    }
  }
`;

export const MobileMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
`;

export const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: white;
  position: absolute;
  top: 74px;
  right: 0;
  width: 100%;
  height: 100vh;
  transform: translateY(-100%);
  opacity: 0;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-top: 1px solid #e4e4e4;
  z-index: 9;

  &.open {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const MobileMenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 20px 0;
`;

export const MobileMenuItem = styled.li`
  padding: 15px 20px;

  a {
    text-decoration: none;
    color: #1b1b1b;
    font-size: 16px;
    font-weight: 600;
  }
`;
