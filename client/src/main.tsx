import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CartProvider } from './contexts/cart-context.tsx';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
