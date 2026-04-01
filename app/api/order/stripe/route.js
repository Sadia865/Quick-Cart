import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        if (!userId) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        const { address, items } = await req.json();
        if (!address || !items || items.length === 0) {
            return NextResponse.json({ success: false, message: "Missing data" }, { status: 400 });
        }

        await connectDB();

        // Build line items for Stripe
        const lineItems = [];
        for (const item of items) {
            const product = await Product.findById(item.productId);
            if (!product) continue;
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image[0]],
                        description: product.description?.substring(0, 200),
                    },
                    unit_amount: Math.round(product.offerPrice * 100), // cents
                },
                quantity: item.quantity,
            });
        }

        if (lineItems.length === 0) {
            return NextResponse.json({ success: false, message: "No valid products" }, { status: 400 });
        }

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order-placed?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
            metadata: {
                userId,
                addressId: address._id || "",
                addressJson: JSON.stringify(address),
            },
            shipping_address_collection: {
                allowed_countries: ["US", "GB", "CA", "AU", "AE", "SA", "QA", "KW"],
            },
        });

        return NextResponse.json({ success: true, url: session.url });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}