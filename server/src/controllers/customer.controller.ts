import { Request, Response } from 'express';
import * as customerService from '../services/customer.service';
import { Customer } from '../types/customer.type';
import { logError } from '../utilities/logger';

export const getAllCustomers = async (_: Request, res: Response) => {
  try {
    const customers = await customerService.findAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findCustomerById(req.params.id);
    customer
      ? res.json(customer)
      : res.status(404).json({ message: 'Customer not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const getCustomerByEmail = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.findCustomerByEmail(
      req.params.email
    );
    customer
      ? res.json(customer)
      : res.status(404).json({ message: 'Customer not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customerData = req.body as Omit<
      Customer,
      'customer_id' | 'created_at'
    >;
    const id = await customerService.addCustomer(customerData);
    res.status(201).json({ message: 'Customer created', id });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customerData = req.body as Omit<
      Customer,
      'customer_id' | 'created_at'
    >;
    const updated = await customerService.editCustomer(
      req.params.id,
      customerData
    );
    updated
      ? res.json({ message: 'Customer updated' })
      : res.status(404).json({ message: 'Customer not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const deleted = await customerService.removeCustomer(req.params.id);
    deleted
      ? res.json({ message: 'Customer deleted' })
      : res.status(404).json({ message: 'Customer not found' });
  } catch (error) {
    res.status(500).json({ error: logError(error) });
  }
};
