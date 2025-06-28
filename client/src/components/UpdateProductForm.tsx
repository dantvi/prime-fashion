import { useState, FormEvent, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { updateProduct, fetchProductById } from '../services/product-service';
import { ProductUpdate } from '../types/Product';

type ProductFormState = {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  image: string;
};

const UpdateProductForm = () => {
  const [product, setProduct] = useState<ProductFormState | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (id) {
          const existingProduct = await fetchProductById(parseInt(id));
          setProduct({
            name: existingProduct.name,
            description: existingProduct.description,
            price: String(existingProduct.price),
            stock: String(existingProduct.stock),
            category: existingProduct.category,
            image: existingProduct.image ?? '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (!product) return;

    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!product || !id) return;

    const updatedProduct: ProductUpdate = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
    };

    try {
      await updateProduct(parseInt(id), updatedProduct);
      navigate('/products');
    } catch (error) {
      console.error('Failed to update product:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h2>Update Product</h2>

      <label>
        Name:
        <input
          type='text'
          name='name'
          value={product.name}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Description:
        <textarea
          name='description'
          value={product.description}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Price:
        <input
          type='number'
          name='price'
          value={product.price}
          onChange={handleChange}
          min={0}
          required
        />
      </label>

      <label>
        Stock:
        <input
          type='number'
          name='stock'
          value={product.stock}
          onChange={handleChange}
          min={0}
          required
        />
      </label>

      <label>
        Category:
        <input
          type='text'
          name='category'
          value={product.category}
          onChange={handleChange}
          required
        />
      </label>

      <label>
        Image URL:
        <input
          type='text'
          name='image'
          value={product.image}
          onChange={handleChange}
        />
      </label>

      <button className='btn' type='submit'>
        Update Product
      </button>
    </form>
  );
};

export default UpdateProductForm;
