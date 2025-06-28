import { useEffect, useState } from 'react';
import { fetchProducts, deleteProduct } from '../services/product-service';
import { IProduct } from '../types/Product';
import { Link } from 'react-router-dom';
import CreateProductForm from '../components/CreateProductForm';
import '../styles/Products.css';

const Products = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const handleProductCreated = async () => {
    await getProducts();
  };

  return (
    <div>
      <CreateProductForm onProductCreated={handleProductCreated} />
      <h2>Products</h2>
      <ul>
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product) => (
            <li key={product.id} className='product-item'>
              {' '}
              {product.image && (
                <img src={product.image} alt={product.name} width='100' />
              )}
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <p>In Stock: {product.stock}</p>
              <div className='button-group'>
                <Link to={`/update-product/${product.id}`}>
                  <button className='btn'>Update</button>
                </Link>
                <button
                  className='btn'
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Products;
