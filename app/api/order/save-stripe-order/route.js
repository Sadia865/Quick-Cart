import connectDB from "@/lib/db";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { userId } = getAuth(req);
    if (!userId)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { sessionId } = await req.json();
    if (!sessionId)
      return NextResponse.json({ success: false, message: "Missing session ID" }, { status: 400 });

    await connectDB();

    // ✅ Prevent duplicate orders for same session
    const existing = await Order.findOne({ stripeSessionId: sessionId });
    if (existing)
      return NextResponse.json({ success: true, order: existing, duplicate: true });

    // Retrieve full session with line items from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items.data.price.product'],
    });

    if (session.payment_status !== 'paid')
      return NextResponse.json({ success: false, message: "Payment not completed" }, { status: 400 });

    // Parse metadata saved during session creation
    const address = JSON.parse(session.metadata.addressJson || '{}');

    // Rebuild order items from Stripe line items
    const orderItems = [];
    let amount = 0;

    for (const item of session.line_items.data) {
      const stripeProduct = item.price.product;
      // Match by name to find your DB product (or store productId in metadata for accuracy)
      const product = await Product.findOne({ name: stripeProduct.name });
      if (!product) continue;

      orderItems.push({
        product: {
          _id: product._id,
          name: product.name,
          description: product.description,
          price: product.price,
          offerPrice: product.offerPrice,
          image: product.image,
          category: product.category,
        },
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    amount = Math.floor((amount + amount * 0.02) * 100) / 100;

    const order = await Order.create({
      userId,
      items: orderItems,
      amount,
      address,
      status: "Order Placed",
      date: Date.now(),
      stripeSessionId: sessionId, // ✅ store to prevent duplicates
    });

    // Clear the user's cart
    await User.findOneAndUpdate({ clerkId: userId }, { cartItems: {} });

    return NextResponse.json({ success: true, order });
  } catch (error) {
    console.error("Save stripe order error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}