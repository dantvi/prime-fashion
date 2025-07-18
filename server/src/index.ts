import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { stripe } from './config/stripe';
import { db, connectDB } from './config/db';

import productRouter from './routes/product.routes';
import customerRouter from './routes/customer.routes';
import orderRoutes from './routes/order.routes';
import orderItemRouter from './routes/orderItem.routes';
import stripeRoutes from './routes/stripe.routes';
import cartRouter from './routes/cart.routes';
import cartItemRouter from './routes/cartItem.routes';

const app = express();
connectDB();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  })
);

app.post(
  '/stripe/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'] as string;
    if (!sig) {
      console.error('Missing Stripe-Signature header.');
      res.status(400).send('Webhook Error: No signature');
      return;
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      res.status(400).send('Webhook signature verification failed');
      return;
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;
      const orderId = session.metadata?.orderId;
      const stripeSessionId = session.id;

      if (orderId) {
        try {
          // Uppdatera betalstatus
          await db.query(
            `UPDATE orders SET payment_status = 'Paid', order_status = 'Received', payment_id = ? WHERE order_id = ?`,
            [stripeSessionId, orderId]
          );

          // Hämta order items för att minska lagersaldo
          const [items] = await db.query<any[]>(
            `SELECT product_id, quantity FROM order_items WHERE order_id = ?`,
            [orderId]
          );

          for (const item of items) {
            await db.query(
              `UPDATE products SET stock = stock - ? WHERE product_id = ?`,
              [item.quantity, item.product_id]
            );
          }

          console.log(`Stock updated for order ID ${orderId}`);
        } catch (err) {
          console.error('Failed to update DB or stock:', err);
        }
      } else {
        console.error('No orderId found in metadata!');
      }
    }

    res.status(200).send('Webhook received');
    return;
  }
);

app.use(express.json());

app.use('/stripe', stripeRoutes);
app.use('/products', productRouter);
app.use('/customers', customerRouter);
app.use('/orders', orderRoutes);
app.use('/order-items', orderItemRouter);
app.use('/carts', cartRouter);
app.use('/cart-items', cartItemRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log('Waiting for Stripe webhooks at /stripe/webhook');
});
