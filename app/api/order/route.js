import connectDB from "@/lib/db";
import Order from "@/models/Order";
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

    const body = await req.json();

    await connectDB();

    const newOrder = await Order.create({
      userId: userId, // ✅ IMPORTANT (Clerk ID)
      items: body.items,
      amount: body.amount,
      address: body.address,
      date: Date.now(),
    });

    return NextResponse.json({ success: true, order: newOrder });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}