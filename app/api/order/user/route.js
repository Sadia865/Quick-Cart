import connectDB from "@/lib/db";
import Order from "@/models/Order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        await connectDB();

        console.log("Fetching orders for:", userId);

        const orders = await Order.find({ userId }).sort({ date: -1 });

        console.log("Orders found:", orders.length);

        return NextResponse.json({ success: true, orders });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}