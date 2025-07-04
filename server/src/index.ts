import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { stripe } from "./config/stripe";
import { db } from "./config/db";
import { updateProductStockForOrder } from "./controllers/orderStockController";
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.post(
  "/stripe/webhook",
  bodyParser.raw({ type: "application/json" }),
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers["stripe-signature"] as string;
    if (!sig) {
      console.error("Missing Stripe-Signature header.");
      res.status(400).send("Webhook Error: No signature");
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
      console.error("Webhook signature verification failed:", err);
      res.status(400).send("Webhook signature verification failed");
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const orderId = session.metadata?.orderId;
      const stripeSessionId = session.id;

      if (orderId) {
        try {
          await db.query(
            `UPDATE orders SET payment_status = 'Paid', order_status = 'Received', payment_id = ? WHERE id = ?`,
            [stripeSessionId, orderId]
          );
          await updateProductStockForOrder(Number(orderId));
        } catch (err) {
          console.error("Failed to update DB or stock:", err);
        }
      } else {
        console.error("No orderId found in metadata!");
      }
    }
    res.status(200).send("Webhook received");
    return;
  }
);

app.use(express.json());

import stripeRoutes from "./routes/stripeRoutes";
import productRouter from "./routes/products";
import customerRouter from "./routes/customers";
import orderRouter from "./routes/orders";
import orderItemRouter from "./routes/orderItems";

app.use("/stripe", stripeRoutes);
app.use("/products", productRouter);
app.use("/customers", customerRouter);
app.use("/orders", orderRouter);
app.use("/order-items", orderItemRouter);

connectDB();
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  console.log("Waiting for Stripe webhooks at /stripe/webhook");
});
