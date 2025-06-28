import { IProduct } from './Product';

export type CartItem = IProduct & {
  quantity: number;
};

export type CartContextType = {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartItems: CartItem[];
  addItemToCart: (productToAdd: IProduct) => void;
  removeItemFromCart: (cartItemToRemove: CartItem) => void;
  clearItemFromCart: (cartItemToClear: CartItem) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};
