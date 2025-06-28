export interface ICustomer {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
}

export interface ICheckoutCustomer {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
}

export type CustomerCreate = Omit<ICustomer, 'id'>;
export type CustomerUpdate = Partial<Omit<ICustomer, 'id'>>;
