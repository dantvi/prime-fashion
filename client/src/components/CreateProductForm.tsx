import { useState, FormEvent } from 'react';
import { createProduct } from '../services/product-service';
import { ProductCreate, IProduct } from '../types/Product';

interface ICreateProductFormProps {
  onProductCreated: (product: IProduct) => void;
}

type ProductFormState = {
  name: string;
  price: string;
  description: string;
  stock: string;
  category: string;
  image: string;
};

const CreateProductForm = ({ onProductCreated }: ICreateProductFormProps) => {
  const [product, setProduct] = useState<ProductFormState>({
    name: '',
    price: '',
    description: '',
    stock: '',
    category: '',
    image: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const productToCreate: ProductCreate = {
      ...product,
      price: Number(product.price),
      stock: Number(product.stock),
    };

    try {
      const newProduct = await createProduct(productToCreate);
      onProductCreated(newProduct);
      setProduct({
        name: '',
        price: '',
        description: '',
        stock: '',
        category: '',
        image: '',
      });
    } catch (error) {
      console.error('Failed to create product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Product</h2>

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
        Create Product
      </button>
    </form>
  );
};

export default CreateProductForm;
