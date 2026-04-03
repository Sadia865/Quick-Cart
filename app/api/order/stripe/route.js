import connectDB from "@/lib/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

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

            // Only include image if it's a valid https URL from a trusted source
            const imageUrl = product.image?.[0];
            const isValidImage = imageUrl &&
                imageUrl.startsWith('https://') &&
                (imageUrl.includes('cloudinary.com') || imageUrl.includes('githubusercontent.com'));

            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        description: product.description?.substring(0, 200) || product.name,
                        // Only add images if from trusted source
                        ...(isValidImage && { images: [imageUrl] }),
                    },
                    unit_amount: Math.round(product.offerPrice * 100),
                },
                quantity: item.quantity,
            });
        }

        if (lineItems.length === 0) {
            return NextResponse.json({ success: false, message: "No valid products found" }, { status: 400 });
        }

        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://quick-cart-ubyb.vercel.app';

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${appUrl}/order-placed?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${appUrl}/cart`,
            metadata: {
                userId,
                addressJson: JSON.stringify(address).substring(0, 500),
            },
        });

        return NextResponse.json({ success: true, url: session.url });

    } catch (error) {
        console.error("Stripe error:", error.message);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}