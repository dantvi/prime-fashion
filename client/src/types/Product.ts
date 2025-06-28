export interface IProduct {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  category: string;
  image?: string;
}

export type ProductCreate = Omit<IProduct, 'id'>;
export type ProductUpdate = Partial<Omit<IProduct, 'id'>>;
