import { useEffect, useState } from 'react';
import { fetchProducts } from '../services/product-service';
import { IProduct } from '../types/Product';
import { useCart } from '../contexts/cart-context';
import '../styles/Shop.css';

const Shop = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const { addItemToCart } = useCart();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    getProducts();
  }, []);

  return (
    <div className='shop-container'>
      <h2>Shop</h2>
      <div className='products-container'>
        {products.map((product) => (
          <div key={product.id} className='product-card'>
            <img
              src={product.image}
              alt={product.name}
              className='product-image'
            />
            <h3 className='product-title'>{product.name}</h3>
            <p className='product-description'>{product.description}</p>
            <p className='product-price'>${product.price}</p>
            <button className='btn' onClick={() => addItemToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
