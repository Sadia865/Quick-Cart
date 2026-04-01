import connectDB from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const { address, items } = await req.json();

        if (!address || !items || items.length === 0) {
            return NextResponse.json(
                { success: false, message: "Missing address or items" },
                { status: 400 }
            );
        }

        await connectDB();

        let amount = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);
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

        if (orderItems.length === 0) {
            return NextResponse.json(
                { success: false, message: "No valid products found" },
                { status: 400 }
            );
        }

        amount = Math.floor((amount + amount * 0.02) * 100) / 100;

        // ✅ SAVE WITH CLERK USER ID
        const order = await Order.create({
            userId: userId,
            items: orderItems,
            amount,
            address,
            status: "Order Placed",
            date: Date.now(),
        });

        // ✅ FIX: clear cart using clerkId field
        await User.findOneAndUpdate(
            { clerkId: userId },  // 🔥 IMPORTANT FIX
            { cartItems: {} }
        );

        return NextResponse.json({ success: true, order });

    } catch (error) {
        console.error("Order create error:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}