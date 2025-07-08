import express, { Request, Response } from "express";
import { stripe } from "../config/stripe";
import bodyParser from "body-parser";
import { db } from "../config/db";

const router = express.Router();

router.post("/create-checkout-session", async (req: Request, res: Response) => {
  try {
    const { cartItems, orderId } = req.body;
    const lineItems = cartItems.map((item: any) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `http://localhost:5173/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/checkout`,
      metadata: { orderId },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

const stripeWebhookHandler = async (
  req: Request,
  res: Response
): Promise<void> => {
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
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    res.status(400).send("Webhook signature verification failed");
    return;
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;
    const orderId = session.metadata?.orderId;
    const stripeSessionId = session.id;
    if (orderId) {
      try {
        const [result] = await db.query(
          `UPDATE orders SET payment_status = 'paid', order_status = 'processing', payment_id = ? WHERE id = ?`,
          [stripeSessionId, orderId]
        );
      } catch (err) {
        console.error("DB update failed:", err);
      }
    }
  }
  res.status(200).json({ received: true });
};

router.post(
  "/webhook",
  bodyParser.raw({ type: "application/json" }),
  stripeWebhookHandler
);

export default router;
