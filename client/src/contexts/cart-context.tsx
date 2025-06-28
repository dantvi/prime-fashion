import { createContext, useEffect, useState, useContext } from 'react';
import { IProduct } from '../types/Product';
import { CartContextType, CartItem } from '../types/CartTypes';

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    setCartCount(
      cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    );
  }, [cartItems]);

  useEffect(() => {
    setCartTotal(
      cartItems.reduce(
        (total, cartItem) => total + cartItem.quantity * cartItem.price,
        0
      )
    );
  }, [cartItems]);

  const addItemToCart = (productToAdd: IProduct) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (item) => item.id === productToAdd.id
      );

      if (existingCartItem) {
        return prevCartItems.map((item) =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCartItems, { ...productToAdd, quantity: 1 }];
    });
  };

  const removeItemFromCart = (cartItemToRemove: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems
        .map((item) =>
          item.id === cartItemToRemove.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearItemFromCart = (cartItemToClear: CartItem) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== cartItemToClear.id)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
