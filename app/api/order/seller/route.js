import connectDB from "@/lib/db";
import Order from "@/models/Order";
import authSeller from "@/lib/authSeller";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const { userId } = getAuth(req);
        const isSeller = await authSeller(userId);
        if (!isSeller) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        await connectDB();
        const orders = await Order.find({}).sort({ date: -1 });
        return NextResponse.json({ success: true, orders });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}