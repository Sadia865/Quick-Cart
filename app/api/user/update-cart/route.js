import connectDB from "@/lib/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const { cartItems } = await req.json();

        await connectDB();
        await User.findByIdAndUpdate(userId, { cartItems });

        return NextResponse.json({ success: true, message: "Cart updated" });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}